import Profile from "../../models/profile.js"
import AppError from "../../utils/appError.js"
import catchAsync from "../../utils/catchAsync.js"

export const getAllStudents = catchAsync(async (req, res, next) => {
	const students = await Profile.find({ role: { $eq: "student" } })
	// .populate({
	// 	path: "user_id",
	// 	match: { role: "student", is_active: true },
	// })
	// .exec()

	// Filter out profiles where the user_id field is null due to the match filter
	// const filteredStudents = students.filter((profile) => profile.user_id)

	res.status(200).json({
		status: "success",
		message: "Student list fetched successfully",
		// data: filteredStudents,
		data: students,
	})
})

export const createStudent = catchAsync(async (req, res, next) => {
	const student = await Profile.create(req.body)

	res.status(201).json({
		status: "success",
		message: "Student created successfully",
		data: student,
	})
})

export const createImportStudent = catchAsync(async (req, res, next) => {
	const { students } = req.body // Expecting an array of students in the request body

	if (!Array.isArray(students) || students.length === 0) {
		return next(new AppError("Invalid input. Please provide an array of students", 400))
	}

	// Bulk create the students
	const createdStudents = await Profile.insertMany(students)

	res.status(201).json({
		status: "success",
		message: "Students imported successfully",
		data: createdStudents,
	})
})

export const updateStudent = catchAsync(async (req, res, next) => {
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

export const deleteStudent = catchAsync(async (req, res, next) => {
	await Profile.findByIdAndDelete(req.params.id)

	res.status(204).json({
		status: "success",
		message: "Student deleted successfully",
		data: null,
	})
})
