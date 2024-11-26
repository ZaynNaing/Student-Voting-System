import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginForm: React.FC = () => {
    // const { login } = useContext(AuthContext);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await login(formData.email, formData.password);
            alert('Login successful!');
            navigate('/');
        } catch (error) {
            console.error(error);
            // setError('Invalid email or password. Please try again.');
            alert('Login failed. Check your credentials.');
        }
    };

    return (
        <div className='card'>
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className='card-title'>Login</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
       
    );
};

export default LoginForm;
