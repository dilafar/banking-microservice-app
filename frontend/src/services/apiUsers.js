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


const userRequest = {
  getAllCustomerDetails
}

export default userRequest;