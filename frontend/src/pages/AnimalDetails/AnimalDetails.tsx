import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useAnimalStore } from '../../store/store'
import EventList from '../../components/EventList/EventList'
import EventForm from '../../components/EventForm/EventForm'
import './AnimalDetails.css'

const serverUrl = "http://localhost:5001/api"

export default function AnimalDetails() {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const { currentAnimal, getAnimalById, isLoading, error } = useAnimalStore()

	const handleExportExcel = async () => {
		if (!id) return

		try {
			const response = await fetch(`${serverUrl}/${id}/export`)
			const blob = await response.blob()

			//Create download link
			const url = window.URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = url
			link.download = `animal_${id}_${currentAnimal?.name || 'export'}.xlsx`
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
			window.URL.revokeObjectURL(url)
		} catch (error) {
			console.error('Failed to export:', error)
			alert('Failed to export Excel file')
		}
	}

	useEffect(() => {
		if (id) {
			getAnimalById(id)
		}
	}, [id, getAnimalById])

	if (isLoading) {
		return <div className="loading">Loading animal details...</div>
	}

	if (error) {
		return (
			<div className="error-container">
				<p className="error-message">Error: {error}</p>
				<button onClick={() => navigate('/')}>Back to Animals</button>
			</div>
		)
	}

	if (!currentAnimal) {
		return (
			<div className="error-container">
				<p>Animal not found</p>
				<button onClick={() => navigate('/')}>Back to Animals</button>
			</div>
		)
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

	return (
		<div className="animal-details-container">
			<div className="header-actions">
				<button className="back-button" onClick={() => navigate('/')}>
					← Back to Animals
				</button>
				<button className="export-button" onClick={handleExportExcel}>
					📥 Export to Excel
				</button>
			</div>

			<div className="animal-info-card">
				<h1>{currentAnimal.name}</h1>
				<div className="animal-info-grid">
					<div>
						<strong>Species:</strong> {currentAnimal.species}
					</div>
					<div>
						<strong>Age:</strong> {calculateAge(currentAnimal.birth_date)} years
					</div>
					<div>
						<strong>Birth Date:</strong> {currentAnimal.birth_date}
					</div>
				</div>
			</div>

			<EventList events={currentAnimal.events} />

			<EventForm animalId={currentAnimal.id} />
		</div>
	)
}
