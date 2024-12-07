import DashboardIcon from "@mui/icons-material/Dashboard"

import toast from "react-hot-toast"

import { useMemo } from "react"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { logout } from "@/services/authApi"
import { useAuth } from "@/features/Auth/hooks/useAuth"

import { CallReceived, Workspaces } from "@mui/icons-material"
import { createTheme, Typography } from "@mui/material"

import { AppProvider } from "@toolpad/core/react-router-dom"
import { PageContainer, DashboardLayout } from "@toolpad/core"

// NOTE: segment is the route
const NAVIGATION = [
	{
		kind: "header",
		title: "Dashboard",
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
		title: "Student management",
	},
	{
		segment: "student-list",
		title: "Student List",
		icon: <Workspaces />,
		roles: ["admin"],
		children: [
			{
				segment: "import-student",
				title: "Student Import",
				icon: <CallReceived />,
			},
		],
	},
]

const BRANDING = {
	title: "Newhope Baito",
	logo: <img src="assets/icon/logo.png" alt="logo" />,
}

const customTheme = createTheme({
	cssVariables: {
		colorSchemeSelector: "data-toolpad-color-scheme",
	},
	colorSchemes: {
		light: {
			palette: {
				TableCell: {
					border: "#E0E0E0",
				},
				background: {
					default: "#F9F9FE",
					paper: "#EEEEF9",
				},
			},
		},
		/* dark: {
			palette: {
				TableCell: {
					border: "#515151",
				},
				background: {
					default: "#2A4364",
					paper: "#112E4D",
				},
			},
		}, */
		dark: false,
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 480,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
})

const SidebarFooter = ({ mini }) => {
	return (
		<Typography
			variant="caption"
			sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden", textAlign: mini ? "left" : "center" }}
		>
			{mini ? "© NHB" : `© ${new Date().getFullYear()} Made with love by NEWHOPE BAITO`}
		</Typography>
	)
}

const AppLayout = () => {
	const { userData, logout: logoutAuth } = useAuth()

	const [session, setSession] = useState({
		user: {
			name: userData?.name,
			email: userData?.email,
			image: "https://mighty.tools/mockmind-api/content/cartoon/9.jpg",
		},
	})

	const authentication = useMemo(() => {
		return {
			signIn: () => {
				setSession({
					user: {
						name: userData?.name,
						email: userData?.email,
						image: "https://mighty.tools/mockmind-api/content/cartoon/9.jpg",
					},
				})
			},
			signOut: async () => {
				setSession(null)
				try {
					const message = await logout({ email: userData?.email })

					await logoutAuth()

					toast.success(message)
				} catch (error) {
					toast.error(error?.message || "Sign in failed!")
				}
			},
		}
	}, [logoutAuth, userData?.email, userData?.name])

	const FILTER_NAVIGATION = useMemo(() => {
		return NAVIGATION.filter((item) => {
			if (item.roles) {
				return item.roles.includes(userData?.role)
			}
			return true
		})
	}, [userData?.role])

	return (
		<AppProvider
			session={session}
			authentication={authentication}
			navigation={FILTER_NAVIGATION}
			branding={BRANDING}
			theme={customTheme}
		>
			{/* // NOTE: slots: toolbarActions, sidebarFooter, toolbarAccount */}
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
				sx={{
					"& .MuiBox-root.css-b95f0i": {
						overflow: "auto",
					},
				}}
			>
				<PageContainer
					style={{ width: "100%", maxWidth: "100%", overflow: "auto", height: "100%" }}
				>
					<Outlet />
				</PageContainer>
			</DashboardLayout>
		</AppProvider>
	)
}

export default AppLayout
