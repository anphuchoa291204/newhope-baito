import { useEffect } from "react"
import { useAuth } from "@/features/Auth/hooks/useAuth"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Signin from "@/pages/Signin"
import Signup from "@/pages/Signup"
import Student from "@/pages/Student"
import AppLayout from "@/pages/AppLayout"
import Dashboard from "@/pages/Dashboard"
import PageNotFound from "@/pages/PageNotFound"

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Dashboard />,
			},
			{
				path: "/student-list",
				element: <Student />,
			},
		],
	},
	{
		path: "/signin",
		element: <Signin />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
	{
		path: "*",
		element: <PageNotFound />,
	},
])

function App() {
	const { isAuthenticated } = useAuth()

	useEffect(() => {
		if (!isAuthenticated) {
			router.navigate("/signin")
		}
	})

	return <RouterProvider router={router} />
}

export default App
