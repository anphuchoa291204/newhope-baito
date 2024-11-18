import { format as formatDate } from "date-fns"
import * as XLSX from "xlsx"

const exportToExcel = (students) => {
	// Prepare the data
	const excelData = students.map((student) => ({
		"Full Name": student.fullname,
		"Date of Birth": formatDate(new Date(student.date_of_birth), "dd/MM/yyyy"),
		Gender: student.gender,
		"Phone Number": student.phone_number,
		Nationality: student.nationality,
		Major: student.major,
		"Japanese Skill": student.japan_skill,
		"Other Languages": student.other_language || "None",
	}))

	// Create worksheet
	const ws = XLSX.utils.json_to_sheet(excelData)

	// Get all column names (A, B, C, etc.)
	const cols = Object.keys(ws).filter((key) => key.match(/^[A-Z]+1$/))
	const rows = Object.keys(ws).filter((key) => key.match(/^[A-Z]+[2-9]+$/))

	// Style configurations
	const borderStyle = {
		style: "thin",
		color: { rgb: "000000" },
	}

	// Add styles to worksheet
	ws["!cols"] = cols.map(() => ({ wch: 20 })) // Set column width
	ws["!rows"] = rows.map(() => ({ hpt: 25 }))

	// ws["!cols"] = [ { wch: 10 } ]; // INFO: set column A width to 10 characters

	// Center align and add borders to all cells
	const centerAlignment = {
		horizontal: "center",
		vertical: "center",
	}

	// Style headers (bold) and add borders
	for (let i = 0; i < cols.length; i++) {
		const headerCell = cols[i]

		// Style header cells (bold, centered, bordered)
		if (ws[headerCell]) {
			ws[headerCell].s = {
				font: { bold: true },
				alignment: centerAlignment,
				border: {
					top: borderStyle,
					bottom: borderStyle,
					left: borderStyle,
					right: borderStyle,
				},
			}
		}

		// Style data cells
		for (let row = 2; row <= excelData.length + 1; row++) {
			const cellRef = `${cols[i][0]}${row}`

			if (ws[cellRef]) {
				ws[cellRef].s = {
					alignment: centerAlignment,
					border: {
						top: borderStyle,
						bottom: borderStyle,
						left: borderStyle,
						right: borderStyle,
					},
				}
			}
		}
	}

	// Create workbook and append worksheet
	const wb = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(wb, ws, "Students")

	// Generate and save the Excel file
	XLSX.writeFile(wb, `students_${formatDate(new Date(), "dd-MM-yyyy")}.xlsx`)
}

export default exportToExcel
