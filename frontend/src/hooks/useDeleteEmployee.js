import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import employeeRequest from  "../services/apiUsers"

export function useDeleteEmployee() {
    const queryClient = useQueryClient();
    const {isLoading: isDeleting, mutate: deleteEmployee } = useMutation({
      mutationFn: (id) => employeeRequest.deleteEmployee(id),
      onSuccess: () => {
        toast.success("employee successfully deleted")
        queryClient.invalidateQueries({
          queryKey: ["cabins"]
        });
      },
      onError: (err) => toast.error(err.message),
    });
    return {isDeleting , deleteEmployee};
}