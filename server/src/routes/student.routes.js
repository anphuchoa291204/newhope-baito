import express from "express"
import {
	createStudent,
	getAllStudents,
	updateStudent,
	createImportStudent,
	deleteStudent,
} from "../controller/student.controller.js"

const router = express.Router()

/**
 * @swagger
 * /api/v1/students:
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
 *                   _id:
 *                     type: string
 *                     example: 1234567890
 *                   user_id:
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
 *                   other_language:
 *                     type: string
 *                     example: French, German
 *                   role:
 *                     enum: [student, admin]
 *                     example: student
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
 *               other_language:
 *                 type: string
 *                 description: Other languages known by the student.
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.route("/").get(getAllStudents).post(createStudent)

/**
 * @swagger
 * /api/v1/students/import:
 *   post:
 *     tags:
 *       - "Students"
 *     summary: Import multiple students from Excel file
 *     description: Import students from .xlsx or .xls file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Excel file containing student data
 *     responses:
 *       201:
 *         description: Students imported successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Students imported successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 1234567890
 *                       user_id:
 *                         type: string
 *                         example: null
 *                       fullname:
 *                         type: string
 *                         example: John Doe
 *                       date_of_birth:
 *                         type: string
 *                         example: 2000-01-01
 *                       gender:
 *                         type: string
 *                         example: male
 *                       phone_number:
 *                         type: string
 *                         example: +1234567890
 *                       nationality:
 *                         type: string
 *                         example: American
 *                       major:
 *                         type: string
 *                         example: Computer Science
 *                       japan_skill:
 *                         type: string
 *                         enum: [N1, N2, N3, N4, N5]
 *                         example: N2
 *                       other_language:
 *                         type: string
 *                         example: French, German
 *                       role:
 *                         type: string
 *                         enum: [student, admin]
 *                         example: student
 *       400:
 *         description: Invalid file format or data
 *       500:
 *         description: Internal server error
 */
router.route("/import").post(createImportStudent)

/**
 * @swagger
 * /api/v1/students/{id}:
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
 *       400:
 *         description: Bad request
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     tags:
 *       - "Students"
 *     summary: Delete a student profile by ID
 *     parameters:
 *       - in: uuid
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student Profile ID
 *     responses:
 *       200:
 *         description: Student profile deleted successfully
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Internal server error
 */
router.route("/:id").patch(updateStudent).delete(deleteStudent)

export default router
