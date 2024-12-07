/* import cors from "cors"
import morgan from "morgan"
import express from "express"

import swaggerUI from "swagger-ui-express"
import swaggerSpec from "./utils/swagger.js"
import connectToDatabase from "./utils/database.js"
import { authToken } from "./src/middleware/authToken.js"

import AppError from "./utils/appError.js"
import globalErrorHandler from "./src/controller/error.controller.js"

import authRouter from "./src/routes/auth.routes.js"
import studentRouter from "./src/routes/student.routes.js"
import sessionMiddleware from "./src/middleware/session.js"

const app = express()

// CHECKPOINT: 1. Create a new Express application with the necessary middlewares

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"))
}
app.use(express.json())
app.use(cors())

// TODO: Session middleware, need to check  again
app.use(sessionMiddleware)

// CHECKPOINT: 2. Create a connection to the database

connectToDatabase()

// CHECKPOINT: 3. Serve Swagger documentation

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui.min.css"

app.use(
	"/api-docs",
	swaggerUI.serve,
	swaggerUI.setup(swaggerSpec, {
		swaggerOptions: {
			docExpansion: "none",
		},
		explorer: true,
		customCssUrl: CSS_URL,
	})
)

// CHECKPOINT: 4. Create a new Express Router

// NOTE: Auth routes
app.use("/api/v1/auth", authRouter)
// NOTE: Student routes
app.use("/api/v1/students", authToken, studentRouter)

// CHECKPOINT: 5. Handling unhandled routes

app.all("*", (req, res, next) => {
	// NOTE: If next() is called with an argument, Express will assume that it is an error and will skip all the other middlewares and send the error to the global error handling middleware
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

// CHECKPOINT: 6. Global error handling middleware

app.use(globalErrorHandler)

// CHECKPOINT: 7. Export the app for running the server

export default app
 */
