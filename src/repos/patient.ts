import { Patient, User } from "@prisma/client"
import { prisma } from "../config/db"

export const getAllPatients = async () => {
	const data = await prisma.patient.findMany()
	return data
}

export const getPatientById = async (id: number) => {
	const patients = await prisma.patient.findUniqueOrThrow({
		where: {
			id
		}
	})
	return patients
}

export const getPatientByIdWithAppointments = async (id: number) => {
	const patients = await prisma.patient.findUniqueOrThrow({
		where: {
			id
		},
		include: {
			Appointment: true
		}
	})
	return patients
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
					password: "password",
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

export const deletePatient = async (id: number) => {
	const data = await prisma.patient.delete({
		where: {
			id
		}
	})
	return data
}
