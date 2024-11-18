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
	Autocomplete,
	FormControlLabel,
	FormHelperText,
} from "@mui/material"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"
import { DatePicker } from "@mui/x-date-pickers"
import { useForm, Controller } from "react-hook-form"

import { majors } from "../../data/majordata"
import { countries } from "../../data/countrydata"
import { japan_skill_levels, user_gender } from "../../data/userdata"

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
						sx={{ borderRadius: "10px", mt: 1 }}
						type="text"
						error={!!errors.fullname}
						helperText={errors?.fullname?.message}
						placeholder="Full Name"
						{...register("fullname", { required: "Please input your fullname!" })}
						fullWidth
					/>
					{/* {errors?.fullname && (
						<Alert sx={{ marginTop: "10px" }} severity="error">
							{errors?.fullname?.message}
						</Alert>
					)} */}
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
									textField: { error: !!errors.dateofbirth, sx: { mt: 1, width: "100%" } },
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
						rules={{
							required: "Please select your gender!",
						}}
						render={({ field }) => (
							<RadioGroup
								row
								{...field}
								value={field.value || ""}
								onChange={(e) => field.onChange(e.target.value)}
							>
								{user_gender.map((gen) => (
									<FormControlLabel key={gen} value={gen} control={<Radio />} label={gen} />
								))}
							</RadioGroup>
						)}
					/>
					<FormHelperText error={!!errors.gender}>{errors.gender?.message}</FormHelperText>
					{/* {errors?.gender && (
						<Alert sx={{ marginTop: "10px" }} severity="error">
							{errors?.gender?.message}
						</Alert>
					)} */}
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
						error={!!errors.phonenumber}
						helperText={errors.phonenumber?.message}
						sx={{ mt: 1 }}
						fullWidth
					/>
					{/* {errors?.phonenumber && (
						<Alert sx={{ marginTop: "10px" }} severity="error">
							{errors?.phonenumber?.message}
						</Alert>
					)} */}
				</Box>

				{/* ==== Nationality ==== */}
				<Box>
					<Typography variant="h6">Nationality</Typography>
					<Controller
						name="nationality"
						control={control}
						defaultValue={userProfile.nationality || null}
						rules={{
							required: "Please select your nationality!",
						}}
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
										sx={{ mt: 1 }}
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
						rules={{
							required: "Please select your major!",
						}}
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
										sx={{ mt: 1 }}
										label="Select your major"
										error={!!errors.major}
										helperText={errors?.major?.message}
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
						rules={{ required: "Please select your Japanese skill level" }}
						defaultValue={userProfile.japanSkill || ""}
						render={({ field }) => (
							<RadioGroup
								id="jp-skill-label"
								row
								{...field}
								value={field.value || ""}
								onChange={(e) => field.onChange(e.target.value)}
							>
								{japan_skill_levels.map((level) => (
									<FormControlLabel key={level} value={level} control={<Radio />} label={level} />
								))}
							</RadioGroup>
						)}
					/>
					<FormHelperText error={!!errors.japan_skill}>
						{errors.japan_skill?.message}
					</FormHelperText>
					{/* {errors?.japanSkill && (
						<Alert sx={{ marginTop: "10px" }} severity="error">
							{errors?.japanSkill?.message}
						</Alert>
					)} */}
				</Box>

				{/* ==== Other Languages ==== */}
				<Box>
					<Typography variant="h6">Other languages (optional)</Typography>
					<TextField
						type="text"
						placeholder="Other languages (optional)"
						{...register("otherLang")}
						fullWidth
						sx={{ mt: 1 }}
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
