import { useState } from "react"
import { Box, Button } from "@mui/material"
import { KeyboardArrowDown } from "@mui/icons-material"

import useGetAllStudents from "../../hooks/useGetAllStudents"

import BulkMenuGlobal from "../Menu/BulkMenuGlobal"

const BulkMenuButton = () => {
	const { students } = useGetAllStudents()

	const [anchorEl, setAnchorEl] = useState(null)
	const openBulkGlobal = Boolean(anchorEl)

	// CHECKPOINT: Bulk Actions Menu Global
	const handleOpenBulkGlobal = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleCloseBulkGlobal = () => {
		setAnchorEl(null)
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

			{/* ==== BULK MENU GLOBAL ==== */}
			<BulkMenuGlobal
				open={openBulkGlobal}
				anchorEl={anchorEl}
				onClose={handleCloseBulkGlobal}
				students={students}
			/>
		</>
	)
}

export default BulkMenuButton
