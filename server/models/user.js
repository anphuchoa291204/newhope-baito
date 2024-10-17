import mongoose from "mongoose"

const { Schema, models, model } = mongoose

const userSchema = new Schema({
	email: {
		type: String,
		unique: [true, "Email already exists"],
		required: [true, "Email is required"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	login_timestamp: {
		type: Date,
		default: () => new Date(),
	},
	logout_timestamp: {
		type: Date,
		default: null,
	},
	ip_address: {
		type: String,
		default: "0.0.0.0",
	},
	session_id: {
		type: String,
		default: null,
	},
	user_agent: {
		type: String,
		default: null,
	},
	login_status: {
		type: String,
		enum: ["success", "failure"],
		default: "failure",
	},
	auth_token: {
		type: String,
		default: null,
	},
	logout_reason: {
		type: String,
		default: null,
	},
	failed_attempts: {
		type: Number,
		default: 0,
	},
	last_login: {
		type: Date,
		default: null,
	},
	is_active: {
		type: Boolean,
		default: true,
	},
})

const User = models.User || model("User", userSchema)

export default User
