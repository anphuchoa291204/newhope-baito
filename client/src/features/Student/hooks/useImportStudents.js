import toast from "react-hot-toast"
import {createImportStudent} from "@/services/studentApi"
import {useMutation, useQueryClient} from "@tanstack/react-query"

const useImportStudents = () => {
    const queryClient = useQueryClient()

    const {
        mutate: importStudents,
        isPending: isImportingStudents,
        error: errorImporting
    } = useMutation({
        mutationFn: (studentsToImport) => createImportStudent(studentsToImport),
        onSuccess: () => {
            toast.success("Students imported successfully!")

            queryClient.invalidateQueries({
                queryKey: ["students"],
            })
        },
        onError: (error) => {
            console.error(error)

            toast.error("Failed to import students. Please check the file format.")
        },
    })

    return {importStudents, isImportingStudents, errorImporting}
}

export default useImportStudents
