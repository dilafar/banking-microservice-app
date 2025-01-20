import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import cardsRequest from  "../../services/cards/apiCards"

export function useCreateCards(){
    const queryClient = useQueryClient();

const {mutate:createCards, isLoading: isCreating} = useMutation({
  mutationFn: (mobileNumber) => cardsRequest.updateOrCreateCard(mobileNumber),
  onSuccess: () => {
    toast.success("new card successfully created");
    queryClient.invalidateQueries({
      queryKey: ["cards"]
    });
  },
  onError: (err) => toast.error(err.message),
});

return {createCards , isCreating};

}