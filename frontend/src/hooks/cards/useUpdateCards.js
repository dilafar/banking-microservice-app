import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import cardRequest from  "../../services/cards/apiCards"

export function useUpdateCard(){
    const queryClient = useQueryClient();
    const {mutate: updateCard, isEditing} = useMutation({
        mutationFn: cardRequest.updateOrCreateCard,
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