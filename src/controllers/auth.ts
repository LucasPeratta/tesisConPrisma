import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { getUserByEmail } from "../services/user"

const JWT_SECRET = process.env.JWT_SECRET || "secret"
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "3h"

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
