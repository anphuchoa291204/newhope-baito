import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import validator from "validator"

const { Schema, models, model } = mongoose

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: [true, "Email is required"],
		lowercase: true,
		validate: {
			validator: (value) => {
				return validator.isEmail(value)
			},
			message: (props) => `${props.value} is not a valid email address`,
		},
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		select: false,
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

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next()

	// Hash the password
	this.password = await bcrypt.hash(this.password, 12)
	next()
})

userSchema.methods.passwordMatch = async function (candidatePassword, userPassword) {
	return await bcrypt.compare(candidatePassword, userPassword)
}

const User = models.User || model("User", userSchema)

export default User
