import { Logout } from "@mui/icons-material"

import { toast } from "react-hot-toast"
import { Button } from "@mui/material"
import CardList from "../features/Dashboard/Card/CardList"

import { logout } from "../services/authApi"
import { useAuth } from "../features/Auth/hooks/useAuth"

const userData = JSON.parse(localStorage.getItem("userData")) ?? null

const Dashboard = () => {
	const { logout: logoutAuth } = useAuth()

	const handleLogout = async () => {
		try {
			const message = await logout({ email: userData?.email })

			await logoutAuth()

			// Show success message from the server
			toast.success(message)
		} catch (error) {
			// Display error message from the server or default message
			toast.error(error?.message || "Sign in failed!")
		}
	}

	return (
		console.log(userData),
		(
			<>
				<CardList />
				<p style={{ marginTop: "20px" }}>Body + Chart Below </p>
				<Button onClick={handleLogout}>
					<Logout /> Logout
				</Button>
			</>
		)
	)
}

export default Dashboard
