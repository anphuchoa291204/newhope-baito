import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../../models/user.js"
import Profile from "../../models/profile.js"

import AppError from "../../utils/appError.js"
import catchAsync from "../../utils/catchAsync.js"
import { formatDate } from "../../utils/helpers.js"

const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body
	const sessionId = req.sessionID

	// Find the user by email
	const user = await User.findOne({ email })
	const profile = await Profile.findOne({ user_id: user._id })
	const accessToken = jwt.sign(
		{ email, name: profile.fullname, role: user.role },
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: "24h" }
	)

	if (!user) {
		return next(new AppError(`Invalid email or password`, 401))
	}

	// Compare the provided password with the hashed password stored in the database
	const passwordMatch = await bcrypt.compare(password, user.password)

	if (passwordMatch && user.is_active) {
		user.failed_attempts = 0
		user.session_id = sessionId
		user.login_status = "success"
		user.user_agent = req.headers["user-agent"]
		user.login_timestamp = formatDate(new Date())
		user.auth_token = accessToken

		await user.save()

		// Store user ID in the session
		// req.session.userId = user._id

		res.status(200).json({
			status: "success",
			message: "Login successful",
			data: {
				accessToken,
				userId: user._id,
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
		next(new AppError(`Invalid email or password`, 401))
	}
})

// TODO: Check logout function - not working yet
const logout = catchAsync(async (req, res, next) => {
	const { email } = req.body

	if (!email) {
		return next(new AppError(`Email is required`, 400))
	}

	// Check if the user is logged in and session exists
	const user = await User.findOne({ email })

	if (!user) {
		return next(new AppError(`User not found`, 404))
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
})

// TODO: Need to check for the code of 11000 for duplicate email
const signup = catchAsync(async (req, res, next) => {
	const { email, password, userProfile } = req.body

	if (!email || !password) {
		return next(new AppError(`Email and password are required`, 400))
	}
	// Check if the email is already in use
	const existingUser = await User.findOne({ email })
	if (existingUser) {
		return next(new AppError(`Email already exists`, 409))
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

	// // NOTE: Handle MongoDB validation error for unique constraint
	// if (error.code === 11000) {
	// 	return res.status(409).json({
	// 		status: "fail",
	// 		message: "Email already exists",
	// 	})
	// }
})

export { login, logout, signup }
