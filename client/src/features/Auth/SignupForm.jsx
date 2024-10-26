import {
	Alert,
	Button,
	Divider,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from "@mui/material"

import "../../styles/Signup.scss"

import toast from "react-hot-toast"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

import { AlternateEmail, Visibility, VisibilityOff } from "@mui/icons-material"
import { signup } from "../../services/authApi"
// import toast from "react-hot-toast"

const SignupForm = () => {
	const navigate = useNavigate()

	const [visiblePwd, setVisiblePwd] = useState(false)
	const [visibleConfirmPwd, setVisibleConfirmPwd] = useState(false)
	const { register, handleSubmit, formState, getValues } = useForm()

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

	const { errors } = formState
	return (
		<div className="signup">
			<div className="wrapper">
				<div className="content">
					<div className="content-wrapper">
						<figure>
							<img src="/assets/icon/logo.png" alt="logo recruiment" className="logo-image" />
						</figure>
						<h2 className="heading">Create your account</h2>
						<p className="subtext">Welcome to newhope-baito, please sign up to continue</p>
						<Button
							type="button"
							variant="contained"
							color="secondary"
							style={{
								width: "100%",
								padding: "10px 20px",
								borderRadius: "10px",
								textTransform: "none",
								marginTop: "10px",
							}}
						>
							<img src="/google-icon-logo.svg" alt="google icon" className="google-icon" />
							Sign In with Google
						</Button>

						<Divider style={{ margin: "10px 0" }}>Or</Divider>

						<form noValidate autoComplete="off" className="form" onSubmit={handleSubmit(onSubmit)}>
							<FormControl fullWidth style={{ marginBottom: "15px" }}>
								<InputLabel htmlFor="email" error={errors?.email ? true : false}>
									Email Address
								</InputLabel>
								<OutlinedInput
									style={{ borderRadius: "10px" }}
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
									<Alert style={{ marginTop: "10px" }} severity="error">
										{errors?.email?.message}
									</Alert>
								)}
								{/* {errors?.email && (
									<p style={{ marginTop: "5px", color: "#D32F2F" }}>{errors?.email?.message}</p>
								)} */}
							</FormControl>

							<FormControl fullWidth style={{ marginBottom: "15px" }}>
								<InputLabel htmlFor="password" error={errors?.password ? true : false}>
									Password
								</InputLabel>
								<OutlinedInput
									style={{ borderRadius: "10px" }}
									id="password"
									type={visiblePwd ? "text" : "password"}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												style={{ margin: 0 }}
												onClick={() => handleVisibility("password")}
											>
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
								<InputLabel
									htmlFor="confirmPassword"
									error={errors?.confirmPassword ? true : false}
								>
									Confirm Password
								</InputLabel>
								<OutlinedInput
									style={{ borderRadius: "10px" }}
									id="confirmPassword"
									type={visibleConfirmPwd ? "text" : "password"}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												style={{ margin: 0 }}
												onClick={() => handleVisibility("confirmPassword")}
											>
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
										validate: (value) =>
											value === getValues().password || "Passwords need to match!",
									})}
								/>
								{errors?.confirmPassword && (
									<Alert style={{ marginTop: "10px" }} severity="error">
										{errors?.confirmPassword?.message}
									</Alert>
								)}
								{/* {errors?.confirmPassword && (
									<p style={{ marginTop: "5px", color: "#D32F2F" }}>
										{errors?.confirmPassword?.message}
									</p>
								)} */}
							</FormControl>

							<FormControl fullWidth style={{ marginTop: "20px" }}>
								<Button
									type="submit"
									variant="contained"
									size="large"
									style={{
										borderRadius: "10px",
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
					</div>
				</div>

				<div className="image">
					<img src="/assets/images/resumes-desk.jpg" alt="recruiment agency" />
				</div>
			</div>
		</div>
	)
}

export default SignupForm
