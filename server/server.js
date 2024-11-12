import dotenv from "dotenv"
dotenv.config()

import app from "./app.js"

app.listen(8080, () => {
	console.log("Server is running on port 8080")
})
