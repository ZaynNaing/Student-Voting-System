import React from 'react';
import { useAuth } from '../context/AuthContext';

interface PolicyProps {
    id: string;
    title: string;
    description: string;
    category: string;
    votes: number;
}

const PolicyItem: React.FC<PolicyProps> = ({ id, title, description, category, votes }) => {
    const { token } = useAuth();

    const handleVote = async (type: 'up' | 'down') => {
        if (!token) return alert('You must be logged in to vote');
        const endpoint = `https://student-policies.onrender.com/policies/${id}/${type === 'up' ? 'upvote' : 'downvote'}`;
        await fetch(endpoint, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
    };

    return (        
        <div className="bg-black shadow-md rounded-lg p-6 flex flex-col space-y-4">
            <div className="bg-blue-100 p-6">
                Tailwind Test
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-700">{description}</p>
            <span className="text-sm text-gray-500">{category}</span>
            <p>Votes: {votes}</p>
            {token && (
                <div>
                    <button onClick={() => handleVote('up')} className="flex items-center px-4 py-2 bg-green-500 text-black rounded-md shadow hover:bg-green-600 transition-all">
                        Upvote</button>
                    <button onClick={() => handleVote('down')} className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition-all">
                        Downvote</button>
                </div>
            )}
        </div>
    );
};

export default PolicyItem;
