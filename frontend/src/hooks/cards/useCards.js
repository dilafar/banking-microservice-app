import { useQuery } from '@tanstack/react-query';
import cardsRequest from  "../../services/cards/apiCards"


export function useCards(){
    const {isLoading,data: cards} = useQuery({
        queryKey: ["cards"],
        queryFn: cardsRequest.getAllCards,
      });
      return {isLoading,cards};
}