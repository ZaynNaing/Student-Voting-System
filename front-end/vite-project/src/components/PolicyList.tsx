import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PolicyItem from './PolicyItem';

interface Policy {
    policyId: string;
    title: string;
    description: string;
    owner: string;
    date: string;
    category: string;
    votes: number;
}

const PolicyList: React.FC = () => {
    const [policies, setPolicies] = useState<Policy[]>([]);

    useEffect(() => {
        const fetchPolicies = async () => {
            const response = await axios.get('http://localhost:8080/api/policies');
            console.log(response)
            setPolicies(response.data);
        };
        fetchPolicies();
    }, []);

    return (
        <div className="p-4">
            {policies.map((policy) => (
                <PolicyItem key={policy.policyId} {...policy} />
            ))}
        </div>
    );
};

export default PolicyList;
