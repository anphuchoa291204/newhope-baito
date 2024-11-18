import exportToExcel from "../../utils/exportExcelData"

import { ListItemIcon, Menu, MenuItem } from "@mui/material"
import { AddCircleOutline, CallMade } from "@mui/icons-material"

const BulkMenuGlobal = ({ open, anchorEl, onClose, students }) => {
	const handleExportToExcel = () => {
		exportToExcel(students)
		onClose()
	}

	return (
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
			<MenuItem onClick={onClose} disableRipple>
				<ListItemIcon>
					<AddCircleOutline fontSize="small" />
				</ListItemIcon>
				Create
			</MenuItem>
			<MenuItem onClick={handleExportToExcel} disableRipple>
				<ListItemIcon>
					<CallMade fontSize="small" />
				</ListItemIcon>
				Export to Excel
			</MenuItem>
		</Menu>
	)
}

export default BulkMenuGlobal
