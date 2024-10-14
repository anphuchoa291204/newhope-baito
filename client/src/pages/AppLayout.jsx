import * as React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import BarChartIcon from '@mui/icons-material/BarChart'
import DescriptionIcon from '@mui/icons-material/Description'
import LayersIcon from '@mui/icons-material/Layers'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { Outlet } from 'react-router-dom'
import { Settings } from '@mui/icons-material'

const NAVIGATION = [
	{
		kind: 'header',
		title: 'Main items',
	},
	{
		segment: 'dashboard',
		title: 'Dashboard',
		icon: <DashboardIcon />,
	},
	{
		kind: 'divider',
	},
	{
		kind: 'header',
		title: 'Analytics',
	},
	{
		segment: 'reports',
		title: 'Reports',
		icon: <BarChartIcon />,
		children: [
			{
				segment: 'sales',
				title: 'Sales',
				icon: <DescriptionIcon />,
			},
			{
				segment: 'traffic',
				title: 'Traffic',
				icon: <DescriptionIcon />,
			},
		],
	},
	{
		segment: 'integrations',
		title: 'Integrations',
		icon: <LayersIcon />,
	},
	{
		segment: 'settings',
		title: 'Settings',
		icon: <Settings />,
	},
]

function AppLayout() {
	const [pathname, setPathname] = React.useState('/dashboard')

	const router = React.useMemo(() => {
		return {
			pathname,
			searchParams: new URLSearchParams(),
			navigate: (path) => setPathname(String(path)),
		}
	}, [pathname])

	return (
		// preview-start
		<AppProvider
			navigation={NAVIGATION}
			branding={{
				title: 'Newhope Baito',
				logo: <img src='/assets/icon/logo.png' alt='logo' />,
			}}
			router={router}
		>
			<DashboardLayout>
				<div style={{ padding: 20 }}>
					<Outlet />
				</div>
			</DashboardLayout>
		</AppProvider>
	)
}

export default AppLayout
