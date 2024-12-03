import { Checkbox, IconButton, TableCell, TableRow, Tooltip } from "@mui/material"
import { formatDate } from "date-fns"
import { CustomTableCell } from "../../styles/TableStyles"
import { Cancel, CheckCircle, MoreVert } from "@mui/icons-material"

const TableBodyRow = ({ student, isItemSelected, labelId, onSelect, onOpenBulkItem }) => {
	return (
		<TableRow
			hover
			role="checkbox"
			tabIndex="-1"
			onClick={(event) => onSelect(event, student._id)}
			aria-checked={isItemSelected}
			selected={isItemSelected}
			sx={{ cursor: "pointer" }}
		>
			<TableCell padding="checkbox">
				<Checkbox
					color="primary"
					checked={isItemSelected}
					inputProps={{
						"aria-labelledby": labelId,
					}}
				/>
			</TableCell>
			<CustomTableCell id={labelId} sx={{ textAlign: "left" }}>
				{student.fullname}
			</CustomTableCell>
			<CustomTableCell sx={{ textAlign: "left" }}>{student.email}</CustomTableCell>
			<CustomTableCell>{student.phone_number}</CustomTableCell>
			<CustomTableCell>{formatDate(student.date_of_birth, "dd / MM / yyyy")}</CustomTableCell>
			<CustomTableCell>{student.gender}</CustomTableCell>
			<CustomTableCell>{student.nationality}</CustomTableCell>
			<CustomTableCell>{student.major}</CustomTableCell>
			<CustomTableCell>{student.japan_skill}</CustomTableCell>
			<CustomTableCell>
				{student.user_id ? <CheckCircle color="success" /> : <Cancel color="error" />}
			</CustomTableCell>
			<CustomTableCell>
				<Tooltip title="Bulk Actions">
					<IconButton color="primary" onClick={(e) => onOpenBulkItem(e, student)}>
						<MoreVert fontSize="small" />
					</IconButton>
				</Tooltip>
			</CustomTableCell>
		</TableRow>
	)
}

export default TableBodyRow
