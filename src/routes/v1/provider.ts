import express from "express"
const router = express.Router()

import {
  addProvider,
  getAll,
  getProviderById,
  updateProvider,
  deleteProvider
} from "../../controllers/providers"

router.post("/", addProvider)

router.get("/:id", getProviderById)

router.get("/", getAll)

router.put("/:id", updateProvider)

router.delete("/:id", deleteProvider)

export default router
