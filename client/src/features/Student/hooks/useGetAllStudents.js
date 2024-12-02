import { getAllStudents } from "@/services/studentApi"
import { useQuery } from "@tanstack/react-query"

const useGetAllStudents = () => {
	const {
		data,
		isPending: isPendingStudents,
		error,
	} = useQuery({
		queryKey: ["students"],
		queryFn: getAllStudents,
	})

	const students = data?.data || []

	return { students, isPendingStudents, error }
}

export default useGetAllStudents
