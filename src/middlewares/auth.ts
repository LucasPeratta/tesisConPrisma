import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { getUserById } from "../services/user"

const JWT_SECRET = process.env.JWT_SECRET || "secret"

export async function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.header("Authorization")?.replace("Bearer ", "")

	if (!token) {
		return res.status(401).send({ error: "Authentication failed" })
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { id: number }
		const user = await getUserById(decoded.id)

		if (!user) {
			throw new Error()
		}

		// req.user = user
		next()
	} catch (error) {
		res.status(401).send({ error: "Authentication failed" })
	}
}
