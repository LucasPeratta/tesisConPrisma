import { Router } from "express"

import appointmentRouter from "./appointment"
import patientRouter from "./patient"
import providerRouter from "./provider"

const router = Router()

router.use("/patients", patientRouter)
router.use("/providers", providerRouter)
router.use("/appointments", appointmentRouter)

export default router
