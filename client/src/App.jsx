import { useEffect } from "react"
import { useAuth } from "@/features/Auth/hooks/useAuth"
import { createHashRouter, RouterProvider } from "react-router-dom"

import Signin from "@/pages/Signin"
import Signup from "@/pages/Signup"
import Student from "@/pages/Student"
import AppLayout from "@/pages/AppLayout"
import Dashboard from "@/pages/Dashboard"
import PageNotFound from "@/pages/PageNotFound"
import StudentImport from "./pages/StudentImport"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const router = createHashRouter([
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
			{
				path: "/student-list/import-student",
				element: <StudentImport />,
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
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: true, // Enable refetch on window focus
				refetchOnMount: true, // Ensure remounting triggers a refetch
				staleTime: 5000, // Keep staleTime for performance
			},
		},
	})

	useEffect(() => {
		if (!isAuthenticated) {
			router.navigate("/signin")
		}
	})

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
		</QueryClientProvider>
	)
}

export default App
