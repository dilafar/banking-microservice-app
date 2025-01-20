import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import cardsRequest from  "../../services/cards/apiCards"

export function useDeleteCard() {
    const queryClient = useQueryClient();
    const {isLoading: isDeleting, mutate: deleteCard } = useMutation({
      mutationFn: (mobileNumber) => cardsRequest.deleteCard(mobileNumber),
      onSuccess: () => {
        toast.success("card successfully deleted")
        queryClient.invalidateQueries({
          queryKey: ["cards"]
        });
      },
      onError: (err) => toast.error(err.message),
    });
    return {isDeleting , deleteCard};
}