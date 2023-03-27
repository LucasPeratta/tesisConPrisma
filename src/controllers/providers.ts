import { prisma } from "../config/db"
import { Request, Response } from "express"

export const addProvider = async (req: Request, res: Response) => {
	const provider = req.body
	try {
		const data = await prisma.provider.create({
			data: {
				name: provider.name,
				email: provider.email,
				phoneNumber: provider.phoneNumber,
				shifts: provider.shifts
			}
		})
		res.json({ msg: "provider added SUCCESSFULLY", data: data.id })
	} catch (error) {
		res.json({ msg: "Error, couldn't add a provider", error })
		console.log(error)
	}
}

export const getAll = async (req: Request, res: Response) => {
	try {
		const data = await prisma.provider.findMany()
		res.json({ data })
	} catch (error) {
		res.json({ msg: "Error, couldn't retrieve providers", error })
		console.log(error)
	}
}

export const getProviderById = async (req: Request, res: Response) => {
	const providerId = parseInt(req.params.id)
	try {
		const data = await prisma.provider.findUnique({
			where: {
				id: providerId
			}
		})

		res.json({ msg: "provider retrieved SUCCESSFULLY", data })
	} catch (error) {
		res.json({ msg: "Error, couldn't retrieve provider", error })
		console.log(error)
	}
}

export const updateProvider = async (req: Request, res: Response) => {
	const providerId = parseInt(req.params.id)
	const updatedProvider = req.body
	try {
		const data = await prisma.provider.update({
			where: {
				id: providerId
			},
			data: {
				name: updatedProvider.name,
				email: updatedProvider.email,
				phoneNumber: updatedProvider.phoneNumber,
				shifts: updatedProvider.shifts
			}
		})
		res.json({ msg: "provider updated SUCCESSFULLY", data })
	} catch (error) {
		res.json({ msg: "Error, couldn't update provider", error })
		console.log(error)
	}
}

export const deleteProvider = async (req: Request, res: Response) => {
	const providerId = parseInt(req.params.id)
	try {
		const data = await prisma.provider.delete({
			where: {
				id: providerId
			}
		})
		res.json({ msg: "provider deleted SUCCESSFULLY", data })
	} catch (error) {
		res.json({ msg: "Error, couldn't delete provider", error })
		console.log(error)
	}
}
