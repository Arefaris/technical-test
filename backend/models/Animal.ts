import db from "../config/database"
import { Animal, AnimalWithEvents } from "../types/animal"

//GET /animals 
export const getAll = async (): Promise<Animal[]> => {
	return await db("animals").select("*")
}

//POST /animals 
export const create = async (animal: Omit<Animal, "id">): Promise<Animal> => {
	const [id] = await db("animals").insert(animal)
	const created = await db("animals").where({ id }).first()
	return created
}
//for quick look up in animal controller
export const getById = async (id: number): Promise<Animal | undefined> => {
	return await db("animals").where({ id }).first()
}

//GET /animals/:id - Fetches details of an animal along with its events
export const getByIdWithEvents = async (id: number): Promise<AnimalWithEvents | null> => {
	const animal = await db("animals").where({ id }).first()

	if (!animal) {
		return null
	}

	const events = await db("events")
		.where({ animal_id: id })
		.select("id", "type", "description", "event_date")

	return {
		...animal,
		events
	}
}
