import { useState } from 'react'
import { useAnimalStore } from '../../store/store'
import type { Event } from '../../types/types'
import './EventForm.css'

interface EventFormProps {
	animalId: string
}

export default function EventForm({ animalId }: EventFormProps) {
	const { addEvent, isLoading } = useAnimalStore()

	const [type, setType] = useState<Event['type']>('Visit')
	const [description, setDescription] = useState('')
	const [eventDate, setEventDate] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!type || !description || !eventDate) {
			alert('Please fill all fields')
			return
		}

		await addEvent(animalId, {
			type,
			description,
			event_date: eventDate
		})

		// Clear form
		setType('Visit')
		setDescription('')
		setEventDate('')
	}

	return (
		<div className="event-form-container">
			<h3>Add New Event</h3>
			<form onSubmit={handleSubmit}>
				<div className="form-field">
					<label>Event Type:</label>
					<select value={type} onChange={(e) => setType(e.target.value as Event['type'])}>
						<option value="Visit">Visit</option>
						<option value="Treatment">Treatment</option>
						<option value="Observation">Observation</option>
					</select>
				</div>
				<div className="form-field">
					<label>Description:</label>
					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="form-field">
					<label>Date:</label>
					<input
						type="date"
						value={eventDate}
						onChange={(e) => setEventDate(e.target.value)}
					/>
				</div>
				<button type="submit" disabled={isLoading}>
					{isLoading ? 'Adding...' : 'Add Event'}
				</button>
			</form>
		</div>
	)
}
