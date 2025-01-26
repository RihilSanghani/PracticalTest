import axios from 'axios';


// Create an Axios instance with base configuration
const api = axios.create({
    baseURL: 'http://localhost:8080/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Signup API call
export const signup = async (userData) => {
    try {
        const response = await api.post('/signup', userData);
        return response.data;
    } catch (error) {
        console.log("Error in SignUp user:", error);
        return error;
    }
};

// Login API call
export const login = async (userData) => {
    try {
        const response = await api.post('/login', userData);
        return response.data;
    } catch (error) {
        console.log("Error in Login user:", error);
        return error;
    }
};

export default api;