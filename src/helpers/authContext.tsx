// import { createContext, ReactNode, useContext, useReducer, useEffect } from 'react';

// type AuthState = {
//     isAuthenticated: boolean;
//     isAdmin: boolean;
//     username?: string;
//     token?: string;
// }

// type AuthAction = {
//     type: 'LOGIN' | 'LOGOUT';
//     payload?: {
//         username?: string;
//         token?: string;
//         isAdmin?: boolean;
//     }
// }

// type AuthContextType = {
//     state: AuthState;
//     login: (username: string, token: string, isAdmin: boolean, rememberMe: boolean) => void;
//     logout: () => void;
//     initializeAuth: () => void;
// }

// const authInitState: AuthState = {
//     isAuthenticated: false,
//     isAdmin: false
// }

// export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// type ProviderProps = {
//     children: ReactNode
// }

// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//     switch (action.type) {
//         case 'LOGIN':
//             return {
//                 isAuthenticated: true,
//                 isAdmin: action.payload?.isAdmin || false,
//                 username: action.payload?.username,
//                 token: action.payload?.token
//             };
//         case 'LOGOUT':
//             return authInitState;
//         default:
//             return state
//     }
// }

// export const AuthContextProvider = ({ children }: ProviderProps) => {
//     const [state, dispatch] = useReducer(authReducer, authInitState);

//     const initializeAuth = () => {
//         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//         if (token) {
//             try {
//                 const payload = JSON.parse(atob(token.split('.')[1]));
//                 dispatch({
//                     type: 'LOGIN',
//                     payload: {
//                         username: payload.username,
//                         token,
//                         isAdmin: payload.isAdmin // Добавляем isAdmin из токена
//                     }
//                 });
//             } catch (e) {
//                 localStorage.removeItem('token');
//                 sessionStorage.removeItem('token');
//             }
//         }
//     };

//     useEffect(() => {
//         initializeAuth();
//     }, []);

//     const login = (username: string, token: string, isAdmin: boolean, rememberMe: boolean) => {
//         if (rememberMe) {
//             localStorage.setItem('token', token);
//         } else {
//             sessionStorage.setItem('token', token);
//         }

//         dispatch({
//             type: 'LOGIN',
//             payload: {
//                 username,
//                 token,
//                 isAdmin
//             }
//         });
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         sessionStorage.removeItem('token');
//         dispatch({ type: 'LOGOUT' });
//     };

//     const value = {
//         state,
//         login,
//         logout,
//         initializeAuth
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuthContext = () => {
//     return useContext(AuthContext);
// };


import { createContext, ReactNode, useContext, useReducer, useEffect } from 'react';

// Тип для состояния аутентификации
type AuthState = {
    isAuthenticated: boolean;
    isAdmin: boolean;
    username?: string;
    token?: string;
    user?: {  // Добавлен объект пользователя для более структурированного хранения данных
        username?: string;
        isAdmin?: boolean;
    };
}

// Тип для действий аутентификации
type AuthAction = {
    type: 'LOGIN' | 'LOGOUT';
    payload?: {
        username?: string;
        token?: string;
        isAdmin?: boolean;
    }
}

// Тип для контекста аутентификации
type AuthContextType = {
    state: AuthState;
    login: (username: string, token: string, isAdmin: boolean, rememberMe: boolean) => void;
    logout: () => void;
    initializeAuth: () => void;
}

// Начальное состояние аутентификации
const authInitState: AuthState = {
    isAuthenticated: false,
    isAdmin: false,
    user: {} // Инициализируем объект пользователя
}

// Создаем контекст
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Пропсы для провайдера
type ProviderProps = {
    children: ReactNode
}

// Редуктор для управления состоянием аутентификации
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                isAdmin: action.payload?.isAdmin || false,
                username: action.payload?.username, // Сохраняем для обратной совместимости
                token: action.payload?.token,
                user: {  // Сохраняем данные пользователя в структурированном виде
                    username: action.payload?.username,
                    isAdmin: action.payload?.isAdmin
                }
            };
        case 'LOGOUT':
            return authInitState;
        default:
            return state;
    }
}

// Провайдер контекста аутентификации
export const AuthContextProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, authInitState);

    // Инициализация аутентификации при загрузке приложения
    const initializeAuth = () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        username: payload.username,
                        token,
                        isAdmin: payload.isAdmin
                    }
                });
            } catch (e) {
                // Если токен поврежден, очищаем хранилище
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
            }
        }
    };

    // При монтировании компонента инициализируем аутентификацию
    useEffect(() => {
        initializeAuth();
    }, []);

    // Функция входа в систему
    const login = (username: string, token: string, isAdmin: boolean, rememberMe: boolean) => {
        if (rememberMe) {
            localStorage.setItem('token', token);
        } else {
            sessionStorage.setItem('token', token);
        }

        dispatch({
            type: 'LOGIN',
            payload: {
                username,
                token,
                isAdmin
            }
        });
    };

    // Функция выхода из системы
    const logout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    };

    // Значение контекста
    const value = {
        state,
        login,
        logout,
        initializeAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для удобного использования контекста
export const useAuthContext = () => {
    return useContext(AuthContext);
};