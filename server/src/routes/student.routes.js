import express from "express"
import { getAllStudents } from "../controller/student.controller.js"

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

export default router
