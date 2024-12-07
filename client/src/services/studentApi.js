import axios from "axios"
import { MAIN_API } from "@/constants/constants"
import Cookies from "js-cookie"

const axiosClient = axios.create({
	baseURL: MAIN_API,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
})

// Add request interceptor
axiosClient.interceptors.request.use((config) => {
	const token = Cookies.get("userToken")
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
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

export const createStudent = async (data) => {
	try {
		const response = await axiosClient.post(`/students`, data)

		return response.data
	} catch (error) {
		// If it's a different error, throw a generic error message
		throw new Error(error.response?.data?.message || "Failed to create students")
	}
}

export const createImportStudent = async (data) => {
	try {
		const response = await axiosClient.post(`/students/import`, { students: data })

		return response.data
	} catch (error) {
		// If it's a different error, throw a generic error message
		throw new Error(error.response?.data?.message || "Failed to import students")
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

export const deleteStudent = async (id) => {
	try {
		await axiosClient.delete(`/students/${id}`)
	} catch (error) {
		// If it's a different error, throw a generic error message
		throw new Error(error.response?.data?.message || "Failed to delete students")
	}
}
