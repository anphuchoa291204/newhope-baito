import { BorderColor, Delete } from "@mui/icons-material"
import {
	Button,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	Tooltip,
} from "@mui/material"
import { useEffect, useState } from "react"
import { formatDate } from "date-fns"
// import { students } from "../../data/data"
import TableCustomPagination from "./Pagination/TableCustomPagination"
import { getAllStudents } from "@/services/studentApi"

const StudentTable = () => {
	// NOTE: Page for Pagination
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [students, setStudents] = useState([])

	console.log(students?.data)

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const data = await getAllStudents()
				setStudents(data?.data)
			} catch (error) {
				console.error(error?.message || "Failed to fetch students")
			}
		}

		fetchStudents()
	}, [])

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	return (
		<TableContainer component={Paper}>
			<Table size="medium" sx={{ width: "100%" }}>
				<TableHead>
					<TableRow>
						<TableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>Fullname</TableCell>
						<TableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>Date Of Birth</TableCell>
						<TableCell sx={{ whiteSpace: "nowrap", minWidth: 100 }}>Gender</TableCell>
						<TableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>Nationality</TableCell>
						<TableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>Major</TableCell>
						<TableCell align="center" sx={{ whiteSpace: "nowrap", minWidth: 100 }}>
							Japanese Skill
						</TableCell>
						<TableCell align="center" sx={{ whiteSpace: "nowrap", minWidth: 150 }}>
							Action
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: students
					)?.map((student, index) => (
						<TableRow key={index} hover>
							<TableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>{student.fullname}</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>
								{formatDate(student.date_of_birth, "dd / MM / yyyy")}
							</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap", minWidth: 100 }}>{student.gender}</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>
								{student.nationality}
							</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>{student.major}</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }} align="center">
								{student.japan_skill}
							</TableCell>
							<TableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }} align="center">
								<Stack component={"span"} direction={"row"} justifyContent={"center"} spacing={2}>
									<Tooltip title="Edit">
										<Button variant="outlined" color="secondary">
											<BorderColor fontSize="small" />
										</Button>
									</Tooltip>
									<Tooltip title="Delete">
										<Button variant="outlined" color="error">
											<Delete fontSize="small" />
										</Button>
									</Tooltip>
								</Stack>
							</TableCell>
						</TableRow>
					))}
					{emptyRows > 0 && (
						<TableRow style={{ height: 69 * emptyRows }}>
							<TableCell colSpan={7} />
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
							count={students.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							ActionsComponent={TableCustomPagination}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	)
}

export default StudentTable
