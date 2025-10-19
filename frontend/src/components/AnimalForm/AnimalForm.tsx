import { useState } from 'react'
import { useAnimalStore } from '../../store/store'
import './AnimalForm.css'

export default function AnimalForm() {
	const { addAnimal, isLoading } = useAnimalStore()

	const [name, setName] = useState('')
	const [species, setSpecies] = useState('')
	const [birthDate, setBirthDate] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!name || !species || !birthDate) {
			alert('Please fill all fields')
			return
		}

		await addAnimal({ name, species, birth_date: birthDate })

		// Clear form
		setName('')
		setSpecies('')
		setBirthDate('')
	}

	return (
		<div className="animal-form-container">
			<h2>Add New Animal</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-field">
					<label>
						Name:
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</label>
				</div>
				<div className="form-field">
					<label>
						Species:
						<input
							type="text"
							value={species}
							onChange={(e) => setSpecies(e.target.value)}
						/>
					</label>
				</div>
				<div className="form-field">
					<label>
						Birth Date:
						<input
							type="date"
							value={birthDate}
							onChange={(e) => setBirthDate(e.target.value)}
						/>
					</label>
				</div>
				<button type="submit" disabled={isLoading}>
					{isLoading ? 'Adding...' : 'Add Animal'}
				</button>
			</form>
		</div>
	)
}
