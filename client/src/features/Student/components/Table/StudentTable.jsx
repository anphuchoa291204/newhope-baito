import { useEffect, useState } from "react"
import { KeyboardArrowDown, MoreVert } from "@mui/icons-material"
import {
	Box,
	Button,
	IconButton,
	Tooltip,
	styled,
	Paper,
	Table,
	TableRow,
	TableHead,
	TableCell,
	TableBody,
	TableFooter,
	TableContainer,
	TablePagination,
} from "@mui/material"

import toast from "react-hot-toast"
import { formatDate } from "date-fns"

import EditModal from "../Modal/StudentModal"
import BulkMenuSmall from "../Menu/BulkMenuSmall"
import CreateUpdateForm from "../Form/CreateUpdateForm"
import { getAllStudents, updateStudent } from "@/services/studentApi"
import TableCustomPagination from "./Pagination/TableCustomPagination"
import BulkMenuGlobal from "../Menu/BulkMenuGlobal"

const CustomTableHeadCell = styled(TableCell)(({ theme }) => ({
	borderBottom: `1px solid ${theme.palette.divider}`,
}))

const CustomTableCell = styled(TableCell)(({ theme }) => ({
	["&:first-of-type"]: {
		borderLeft: "none",
	},
	["&:last-of-type"]: {
		borderRight: "none",
	},
	border: `1px solid ${theme.palette.divider}`,
}))

const CusttomeTableFooterCell = styled(TablePagination)(() => ({
	borderBottom: `none`,
}))

const StudentTable = () => {
	// NOTE: Page for Pagination
	const [page, setPage] = useState(0)
	const [open, setOpen] = useState(false)

	const [students, setStudents] = useState([])
	const [studentEdit, setStudentEdit] = useState(null)
	const [selectedStudent, setSelectedStudent] = useState(null)

	const [rowsPerPage, setRowsPerPage] = useState(10)

	// CHECKPOINT: Bulk Actions Menu Global
	const [anchorEl, setAnchorEl] = useState(null)
	const openBulkGlobal = Boolean(anchorEl)

	const handleOpenBulkGlobal = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleCloseBulkGlobal = () => {
		setAnchorEl(null)
	}

	// CHECKPOINT: Bulk Actions Menu Items
	const [anchorElItem, setAnchorElItem] = useState(null)
	const openBulkItem = Boolean(anchorElItem)

	const handleOpenModal = (student) => {
		setStudentEdit(student)
		setOpen(true)
	}

	// NOTE: Modify handleOpenBulk to receive student data
	const handleOpenBulkItem = (event, student) => {
		setAnchorElItem(event.currentTarget)
		setSelectedStudent(student)
	}

	const handleCloseBulkItem = () => {
		setAnchorElItem(null)
		setSelectedStudent(null)
	}

	// Add handler for edit action
	const handleBulkEdit = () => {
		handleCloseBulkItem()
		handleOpenModal(selectedStudent)
	}

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

	const createOrUpdate = async (student, resetForm) => {
		if (student._id === 0) {
			console.log("???")
		} else {
			try {
				const response = await updateStudent(studentEdit._id, student)

				setStudents((student) =>
					student.map((item) => (item._id === studentEdit._id ? response.data : item))
				)
				// setStudents([...students, response.data])

				toast.success(response.message)
			} catch (error) {
				toast.error(error?.message || "Student update failed!")
			}
		}
		resetForm()
		setStudentEdit(null)
		setOpen(false)
		getAllStudents()
			.then((response) => {
				setStudents(response.data)
			})
			.catch((error) => {
				console.error("Error fetching students:", error)
			})
	}

	return (
		<>
			<Box sx={{ width: "100%" }}>
				<Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
					<Button
						variant="contained"
						aria-haspopup="true"
						onClick={handleOpenBulkGlobal}
						disableElevation
						endIcon={<KeyboardArrowDown />}
						sx={{ textTransform: "none" }}
					>
						Bulk Actions
					</Button>
				</Box>
			</Box>

			<TableContainer component={Paper}>
				<Table size="medium" sx={{ width: "100%" }}>
					<TableHead>
						<TableRow>
							<CustomTableHeadCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>
								Fullname
							</CustomTableHeadCell>
							<CustomTableHeadCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>
								Date Of Birth
							</CustomTableHeadCell>
							<CustomTableHeadCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>
								Gender
							</CustomTableHeadCell>
							<CustomTableHeadCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>
								Nationality
							</CustomTableHeadCell>
							<CustomTableHeadCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>
								Major
							</CustomTableHeadCell>
							<CustomTableHeadCell align="center" sx={{ whiteSpace: "nowrap", minWidth: 100 }}>
								Japanese Skill
							</CustomTableHeadCell>
							<CustomTableHeadCell align="center" sx={{ whiteSpace: "nowrap", minWidth: 150 }}>
								Action
							</CustomTableHeadCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{(rowsPerPage > 0
							? students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: students
						)?.map((student, index) => (
							<TableRow key={index} hover>
								<CustomTableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>
									{student.fullname}
								</CustomTableCell>
								<CustomTableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>
									{formatDate(student.date_of_birth, "dd / MM / yyyy")}
								</CustomTableCell>
								<CustomTableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>
									{student.gender}
								</CustomTableCell>
								<CustomTableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>
									{student.nationality}
								</CustomTableCell>
								<CustomTableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }}>
									{student.major}
								</CustomTableCell>
								<CustomTableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }} align="center">
									{student.japan_skill}
								</CustomTableCell>
								<CustomTableCell sx={{ whiteSpace: "nowrap", minWidth: 150 }} align="center">
									<Tooltip title="Bulk Actions">
										<IconButton color="primary" onClick={(e) => handleOpenBulkItem(e, student)}>
											<MoreVert fontSize="small" />
										</IconButton>
									</Tooltip>
								</CustomTableCell>
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
							<CusttomeTableFooterCell
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

			{/* ==== EDIT MODAL ==== */}
			<EditModal open={open} setOpen={setOpen}>
				<CreateUpdateForm createOrUpdate={createOrUpdate} studentEdit={studentEdit} />
			</EditModal>

			{/* ==== BULK MENU GLOBAL ==== */}
			<BulkMenuGlobal
				open={openBulkGlobal}
				anchorEl={anchorEl}
				onClose={handleCloseBulkGlobal}
				students={students}
			/>

			{/* ==== BULK MENU SMALL ==== */}
			<BulkMenuSmall
				open={openBulkItem}
				anchorEl={anchorElItem}
				onClose={handleCloseBulkItem}
				onEdit={handleBulkEdit}
			/>
		</>
	)
}

export default StudentTable
