import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Company API
export const fetchCompanies = () => API.get('/companies');
export const createCompany = (company) => API.post('/companies', company);
export const updateCompany = (id, company) => API.put(`/companies/${id}`, company);
export const deleteCompany = (id) => API.delete(`/companies/${id}`);

// Communication API
export const logCommunication = (data) => API.post('/communications', data);
export const fetchCommunications = () => API.get('/communications');
