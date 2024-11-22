import * as XLSX from "xlsx"

const importExcelData = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = (e) => {
			try {
				const data = new Uint8Array(e.target.result)
				const workbook = XLSX.read(data, { type: "array" })
				const sheetName = workbook.SheetNames[0]
				const worksheet = workbook.Sheets[sheetName]
				const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

				// Filter out rows that are completely empty
				const filteredData = excelData.filter((row) =>
					row.some((cell) => cell !== null && cell !== undefined && cell !== "")
				)

				resolve(filteredData)
			} catch (error) {
				reject(error)
			}
		}
		reader.onerror = (error) => {
			reject(error)
		}
		reader.readAsArrayBuffer(file)
	})
}

export default importExcelData
