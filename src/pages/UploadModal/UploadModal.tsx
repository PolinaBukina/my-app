import React, { useState, useRef, ChangeEvent } from 'react';
import { Upload, X, AlertTriangle, FileText, File, Loader2 } from 'lucide-react';
import styles from './UploadModal.module.css';
import { useAuthContext } from '../../helpers/authContext';

interface UploadModalProps {
    onClose: () => void;
    projectName?: string;
    onUploadSuccess?: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
    onClose,
    projectName = "МосПолитех",
    onUploadSuccess
}) => {
    const [kbName, setKbName] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { state } = useAuthContext();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKbName(e.target.value);
        if (error) setError('');
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];

            // Проверка размера файла
            if (selectedFile.size > 10 * 1024 * 1024) {
                setError('Размер файла превышает допустимый лимит в 10 МБ');
                return;
            }

            // Проверка типа файла
            const allowedTypes = [
                'application/pdf',
                'text/plain',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];

            if (!allowedTypes.includes(selectedFile.type)) {
                setError('Недопустимый тип файла. Разрешены: PDF, TXT, Excel, Word');
                return;
            }

            setFile(selectedFile);
            setError('');
        }
    };

    const handleUpload = async () => {
        if (!kbName.trim()) {
            setError('Пожалуйста, введите название базы знаний');
            return;
        }

        if (!file) {
            setError('Пожалуйста, выберите файл для загрузки');
            return;
        }

        setIsUploading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', kbName);
            formData.append('description', `База знаний для проекта ${projectName}`);

            const response = await fetch('http://localhost:3000/api/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${state.token}`
                },
                body: formData
            });

            // Проверяем Content-Type перед парсингом JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(`Server returned ${response.status}: ${text}`);
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка загрузки файла');
            }

            console.log('Файл успешно загружен:', data);
            if (onUploadSuccess) onUploadSuccess();
            onClose();
        } catch (err) {
            console.error('Ошибка загрузки:', err);
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        } finally {
            setIsUploading(false);
        }
    };

    const removeFile = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const getFileIcon = () => {
        if (!file) return null;

        const type = file.type.split('/')[1];
        const className = `${styles.fileIcon} text-blue-500`;

        switch (type) {
            case 'pdf':
                return <FileText className={className} />;
            case 'plain':
                return <FileText className={className} />;
            case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return <FileText className={className} />;
            case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
                return <FileText className={className} />;
            default:
                return <File className={className} />;
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} Б`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>Загрузка базы знаний</h3>
                    <button onClick={onClose} className={styles.closeButton}>
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className={styles.projectInfo}>
                    <p className={styles.projectText}>
                        Проект: <span className={styles.projectName}>{projectName}</span>
                    </p>
                </div>

                {error && (
                    <div className={styles.errorAlert}>
                        <AlertTriangle className={styles.errorIcon} />
                        <p className={styles.errorText}>{error}</p>
                    </div>
                )}

                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>
                        Название базы знаний <span className={styles.requiredField}>*</span>
                    </label>
                    <input
                        type="text"
                        value={kbName}
                        onChange={handleNameChange}
                        className={styles.textInput}
                        placeholder="Введите название"
                    />
                    <p className={styles.inputHint}>Например: "Информация о курсах" или "FAQ"</p>
                </div>

                <div className={styles.fileUploadContainer}>
                    <label className={styles.inputLabel}>
                        Файл <span className={styles.requiredField}>*</span>
                    </label>

                    {file ? (
                        <div className={styles.filePreview}>
                            <div className={styles.filePreviewContent}>
                                {getFileIcon()}
                                <div className={styles.fileInfo}>
                                    <p className={styles.fileName}>{file.name}</p>
                                    <p className={styles.fileDetails}>
                                        {formatFileSize(file.size)} • {file.type.split('/')[1].toUpperCase()}
                                    </p>
                                </div>
                                <button onClick={removeFile} className={styles.removeFileButton}>
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={styles.dropzone}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Upload className={`${styles.uploadIcon} h-12 w-12`} />
                            <p className={styles.dropzoneText}>
                                Перетащите файл сюда или нажмите для выбора
                            </p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className={styles.fileInput}
                                accept=".pdf,.txt,.xlsx,.docx"
                            />
                            <button className={styles.selectFileButton}>
                                Выбрать файл
                            </button>
                            <p className={styles.fileTypesHint}>
                                PDF, TXT, Excel или Word (макс. 10 МБ)
                            </p>
                        </div>
                    )}
                </div>

                <div className={styles.infoBox}>
                    <p className={styles.infoText}>
                        После загрузки система автоматически обработает файл и включит его содержимое в базу знаний AI-ассистента.
                    </p>
                </div>

                <div className={styles.modalFooter}>
                    <button
                        onClick={onClose}
                        className={styles.cancelButton}
                        disabled={isUploading}
                    >
                        Отмена
                    </button>
                    <button
                        onClick={handleUpload}
                        className={`${styles.uploadButton} ${(!kbName || !file || isUploading) ? styles.uploadButtonDisabled : ''}`}
                        disabled={!kbName || !file || isUploading}
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                Загрузка...
                            </>
                        ) : 'Загрузить'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadModal;