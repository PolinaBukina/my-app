import React, { useState, useRef, KeyboardEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../helpers/authContext';
import styles from './styles.module.css';
import LogoIcon from '../../icons/LogoIcon';

import { API_BASE_URL } from '../../types/api';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setError('');

        // Валидация полей
        if (!username.trim() || !password.trim()) {
            setError('Пожалуйста, заполните все поля');
            return;
        }

        setIsLoading(true);

        try {
            // Формируем URLSearchParams для x-www-form-urlencoded
            const formData = new URLSearchParams();
            formData.append('grant_type', 'password');
            formData.append('username', username);
            formData.append('password', password);
            formData.append('scope', '');
            formData.append('client_id', '');
            formData.append('client_secret', '');

            console.log('Отправка запроса на:', `${API_BASE_URL}/authorize/login`);
            console.log('Данные запроса:', {
                grant_type: 'password',
                username,
                password,
                scope: '',
                client_id: '',
                client_secret: ''
            });

            // Отправка запроса
            const response = await fetch(`${API_BASE_URL}/authorize/login`, {
                method: 'POST',
                // mode: 'cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
                body: formData.toString(), // Явное преобразование в строку
                // credentials: 'include' // Для отправки кук, если требуется
            });


            // Обработка ответа
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error_description ||
                    errorData.detail ||
                    `Ошибка сервера: ${response.status}`
                );
            }

            const data = await response.json();

            if (!data.access_token) {
                throw new Error('Неверный формат ответа сервера: отсутствует токен');
            }

            // Авторизация в контексте
            await login(username, data.access_token, data.role, rememberMe);

            // Перенаправление
            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });

        } catch (err) {
            console.error('Login error:', err);
            setError(
                err instanceof Error ?
                    err.message :
                    'Неизвестная ошибка при авторизации'
            );
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
                        <LogoIcon />
                    </div>
                    <div className={styles.logoTitle}>KD-systems</div>
                    <div className={styles.logoSubtitle}>Knowledge Development</div>
                </div>
            </div>

            <div className={styles.right}>
                <form onSubmit={handleSubmit} className={styles.formContainer}>
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
                                disabled={isLoading}
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
                    </div>

                    <div className={styles.options}>
                        <label className={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                disabled={isLoading}
                            />
                            Запомнить меня
                        </label>
                        <Link to='/forgotpassword' className={styles.link}>Забыли пароль?</Link>
                    </div>

                    <button
                        type="submit"
                        className={styles.button}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className={styles.spinner}></span>
                                Вход...
                            </>
                        ) : 'Войти'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;