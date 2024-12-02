import mongoose from "mongoose"
import validator from "validator"

const { Schema, models, model } = mongoose

const profileSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		// ref: "User",
		// required: [true, "User ID is required"], // NOTE: This is an optional due to import features !!!
		default: null,
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
		trim: true,
		lowercase: true,
		validate: {
			validator: (value) => {
				return validator.isEmail(value)
			},
			message: (props) => `${props.value} is not a valid email address`,
		},
	},
	fullname: {
		type: String,
		required: [true, "Full name is required"],
	},
	date_of_birth: {
		type: Date,
		required: [true, "Date of Birth is required"],
	},
	gender: {
		type: String,
		enum: ["Male", "Female"],
		required: [true, "Gender is required"],
	},
	phone_number: {
		type: String,
		required: [true, "Phone number is required"],
	},
	nationality: {
		type: String,
		required: [true, "Nationality is required"],
	},
	major: {
		type: String,
		required: [true, "Major is required"],
	},
	japan_skill: {
		type: String,
		enum: ["N1", "N2", "N3", "N4", "N5"],
		required: [true, "Japan skill is required"],
	},
	other_language: {
		type: String,
		default: "",
	},
	role: {
		type: String,
		enum: ["admin", "student"],
		default: "student",
	},
})

const Profile = models.Profile || model("Profile", profileSchema)

export default Profile
