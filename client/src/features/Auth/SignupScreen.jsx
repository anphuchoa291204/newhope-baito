import "@/styles/Signup.scss"

import { Button, Divider } from "@mui/material"

import { useState } from "react"
import SignupForm from "./components/Form/SignupForm"
import UserDataForm from "./components/Form/UserDataForm"

const SignupScreen = () => {
	const [page, setPage] = useState("userdata") // "userdata" || "signup"

	const [userProfile, setUserProfile] = useState({
		fullname: "",
		dateofbirth: null,
		gender: "",
		phonenumber: "",
		nationality: "",
		major: "",
		japanSkill: "",
		otherLang: "",
	})

	return (
		<div className="signup">
			<div className="wrapper">
				<div className="content">
					<div className="content-wrapper">
						<figure>
							<img src="assets/icon/logo.png" alt="logo recruiment" className="logo-image" />
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
								marginTop: "10px",
							}}
						>
							<img src="google-icon-logo.svg" alt="google icon" className="google-icon" />
							Sign In with Google
						</Button>

						<Divider sx={{ my: 2 }}>Or</Divider>

						{/* ==== FORM ==== */}
						{page === "userdata" && (
							<UserDataForm
								setPage={setPage}
								userProfile={userProfile}
								setUserProfile={setUserProfile}
							/>
						)}
						{page === "signup" && (
							<SignupForm
								setPage={setPage}
								userProfile={userProfile}
								setUserProfile={setUserProfile}
							/>
						)}
					</div>
				</div>

				<div className="image">
					<img src="assets/images/resumes-desk.jpg" alt="recruiment agency" />
				</div>
			</div>
		</div>
	)
}

export default SignupScreen
