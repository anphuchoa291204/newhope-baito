import "./index.css"
import App from "./App.jsx"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./context/AuthContext"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Toaster position="top-right" />
				<App />
			</LocalizationProvider>
		</AuthProvider>
	</StrictMode>
)
