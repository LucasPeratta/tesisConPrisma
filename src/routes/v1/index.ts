import { Router } from "express"

import appointmentRouter from "./appointment"
import patientRouter from "./patient"
import providerRouter from "./provider"
import adminRouter from "./admin"
import userRouter from "./user"

const router = Router()

router.use("/patient", patientRouter)
router.use("/provider", providerRouter)
router.use("/appointment", appointmentRouter)
router.use("/admin", adminRouter)
router.use("/user", userRouter)

export default router
