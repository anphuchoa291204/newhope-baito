import Profile from "../../models/profile.js"
import catchAsync from "../../utils/catchAsync.js"

export const getAllStudents = catchAsync(async (req, res, next) => {
	const students = await Profile.find()
		.populate({
			path: "user_id",
			match: { role: "student", is_active: true },
		})
		.exec()

	// Filter out profiles where the user_id field is null due to the match filter
	const filteredStudents = students.filter((profile) => profile.user_id)

	res.status(200).json({
		status: "success",
		message: "Student list fetched successfully",
		data: filteredStudents,
	})
})

export const updateStudent = catchAsync(async (req, res) => {
	const student = await Profile.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	})

	res.status(200).json({
		status: "success",
		message: "Student updated successfully",
		data: student,
	})
})
