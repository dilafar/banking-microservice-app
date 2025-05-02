import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import userRequest from  "../../services/apiUsers"

export function useDeleteAccount() {
    const queryClient = useQueryClient();
    const {isLoading: isDeleting, mutate: deleteAccount } = useMutation({
      mutationFn: (mobileNumber) => userRequest.deleteAccount(mobileNumber),
      onSuccess: () => {
        toast.success("Account successfully deleted")
        queryClient.invalidateQueries({
          queryKey: ["users"]
        });
      },
      onError: (err) => toast.error(err.message),
    });
    return {isDeleting , deleteAccount};
}