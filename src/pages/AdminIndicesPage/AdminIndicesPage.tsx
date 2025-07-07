import React, { useState, useEffect } from 'react';
import { useAuth } from '../../helpers/authContext';
import styles from './styles.module.css';

interface Index {
    id: number;
    external_id: string;
    name: string;
    config: {
        file_ids: string[];
        created_at: string;
    };
}

const AdminIndicesPage: React.FC = () => {
    const [indices, setIndices] = useState<Index[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { state } = useAuth();

    useEffect(() => {
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
    }, [state.token]);

    if (loading) return <div className={styles.loading}>Загрузка...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div className={styles.adminContainer}>
            <h2>Управление индексами (Админ-панель)</h2>

            <div className={styles.indicesList}>
                {indices.map(index => (
                    <div key={index.id} className={styles.indexCard}>
                        <h3>{index.name}</h3>
                        <p><strong>ID:</strong> {index.external_id}</p>
                        <p><strong>Создан:</strong> {new Date(index.config.created_at).toLocaleString()}</p>
                        <p><strong>Файлы:</strong> {index.config.file_ids.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminIndicesPage;