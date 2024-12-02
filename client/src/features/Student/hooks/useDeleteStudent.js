import { deleteStudent as deleteStudentApi } from "@/services/studentApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

const useDeleteStudent = () => {
	const queryClient = useQueryClient()

	const { mutate: deleteStudent, isPending: isDeletingStudent } = useMutation({
		mutationFn: (studentId) => deleteStudentApi(studentId),
		onSuccess: () => {
			toast.success("Student deleted successfully!")

			queryClient.invalidateQueries({ queryKey: ["students"] })
		},
		onError: (error) => {
			toast.error(error.message || "Failed to delete student")
		},
	})

	return { deleteStudent, isDeletingStudent }
}

export default useDeleteStudent
