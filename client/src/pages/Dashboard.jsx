import { Box, useTheme } from "@mui/material"
import CardList from "../features/Dashboard/components/Card/CardList"

const Dashboard = () => {
	const theme = useTheme()

	return (
		<>
			<CardList />

			<Box sx={{ mt: 2 }}>
				<Box
					sx={{
						width: "100%",
						height: "100px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						background: theme.palette.background.paper,
						boxShadow: theme.shadows[2],
						textTransform: "uppercase",
					}}
				>
					hehe
				</Box>
			</Box>
		</>
	)
}

export default Dashboard
