import { updateStudent as updateStudentApi } from "@/services/studentApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

const useUpdateStudent = () => {
	const queryClient = useQueryClient()

	const { mutate: updateStudent, isPending: isUpdatingStudent } = useMutation({
		mutationFn: ({ studentId, studentInfo }) => updateStudentApi(studentId, studentInfo),
		onSuccess: (response) => {
			toast.success(response.message)

			queryClient.invalidateQueries({
				queryKey: ["students"],
			})
		},
		onError: (error) => {
			console.error(error)

			toast.error(error.message || "Failed to update student. Please try again.")
		},
	})

	return { updateStudent, isUpdatingStudent }
}

export default useUpdateStudent
