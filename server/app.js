import cors from "cors"
import morgan from "morgan"
import express from "express"
import swaggerSpec from "./swagger.js"
import swaggerUI from "swagger-ui-express"
import connectToDatabase from "./utils/database.js"
import authRouter from "./src/routes/auth.routes.js"
import studentRouter from "./src/routes/student.routes.js"
// import sessionMiddleware from "./src/middleware/session.js"

const app = express()

// Middleware
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"))
}

app.use(express.json())
app.use(cors())
// app.use(sessionMiddleware())

// Connect to MongoDB
connectToDatabase()

// CHECKPOINT: Serve Swagger documentation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

// CHECKPOINT: Auth routes
app.use("/auth", authRouter)

// CHECKPOINT: Student routes
app.use("/students", studentRouter)

app.get("/", (req, res) => {
	res.send("Hello World")
})

export default app
