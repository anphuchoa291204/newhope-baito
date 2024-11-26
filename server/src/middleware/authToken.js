import jwt from "jsonwebtoken"
import catchAsync from "../../utils/catchAsync.js"

export const authToken = catchAsync(async (req, res, next) => {
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
})
