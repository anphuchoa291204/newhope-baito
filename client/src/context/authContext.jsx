import { createContext, useState } from "react"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
	const initialUserData = JSON.parse(localStorage.getItem("userData")) ?? null
	const [userData, setUserData] = useState(initialUserData)
	const [isAuthenticated, setIsAuthenticated] = useState(!!initialUserData)

	const login = (data) => {
		localStorage.setItem("userData", JSON.stringify(data))
		setUserData(data) // Update userData in state
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
