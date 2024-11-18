import {
	Button,
	InputLabel,
	IconButton,
	// Checkbox,
	FormControl,
	// FormGroup,
	OutlinedInput,
	InputAdornment,
	Box,
	FormHelperText,
	// FormControlLabel,
} from "@mui/material"
import { AlternateEmail, Visibility, VisibilityOff } from "@mui/icons-material"

import toast from "react-hot-toast"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { login } from "@/services/authApi"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const SigninForm = () => {
	const navigate = useNavigate()
	const { login: loginAuth } = useAuth()

	const [visible, setVisible] = useState(false)
	const { register, handleSubmit, formState } = useForm()

	const { errors } = formState

	const handleVisibility = () => {
		setVisible((visiblePrev) => !visiblePrev)
	}

	const onSubmit = async (data) => {
		try {
			const { email, password } = data
			// Call the login function that interacts with the backend
			const response = await login(email, password)

			// If successful, log in to auth context and navigate
			await loginAuth(response.data)

			// Show success message from the server
			toast.success(response.message)

			// Redirect to home page after successful login
			navigate("/", { replace: true })
		} catch (error) {
			// Display error message from the server or default message
			toast.error(error?.message || "Sign in failed!")
		}
	}

	return (
		<form noValidate autoComplete="off" className="form" onSubmit={handleSubmit(onSubmit)}>
			<FormControl fullWidth sx={{ marginBottom: "15px" }}>
				<InputLabel htmlFor="email" error={errors?.email ? true : false}>
					Email Address
				</InputLabel>
				<OutlinedInput
					id="email"
					type="email"
					endAdornment={
						<InputAdornment position="end">
							<Box sx={{ padding: "8px", display: "flex" }}>
								<AlternateEmail fontSize="medium" />
							</Box>
						</InputAdornment>
					}
					label="Email Address"
					name="email"
					fullWidth
					error={errors?.email ? true : false}
					{...register("email", {
						required: "Please input your email address!",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: "Please provide a valid email address!",
						},
					})}
				/>
				{errors?.email && <FormHelperText error>{errors?.email?.message}</FormHelperText>}
			</FormControl>

			<FormControl fullWidth>
				<InputLabel htmlFor="password" error={errors?.password ? true : false}>
					Password
				</InputLabel>
				<OutlinedInput
					id="password"
					type={visible ? "text" : "password"}
					endAdornment={
						<InputAdornment position="end">
							<IconButton sx={{ margin: 0 }} onClick={handleVisibility}>
								{visible ? <VisibilityOff fontSize="medium" /> : <Visibility fontSize="medium" />}
							</IconButton>
						</InputAdornment>
					}
					label="Password"
					name="password"
					autoComplete="new-password"
					fullWidth
					error={errors?.password ? true : false}
					{...register("password", { required: "Please input your password!" })}
				/>
				{errors?.password && <FormHelperText error>{errors?.password?.message}</FormHelperText>}
			</FormControl>

			{/* <FormGroup sx={{ marginTop: '10px' }}>
            <FormControlLabel
              control={<Checkbox />}
              label='Remember me'
              name='remember'
              id='remember'
              {...register('remember')}
            />
          </FormGroup> */}

			<FormControl fullWidth sx={{ marginTop: "20px" }}>
				<Button
					type="submit"
					variant="contained"
					size="large"
					sx={{
						padding: "10px 20px",
						fontWeight: "bold",
						textTransform: "none",
					}}
				>
					Sign In
				</Button>
			</FormControl>
		</form>
	)
}

export default SigninForm
