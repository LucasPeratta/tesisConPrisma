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
	cleanDB()

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

	const providerUser = await prisma.user.create({
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
		}
	})

	const patientUser = await prisma.user.create({
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
		}
	})

	// const appointment = await prisma.appointment.create({
	// 	data: {
	// 		status: "espera",
	// 		date: new Date("2023-04-01T09:00:00Z"),
	// 		time: "09:00",
	// 		patient: {
	// 			connect: {
	// 				id: patientUser.patientId
	// 			}
	// 		},
	// 		provider: {
	// 			connect: {
	// 				id: providerUser.providerId
	// 			}
	// 		}
	// 	}
	// })

	console.log("Seeded data successfully")
}

seed()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
