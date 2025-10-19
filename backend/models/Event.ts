import db from "../config/database"
import { Event } from "../types/animal"

// POST /animals/:id/events - Adds an event for an animal
export const create = async (event: Omit<Event, "id">): Promise<Event> => {
	const [id] = await db("events").insert(event)
	const created = await db("events").where({ id }).first()
	return created
}

// GET /events - Lists all events
export const getAll = async (): Promise<Event[]> => {
	return await db("events").select("*")
}

// GET /events/:id - Get event by id
export const getById = async (id: number): Promise<Event | undefined> => {
	return await db("events").where({ id }).first()
}

// GET /events by animal_id
export const getByAnimalId = async (animalId: number): Promise<Event[]> => {
	return await db("events").where({ animal_id: animalId }).select("*")
}
