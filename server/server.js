import cors from "cors"
import morgan from "morgan"
import express from "express"
import connectToDatabase from "./utils/database.js"
import authRouter from "./src/routes/auth.routes.js"
import sessionMiddleware from "./src/middleware/session.js"

const app = express()

// Middleware
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())
// app.use(sessionMiddleware())

// Connect to MongoDB
connectToDatabase()

// Use the auth routes
app.use("/auth", authRouter)

app.get("/", (req, res) => {
	res.send("Hello World")
})

app.listen(8080, () => {
	console.log("Server is running on port 8080")
})
