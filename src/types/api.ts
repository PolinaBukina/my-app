import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiError, RegisterUserData, UserResponse, ValidationError } from './registration';

export const API_BASE_URL = 'http://158.160.153.2:8200';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Функция для обработки ошибок
const handleApiError = (error: AxiosError): ApiError => {
    if (error.response) {
        // Ошибка валидации (422)
        if (error.response.status === 422) {
            const data = error.response.data as ValidationError;
            return {
                status: error.response.status,
                message: 'Validation error',
                errors: data.detail,
            };
        }

        // Другие ошибки
        return {
            status: error.response.status,
            message: (error.response.data as any)?.detail || error.message,
        };
    }

    // Ошибка сети и т.д.
    return {
        status: 0,
        message: error.message,
    };
};

// Регистрация пользователя
export const registerUser = async (
    userData: RegisterUserData
): Promise<UserResponse> => {
    try {
        const response: AxiosResponse<UserResponse> = await api.post('/admin/create', {
            username: userData.username,
            password: userData.password,
            role: userData.role || 'user',
        });
        return response.data;
    } catch (error) {
        throw handleApiError(error as AxiosError);
    }
};

export default api;