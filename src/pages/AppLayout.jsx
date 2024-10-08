import { Outlet } from 'react-router-dom'

const AppLayout = () => {
	return (
		<div>
			Hello World!
			<Outlet />
		</div>
	)
}

export default AppLayout
