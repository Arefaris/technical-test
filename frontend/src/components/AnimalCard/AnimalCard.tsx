import { Link } from 'react-router'
import type { Animal } from '../../types/types'
import './AnimalCard.css'

interface AnimalCardProps {
	animal: Animal
}

const calculateAge = (birthDate: string): number => {
	const birth = new Date(birthDate)
	const today = new Date()
	let age = today.getFullYear() - birth.getFullYear()
	const monthDiff = today.getMonth() - birth.getMonth()

	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
		age--
	}

	return age
}

export default function AnimalCard({ animal }: AnimalCardProps) {
	return (
		<Link to={`/animals/${animal.id}`} className="animal-card-link">
			<div className="animal-card">
				<h3>{animal.name}</h3>
				<p><strong>Species:</strong> {animal.species}</p>
				<p><strong>Age:</strong> {calculateAge(animal.birth_date)} years</p>
				<p><strong>Birth Date:</strong> {animal.birth_date}</p>
			</div>
		</Link>
	)
}
