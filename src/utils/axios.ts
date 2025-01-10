import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { AppDispatch } from '../store/index';
import { resetAuth } from '../store/auth/AuthSlice';
import { toast } from 'react-toastify';
import { logout } from '../api/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const setupInterceptors = (navigate: NavigateFunction, dispatch: AppDispatch) => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Handle 401 Unauthorized Error
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        dispatch(resetAuth()); // Reset the auth state
        logout(); // Custom logout logic
        navigate('/login'); // Redirect to login page

        toast.error('Session expired, login again.');
        return Promise.reject(error);
      }

      // Handle other API errors
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Something went wrong';
        toast.error(errorMessage);
        return Promise.reject(error.response.data);
      }

      // Handle network errors
      if (!error.response) {
        toast.error('Network error, please try again later');
        return Promise.reject(error);
      }

      // Default case
      toast.error('Something went wrong');
      return Promise.reject(error);
    }
  );
};

export { api, setupInterceptors };
