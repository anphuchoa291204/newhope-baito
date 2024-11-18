import dotenv from "dotenv"
dotenv.config()

import app from "./app.js"

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log("Server is running on port 8080")
})

// CHECKPOINT: UNHANDLED REJECTION
process.on("unhandledRejection", (err) => {
	console.log(err.name, err.message)
	console.log("UNHANDLED REJECTION! Shutting down...")
	process.exit(1)
})
