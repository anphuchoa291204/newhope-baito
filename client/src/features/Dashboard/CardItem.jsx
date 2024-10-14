import Grid from '@mui/material/Grid2'
import { Box, Card, Divider } from '@mui/material'
import { TrendingUp } from '@mui/icons-material'

const CardItem = ({ title, value, icon, rate }) => {
	return (
		<Card sx={{ padding: '10px 20px', borderRadius: '10px' }} variant='outlined'>
			<Grid container spacing={2} alignItems={'center'}>
				<Grid size={2}>
					<div
						style={{
							padding: '10px',
							borderRadius: '10px',
							background: '#E3EEFA',
							color: '#1565C0',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{icon}
					</div>
				</Grid>
				<Grid size={10}>
					<div>
						<p style={{ color: '#8FA6B6' }}>{title}</p>
						<p style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</p>
					</div>
				</Grid>
			</Grid>
			<Divider />
			<Box
				sx={{
					marginTop: '5px',
					display: 'flex',
					alignItems: 'center',
					color: '#29CC93',
					gap: '5px',
					fontWeight: '600',
				}}
			>
				<span>+ {rate}% last month</span>
				<TrendingUp />
			</Box>
		</Card>
	)
}

export default CardItem
