import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { getUserByEmail } from "../services/user"

const JWT_SECRET = process.env.JWT_SECRET || "secret"

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

	const token = jwt.sign({ id: user.id }, JWT_SECRET)

	res.send({ token })
}
