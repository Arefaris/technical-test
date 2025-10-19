import * as XLSX from "xlsx"
import { AnimalWithEvents } from "../types/animal"

export const generateAnimalExcel = (animal: AnimalWithEvents): Buffer => {
	
	const workbook = XLSX.utils.book_new()

	
	const animalInfo = [
		["Animal Information"],
		["ID", animal.id],
		["Name", animal.name],
		["Species", animal.species],
		["Birth Date", animal.birth_date],
		[""],
		["Events History"]
	]

	
	const eventsHeaders = ["Event ID", "Type", "Description", "Event Date"]


	const eventsData = animal.events.map(event => [
		event.id,
		event.type,
		event.description,
		event.event_date
	])


	const sheetData = [
		...animalInfo,
		eventsHeaders,
		...eventsData
	]

	
	const worksheet = XLSX.utils.aoa_to_sheet(sheetData)

	XLSX.utils.book_append_sheet(workbook, worksheet, "Animal Details")

	
	const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

	return buffer
}
