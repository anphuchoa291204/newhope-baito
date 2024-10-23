import User from "../../models/user.js"
import { formatDate } from "../../utils/helpers.js"
import bcrypt from "bcrypt"

const login = async (req, res) => {
	const { email, password } = req.body
	const sessionId = req.sessionID // Get the session ID

	try {
		// Find the user by email
		const user = await User.findOne({ email })

		if (user && user.password === password && user.is_active) {
			// Update the login_timestamp and user_agent
			user.login_timestamp = formatDate(new Date())
			user.user_agent = req.headers["user-agent"] // Get the user agent from headers

			user.session_id = sessionId // Set the session_id

			user.login_status = "success" // Set the login_status to true
			user.failed_attempts = 0 // Reset the failed_attempts counter

			await user.save() // Save the updated user document

			// Store user ID in the session
			req.session.userId = user._id

			res.status(200).json({ message: "Login successful" })
		} else {
			// if (user.failed_attempts >= 3) {
			// 	user.is_active = false // Lock the account if the failed_attempts counter reaches 3
			// 	return res.status(401).json({ message: "Account locked. Please reset your password" })
			// }

			user.failed_attempts += 1 // Increment the failed_attempts counter
			user.login_status = "failure" // Set the login_status to false
			user.fail_login_timestamp = formatDate(new Date())
			await user.save() // Save the updated user document

			res.status(401).json({ message: "Invalid email or password" })
		}
	} catch (err) {
		console.error("Error during login:", err)
		res.status(500).json({ error: "An error occurred during login", details: err })
	}
}

// TODO: Check logout function - not working yet
const logout = async (req, res) => {
	const { email } = req.body

	try {
		// Check if the user is logged in and session exists
		const user = await User.findOne({ email })

		if (!user) {
			return res.status(404).json({ message: "User not found" })
		}

		// Update the user's status and clear the auth_token
		user.auth_token = null // Invalidate the auth token
		user.logout_timestamp = formatDate(new Date())
		user.session_id = null // Clear the session ID

		await user.save() // Save the updated user document

		// Send successful logout response
		res.status(200).json({ message: "Logout successful" })
	} catch (error) {
		console.error("Logout error:", error)
		res.status(500).json({ message: "Internal server error" })
	}
}

const signup = async (req, res) => {
	const { email, password } = req.body

	// Basic input validation
	if (!email || !password) {
		return res.status(400).json({ message: "Email and password are required" })
	}

	try {
		// Check if the email is already in use
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.status(409).json({ message: "Email already exists" })
		}

		// Hash the password before saving
		const hashedPassword = await bcrypt.hash(password, 10)

		// Create the user with the hashed password
		await User.create({
			email,
			password: hashedPassword,
		})

		res.status(201).json({ message: "User created successfully" })
	} catch (error) {
		console.error("Register error:", error)

		// Handle MongoDB validation error for unique constraint
		if (error.code === 11000) {
			return res.status(409).json({ message: "Email already exists" })
		}

		res.status(500).json({ message: "Internal server error" })
	}
}

export { login, logout, signup }
