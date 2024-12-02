import { useState } from "react"
import useGetAllStudents from "./useGetAllStudents"

const usePagination = () => {
	const { students } = useGetAllStudents()

	// NOTE: Page for Pagination
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	// CHECKPOINT: Pagination
	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	return {
		page,
		rowsPerPage,
		emptyRows,
		handleChangePage,
		handleChangeRowsPerPage,
	}
}

export default usePagination
