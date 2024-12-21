import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Signup failed.');
            alert('Signup successful! Please log in.');
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert('An error occurred.');
        }
    };

    return (
        <div className='card'>
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className='card-title'>Signup</h2>
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
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignupForm;
