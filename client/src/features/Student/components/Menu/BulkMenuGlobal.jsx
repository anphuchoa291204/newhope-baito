import exportToExcel from "../../utils/exportExcelData"

import {useNavigate} from "react-router-dom";
import {CallMade, CallReceived} from "@mui/icons-material"
import {ListItemIcon, Menu, MenuItem} from "@mui/material"

const BulkMenuGlobal = ({open, anchorEl, onClose, students}) => {
    const navigate = useNavigate()
    
    const handleExportToExcel = () => {
        exportToExcel(students)
        onClose()
    }
    
    const handleNavigate = () => {
        navigate("/student-list/import-student")
        onClose()
    }

    return (
        <>
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
                <MenuItem onClick={handleNavigate} disableRipple >
                    <ListItemIcon>
                        <CallReceived fontSize="small"/>
                    </ListItemIcon>
                    Import from Excel
                </MenuItem>
                <MenuItem onClick={handleExportToExcel} disableRipple>
                    <ListItemIcon>
                        <CallMade fontSize="small"/>
                    </ListItemIcon>
                    Export to Excel
                </MenuItem>
            </Menu>
        </>
    )
}

export default BulkMenuGlobal
