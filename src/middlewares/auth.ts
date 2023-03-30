import { Request, Response, NextFunction } from "express"
// import { verify } from "jsonwebtoken"

export function auth(req: Request, res: Response, next: NextFunction) {
	// const authHeader = req.headers.authorization
	// if (!authHeader) {
	// 	return res.status(401).end()
	// }
	// const [, token] = authHeader.split(" ")
	// try {
	// 	// const { sub } = verify(token, "secret")
	// 	// req.user_id = sub
	// 	return next()
	// } catch (err) {
	// 	return res.status(401).end()
	// }
}
