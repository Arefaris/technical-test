import { create } from "zustand"
import axios from "axios"
import type { Animal, AnimalWithEvents, Event } from "../types/types"

const serverUrl = "http://localhost:5001/api"

interface AnimalStore {
	animals: Animal[]
	currentAnimal: AnimalWithEvents | null
	isLoading: boolean
	error: string | null

	// Animal Actions
	fetchAnimals: () => Promise<void>
	addAnimal: (animal: Omit<Animal, "id" | "created_at" | "updated_at">) => Promise<void>
	getAnimalById: (id: string) => Promise<void>

	// Event Actions
	addEvent: (animalId: string, event: Omit<Event, "id" | "animal_id" | "created_at" | "updated_at">) => Promise<void>

	clearError: () => void
}

export const useAnimalStore = create<AnimalStore>((set) => ({
	animals: [],
	currentAnimal: null,
	isLoading: false,
	error: null,

	fetchAnimals: async () => {
		set({ isLoading: true, error: null })
		try {
			const response = await axios.get(`${serverUrl}/animals`)
			set({ animals: response.data, isLoading: false })
		} catch (error: any) {
			set({ error: error.message || "Failed to fetch animals", isLoading: false })
		}
	},

	addAnimal: async (animal) => {
		set({ isLoading: true, error: null })
		try {
			const response = await axios.post(`${serverUrl}/animals`, animal)
			set((state) => ({
				animals: [...state.animals, response.data],
				isLoading: false
			}))
		} catch (error: any) {
			set({ error: error.message || "Failed to add animal", isLoading: false })
		}
	},

	getAnimalById: async (id: string) => {
		set({ isLoading: true, error: null })
		try {
			const response = await axios.get(`${serverUrl}/${id}`)
			set({ currentAnimal: response.data, isLoading: false })
		} catch (error: any) {
			set({ error: error.message || "Failed to fetch animal", isLoading: false })
		}
	},

	addEvent: async (animalId: string, event) => {
		set({ isLoading: true, error: null })
		try {
			const response = await axios.post(`${serverUrl}/animals/${animalId}/events`, event)

			// Update currentAnimal with new event
			set((state) => {
				if (state.currentAnimal && state.currentAnimal.id === animalId) {
					return {
						currentAnimal: {
							...state.currentAnimal,
							events: [...state.currentAnimal.events, response.data]
						},
						isLoading: false
					}
				}
				return { isLoading: false }
			})
		} catch (error: any) {
			set({ error: error.message || "Failed to add event", isLoading: false })
		}
	},

	clearError: () => set({ error: null })
}))
