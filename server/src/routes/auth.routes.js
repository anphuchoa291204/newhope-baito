// // routes/auth.js

// const express = require('express')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const User = require('../../models/user') // Import the user model

// const router = express.Router()

// // Login route
// router.post('/login', async (req, res) => {
// 	const { username, password } = req.body

// 	try {
// 		// Find the user by username
// 		const user = await User.findOne({ username })

// 		if (!user) {
// 			return res.status(404).json({ message: 'User not found' })
// 		}

// 		// Validate password
// 		const isPasswordValid = await bcrypt.compare(password, user.auth_token) // Assuming `auth_token` is used for password storage
// 		if (!isPasswordValid) {
// 			user.failed_attempts += 1
// 			await user.save()
// 			return res.status(401).json({ message: 'Invalid credentials' })
// 		}

// 		// Generate a new JWT token for the session
// 		const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

// 		// Update user details on successful login
// 		user.login_status = 'success'
// 		user.last_login = new Date()
// 		user.login_timestamp = new Date()
// 		user.auth_token = authToken // Update with the new token
// 		user.failed_attempts = 0
// 		user.is_active = true
// 		user.ip_address = req.ip
// 		user.user_agent = req.headers['user-agent']
// 		user.session_id = `session-${new Date().getTime()}` // Generate a new session ID
// 		await user.save()

// 		// Send response
// 		res.status(200).json({ message: 'Login successful', authToken })
// 	} catch (error) {
// 		console.error('Login error:', error)
// 		res.status(500).json({ message: 'Internal server error' })
// 	}
// })

// // Logout route
// router.post('/logout', async (req, res) => {
// 	const { username } = req.body

// 	try {
// 		// Find the user by username
// 		const user = await User.findOne({ username })

// 		if (!user) {
// 			return res.status(404).json({ message: 'User not found' })
// 		}

// 		// Update logout details
// 		user.logout_timestamp = new Date()
// 		user.is_active = false
// 		user.auth_token = null // Invalidate the token
// 		await user.save()

// 		// Send response
// 		res.status(200).json({ message: 'Logout successful' })
// 	} catch (error) {
// 		console.error('Logout error:', error)
// 		res.status(500).json({ message: 'Internal server error' })
// 	}
// })

// module.exports = router

import express from 'express'
import login from '../controller/auth.controller.js'

const router = express.Router()

router.post('/login', login)

export default router
