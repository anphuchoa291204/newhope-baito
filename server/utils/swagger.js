import path from "path"
import { fileURLToPath } from "url"
import swaggerJSDoc from "swagger-jsdoc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Newhope baito API",
			version: "1.0.0",
			description: "API for Newhope Baito Admin",
		},
		tags: [
			{
				name: "Authentication",
				description: "Endpoints related to user authentication",
			},
			{
				name: "Students",
				description: "Endpoints for managing students",
			},
		],
		servers: [
			{
				url: "http://localhost:8080/",
				description: "Development server",
			},
			{
				url: "https://api-newhope-baito.vercel.app",
				description: "Production server",
			},
		],
		// Add security schemes
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		// Apply security globally
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: [path.join(__dirname, "./../src/routes/*.js")],
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec
