import { useQuery } from '@tanstack/react-query';
import employeeRequest from  "../services/apiUsers"


export function useCustomerDetails(){
    const {isLoading,data: customers} = useQuery({
        queryKey: ["customers"],
        queryFn: employeeRequest.getAllCustomerDetails,
      });
      return {isLoading,customers};
}