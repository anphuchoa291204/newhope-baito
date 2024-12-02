import swaggerJSDoc from "swagger-jsdoc"

const swaggerDefinition = {
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
}

const options = {
	swaggerDefinition,
	apis: ["./src/routes/*.js"],
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec
