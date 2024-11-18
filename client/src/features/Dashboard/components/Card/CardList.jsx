import CardItem from "./CardItem"

import Grid from "@mui/material/Grid2"
import { People, Radar, SensorOccupied } from "@mui/icons-material"

const cardDataDemo = [
	{
		title: "Total Employees",
		value: 100,
		icon: <People />,
		rate: 10,
	},
	{
		title: "Total Projects",
		value: 100,
		icon: <Radar />,
		rate: 3.41,
	},
	{
		title: "Total Clients",
		value: "10",
		icon: <SensorOccupied />,
		rate: 6.92,
	},
]

const CardList = () => {
	return (
		<Grid container spacing={{ xs: 2, md: 3 }}>
			{cardDataDemo.map((card, index) => (
				<Grid size={{ xs: 12, lg: 4 }} key={index}>
					<CardItem title={card.title} value={card.value} icon={card.icon} rate={card.rate} />
				</Grid>
			))}
		</Grid>
	)
}

export default CardList
