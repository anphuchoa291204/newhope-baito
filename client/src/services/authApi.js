import axios from "axios"
import { MAIN_API } from "../constants/constants"

const login = async (email, password) => {
	try {
		const response = await axios.post(`${MAIN_API}/auth/login`, {
			email,
			password,
		})

		// If the response is successful, return the response data
		return response.data
	} catch (error) {
		// If it's a different error, throw a generic error message
		throw new Error(error.response?.data?.message || "Failed to login")
	}
}

const logout = async ({ email }) => {
	try {
		const response = await axios.post(`${MAIN_API}/auth/logout`, {
			email,
		})

		// If the response is successful, return the response data
		return response.data.message
	} catch (error) {
		// If it's a different error, throw a generic error message
		throw new Error(error.response?.data?.message || "Failed to logout")
	}
}

const signup = async (email, password, userProfile) => {
	try {
		const response = await axios.post(`${MAIN_API}/auth/signup`, {
			email,
			password,
			userProfile,
		})

		// If the response is successful, return the response data
		return response.data.message
	} catch (error) {
		// If it's a different error, throw a generic error message
		throw new Error(error.response?.data?.message || "Failed to signup")
	}
}

export { login, logout, signup }
