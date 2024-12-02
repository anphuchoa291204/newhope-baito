import { format as formatDate } from "date-fns"
import * as XLSX from "xlsx-js-style"

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
		"Other Languages": student.other_language || "N/A",
	}))

	// Create worksheet
	const ws = XLSX.utils.json_to_sheet(excelData, { origin: "A3" }) // Data starts at Row 3

	// Add a big caption at the top of the sheet
	XLSX.utils.sheet_add_aoa(ws, [["Student List Table"]], { origin: "A1" })

	// Merge cells for the caption across the correct number of columns
	const numberOfColumns = Object.keys(excelData[0]).length // Count the number of columns
	ws["!merges"] = [
		{
			s: { r: 0, c: 0 }, // Start (Row 1, Col 1)
			e: { r: 0, c: numberOfColumns - 1 }, // End (Row 1, Last Col)
		},
	]

	// Style the caption (bold, center, large font)
	ws["A1"].s = {
		font: { bold: true, sz: 16 }, // Bold and larger font
		alignment: { horizontal: "center", vertical: "center" }, // Center alignment
	}

	// Style headers (row 3)
	const headerRow = Object.keys(ws).filter((key) => key.match(/^[A-Z]+3$/))
	const borderStyle = { style: "thin", color: { rgb: "000000" } }
	const headerBackgroundColor = { rgb: "D9E1F2" } // Light blue header color
	headerRow.forEach((headerCell) => {
		const column = headerCell[0] // Get column letter
		if (ws[headerCell]) {
			ws[headerCell].s = {
				font: { bold: true }, // Bold headers
				alignment: { horizontal: column === "A" ? "left" : "center", vertical: "center" }, // Center align
				border: { top: borderStyle, bottom: borderStyle, left: borderStyle, right: borderStyle }, // Borders
				fill: { fgColor: headerBackgroundColor }, // Header background color
			}
		}
	})

	// Style data rows
	Object.keys(ws)
		.filter((key) => key.match(/^[A-Z]+[4-9][0-9]*$/)) // Data rows start at Row 4
		.forEach((dataCell) => {
			const column = dataCell[0] // Get column letter
			ws[dataCell].s = {
				alignment: {
					horizontal: column === "A" ? "left" : "center", // Left-align Full Name column
					vertical: "center",
				},
				border: { top: borderStyle, bottom: borderStyle, left: borderStyle, right: borderStyle }, // Borders
			}
		})

	// Set column widths
	ws["!cols"] = Object.keys(excelData[0]).map((key, index) =>
		index === 0 ? { wch: 25 } : { wch: 20 }
	) // Wider column for Full Name

	// Create workbook and append worksheet
	const wb = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(wb, ws, "Students")

	// Generate and save the Excel file
	XLSX.writeFile(wb, `students_${formatDate(new Date(), "dd-MM-yyyy")}.xlsx`)
}

export default exportToExcel
