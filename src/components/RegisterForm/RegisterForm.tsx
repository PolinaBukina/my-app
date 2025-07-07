import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../types/api';
import { ApiError, RegisterUserData } from '../../types/registration';

const RegisterForm = () => {
    const [formData, setFormData] = useState<RegisterUserData & { confirmPassword: string }>({
        username: '',
        password: '',
        confirmPassword: '',
        role: 'user',
    });
    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        // Очищаем ошибки при изменении поля
        if (validationErrors[name]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        // Валидация на клиенте
        if (formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            return;
        }

        if (formData.username.length < 3) {
            setValidationErrors(prev => ({
                ...prev,
                username: 'Имя пользователя должно быть не менее 3 символов',
            }));
            return;
        }

        if (formData.password.length < 6) {
            setValidationErrors(prev => ({
                ...prev,
                password: 'Пароль должен быть не менее 6 символов',
            }));
            return;
        }

        setIsLoading(true);

        try {
            await registerUser({
                username: formData.username,
                password: formData.password,
                role: formData.role,
            });

            // Редирект после успешной регистрации
            navigate('/dashboard/users', { state: { registrationSuccess: true } });
        } catch (err) {
            const apiError = err as ApiError;

            if (apiError.errors) {
                // Обработка ошибок валидации с сервера
                const newValidationErrors: Record<string, string> = {};
                apiError.errors.forEach(error => {
                    const field = error.loc[error.loc.length - 1] as string;
                    newValidationErrors[field] = error.msg;
                });
                setValidationErrors(newValidationErrors);
            } else {
                setError(apiError.message || 'Произошла ошибка при регистрации');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Регистрация</h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Имя пользователя
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${validationErrors.username ? 'border-red-500' : 'border'
                            }`}
                        required
                    />
                    {validationErrors.username && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.username}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Пароль
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${validationErrors.password ? 'border-red-500' : 'border'
                            }`}
                        required
                    />
                    {validationErrors.password && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Подтвердите пароль
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="role"
                            checked={formData.role === 'admin'}
                            onChange={() => setFormData(prev => ({
                                ...prev,
                                role: prev.role === 'user' ? 'admin' : 'user',
                            }))}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Администратор</span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
                Уже есть аккаунт?{' '}
                <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Войти
                </a>
            </div>
        </div>
    );
};

export default RegisterForm;