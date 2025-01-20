//import { getToday } from "../utils/helpers";
import apiInstance from "../apiInstance";

const getAllCards = async () => {
  try {
    const response = await apiInstance.get(`/cards/api/fetchallcards`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const deleteCard = async (mobileNumber) => {
  try {
    const response = await apiInstance.delete(`/cards/api/delete?mobileNumber=${mobileNumber}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};
//cards/api/create?mobileNumber=0778333409
//const saveCard = async (employee) => {
 // try {
 //   const response = await apiInstance.post(`/api/create`, employee);
 //   return response.data;
 // } catch (err) {
 //   return err.response;
 // }
//};

const updateOrCreateCard = async (card,mobileNumber) => {
  try {
    if(!mobileNumber){
      const response = await apiInstance.put(`/cards/api/update`, card);
      return response.data;
    }
    if(mobileNumber){
      const response = await apiInstance.post(
        `/cards/api/create?mobileNumber=${mobileNumber}`
      );
      return response.data;
    }
    
    
  } catch (err) {
    return err.response;
  }
};


const cardsRequest = {
    getAllCards,
    deleteCard,
    updateOrCreateCard
}

export default cardsRequest;