import { Router } from "express"
import {
	getAllAnimals,
	addAnimal,
	getAnimalById,
	addAnimalEvent,
	exportAnimal
} from "../controllers/animalsController"

const router = Router()


router.get("/animals", getAllAnimals)


router.post("/add", addAnimal)


router.get("/:id", getAnimalById)


router.post("/:id/events", addAnimalEvent)


router.get("/:id/export", exportAnimal)

export default router
