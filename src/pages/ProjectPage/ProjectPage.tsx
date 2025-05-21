// import React, { useState, useRef, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Database, Menu, ChevronRight, Globe, LogOut, ChevronDown, Upload, Download, Trash2, Eye, ChevronLeft, X } from 'lucide-react';
// import styles from './styles.module.css';

// interface KnowledgeBase {
//     id: string;
//     name: string;
//     date: string;
//     size: string;
// }

// const ProjectPage: React.FC = () => {
//     const [activeTab, setActiveTab] = useState<'knowledge' | 'settings' | 'stats'>('knowledge');
//     const [showUploadModal, setShowUploadModal] = useState(false);
//     const [dragActive, setDragActive] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([
//         { id: '1', name: 'Техническая документация', date: '15.05.2025', size: '2.4 MB' },
//         { id: '2', name: 'FAQ продукта', date: '10.05.2025', size: '1.1 MB' },
//         { id: '3', name: 'История поддержки', date: '05.05.2025', size: '3.7 MB' },
//     ]);
//     const navigate = useNavigate();
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const handleDelete = async (id: string) => {
//         try {
//             // Сначала удаляем файл на сервере
//             await fetch(`http://localhost:3000/api/files/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
//                 }
//             });

//             // Затем удаляем из состояния
//             setKnowledgeBases(prev => prev.filter(base => base.id !== id));
//         } catch (error) {
//             console.error('Ошибка удаления:', error);
//         }
//     };

//     const handleDownload = (id: string) => {
//         console.log('Скачивание базы знаний:', id);
//     };

//     const handlePreview = (id: string) => {
//         console.log('Предпросмотр базы знаний:', id);
//     };

//     const handleBackToProjects = () => {
//         navigate('/dashboard');
//     };

//     // Drag and Drop handlers
//     const handleDrag = useCallback((e: React.DragEvent) => {
//         e.preventDefault();
//         e.stopPropagation();
//         if (e.type === 'dragenter' || e.type === 'dragover') {
//             setDragActive(true);
//         } else if (e.type === 'dragleave') {
//             setDragActive(false);
//         }
//     }, []);

//     const handleDrop = useCallback((e: React.DragEvent) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setDragActive(false);
//         if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//             // Handle the files
//             const file = e.dataTransfer.files[0];
//             handleFileUpload(file);
//         }
//     }, []);

//     const handleFileUpload = async (file: File) => {
//         // try {
//         //     setUploadProgress(10);

//         //     const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//         //     if (!token) throw new Error('Требуется авторизация');

//         //     const formData = new FormData();
//         //     formData.append('file', file);
//         //     formData.append('name', file.name.replace(/\.[^/.]+$/, ""));
//         //     formData.append('description', `База знаний ${file.name}`);

//         //     const response = await fetch('http://localhost:3000/api/files/upload', {
//         //         method: 'POST',
//         //         headers: {
//         //             'Authorization': `Bearer ${token}`
//         //         },
//         //         body: formData
//         //     });

//         //     setUploadProgress(70);

//         //     if (!response.ok) {
//         //         const errorData = await response.json();
//         //         throw new Error(errorData.error || 'Ошибка сервера');
//         //     }

//         //     const data = await response.json();
//         //     setUploadProgress(100);

//         //     // Обновляем список файлов
//         //     const newBase: KnowledgeBase = {
//         //         id: data.fileId.toString(), // Убедимся, что ID строка
//         //         name: data.filename,
//         //         date: new Date().toLocaleDateString(),
//         //         size: data.size
//         //     };

//         //     setKnowledgeBases(prev => [...prev, newBase]);

//         //     setTimeout(() => {
//         //         setShowUploadModal(false);
//         //         setUploadProgress(0);
//         //     }, 500);
//         // } catch (error) {
//         //     console.error('Ошибка загрузки:', error);
//         //     setUploadProgress(0);
//         //     alert(`Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
//         // }
//         console.log('пока не работает загрузка файлов')
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             setUploadProgress(0); // Сбрасываем прогресс
//             handleFileUpload(e.target.files[0]);
//         }
//         // Сбрасываем значение input, чтобы можно было загрузить тот же файл снова
//         if (e.target) {
//             e.target.value = '';
//         }
//     };

//     return (
//         <div className={styles.container}>
//             <nav className={styles.navbar}>
//                 <div className={styles.navContainer}>
//                     <div className={styles.navContent}>
//                         <div className={styles.flex}>
//                             <button
//                                 className={styles.backButton}
//                                 onClick={handleBackToProjects}
//                             >
//                                 <ChevronLeft className="h-5 w-5 mr-1" />
//                                 Назад к проектам
//                             </button>

//                             <div className={styles.breadcrumbs}>
//                                 <span>Проекты</span>
//                                 <ChevronRight className="h-4 w-4 mx-2" />
//                                 <span className={styles.breadcrumbActive}>МосПолитех</span>
//                             </div>
//                         </div>

//                         <div className={styles.navActions}>
//                             {/* Кнопки языка, меню и выхода как в Dashboard */}
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             <main className={styles.mainContainer}>
//                 <h1 className={styles.projectTitle}>МосПолитех</h1>
//                 <p className={styles.projectDescription}>AI-ассистент по работе с текстовыми запросами пользователей</p>

//                 <div className={styles.tabs}>
//                     <button
//                         className={`${styles.tab} ${activeTab === 'knowledge' ? styles.tabActive : ''}`}
//                         onClick={() => setActiveTab('knowledge')}
//                     >
//                         Базы знаний
//                     </button>
//                     <button
//                         className={`${styles.tab} ${activeTab === 'settings' ? styles.tabActive : ''}`}
//                         onClick={() => setActiveTab('settings')}
//                     >
//                         Настройки
//                     </button>
//                 </div>

//                 {activeTab === 'knowledge' && (
//                     <div className={styles.tabContent}>
//                         <div className={styles.knowledgeBases}>
//                             <h3 className={styles.sectionTitle}>Загруженные базы знаний</h3>

//                             <div className={styles.knowledgeList}>
//                                 {knowledgeBases.map(base => (
//                                     <div key={base.id} className={styles.knowledgeItem}>
//                                         <div className={styles.knowledgeInfo}>
//                                             <Database className="h-5 w-5 text-green-500 mr-3" />
//                                             <div>
//                                                 <h4 className={styles.knowledgeName}>{base.name}</h4>
//                                                 <div className={styles.knowledgeMeta}>
//                                                     <span>{base.date}</span>
//                                                     <span className={styles.metaSeparator}>•</span>
//                                                     <span>{base.size}</span>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className={styles.knowledgeActions}>
//                                             <button
//                                                 className={styles.actionButton}
//                                                 onClick={() => handlePreview(base.id)}
//                                                 title="Предпросмотр"
//                                             >
//                                                 <Eye className="h-4 w-4" />
//                                             </button>
//                                             <button
//                                                 className={styles.actionButton}
//                                                 onClick={() => handleDownload(base.id)}
//                                                 title="Скачать"
//                                             >
//                                                 <Download className="h-4 w-4" />
//                                             </button>
//                                             <button
//                                                 className={`${styles.actionButton} ${styles.deleteButton}`}
//                                                 onClick={() => handleDelete(base.id)}
//                                                 title="Удалить"
//                                             >
//                                                 <Trash2 className="h-4 w-4" />
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             <button
//                                 className={styles.uploadButton}
//                                 onClick={() => setShowUploadModal(true)}
//                             >
//                                 <Upload className="h-5 w-5 mr-2" />
//                                 Загрузить новую базу
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === 'settings' && (
//                     <div className={styles.tabContent}>
//                         <h3 className={styles.sectionTitle}>Настройки проекта</h3>
//                     </div>
//                 )}

//                 {activeTab === 'stats' && (
//                     <div className={styles.tabContent}>
//                         <h3 className={styles.sectionTitle}>Подробная статистика</h3>
//                     </div>
//                 )}
//             </main>

//             {/* Модальное окно загрузки с Drag and Drop */}
//             {showUploadModal && (
//                 <div className={styles.modalOverlay}>
//                     <div className={styles.modal}>
//                         <div className={styles.modalHeader}>
//                             <h3 className={styles.modalTitle}>Загрузка новой базы знаний</h3>
//                             <button onClick={() => setShowUploadModal(false)} className={styles.closeButton}>
//                                 <X className="h-6 w-6" />
//                             </button>
//                         </div>

//                         {uploadProgress > 0 && (
//                             <div className={styles.progressBarContainer}>
//                                 <div
//                                     className={styles.progressBar}
//                                     style={{ width: `${uploadProgress}%` }}
//                                 >
//                                     {uploadProgress}%
//                                 </div>
//                             </div>
//                         )}

//                         <div
//                             className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ''}`}
//                             onDragEnter={handleDrag}
//                             onDragLeave={handleDrag}
//                             onDragOver={handleDrag}
//                             onDrop={handleDrop}
//                             onClick={() => fileInputRef.current?.click()}
//                         >
//                             <Upload className="h-12 w-12 text-gray-400 mb-2" />
//                             <p>Перетащите файлы сюда или нажмите для выбора</p>
//                             <input
//                                 type="file"
//                                 ref={fileInputRef}
//                                 className={styles.fileInput}
//                                 onChange={handleFileChange}
//                                 accept=".pdf,.txt,.docx,.xlsx"
//                             />
//                             <p className={styles.fileTypesHint}>Поддерживаемые форматы: PDF, TXT, DOCX, XLSX</p>
//                         </div>

//                         <div className={styles.modalActions}>
//                             <button
//                                 className={styles.cancelButton}
//                                 onClick={() => setShowUploadModal(false)}
//                             >
//                                 Отмена
//                             </button>
//                             {/* <button
//                                 className={styles.confirmButton}
//                                 disabled={!fileInputRef.current?.value}
//                             >
//                                 Загрузить */}
//                             <button
//                                 className={styles.confirmButton}
//                                 disabled={uploadProgress > 0} // Блокируем кнопку во время загрузки
//                                 onClick={() => fileInputRef.current?.click()}
//                             >
//                                 {uploadProgress > 0 ? 'Загрузка...' : 'Выбрать файл'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )
//             }
//         </div >
//     );
// };

// export default ProjectPage;



import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Menu, ChevronRight, Globe, LogOut, ChevronDown, Upload, Download, Trash2, Eye, ChevronLeft, X, User } from 'lucide-react';
import styles from './styles.module.css';
import { useAuthContext } from '../../helpers/authContext';

interface KnowledgeBase {
    id: string;
    name: string;
    date: string;
    size: string;
}

const ProjectPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'knowledge' | 'settings' | 'stats'>('knowledge');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([
        { id: '1', name: 'Техническая документация', date: '15.05.2025', size: '2.4 MB' },
        { id: '2', name: 'FAQ продукта', date: '10.05.2025', size: '1.1 MB' },
        { id: '3', name: 'История поддержки', date: '05.05.2025', size: '3.7 MB' },
    ]);
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Получаем имя пользователя из контекста авторизации
    const { state } = useAuthContext();
    const username = state.user?.username || 'Пользователь';

    const handleDelete = async (id: string) => {
        try {
            await fetch(`http://localhost:3000/api/files/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
                }
            });

            setKnowledgeBases(prev => prev.filter(base => base.id !== id));
        } catch (error) {
            console.error('Ошибка удаления:', error);
        }
    };

    const handleDownload = (id: string) => {
        console.log('Скачивание базы знаний:', id);
    };

    const handlePreview = (id: string) => {
        console.log('Предпросмотр базы знаний:', id);
    };

    const handleBackToProjects = () => {
        navigate('/dashboard');
    };

    const handleLogout = () => {
        // Здесь должна быть логика выхода
        navigate('/login');
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            handleFileUpload(file);
        }
    }, []);

    const handleFileUpload = async (file: File) => {
        console.log('пока не работает загрузка файлов')
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploadProgress(0);
            handleFileUpload(e.target.files[0]);
        }
        if (e.target) {
            e.target.value = '';
        }
    };

    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <div className={styles.navContainer}>
                    <div className={styles.navContent}>
                        <div className={styles.flex}>
                            <button
                                className={styles.backButton}
                                onClick={handleBackToProjects}
                            >
                                <ChevronLeft className="h-5 w-5 mr-1" />
                                Назад к проектам
                            </button>

                            <div className={styles.breadcrumbs}>
                                <span>Проекты</span>
                                <ChevronRight className="h-4 w-4 mx-2" />
                                <span className={styles.breadcrumbActive}>МосПолитех</span>
                            </div>
                        </div>

                        <div className={styles.navActions}>
                            {/* Блок пользователя */}
                            <div className={styles.userDropdown}>
                                <div className={styles.userInfo}>
                                    <User className="h-5 w-5 mr-2" />
                                    <span>{username}</span>
                                    <ChevronDown className="h-4 w-4 ml-1" />
                                </div>
                                <div className={styles.dropdownMenu}>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Выйти
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className={styles.mainContainer}>
                <h1 className={styles.projectTitle}>МосПолитех</h1>
                <p className={styles.projectDescription}>AI-ассистент по работе с текстовыми запросами пользователей</p>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'knowledge' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('knowledge')}
                    >
                        Базы знаний
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'settings' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        Настройки
                    </button>
                </div>

                {activeTab === 'knowledge' && (
                    <div className={styles.tabContent}>
                        <div className={styles.knowledgeBases}>
                            <h3 className={styles.sectionTitle}>Загруженные базы знаний</h3>

                            <div className={styles.knowledgeList}>
                                {knowledgeBases.map(base => (
                                    <div key={base.id} className={styles.knowledgeItem}>
                                        <div className={styles.knowledgeInfo}>
                                            <Database className="h-5 w-5 text-green-500 mr-3" />
                                            <div>
                                                <h4 className={styles.knowledgeName}>{base.name}</h4>
                                                <div className={styles.knowledgeMeta}>
                                                    <span>{base.date}</span>
                                                    <span className={styles.metaSeparator}>•</span>
                                                    <span>{base.size}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.knowledgeActions}>
                                            <button
                                                className={styles.actionButton}
                                                onClick={() => handlePreview(base.id)}
                                                title="Предпросмотр"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button
                                                className={styles.actionButton}
                                                onClick={() => handleDownload(base.id)}
                                                title="Скачать"
                                            >
                                                <Download className="h-4 w-4" />
                                            </button>
                                            <button
                                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                                onClick={() => handleDelete(base.id)}
                                                title="Удалить"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                className={styles.uploadButton}
                                onClick={() => setShowUploadModal(true)}
                            >
                                <Upload className="h-5 w-5 mr-2" />
                                Загрузить новую базу
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className={styles.tabContent}>
                        <h3 className={styles.sectionTitle}>Настройки проекта</h3>
                    </div>
                )}

                {showUploadModal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <div className={styles.modalHeader}>
                                <h3 className={styles.modalTitle}>Загрузка новой базы знаний</h3>
                                <button onClick={() => setShowUploadModal(false)} className={styles.closeButton}>
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {uploadProgress > 0 && (
                                <div className={styles.progressBarContainer}>
                                    <div
                                        className={styles.progressBar}
                                        style={{ width: `${uploadProgress}%` }}
                                    >
                                        {uploadProgress}%
                                    </div>
                                </div>
                            )}

                            <div
                                className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ''}`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                                <p>Перетащите файлы сюда или нажмите для выбора</p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className={styles.fileInput}
                                    onChange={handleFileChange}
                                    accept=".pdf,.txt,.docx,.xlsx"
                                />
                                <p className={styles.fileTypesHint}>Поддерживаемые форматы: PDF, TXT, DOCX, XLSX</p>
                            </div>

                            <div className={styles.modalActions}>
                                <button
                                    className={styles.cancelButton}
                                    onClick={() => setShowUploadModal(false)}
                                >
                                    Отмена
                                </button>
                                <button
                                    className={styles.confirmButton}
                                    disabled={uploadProgress > 0}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {uploadProgress > 0 ? 'Загрузка...' : 'Выбрать файл'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProjectPage;