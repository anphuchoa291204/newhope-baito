import axios from "axios"
import { MAIN_API } from "../constants/constants"

const login = async (email, password) => {
	try {
		const response = await axios.post(`${MAIN_API}/auth/login`, {
			email,
			password,
		})

		// If the response status is not 200, handle the error accordingly
		if (response.status !== 200) {
			throw new Error("Login failed")
		}

		// If the response is successful, return the response data
		return response.data.message
	} catch (error) {
		console.log(error)

		// Check for specific status codes returned by the backend
		if (error.response && error.response.status === 401) {
			throw new Error(error.response?.data?.message || "Invalid email or password")
		}

		// If it's a different error, throw a generic error message
		throw new Error(error.response?.data?.message || "Failed to login")
	}
}

export { login }
