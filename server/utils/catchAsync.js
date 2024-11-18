// INFO: in the catchAsync function, we are returning a function that will be called when the catchAsync function is called. This function will take the request, response, and next arguments and will call the function that was passed to the catchAsync function. If there is an error, it will call the next function with the error as an argument. This way, we can avoid writing try-catch blocks in our controller functions.

const catchAsync = (fn) => (req, res, next) => {
	fn(req, res, next).catch((err) => next(err))
}

export default catchAsync
