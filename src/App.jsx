import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './pages/AppLayout'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import Signin from './pages/Signin'

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
		],
	},
	{
		path: '/signin',
		element: <Signin />,
	},
	{
		path: '*',
		element: <PageNotFound />,
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
