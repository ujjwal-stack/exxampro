// Authentication Component
import React, { useState } from "react";
import * as utils from "../utils/helpers";

const AuthForm = ({ onLogin }) => {
    
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        // Validate form data
        const validation = isLogin ? 
            validateLogin(formData) : 
            utils.validation.validateRegistration(formData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            setLoading(false);
            return;
        }

        // Simulate API call delay
        setTimeout(() => {
            const userData = {
                id: Date.now(),
                name: formData.name || 'Demo User',
                email: formData.email,
                token: 'mock-jwt-token-' + Date.now(),
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'Demo User')}&background=3b82f6&color=fff`
            };
            
            // Save to storage
            utils.storage.setItem('user', userData);
            utils.storage.setItem('loginTime', new Date().toISOString());
            
            onLogin(userData);
            setLoading(false);
        }, 1500);
    };

    // Validate login form
    const validateLogin = (data) => {
        const errors = {};
        
        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!utils.validation.isValidEmail(data.email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (!data.password) {
            errors.password = 'Password is required';
        } else if (data.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    };

    // Handle input changes
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // Toggle between login and register
    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({ email: '', password: '', name: '', confirmPassword: '' });
        setErrors({});
    };

    // Demo login with predefined credentials
    const handleDemoLogin = () => {
        setFormData({
            email: 'demo@exampro.com',
            password: 'demo123',
            name: 'Demo Student',
            confirmPassword: ''
        });
        
        setTimeout(() => {
            const userData = {
                id: 999,
                name: 'Demo Student',
                email: 'demo@exampro.com',
                token: 'demo-token-' + Date.now(),
                avatar: 'https://ui-avatars.com/api/?name=Demo+Student&background=3b82f6&color=fff',
                isDemo: true
            };
            
            utils.storage.setItem('user', userData);
            onLogin(userData);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-graduation-cap text-2xl text-white"></i>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">ExamPro</h1>
                    <p className="text-gray-600">Student Examination Portal</p>
                </div>

                {/* Mode Toggle */}
                <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => !loading && setIsLogin(true)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                            isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                        }`}
                        disabled={loading}
                    >
                        <i className="fas fa-sign-in-alt mr-2"></i>
                        Login
                    </button>
                    <button
                        onClick={() => !loading && setIsLogin(false)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                            !isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                        }`}
                        disabled={loading}
                    >
                        <i className="fas fa-user-plus mr-2"></i>
                        Register
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name field for registration */}
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name *
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required={!isLogin}
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className={`w-full px-4 py-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                        errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter your full name"
                                    disabled={loading}
                                />
                                <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            </div>
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                    {errors.name}
                                </p>
                            )}
                        </div>
                    )}
                    
                    {/* Email field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={`w-full px-4 py-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                                placeholder="Enter your email"
                                disabled={loading}
                            />
                            <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <i className="fas fa-exclamation-circle mr-1"></i>
                                {errors.email}
                            </p>
                        )}
                    </div>
                    
                    {/* Password field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password *
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                className={`w-full px-4 py-3 pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                    errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                                placeholder="Enter your password"
                                disabled={loading}
                            />
                            <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                disabled={loading}
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <i className="fas fa-exclamation-circle mr-1"></i>
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password for registration */}
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password *
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required={!isLogin}
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    className={`w-full px-4 py-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                        errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                    }`}
                                    placeholder="Confirm your password"
                                    disabled={loading}
                                />
                                <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                    <i className="fas fa-exclamation-circle mr-1"></i>
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                    )}
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                {isLogin ? 'Signing In...' : 'Creating Account...'}
                            </div>
                        ) : (
                            <span>
                                <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} mr-2`}></i>
                                {isLogin ? 'Sign In' : 'Create Account'}
                            </span>
                        )}
                    </button>
                </form>

                {/* Demo Login Button */}
                <div className="mt-4">
                    <button
                        onClick={handleDemoLogin}
                        disabled={loading}
                        className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <i className="fas fa-play-circle mr-2"></i>
                        Try Demo Account
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 mb-2">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={toggleMode}
                            disabled={loading}
                            className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
                        >
                            {isLogin ? 'Register here' : 'Sign in here'}
                        </button>
                    </p>
                    <p className="text-xs text-gray-500">
                        Demo: Any email/password combination works for testing
                    </p>
                </div>
            </div>
        </div>
    );
};
export default AuthForm;