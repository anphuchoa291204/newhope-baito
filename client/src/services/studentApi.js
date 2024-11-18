import axios from "axios"
import { MAIN_API } from "@/constants/constants"
import Cookies from "js-cookie"

const accessToken = Cookies.get("userToken")

const axiosClient = axios.create({
	baseURL: MAIN_API,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: `Bearer ${accessToken}`,
	},
})

export const getAllStudents = async () => {
	try {
		const response = await axiosClient.get(`/students`)

		return response.data
	} catch (error) {
		// If it's a different error, throw a generic error message
		throw new Error(error.response?.data?.message || "Failed to fetch students")
	}
}

export const updateStudent = async (id, data) => {
	try {
		const response = await axiosClient.patch(`/students/${id}`, data)

		return response.data
	} catch (error) {
		// If it's a different error, throw a generic error message
		throw new Error(error.response?.data?.message || "Failed to update students")
	}
}
