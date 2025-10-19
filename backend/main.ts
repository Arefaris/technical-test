import e from "express"
import dotenv from "dotenv"
import animalsRoutes from "./routes/animals"

dotenv.config()

const app = e()
app.use(e.json())
const PORT = process.env.PORT || 5001

//Routes
app.use("/api", animalsRoutes)

app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`)
})
