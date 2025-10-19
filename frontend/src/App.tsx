import { Routes, Route } from 'react-router'
import './App.css'
import Home from './components/Home/Home'
import AnimalDetails from './pages/AnimalDetails/AnimalDetails'

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/animals/:id" element={<AnimalDetails />} />
		</Routes>
	)
}

export default App
