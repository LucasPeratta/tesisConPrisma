import express from "express"
const router = express.Router()

// Import all routers here
import patientRoutes from "./patient"
import providerRoutes from "./provider"

// Link all routers to the main router
router.use("/patients", patientRoutes)
router.use("/providers", providerRoutes)

export default router;
