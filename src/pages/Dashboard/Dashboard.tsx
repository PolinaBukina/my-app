// import React, { useState } from 'react';
// import { Database, Menu, ChevronRight, Globe, LogOut, ChevronDown, User, Users } from 'lucide-react';
// import styles from './styles.module.css';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../helpers/authContext';

// interface Language {
//     code: string;
//     name: string;
// }

// const ProjectsDashboard: React.FC = () => {
//     const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
//     const navigate = useNavigate();
//     const { state } = useAuth();
//     const username = state.user?.username || sessionStorage.getItem('username') || 'Пользователь';
//     const isAdmin = sessionStorage.getItem('role') === 'admin';
//     const { logout } = useAuth();

//     const toggleMenu = () => {
//         setIsMenuCollapsed(!isMenuCollapsed);
//     };

//     const handleLogout = (): void => {
//         logout();
//         navigate('/');
//     };

//     const selectProject = (projectId: string): void => {
//         console.log('Выбран проект:', projectId);
//         // navigate(`/project:${id}`);
//         navigate('project/:id');
//     };

//     return (
//         <div className={styles.container}>
// <div className={`${styles.sideMenu} ${isMenuCollapsed ? styles.collapsed : ''}`}>
//     <div className={styles.sideMenuHeader}>
//         <div className={styles.logoContainer}>
//             <svg width="40" height="65" viewBox="0 0 153 173" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M7 63.5428C10.866 63.5428 14 66.6769 14 70.5428V102.314C14 106.18 10.866 109.314 7 109.314C3.13401 109.314 0 106.18 0 102.314V70.5428C0 66.6769 3.13401 63.5428 7 63.5428Z" fill="url(#paint0_linear_1_473)" /> <path fillRule="evenodd" clipRule="evenodd" d="M118.2 63.5428C122.066 63.5428 125.2 66.6769 125.2 70.5428V102.314C125.2 106.18 122.066 109.314 118.2 109.314C114.334 109.314 111.2 106.18 111.2 102.314V70.5428C111.2 66.6769 114.334 63.5428 118.2 63.5428Z" fill="url(#paint1_linear_1_473)" /> <path fillRule="evenodd" clipRule="evenodd" d="M90.3999 23.8286C94.2659 23.8286 97.3999 26.9626 97.3999 30.8286V138.057C97.3999 141.923 94.2659 145.057 90.3999 145.057C86.5339 145.057 83.3999 141.923 83.3999 138.057V30.8286C83.3999 26.9626 86.5339 23.8286 90.3999 23.8286Z" fill="url(#paint2_linear_1_473)" /> <path fillRule="evenodd" clipRule="evenodd" d="M62.6001 0C66.4661 0 69.6001 3.13401 69.6001 7V165.857C69.6001 169.723 66.4661 172.857 62.6001 172.857C58.7341 172.857 55.6001 169.723 55.6001 165.857V7C55.6001 3.13401 58.7341 0 62.6001 0Z" fill="url(#paint3_linear_1_473)" /> <path fillRule="evenodd" clipRule="evenodd" d="M34.7998 47.6571C38.6658 47.6571 41.7998 50.7911 41.7998 54.6571V118.2C41.7998 122.066 38.6658 125.2 34.7998 125.2C30.9338 125.2 27.7998 122.066 27.7998 118.2V54.6571C27.7998 50.7911 30.9338 47.6571 34.7998 47.6571Z" fill="url(#paint4_linear_1_473)" /> <path fillRule="evenodd" clipRule="evenodd" d="M146 77.4429C149.866 77.4429 153 80.5769 153 84.4429V86.4286C153 90.2946 149.866 93.4286 146 93.4286C142.134 93.4286 139 90.2946 139 86.4286V84.4429C139 80.5769 142.134 77.4429 146 77.4429Z" fill="url(#paint5_linear_1_473)" /> <defs> <linearGradient id="paint0_linear_1_473" x1="14" y1="84.8558" x2="-5.40286e-10" y2="84.8558" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> <linearGradient id="paint1_linear_1_473" x1="125.2" y1="84.8558" x2="111.2" y2="84.8558" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> <linearGradient id="paint2_linear_1_473" x1="97.3999" y1="80.2774" x2="83.3999" y2="80.2774" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> <linearGradient id="paint3_linear_1_473" x1="69.6001" y1="80.489" x2="55.6001" y2="80.489" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> <linearGradient id="paint4_linear_1_473" x1="41.7998" y1="83.7641" x2="27.7998" y2="83.7641" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> <linearGradient id="paint5_linear_1_473" x1="153" y1="84.8864" x2="139" y2="84.8864" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> </defs> </svg>
//             <span className={styles.logoText}>KD-systems</span>
//         </div>
//         <button className={styles.menuToggle} onClick={toggleMenu}>
//             {isMenuCollapsed ? <ChevronRight size={20} /> : <ChevronRight size={20} className={styles.rotate180} />}
//         </button>
//     </div>

//     <div className={styles.sideMenuContent}>
//         <nav className={styles.sideMenuNav}>
//             <button className={styles.sideMenuItem}>
//                 <Database className="h-5 w-5" />
//                 <span>Мои проекты</span>
//             </button>
//             <button className={styles.sideMenuItem}>
//                 <User className="h-5 w-5" />
//                 <span>Настройки профиля</span>
//             </button>
//             <button className={styles.sideMenuItem}>
//                 <Globe className="h-5 w-5" />
//                 <span>Помощь</span>
//             </button>
//             {/* Кнопка "Пользователи" только для админов */}
//             {isAdmin && (
//                 <button
//                     className={styles.sideMenuItem}
//                     onClick={() => navigate('users')}
//                 >
//                     <Users className="h-5 w-5" />
//                     <span>Пользователи</span>
//                 </button>
//             )}
//             {/* Кнопка "Зарегистрировать" только для админов */}
//             {isAdmin && (
//                 <button
//                     className={`${styles.sideMenuItem} ${styles.active}`}
//                     onClick={() => navigate('/dashboard/register')}
//                 >
//                     <Globe className="h-5 w-5" />
//                     <span>Зарегистрировать</span>
//                 </button>
//             )}
//             {/* {isAdmin && (
//                 <button
//                     className={styles.sideMenuItem}
//                     onClick={() => navigate('indices')}
//                 >
//                     <Database className="h-5 w-5" />
//                     <span>Все индексы</span>
//                 </button>
//             )} */}
//         </nav>
//     </div>

//     <div className={styles.sideMenuFooter}>
//         <div className={styles.userInfoSidebar}>
//             <User className="h-5 w-5" />
//             <span className={styles.username}>{username}</span>
//         </div>
//         <button onClick={handleLogout} className={styles.logoutButtonFull}>
//             <LogOut className="h-5 w-5" />
//             <span>Выйти</span>
//         </button>
//     </div>
// </div>

//             {/* Основной контент с верхней панелью */}
//             <div className={styles.mainContent}>
//                 {/* Верхняя панель навигации */}
//                 <nav className={styles.navbar}>
//                     <div className={styles.navContainer}>
//                         <div className={styles.navContent}>
//                             {/* <div className={styles.flex}> */}
//                             <div className={styles.logoContainer}>
//                                 <h2 className={styles.projectsTitle}>Ваши проекты</h2>
//                             </div>
//                             {/* </div> */}

//                             <div className={styles.navActions}>
//                                 {/* Блок пользователя */}
//                                 <div className={styles.userInfoNav}>
//                                     <User className="h-5 w-5 mr-2" />
//                                     <span className={styles.username}>{username}</span>
//                                 </div>
//                                 {/* Кнопка выхода */}
//                                 <button
//                                     onClick={handleLogout}
//                                     className={styles.logoutButton}
//                                 >
//                                     <LogOut className="h-5 w-5 mr-1" />
//                                     <span>Выйти</span>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </nav>

//                 {/* Основное содержимое */}
//                 <main className={styles.mainContainer}>
//                     <div className={styles.projectsGrid}>
//                         {/* Единственный проект клиента */}
//                         <div
//                             className={styles.projectCard}
//                             onClick={() => selectProject('mospolitech')}
//                         >
//                             <div className={styles.projectContent}>
//                                 <div className={styles.projectHeader}>
//                                     <div className={styles.projectTitleContainer}>
//                                         <Database className="w-8 h-8 text-green-500" />
//                                         <h3 className={styles.projectTitle}>МосПолитех</h3>
//                                     </div>
//                                     <ChevronRight className="w-5 h-5 text-gray-400" />
//                                 </div>
//                                 <p className={styles.projectDescription}>AI-ассистент по работе с текстовыми запросами пользователей</p>
//                                 <div className={styles.projectFooter}>
//                                     <span>2 базы знаний</span>
//                                     <span>Обновлено: 12.05.2025</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {isAdmin && (
//                         <div className={styles.projectsGrid}>
//                             {/* Единственный проект клиента */}
//                             <div
//                                 className={styles.projectCard}
//                                 onClick={() => selectProject('mospolitech')}
//                             >
//                                 <div className={styles.projectContent}>
//                                     <div className={styles.projectHeader}>
//                                         <div className={styles.projectTitleContainer}>
//                                             <Database className="w-8 h-8 text-green-500" />
//                                             <h3 className={styles.projectTitle}>МосПолитех</h3>
//                                         </div>
//                                         <ChevronRight className="w-5 h-5 text-gray-400" />
//                                     </div>
//                                     <p className={styles.projectDescription}>AI-ассистент по работе с текстовыми запросами пользователей</p>
//                                     <div className={styles.projectFooter}>
//                                         <span>2 базы знаний</span>
//                                         <span>Обновлено: 12.05.2025</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default ProjectsDashboard; 


import React, { useState, useEffect } from 'react';
import { Database, Menu, ChevronRight, Globe, LogOut, ChevronDown, User, Users } from 'lucide-react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../helpers/authContext';

interface Index {
    id: number;
    external_id: string;
    name: string;
    config: {
        file_ids: string[];
        created_at: string;
    };
}

interface Project {
    id: string;
    name: string;
    description: string;
    updatedAt: string;
    knowledgeBases: number;
}

const ProjectsDashboard: React.FC = () => {
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const navigate = useNavigate();
    const { state, logout } = useAuth();
    const username = state.user?.username || sessionStorage.getItem('username') || 'Пользователь';
    const isAdmin = sessionStorage.getItem('role') === 'admin';

    // Состояния для админской части
    const [indices, setIndices] = useState<Index[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Данные проектов для обычного пользователя
    const [projects, setProjects] = useState<Project[]>([
        {
            id: 'mospolitech',
            name: 'МосПолитех',
            description: 'AI-ассистент по работе с текстовыми запросами пользователей',
            updatedAt: '12.05.2025',
            knowledgeBases: 2
        }
    ]);

    useEffect(() => {
        if (isAdmin) {
            const fetchIndices = async () => {
                try {
                    const response = await fetch('http://158.160.153.2:8200/rag_service/get_all_indices/', {
                        headers: {
                            'Authorization': `Bearer ${state.token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Ошибка при загрузке индексов');
                    }

                    const data = await response.json();
                    setIndices(data);
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
                } finally {
                    setLoading(false);
                }
            };

            fetchIndices();
        }
    }, [isAdmin, state.token]);

    const toggleMenu = () => {
        setIsMenuCollapsed(!isMenuCollapsed);
    };

    const handleLogout = (): void => {
        logout();
        navigate('/');
    };

    const selectProject = (projectId: string): void => {
        navigate(`project/${projectId}`);
    };

    const selectIndex = (indexId: string): void => {
        // Навигация или действие при выборе индекса
        console.log('Выбран индекс:', indexId);
    };

    return (
        <div className={styles.container}>
            {/* Боковое меню (остается без изменений) */}
            <div className={`${styles.sideMenu} ${isMenuCollapsed ? styles.collapsed : ''}`}>
                <div className={styles.sideMenuHeader}>
                    <div className={styles.logoContainer}>
                        <svg width="40" height="65" viewBox="0 0 153 173" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M7 63.5428C10.866 63.5428 14 66.6769 14 70.5428V102.314C14 106.18 10.866 109.314 7 109.314C3.13401 109.314 0 106.18 0 102.314V70.5428C0 66.6769 3.13401 63.5428 7 63.5428Z" fill="url(#paint0_linear_1_473)" /> <path fillRule="evenodd" clipRule="evenodd" d="M118.2 63.5428C122.066 63.5428 125.2 66.6769 125.2 70.5428V102.314C125.2 106.18 122.066 109.314 118.2 109.314C114.334 109.314 111.2 106.18 111.2 102.314V70.5428C111.2 66.6769 114.334 63.5428 118.2 63.5428Z" fill="url(#paint1_linear_1_473)" /> <path fillRule="evenodd" clipRule="evenodd" d="M90.3999 23.8286C94.2659 23.8286 97.3999 26.9626 97.3999 30.8286V138.057C97.3999 141.923 94.2659 145.057 90.3999 145.057C86.5339 145.057 83.3999 141.923 83.3999 138.057V30.8286C83.3999 26.9626 86.5339 23.8286 90.3999 23.8286Z" fill="url(#paint2_linear_1_473)" /> <path fillRule="evenodd" clipRule="evenodd" d="M62.6001 0C66.4661 0 69.6001 3.13401 69.6001 7V165.857C69.6001 169.723 66.4661 172.857 62.6001 172.857C58.7341 172.857 55.6001 169.723 55.6001 165.857V7C55.6001 3.13401 58.7341 0 62.6001 0Z" fill="url(#paint3_linear_1_473)" /> <path fillRule="evenodd" clipRule="evenodd" d="M34.7998 47.6571C38.6658 47.6571 41.7998 50.7911 41.7998 54.6571V118.2C41.7998 122.066 38.6658 125.2 34.7998 125.2C30.9338 125.2 27.7998 122.066 27.7998 118.2V54.6571C27.7998 50.7911 30.9338 47.6571 34.7998 47.6571Z" fill="url(#paint4_linear_1_473)" /> <path fillRule="evenodd" clipRule="evenodd" d="M146 77.4429C149.866 77.4429 153 80.5769 153 84.4429V86.4286C153 90.2946 149.866 93.4286 146 93.4286C142.134 93.4286 139 90.2946 139 86.4286V84.4429C139 80.5769 142.134 77.4429 146 77.4429Z" fill="url(#paint5_linear_1_473)" /> <defs> <linearGradient id="paint0_linear_1_473" x1="14" y1="84.8558" x2="-5.40286e-10" y2="84.8558" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> <linearGradient id="paint1_linear_1_473" x1="125.2" y1="84.8558" x2="111.2" y2="84.8558" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> <linearGradient id="paint2_linear_1_473" x1="97.3999" y1="80.2774" x2="83.3999" y2="80.2774" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> <linearGradient id="paint3_linear_1_473" x1="69.6001" y1="80.489" x2="55.6001" y2="80.489" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> <linearGradient id="paint4_linear_1_473" x1="41.7998" y1="83.7641" x2="27.7998" y2="83.7641" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> <linearGradient id="paint5_linear_1_473" x1="153" y1="84.8864" x2="139" y2="84.8864" gradientUnits="userSpaceOnUse"> <stop offset="0.005" stopColor="#2E4F41" /> <stop offset="1" stopColor="#2AAD6B" /> </linearGradient> </defs> </svg>
                        <span className={styles.logoText}>KD-systems</span>
                    </div>
                    <button className={styles.menuToggle} onClick={toggleMenu}>
                        {isMenuCollapsed ? <ChevronRight size={20} /> : <ChevronRight size={20} className={styles.rotate180} />}
                    </button>
                </div>

                <div className={styles.sideMenuContent}>
                    <nav className={styles.sideMenuNav}>
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
                        {/* Кнопка "Пользователи" только для админов */}
                        {isAdmin && (
                            <button
                                className={styles.sideMenuItem}
                                onClick={() => navigate('users')}
                            >
                                <Users className="h-5 w-5" />
                                <span>Пользователи</span>
                            </button>
                        )}
                        {/* Кнопка "Зарегистрировать" только для админов */}
                        {isAdmin && (
                            <button
                                className={`${styles.sideMenuItem} ${styles.active}`}
                                onClick={() => navigate('/dashboard/register')}
                            >
                                <Globe className="h-5 w-5" />
                                <span>Зарегистрировать</span>
                            </button>
                        )}
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
                <nav className={styles.navbar}>
                    <div className={styles.navContainer}>
                        <div className={styles.navContent}>
                            <div className={styles.logoContainer}>
                                <h2 className={styles.projectsTitle}>
                                    {isAdmin ? 'Все индексы' : 'Ваши проекты'}
                                </h2>
                            </div>
                            <div className={styles.navActions}>
                                <div className={styles.userInfoNav}>
                                    <User className="h-5 w-5 mr-2" />
                                    <span className={styles.username}>{username}</span>
                                </div>
                                <button onClick={handleLogout} className={styles.logoutButton}>
                                    <LogOut className="h-5 w-5 mr-1" />
                                    <span>Выйти</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                <main className={styles.mainContainer}>
                    {isAdmin ? (
                        /* Контент для админа */
                        <>
                            {loading ? (
                                <div className={styles.loading}>Загрузка индексов...</div>
                            ) : error ? (
                                <div className={styles.error}>{error}</div>
                            ) : (
                                <div className={styles.indicesGrid}>
                                    {indices.map(index => (
                                        <div
                                            key={index.id}
                                            className={styles.indexCard}
                                            onClick={() => selectIndex(index.external_id)}
                                        >
                                            <div className={styles.indexContent}>
                                                <div className={styles.indexHeader}>
                                                    <Database className="w-8 h-8 text-blue-500" />
                                                    <h3 className={styles.indexTitle}>{index.name}</h3>
                                                </div>
                                                <div className={styles.indexDetails}>
                                                    <p><strong>ID:</strong> {index.external_id}</p>
                                                    <p><strong>Создан:</strong> {new Date(index.config.created_at).toLocaleDateString()}</p>
                                                    <p><strong>Кол-во файлов:</strong> {index.config.file_ids.length}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        /* Контент для обычного пользователя */
                        <div className={styles.projectsGrid}>
                            {projects.map(project => (
                                <div
                                    key={project.id}
                                    className={styles.projectCard}
                                    onClick={() => selectProject(project.id)}
                                >
                                    <div className={styles.projectContent}>
                                        <div className={styles.projectHeader}>
                                            <div className={styles.projectTitleContainer}>
                                                <Database className="w-8 h-8 text-green-500" />
                                                <h3 className={styles.projectTitle}>{project.name}</h3>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <p className={styles.projectDescription}>{project.description}</p>
                                        <div className={styles.projectFooter}>
                                            <span>{project.knowledgeBases} базы знаний</span>
                                            <span>Обновлено: {project.updatedAt}</span>
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
};

export default ProjectsDashboard;