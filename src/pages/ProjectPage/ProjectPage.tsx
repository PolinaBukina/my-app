import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, ChevronRight, Globe, LogOut, Upload, Download, Trash2, Eye, X, User, ArrowLeft } from 'lucide-react';
import * as XLSX from 'xlsx';
import styles from './styles.module.css';
import { useAuth } from '../../helpers/authContext';
import { API_BASE_URL } from '../../types/api';

interface AnalyticsSession {
    session_uuid: string;
    time_appeal: string;
    source_appeal: string;
    user_id: string;
    duration_seconds: number;
    number_requests: number;
    classifier: string;
    session_outcome: string;
    summary: string;
    dialogue_transcription: string;
    avg_response_time_seconds: number;
    percentage_confidence: number;
    own_assessment: number;
    recommendation_BZ: string;
    grade_NPS: number | string;
}

interface Filters {
    source: string;
    outcome: string;
    startDate: string;
    endDate: string;
}

const ProjectPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'knowledge' | 'prompt' | 'analytics'>('knowledge');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    // const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([
    //     { id: '1', name: 'Техническая документация', date: '15.05.2025', size: '2.4 MB' },
    //     { id: '2', name: 'FAQ продукта', date: '10.05.2025', size: '1.1 MB' },
    //     { id: '3', name: 'История поддержки', date: '05.05.2025', size: '3.7 MB' },
    // ]);
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { logout } = useAuth();
    //загрузка файлов
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [promptText, setPromptText] = useState('Текущий промпт...');
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

    const [filters, setFilters] = useState<Filters>({
        source: 'all',
        outcome: 'all',
        startDate: '',
        endDate: ''
    });


    const [analyticsData, setAnalyticsData] = useState<AnalyticsSession[]>([
        {
            "session_uuid": "550e8400-e29b-41d4-a716-446655440001",
            "time_appeal": "08-06-2025 14:23:17",
            "source_appeal": "telegram",
            "user_id": "@student_ivan",
            "duration_seconds": 720,
            "number_requests": 5,
            "classifier": "поступление в магистратуру",
            "session_outcome": "завершен_успешно",
            "summary": "Консультация по поступлению в магистратуру, вопросы о документах и сроках подачи",
            "dialogue_transcription": "assistant: Здравствуйте! Я AI-ассистент Московского политехнического университета. Чем могу помочь?\nhuman: Привет! Хочу поступить к вам в магистратуру по направлению \"Информационные системы и технологии\". Какие документы нужны?\nassistant: Рад помочь с поступлением в магистратуру! Для поступления вам потребуются следующие документы: документ, удостоверяющий личность (паспорт), диплом о высшем образовании с приложением, СНИЛС (при наличии), фотография, документы, подтверждающие индивидуальные достижения (при наличии)...\nhuman: А какие сроки подачи документов?\nassistant: Документы на бюджетную основу принимаются до 13 августа 2025 года до 18:00, на платную основу — до 29 августа 2025 года...\nhuman: Можно подать онлайн?\nassistant: Конечно! Доступно несколько способов подачи: онлайн через личный кабинет абитуриента на сайте lk.mospolytech.ru, через портал Госуслуги...\nhuman: Понятно, спасибо!\nassistant: Пожалуйста! Рад был помочь. Желаю успехов в поступлении в Московский Политех!",
            "avg_response_time_seconds": 1.54,
            "percentage_confidence": 98,
            "own_assessment": 5,
            "recommendation_BZ": "Нет необходимости в расширении БЗ - полная информация предоставлена",
            "grade_NPS": 5
        },
        {
            "session_uuid": "660f9511-f30c-52e5-b827-557766551102",
            "time_appeal": "08-06-2025 16:45:32",
            "source_appeal": "website",
            "user_id": "anonymous_user_7834",
            "duration_seconds": 180,
            "number_requests": 3,
            "classifier": "вопросы по общежитию",
            "session_outcome": "передан_оператору",
            "summary": "Вопрос о содержании домашних животных в общежитии - информация отсутствует в БЗ",
            "dialogue_transcription": "assistant: Здравствуйте! Я AI-ассистент Московского политехнического университета. Чем могу помочь?\nhuman: Можно ли держать кота в общежитии?\nassistant: Спасибо за интересный вопрос! К сожалению, в моей текущей базе знаний нет конкретной информации о правилах содержания домашних животных в общежитиях МосПолитеха...\nhuman: Тогда передайте оператору\nassistant: Конечно! Передаю ваш вопрос о правилах содержания домашних животных в общежитии специалисту...",
            "avg_response_time_seconds": 2.15,
            "percentage_confidence": 15,
            "own_assessment": 3,
            "recommendation_BZ": "РЕКОМЕНДУЕТСЯ добавить информацию о правилах содержания домашних животных в общежитиях",
            "grade_NPS": "none"
        },
        {
            "session_uuid": "770a0622-041d-63f6-c938-668877662203",
            "time_appeal": "08-06-2025 11:12:08",
            "source_appeal": "whatsapp",
            "user_id": "+79161234567",
            "duration_seconds": 45,
            "number_requests": 2,
            "classifier": "нетематический_запрос",
            "session_outcome": "прерван_пользователем",
            "summary": "Нетематический запрос - вопрос о рецепте борща, корректное перенаправление на тематику университета",
            "dialogue_transcription": "assistant: Здравствуйте! Я AI-ассистент Московского политехнического университета. Чем могу помочь?\nhuman: Как приготовить борщ?\nassistant: Здравствуйте! Я - AI-ассистент Московского политехнического университета, и консультирую только по вопросам, связанным с нашим университетом...\nhuman: Понятно, тогда пока",
            "avg_response_time_seconds": 1.23,
            "percentage_confidence": 100,
            "own_assessment": 4,
            "recommendation_BZ": "Нет необходимости в расширении БЗ - корректная обработка нетематического запроса",
            "grade_NPS": "none"
        },
        {
            "session_uuid": "880b1733-152e-74g7-d049-779988773304",
            "time_appeal": "08-06-2025 13:55:44",
            "source_appeal": "vk",
            "user_id": "id123456789",
            "duration_seconds": 960,
            "number_requests": 8,
            "classifier": "поступление в бакалавриат",
            "session_outcome": "завершен_успешно",
            "summary": "Подробная консультация о поступлении в бакалавриат, общежитии, стипендиях и студенческой жизни",
            "dialogue_transcription": "assistant: Здравствуйте! Я AI-ассистент Московского политехнического университета. Чем могу помочь?\nhuman: Привет! Хочу поступать к вам после 11 класса. Расскажите про направления\nassistant: Здравствуйте! Рад помочь с информацией о поступлении в МосПолитех!...\nhuman: А какая стипендия у вас?\nassistant: В МосПолитехе действует многоуровневая система стипендиального обеспечения...\nhuman: Есть ли общежития?\nassistant: Да, конечно! В МосПолитехе отлично развита система студенческих общежитий...\nhuman: А какие есть кружки и секции?\nassistant: В университете активно работают более 50 студенческих объединений...",
            "avg_response_time_seconds": 1.78,
            "percentage_confidence": 96,
            "own_assessment": 4,
            "recommendation_BZ": "Нет необходимости в расширении БЗ - все вопросы успешно обработаны",
            "grade_NPS": 4
        },
        {
            "session_uuid": "990c2844-263f-85h8-e15a-88aa99884405",
            "time_appeal": "08-06-2025 20:17:29",
            "source_appeal": "telegram",
            "user_id": "@disappointed_student",
            "duration_seconds": 300,
            "number_requests": 4,
            "classifier": "пересдача экзаменов",
            "session_outcome": "передан_оператору",
            "summary": "Вопрос о пересдаче экзаменов - частичная информация в БЗ, пользователь неудовлетворен ответом",
            "dialogue_transcription": "assistant: Здравствуйте! Я AI-ассистент Московского политехнического университета. Чем могу помочь?\nhuman: Как пересдать экзамен который завалил?\nassistant: Понимаю ваше беспокойство! В МосПолитехе действует система пересдач экзаменов...\nhuman: А сколько попыток пересдачи?\nassistant: К сожалению, точной информации о количестве попыток пересдачи в моей базе знаний нет...\nhuman: Это какой-то неполный ответ\nassistant: Извините за неполноту информации. Передаю ваш вопрос специалисту для получения точного ответа...",
            "avg_response_time_seconds": 2.45,
            "percentage_confidence": 45,
            "own_assessment": 2,
            "recommendation_BZ": "РЕКОМЕНДУЕТСЯ добавить подробную информацию о процедуре и количестве попыток пересдачи экзаменов",
            "grade_NPS": 2
        }
    ]);

    // 2. Обновляем обработчики фильтров
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const { state } = useAuth();
    const username = state.user?.username || sessionStorage.getItem('username') || 'Пользователь';

    const handleDelete = async (id: string) => {
        // try {
        //     const response = await fetch(`${API_BASE_URL}/rag_service/clear_index/`, {
        //         method: 'POST',
        //         headers: {
        //             'Authorization': `Bearer ${state.token}`
        //         }
        //     });

        //     if (!response.ok) {
        //         throw new Error('Ошибка очистки индекса');
        //     }

        //     // После очистки можно обновить список документов
        //     await fetchKnowledgeBases();
        //     alert('Все индексы и данные успешно очищены');
        // } catch (error) {
        //     console.error('Ошибка:', error);
        //     alert('Произошла ошибка при очистке');
        // }
    };

    const handleDownload = async (id: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/rag_service/get_index/?id=${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${state.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка при получении файла');
            }

            // Получаем данные файла
            const fileData = await response.json();

            // Создаем временную ссылку для скачивания
            const blob = new Blob([JSON.stringify(fileData, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;

            // Находим имя файла в knowledgeBases
            const file = knowledgeBases.find(kb => kb.id === id);
            a.download = file ? `${file.name}.json` : `file_${id}.json`;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            console.log('Файл успешно скачан');
        } catch (error) {
            console.error('Ошибка скачивания:', error);
            alert('Произошла ошибка при скачивании файла');
        }
    };

    // Добавляем состояние для модального окна превью
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [previewContent, setPreviewContent] = useState<string>('');
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);
    const [previewError, setPreviewError] = useState<string | null>(null);

    const handlePreview = async (id: string) => {
        // setIsLoadingPreview(true);
        // setPreviewError(null);

        // try {
        //     // Проверяем, что id не пустой
        //     if (!id || typeof id !== 'string') {
        //         throw new Error('Неверный идентификатор файла');
        //     }

        //     // Кодируем id для URL
        //     const encodedId = encodeURIComponent(id);

        //     const response = await fetch(`${API_BASE_URL}/rag_service/get_index/?id=${encodedId}`, {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': `Bearer ${state.token}`,
        //             'Content-Type': 'application/json'
        //         }
        //     });

        //     if (!response.ok) {
        //         const errorData = await response.json().catch(() => ({}));
        //         throw new Error(errorData.message || 'Ошибка при получении содержимого файла');
        //     }

        //     const data = await response.json();

        //     // Проверяем и форматируем данные
        //     if (typeof data === 'object' && data !== null) {
        //         setPreviewContent(JSON.stringify(data, null, 2));
        //     } else if (typeof data === 'string') {
        //         setPreviewContent(data);
        //     } else {
        //         setPreviewContent('Содержимое файла недоступно для предпросмотра');
        //     }

        //     setPreviewModalOpen(true);
        // } catch (error) {
        //     console.error('Ошибка при загрузке превью:', error);
        //     setPreviewError(error instanceof Error ? error.message : 'Неизвестная ошибка');
        // } finally {
        //     setIsLoadingPreview(false);
        // }
    };

    // Компонент модального окна для превью
    const PreviewModal = () => {
        if (!previewModalOpen) return null;

        return (
            <div className={styles.modalOverlay}>
                <div className={styles.modal} style={{ maxWidth: '800px', width: '90%' }}>
                    <div className={styles.modalHeader}>
                        <h3 className={styles.modalTitle}>Просмотр файла</h3>
                        <button
                            onClick={() => setPreviewModalOpen(false)}
                            className={styles.closeButton}
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className={styles.modalContent}>
                        {isLoadingPreview ? (
                            <div className={styles.loaderContainer}>
                                <div className={styles.loader}>
                                    <div className={styles.loaderCircle}></div>
                                    <div className={styles.loaderText}>Загрузка содержимого...</div>
                                </div>
                            </div>
                        ) : previewError ? (
                            <div className={styles.errorMessage}>{previewError}</div>
                        ) : (
                            <pre className={styles.previewContent}>
                                {previewContent}
                            </pre>
                        )}
                    </div>

                    <div className={styles.modalActions}>
                        <button
                            className={styles.cancelButton}
                            onClick={() => setPreviewModalOpen(false)}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const handleBackToProjects = () => {
        navigate('/dashboard');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
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

        if (isUploading) return;

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            handleFileUpload(file);
        }
    }, [isUploading]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isUploading) return;

        if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
        }
        if (e.target) {
            e.target.value = '';
        }
    };

    const handleSavePrompt = async () => {
        try {
            console.log('Сохранён промпт:', promptText);
            setIsEditing(false);
        } catch (error) {
            console.error('Ошибка сохранения:', error);
        }
    };

    // 3. Функция для фильтрации данных перед экспортом
    const getFilteredData = () => {
        return analyticsData.filter(session => {
            const matchesSource = filters.source === 'all' || session.source_appeal === filters.source;
            const matchesOutcome = filters.outcome === 'all' || session.session_outcome === filters.outcome;

            // Преобразуем дату сессии в Date объект
            const sessionDate = new Date(session.time_appeal.split(' ')[0].split('-').reverse().join('-'));

            // Проверяем диапазон дат
            let matchesDate = true;
            if (filters.startDate) {
                const startDate = new Date(filters.startDate);
                matchesDate = matchesDate && sessionDate >= startDate;
            }
            if (filters.endDate) {
                const endDate = new Date(filters.endDate);
                matchesDate = matchesDate && sessionDate <= endDate;
            }

            return matchesSource && matchesOutcome && matchesDate;
        });
    };

    // 4. Обновляем функцию экспорта
    const exportToExcel = () => {
        const filteredData = getFilteredData();
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Аналитика сессий");
        XLSX.writeFile(workbook, "Аналитика_МосПолитех.xlsx");
    };

    const toggleMenu = () => {
        setIsMenuCollapsed(!isMenuCollapsed);
    };

    const goHome = () => navigate(-1)


    // Добавляем в интерфейс состояния
    interface KnowledgeBase {
        id: string;
        name: string;
        date: string;
        size: string;
        file_type: string;
    }

    // Модифицируем состояние
    const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([]);
    const [isLoadingBases, setIsLoadingBases] = useState(false);
    const [error, setError] = useState<string>(''); // Добавляем эту строку

    const fetchKnowledgeBases = useCallback(async () => {
        setIsLoadingBases(true);
        try {
            const response = await fetch(`${API_BASE_URL}/rag_service/list/`, {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка загрузки списка баз знаний');
            }

            const data = await response.json();

            const files = data
                .filter((item: string) => item.startsWith("Files:"))
                .map((fileString: string) => {
                    const parts = fileString.split(" - ");
                    const id = parts[0].replace("Files: ", "").trim();
                    const fullName = parts[1].trim();

                    const nameParts = fullName.split("_");
                    const name = nameParts.length > 1
                        ? nameParts.slice(1).join("_")
                        : fullName;
                    const fileType = name.split('.').pop()?.toUpperCase() || 'FILE';

                    return {
                        id,
                        name,
                        date: new Date().toLocaleDateString(),
                        //size: 'N/A', // Size might not be available in this response
                        file_type: fileType
                    };
                });

            setKnowledgeBases(files);
        } catch (error) {
            console.error('Error fetching knowledge bases:', error);
            setError('Ошибка при загрузке списка файлов');
        } finally {
            setIsLoadingBases(false);
        }
    }, [state.token]);

    // Вызываем при монтировании компонента
    useEffect(() => {
        fetchKnowledgeBases();
    }, [fetchKnowledgeBases]);

    // Функция для загрузки файлов
    const handleFileUpload = async (file: File) => {
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(0);
        setUploadError(null);

        const formData = new FormData();
        formData.append('files', file);

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (!token) {
                throw new Error('Необходима авторизация');
            }

            const response = await fetch(`${API_BASE_URL}/rag_service/upload_files/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || 'Ошибка при загрузке файла');
            }

            // Обновляем список баз знаний после успешной загрузки
            await fetchKnowledgeBases();
            setShowUploadModal(false);
            setUploadProgress(100);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            setUploadError(error instanceof Error ? error.message : 'Неизвестная ошибка');
        } finally {
            setIsUploading(false);
        }
    };

    // Вспомогательная функция для форматирования размера файла
    // const formatFileSize = (bytes: number): string => {
    //     if (bytes < 1024) return `${bytes} Б`;
    //     if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
    //     return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
    // };

    return (
        <div className={styles.container}>
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
                        <button className={styles.sideMenuItem} onClick={goHome}>
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
                        className={`${styles.tab} ${activeTab === 'analytics' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('analytics')}
                    >
                        Аналитика
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'prompt' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('prompt')}
                    >
                        Промпт
                    </button>
                </div>

                {/* {activeTab === 'knowledge' && (
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
                )} */}

                {activeTab === 'knowledge' && (
                    <div className={styles.tabContent}>
                        <div className={styles.knowledgeBases}>
                            <h3 className={styles.sectionTitle}>Загруженные базы знаний</h3>

                            <div className={styles.knowledgeList}>
                                {isLoadingBases ? (
                                    <div className={styles.loaderContainer}>
                                        <div className={styles.loader}>
                                            <div className={styles.loaderCircle}></div>
                                            <div className={styles.loaderText}>Загрузка файлов...</div>
                                        </div>
                                    </div>
                                ) : error ? (
                                    <div className={styles.errorMessage}>{error}</div>
                                ) : knowledgeBases.length > 0 ? (
                                    knowledgeBases.map(base => (
                                        <div key={base.id} className={styles.knowledgeItem}>
                                            <div className={styles.knowledgeInfo}>
                                                <Database className="h-5 w-5 text-green-500 mr-3" />
                                                <div>
                                                    <h4 className={styles.knowledgeName}>{base.name}</h4>
                                                    <div className={styles.knowledgeMeta}>
                                                        <span>{base.date}</span>
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
                                    ))
                                ) : (
                                    <div className={styles.emptyState}>
                                        Нет загруженных баз знаний
                                    </div>
                                )}
                            </div>

                            <button
                                className={styles.uploadButton}
                                onClick={() => setShowUploadModal(true)}
                                disabled={isLoadingBases}
                            >
                                <Upload className="h-5 w-5 mr-2" />
                                Загрузить новую базу
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className={styles.analyticsTabContainer}>
                        <div className={styles.analyticsHeader}>
                            <h3 className={styles.sectionTitle}>Аналитика сессий</h3>
                            <button
                                className={styles.exportButton}
                                onClick={exportToExcel}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Экспорт в Excel
                            </button>
                        </div>

                        <div className={styles.analyticsGrid}>
                            <div className={styles.analyticsFilters}>
                                <div className={styles.filterGroup}>
                                    <label className={styles.filterLabel}>Источник:</label>
                                    <select
                                        className={styles.filterSelect}
                                        name="source"
                                        value={filters.source}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="all">Все</option>
                                        <option value="telegram">Telegram</option>
                                        <option value="whatsapp">WhatsApp</option>
                                        <option value="vk">VK</option>
                                        <option value="website">Сайт</option>
                                    </select>
                                </div>

                                <div className={styles.filterGroup}>
                                    <label className={styles.filterLabel}>Результат:</label>
                                    <select
                                        className={styles.filterSelect}
                                        name="outcome"
                                        value={filters.outcome}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="all">Все</option>
                                        <option value="завершен_успешно">Успешно завершён</option>
                                        <option value="передан_оператору">Передан оператору</option>
                                        <option value="прерван_пользователем">Прерван пользователем</option>
                                    </select>
                                </div>

                                <div className={styles.filterGroup}>
                                    <label className={styles.filterLabel}>Период отчёта:</label>
                                    <div className={styles.inputsGroup}>
                                        <input
                                            type="date"
                                            className={styles.filterInput}
                                            name="startDate"
                                            value={filters.startDate}
                                            onChange={handleFilterChange}
                                        />
                                        <input
                                            type="date"
                                            className={styles.filterInput}
                                            name="endDate"
                                            value={filters.endDate}
                                            onChange={handleFilterChange}
                                        />
                                    </div>
                                </div>
                                {/* <div className={styles.filterGroup}>
                                    <label className={styles.filterLabel}>Дата до:</label>
                                    <input
                                        type="date"
                                        className={styles.filterInput}
                                        name="endDate"
                                        value={filters.endDate}
                                        onChange={handleFilterChange}
                                    />
                                </div> */}
                            </div>
                        </div>

                        <div className={styles.analyticsStats}>
                            <div className={styles.statCard}>
                                <h4>Всего сессий</h4>
                                <p>{analyticsData.length}</p>
                            </div>
                            <div className={styles.statCard}>
                                <h4>Средняя длительность</h4>
                                <p>{Math.floor(analyticsData.reduce((acc, curr) => acc + curr.duration_seconds, 0) / analyticsData.length / 60)} мин</p>
                            </div>
                            <div className={styles.statCard}>
                                <h4>Средняя уверенность</h4>
                                <p>{Math.round(analyticsData.reduce((acc, curr) => acc + curr.percentage_confidence, 0) / analyticsData.length)}%</p>
                            </div>
                            <div className={styles.statCard}>
                                <h4>Средняя оценка</h4>
                                <p>
                                    {(() => {
                                        const grades = analyticsData.filter(s => typeof s.grade_NPS === 'number') as { grade_NPS: number }[];
                                        return grades.length > 0
                                            ? (grades.reduce((acc, curr) => acc + curr.grade_NPS, 0) / grades.length)
                                            : 0;
                                    })().toFixed(1)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'prompt' && (
                    <div className={styles.promptTabContainer}>
                        <div className={styles.promptColumn}>
                            <div className={styles.promptContent}>
                                <h3 className={styles.sectionTitle}>Системный промпт</h3>
                                <p className={styles.promptHint}>
                                    {!isEditing
                                        ? `Используйте кнопку "Редактировать" для изменения промпта.`
                                        : `Начните вводить промпт, чтобы задать поведение бота.`
                                    }
                                </p>
                                <textarea
                                    className={`${styles.promptInput} ${!isEditing && promptText ? styles.promptDisabled : ''}`}
                                    value={promptText}
                                    onChange={(e) => setPromptText(e.target.value)}
                                    disabled={!isEditing && !!promptText}
                                    placeholder="Введите системный промпт для AI-ассистента..."
                                />
                                {promptText && (
                                    <button
                                        className={styles.uploadButton}
                                        onClick={isEditing ? handleSavePrompt : () => setIsEditing(true)}
                                    >
                                        {isEditing ? 'Сохранить' : 'Редактировать'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* {showUploadModal && (
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
                )} */}
                {showUploadModal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <div className={styles.modalHeader}>
                                <h3 className={styles.modalTitle}>Загрузка новой базы знаний</h3>
                                <button
                                    onClick={() => {
                                        setShowUploadModal(false);
                                        setUploadError(null);
                                    }}
                                    className={styles.closeButton}
                                    disabled={isUploading}
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {uploadError && (
                                <div className={styles.errorMessage}>
                                    {uploadError}
                                </div>
                            )}

                            {uploadProgress > 0 && uploadProgress < 100 && (
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
                                onClick={() => !isUploading && fileInputRef.current?.click()}
                            >
                                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                                <p>Перетащите файлы сюда или нажмите для выбора</p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className={styles.fileInput}
                                    onChange={handleFileChange}
                                    accept=".pdf,.txt,.docx,.xlsx"
                                    disabled={isUploading}
                                />
                                <p className={styles.fileTypesHint}>Поддерживаемые форматы: PDF, TXT, DOCX, XLSX</p>
                            </div>

                            <div className={styles.modalActions}>
                                <button
                                    className={styles.cancelButton}
                                    onClick={() => {
                                        setShowUploadModal(false);
                                        setUploadError(null);
                                    }}
                                    disabled={isUploading}
                                >
                                    Отмена
                                </button>
                                <button
                                    className={styles.confirmButton}
                                    disabled={isUploading}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {isUploading ? 'Загрузка...' : 'Выбрать файл'}
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