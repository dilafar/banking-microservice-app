import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import userRequest from  "../../services/apiUsers"

export function useCreateAccount(){
    const queryClient = useQueryClient();
    const {mutate: createAccount, isCreating} = useMutation({
        mutationFn: userRequest.createAccount,
        onSuccess: () => {
          toast.success("Account successfully created");
          queryClient.invalidateQueries({
            queryKey: ["users"]
          });
        },
        onError: (err) => toast.error(err.message),
      });
      return {createAccount , isCreating};
}