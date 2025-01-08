import axios from "axios";
import constants from "../utils/config/config";
import { toast } from "react-hot-toast";
import services from "../utils/config/services";

const apiInstance = axios.create({
  baseURL: services.baseURL,
  timeout: 50000,
});

apiInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem(constants.localStorage.userToken);
    const adminToken = localStorage.getItem(constants.localStorage.adminToken);
    if (userToken) {
      config.headers[constants.localStorage.authToken] = `Bearer ${userToken}`;
    } else if (adminToken) {
      config.headers[constants.localStorage.authToken] = `Bearer ${adminToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message, {
          toastId: constants.constantsErrors.toastId,
        });
      } else if (error.response.status === 500) {
        toast.error(error.response.data.message, {
          toastId: constants.constantsErrors.toastId,
        });
      } else if (error.response.status === 409) {
        toast.error(error.response.data.message, {
          toastId: constants.constantsErrors.toastId,
        });
      } else if (error.response.status === 404) {
        toast.error(error.response.data.message, {
          toastId: constants.constantsErrors.toastId,
        });
      } else if (error.response.status === 401) {
        toast.error(error.response.data.message, {
          toastId: constants.constantsErrors.toastId, 
        });
        localStorage.clear();
        window.open("/#" + constants.navigationLink.loginLink, "_self")    
      }
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  }
);

const registerAdmin = async (body) => {
  try {
    const response = await apiInstance.post(constants.apiName.signupAdmin, body);
    return response.data ? response.data : response;
  } catch (error) {
    return error.data ? error.data : error;
  }
};

const loginAdmin = async (body) => {
  try {
    const response = await apiInstance.post(constants.apiName.loginAdmin, body);
    if (response.data && response.data.token) {
      localStorage.setItem(constants.localStorage.adminToken, response.data.token);
    }
    return response ? response.data : response;
  } catch (error) {
    return error.data ? error.data : error;
  }
};

const registerUser = async (body) => {
  try {
    const response = await apiInstance.post(constants.apiName.signupUser, body);
    return response.data ? response.data : response;
  } catch (error) {
    return error.data ? error.data : error;
  }
};

const loginUser = async (body) => {
  try {
    const response = await apiInstance.post(constants.apiName.loginUser, body);
    if (response.data && response.data.token) {
      localStorage.setItem(constants.localStorage.userToken, response.data.token);
    }
    return response.data ? response.data : response;
  } catch (error) {
    return error.data ? error.data : error;
  }
};

const logoutUser = async () => {
  try {
    const response = await apiInstance.post(constants.apiName.logout);
    localStorage.removeItem(constants.localStorage.userToken);
    localStorage.removeItem(constants.localStorage.adminToken);
    return response.data ? response.data : response;
  } catch (error) {
    return error.data ? error.data : error;
  }
};

const forgotPassword = async (body) => {
  try {
    const response = await apiInstance.post(constants.apiName.forgotPassword, body);
    return response.data ? response.data : response;
  } catch (error) {
    return error.data ? error.data : error;
  }
};

const getCompanies = async (params) => {
  try {
    const response = await apiInstance.get("/company/get", { params });
    return response ? response : response.data;
  } catch (error) {
    return error.data ? error.data : error;
  }
};

const createCompany = async (body) => {
  try {
    const response = await apiInstance.post("/company/add", body);
    return response.data ? response.data : response;
  } catch (error) {
    return error.data ? error.data : error;
  }
};

const updateCompany = async (id, body) => {
  try {
    const response = await apiInstance.put(`/company/update/${id}`, body);
    return response.data ? response.data : response;
  } catch (error) {
    return error.data ? error.data : error;
  }
};

const deleteCompany = async (id) => {
  try {
    const response = await apiInstance.delete(`/company/delete/${id}`);
    return response.data ? response.data : response;
  } catch (error) {
    return error.data ? error.data : error;
  }
};

const api = {
  registerAdmin,
  loginAdmin,
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany
};

export default api;