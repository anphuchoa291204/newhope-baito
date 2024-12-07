import "@/styles/Signin.scss"

import { Link } from "react-router-dom"
import { Button, Divider } from "@mui/material"

import SigninForm from "./components/Form/SigninForm"

const SigninScreen = () => {
	return (
		<div className="signin">
			<div className="wrapper">
				<div className="image">
					<img src="assets/images/isometric-recruit-01.png" alt="recruiment agency" />
				</div>

				<div className="content">
					<div className="content-wrapper">
						<figure>
							<img src="assets/icon/logo.png" alt="logo recruiment" className="logo-image" />
						</figure>

						<h2 className="heading">Sign in</h2>
						<p className="subtext">Welcome to newhope-baito, please sign in to continue</p>

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

						<Divider style={{ margin: "10px 0" }}>Or</Divider>

						<SigninForm />

						<p className="subtext" style={{ marginTop: "10px" }}>
							Don&apos;t have an account? <Link to="/signup">Sign up</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SigninScreen
