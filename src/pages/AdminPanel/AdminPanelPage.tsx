// // src/pages/AdminPanel/AdminPanel.tsx
// import React, { useState } from 'react';
// import { useAuthContext } from '../../helpers/authContext';
// import styles from './styles.module.css';

// const AdminPanel = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const { state } = useAuthContext();


//     const validatePassword = (pass: string) => {
//         const minLength = 8;
//         const hasUpperCase = /[A-Z]/.test(pass);
//         const hasNumber = /\d/.test(pass);

//         return {
//             isValid: pass.length >= minLength && hasUpperCase && hasNumber,
//             message: `Password must:
//             - Be at least ${minLength} characters
//             - Contain at least one uppercase letter
//             - Contain at least one number`
//         };
//     };

//     // В функции addUser
//     const validation = validatePassword(password);
//     if (!validation.isValid) {
//         setError(validation.message);
//         return;
//     }

//     const addUser = async () => {
//         try {
//             const response = await fetch('http://localhost:3000/admin/add-user', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${state.token}`
//                 },
//                 body: JSON.stringify({ username, password }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.error || 'Failed to add user');
//             }

//             setMessage(`User ${username} added successfully!`);
//             setUsername('');
//             setPassword('');
//             setError('');
//         } catch (error) {
//             setError(error instanceof Error ? error.message : 'Unknown error');
//             setMessage('');
//         }
//     };

//     if (!state.isAuthenticated) {
//         return <div>Please login as admin</div>;
//     }

//     return (
//         <div className={styles.container}>
//             <h2>Add New User</h2>

//             {message && <div className={styles.success}>{message}</div>}
//             {error && <div className={styles.error}>{error}</div>}

//             <div className={styles.formGroup}>
//                 <label>Username:</label>
//                 <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//             </div>

//             <div className={styles.formGroup}>
//                 <label>Password:</label>
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//             </div>

//             <button onClick={addUser} className={styles.button}>
//                 Add User
//             </button>
//         </div>
//     );
// };

// export default AdminPanel;


import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../helpers/authContext';
import styles from './styles.module.css';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => { // Явно указываем возвращаемый тип
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { state } = useAuthContext();

    if (!state.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!state.isAdmin) {
        return <Navigate to="/" replace />;
    }

    const addUser = async () => {
        try {
            const response = await fetch('http://localhost:3000/admin/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.token}`
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to add user');
            }

            setMessage(`User ${username} added successfully!`);
            setUsername('');
            setPassword('');
            setError('');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Unknown error');
            setMessage('');
        }
    };

    return (
        <div className={styles.container}>
            <h2>Add New User</h2>

            {message && <div className={styles.success}>{message}</div>}
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.formGroup}>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button onClick={addUser} className={styles.button}>
                Add User
            </button>
        </div>
    );
};

export default AdminPanel;