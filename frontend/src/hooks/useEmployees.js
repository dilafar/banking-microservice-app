import { useQuery } from '@tanstack/react-query';
import employeeRequest from  "../services/apiUsers"


export function useEmployees(){
    const {isLoading,data: cabins} = useQuery({
        queryKey: ["cabins"],
        queryFn: employeeRequest.getAllCustomerDetails,
      });
      return {isLoading,cabins};
}