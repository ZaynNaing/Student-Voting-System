import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { describe } from 'node:test';
import axios from 'axios';

const AddPolicyForm: React.FC = () => {
    const { isLoggedIn, token, email, id, name } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "General",
        date: "",
        owner:""
    });
    const [error, setError] = useState<string>("");


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoggedIn) {
            alert('You must be logged in to add a policy.');
            navigate('/login');
            return;
        }

        if (!formData.title || !formData.description || !formData.date) {
            setError("Please fill in all fields.");
            return;
        }

        formData.owner = email!;

        try {
            // const response = await fetch(`http://localhost:8080/api/policies`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: `Bearer ${token}`,
            //     },
            //     body: JSON.stringify(formData),
            // });
                const response = await axios.post(
                    `http://localhost:8080/api/policies`,
                    {
                        userId: id,
                        categoryName: formData.category,
                        title: formData.title,
                        describe: formData.description,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Content: 'application/json',
                        },
                        withCredentials: true,
                    }
                );

            // if (!response.ok) throw new Error('Failed to add policy.');
            alert('Policy added successfully!');
            navigate('/');
            setFormData({ title: "", description: "", category: "General", date: "" , owner: ""}); // Clear form fields
        } catch (error : any) {
            console.error(error);
            // alert('An error occurred.');
            // setError("Failed to add policy. Please try again.");

            if (error.response) {
                console.error('Error:', error.response.data || error.message);
                // Handle known errors from the backend
                if (error.response.status === 400) {
                    alert(error.response.data.error); // Show backend error message
                } else {
                    // Handle other server-side errors
                    console.error('Error:', error.response.data || error.message);
                    // alert('An error occurred while voting. Please try again.');
                    setError("Failed to add policy. Please try again.");
                }
            } else {
                // Handle network or other unexpected errors
                console.error('Unexpected error:', error);
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };

    // return (
    //     <form onSubmit={handleSubmit} className="form-container">
    //         <h2>Add Policy</h2>
    //         <input
    //             type="text"
    //             name="title"
    //             placeholder="Title"
    //             value={formData.title}
    //             onChange={handleChange}
    //             required
    //         />
    //         <textarea
    //             name="description"
    //             placeholder="Description"
    //             value={formData.description}
    //             onChange={handleChange}
    //             required
    //         />
    //         <label htmlFor="category">Category</label>
    //         <select
    //             id="category"
    //             name="category"
    //             title="Category"
    //             value={formData.category}
    //             onChange={handleChange}>
    //             <option value="General">General</option>
    //             <option value="Food">Food</option>
    //             <option value="Library">Library</option>
    //             <option value="Meditation">Meditation</option>
    //             <option value="Education">Education</option>
    //             <option value="Visa & Travel">Visa & Travel</option>
    //             <option value="Students Lounge">Students Lounge</option>
    //         </select>
    //         <button type="submit">Submit Policy</button>
    //     </form>
    // );

    return (
        <div className='card'>
            <h1 className='card-title'>Add New Policy</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="select-container">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        className="select"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="General">General</option>
                        <option value="Food">Food</option>
                        <option value="Library">Library</option>
                        <option value="Meditation">Meditation</option>
                        <option value="Education">Education</option>
                        <option value="Visa & Travel">Visa & Travel</option>
                        <option value="Students Lounge">Students Lounge</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit Policy</button>
            </form>
        </div>
    );
};

export default AddPolicyForm;
