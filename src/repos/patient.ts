import { Patient, User } from "@prisma/client"
import { prisma } from "../config/db"

export const getAllPatients = async () => {
	const data = await prisma.patient.findMany({
		include: {
			user: {
				select: {
					email: true
				}
			}
		}
	})
	return data.map((patient) => ({
		...patient,
		email: patient.user.email
	}))
}

export const getPatientById = async (id: number) => {
	const patient = await prisma.patient.findUniqueOrThrow({
		where: {
			id
		},
		include: {
			user: {
				select: {
					email: true
				}
			}
		}
	})
	return { ...patient, email: patient.user.email }
}

export const getPatientByIdWithAppointments = async (id: number) => {
	const patient = await prisma.patient.findUniqueOrThrow({
		where: {
			id
		},
		include: {
			Appointment: true,
			user: {
				select: {
					email: true
				}
			}
		}
	})
	return { ...patient, email: patient.user.email }
}

export const addPatient = async (patient: Omit<User & Patient, "id">) => {
	const patientData = await prisma.patient.create({
		data: {
			name: patient.name,
			dni: patient.dni,
			emr: patient.emr,
			dob: patient.dob,
			phoneNumber: patient.phoneNumber,
			user: {
				create: {
					email: patient.email,
					password: patient.password,
					role: "patient"
				}
			}
		}
	})
	return patientData
}

export const updatePatient = async (id: number, patient: Patient) => {
	const data = await prisma.patient.update({
		where: {
			id
		},
		data: {
			name: patient.name,
			dni: patient.dni,
			emr: patient.emr,
			dob: patient.dob,
			phoneNumber: patient.phoneNumber
		}
	})
	return data
}

export const updateEmr = async (id: number, emr: string) => {
	const data = await prisma.patient.update({
		where: {
			id
		},
		data: {
			emr
		}
	})
	return data
}

export const deletePatient = async (id: number) => {
	const data = await prisma.patient.delete({
		where: {
			id
		}
	})
	return data
}
