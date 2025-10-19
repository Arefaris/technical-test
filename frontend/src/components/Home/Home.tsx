import AnimalForm from '../AnimalForm/AnimalForm'
import AnimalList from '../AnimalList/AnimalList'
import './Home.css'

export default function Home() {
	return (
		<div className="home-container">
			<h1>Animal Management</h1>
			<AnimalForm />
			<AnimalList />
		</div>
	)
}
