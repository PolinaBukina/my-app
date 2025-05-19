// import { createContext, ReactNode, useContext, useReducer } from 'react';

// type AuthState = {
//     isLogined: boolean
//     username?: string
//     initials?: string
// }

// type AuthAction = {
//     type: string
//     username?: string
//     initials?: string
// }

// type AuthContextType = {
//     state: AuthState
//     login: (username: string, initials: string) => void
//     logout: () => void
// }

// const authInitState: AuthState = {
//     isLogined: false
// }

// export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// type ProviderProps = {
//     children: ReactNode
// }

// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//     switch (action.type) {
//         case 'login':
//             return {
//                 isLogined: true,
//                 username: action.username,
//                 initials: action.initials
//             }
//         case 'logout':
//             return authInitState;
//         default:
//             return state
//     }
// }

// export const AuthContextProvider = ({ children }: ProviderProps) => {
//     const [state, dispatch] = useReducer(authReducer, authInitState);

//     const login = (username: string, initials: string) => dispatch({
//         type: 'login',
//         username,
//         initials
//     });

//     const logout = () => dispatch({
//         type: 'logout'
//     });

//     const value = {
//         state,
//         login,
//         logout
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




// import { createContext, ReactNode, useContext, useReducer, useEffect } from 'react';

// type AuthState = {
//     isAuthenticated: boolean;
//     username?: string;
//     token?: string;
// }

// type AuthAction = {
//     type: 'LOGIN' | 'LOGOUT';
//     payload?: {
//         username?: string;
//         token?: string;
//     }
// }

// type AuthContextType = {
//     state: AuthState;
//     login: (username: string, token: string, rememberMe: boolean) => void;
//     logout: () => void;
//     initializeAuth: () => void;
// }

// const authInitState: AuthState = {
//     isAuthenticated: false
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
//                 username: action.payload?.username,
//                 token: action.payload?.token
//             }
//         case 'LOGOUT':
//             return authInitState;
//         default:
//             return state
//     }
// }

// export const AuthContextProvider = ({ children }: ProviderProps) => {
//     const [state, dispatch] = useReducer(authReducer, authInitState);

//     // Инициализация авторизации при загрузке приложения
//     const initializeAuth = () => {
//         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//         if (token) {
//             try {
//                 // Декодируем JWT для получения данных пользователя
//                 const payload = JSON.parse(atob(token.split('.')[1]));
//                 dispatch({
//                     type: 'LOGIN',
//                     payload: {
//                         username: payload.username,
//                         token
//                     }
//                 });
//             } catch (e) {
//                 // Если токен невалидный - очищаем хранилище
//                 localStorage.removeItem('token');
//                 sessionStorage.removeItem('token');
//             }
//         }
//     };

//     useEffect(() => {
//         initializeAuth();
//     }, []);

//     const login = (username: string, token: string, rememberMe: boolean) => {
//         if (rememberMe) {
//             localStorage.setItem('token', token);
//         } else {
//             sessionStorage.setItem('token', token);
//         }

//         dispatch({
//             type: 'LOGIN',
//             payload: {
//                 username,
//                 token
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

type AuthState = {
    isAuthenticated: boolean;
    isAdmin: boolean;
    username?: string;
    token?: string;
}

type AuthAction = {
    type: 'LOGIN' | 'LOGOUT';
    payload?: {
        username?: string;
        token?: string;
        isAdmin?: boolean;
    }
}

type AuthContextType = {
    state: AuthState;
    login: (username: string, token: string, isAdmin: boolean, rememberMe: boolean) => void;
    logout: () => void;
    initializeAuth: () => void;
}

const authInitState: AuthState = {
    isAuthenticated: false,
    isAdmin: false
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type ProviderProps = {
    children: ReactNode
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isAuthenticated: true,
                isAdmin: action.payload?.isAdmin || false,
                username: action.payload?.username,
                token: action.payload?.token
            };
        case 'LOGOUT':
            return authInitState;
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, authInitState);

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
                        isAdmin: payload.isAdmin // Добавляем isAdmin из токена
                    }
                });
            } catch (e) {
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
            }
        }
    };

    useEffect(() => {
        initializeAuth();
    }, []);

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

    const logout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    };

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

export const useAuthContext = () => {
    return useContext(AuthContext);
};