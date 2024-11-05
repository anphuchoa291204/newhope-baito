import {
	Alert,
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material"
import { AlternateEmail, Visibility, VisibilityOff } from "@mui/icons-material"

import toast from "react-hot-toast"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { signup } from "@/services/authApi"
import { Link, useNavigate } from "react-router-dom"

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const SignupForm = () => {
	const navigate = useNavigate()

	const [visiblePwd, setVisiblePwd] = useState(false)
	const [visibleConfirmPwd, setVisibleConfirmPwd] = useState(false)
	const { register, handleSubmit, formState, getValues } = useForm()

	const { errors } = formState

	const handleVisibility = (field) => {
		if (field === "password") setVisiblePwd((visiblePrev) => !visiblePrev)
		else setVisibleConfirmPwd((visiblePrev) => !visiblePrev)
	}

	const onSubmit = async (data) => {
		try {
			const { email, password } = data
			// Call the login function that interacts with the backend
			const message = await signup(email, password)

			// Show success message from the server
			toast.success(message)

			// Redirect to home page after successful login
			navigate("/signin")
		} catch (error) {
			// Display error message from the server or default message
			toast.error(error?.message || "Sign up failed!")
		}
	}

	return (
		<>
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
								<div style={{ padding: "8px", display: "flex" }}>
									<AlternateEmail fontSize="medium" />
								</div>
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
					{errors?.email && (
						<Alert sx={{ marginTop: "10px" }} severity="error">
							{errors?.email?.message}
						</Alert>
					)}
					{/* {errors?.email && (
	          <p style={{ marginTop: "5px", color: "#D32F2F" }}>{errors?.email?.message}</p>
	        )} */}
				</FormControl>

				<FormControl fullWidth sx={{ marginBottom: "15px" }}>
					<InputLabel htmlFor="password" error={errors?.password ? true : false}>
						Password
					</InputLabel>
					<OutlinedInput
						id="password"
						type={visiblePwd ? "text" : "password"}
						endAdornment={
							<InputAdornment position="end">
								<IconButton sx={{ margin: 0 }} onClick={() => handleVisibility("password")}>
									{visiblePwd ? (
										<VisibilityOff fontSize="medium" />
									) : (
										<Visibility fontSize="medium" />
									)}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
						name="password"
						fullWidth
						autoComplete="new-password"
						error={errors?.password ? true : false}
						{...register("password", {
							required: "Please input your password!",
							pattern: {
								value: PASSWORD_REGEX,
								message:
									"Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character!",
							},
						})}
					/>
					{errors?.password && (
						<Alert style={{ marginTop: "10px" }} severity="error">
							{errors?.password?.message}
						</Alert>
					)}
					{/* {errors?.password && (
	          <p style={{ marginTop: "5px", color: "#D32F2F" }}>{errors?.password?.message}</p>
	        )} */}
				</FormControl>

				<FormControl fullWidth>
					<InputLabel htmlFor="confirmPassword" error={errors?.confirmPassword ? true : false}>
						Confirm Password
					</InputLabel>
					<OutlinedInput
						id="confirmPassword"
						type={visibleConfirmPwd ? "text" : "password"}
						endAdornment={
							<InputAdornment position="end">
								<IconButton sx={{ margin: 0 }} onClick={() => handleVisibility("confirmPassword")}>
									{visibleConfirmPwd ? (
										<VisibilityOff fontSize="medium" />
									) : (
										<Visibility fontSize="medium" />
									)}
								</IconButton>
							</InputAdornment>
						}
						label="Confirm Password"
						name="confirmPassword"
						autoComplete="new-password"
						fullWidth
						error={errors?.password ? true : false}
						{...register("confirmPassword", {
							required: "Please input your password!",
							validate: (value) => value === getValues().password || "Passwords need to match!",
						})}
					/>
					{errors?.confirmPassword && (
						<Alert sx={{ marginTop: "10px" }} severity="error">
							{errors?.confirmPassword?.message}
						</Alert>
					)}
					{/* {errors?.confirmPassword && (
	          <p style={{ marginTop: "5px", color: "#D32F2F" }}>
	            {errors?.confirmPassword?.message}
	          </p>
	        )} */}
				</FormControl>

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
						Create Account
					</Button>
				</FormControl>
			</form>

			<p className="subtext" style={{ marginTop: "10px" }}>
				Already have an account? <Link to="/signin">Sign in</Link>
			</p>
		</>
	)
}

export default SignupForm
