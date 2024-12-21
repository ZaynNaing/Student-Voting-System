import React, {  } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
    const { isLoggedIn, logout } = useAuth();

    return (
        <nav className="navbar bg-gray-800 text-white p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="navbar-logo">Policies for Students</Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>
                        Home
                    </NavLink>
                </li>
                {isLoggedIn ? (
                    <>
                        <li>
                            <NavLink to="/add-policy" className={({ isActive }) => isActive ? 'active-link' : ''}>
                                Add Policy
                            </NavLink>
                        </li>
                        <li>
                            <button className="logout-button" onClick={logout}>
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/login" className={({ isActive }) => isActive ? 'active-link' : ''}>
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup" className={({ isActive }) => isActive ? 'active-link' : ''}>
                                Signup
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );

};

export default Navbar;