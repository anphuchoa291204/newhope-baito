import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

let isConnected = false

const connectToDatabase = async () => {
	// mongoose.set('strictQuery', true)

	if (isConnected) {
		console.log("mongoDB is already connected")
		return
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "AgencySoftware",
		})

		isConnected = true

		console.log("mongoDB connected")
	} catch (error) {
		console.error(error)
	}
}

export default connectToDatabase
