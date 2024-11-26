import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
} from "@mui/material"
import { forwardRef } from "react"

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

const ConfirmModal = ({ open, handleClose, onDelete, student }) => {
	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle>{"Remove Student"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					Are you sure you want to remove <strong>{student?.fullname}</strong> from the list?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button variant="contained" color="error" onClick={() => onDelete(student._id)}>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ConfirmModal
