import axios from "axios"
import { MAIN_API } from "@/constants/constants"

export const getAllStudents = async () => {
	try {
		const response = await axios.get(`${MAIN_API}/students`)

		return response.data
	} catch (error) {
		// If it's a different error, throw a generic error message
		throw new Error(error.response?.data?.message || "Failed to fetch students")
	}
}
