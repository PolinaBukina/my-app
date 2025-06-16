// import React, { useState } from 'react';
// import styles from './styles.module.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuthContext } from '../../helpers/authContext';

// const LoginPage = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [rememberMe, setRememberMe] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();

//     // const { login } = useAuthContext();
//     const { state, login, logout } = useAuthContext();

//     const handleSubmit = async () => {
//         // Сброс предыдущей ошибки
//         setError('');

//         // Валидация полей
//         if (!username || !password) {
//             setError('Пожалуйста, заполните все поля');
//             return;
//         }

//         // Проверка на админа (без обращения к бэкенду)
//         if (username === 'admin' && password === 'admin123') {
//             login('admin', 'admin-token', true, rememberMe);

//             if (rememberMe) {
//                 localStorage.setItem('token', 'admin-token');
//             } else {
//                 sessionStorage.setItem('token', 'admin-token');
//             }

//             navigate('/dashboard'); // Или '/dashboard' если у вас один маршрут
//             return;
//         }

//         setIsLoading(true);

//         try {
//             // Отправляем запрос к бэкенду
//             const response = await fetch('http://localhost:3000/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     username,
//                     password
//                 }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.error || 'Ошибка авторизации');
//             }

//             // Успешная авторизация
//             login(username, data.token, data.isAdmin, rememberMe);

//             // Сохраняем токен если выбрано "Запомнить меня"
//             if (rememberMe) {
//                 localStorage.setItem('token', data.token);
//             } else {
//                 sessionStorage.setItem('token', data.token);
//             }

//             navigate('/dashboard');

//         } catch (err: unknown) {
//             // Безопасное извлечение сообщения об ошибке
//             const errorMessage = err instanceof Error ? err.message : 'Неверное имя пользователя или пароль';
//             setError(errorMessage);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Остальной код компонента остается без изменений
//     return (
//         <div className={styles.page}>
//             {/* Логотип */}
//             <div className={styles.left}>
//                 <div className={styles.logoWrapper}>
//                     <div className={styles.logoSvg}>
//                         <svg viewBox="0 0 100 100" fill="none">
//                             <circle cx="50" cy="50" r="48" stroke="#2F855A" strokeWidth="4" fill="white" />
//                             <path d="M30 35H70M30 50H70M30 65H70" stroke="#2F855A" strokeWidth="4" strokeLinecap="round" />
//                             <path d="M35 28L45 72M55 28L65 72" stroke="#2F855A" strokeWidth="4" strokeLinecap="round" />
//                         </svg>
//                     </div>
//                     <div className={styles.logoTitle}>KD-systems</div>
//                     <div className={styles.logoSubtitle}>Knowledge Development</div>
//                 </div>
//             </div>

//             {/* Форма */}
//             <div className={styles.right}>
//                 <div className={styles.formContainer}>
//                     <div className={styles.formTitle}>Войдите в свою учетную запись</div>

//                     {/* Отображение ошибки */}
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
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 className={styles.input}
//                                 placeholder="username@company.com"
//                                 required
//                             />
//                         </div>
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
//                                 type={showPassword ? "text" : "password"}
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className={styles.input}
//                                 placeholder="••••••••"
//                                 required
//                             />
//                             <button
//                                 type="button"
//                                 className={styles.passwordToggle}
//                                 onClick={() => setShowPassword(!showPassword)}
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
//                     </div>

//                     <div className={styles.options}>
//                         <label className={styles.checkbox}>
//                             <input
//                                 type="checkbox"
//                                 checked={rememberMe}
//                                 onChange={(e) => setRememberMe(e.target.checked)}
//                             />
//                             Запомнить меня
//                         </label>
//                         <Link to='/forgotpassword' className={styles.link}>Забыли пароль?</Link>
//                     </div>

//                     <button
//                         onClick={handleSubmit}
//                         className={styles.button}
//                         disabled={isLoading}
//                     >
//                         {isLoading ? 'Вход...' : 'Войти'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;



import React, { useState, useRef, KeyboardEvent } from 'react';
import styles from './styles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../helpers/authContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const passwordRef = useRef<HTMLInputElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);

    const { state, login, logout } = useAuthContext();

    const handleSubmit = async () => {
        setError('');

        if (!username || !password) {
            setError('Пожалуйста, заполните все поля');
            return;
        }

        if (username === 'admin' && password === 'admin123') {
            login('admin', 'admin-token', true, rememberMe);

            if (rememberMe) {
                localStorage.setItem('token', 'admin-token');
            } else {
                sessionStorage.setItem('token', 'admin-token');
            }

            navigate('/dashboard');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка авторизации');
            }

            login(username, data.token, data.isAdmin, rememberMe);

            if (rememberMe) {
                localStorage.setItem('token', data.token);
            } else {
                sessionStorage.setItem('token', data.token);
            }

            navigate('/dashboard');

        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Неверное имя пользователя или пароль';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, field: 'username' | 'password') => {
        if (e.key === 'Enter') {
            if (field === 'username' && username.trim()) {
                passwordRef.current?.focus();
            } else if (field === 'password' && password.trim()) {
                handleSubmit();
            }
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.left}>
                <div className={styles.logoWrapper}>
                    <div className={styles.logoSvg}>
                        <svg width="90" height="105" viewBox="0 0 153 173" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M7 63.5428C10.866 63.5428 14 66.6769 14 70.5428V102.314C14 106.18 10.866 109.314 7 109.314C3.13401 109.314 0 106.18 0 102.314V70.5428C0 66.6769 3.13401 63.5428 7 63.5428Z" fill="url(#paint0_linear_1_473)" /> <path fillRule="evenodd" clipRule="evenodd" d="M118.2 63.5428C122.066 63.5428 125.2 66.6769 125.2 70.5428V102.314C125.2 106.18 122.066 109.314 118.2 109.314C114.334 109.314 111.2 106.18 111.2 102.314V70.5428C111.2 66.6769 114.334 63.5428 118.2 63.5428Z" fill="url(#paint1_linear_1_473)" /> <path fillRule="evenodd" clipRule="evenodd" d="M90.3999 23.8286C94.2659 23.8286 97.3999 26.9626 97.3999 30.8286V138.057C97.3999 141.923 94.2659 145.057 90.3999 145.057C86.5339 145.057 83.3999 141.923 83.3999 138.057V30.8286C83.3999 26.9626 86.5339 23.8286 90.3999 23.8286Z" fill="url(#paint2_linear_1_473)" /> <path fillRule="evenodd" clipRule="evenodd" d="M62.6001 0C66.4661 0 69.6001 3.13401 69.6001 7V165.857C69.6001 169.723 66.4661 172.857 62.6001 172.857C58.7341 172.857 55.6001 169.723 55.6001 165.857V7C55.6001 3.13401 58.7341 0 62.6001 0Z" fill="url(#paint3_linear_1_473)" /> <path fillRule="evenodd" clipRule="evenodd" d="M34.7998 47.6571C38.6658 47.6571 41.7998 50.7911 41.7998 54.6571V118.2C41.7998 122.066 38.6658 125.2 34.7998 125.2C30.9338 125.2 27.7998 122.066 27.7998 118.2V54.6571C27.7998 50.7911 30.9338 47.6571 34.7998 47.6571Z" fill="url(#paint4_linear_1_473)" /> <path fillRule="evenodd" clipRule="evenodd" d="M146 77.4429C149.866 77.4429 153 80.5769 153 84.4429V86.4286C153 90.2946 149.866 93.4286 146 93.4286C142.134 93.4286 139 90.2946 139 86.4286V84.4429C139 80.5769 142.134 77.4429 146 77.4429Z" fill="url(#paint5_linear_1_473)" /> <defs> <linearGradient id="paint0_linear_1_473" x1="14" y1="84.8558" x2="-5.40286e-10" y2="84.8558" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> <linearGradient id="paint1_linear_1_473" x1="125.2" y1="84.8558" x2="111.2" y2="84.8558" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> <linearGradient id="paint2_linear_1_473" x1="97.3999" y1="80.2774" x2="83.3999" y2="80.2774" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> <linearGradient id="paint3_linear_1_473" x1="69.6001" y1="80.489" x2="55.6001" y2="80.489" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> <linearGradient id="paint4_linear_1_473" x1="41.7998" y1="83.7641" x2="27.7998" y2="83.7641" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> <linearGradient id="paint5_linear_1_473" x1="153" y1="84.8864" x2="139" y2="84.8864" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> </defs> </svg>
                    </div>
                    <div className={styles.logoTitle}>KD-systems</div>
                    <div className={styles.logoSubtitle}>Knowledge Development</div>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.formContainer}>
                    <div className={styles.formTitle}>Войдите в свою учетную запись</div>

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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, 'username')}
                                className={styles.input}
                                placeholder="username@company.com"
                                required
                                autoFocus
                            />
                        </div>
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, 'password')}
                                className={styles.input}
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={() => setShowPassword(!showPassword)}
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
                    </div>

                    <div className={styles.options}>
                        <label className={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            Запомнить меня
                        </label>
                        <Link to='/forgotpassword' className={styles.link}>Забыли пароль?</Link>
                    </div>

                    <button
                        ref={submitRef}
                        onClick={handleSubmit}
                        className={styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Вход...' : 'Войти'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;