//import { getToday } from "../utils/helpers";
import apiInstance from "../apiInstance";

const getAllLoans = async () => {
  try {
    const response = await apiInstance.get(`/loans/api/fetchallloans`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const deleteLoans = async (mobileNumber) => {
  try {
    const response = await apiInstance.delete(`/loans/api/delete?mobileNumber=${mobileNumber}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const saveloan = async (mobileNumber) => {
  try {
    const response = await apiInstance.post(
      `/loans/api/create?mobileNumber=${mobileNumber}`
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const updateLoans = async (loan) => {
  try {
      console.log(loan.amountPaid)
      loan.amountPaid = Number(loan.amountPaid);
      console.log(loan);
      console.log("api request....")
      const response = await apiInstance.put(`/loans/api/update`, loan);
      return response.data; 
  } catch (err) {
    return err.response;
  }
};


const loansRequest = {
    getAllLoans,
    deleteLoans,
    saveloan,
    updateLoans
}

export default loansRequest;