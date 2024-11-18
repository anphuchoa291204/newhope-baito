import jwt from "jsonwebtoken"

export const authToken = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization

		if (!authHeader) {
			return res.status(401).json({
				status: "fail",
				message: "Authorization header is missing",
			})
		}

		const token = authHeader.split(" ")[1]

		if (!token) {
			return res.status(401).json({
				status: "fail",
				message: "Token is missing",
			})
		}

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
		req.user = decoded // Store decoded user info for later use

		next()
	} catch (error) {
		console.error("Auth Error:", error.message)
		return res.status(401).json({
			status: "fail",
			message: "Invalid or expired token",
		})
	}
}
