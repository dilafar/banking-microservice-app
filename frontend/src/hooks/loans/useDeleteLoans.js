import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import loansRequest from  "../../services/loans/apiLoans"

export function useDeleteLoan() {
    const queryClient = useQueryClient();
    const {isLoading: isDeleting, mutate: deleteLoan } = useMutation({
      mutationFn: (mobileNumber) => loansRequest.deleteLoans(mobileNumber),
      onSuccess: () => {
        toast.success("loan successfully deleted")
        queryClient.invalidateQueries({
          queryKey: ["loans"]
        });
      },
      onError: (err) => toast.error(err.message),
    });
    return {isDeleting , deleteLoan};
}