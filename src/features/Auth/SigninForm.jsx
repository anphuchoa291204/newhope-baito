import {
	Alert,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
} from '@mui/material'
import '../../styles/Signin.scss'
import { AlternateEmail, Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const SigninForm = () => {
	const [visible, setVisible] = useState(false)
	const { register, handleSubmit, formState } = useForm()

	const { errors } = formState

	const handleVisibility = () => {
		setVisible((visiblePrev) => !visiblePrev)
	}

	const onSubmit = (data) => console.log(data)

	return (
		<div className='signin'>
			<Button
				variant='contained'
				style={{
					color: '#fff',
					display: 'flex',
					borderRadius: '50%',
					minWidth: '40px',
					width: '40px',
					height: '40px',
					padding: 0,
				}}
			>
				<Lock color='inherit' />
			</Button>
			<h2 className='heading'>Sign in</h2>
			<p className='subtext'>Welcome to newhope-baito, please sign in to continue</p>
			<form noValidate autoComplete={'off'} className='form' onSubmit={handleSubmit(onSubmit)}>
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
									{visible ? <VisibilityOff fontSize='medium' /> : <Visibility fontSize='medium' />}
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
					)}
				</FormControl>
				<FormGroup style={{ marginTop: '10px' }}>
					<FormControlLabel
						control={<Checkbox />}
						label='Remember me'
						name='remember'
						id='remember'
						{...register('remember')}
					/>
				</FormGroup>
				<FormControl fullWidth style={{ marginTop: '20px' }}>
					<Button
						type='submit'
						variant='contained'
						size='large'
						style={{ borderRadius: '10px', padding: '10px 20px', fontWeight: 'bold' }}
					>
						Sign In
					</Button>
				</FormControl>
			</form>
		</div>
	)
}

export default SigninForm
