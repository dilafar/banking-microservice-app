import { useQuery } from '@tanstack/react-query';
import loansRequest from  "../../services/loans/apiLoans"


export function useLoans(){
    const {isLoading,data: loans} = useQuery({
        queryKey: ["loans"],
        queryFn: loansRequest.getAllLoans,
      });
      return {isLoading, loans};
}