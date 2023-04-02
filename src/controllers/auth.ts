import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { getUserByEmail } from "../repos/user"
import { addPatient } from "../repos/patient"
import { Patient, Role, User } from "@prisma/client"

const JWT_SECRET = process.env.JWT_SECRET || "secret"
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "3h"

type TPatientUser = Omit<User & Patient, "id">

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body

	const user = await getUserByEmail(email)

	if (!user) {
		return res.status(400).send({ error: "Invalid login credentials" })
	}

	const passwordMatch = await bcrypt.compare(password, user.password)

	if (!passwordMatch) {
		return res.status(400).send({ error: "Invalid login credentials" })
	}

	const jwt_body = {
		id: user.id,
		email: user.email,
		isAdmin: user.role === "admin"
	}

	const token = jwt.sign(jwt_body, JWT_SECRET, {
		algorithm: "HS512",
		expiresIn: JWT_EXPIRATION,
		notBefore: "0s",
		audience: req.hostname,
		issuer: req.hostname,
		subject: user.id.toString()
	})

	res.send({ token })
}

export const register = async (req: Request, res: Response) => {
	// check where the request is coming from (admin or patient or provider)
	// if admin, create a user with the role of admin
	// if patient, create a user with the role of patient
	// if provider, create a user with the role of provider
	// if none of the above, return an error

	try {
		const { email, role } = req.body

		const user = await getUserByEmail(email)

		if (user) {
			return res.status(400).send({ error: "User already exists" })
		}

		let data

		if (role === "admin") {
			console.log("Cannot create admin user this way")
			res
				.status(400)
				.send({ errorMsg: "Cannot create admin user using this route" })
		}
		if (role === "patient") {
			data = createPatientUser(req.body as TPatientUser)
		}

		if (role === "provider") {
			console.log("Creating provider user")
		}

		res.status(201).send({ data, message: "User created successfully" })
	} catch (error) {
		console.log(error)
		res.status(400).send({ errorMsg: "Something went wrong", error })
	}
}

const createPatientUser = async (data: TPatientUser) => {
	const hashedPassword = await bcrypt.hash(data.password, 10)

	const newUser = {
		email: data.email,
		password: hashedPassword,
		role: data.role as Role,
		name: data.name,
		dni: data.dni,
		dob: data.dob,
		phoneNumber: data.phoneNumber,
		emr: ""
	}

	await addPatient(newUser)
}
