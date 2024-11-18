import mongoose from "mongoose"

const { Schema, models, model } = mongoose

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: [true, "Email is required"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	role: {
		type: String,
		enum: ["admin", "student"],
		default: "student",
	},
	login_timestamp: {
		type: Date,
		default: null,
	},
	logout_timestamp: {
		type: Date,
		default: null,
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
		default: "success",
	},
	auth_token: {
		type: String,
		default: null,
	},
	failed_attempts: {
		type: Number,
		default: 0,
	},
	is_active: {
		type: Boolean,
		default: true,
	},
	fail_login_timestamp: {
		type: Date,
		default: null,
	},
})

const User = models.User || model("User", userSchema)

export default User
