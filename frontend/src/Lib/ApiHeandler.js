import axios from 'axios';


// Create an Axios instance with base configuration
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    },
});

const authToken = localStorage.getItem('authToken');

// Signup API call
export const signup = async (userData) => {
    try {
        const response = await api.post('/auth/signup', userData);
        return response.data;
    } catch (error) {
        console.log("Error in SignUp user:", error);
        return error;
    }
};

// Login API call
export const login = async (userData) => {
    try {
        const response = await api.post('/auth/login', userData);
        console.log(response.data);
        localStorage.setItem('authToken', response.data.authToken);
        return response.data;
    } catch (error) {
        console.log("Error in Login user:", error);
        return error;
    }
};


// save form 

export const saveForm = async (data) => {
    try {
        const response = await api.post('/forms/save', { form_name: data.form_name, form_data: data.form_data, authToken: authToken });
        return response.data;
    } catch (error) {
        console.log("Error in save form:", error);
        return error;
    }
};

export default api;