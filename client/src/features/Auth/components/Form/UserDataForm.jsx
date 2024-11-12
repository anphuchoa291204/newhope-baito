// import {
// 	Box,
// 	Alert,
// 	Radio,
// 	Stack,
// 	Button,
// 	TextField,
// 	Typography,
// 	RadioGroup,
// 	FormControl,
// 	Autocomplete,
// 	FormControlLabel,
// } from "@mui/material"

// import dayjs from "dayjs"
// import { useNavigate } from "react-router-dom"
// import { DatePicker } from "@mui/x-date-pickers"
// import { useForm, Controller } from "react-hook-form"

// import { majors } from "../../data/majordata"
// import { countries } from "../../data/countrydata"
// import { useEffect } from "react"

// const UserDataForm = ({ setPage, userProfile, setUserProfile }) => {
// 	const navigate = useNavigate()
// 	const { formState, reset, handleSubmit, register, control } = useForm({
// 		defaultValues: {
// 			userProfile,
// 		},
// 	})

// 	// Reset form whenever userProfile changes
// 	useEffect(() => {
// 		reset(userProfile)
// 	}, [userProfile, reset])

// 	const { errors } = formState

// 	const backToLogin = () => {
// 		reset()
// 		navigate("/signin")
// 	}

// 	const onSubmit = (data) => {
// 		setPage("signup")
// 		setUserProfile(data)
// 	}

// 	// NOTE: This one use to change page when all data is valid

// 	return (
// 		<form noValidate autoComplete="off" className="form" onSubmit={handleSubmit(onSubmit)}>
// 			<Stack spacing={2}>
// 				{/* ==== FULLNAME ==== */}
// 				<Box>
// 					<Typography variant="h6">Full Name</Typography>
// 					<TextField
// 						sx={{ borderRadius: "10px" }}
// 						type="text"
// 						placeholder="Full Name"
// 						{...register("fullname", { required: "Please input your fullname!" })}
// 						fullWidth
// 					/>
// 					{errors?.fullname && (
// 						<Alert sx={{ marginTop: "10px" }} severity="error">
// 							{errors?.fullname?.message}
// 						</Alert>
// 					)}
// 				</Box>

// 				{/* ==== DATE OF BIRTH ==== */}
// 				<Box>
// 					<Typography variant="h6">Date of Birth</Typography>
// 					<Controller
// 						name="dateofbirth"
// 						control={control}
// 						rules={{
// 							required: "Please select your birthday!",
// 							validate: {
// 								lessThanToday: (value) => {
// 									if (dayjs(value).isAfter(dayjs())) {
// 										return "Please provide a valid date of birth!"
// 									}
// 									return true
// 								},
// 								after1900: (value) => {
// 									if (dayjs(value).isBefore("1900-01-01")) {
// 										return "Please provide a valid date of birth!"
// 									}
// 									return true
// 								},
// 							},
// 						}}
// 						render={({ field }) => (
// 							<DatePicker
// 								label="Date of Birth"
// 								sx={{ width: "100%" }}
// 								value={field.value}
// 								onChange={(date) => {
// 									field.onChange(date)
// 								}}
// 								slotProps={{
// 									textField: { error: !!errors.dateofbirth },
// 								}}
// 								disableFuture
// 								format="YYYY/MM/DD"
// 							/>
// 						)}
// 					/>
// 					{errors?.dateofbirth && (
// 						<Alert sx={{ marginTop: "10px" }} severity="error">
// 							{errors?.dateofbirth?.message}
// 						</Alert>
// 					)}
// 				</Box>

// 				{/* ==== GENDER ==== */}
// 				<Box>
// 					<Typography variant="h6">Gender</Typography>
// 					<FormControl>
// 						<RadioGroup row aria-labelledby="gender-label" defaultValue={userProfile.gender || ""}>
// 							<FormControlLabel
// 								{...register("gender", { required: "Please select your gender!" })}
// 								value="male"
// 								control={<Radio />}
// 								label="Male"
// 							/>
// 							<FormControlLabel
// 								{...register("gender", { required: "Please select your gender!" })}
// 								value="female"
// 								control={<Radio />}
// 								label="Female"
// 							/>
// 						</RadioGroup>
// 					</FormControl>
// 					{errors?.gender && (
// 						<Alert sx={{ marginTop: "10px" }} severity="error">
// 							{errors?.gender?.message}
// 						</Alert>
// 					)}
// 				</Box>

// 				{/* ==== PHONE NUMBER ==== */}
// 				<Box>
// 					<Typography variant="h6">Phone Number</Typography>
// 					<TextField
// 						type="tel"
// 						placeholder="Phone Number"
// 						{...register("phonenumber", {
// 							required: "Please input your phone number!",
// 							pattern: {
// 								value: /^(03|07|08|09)\d{8}$/g,
// 								message: "Please provide a valid phone number!",
// 							},
// 						})}
// 						fullWidth
// 					/>
// 					{errors?.phonenumber && (
// 						<Alert sx={{ marginTop: "10px" }} severity="error">
// 							{errors?.phonenumber?.message}
// 						</Alert>
// 					)}
// 				</Box>

// 				{/* ==== NATIONALITY ==== */}
// 				<Box>
// 					<Typography variant="h6">Nationality</Typography>
// 					<Autocomplete
// 						id="country-select-demo"
// 						sx={{ width: "100%" }}
// 						options={countries}
// 						autoHighlight
// 						getOptionLabel={(option) => option.label}
// 						renderOption={(props, option) => {
// 							const { key, ...optionProps } = props
// 							return (
// 								<Box
// 									key={key}
// 									component="li"
// 									sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
// 									{...optionProps}
// 								>
// 									<img
// 										loading="lazy"
// 										width="20"
// 										srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
// 										src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
// 										alt=""
// 									/>
// 									{option.label} ({option.code}) +{option.phone}
// 								</Box>
// 							)
// 						}}
// 						renderInput={(params) => (
// 							<TextField
// 								{...params}
// 								label="Choose a country"
// 								slotProps={{
// 									htmlInput: {
// 										...params.inputProps,
// 										autoComplete: "new-password", // disable autocomplete and autofill
// 									},
// 								}}
// 								{...register("nationality", {
// 									required: "Please select your nationality!",
// 								})}
// 							/>
// 						)}
// 					/>
// 					{errors?.nationality && (
// 						<Alert sx={{ marginTop: "10px" }} severity="error">
// 							{errors?.nationality?.message}
// 						</Alert>
// 					)}
// 				</Box>

// 				{/* ==== Major ==== */}
// 				<Box>
// 					<Typography variant="h6">Major</Typography>
// 					<Autocomplete
// 						id="major-select"
// 						sx={{ width: "100%" }}
// 						options={majors}
// 						autoHighlight
// 						getOptionLabel={(option) => option}
// 						renderOption={(props, option) => {
// 							const { key, ...optionProps } = props
// 							return (
// 								<Box
// 									key={key}
// 									component="li"
// 									sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
// 									{...optionProps}
// 								>
// 									{option}
// 								</Box>
// 							)
// 						}}
// 						renderInput={(params) => (
// 							<TextField
// 								{...params}
// 								label="Select your major"
// 								slotProps={{
// 									htmlInput: {
// 										...params.inputProps,
// 										autoComplete: "new-password", // disable autocomplete and autofill
// 									},
// 								}}
// 								{...register("major", {
// 									required: "Please select your major!",
// 								})}
// 							/>
// 						)}
// 					/>
// 					{errors?.major && (
// 						<Alert sx={{ marginTop: "10px" }} severity="error">
// 							{errors?.major?.message}
// 						</Alert>
// 					)}
// 				</Box>

// 				{/* ==== Japanese Skill Level ==== */}
// 				<Box>
// 					<Typography variant="h6">Japanese Skill Level</Typography>
// 					<RadioGroup
// 						row
// 						aria-labelledby="jp-skill-label"
// 						defaultValue={userProfile.japanSkill || ""}
// 					>
// 						<FormControlLabel
// 							{...register("japanSkill", {
// 								required: "Please select your Japan skill level!",
// 							})}
// 							value="N5"
// 							control={<Radio />}
// 							label="N5"
// 						/>
// 						<FormControlLabel
// 							{...register("japanSkill", {
// 								required: "Please select your Japan skill level!",
// 							})}
// 							value="N4"
// 							control={<Radio />}
// 							label="N4"
// 						/>
// 						<FormControlLabel
// 							{...register("japanSkill", {
// 								required: "Please select your Japan skill level!",
// 							})}
// 							value="N3"
// 							control={<Radio />}
// 							label="N3"
// 						/>
// 						<FormControlLabel
// 							{...register("japanSkill", {
// 								required: "Please select your Japan skill level!",
// 							})}
// 							value="N2"
// 							control={<Radio />}
// 							label="N2"
// 						/>
// 						<FormControlLabel
// 							{...register("japanSkill", {
// 								required: "Please select your Japan skill level!",
// 							})}
// 							value="N1"
// 							control={<Radio />}
// 							label="N1"
// 						/>
// 					</RadioGroup>
// 					{errors?.japanSkill && (
// 						<Alert sx={{ marginTop: "10px" }} severity="error">
// 							{errors?.japanSkill?.message}
// 						</Alert>
// 					)}
// 				</Box>

// 				{/* ==== OTHER LANGUAGES ==== */}
// 				<Box>
// 					<Typography variant="h6">Other languages (optional)</Typography>
// 					<TextField
// 						type="tel"
// 						placeholder="Other languages (optional)"
// 						{...register("otherLang")}
// 						fullWidth
// 					/>
// 				</Box>
// 			</Stack>

// 			<Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
// 				<Button variant="outlined" fullWidth onClick={backToLogin}>
// 					Back to login page
// 				</Button>

// 				<Button type="submit" variant="contained" fullWidth>
// 					Continue
// 				</Button>
// 			</Stack>
// 		</form>
// 	)
// }

// export default UserDataForm

import { useEffect } from "react"
import {
	Box,
	Alert,
	Radio,
	Stack,
	Button,
	TextField,
	Typography,
	RadioGroup,
	FormControl,
	Autocomplete,
	FormControlLabel,
} from "@mui/material"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"
import { DatePicker } from "@mui/x-date-pickers"
import { useForm, Controller } from "react-hook-form"

import { majors } from "../../data/majordata"
import { countries } from "../../data/countrydata"

const UserDataForm = ({ setPage, userProfile, setUserProfile }) => {
	const navigate = useNavigate()
	const { formState, reset, handleSubmit, register, control } = useForm()

	// Reset form whenever userProfile changes
	useEffect(() => {
		reset(userProfile)
	}, [userProfile, reset])

	const { errors } = formState

	const backToLogin = () => {
		reset()
		navigate("/signin")
	}

	const onSubmit = (data) => {
		setPage("signup")
		setUserProfile(data)
	}

	return (
		<form noValidate autoComplete="off" className="form" onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={2}>
				{/* ==== Full Name ==== */}
				<Box>
					<Typography variant="h6">Full Name</Typography>
					<TextField
						sx={{ borderRadius: "10px" }}
						type="text"
						placeholder="Full Name"
						{...register("fullname", { required: "Please input your fullname!" })}
						fullWidth
					/>
					{errors?.fullname && (
						<Alert sx={{ marginTop: "10px" }} severity="error">
							{errors?.fullname?.message}
						</Alert>
					)}
				</Box>

				{/* ==== Date of Birth ==== */}
				<Box>
					<Typography variant="h6">Date of Birth</Typography>
					<Controller
						name="dateofbirth"
						control={control}
						defaultValue={userProfile.dateofbirth || null}
						rules={{
							required: "Please select your birthday!",
							validate: {
								lessThanToday: (value) => {
									if (dayjs(value).isAfter(dayjs())) {
										return "Please provide a valid date of birth!"
									}
									return true
								},
								after1900: (value) => {
									if (dayjs(value).isBefore("1900-01-01")) {
										return "Please provide a valid date of birth!"
									}
									return true
								},
							},
						}}
						render={({ field }) => (
							<DatePicker
								label="Date of Birth"
								sx={{ width: "100%" }}
								value={field.value || null}
								onChange={(date) => field.onChange(date)}
								slotProps={{
									textField: { error: !!errors.dateofbirth },
								}}
								disableFuture
								format="YYYY/MM/DD"
							/>
						)}
					/>
					{errors?.dateofbirth && (
						<Alert sx={{ marginTop: "10px" }} severity="error">
							{errors?.dateofbirth?.message}
						</Alert>
					)}
				</Box>

				{/* ==== Gender ==== */}
				<Box>
					<Typography variant="h6">Gender</Typography>
					<Controller
						name="gender"
						control={control}
						defaultValue={userProfile.gender || ""}
						render={({ field }) => (
							<RadioGroup
								row
								{...field}
								value={field.value || ""}
								onChange={(e) => field.onChange(e.target.value)}
							>
								<FormControlLabel value="male" control={<Radio />} label="Male" />
								<FormControlLabel value="female" control={<Radio />} label="Female" />
							</RadioGroup>
						)}
					/>
					{errors?.gender && (
						<Alert sx={{ marginTop: "10px" }} severity="error">
							{errors?.gender?.message}
						</Alert>
					)}
				</Box>

				{/* ==== Phone Number ==== */}
				<Box>
					<Typography variant="h6">Phone Number</Typography>
					<TextField
						type="tel"
						placeholder="Phone Number"
						{...register("phonenumber", {
							required: "Please input your phone number!",
							pattern: {
								value: /^(03|07|08|09)\d{8}$/g,
								message: "Please provide a valid phone number!",
							},
						})}
						fullWidth
					/>
					{errors?.phonenumber && (
						<Alert sx={{ marginTop: "10px" }} severity="error">
							{errors?.phonenumber?.message}
						</Alert>
					)}
				</Box>

				{/* ==== Nationality ==== */}
				<Box>
					<Typography variant="h6">Nationality</Typography>
					<Controller
						name="nationality"
						control={control}
						defaultValue={userProfile.nationality || null}
						render={({ field }) => (
							<Autocomplete
								options={countries}
								autoHighlight
								getOptionLabel={(option) => option}
								value={field.value || null}
								onChange={(event, newValue) => {
									field.onChange(newValue)
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Choose a country"
										error={!!errors.nationality}
										helperText={errors.nationality?.message}
									/>
								)}
							/>
						)}
					/>
				</Box>

				{/* ==== Major ==== */}
				<Box>
					<Typography variant="h6">Major</Typography>
					<Controller
						name="major"
						control={control}
						defaultValue={userProfile.major || null}
						render={({ field }) => (
							<Autocomplete
								options={majors}
								autoHighlight
								getOptionLabel={(option) => option}
								value={field.value || null}
								onChange={(event, newValue) => field.onChange(newValue)}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Select your major"
										error={!!errors.major}
										helperText={errors.major?.message}
									/>
								)}
							/>
						)}
					/>
				</Box>

				{/* ==== Japanese Skill Level ==== */}
				<Box>
					<Typography variant="h6">Japanese Skill Level</Typography>
					<Controller
						name="japanSkill"
						control={control}
						defaultValue={userProfile.japanSkill || ""}
						render={({ field }) => (
							<RadioGroup
								row
								{...field}
								value={field.value || ""}
								onChange={(e) => field.onChange(e.target.value)}
							>
								<FormControlLabel value="N5" control={<Radio />} label="N5" />
								<FormControlLabel value="N4" control={<Radio />} label="N4" />
								<FormControlLabel value="N3" control={<Radio />} label="N3" />
								<FormControlLabel value="N2" control={<Radio />} label="N2" />
								<FormControlLabel value="N1" control={<Radio />} label="N1" />
							</RadioGroup>
						)}
					/>
					{errors?.japanSkill && (
						<Alert sx={{ marginTop: "10px" }} severity="error">
							{errors?.japanSkill?.message}
						</Alert>
					)}
				</Box>

				{/* ==== Other Languages ==== */}
				<Box>
					<Typography variant="h6">Other languages (optional)</Typography>
					<TextField
						type="text"
						placeholder="Other languages (optional)"
						{...register("otherLang")}
						fullWidth
					/>
				</Box>
			</Stack>

			<Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
				<Button variant="outlined" fullWidth onClick={backToLogin}>
					Back to login page
				</Button>

				<Button type="submit" variant="contained" fullWidth>
					Continue
				</Button>
			</Stack>
		</form>
	)
}

export default UserDataForm
