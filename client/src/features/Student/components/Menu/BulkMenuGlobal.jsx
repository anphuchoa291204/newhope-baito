import { useRef } from "react"

import exportToExcel from "../../utils/exportExcelData"
import importExcelData from "../../utils/importExcelData"

import dayjs from "dayjs"
import toast from "react-hot-toast"
import { CallMade, CallReceived } from "@mui/icons-material"
import { ListItemIcon, Menu, MenuItem } from "@mui/material"
import { createImportStudent } from "@/services/studentApi"

const BulkMenuGlobal = ({ open, anchorEl, onClose, students, onRefresh }) => {
	const fileInputRef = useRef()

	const handleImportFromExcel = async (event) => {
		try {
			const file = event.target.files[0]
			if (file) {
				const excelData = await importExcelData(file)

				// Skip the first row (header row) and map the remaining rows
				const studentsToImport = excelData.slice(1).map((row) => ({
					fullname: row[0] || "", // Full Name
					date_of_birth: dayjs(row[1]) || "", // Date of Birth
					gender: row[2] || "", // Gender
					phone_number: row[3] || "", // Phone Number
					nationality: row[4] || "", // Nationality
					major: row[5] || "", // Major
					japan_skill: row[6] || "", // Japanese
					otherLanguages: row[7] || "", // Other Languages
				}))

				// Send each student to the backend
				// await Promise.all(studentsToImport.map((student) => createImportStudent(student)))
				await createImportStudent(studentsToImport)
				await onRefresh() // Refresh the table

				toast.success("Students imported successfully!")
			}
		} catch (error) {
			console.error(error)

			toast.error("Failed to import students. Please check the file format.")
		} finally {
			fileInputRef.current.value = "" // Clear the file input
			onClose()
		}
	}

	const triggerFileInput = () => {
		fileInputRef.current.click()
	}

	const handleExportToExcel = () => {
		exportToExcel(students)
		onClose()
	}

	return (
		<>
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: "none" }}
				accept=".xlsx, .xls"
				onChange={handleImportFromExcel}
			/>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={onClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				sx={{
					"& .MuiPaper-root": {
						boxShadow: 3,
						minWidth: 180,
					},
				}}
			>
				<MenuItem onClick={triggerFileInput} disableRipple>
					<ListItemIcon>
						<CallReceived fontSize="small" />
					</ListItemIcon>
					Import from Excel
				</MenuItem>
				<MenuItem onClick={handleExportToExcel} disableRipple>
					<ListItemIcon>
						<CallMade fontSize="small" />
					</ListItemIcon>
					Export to Excel
				</MenuItem>
			</Menu>
		</>
	)
}

export default BulkMenuGlobal
