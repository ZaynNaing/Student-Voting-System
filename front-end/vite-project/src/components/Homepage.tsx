import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import '../tailwind.css';

interface Policy {
    policyId: string;
    title: string;
    description: string;
    category: string;
    owner: string;
    date: string;
    votes: number;
}

const HomePage: React.FC = () => {
    const [policies, setPolicies] = useState<Policy[]>([]);

    const [years, setYears] = useState<number[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | undefined>();


    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const { isLoggedIn, token, email, id, name } = useAuth();

    const fetchPolicies = async (year?: number) => {
        try {
            const queryParam = year ? `?year=${year}` : '';
            // const response = await axios.get(`http://localhost:8080/api/policies${queryParam}`);
            const response = await axios.get(`http://localhost:8080/api/policies`);
            // setPolicies(response.data.filteredPolicies);
            console.log(response.data);
            setPolicies(response.data);
            if (!year) {
                setYears(extractYears(response.data));
            }
            setLoading(false);
        } catch (error) {
            setError(`Failed to load policies. Please try again. ${error}`);
            setLoading(false);
        }
        
    };
    useEffect(() => {
        fetchPolicies();
    }, []);

    const extractYears = (policies: Policy[]) => {
        const years = policies.map(policy => new Date(policy.date).getFullYear());
        return Array.from(new Set(years)).sort((a, b) => b - a);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const year = parseInt(e.target.value, 10);
        setSelectedYear(year);
        fetchPolicies(year);
    };

    const handleVote = async (policyId: string, type: "upvote" | "downvote") => {
        if (!isLoggedIn) {
            alert("You must log in to vote.");
            return;
        }
        var url = `http://localhost:8080/api/policies/${type === "upvote" ? "up-vote" : "down-vote"}`;
        try {
            const response = await axios.post(
                `${url}`,
                {
                    userId: id,
                    policyId: policyId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Content: 'application/json',
                    },
                    withCredentials: true,
                }
            );
            {

            }
            fetchPolicies();
            // console.log("Before updatedPolicy " + response);
            // const updatedPolicy = response.data.policy;

            // setPolicies((prevPolicies) => {
            //     console.log("setPolicies " + updatedPolicy.policyId);
            //     return prevPolicies.map((policy) =>
            //         policy.policyId === updatedPolicy.policyId ? updatedPolicy : policy
            //     );
            // });
        } catch (error: any) {
            if (error.response) {
                console.error('Error:', error.response.data || error.message);
                // Handle known errors from the backend
                if (error.response.status === 400) {
                    alert(error.response.data.error); // Show backend error message
                } else {
                    // Handle other server-side errors
                    console.error('Error:', error.response.data || error.message);
                    alert('An error occurred while voting. Please try again.');
                }
            } else {
                // Handle network or other unexpected errors
                console.error('Unexpected error:', error);
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className = "card">
            <h2 className= "body-card">Student Policies</h2>
            <label className="label-card" htmlFor="year-selector">Select Academic Year: </label>
            <div className="select-container">
                <select
                    id="year-selector"
                    className="select"
                    onChange={handleYearChange}
                    value={selectedYear || ''}
                >
                    <option value="">All Years</option>
                    {years.map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {policies.map((policy: any) => (
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">{policy.title}</h3>
                            <span className="card-category">{policy.category.categoryName}</span>
                        </div>
                        <p className="card-description">{policy.description}</p>
                        <div className="card-footer">
                            <span>Submitted by: {policy.owner}</span>
                            <span className="date">{new Date(policy.date).toDateString()}</span>
                        </div>
                        <div className="card-buttons">
                            <div>
                                <button className="upvote-button" onClick={() => handleVote(policy.policyId, "upvote")}>
                                    👍 <span>Upvote {policy.upVoteCount} Votes</span>
                                </button>
                                <button className="downvote-button" onClick={() => handleVote(policy.policyId, "downvote")}>
                                    👎 <span>Downvote {policy.downVoteCount} Votes</span>
                                </button>
                            </div>
                            {/* <span className="card-votes">{policy.downVoteCount} Down Votes</span> */}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );

};

export default HomePage;
