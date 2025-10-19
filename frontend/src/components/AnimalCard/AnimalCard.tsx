import { Link } from 'react-router'
import type { Animal } from '../../types/types'
import './AnimalCard.css'

interface AnimalCardProps {
	animal: Animal
}

const calculateAge = (birthDate: string): string => {
	const birth = new Date(birthDate)
	const today = new Date()

	let years = today.getFullYear() - birth.getFullYear()
	let months = today.getMonth() - birth.getMonth()

	if (today.getDate() < birth.getDate()) {
		months--
	}

	if (months < 0) {
		years--
		months += 12
	}

	const yearString = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : ''
	const monthString =
		months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''

	if (yearString && monthString) {
		return `${yearString}, ${monthString}`
	}
	if (yearString) {
		return yearString
	}
	if (monthString) {
		return monthString
	}
	return 'Less than a month old'
}

export default function AnimalCard({ animal }: AnimalCardProps) {
	return (
		<Link to={`/animals/${animal.id}`} className="animal-card-link">
			<div className="animal-card">
				<h3>{animal.name}</h3>
				<p><strong>Species:</strong> {animal.species}</p>
				<p><strong>Age:</strong> {calculateAge(animal.birth_date)}</p>
				<p><strong>Birth Date:</strong> {animal.birth_date}</p>
			</div>
		</Link>
	)
}
