import express from 'express'
import cors from 'cors'
import connectToDatabase from './utils/database.js'
import authRouter from './src/routes/auth.routes.js'
// const authRoutes = require('./src/routes/auth.routes') // Import the auth routes

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

connectToDatabase()

// Connect to MongoDB
// connectToDatabase()

// Use the auth routes
// app.use('/api/auth', authRoutes)

app.use('/auth', authRouter)

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.listen(8080, () => {
	console.log('Server is running on port 8080')
})
