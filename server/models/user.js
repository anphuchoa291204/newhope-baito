// const mongoose = require('mongoose')
// const { Schema, model, models } = mongoose

// const userSchema = new Schema({
// 	username: {
// 		type: String,
// 		unique: [true, 'Username already exists'],
// 		required: [true, 'Username is required'],
// 	},
// 	login_timestamp: {
// 		type: Schema.Types.Timestamp,
// 		default: () => new Date(),
// 	},
// 	logout_timestamp: {
// 		type: Schema.Types.Timestamp,
// 		default: null,
// 	},
// 	ip_address: {
// 		type: String,
// 		default: '0.0.0.0',
// 	},
// 	session_id: {
// 		type: String,
// 		default: null,
// 	},
// 	user_agent: {
// 		type: String,
// 		default: null,
// 	},
// 	login_status: {
// 		type: String,
// 		enum: ['success', 'failed'],
// 		default: 'failed',
// 	},
// 	auth_token: {
// 		type: String,
// 		default: null,
// 	},
// 	failed_attempts: {
// 		type: Number,
// 		default: 0,
// 	},
// 	last_login: {
// 		type: Date,
// 		default: null,
// 	},
// 	is_active: {
// 		type: Boolean,
// 		default: true,
// 	},
// })

// // Check if the model already exists before creating a new one
// const User = models.User || model('User', userSchema)

// module.exports = User

import mongoose from 'mongoose'

const { Schema, models, model } = mongoose

const userSchema = new Schema({
	email: {
		type: String,
		unique: [true, 'Email already exists'],
		required: [true, 'Email is required'],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	},
})

const User = models.User || model('User', userSchema)

export default User
