import jwt from "jsonwebtoken"

import User from "../../models/user.js"
import Profile from "../../models/profile.js"

import AppError from "../../utils/appError.js"
import catchAsync from "../../utils/catchAsync.js"
import { formatDate } from "../../utils/helpers.js"

const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body
	const sessionId = req.sessionID

	// Find user and profile
	const user = await User.findOne({ email }).select("+password")
	if (!user) {
		return next(new AppError("Invalid email or password", 401))
	}

	const profile = await Profile.findOne({ user_id: user?._id })
	if (!profile) {
		return next(new AppError("User profile not found", 401))
	}

	// Validate password
	const isValidPassword = await user.passwordMatch(password, user.password)
	if (!isValidPassword) {
		// if (user.failed_attempts >= 3) {
		// 	user.is_active = false // Lock the account if the failed_attempts counter reaches 3
		// 	return res.status(401).json({ message: "Account locked. Please reset your password" })
		// }

		// Handle failed login attempt
		user.failed_attempts += 1
		user.login_status = "failure"
		user.fail_login_timestamp = formatDate(new Date())
		await user.save()

		return next(new AppError("Invalid email or password", 401))
	}

	// Check account status
	if (!user.is_active) {
		return next(new AppError("Account is locked. Please reset your password", 401))
	}

	// Generate access token
	const accessToken = jwt.sign(
		{ email, name: profile.fullname, role: profile.role },
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
	)

	// Update successful login data
	user.failed_attempts = 0
	user.session_id = sessionId
	user.login_status = "success"
	user.user_agent = req.headers["user-agent"]
	user.login_timestamp = formatDate(new Date())
	user.auth_token = accessToken

	await user.save()

	// Send success response
	res.status(200).json({
		status: "success",
		message: "Login successful",
		data: {
			accessToken,
			userId: user._id,
		},
	})
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

	const user = await User.create({
		email,
		password,
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
})

export { login, logout, signup }
