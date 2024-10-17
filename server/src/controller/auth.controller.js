import User from "../../models/user.js"
import { formatDate } from "../../utils/helpers.js"

const login = async (req, res) => {
	const { email, password } = req.body

	try {
		// Find the user by email
		const user = await User.findOne({ email })

		if (user && user.password === password && user.is_active) {
			// Get the user's IP address
			const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress

			// Update the login_timestamp and user_agent
			user.login_timestamp = formatDate(new Date())
			user.user_agent = req.headers["user-agent"] // Get the user agent from headers
			user.ip_address = ipAddress // Store the IP address

			user.login_status = "success" // Set the login_status to true
			user.failed_attempts = 0 // Reset the failed_attempts counter

			await user.save() // Save the updated user document

			res.status(200).json({ message: "Login successful" })
		} else {
			// if (user.failed_attempts >= 3) {
			// 	user.is_active = false // Lock the account if the failed_attempts counter reaches 3
			// 	return res.status(401).json({ message: "Account locked. Please reset your password" })
			// }

			console.log(user.failed_attempts)

			user.failed_attempts += 1 // Increment the failed_attempts counter
			user.login_status = "failure" // Set the login_status to false
			await user.save() // Save the updated user document

			res.status(401).json({ message: "Invalid email or password" })
		}
	} catch (err) {
		console.error("Error during login:", err)
		res.status(500).json({ error: "An error occurred during login", details: err })
	}
}

export default login
