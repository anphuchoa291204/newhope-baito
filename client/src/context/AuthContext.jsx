import { createContext, useState } from "react"
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
	const initialUserData = JSON.parse(localStorage.getItem("userData")) ?? null
	const [userData, setUserData] = useState(initialUserData)
	const [isAuthenticated, setIsAuthenticated] = useState(!!initialUserData)

	const login = (data) => {
		const jwtDecoded = jwtDecode(data.accessToken)

		const userDataDecoded = {
			userId: data.userId,
			role: jwtDecoded.role,
			name: jwtDecoded.name,
			email: jwtDecoded.email,
		}

		Cookies.set("userToken", data.accessToken, { expires: 7 })
		localStorage.setItem("userData", JSON.stringify(userDataDecoded))

		setUserData(userDataDecoded) // Update userData in state
		setIsAuthenticated(true)
	}

	const logout = () => {
		localStorage.removeItem("userData")
		setUserData(null) // Clear userData in state
		setIsAuthenticated(false)
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout, userData }}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider }
