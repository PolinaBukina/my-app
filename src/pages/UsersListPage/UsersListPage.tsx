import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../helpers/authContext';
import { Database, Users, User, Globe, LogOut, ChevronRight, ArrowLeft } from 'lucide-react';
import { API_BASE_URL } from '../../types/api';

interface UserData {
    id: string;
    username: string;
    role: string;
    is_active: boolean;
}

const UsersListPage = () => {
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { state, logout } = useAuth();
    const username = state.user?.username || sessionStorage.getItem('username') || 'Пользователь';
    const isAdmin = sessionStorage.getItem('role') === 'admin';

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const token = sessionStorage.getItem('token');

                if (!token) {
                    throw new Error('Токен не найден');
                };

                const response = await fetch(`${API_BASE_URL}/admin/users/list/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        logout();
                        navigate('/');
                        return;
                    }
                    throw new Error(`Ошибка: ${response.status}`);
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
                console.error('Ошибка при загрузке пользователей:', err);
            } finally {
                setLoading(false);
            }
        };

        // if (isAdmin) {
        if (username) {
            fetchUsersData();
        } else {
            setLoading(false);
            setError('У вас нет прав для просмотра этой страницы');
        }
    }, [navigate, logout, isAdmin]);

    const toggleMenu = () => {
        setIsMenuCollapsed(!isMenuCollapsed);
    };

    const handleLogout = (): void => {
        logout();
        navigate('/');
    };

    const navigateToUserDetails = (username: string): void => {
        navigate(`/dashboard/users/${username}`);
    };

    return (
        <div className={styles.container}>
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
                        <button className={styles.sideMenuItem}>
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
                        {/* {isAdmin && ( */}
                        <button
                            className={`${styles.sideMenuItem} ${styles.active}`}
                        >
                            <Users className="h-5 w-5" />
                            <span>Пользователи</span>
                        </button>
                        {/* )} */}
                        {/* {isAdmin && ( */}
                        <button
                            className={styles.sideMenuItem}
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

            <div className={styles.mainContent}>
                <nav className={styles.navbar}>
                    <div className={styles.navContainer}>
                        <div className={styles.navContent}>
                            <div className={styles.logoContainer}>
                                <h2 className={styles.projectsTitle}>Управление пользователями</h2>
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

                <main className={styles.mainContainer}>
                    {loading ? (
                        <div className={styles.loadingContainer}>
                            <div className={styles.spinner}></div>
                            <p>Загрузка пользователей...</p>
                        </div>
                    ) : error ? (
                        <div className={styles.errorContainer}>
                            <p className={styles.errorText}>{error}</p>
                            <button
                                className={styles.retryButton}
                                onClick={() => window.location.reload()}
                            >
                                Попробовать снова
                            </button>
                        </div>
                    )
                        // : !isAdmin ? (
                        //     <div className={styles.errorContainer}>
                        //         <p className={styles.errorText}>У вас нет прав для просмотра этой страницы</p>
                        //     </div>
                        // ) 
                        : (
                            <div className={styles.usersGrid}>
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        className={styles.userCard}
                                        onClick={() => navigateToUserDetails(user.username)}
                                    >
                                        <div className={styles.userContent}>
                                            <div className={styles.userHeader}>
                                                <div className={styles.userTitleContainer}>
                                                    <User className="w-8 h-8 text-blue-500" />
                                                    <h3 className={styles.userTitle}>{user.username}</h3>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <div className={styles.userDetails}>
                                                <p><strong>Роль:</strong> {user.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
                                                <p><strong>Статус:</strong> {user.is_active ? 'Активен' : 'Неактивен'}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                </main>
            </div>
        </div>
    );
}

export default UsersListPage;