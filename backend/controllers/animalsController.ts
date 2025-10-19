import { Request, Response } from "express"


export const getAllAnimals = (req: Request, res: Response) => {
	const animals = [
		{ id: 1, name: "Lion", species: "Panthera leo", age: 5 },
		{ id: 2, name: "Elephant", species: "Loxodonta africana", age: 10 },
		{ id: 3, name: "Giraffe", species: "Giraffa camelopardalis", age: 7 }
	]

	res.json(animals)
}


export const addAnimal = (req: Request, res: Response) => {
	const { name, species, age } = req.body

	const newAnimal = {
		id: Date.now(),
		name,
		species,
		age
	}

	res.status(201).json(newAnimal)
}


export const getAnimalById = (req: Request, res: Response) => {
	const { id } = req.params

	const animal = {
		id: parseInt(id),
		name: "Lion",
		species: "Panthera leo",
		age: 5,
		events: [
			{ id: 1, type: "Feeding", date: "2024-10-15", description: "Morning feeding" },
			{ id: 2, type: "Checkup", date: "2024-10-18", description: "Routine health check" }
		]
	}

	res.json(animal)
}


export const addAnimalEvent = (req: Request, res: Response) => {
	const { id } = req.params
	const { type, date, description } = req.body

	const newEvent = {
		id: Date.now(),
		animalId: parseInt(id),
		type,
		date,
		description
	}

	res.status(201).json(newEvent)
}


export const exportAnimal = (req: Request, res: Response) => {
	const { id } = req.params

	
	res.json({
		message: `Excel export for animal ID ${id} would be generated here`,
		animalId: parseInt(id),
		exportFormat: "xlsx"
	})
}
