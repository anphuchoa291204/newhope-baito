import { Button } from "@mui/material"
import CardList from "../features/Dashboard/Card/CardList"
import { useAuth } from "../hooks/useAuth"
import { Logout } from "@mui/icons-material"

const Dashboard = () => {
	const { isAuthenticated, userData, logout } = useAuth()

	return (
		console.log(isAuthenticated, userData?.email ?? "No user data found!"),
		(
			<>
				<CardList />
				<p style={{ marginTop: "20px" }}>Body + Chart Below </p>
				<Button onClick={logout}>
					<Logout /> Logout
				</Button>
			</>
		)
	)
}

export default Dashboard
