import express from "express"
import { login, logout, signup } from "../controller/auth.controller.js"

const router = express.Router()

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - "Authentication"
 *     summary: User login to the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
// Login route
router.post("/login", login)

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *       - "Authentication"
 *     summary: User logout from the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email.
 *     responses:
 *       200:
 *         description: Successful logout
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
// Logout route
router.post("/logout", logout)

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     tags:
 *       - "Authentication"
 *     summary: Register a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - userProfile
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *               userProfile:
 *                 type: object
 *                 required:
 *                   - fullname
 *                   - dateofbirth
 *                   - gender
 *                   - phonenumber
 *                   - nationality
 *                   - major
 *                   - japanSkill
 *                 properties:
 *                   fullname:
 *                     type: string
 *                     description: User's full name
 *                   dateofbirth:
 *                     type: string
 *                     format: date
 *                     description: User's date of birth
 *                   gender:
 *                     type: string
 *                     enum: [male, female]
 *                     description: User's gender
 *                   phonenumber:
 *                     type: string
 *                     format: phone
 *                     description: User's phone number
 *                   nationality:
 *                     type: string
 *                     description: User's nationality
 *                   major:
 *                     type: string
 *                     description: User's major/field of study
 *                   japanSkill:
 *                     type: string
 *                     enum: [N1, N2, N3, N4, N5]
 *                     description: User's Japanese language skill level
 *                   otherLang:
 *                     type: string
 *                     description: Other languages known by user
 *     responses:
 *       201:
 *         description: User account created successfully
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
 *                   example: User created successfully
 *       400:
 *         description: Bad request - missing or invalid fields
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
// Signup route
router.post("/signup", signup)

export default router
