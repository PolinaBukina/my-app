// Тип для данных регистрации
export interface RegisterUserData {
    username: string;
    password: string;
    role?: 'user' | 'admin'; // Опционально, по умолчанию 'user'
}

// Тип ответа от сервера при успешной регистрации
export interface UserResponse {
    id: string;
    username: string;
    role: string;
    is_active: boolean;
}

// Тип для ошибок валидации
export interface ValidationError {
    detail: Array<{
        loc: (string | number)[];
        msg: string;
        type: string;
    }>;
}

// Тип для ошибки API
export type ApiError = {
    status: number;
    message: string;
    errors?: ValidationError['detail'];
};