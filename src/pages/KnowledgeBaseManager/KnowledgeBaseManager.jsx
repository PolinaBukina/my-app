import React, { useState } from 'react';
import { Database, Trash2, Upload, FileText, Menu, LogOut, ChevronRight, Globe, Info, User, Settings, Home } from 'lucide-react';
import styles from './styles.module.css';

const KnowledgeBaseManagerWithMenu = () => {
    const projectInfo = {
        id: 'mospolitech',
        name: 'МосПолитех',
        description: 'AI-ассистент по работе с текстовыми запросами пользователей'
    };

    const knowledgeBases = [
        { id: 1, name: 'Информация о вузе', size: '2.4 MB', format: 'PDF', lastUpdated: '10.05.2025' },
        { id: 2, name: 'Ответы на частые вопросы', size: '1.1 MB', format: 'TXT', lastUpdated: '08.05.2025' }
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleLogout = () => console.log('Выход из системы');
    const backToProjects = () => console.log('Возврат к списку проектов');
    const addKnowledgeBase = () => console.log('Добавление базы знаний');
    const deleteKnowledgeBase = (kbId) => console.log('Удаление базы знаний:', kbId);

    return (
        <div className={styles.container}>
            {/* Верхняя панель навигации */}
            <nav className={styles.nav}>
                <div className={styles.navContainer}>
                    <div className={styles.navInner}>
                        <div className={styles.navLeft}>
                            <div className={styles.navLogo}>
                                <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="48" stroke="#2F855A" strokeWidth="4" fill="white" />
                                    <path d="M30 35H70M30 50H70M30 65H70" stroke="#2F855A" strokeWidth="4" strokeLinecap="round" />
                                    <path d="M35 28L45 72M55 28L65 72" stroke="#2F855A" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                                <span className={styles.navLogoText}>KD-systems</span>
                            </div>
                        </div>

                        <div className={styles.navRight}>
                            <button
                                onClick={toggleMenu}
                                className={styles.menuButton}
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Боковое меню (открыто) */}
            {isMenuOpen && (
                <div className={styles.menuOverlay}>
                    <div
                        className={styles.menuOverlay}
                        onClick={toggleMenu}
                    ></div>

                    <div className={styles.menuContent}>
                        <div className={styles.menuHeader}>
                            <div className={styles.navLogo}>
                                <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="48" stroke="#2F855A" strokeWidth="4" fill="white" />
                                    <path d="M30 35H70M30 50H70M30 65H70" stroke="#2F855A" strokeWidth="4" strokeLinecap="round" />
                                    <path d="M35 28L45 72M55 28L65 72" stroke="#2F855A" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                                <span className={styles.navLogoText}>KD-systems</span>
                            </div>
                            <button
                                onClick={toggleMenu}
                                className={styles.menuCloseButton}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className={styles.profileSection}>
                            <div className={styles.profileInfo}>
                                <div className={styles.profileAvatar}>
                                    <User className="h-5 w-5" />
                                </div>
                                <div className={styles.profileText}>
                                    <p className={styles.profileName}>Андрей Иванов</p>
                                    <p className={styles.profileEmail}>client@example.com</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.menuItems}>
                            <nav className={styles.menuNav}>
                                <a href="#" className={`${styles.menuLink} ${styles.menuLinkActive}`}>
                                    <Home className={`${styles.menuLinkIcon} ${styles.menuLinkActiveIcon}`} />
                                    Главная
                                </a>
                                <a href="#" className={`${styles.menuLink} ${styles.menuLinkActive}`}>
                                    <Database className={`${styles.menuLinkIcon} ${styles.menuLinkActiveIcon}`} />
                                    Мои проекты
                                </a>
                                <a href="#" className={styles.menuLink}>
                                    <Settings className={styles.menuLinkIcon} />
                                    Настройки
                                </a>

                                <div className={styles.submenu}>
                                    <p className={styles.submenuTitle}>
                                        Язык интерфейса
                                    </p>
                                    <a href="#" className={`${styles.submenuLink} ${styles.submenuLinkActive}`}>
                                        <Globe className={styles.submenuLinkIcon} />
                                        Русский
                                    </a>
                                    <a href="#" className={styles.submenuLink}>
                                        <Globe className={styles.submenuLinkIcon} />
                                        English
                                    </a>
                                    <a href="#" className={styles.submenuLink}>
                                        <Globe className={styles.submenuLinkIcon} />
                                        Deutsch
                                    </a>
                                </div>
                            </nav>
                        </div>

                        <div className={styles.menuFooter}>
                            <button
                                onClick={handleLogout}
                                className={styles.logoutButton}
                            >
                                <LogOut className="h-5 w-5 mr-2" />
                                <span>Выйти</span>
                            </button>
                            <div className={styles.versionText}>
                                <p>© 2025 KD-systems. Версия 1.2.3</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.mainContainer}>
                        <div className={styles.contentContainer}>
                            <div className={styles.contentHeader}>
                                <button
                                    onClick={backToProjects}
                                    className={styles.backButton}
                                >
                                    <ChevronRight className="w-5 h-5 transform rotate-180" />
                                    <span>Назад к проектам</span>
                                </button>
                                <h2 className={styles.projectTitle}>{projectInfo.name}</h2>
                            </div>

                            <div className={styles.sectionHeader}>
                                <h3 className={styles.sectionTitle}>Базы знаний</h3>
                                <button
                                    onClick={addKnowledgeBase}
                                    className={styles.uploadButton}
                                >
                                    <Upload className="h-5 w-5 mr-2" />
                                    <span>Загрузить базу знаний</span>
                                </button>
                            </div>

                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead className={styles.tableHead}>
                                        <tr>
                                            <th className={styles.tableHeaderCell}>Название</th>
                                            <th className={styles.tableHeaderCell}>Формат</th>
                                            <th className={styles.tableHeaderCell}>Размер</th>
                                            <th className={styles.tableHeaderCell}>Последнее обновление</th>
                                            <th className={`${styles.tableHeaderCell} text-right`}>Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody className={styles.tableBody}>
                                        {knowledgeBases.map(kb => (
                                            <tr key={kb.id} className={styles.tableRow}>
                                                <td className={styles.tableCell}>
                                                    <div className={styles.cellContent}>
                                                        <FileText className={styles.fileIcon} />
                                                        <div className={styles.fileName}>{kb.name}</div>
                                                    </div>
                                                </td>
                                                <td className={styles.tableCell}>{kb.format}</td>
                                                <td className={styles.tableCell}>{kb.size}</td>
                                                <td className={styles.tableCell}>{kb.lastUpdated}</td>
                                                <td className={`${styles.tableCell} text-right`}>
                                                    <button
                                                        className={styles.deleteButton}
                                                        onClick={() => deleteKnowledgeBase(kb.id)}
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles.infoBox}>
                                <div className={styles.infoContent}>
                                    <div className={styles.infoIcon}>
                                        <Info className="h-5 w-5" />
                                    </div>
                                    <div className={styles.infoText}>
                                        <h3 className={styles.infoTitle}>Информация о загрузке баз знаний</h3>
                                        <ul className={styles.infoList}>
                                            <li className={styles.infoListItem}>Поддерживаемые форматы файлов: TXT, PDF, XLSX (Excel)</li>
                                            <li className={styles.infoListItem}>Максимальный размер одного файла: 10 МБ</li>
                                            <li className={styles.infoListItem}>Максимальное количество загружаемых файлов: 10 шт.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!isMenuOpen && (
                <div className={styles.mainContainer}>
                    {/* Содержимое скрыто, так как мы отображаем страницу с открытым меню */}
                </div>
            )}
        </div>
    );
};

export default KnowledgeBaseManagerWithMenu;