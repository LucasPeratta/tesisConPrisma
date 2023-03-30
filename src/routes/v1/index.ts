import { Router } from "express"

import appointmentRouter from "./appointment"
import patientRouter from "./patient"
import providerRouter from "./provider"
import adminRouter from "./admin"

const router = Router()

router.use("/patient", patientRouter)
router.use("/provider", providerRouter)
router.use("/appointment", appointmentRouter)
router.use("/admin", adminRouter)

export default router
