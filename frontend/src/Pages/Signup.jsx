import React, { useState } from 'react'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signup } from '../Lib/ApiHeandler';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signup(formData)
        if (res) {
            alert('Signup successful! Please login.');
            navigate("/")
        } else {
            alert('Failed to signup. Please try again.');
        }
    };

    return (
        <>
            <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
                <div className="card p-4 shadow" style={{ width: '400px' }}>
                    <h3 className="text-center mb-4">Signup</h3>
                    <form onSubmit={handleSubmit}>
                        {/* Username Field */}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <User />
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    id="username"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Mail />
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Lock />
                                </span>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    className="form-control"
                                    id="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Enter your password"
                                    required
                                />
                                <span
                                    className="input-group-text"
                                    onClick={togglePasswordVisibility}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                                </span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary w-100">
                                Signup
                            </button>
                            <p className="mt-3 text-center">Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup