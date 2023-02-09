import express from "express"
const router = express.Router()

// Import all routers here
import patientRoutes from "./patient"

// Link all routers to the main router
router.use("/patients", patientRoutes)

export default router;
