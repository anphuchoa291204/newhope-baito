import { styled, TableCell, TablePagination } from "@mui/material"

export const CustomTableHeadCell = styled(TableCell)(({ theme }) => ({
	borderBottom: `1px solid ${theme.palette.divider}`,
}))

export const CustomTableCell = styled(TableCell)(({ theme }) => ({
	["&:first-of-type"]: {
		borderLeft: "none",
	},
	["&:last-of-type"]: {
		borderRight: "none",
	},
	border: `1px solid ${theme.palette.divider}`,
	whiteSpace: "nowrap",
	minWidth: 150,
	textAlign: "center",
}))

export const CustomTableFooterCell = styled(TablePagination)(() => ({
	borderBottom: `none`,
}))
