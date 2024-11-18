class AppError extends Error {
	constructor(message, statusCode) {
		super(message) // INFO: The message property is inherited from the Error class

		this.statusCode = statusCode
		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"
		this.isOperational = true

		Error.captureStackTrace(this, this.constructor)
	}
}

export default AppError
