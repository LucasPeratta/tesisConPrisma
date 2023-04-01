import { Router } from "express"

import appointmentRouter from "./appointment"
import patientRouter from "./patient"
import providerRouter from "./provider"
import adminRouter from "./admin"
import userRouter from "./user"
import authRouter from "./auth"
// import { auth } from "../../middlewares/auth"

const router = Router()

// middleware
// router.use(auth)

// routes
router.use("/patient", patientRouter)
router.use("/provider", providerRouter)
router.use("/appointment", appointmentRouter)
router.use("/admin", adminRouter)
router.use("/user", userRouter)
router.use("/auth", authRouter)

export default router
