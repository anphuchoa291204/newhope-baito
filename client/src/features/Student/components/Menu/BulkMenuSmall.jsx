import { Delete, Edit } from "@mui/icons-material"
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material"

const BulkMenuSmall = ({ open, anchorEl, onClose, onEdit, handleOpenConfirm }) => {
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
			<MenuItem onClick={onEdit} disableRipple>
				<ListItemIcon>
					<Edit fontSize="small" />
				</ListItemIcon>
				Update
			</MenuItem>

			<Divider sx={{ my: 0.5 }} />

			<MenuItem onClick={handleOpenConfirm} disableRipple>
				<ListItemIcon>
					<Delete fontSize="small" />
				</ListItemIcon>
				Delete
			</MenuItem>
		</Menu>
	)
}

export default BulkMenuSmall
