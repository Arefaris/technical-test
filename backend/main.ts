import e from "express"
import dotenv from "dotenv"

dotenv.config()

const app = e()
app.use(e.json())
const PORT = process.env.PORT || 5001

app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`)
})
