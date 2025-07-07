import { createContext, ReactNode, useContext, useReducer, useEffect, useCallback } from 'react';

// Типы
type User = {
    id: string;
    username: string;
    role: 'user' | 'admin';
    email?: string;
};

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    isLoading: boolean;
};

type AuthAction =
    | { type: 'LOGIN'; payload: { user: User; token: string } }
    | { type: 'LOGOUT' }
    | { type: 'INITIALIZE'; payload: { user: User | null; token: string | null } };

type AuthContextType = {
    state: AuthState;
    login: (username: string, token: string, role: string, rememberMe: boolean) => Promise<void>;
    logout: () => void;
    register: (userData: { username: string; password: string; role: 'user' | 'admin' }) => Promise<void>;
};

// Контекст
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Начальное состояние
const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: true,
};

// Редуктор
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'INITIALIZE':
            return {
                ...state,
                isAuthenticated: !!action.payload.user,
                user: action.payload.user,
                token: action.payload.token,
                isLoading: false,
            };
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
            };
        default:
            return state;
    }
};

// Провайдер
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Инициализация аутентификации
    const initializeAuth = useCallback(async () => {
        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            if (token) {
                // Здесь должна быть проверка токена на сервере или его валидация
                // Для примера просто декодируем JWT (в реальном приложении нужно проверять на сервере!)
                const payload = JSON.parse(atob(token.split('.')[1]));

                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        user: {
                            id: payload.sub,
                            username: payload.username,
                            role: payload.role,
                            email: payload.email,
                        },
                        token,
                    },
                });
            } else {
                dispatch({ type: 'INITIALIZE', payload: { user: null, token: null } });
            }
        } catch (error) {
            console.error('Auth initialization error:', error);
            dispatch({ type: 'INITIALIZE', payload: { user: null, token: null } });
        }
    }, []);

    // Вход в систему
    const login = async (username: string, access_token: string, role: string, rememberMe: boolean) => {
        try {
            // Декодируем токен для получения данных пользователя
            const payload = JSON.parse(atob(access_token.split('.')[1]));

            const user = {
                id: payload.sub,
                username: payload.username || username,
                role: payload.role || 'user'
            };

            // Выбираем способ хранения
            if (rememberMe) {
                localStorage.setItem('token', access_token);
                localStorage.setItem('username', username);
                localStorage.setItem('role', role);
            } else {
                sessionStorage.setItem('token', access_token);
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('role', role);
            }

            dispatch({ type: 'LOGIN', payload: { user, token: access_token } });
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    // Выход из системы
    const logout = () => {
        // Очищаем все возможные хранилища
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('username');
        sessionStorage.removeItem('username');
        localStorage.removeItem('role');
        sessionStorage.removeItem('role');
        dispatch({ type: 'LOGOUT' });
    };

    // Регистрация (только для админов)
    const register = useCallback(async (userData: { username: string; password: string; role: 'user' | 'admin' }) => {
        try {
            const response = await fetch('/api/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.token}`,
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) throw new Error('Registration failed');

            return await response.json();
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }, [state.token]);


    // Инициализация при монтировании
    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    const value = {
        state,
        login,
        logout,
        register,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для использования контекста
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Хелперы для роутов
export const useAuthCheck = () => {
    const { state } = useAuth();
    return {
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.user?.role === 'admin',
        user: state.user,
        isLoading: state.isLoading,
    };
};