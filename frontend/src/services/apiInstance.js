import axios from "axios";

const apiInstance = axios.create({
 // baseURL: "https://azuremcdev.employee-mgmt.com/qncbank",
    baseURL: "http://localhost:8072/qncbank",
});


export default apiInstance;