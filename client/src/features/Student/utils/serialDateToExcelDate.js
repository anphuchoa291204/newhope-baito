const serialDateToExcelDate = (serialDate) => {
    // Excel's epoch starts at January 1, 1900
    const excelEpoch = new Date(1900, 0, 1);

    // Adjust: subtract 1 day for correct calculation
    const actualDate = new Date(excelEpoch.getTime() + (serialDate - 1) * 24 * 60 * 60 * 1000);

    if (String(actualDate) === "Invalid Date") {
        return "Invalid Date"
    }

    return actualDate.toISOString(); // or format as needed
}

export default serialDateToExcelDate