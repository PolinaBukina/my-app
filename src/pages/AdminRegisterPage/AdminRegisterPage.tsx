// import React, { useState, useRef, KeyboardEvent } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './styles.module.css';
// import LogoIcon from '../../icons/LogoIcon';
// import { API_BASE_URL } from '../../types/api';

// interface RegisterUserData {
//     username: string;
//     password: string;
//     role: 'user' | 'admin';
// }

// const AdminRegisterPage = () => {
//     const [formData, setFormData] = useState<RegisterUserData & { confirmPassword: string }>({
//         username: '',
//         password: '',
//         confirmPassword: '',
//         role: 'user',
//     });
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
//     const [isLoading, setIsLoading] = useState(false);

//     const passwordRef = useRef<HTMLInputElement>(null);
//     const confirmPasswordRef = useRef<HTMLInputElement>(null);
//     const roleRef = useRef<HTMLInputElement>(null);
//     const navigate = useNavigate();

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value,
//         }));

//         if (validationErrors[name]) {
//             setValidationErrors(prev => {
//                 const newErrors = { ...prev };
//                 delete newErrors[name];
//                 return newErrors;
//             });
//         }
//     };

//     const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, field: 'username' | 'password' | 'confirmPassword') => {
//         if (e.key === 'Enter') {
//             if (field === 'username' && formData.username.trim()) {
//                 passwordRef.current?.focus();
//             } else if (field === 'password' && formData.password.trim()) {
//                 confirmPasswordRef.current?.focus();
//             } else if (field === 'confirmPassword' && formData.confirmPassword.trim()) {
//                 roleRef.current?.focus();
//             }
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError(null);

//         // Валидация
//         if (formData.password !== formData.confirmPassword) {
//             setError('Пароли не совпадают');
//             return;
//         }

//         if (formData.username.length < 3) {
//             setValidationErrors(prev => ({
//                 ...prev,
//                 username: 'Имя пользователя должно быть не менее 3 символов',
//             }));
//             return;
//         }

//         if (formData.password.length < 6) {
//             setValidationErrors(prev => ({
//                 ...prev,
//                 password: 'Пароль должен быть не менее 6 символов',
//             }));
//             return;
//         }

//         setIsLoading(true);

//         try {
//             const token = sessionStorage.getItem('token');
//             if (!token) {
//                 throw new Error('Токен авторизации не найден');
//             }

//             const response = await fetch(`${API_BASE_URL}/admin/create`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                     'Accept': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     username: formData.username,
//                     password: formData.password,
//                     role: formData.role
//                 })
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Ошибка при регистрации пользователя');
//             }

//             navigate('/admin/users', {
//                 state: {
//                     registrationSuccess: true,
//                     newUser: formData.username
//                 }
//             });

//         } catch (err) {
//             console.error('Registration error:', err);
//             setError(
//                 err instanceof Error ?
//                     err.message :
//                     'Произошла неизвестная ошибка при регистрации'
//             );
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className={styles.page}>
//             <div className={styles.left}>
//                 <div className={styles.logoWrapper}>
//                     <div className={styles.logoSvg}>
//                         <LogoIcon />
//                     </div>
//                     <div className={styles.logoTitle}>KD-systems</div>
//                     <div className={styles.logoSubtitle}>Knowledge Development</div>
//                 </div>
//             </div>

//             <div className={styles.right}>
//                 <form onSubmit={handleSubmit} className={styles.formContainer}>
//                     <div className={styles.formTitle}>Регистрация нового пользователя</div>

//                     {error && <div className={styles.error}>{error}</div>}

//                     <div className={styles.inputGroup}>
//                         <label htmlFor="username" className={styles.label}>Имя пользователя</label>
//                         <div className={styles.inputWrapper}>
//                             <div className={styles.icon}>
//                                 <svg fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                                 </svg>
//                             </div>
//                             <input
//                                 id="username"
//                                 type="text"
//                                 name="username"
//                                 value={formData.username}
//                                 onChange={handleChange}
//                                 onKeyDown={(e) => handleKeyDown(e, 'username')}
//                                 className={`${styles.input} ${validationErrors.username ? styles.inputError : ''}`}
//                                 placeholder="username"
//                                 required
//                                 autoFocus
//                                 disabled={isLoading}
//                             />
//                         </div>
//                         {validationErrors.username && (
//                             <div className={styles.validationError}>{validationErrors.username}</div>
//                         )}
//                     </div>

//                     <div className={styles.inputGroup}>
//                         <label htmlFor="password" className={styles.label}>Пароль</label>
//                         <div className={styles.inputWrapper}>
//                             <div className={styles.icon}>
//                                 <svg fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                                 </svg>
//                             </div>
//                             <input
//                                 id="password"
//                                 ref={passwordRef}
//                                 type={showPassword ? "text" : "password"}
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 onKeyDown={(e) => handleKeyDown(e, 'password')}
//                                 className={`${styles.input} ${validationErrors.password ? styles.inputError : ''}`}
//                                 placeholder="••••••••"
//                                 required
//                                 disabled={isLoading}
//                             />
//                             <button
//                                 type="button"
//                                 className={styles.passwordToggle}
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 disabled={isLoading}
//                             >
//                                 {showPassword ? (
//                                     <svg fill="currentColor" viewBox="0 0 20 20">
//                                         <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                                         <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
//                                     </svg>
//                                 ) : (
//                                     <svg fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
//                                         <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
//                                     </svg>
//                                 )}
//                             </button>
//                         </div>
//                         {validationErrors.password && (
//                             <div className={styles.validationError}>{validationErrors.password}</div>
//                         )}
//                     </div>

//                     <div className={styles.inputGroup}>
//                         <label htmlFor="confirmPassword" className={styles.label}>Подтвердите пароль</label>
//                         <div className={styles.inputWrapper}>
//                             <div className={styles.icon}>
//                                 <svg fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                                 </svg>
//                             </div>
//                             <input
//                                 id="confirmPassword"
//                                 ref={confirmPasswordRef}
//                                 type={showConfirmPassword ? "text" : "password"}
//                                 name="confirmPassword"
//                                 value={formData.confirmPassword}
//                                 onChange={handleChange}
//                                 onKeyDown={(e) => handleKeyDown(e, 'confirmPassword')}
//                                 className={styles.input}
//                                 placeholder="••••••••"
//                                 required
//                                 disabled={isLoading}
//                             />
//                             <button
//                                 type="button"
//                                 className={styles.passwordToggle}
//                                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                 disabled={isLoading}
//                             >
//                                 {showConfirmPassword ? (
//                                     <svg fill="currentColor" viewBox="0 0 20 20">
//                                         <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                                         <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
//                                     </svg>
//                                 ) : (
//                                     <svg fill="currentColor" viewBox="0 0 20 20">
//                                         <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
//                                         <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
//                                     </svg>
//                                 )}
//                             </button>
//                         </div>
//                     </div>

//                     <div className={styles.checkboxGroup}>
//                         <label className={styles.checkbox}>
//                             <input
//                                 ref={roleRef}
//                                 type="checkbox"
//                                 checked={formData.role === 'admin'}
//                                 onChange={() => setFormData(prev => ({
//                                     ...prev,
//                                     role: prev.role === 'user' ? 'admin' : 'user'
//                                 }))}
//                                 disabled={isLoading}
//                             />
//                             <span>Зарегистрировать как администратора</span>
//                         </label>
//                     </div>

//                     <button
//                         type="submit"
//                         className={styles.button}
//                         disabled={isLoading}
//                     >
//                         {isLoading ? (
//                             <>
//                                 <span className={styles.spinner}></span>
//                                 Регистрация...
//                             </>
//                         ) : 'Зарегистрировать'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AdminRegisterPage;


import React, { useState, useRef, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, ChevronRight, Globe, LogOut, User, Users, ArrowLeft } from 'lucide-react';
import styles from './styles.module.css';
import { useAuth } from '../../helpers/authContext';
import { API_BASE_URL } from '../../types/api';

interface RegisterUserData {
    username: string;
    password: string;
    role: 'user' | 'admin';
}

const AdminRegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<RegisterUserData & { confirmPassword: string }>({
        username: '',
        password: '',
        confirmPassword: '',
        role: 'user',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { state, logout } = useAuth();
    const username = state.user?.username || sessionStorage.getItem('username') || 'Пользователь';
    const isAdmin = sessionStorage.getItem('role') === 'admin';

    const toggleMenu = () => {
        setIsMenuCollapsed(!isMenuCollapsed);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (validationErrors[name]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, field: 'username' | 'password' | 'confirmPassword') => {
        if (e.key === 'Enter') {
            if (field === 'username' && formData.username.trim()) {
                passwordRef.current?.focus();
            } else if (field === 'password' && formData.password.trim()) {
                confirmPasswordRef.current?.focus();
            } else if (field === 'confirmPassword' && formData.confirmPassword.trim()) {
                roleRef.current?.focus();
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        if (formData.username.length < 3) {
            setValidationErrors(prev => ({
                ...prev,
                username: 'Имя пользователя должно быть не менее 3 символов',
            }));
            return;
        }

        if (formData.password.length < 6) {
            setValidationErrors(prev => ({
                ...prev,
                password: 'Пароль должен быть не менее 6 символов',
            }));
            return;
        }

        setIsLoading(true);

        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error('Токен авторизации не найден');
            }

            const response = await fetch(`${API_BASE_URL}/admin/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    role: formData.role
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка при регистрации пользователя');
            }

            navigate('/dashboard/users', {
                state: {
                    registrationSuccess: true,
                    newUser: formData.username
                }
            });

        } catch (err) {
            console.error('Registration error:', err);
            setError(
                err instanceof Error ?
                    err.message :
                    'Произошла неизвестная ошибка при регистрации'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = (): void => {
        logout();
        navigate('/');
    };

    return (
        <div className={styles.container}>
            {/* Боковое меню */}
            <div className={`${styles.sideMenu} ${isMenuCollapsed ? styles.collapsed : ''}`}>
                <div className={styles.sideMenuHeader}>
                    <div className={styles.logoContainer}>
                        <svg width="40" height="65" viewBox="0 0 153 173" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7 63.5428C10.866 63.5428 14 66.6769 14 70.5428V102.314C14 106.18 10.866 109.314 7 109.314C3.13401 109.314 0 106.18 0 102.314V70.5428C0 66.6769 3.13401 63.5428 7 63.5428Z" fill="url(#paint0_linear_1_473)" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M118.2 63.5428C122.066 63.5428 125.2 66.6769 125.2 70.5428V102.314C125.2 106.18 122.066 109.314 118.2 109.314C114.334 109.314 111.2 106.18 111.2 102.314V70.5428C111.2 66.6769 114.334 63.5428 118.2 63.5428Z" fill="url(#paint1_linear_1_473)" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M90.3999 23.8286C94.2659 23.8286 97.3999 26.9626 97.3999 30.8286V138.057C97.3999 141.923 94.2659 145.057 90.3999 145.057C86.5339 145.057 83.3999 141.923 83.3999 138.057V30.8286C83.3999 26.9626 86.5339 23.8286 90.3999 23.8286Z" fill="url(#paint2_linear_1_473)" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M62.6001 0C66.4661 0 69.6001 3.13401 69.6001 7V165.857C69.6001 169.723 66.4661 172.857 62.6001 172.857C58.7341 172.857 55.6001 169.723 55.6001 165.857V7C55.6001 3.13401 58.7341 0 62.6001 0Z" fill="url(#paint3_linear_1_473)" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M34.7998 47.6571C38.6658 47.6571 41.7998 50.7911 41.7998 54.6571V118.2C41.7998 122.066 38.6658 125.2 34.7998 125.2C30.9338 125.2 27.7998 122.066 27.7998 118.2V54.6571C27.7998 50.7911 30.9338 47.6571 34.7998 47.6571Z" fill="url(#paint4_linear_1_473)" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M146 77.4429C149.866 77.4429 153 80.5769 153 84.4429V86.4286C153 90.2946 149.866 93.4286 146 93.4286C142.134 93.4286 139 90.2946 139 86.4286V84.4429C139 80.5769 142.134 77.4429 146 77.4429Z" fill="url(#paint5_linear_1_473)" />
                            <defs>
                                <linearGradient id="paint0_linear_1_473" x1="14" y1="84.8558" x2="-5.40286e-10" y2="84.8558" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.005" stopColor="#2E4F41" />
                                    <stop offset="1" stopColor="#2AAD6B" />
                                </linearGradient>
                                <linearGradient id="paint1_linear_1_473" x1="125.2" y1="84.8558" x2="111.2" y2="84.8558" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.005" stopColor="#2E4F41" />
                                    <stop offset="1" stopColor="#2AAD6B" />
                                </linearGradient>
                                <linearGradient id="paint2_linear_1_473" x1="97.3999" y1="80.2774" x2="83.3999" y2="80.2774" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.005" stopColor="#2E4F41" />
                                    <stop offset="1" stopColor="#2AAD6B" />
                                </linearGradient>
                                <linearGradient id="paint3_linear_1_473" x1="69.6001" y1="80.489" x2="55.6001" y2="80.489" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.005" stopColor="#2E4F41" />
                                    <stop offset="1" stopColor="#2AAD6B" />
                                </linearGradient>
                                <linearGradient id="paint4_linear_1_473" x1="41.7998" y1="83.7641" x2="27.7998" y2="83.7641" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.005" stopColor="#2E4F41" />
                                    <stop offset="1" stopColor="#2AAD6B" />
                                </linearGradient>
                                <linearGradient id="paint5_linear_1_473" x1="153" y1="84.8864" x2="139" y2="84.8864" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.005" stopColor="#2E4F41" />
                                    <stop offset="1" stopColor="#2AAD6B" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span className={styles.logoText}>KD-systems</span>
                    </div>
                    <button className={styles.menuToggle} onClick={toggleMenu}>
                        {isMenuCollapsed ? <ChevronRight size={20} /> : <ChevronRight size={20} className={styles.rotate180} />}
                    </button>
                </div>

                <div className={styles.sideMenuContent}>
                    <nav className={styles.sideMenuNav}>
                        <button className={styles.sideMenuItem} onClick={() => { navigate('/dashboard') }}>
                            <ArrowLeft className="h-5 w-5" />
                            <span>Назад к проектам</span>
                        </button>
                        <button className={styles.sideMenuItem} onClick={() => navigate('/dashboard')}>
                            <Database className="h-5 w-5" />
                            <span>Мои проекты</span>
                        </button>
                        <button className={styles.sideMenuItem}>
                            <User className="h-5 w-5" />
                            <span>Настройки профиля</span>
                        </button>
                        <button className={styles.sideMenuItem}>
                            <Globe className="h-5 w-5" />
                            <span>Помощь</span>
                        </button>
                        {/* Кнопка "Пользователи" только для админов */}
                        {/* {isAdmin && ( */}
                        <button
                            className={`${styles.sideMenuItem} ${styles.active}`}
                            onClick={() => navigate('/dashboard/users')}
                        >
                            <Users className="h-5 w-5" />
                            <span>Пользователи</span>
                        </button>
                        {/* )} */}
                        {/* Кнопка "Зарегистрировать" только для админов */}
                        {/* {isAdmin && ( */}
                        <button
                            className={`${styles.sideMenuItem} ${styles.active}`}
                            onClick={() => navigate('/dashboard/register')}
                        >
                            <Globe className="h-5 w-5" />
                            <span>Зарегистрировать</span>
                        </button>
                        {/* )} */}
                    </nav>
                </div>

                <div className={styles.sideMenuFooter}>
                    <div className={styles.userInfoSidebar}>
                        <User className="h-5 w-5" />
                        <span className={styles.username}>{username}</span>
                    </div>
                    <button onClick={handleLogout} className={styles.logoutButtonFull}>
                        <LogOut className="h-5 w-5" />
                        <span>Выйти</span>
                    </button>
                </div>
            </div>

            {/* Основной контент с верхней панелью */}
            <div className={styles.mainContent}>
                {/* Верхняя панель навигации */}
                <nav className={styles.navbar}>
                    <div className={styles.navContainer}>
                        <div className={styles.navContent}>
                            <div className={styles.logoContainer}>
                                <h2 className={styles.projectsTitle}>Регистрация нового пользователя</h2>
                            </div>

                            <div className={styles.navActions}>
                                <div className={styles.userInfoNav}>
                                    <User className="h-5 w-5 mr-2" />
                                    <span className={styles.username}>{username}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className={styles.logoutButton}
                                >
                                    <LogOut className="h-5 w-5 mr-1" />
                                    <span>Выйти</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Основное содержимое - форма регистрации */}
                <main className={styles.mainContainer}>
                    <div className={styles.formContainer}>
                        <form onSubmit={handleSubmit} className={styles.registerForm}>
                            {error && <div className={styles.error}>{error}</div>}

                            <div className={styles.inputGroup}>
                                <label htmlFor="username" className={styles.label}>Имя пользователя</label>
                                <div className={styles.inputWrapper}>
                                    <div className={styles.icon}>
                                        <svg fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        id="username"
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        onKeyDown={(e) => handleKeyDown(e, 'username')}
                                        className={`${styles.input} ${validationErrors.username ? styles.inputError : ''}`}
                                        placeholder="username"
                                        required
                                        autoFocus
                                        disabled={isLoading}
                                    />
                                </div>
                                {validationErrors.username && (
                                    <div className={styles.validationError}>{validationErrors.username}</div>
                                )}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="password" className={styles.label}>Пароль</label>
                                <div className={styles.inputWrapper}>
                                    <div className={styles.icon}>
                                        <svg fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        id="password"
                                        ref={passwordRef}
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onKeyDown={(e) => handleKeyDown(e, 'password')}
                                        className={`${styles.input} ${validationErrors.password ? styles.inputError : ''}`}
                                        placeholder="••••••••"
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className={styles.passwordToggle}
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isLoading}
                                    >
                                        {showPassword ? (
                                            <svg fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {validationErrors.password && (
                                    <div className={styles.validationError}>{validationErrors.password}</div>
                                )}
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="confirmPassword" className={styles.label}>Подтвердите пароль</label>
                                <div className={styles.inputWrapper}>
                                    <div className={styles.icon}>
                                        <svg fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        ref={confirmPasswordRef}
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        onKeyDown={(e) => handleKeyDown(e, 'confirmPassword')}
                                        className={styles.input}
                                        placeholder="••••••••"
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className={styles.passwordToggle}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={isLoading}
                                    >
                                        {showConfirmPassword ? (
                                            <svg fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className={styles.checkboxGroup}>
                                <label className={styles.checkbox}>
                                    <input
                                        ref={roleRef}
                                        type="checkbox"
                                        checked={formData.role === 'admin'}
                                        onChange={() => setFormData(prev => ({
                                            ...prev,
                                            role: prev.role === 'user' ? 'admin' : 'user'
                                        }))}
                                        disabled={isLoading}
                                    />
                                    <span>Зарегистрировать как администратора</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className={styles.button}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className={styles.spinner}></span>
                                        Регистрация...
                                    </>
                                ) : 'Зарегистрировать'}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminRegisterPage;