import session from "express-session"
import MongoStore from "connect-mongo"

if (!process.env.SECRET_KEY) {
	throw new Error("SECRET_KEY environment variable is not set")
}

const sessionMiddleware = session({
	secret: process.env.SECRET_KEY,
	resave: true,
	saveUninitialized: false,
	cookie: {
		secure: false, // Ensure this is true when using HTTPS
		httpOnly: true, // Make cookie inaccessible to client-side JS }, // Set to true if using HTTPS
	},
	store: MongoStore.create({
		mongoUrl: process.env.MONGODB_URI,
		ttl: 14 * 24 * 60 * 60, // = 14 days. Default
	}),
})

export default sessionMiddleware
