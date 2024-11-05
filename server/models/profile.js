import mongoose from "mongoose"

const { Schema, models, model } = mongoose

const profileSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "User ID is required"],
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
		enum: ["male", "female"],
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
})

const Profile = models.Profile || model("Profile", profileSchema)

export default Profile
