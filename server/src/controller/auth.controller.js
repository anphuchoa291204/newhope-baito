import User from '../../models/user.js'

const login = async (req, res) => {
	const { email, password } = req.body
	// Find the user by email and password

	User.findOne({ email })
		.then((user) => {
			if (user && user.password === password) {
				res.status(200).json({ message: 'Login successful' })
			} else {
				res.json({ message: 'Invalid email or password' })
			}
		})
		.catch((err) => res.status(400).json(err))
}

export default login
