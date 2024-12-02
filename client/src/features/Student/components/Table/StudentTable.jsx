import { useState } from "react"
import {
	Paper,
	Table,
	TableRow,
	TableCell,
	TableBody,
	TableFooter,
	TableContainer,
} from "@mui/material"

import EditModal from "../Modal/StudentModal"
import BulkMenuSmall from "../Menu/BulkMenuSmall"
import CreateUpdateForm from "../Form/CreateUpdateForm"
import TableCustomPagination from "./Pagination/TableCustomPagination"

import usePagination from "../../hooks/usePagination"

import TableHeader from "./TableHeader"
import TableBodyRow from "./TableBodyRow"
import ConfirmModal from "../Modal/ConfirmModal"
import useDeleteStudent from "../../hooks/useDeleteStudent"
import useUpdateStudent from "../../hooks/useUpdateStudent"
import useGetAllStudents from "../../hooks/useGetAllStudents"
import { CustomTableFooterCell } from "../../styles/TableStyles"

const StudentTable = () => {
	const { students, isPendingStudents, error } = useGetAllStudents()
	const { updateStudent, isUpdatingStudent } = useUpdateStudent()
	const { deleteStudent, isDeletingStudent } = useDeleteStudent()

	const { page, rowsPerPage, emptyRows, handleChangePage, handleChangeRowsPerPage } =
		usePagination()

	const [anchorElItem, setAnchorElItem] = useState(null)
	const openBulkItem = Boolean(anchorElItem)

	const [openEdit, setOpenEdit] = useState(false)
	const [openConfirm, setOpenConfirm] = useState(false)

	const [studentEdit, setStudentEdit] = useState(null)
	const [selectedStudent, setSelectedStudent] = useState(null)

	const [selected, setSelected] = useState([])

	if (isPendingStudents) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	const numSelected = selected.length
	const rowCount = students.length

	// CHECKPOINT: Bulk Actions Menu Items
	const handleOpenModal = (student) => {
		setStudentEdit(student)
		setOpenEdit(true)
	}

	// NOTE: Modify handleOpenBulk to receive student data
	const handleOpenBulkItem = (event, student) => {
		event.stopPropagation()
		setAnchorElItem(event.currentTarget)
		setSelectedStudent(student)
	}

	const handleCloseBulkItem = () => {
		setAnchorElItem(null)
		setSelectedStudent(null)
	}

	// CHECKPOINT: Bulk Edit
	const handleBulkEdit = () => {
		handleCloseBulkItem()
		handleOpenModal(selectedStudent)
	}

	// CHECKPOINT: Confirm Modal
	const handleOpenConfirm = () => {
		setOpenConfirm(true)
		setAnchorElItem(null)
	}

	const handleCloseConfirm = () => {
		setOpenConfirm(false)
		setSelectedStudent(null)
	}

	// CHECKPOINT: Checkbox Select Option
	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = students.map((n) => n._id)
			setSelected(newSelected)
			return
		}
		setSelected([])
	}

	const handleSelect = (event, id) => {
		const selectedIndex = selected.indexOf(id)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1))
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			)
		}
		setSelected(newSelected)
	}

	// CHECKPOINT: Create or Update Student
	const createOrUpdate = async (student, resetForm) => {
		if (student._id === 0) {
			console.log("???")
		} else {
			updateStudent(
				{ studentId: studentEdit._id, studentInfo: student },
				{
					onSuccess: () => {
						resetForm()
						setStudentEdit(null)
						setOpenEdit(false)
					},
				}
			)
		}
	}

	// CHECKPOINT: Delete Student
	const handleDelete = async (studentId) => {
		deleteStudent(studentId)
		handleCloseConfirm()
	}

	return (
		<>
			<TableContainer component={Paper}>
				<Table size="medium" sx={{ width: "100%" }}>
					<TableHeader
						numSelected={numSelected}
						rowCount={rowCount}
						onSelectAll={handleSelectAllClick}
					/>

					<TableBody>
						{(rowsPerPage > 0
							? students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: students
						)?.map((student, index) => {
							const isItemSelected = selected.includes(student._id)
							const labelId = `table-checkbox-${index}`

							return (
								<TableBodyRow
									key={student._id}
									student={student}
									isItemSelected={isItemSelected}
									labelId={labelId}
									onSelect={handleSelect}
									onOpenBulkItem={handleOpenBulkItem}
								/>
							)
						})}
						{emptyRows > 0 && (
							<TableRow style={{ height: 69 * emptyRows }}>
								<TableCell colSpan={9} />
							</TableRow>
						)}
					</TableBody>

					<TableFooter>
						<TableRow>
							<CustomTableFooterCell
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
			<EditModal open={openEdit} setOpen={setOpenEdit}>
				<CreateUpdateForm
					createOrUpdate={createOrUpdate}
					studentEdit={studentEdit}
					isUpdatingStudent={isUpdatingStudent}
				/>
			</EditModal>

			{/* ==== CONFIRM MODAL ==== */}
			<ConfirmModal
				open={openConfirm}
				isDeletingStudent={isDeletingStudent}
				handleClose={handleCloseConfirm}
				onDelete={handleDelete}
				student={selectedStudent}
			/>

			{/* ==== BULK MENU SMALL ==== */}
			<BulkMenuSmall
				open={openBulkItem}
				anchorEl={anchorElItem}
				onClose={handleCloseBulkItem}
				onEdit={handleBulkEdit}
				handleOpenConfirm={handleOpenConfirm}
			/>
		</>
	)
}

export default StudentTable
