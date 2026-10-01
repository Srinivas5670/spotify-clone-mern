import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === "ECONNABORTED") {
            console.error("API request timed out");
        } else if (!error.response) {
            console.error("Unable to connect to the backend server");
        } else {
            console.error(
                `API request failed with status ${error.response.status}`
            );
        }

        return Promise.reject(error);
    }
);

export default api;