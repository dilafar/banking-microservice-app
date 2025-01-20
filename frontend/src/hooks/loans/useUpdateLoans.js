import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import loanRequest from  "../../services/loans/apiLoans"

export function useUpdateLoan(){
    const queryClient = useQueryClient();
    const {mutate: updateLoan, isEditing} = useMutation({
        mutationFn: loanRequest.updateLoans,
        onSuccess: () => {
          toast.success("loan successfully edited");
          queryClient.invalidateQueries({
            queryKey: ["loans"]
          });
        },
        onError: (err) => toast.error(err.message),
      });
      return {updateLoan , isEditing};
}