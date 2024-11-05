import express from "express"
import { login, logout, signup } from "../controller/auth.controller.js"

const router = express.Router()

// Login route
router.post("/login", login)

// Logout route
router.post("/logout", logout)

// Signup route
router.post("/signup", signup)

export default router
