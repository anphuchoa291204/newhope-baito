import path from "path"

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

const __dirname = import.meta.dirname

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = mode === "production" ? "production" : "development"

	return {
		plugins: [react()],
		base: `/newhope-baito/${env}/`,
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: "modern-compiler", // or "modern"
				},
			},
		},
	}
})
