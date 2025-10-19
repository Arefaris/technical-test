import { useEffect } from 'react'
import { useAnimalStore } from '../../store/store'
import AnimalCard from '../AnimalCard/AnimalCard'
import './AnimalList.css'

export default function AnimalList() {
	const { animals, fetchAnimals, isLoading, error } = useAnimalStore()

	useEffect(() => {
		fetchAnimals()
	}, [fetchAnimals])

	return (
		<div className="animal-list-container">
			{error && <div className="error-message">Error: {error}</div>}

			<h2>Animals List</h2>
			{isLoading && <div>Loading...</div>}

			<div className="animals-grid">
				{animals.map((animal) => (
					<AnimalCard key={animal.id} animal={animal} />
				))}
			</div>
		</div>
	)
}
