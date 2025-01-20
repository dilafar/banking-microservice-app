import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import employeeRequest from  "../services/apiUsers"

export function useCreateEmployee(){
    const queryClient = useQueryClient();

const {mutate:createEmployee, isLoading: isCreating} = useMutation({
  mutationFn: employeeRequest.updateOrCreateEmployee,
  onSuccess: () => {
    toast.success("new employee successfully created");
    queryClient.invalidateQueries({
      queryKey: ["cabins"]
    });
  },
  onError: (err) => toast.error(err.message),
});

return {createEmployee , isCreating};

}