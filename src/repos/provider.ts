import { Provider, User } from "@prisma/client"
import { prisma } from "../config/db"

export const getAll = async () => {
	const data = await prisma.provider.findMany()
	return data
}

export const getProviderById = async (id: number) => {
	const data = await prisma.provider.findUniqueOrThrow({
		where: {
			id
		}
	})
	return data
}

export const addProvider = async (provider: Omit<User & Provider, "id">) => {
	const data = await prisma.provider.create({
		data: {
			name: provider.name,
			phoneNumber: provider.phoneNumber,
			shifts: provider.shifts || {},
			user: {
				create: {
					email: provider.email,
					password: provider.password,
					role: "provider"
				}
			}
		}
	})
	return data
}

export const updateProvider = async (id: number, provider: Provider) => {
	const data = await prisma.provider.update({
		where: {
			id
		},
		data: {
			name: provider.name,
			phoneNumber: provider.phoneNumber,
			shifts: provider.shifts || {}
		}
	})

	return data
}

export const deleteProvider = async (id: number) => {
	const data = await prisma.provider.delete({
		where: {
			id
		}
	})
	return data
}
