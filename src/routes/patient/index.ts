import express from "express";
const router = express.Router();

import {
  addPatient,
  getAll,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../../controllers/patient";

router.post("/", addPatient);

router.get("/:id", getPatientById);

router.get("/", getAll);

router.put("/:id", updatePatient);

router.delete("/:id", deletePatient);

export default router;
