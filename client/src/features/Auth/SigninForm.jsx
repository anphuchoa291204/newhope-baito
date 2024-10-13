import {
	Alert,
	Button,
	// Checkbox,
	Divider,
	FormControl,
	// FormControlLabel,
	// FormGroup,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from '@mui/material'
import '../../styles/Signin.scss'
import { AlternateEmail, Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const SigninForm = () => {
	const [visible, setVisible] = useState(false)
	const { register, handleSubmit, formState } = useForm()
	const navigate = useNavigate()

	const { errors } = formState

	const handleVisibility = () => {
		setVisible((visiblePrev) => !visiblePrev)
	}

	const onSubmit = (data) => {
		const { email, password } = data

		axios
			.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/login`, { email, password })
			.then((res) => {
				if (res.status === 200) {
					console.log(res)
					navigate('/')
					toast.success('Sign in successfully!')
				}
			})
			.catch((err) => {
				console.error(err)
			})

		// axios.post()
	}

	return (
		<div className='signin'>
			<div className='wrapper'>
				<div className='image'>
					<img src='/assets/images/recruiment-agency.svg' alt='recruiment agency' />
				</div>
				<div className='content'>
					<div className='content-wrapper'>
						<figure>
							<img src='/assets/icon/logo.png' alt='logo recruiment' className='logo-image' />
						</figure>
						<h2 className='heading'>Sign in</h2>
						<p className='subtext'>Welcome to newhope-baito, please sign in to continue</p>
						<Button
							type='button'
							variant='contained'
							color='secondary'
							style={{
								width: '100%',
								padding: '10px 20px',
								borderRadius: '10px',
								textTransform: 'none',
								marginTop: '10px',
							}}
						>
							<img src='/google-icon-logo.svg' alt='google icon' className='google-icon' />
							Sign In with Google
						</Button>
						<Divider style={{ margin: '10px 0' }}>Or</Divider>
						<form
							noValidate
							autoComplete={'off'}
							className='form'
							onSubmit={handleSubmit(onSubmit)}
						>
							<FormControl fullWidth style={{ marginBottom: '15px' }}>
								<InputLabel htmlFor='email' error={errors?.email ? true : false}>
									Email Address
								</InputLabel>
								<OutlinedInput
									style={{ borderRadius: '10px' }}
									id='email'
									type='email'
									endAdornment={
										<InputAdornment position='end'>
											<div style={{ padding: '8px', display: 'flex' }}>
												<AlternateEmail fontSize='medium' />
											</div>
										</InputAdornment>
									}
									label='Email Address'
									name='email'
									fullWidth
									error={errors?.email ? true : false}
									{...register('email', {
										required: 'Please input your email address!',
										pattern: {
											value: /\S+@\S+\.\S+/,
											message: 'Please provide a valid email address!',
										},
									})}
								/>
								{errors?.email && (
									<Alert style={{ marginTop: '10px' }} severity='error'>
										{errors?.email?.message}
									</Alert>
									// {errors?.email && (
									// 	<p style={{ marginTop: '5px', color: '#D32F2F' }}>{errors?.email?.message}</p>
									// )}
								)}
							</FormControl>
							<FormControl fullWidth>
								<InputLabel htmlFor='password' error={errors?.password ? true : false}>
									Password
								</InputLabel>
								<OutlinedInput
									style={{ borderRadius: '10px' }}
									id='password'
									type={visible ? 'text' : 'password'}
									endAdornment={
										<InputAdornment position='end'>
											<IconButton style={{ margin: 0 }} onClick={handleVisibility}>
												{visible ? (
													<VisibilityOff fontSize='medium' />
												) : (
													<Visibility fontSize='medium' />
												)}
											</IconButton>
										</InputAdornment>
									}
									label='Password'
									name='password'
									fullWidth
									error={errors?.password ? true : false}
									{...register('password', { required: 'Please input your password!' })}
								/>
								{errors?.password && (
									<Alert style={{ marginTop: '10px' }} severity='error'>
										{errors?.password?.message}
									</Alert>
									// {errors?.password && (
									// 	<p style={{ marginTop: '5px', color: '#D32F2F' }}>{errors?.password?.message}</p>
									// )}
								)}
							</FormControl>
							{/* <FormGroup style={{ marginTop: '10px' }}>
								<FormControlLabel
									control={<Checkbox />}
									label='Remember me'
									name='remember'
									id='remember'
									{...register('remember')}
								/>
							</FormGroup> */}
							<FormControl fullWidth style={{ marginTop: '20px' }}>
								<Button
									type='submit'
									variant='contained'
									size='large'
									style={{
										borderRadius: '10px',
										padding: '10px 20px',
										fontWeight: 'bold',
										textTransform: 'none',
									}}
								>
									Sign In
								</Button>
							</FormControl>
						</form>
						<p className='subtext' style={{ marginTop: '10px' }}>
							Don&apos;t have an account? <a href='/signup'>Sign up</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SigninForm
