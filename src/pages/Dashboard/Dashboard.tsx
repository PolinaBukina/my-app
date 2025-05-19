// import React, { useState } from 'react';
// import { Database, Menu, ChevronRight, Globe, LogOut, ChevronDown } from 'lucide-react';
// import styles from './styles.module.css';
// import { useNavigate } from 'react-router-dom';

// interface Language {
//     code: string;
//     name: string;
// }

// const ProjectsDashboard: React.FC = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
//     const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState<boolean>(false);
//     const navigate = useNavigate();

//     const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//     const toggleLanguageDropdown = () => setIsLanguageDropdownOpen(!isLanguageDropdownOpen);

//     const handleLogout = (): void => {
//         console.log('Выход из системы');
//     };

//     const selectProject = (projectId: string): void => {
//         console.log('Выбран проект:', projectId);
//         navigate('/project:id');
//     };

//     const languages: Language[] = [
//         { code: 'ru', name: 'Русский' },
//         { code: 'en', name: 'English' },
//         { code: 'de', name: 'Deutsch' }
//     ];

//     const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

//     const changeLanguage = (language: Language): void => {
//         setCurrentLanguage(language);
//         setIsLanguageDropdownOpen(false);
//     };

//     return (
//         <div className={styles.container}>
//             {/* Верхняя панель навигации */}
//             <nav className={styles.navbar}>
//                 <div className={styles.navContainer}>
//                     <div className={styles.navContent}>
//                         <div className={styles.flex}>
//                             <div className={styles.logoContainer}>
//                                 <div className={styles.logoContainer}>
//                                     <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <circle cx="50" cy="50" r="48" stroke="#2F855A" strokeWidth="4" fill="white" />
//                                         <path d="M30 35H70M30 50H70M30 65H70" stroke="#2F855A" strokeWidth="4" strokeLinecap="round" />
//                                         <path d="M35 28L45 72M55 28L65 72" stroke="#2F855A" strokeWidth="4" strokeLinecap="round" />
//                                     </svg>
//                                     <span className={styles.logoText}>KD-systems</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className={styles.navActions}>
//                             {/* Переключатель языка */}
//                             <div className={styles.relative}>
//                                 <button
//                                     onClick={toggleLanguageDropdown}
//                                     className={styles.languageButton}
//                                 >
//                                     <Globe className="h-5 w-5 mr-1" />
//                                     <span>{currentLanguage.name}</span>
//                                     <ChevronDown className="h-4 w-4 ml-1" />
//                                 </button>

//                                 {isLanguageDropdownOpen && (
//                                     <div className={styles.languageDropdown}>
//                                         {languages.map(language => (
//                                             <button
//                                                 key={language.code}
//                                                 onClick={() => changeLanguage(language)}
//                                                 className={`${styles.languageItem} ${currentLanguage.code === language.code
//                                                     ? styles.languageItemActive
//                                                     : styles.languageItemInactive
//                                                     }`}
//                                             >
//                                                 {language.name}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Кнопка меню */}
//                             <button
//                                 onClick={toggleMenu}
//                                 className={styles.menuButton}
//                             >
//                                 <Menu className="h-6 w-6" />
//                             </button>

//                             {/* Кнопка выхода */}
//                             <button
//                                 onClick={handleLogout}
//                                 className={styles.logoutButton}
//                             >
//                                 <LogOut className="h-5 w-5 mr-1" />
//                                 <span>Выйти</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             {/* Боковое меню */}
//             {isMenuOpen && (
//                 <div className={`${styles.fixed} ${styles.inset0} ${styles.z10} ${styles.flex}`}>
//                     <div
//                         className={styles.sideMenuOverlay}
//                         onClick={toggleMenu}
//                     ></div>

//                     <div className={styles.sideMenu}>
//                         <div className={styles.sideMenuHeader}>
//                             <h2 className={styles.sideMenuTitle}>Меню</h2>
//                             <button
//                                 onClick={toggleMenu}
//                                 className={styles.sideMenuClose}
//                             >
//                                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                             </button>
//                         </div>

//                         <div className={styles.sideMenuContent}>
//                             <nav className={styles.sideMenuNav}>
//                                 <a href="#" className={styles.sideMenuItem}>
//                                     Мои проекты
//                                 </a>
//                                 <a href="#" className={styles.sideMenuItem}>
//                                     Настройки профиля
//                                 </a>
//                                 <a href="#" className={styles.sideMenuItem}>
//                                     Помощь
//                                 </a>
//                             </nav>
//                         </div>

//                         <div className={styles.sideMenuFooter}>
//                             <button
//                                 onClick={handleLogout}
//                                 className={styles.logoutButtonFull}
//                             >
//                                 <LogOut className="h-5 w-5 mr-2" />
//                                 <span>Выйти</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Основное содержимое */}
//             <main className={styles.mainContainer}>
//                 <h2 className={styles.projectsTitle}>Ваши проекты</h2>

//                 <div className={styles.projectsGrid}>
//                     {/* Единственный проект клиента */}
//                     <div
//                         className={styles.projectCard}
//                         onClick={() => selectProject('mospolitech')}
//                     >
//                         <div className={styles.projectContent}>
//                             <div className={styles.projectHeader}>
//                                 <div className={styles.projectTitleContainer}>
//                                     <Database className="w-8 h-8 text-green-500" />
//                                     <h3 className={styles.projectTitle}>МосПолитех</h3>
//                                 </div>
//                                 <ChevronRight className="w-5 h-5 text-gray-400" />
//                             </div>
//                             <p className={styles.projectDescription}>AI-ассистент по работе с текстовыми запросами пользователей</p>
//                             <div className={styles.projectFooter}>
//                                 <span>2 базы знаний</span>
//                                 <span>Обновлено: 12.05.2025</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default ProjectsDashboard;



import React, { useState } from 'react';
import { Database, Menu, ChevronRight, Globe, LogOut, ChevronDown } from 'lucide-react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

interface Language {
    code: string;
    name: string;
}

const ProjectsDashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = (): void => {
        console.log('Выход из системы');
        navigate('/');
    };

    const selectProject = (projectId: string): void => {
        console.log('Выбран проект:', projectId);
        navigate('/project:id');
    };

    return (
        <div className={styles.container}>
            {/* Боковое меню */}
            <div className={styles.sideMenu}>
                <div className={styles.sideMenuHeader}>
                    <h2 className={styles.sideMenuTitle}>Меню</h2>
                </div>

                <div className={styles.sideMenuContent}>
                    <nav className={styles.sideMenuNav}>
                        <a href="#" className={styles.sideMenuItem}>
                            Мои проекты
                        </a>
                        <a href="#" className={styles.sideMenuItem}>
                            Настройки профиля
                        </a>
                        <a href="#" className={styles.sideMenuItem}>
                            Помощь
                        </a>
                    </nav>
                </div>

                <div className={styles.sideMenuFooter}>
                    <button
                        onClick={handleLogout}
                        className={styles.logoutButtonFull}
                    >
                        <LogOut className="h-5 w-5 mr-2" />
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
                            <div className={styles.flex}>
                                <div className={styles.logoContainer}>
                                    <div className={styles.logoContainer}>
                                        <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="50" cy="50" r="48" stroke="#2F855A" strokeWidth="4" fill="white" />
                                            <path d="M30 35H70M30 50H70M30 65H70" stroke="#2F855A" strokeWidth="4" strokeLinecap="round" />
                                            <path d="M35 28L45 72M55 28L65 72" stroke="#2F855A" strokeWidth="4" strokeLinecap="round" />
                                        </svg>
                                        <span className={styles.logoText}>KD-systems</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.navActions}>
                                {/* Кнопка выхода */}
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

                {/* Основное содержимое */}
                <main className={styles.mainContainer}>
                    <h2 className={styles.projectsTitle}>Ваши проекты</h2>

                    <div className={styles.projectsGrid}>
                        {/* Единственный проект клиента */}
                        <div
                            className={styles.projectCard}
                            onClick={() => selectProject('mospolitech')}
                        >
                            <div className={styles.projectContent}>
                                <div className={styles.projectHeader}>
                                    <div className={styles.projectTitleContainer}>
                                        <Database className="w-8 h-8 text-green-500" />
                                        <h3 className={styles.projectTitle}>МосПолитех</h3>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                                <p className={styles.projectDescription}>AI-ассистент по работе с текстовыми запросами пользователей</p>
                                <div className={styles.projectFooter}>
                                    <span>2 базы знаний</span>
                                    <span>Обновлено: 12.05.2025</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProjectsDashboard;