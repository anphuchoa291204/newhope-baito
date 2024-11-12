import bcrypt from "bcrypt"
import User from "../../models/user.js"
import Profile from "../../models/profile.js"
import { formatDate } from "../../utils/helpers.js"

const login = async (req, res) => {
	const { email, password } = req.body
	const sessionId = req.sessionID

	try {
		// Find the user by email
		const user = await User.findOne({ email })

		if (user && user.is_active) {
			// Compare the provided password with the hashed password stored in the database
			const passwordMatch = await bcrypt.compare(password, user.password)

			if (passwordMatch) {
				user.failed_attempts = 0
				user.session_id = sessionId
				user.login_status = "success"
				user.user_agent = req.headers["user-agent"]
				user.login_timestamp = formatDate(new Date())

				await user.save()

				// Store user ID in the session
				// req.session.userId = user._id

				res.status(200).json({
					status: "success",
					message: "Login successful",
					data: {
						role: user.role,
						email: user.email,
					},
				})
			} else {
				// if (user.failed_attempts >= 3) {
				// 	user.is_active = false // Lock the account if the failed_attempts counter reaches 3
				// 	return res.status(401).json({ message: "Account locked. Please reset your password" })
				// }

				user.failed_attempts += 1
				user.login_status = "failure"
				user.fail_login_timestamp = formatDate(new Date())

				await user.save()

				res.status(401).json({ status: "fail", message: "Invalid email or password" })
			}
		} else {
			res.status(401).json({ status: "fail", message: "Invalid email or password" })
		}
	} catch (error) {
		res.status(500).json({ status: "fail", message: "An error occurred during login", error })
	}
}

// TODO: Check logout function - not working yet
const logout = async (req, res) => {
	const { email } = req.body

	try {
		// Check if the user is logged in and session exists
		const user = await User.findOne({ email })

		if (!user) {
			return res.status(404).json({ status: "fail", message: "User not found" })
		}

		// Update the user's status and clear the auth_token
		user.auth_token = null
		user.session_id = null
		user.logout_timestamp = formatDate(new Date())

		await user.save()

		res.status(200).json({
			status: "success",
			message: "Logout successful",
		})
	} catch (error) {
		res.status(500).json({ status: "fail", message: "Internal server error" })
	}
}

const signup = async (req, res) => {
	const { email, password, userProfile } = req.body

	if (!email || !password) {
		return res.status(400).json({ status: "fail", message: "Email and password are required" })
	}

	try {
		// Check if the email is already in use
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.status(409).json({ status: "fail", message: "Email already exists" })
		}

		// Hash the password before saving
		const hashedPassword = await bcrypt.hash(password, 10)

		const user = await User.create({
			email,
			password: hashedPassword,
		})

		// Create the profile with all required fields
		await Profile.create({
			user_id: user._id,
			fullname: userProfile.fullname,
			date_of_birth: userProfile.dateofbirth,
			gender: userProfile.gender,
			phone_number: userProfile.phonenumber,
			nationality: userProfile.nationality,
			major: userProfile.major,
			japan_skill: userProfile.japanSkill,
			other_language: userProfile.otherLang ?? "",
		})

		res.status(201).json({
			status: "success",
			message: "User created successfully",
		})
	} catch (error) {
		// NOTE: Handle MongoDB validation error for unique constraint
		if (error.code === 11000) {
			return res.status(409).json({
				status: "fail",
				message: "Email already exists",
			})
		}

		res.status(500).json({
			status: "fail",
			message: "Internal server error",
			error,
		})
	}
}

export { login, logout, signup }
