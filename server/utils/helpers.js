const formatDate = (date) => {
	// Create a new Date object from the provided date
	const utcDate = new Date(date)

	// Adjust the time to UTC+7 (add 7 hours)
	const utc7Date = new Date(utcDate.setHours(utcDate.getHours() + 7))

	return utc7Date
}

export { formatDate }
