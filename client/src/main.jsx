import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./context/authContext.jsx"

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<Toaster position="top-right" />
			<App />
		</AuthProvider>
	</StrictMode>
)
