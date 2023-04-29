/* eslint-disable @typescript-eslint/no-unused-vars */

import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function cleanDB() {
	await prisma.appointment.deleteMany()
	await prisma.provider.deleteMany()
	await prisma.patient.deleteMany()
	await prisma.admin.deleteMany()
	await prisma.user.deleteMany()
}

async function seed() {
	await cleanDB()

	const adminUser = await prisma.user.create({
		data: {
			email: "admin@example.com",
			password: await bcrypt.hash("password", 10),
			role: "admin",
			admin: {
				create: {
					name: "Admin User"
				}
			}
		}
	})

	const { provider } = await prisma.user.create({
		data: {
			email: "provider@example.com",
			password: await bcrypt.hash("password", 10),
			role: "provider",
			provider: {
				create: {
					name: "Provider User",
					shifts: {
						create: [
							{
								day: "monday",
								startTime: "09:00",
								endTime: "17:00"
							},
							{
								day: "wednesday",
								startTime: "13:00",
								endTime: "20:00"
							}
						]
					}
				}
			}
		},
		select: {
			provider: {
				select: {
					id: true
				}
			}
		}
	})

	const { patient } = await prisma.user.create({
		data: {
			email: "patient@example.com",
			password: await bcrypt.hash("password", 10),
			role: "patient",
			patient: {
				create: {
					name: "Patient User",
					dni: "12345678A",
					dob: "1990-01-01",
					phoneNumber: "123456789",
					emr: "Medical history for Patient User"
				}
			}
		},
		select: {
			patient: {
				select: {
					id: true
				}
			}
		}
	})

	await prisma.appointment.create({
		data: {
			status: "espera",
			date: new Date(),
			time: "14:00",
			patient: {
				connect: { id: patient.id }
			},
			provider: {
				connect: { id: provider.id }
			}
		}
	})
	await prisma.appointment.create({
		data: {
			status: "espera",
			date: new Date(),
			time: "15:00",
			patient: {
				connect: { id: patient.id }
			},
			provider: {
				connect: { id: provider.id }
			}
		}
	})
	await prisma.appointment.create({
		data: {
			status: "espera",
			date: new Date(),
			time: "16:00",
			patient: {
				connect: { id: patient.id }
			},
			provider: {
				connect: { id: provider.id }
			}
		}
	})

	console.log("Seeded data successfully")
}

seed()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
