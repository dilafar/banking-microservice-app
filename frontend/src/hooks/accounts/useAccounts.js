import { useQuery } from '@tanstack/react-query';
import userRequest from  "../../services/apiUsers"


export function useAccounts(){
    const {isLoading,data: users} = useQuery({
        queryKey: ["users"],
        queryFn: userRequest.getAllCustomerDetails,
      });
      return {isLoading,users};
}