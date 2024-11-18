import express from "express"
import { getAllStudents, updateStudent } from "../controller/student.controller.js"

const router = express.Router()

/**
 * @swagger
 * /students:
 *   get:
 *     tags:
 *       - "Students"
 *     summary: Retrieve a list of students
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 1234567890
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
 *                   date_of_birth:
 *                     type: string
 *                     example: 2000-01-01
 *                   gender:
 *                     type: string
 *                     example: Male
 *                   nationality:
 *                     type: string
 *                     example: American
 *                   major:
 *                     type: string
 *                     example: Computer Science
 *                   japan_skill:
 *                     type: string
 *                     example: N2
 *   post:
 *     tags:
 *       - "Students"
 *     summary: Create a new student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The student's name.
 *               email:
 *                 type: string
 *                 description: The student's email.
 *               date_of_birth:
 *                 type: string
 *                 description: The student's date of birth.
 *               gender:
 *                 type: string
 *                 description: The student's gender.
 *               nationality:
 *                 type: string
 *                 description: The student's nationality.
 *               major:
 *                 type: string
 *                 description: The student's major.
 *               japan_skill:
 *                 type: string
 *                 description: The student's Japanese skill level.
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student created successfully
 *                 student:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 1234567890
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     date_of_birth:
 *                       type: string
 *                       example: 2000-01-01
 *                     gender:
 *                       type: string
 *                       example: Male
 *                     nationality:
 *                       type: string
 *                       example: American
 *                     major:
 *                       type: string
 *                       example: Computer Science
 *                     japan_skill:
 *                       type: string
 *                       example: N2
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while processing your request
 */

router
	.route("/")
	.get(getAllStudents)
	.post((req, res) => {
		res.status(501).json({ message: "Not implemented yet" })
	})

/**
 * @swagger
 * /students/{id}:
 *   patch:
 *     tags:
 *       - "Students"
 *     summary: Update a student profile by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: uuid
 *         description: Student Profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The user ID reference.
 *               fullname:
 *                 type: string
 *                 description: The student's full name.
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 description: The student's date of birth.
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *                 description: The student's gender.
 *               phone_number:
 *                 type: string
 *                 description: The student's phone number.
 *               nationality:
 *                 type: string
 *                 description: The student's nationality.
 *               major:
 *                 type: string
 *                 description: The student's major.
 *               japan_skill:
 *                 type: string
 *                 enum: [N1, N2, N3, N4, N5]
 *                 description: The student's Japanese skill level.
 *               other_language:
 *                 type: string
 *                 description: Other languages known by the student.
 *     responses:
 *       200:
 *         description: Student profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student profile updated successfully
 *                 profile:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 507f1f77bcf86cd799439011
 *                     user_id:
 *                       type: string
 *                       example: 507f1f77bcf86cd799439012
 *                     fullname:
 *                       type: string
 *                       example: John Doe
 *                     date_of_birth:
 *                       type: string
 *                       example: 2000-01-01
 *                     gender:
 *                       type: string
 *                       example: male
 *                     phone_number:
 *                       type: string
 *                       example: +1234567890
 *                     nationality:
 *                       type: string
 *                       example: American
 *                     major:
 *                       type: string
 *                       example: Computer Science
 *                     japan_skill:
 *                       type: string
 *                       example: N2
 *                     other_language:
 *                       type: string
 *                       example: French
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input
 *       404:
 *         description: Profile not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student profile not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while processing your request
 */
router.route("/:id").patch(updateStudent)

export default router
