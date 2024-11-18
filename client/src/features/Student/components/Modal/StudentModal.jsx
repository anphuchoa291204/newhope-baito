import { Close } from "@mui/icons-material"
import { Dialog, DialogContent, DialogTitle, IconButton, Slide, styled } from "@mui/material"
import { forwardRef } from "react"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}))

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />
})

const StudentModal = ({ open, setOpen, children }) => {
	return (
		<BootstrapDialog
			TransitionComponent={Transition}
			keepMounted
			onClose={() => setOpen(false)}
			maxWidth={"md"}
			aria-labelledby="customized-dialog-title"
			open={open}
		>
			<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
				Update Student Information
			</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={() => setOpen(false)}
				sx={(theme) => ({
					position: "absolute",
					right: 8,
					top: 8,
					color: theme.palette.grey[500],
				})}
			>
				<Close />
			</IconButton>
			<DialogContent dividers>{children}</DialogContent>
		</BootstrapDialog>
	)
}

export default StudentModal
