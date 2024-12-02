import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material"
import { headCells } from "../../data/tableData"
import { CustomTableHeadCell } from "../../styles/TableStyles"

const TableHeader = ({ numSelected, rowCount, onSelectAll }) => {
	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAll}
						inputProps={{
							"aria-label": "select all students",
						}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<CustomTableHeadCell key={headCell.id} align={headCell.align || "left"}>
						{headCell.label}
					</CustomTableHeadCell>
				))}
			</TableRow>
		</TableHead>
	)
}

export default TableHeader
