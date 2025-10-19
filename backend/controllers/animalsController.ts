import { Request, Response } from "express"
import * as AnimalModel from "../models/Animal"
import * as EventModel from "../models/Event"
import { generateAnimalExcel } from "../config/excel"

// GET /animals - Lists all animals
export const getAllAnimals = async (req: Request, res: Response) => {
	try {
		const animals = await AnimalModel.getAll()
		res.json(animals)
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch animals" })
	}
}

// POST /animals 
export const addAnimal = async (req: Request, res: Response) => {
	try {
		const { name, species, birth_date } = req.body

		if (!name || !species || !birth_date) {
			return res.status(400).json({ error: "Missing required fields: name, species, birth_date" })
		}

		const newAnimal = await AnimalModel.create({ name, species, birth_date })
		res.status(201).json(newAnimal)
	} catch (error) {
		res.status(500).json({ error: "Failed to create animal" })
	}
}

// GET /animals/:id 
export const getAnimalById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const animal = await AnimalModel.getByIdWithEvents(parseInt(id))

		if (!animal) {
			return res.status(404).json({ error: "Animal not found" })
		}

		res.json(animal)
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch animal" })
	}
}

// POST /animals/:id/events
export const addAnimalEvent = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const { type, description, event_date } = req.body

		if (!type || !event_date) {
			return res.status(400).json({ error: "Missing required fields: type, event_date" })
		}

		
		const animal = await AnimalModel.getById(parseInt(id))
		if (!animal) {
			return res.status(404).json({ error: "Animal not found" })
		}

		const newEvent = await EventModel.create({
			animal_id: parseInt(id),
			type,
			description: description || "",
			event_date
		})

		res.status(201).json(newEvent)
	} catch (error) {
		res.status(500).json({ error: "Failed to create event" })
	}
}


//Generates an Excel file for an animal
export const exportAnimal = async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		const animal = await AnimalModel.getByIdWithEvents(parseInt(id))

		if (!animal) {
			return res.status(404).json({ error: "Animal not found" })
		}

		const buffer = generateAnimalExcel(animal)

		//headers for file download
		res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
		res.setHeader("Content-Disposition", `attachment; filename=animal_${id}_${animal.name}.xlsx`)

		res.send(buffer)
	} catch (error) {
		res.status(500).json({ error: "Failed to export animal data" })
	}
}
