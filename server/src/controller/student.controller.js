import Profile from "../../models/profile.js"

export const getAllStudents = async (req, res) => {
	try {
		const students = await Profile.find()

		res
			.status(200)
			.json({ status: "success", message: "Student list fetched successfully", data: students })
	} catch (error) {
		res.status(500).json({
			status: "fail",
			error: "An error occurred while fetching student list",
			details: error,
		})
	}
}
