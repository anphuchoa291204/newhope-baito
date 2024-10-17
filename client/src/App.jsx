import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./pages/AppLayout"
import Dashboard from "./pages/Dashboard"
import PageNotFound from "./pages/PageNotFound"
import Signin from "./pages/Signin"
import { useAuth } from "./hooks/useAuth"
import { useEffect } from "react"

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Dashboard />,
			},
		],
	},
	{
		path: "/signin",
		element: <Signin />,
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
