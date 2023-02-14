import express from "express";
const router = express.Router();

import {
  addAppointment,
  getAll,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../../controllers/appointment";

router.post("/", addAppointment);

router.get("/:id", getAppointmentById);

router.get("/", getAll);

router.put("/:id", updateAppointment);

router.delete("/:id", deleteAppointment);

export default router;
