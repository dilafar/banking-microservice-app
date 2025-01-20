import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import employeeRequest from  "../services/apiUsers"

export function useUpdateEmployee(){
    const queryClient = useQueryClient();
    const {mutate: updateEmployee, isEditing} = useMutation({
        mutationFn: ({newEmployee, id}) => employeeRequest.updateOrCreateEmployee(newEmployee, id),
        onSuccess: () => {
          toast.success("employee successfully edited");
          queryClient.invalidateQueries({
            queryKey: ["cabins"]
          });
        },
        onError: (err) => toast.error(err.message),
      });
      return {updateEmployee , isEditing};
}