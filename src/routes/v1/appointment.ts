import express from "express"
const router = express.Router()

import {
	addAppointment,
	getAll,
	getAppointmentById,
	getAppointmentsByPatientId,
	getAppointmentsByProviderId,
	updateAppointmentStatus,
	deleteAppointment,
	updateAppointment
} from "../../controllers/appointment"

router.post("/", addAppointment)

router.get("/:id", getAppointmentById)

router.get("/patient/:id", getAppointmentsByPatientId)

router.get("/provider/:id", getAppointmentsByProviderId)

router.get("/", getAll)

router.put("/:id", updateAppointment)

router.patch("/:id", updateAppointmentStatus)

router.delete("/:id", deleteAppointment)

export default router
