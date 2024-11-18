import Profile from "../../models/profile.js"

export const getAllStudents = async (req, res) => {
	try {
		const students = await Profile.find()
			.populate({
				path: "user_id",
				match: { role: "student", is_active: true },
			})
			.exec()

		// Filter out profiles where the user_id field is null due to the match filter
		const filteredStudents = students.filter((profile) => profile.user_id)

		res
			.status(200)
			.json({
				status: "success",
				message: "Student list fetched successfully",
				data: filteredStudents,
			})
	} catch (error) {
		res.status(500).json({
			status: "fail",
			error: "An error occurred while fetching student list",
			details: error,
		})
	}
}

export const updateStudent = async (req, res) => {
	try {
		const student = await Profile.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})

		res.status(200).json({
			status: "success",
			message: "Student updated successfully",
			data: student,
		})
	} catch (error) {
		res.status(500).json({
			status: "fail",
			error: "An error occurred while fetching student list",
			details: error,
		})
	}
}
