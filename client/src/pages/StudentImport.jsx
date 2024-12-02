import { useRef, useState } from "react"
import "@/styles/FileUploadButton.scss"

import toast from "react-hot-toast"
import ExcelIcon from "@/data/ExcelIcon.jsx"
import { Box, Button, Stack, useTheme } from "@mui/material"
import importExcelData from "@/features/Student/utils/importExcelData.js"
import useImportStudents from "@/features/Student/hooks/useImportStudents.js"
import { format, isMatch, isValid } from "date-fns"
import serialDateToExcelDate from "@/features/Student/utils/serialDateToExcelDate.js"

const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

const StudentImport = () => {
	const theme = useTheme()

	const fileInputRef = useRef()
	const [selectedFile, setSelectedFile] = useState(null)

	const { importStudents } = useImportStudents()
	const [errorImporting, setErrorImporting] = useState(null)

	// Handle file selection
	const handleFileChange = (event) => {
		const file = event.target.files[0]
		setSelectedFile(file) // Store the file in state
	}

	const handleResetFile = () => {
		fileInputRef.current.value = ""
		setSelectedFile(null)
	}

	const handleImportFromExcel = async () => {
		if (!selectedFile) {
			toast.error("No file selected.")
			setErrorImporting(null)
			return
		}

		if (!selectedFile.name.endsWith(".xlsx") || selectedFile.name.endsWith(".xls")) {
			toast.error("Please select an Excel file to import.", {
				duration: 5000,
			})
			setSelectedFile(null)
			setErrorImporting(null)
			fileInputRef.current.value = ""
			return
		}

		try {
			const excelData = await importExcelData(selectedFile)

			// Skip the first row (header row) and map the remaining rows
			const studentsToImport = excelData.slice(1).map((row, index) => ({
				index: index + 2,
				fullname: row[0] || "",
				email: row[1] || "",
				date_of_birth: row[2] || "",
				gender: row[3] || "",
				phone_number: row[4] || "",
				nationality: row[5] || "",
				major: row[6] || "",
				japan_skill: row[7] || "",
				otherLanguages: row[8] || "",
			}))

			// Validate data and capture errors
			const errors = []
			const validStudents = []

			studentsToImport.forEach((student) => {
				const {
					index,
					fullname,
					email,
					date_of_birth,
					gender,
					phone_number,
					nationality,
					major,
					japan_skill,
				} = student
				const rowErrors = []

				// console.log(serialDateToExcelDate(date_of_birth))

				if (!fullname) rowErrors.push("Full Name is missing.")

				// NOTE: Email validation
				if (!email) rowErrors.push("Email is missing.")
				if (email && !email.toLowerCase().match(EMAIL_REGEX))
					rowErrors.push("Invalid email" + " address." + " Please check your email address again.")

				// NOTE: Date of Birth validation
				if (!date_of_birth) rowErrors.push("Date of Birth is missing.")
				// INFO: check if date_of_birth is in dd/MM/yyyy format
				// INFO: check if date_of_birth is a valid date
				if (
					serialDateToExcelDate(date_of_birth) === "Invalid Date" ||
					(isMatch(format(serialDateToExcelDate(date_of_birth), "dd/MM/yyyy"), "dd/MM/yyyy") &&
						!isValid(new Date(format(serialDateToExcelDate(date_of_birth), "yyyy/MM/dd"))))
				)
					rowErrors.push(
						"Invalid" + " date of birth. Must be in dd/MM/yyyy format and a valid date."
					)

				if (!gender) rowErrors.push("Gender is missing.")
				if (!phone_number) rowErrors.push("Phone Number is missing.")
				if (!nationality) rowErrors.push("Nationality is missing.")
				if (!major) rowErrors.push("Major is missing.")
				if (!japan_skill) rowErrors.push("Japan Skill is missing.")

				if (rowErrors.length > 0) {
					if (rowErrors.length > 1) {
						errors.push({
							line: index,
							issues: ["Please check the data of entry"],
						})
					} else {
						errors.push({
							line: index,
							issues: rowErrors,
						})
					}
				} else {
					validStudents.push({
						...student,
						date_of_birth: serialDateToExcelDate(date_of_birth, "serial-date"),
					})
				}
			})

			if (errors.length > 0) {
				setErrorImporting(errors) // Update state with errors
				return
			}

			// If no errors, proceed with importing
			setErrorImporting(null)
			importStudents(validStudents)
		} catch (error) {
			console.error(error)
		} finally {
			setSelectedFile(null) // Clear the selected file
			fileInputRef.current.value = "" // Clear the file input
		}
	}

	return (
		<Stack spacing={2} direction="column" sx={{ width: "100%", height: "100%" }}>
			<Stack spacing={2} direction="row" alignItems="center" flexWrap="wrap" gap={2} useFlexGap>
				<input
					type="file"
					ref={fileInputRef}
					accept=".xlsx, .xls"
					onChange={handleFileChange}
					className="custom-file-input"
				/>

				<Button variant="outlined" color="secondary" onClick={handleResetFile}>
					Reset
				</Button>

				<Button
					variant="contained"
					color="success"
					onClick={handleImportFromExcel}
					disabled={!selectedFile}
				>
					<ExcelIcon />
					Import student
				</Button>
			</Stack>

			<Box
				sx={{
					mt: 4,
					borderRadius: "10px",
					bgcolor: theme.palette.background.paper,
					width: "100%",
					minHeight: "400px",
					maxHeight: "400px",
					overflowY: "auto",
					p: 2,
					color: errorImporting ? theme.palette.error.main : theme.palette.text.primary,
				}}
			>
				{errorImporting ? (
					<ul>
						{errorImporting.map((error, idx) => (
							<li key={idx}>
								<strong>Line {error.line}:</strong> <span>{error.issues[0]}</span>
							</li>
						))}
					</ul>
				) : (
					<div>Please import students using Excel file!!!</div>
				)}
			</Box>
		</Stack>
	)
}

export default StudentImport
