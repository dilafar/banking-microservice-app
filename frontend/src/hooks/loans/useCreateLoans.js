import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import loanRequest from  "../../services/loans/apiLoans"

export function useCreateLoan(){
    const queryClient = useQueryClient();

const {mutate:createLoan, isLoading: isCreating} = useMutation({
  mutationFn: (mobileNumber) => loanRequest.saveloan(mobileNumber),
  onSuccess: () => {
    toast.success("new Loan successfully created");
    queryClient.invalidateQueries({
      queryKey: ["loans"]
    });
  },
  onError: (err) => toast.error(err.message),
});

return {createLoan , isCreating};

}