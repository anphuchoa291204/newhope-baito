import { Card, Divider, Typography } from "@mui/material"
import { TrendingUp } from "@mui/icons-material"
import "@/styles/DashboardCard.scss"

const CardItem = ({ title, value, icon, rate }) => {
	return (
		<Card sx={{ px: "20px", py: "10px", borderRadius: "10px" }} variant="elevation">
			<div className="card-dashboard-item-content">
				<div className="icon">{icon}</div>
				<div className="data">
					<Typography className="data-subhead">{title}</Typography>
					<Typography className="data-subtext">{value}</Typography>
				</div>
			</div>

			<Divider />

			<div className="card-dashboard-rate">
				<span>+ {rate}% last month</span>
				<TrendingUp />
			</div>
		</Card>
	)
}

export default CardItem
