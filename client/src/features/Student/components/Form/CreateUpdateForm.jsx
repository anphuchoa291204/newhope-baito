import dayjs from "dayjs"
import { useEffect } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { useForm, Controller } from "react-hook-form"
import {
	Autocomplete,
	Box,
	Button,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Radio,
	RadioGroup,
	Stack,
	TextField,
} from "@mui/material"
import { majors } from "@/features/Auth/data/majordata"
import { countries } from "@/features/Auth/data/countrydata"
import { japan_skill_levels, user_gender } from "@/features/Auth/data/userdata"

const initialValues = {
	fullname: "",
	date_of_birth: "",
	gender: "",
	phone_number: "",
	nationality: "",
	major: "",
	japan_skill: "",
	other_language: "",
}

const CreateUpdateForm = ({ createOrUpdate, studentEdit, isUpdatingStudent }) => {
	const { register, setValue, handleSubmit, control, formState, reset } = useForm({
		defaultValues: initialValues,
	})

	const { errors } = formState

	useEffect(() => {
		if (studentEdit) {
			setValue("fullname", studentEdit.fullname)
			setValue("date_of_birth", dayjs(studentEdit.date_of_birth))
			setValue("gender", studentEdit.gender)
			setValue("phone_number", studentEdit.phone_number)
			setValue("nationality", studentEdit.nationality)
			setValue("major", studentEdit.major)
			setValue("japan_skill", studentEdit.japan_skill)
			setValue("other_language", studentEdit.other_language || "N/A")
		}
	}, [setValue, studentEdit])

	const onSubmit = async (data) => {
		createOrUpdate(data, reset)
	}

	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={2}>
				<Stack direction="row" spacing={2}>
					<TextField
						slotProps={{
							inputLabel: {
								shrink: true,
							},
						}}
						error={!!errors.fullname}
						helperText={errors.fullname?.message}
						label="Full Name"
						{...register("fullname", { required: "Please input your fullname!" })}
						fullWidth
					/>

					<Controller
						name="date_of_birth"
						control={control}
						defaultValue={null}
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
								label="Date Of Birth"
								value={field.value || null}
								onChange={(newValue) => {
									field.onChange(newValue)
								}}
								sx={{ width: "100%" }}
								disableFuture
								format="DD/MM/YYYY"
								slotProps={{
									textField: {
										error: !!errors.date_of_birth,
										helperText: errors.date_of_birth?.message,
										slotProps: {
											inputLabel: {
												shrink: true,
											},
										},
									},
								}}
							/>
						)}
					/>
				</Stack>

				<TextField
					slotProps={{ inputLabel: { shrink: true } }}
					label="Email"
					disabled
					value={studentEdit?.email || ""}
					fullWidth
					margin="normal"
				/>

				<TextField
					slotProps={{
						inputLabel: {
							shrink: true,
						},
					}}
					label="Phone Number"
					{...register("phone_number", {
						required: "Please input your phone number!",
					})}
					error={!!errors.phone_number}
					helperText={errors.phone_number?.message}
					fullWidth
					margin="normal"
				/>

				<Box>
					<Controller
						name="nationality"
						control={control}
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
										slotProps={{
											inputLabel: {
												shrink: true,
											},
										}}
										sx={{ mt: 1 }}
										label="Nationality"
										error={!!errors.nationality}
										helperText={errors.nationality?.message}
									/>
								)}
							/>
						)}
					/>
				</Box>

				<Box>
					<Controller
						name="major"
						control={control}
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
										slotProps={{
											inputLabel: {
												shrink: true,
											},
										}}
										sx={{ mt: 1 }}
										label="Major"
										error={!!errors.major}
										helperText={errors?.major?.message}
									/>
								)}
							/>
						)}
					/>
				</Box>

				<Box>
					<FormLabel error={!!errors.gender} id="gender-label">
						Gender
					</FormLabel>
					<Controller
						name="gender"
						control={control}
						rules={{ required: "Please select your gender" }}
						render={({ field }) => (
							<RadioGroup
								row
								{...field}
								id="gender-label"
								sx={{ marginTop: 0 }}
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
				</Box>

				<Box>
					<FormLabel error={!!errors.japan_skill} id="jp-skill">
						Japanese Skill Level
					</FormLabel>
					<Controller
						name="japan_skill"
						control={control}
						rules={{ required: "Please select your Japanese skill level" }}
						render={({ field }) => (
							<RadioGroup
								row
								id="jp-skill"
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
				</Box>

				<TextField
					slotProps={{ inputLabel: { shrink: true } }}
					label="Other Language"
					{...register("other_language")}
					fullWidth
					margin="normal"
				/>

				<Button type="submit" disabled={isUpdatingStudent} variant="contained">
					Save Changes
				</Button>
			</Stack>
		</form>
	)
}

export default CreateUpdateForm
