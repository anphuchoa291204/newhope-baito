// import LayersIcon from "@mui/icons-material/Layers"
import DashboardIcon from "@mui/icons-material/Dashboard"
// import BarChartIcon from "@mui/icons-material/BarChart"
// import DescriptionIcon from "@mui/icons-material/Description"

import toast from "react-hot-toast"

import { useMemo } from "react"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { logout } from "@/services/authApi"
import { useAuth } from "@/features/Auth/hooks/useAuth"

import { Settings } from "@mui/icons-material"
import { createTheme, Typography } from "@mui/material"

import { AppProvider } from "@toolpad/core/react-router-dom"
import { PageContainer, DashboardLayout } from "@toolpad/core"

const NAVIGATION = [
	{
		kind: "header",
		title: "Main items",
	},
	{
		title: "Dashboard",
		icon: <DashboardIcon />,
	},
	{
		kind: "divider",
	},
	{
		kind: "header",
		title: "Analytics",
	},
	// {
	// 	segment: "reports",
	// 	title: "Reports",
	// 	icon: <BarChartIcon />,
	// 	children: [
	// 		{
	// 			segment: "sales",
	// 			title: "Sales",
	// 			icon: <DescriptionIcon />,
	// 		},
	// 		{
	// 			segment: "traffic",
	// 			title: "Traffic",
	// 			icon: <DescriptionIcon />,
	// 		},
	// 	],
	// },
	// {
	// 	segment: "integrations",
	// 	title: "Integrations",
	// 	icon: <LayersIcon />,
	// },
	// {
	// 	segment: "settings",
	// 	title: "Settings",
	// 	icon: <Settings />,
	// },
	{
		segment: "test",
		title: "Test",
		icon: <Settings />,
	},
]

const BRANDING = {
	title: "Newhope Baito",
	logo: <img src="/assets/icon/logo.png" alt="logo" />,
}

const customTheme = createTheme({
	cssVariables: {
		colorSchemeSelector: "data-toolpad-color-scheme",
	},
	colorSchemes: {
		light: {
			palette: {
				background: {
					default: "#F9F9FE",
					paper: "#EEEEF9",
				},
			},
		},
		dark: {
			palette: {
				background: {
					default: "#2A4364",
					paper: "#112E4D",
				},
			},
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 600,
			lg: 1200,
			xl: 1536,
		},
	},
})

function SidebarFooter({ mini }) {
	return (
		<Typography
			variant="caption"
			sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden", textAlign: mini ? "left" : "center" }}
		>
			{mini ? "© NHB" : `© ${new Date().getFullYear()} Made with love by NEWHOPE BAITO`}
		</Typography>
	)
}

function AppLayout() {
	const { userData, logout: logoutAuth } = useAuth()

	const [session, setSession] = useState({
		user: {
			name: "Phuc Hoa",
			email: userData?.email,
			image: "https://mighty.tools/mockmind-api/content/cartoon/9.jpg",
		},
	})

	const authentication = useMemo(() => {
		return {
			// signIn: () => {
			// 	setSession({
			// 		user: {
			// 			name: "Phuc Hoa",
			// 			email: userData?.email,
			// 			image: "https://mighty.tools/mockmind-api/content/cartoon/9.jpg",
			// 		},
			// 	})
			// },
			signOut: async () => {
				setSession(null)
				try {
					const message = await logout({ email: userData?.email })

					await logoutAuth()

					// Show success message from the server
					toast.success(message)
				} catch (error) {
					// Display error message from the server or default message
					toast.error(error?.message || "Sign in failed!")
				}
			},
		}
	}, [logoutAuth, userData?.email])

	return (
		// preview-start
		<AppProvider
			session={session}
			authentication={authentication}
			navigation={NAVIGATION}
			branding={BRANDING}
			theme={customTheme}
		>
			{/* slots: toolbarActions, sidebarFooter, toolbarAccount */}
			{/* 
				toolbarActions dùng để hiển thị các action trên thanh toolbar
				sidebarFooter dùng để hiển thị footer trong sidebar
				toolbarAccount dùng để hiển thị thông tin người dùng trên thanh toolbar
			*/}
			<DashboardLayout
				defaultSidebarCollapsed
				slots={{
					sidebarFooter: SidebarFooter,
				}}
				slotProps={{
					toolbarAccount: {
						slotProps: {
							signInButton: null,
						},
					},
				}}
			>
				<PageContainer style={{ width: "100%", maxWidth: "100%" }}>
					<Outlet />
				</PageContainer>
			</DashboardLayout>
		</AppProvider>
	)
}

export default AppLayout
