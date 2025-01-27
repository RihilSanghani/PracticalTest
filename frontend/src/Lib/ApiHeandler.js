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
        await localStorage.setItem('authToken', response.data.authToken);
        return response.data.authToken;
    } catch (error) {
        console.log("Error in SignUp user:", error);
        return error;
    }
};

// Login API call
export const login = async (userData) => {
    try {
        const response = await api.post('/auth/login', userData);
        await localStorage.setItem('authToken', response.data.authToken);
        return response.data.authToken;
    } catch (error) {
        console.log("Error in Login user:", error);
        return error;
    }
};


// save form 

export const saveForm = async (data) => {
    try {
        const response = await api.post('/forms/save', { form_name: data.form_name, form_data: data.form_data, authToken: authToken });
        return response.data.id;
    } catch (error) {
        console.log("Error in save form:", error);
        return error;
    }
};

// get all the form

export const getAllForms = async () => {
    try {
        const response = await api.post('/forms/list', { authToken });
        return response.data;
    } catch (error) {
        console.log("Error in get all forms:", error);
        return error;
    }
};


// get form by id

export const getFormById = async (id) => {
    try {
        const response = await api.post(`/forms/${id}`, { authToken });
        return response.data;
    } catch (error) {
        console.log("Error in get form by id:", error);
        return error;
    }
};

// update form

export const updateForm = async (id, data) => {
    console.log(data);
    try {
        const response = await api.patch(`/forms/update/${id}`, { form_name: data.form_name, form_data: data.form_data, authToken });
        return response.data;
    } catch (error) {
        console.log("Error in axios update form:", error);
        return error;
    }
};

export default api;