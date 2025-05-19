import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>404</h1>
                <h2 className={styles.subtitle}>Страница не найдена</h2>
                <p className={styles.description}>
                    Упс! Страница, которую вы ищете, не существует. Возможно, она была перемещена или удалена.
                </p>

                <div className={styles.actions}>
                    <button onClick={handleGoHome} className={styles.primaryButton}>
                        На главную
                    </button>
                    <button onClick={() => window.history.back()} className={styles.secondaryButton}>
                        Назад
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;