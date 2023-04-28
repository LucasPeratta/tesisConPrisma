import { prisma } from "../config/db"
import { Request, Response } from "express"

export const getAll = async (req: Request, res: Response) => {
	try {
		const data = await prisma.appointment.findMany()
		res.json({ data })
	} catch (error) {
		res.json({ msg: "Error, couldn't retrieve appointments", error })
		console.log(error)
	}
}

export const getAppointmentById = async (req: Request, res: Response) => {
	const appointmentId = parseInt(req.params.id)
	try {
		const data = await prisma.appointment.findUniqueOrThrow({
			where: {
				id: appointmentId
			}
		})

		res.json({ msg: "Appointment retrieved SUCCESSFULLY", data })
	} catch (error) {
		res.json({ msg: "Error, couldn't retrieve appointment", error })
		console.log(error)
	}
}

export const getAppointmentsByPatientId = async (
	req: Request,
	res: Response
) => {
	const userId = parseInt(req.params.id)
	try {
		const data = await prisma.appointment.findMany({
			where: {
				patientId: userId
			}
		})
		res.json({ msg: "Appointment retrieved SUCCESSFULLY", data })
	} catch (error) {
		res.json({ msg: "Error, couldn't retrieve appointment", error })
		console.log(error)
	}
}

export const getAppointmentsByProviderId = async (
	req: Request,
	res: Response
) => {
	const userId = parseInt(req.params.id)
	try {
		const data = await prisma.appointment.findMany({
			where: {
				providerId: userId
			}
		})
		res.json({ msg: "Appointment retrieved SUCCESSFULLY", data })
	} catch (error) {
		res.json({ msg: "Error, couldn't retrieve appointment", error })
		console.log(error)
	}
}

export const addAppointment = async (req: Request, res: Response) => {
	const appointment = req.body
	try {
		const data = await prisma.appointment.create({
			data: {
				date: new Date(),
				time: appointment.time,
				status: appointment.status,
				patient: {
					connect: {
						id: appointment.patientId
					}
				},
				provider: {
					connect: {
						id: appointment.providerId
					}
				}
			}
		})
		res.json({ msg: "Appointment added SUCCESSFULLY", data })
	} catch (error) {
		res.json({ msg: "Error, couldn't add a appointment ", error })
		console.log(error)
	}
}

export const updateAppointment = async (req: Request, res: Response) => {
	const appointmentId = parseInt(req.params.id)
	const updatedAppointment = req.body
	try {
		const data = await prisma.appointment.update({
			where: {
				id: appointmentId
			},
			data: {
				patientId: updatedAppointment.patienId,
				providerId: updatedAppointment.providerId,
				date: updatedAppointment.data,
				time: updatedAppointment.time,
				status: updatedAppointment.status
			}
		})
		res.json({ msg: "Appointment updated SUCCESSFULLY", data })
	} catch (error) {
		res.json({ msg: "Error, couldn't update appointment", error })
		console.log(error)
	}
}

export const updateAppointmentStatus = async (req: Request, res: Response) => {
	const appointmentId = parseInt(req.params.id)
	const { status } = req.body
	try {
		const data = await prisma.appointment.update({
			where: {
				id: appointmentId
			},
			data: {
				status: status
			}
		})
		res.json({ msg: "Appointment updated SUCCESSFULLY", data })
	} catch (error) {
		res.json({ msg: "Error, couldn't update appointment", error })
		console.log(error)
	}
}

export const deleteAppointment = async (req: Request, res: Response) => {
	const appointmentId = parseInt(req.params.id)
	try {
		const appointment = await prisma.appointment.delete({
			where: {
				id: appointmentId
			}
		})
		res.json({ msg: "Appointment deleted SUCCESSFULLY", data: appointment.id })
	} catch (error) {
		res.json({ msg: "Error, couldn't delete appointment", error })
		console.log(error)
	}
}
