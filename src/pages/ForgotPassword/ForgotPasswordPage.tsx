// ForgotPasswordPage.tsx
import React, { useState } from 'react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        console.log('Запрос на восстановление пароля для:', email);
        if (email !== '') {
            setIsSubmitted(true);
        }
    };

    const handleBackToLogin = () => {
        navigate('/');
    };

    return (
        <div className={styles.page}>
            {/* Логотип */}
            <div className={styles.left}>
                <div className={styles.logoWrapper}>
                    <div className={styles.logoSvg}>
                        <svg viewBox="0 0 100 100" fill="none">
                            <circle cx="50" cy="50" r="48" stroke="#2F855A" strokeWidth="4" fill="white" />
                            <path d="M30 35H70M30 50H70M30 65H70" stroke="#2F855A" strokeWidth="4" strokeLinecap="round" />
                            <path d="M35 28L45 72M55 28L65 72" stroke="#2F855A" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className={styles.logoTitle}>KD-systems</div>
                    <div className={styles.logoSubtitle}>Knowledge Development</div>
                </div>
            </div>

            {/* Форма */}
            <div className={styles.right}>
                <div className={styles.formContainer}>
                    {!isSubmitted ? (
                        <>
                            <div className={styles.formTitle}>Восстановление пароля</div>
                            <div className={styles.formSubtitle}>
                                Введите email, связанный с вашей учетной записью, и мы вышлем вам инструкции по восстановлению пароля.
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="email" className={styles.label}>Email</label>
                                <div className={styles.inputWrapper}>
                                    <div className={styles.icon}>
                                        <svg fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={styles.input}
                                        placeholder="username@company.com"
                                        required
                                    />
                                </div>
                            </div>

                            <button onClick={handleSubmit} className={styles.button}>
                                Отправить инструкции
                            </button>

                            <div className={styles.backToLogin}>
                                <button onClick={handleBackToLogin} className={styles.textButton}>
                                    ← Вернуться на страницу входа
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.formTitle}>Проверьте вашу почту</div>
                            <div className={styles.successMessage}>
                                Мы отправили инструкции по восстановлению пароля на адрес <strong>{email}</strong>. Пожалуйста, проверьте вашу электронную почту.
                            </div>

                            <button onClick={handleBackToLogin} className={styles.button}>
                                Вернуться на страницу входа
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;