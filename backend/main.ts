import e from "express"
import dotenv from "dotenv"
import animalsRoutes from "./routes/animals"
import { initDatabase } from "./config/database"

dotenv.config()

const app = e()
app.use(e.json())
const PORT = process.env.PORT || 5001

//Routes
app.use("/api", animalsRoutes)

const startServer = async () => {
	try {
		await initDatabase()
		app.listen(PORT, () => {
			console.log(`Server running on PORT: ${PORT}`)
		})
	} catch (error) {
		console.error("Failed to start server:", error)
		process.exit(1)
	}
}

startServer()
