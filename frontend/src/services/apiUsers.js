//http://localhost:8072/qncbank/accounts/api/fetchallCustomerDetails
import apiInstance from "./apiInstance";

const getAllCustomerDetails = async () => {
  try {
    const response = await apiInstance.get(`/accounts/api/fetchallCustomerDetails`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const deleteAccount = async (mobileNumber) => {
  try {
    const response = await apiInstance.delete(`/accounts/api/delete?mobileNumber=${mobileNumber}`);
    return response.data;
  } catch (err) {
    return err.response;
  }
};

const createAccount = async (account) => {
  try {
    console.log("test");
    console.log(account);
    const response = await apiInstance.post(`/accounts/api/create`,account);
    return response.data;
  } catch (err) {
    return err.response;
  }
};


const userRequest = {
  getAllCustomerDetails,
  deleteAccount,
  createAccount
}

export default userRequest;