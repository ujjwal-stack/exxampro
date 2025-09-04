// Dashboard Component
import React, { useState, useEffect } from "react";
import utils from "../utils/helpers";
import { examData } from '../data/questions';
import { sampleExamHistory, performanceStats, examConfigs } from "../data/questions";

const Dashboard = ({ user, onStartExam, onLogout }) => {
    const { useState, useEffect } = React;
    
    const [examHistory, setExamHistory] = useState([]);
    const [stats, setStats] = useState(null);
    const [availableExams, setAvailableExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);
    const [loading, setLoading] = useState(true);


    const [showNotifications, setShowNotifications] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    
    const notifications = [
        { id: 1, title: "New Exam Available", message: "CSS & Frontend Design exam is now available", time: "2 hours ago", unread: true },
        { id: 2, title: "Exam Reminder", message: "Don't forget to complete your Node.js exam", time: "1 day ago", unread: true },
        { id: 3, title: "Score Update", message: "Your JavaScript exam score has been updated", time: "3 days ago", unread: false }
    ];

    // Initialize dashboard data
    useEffect(() => {

        // Simulate loading delay
        setTimeout(() => {
            setExamHistory(sampleExamHistory);
            setStats(performanceStats);
            setAvailableExams(Object.values(examConfigs));
            setSelectedExam(examConfigs.fullStack);
            setLoading(false);
        }, 800);

        const handleClickOutside = (event) => {
            if (!event.target.closest('.notification-popup') && !event.target.closest('.notification-button')) {
                setShowNotifications(false);
            }
            if (!event.target.closest('.settings-popup') && !event.target.closest('.settings-button')) {
                setShowSettings(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);


    // Handle exam start
    const handleStartExam = (examConfig) => {
        onStartExam(examConfig);
    };

    // Handle logout
    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            utils.storage.removeItem('user');
            utils.storage.removeItem('loginTime');
            setShowNotifications(false);
            setShowSettings(false);
            onLogout();
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Header */}
            <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <i className="fas fa-graduation-cap text-white text-sm"></i>
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">ExamPro</h1>
                            <span className="hidden sm:inline text-gray-500">|</span>
                            <span className="hidden sm:inline text-gray-600">Student Portal</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden sm:flex items-center space-x-2">
                                <img 
                                    src={user.avatar} 
                                    alt={user.name}
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="text-gray-700">Welcome, {user.name}</span>
                            </div>
                            <div className="flex items-center space-x-2 relative">
                                {/* Notifications */}
                                <div className="relative">
                                    <button 
                                        onClick={() => {
                                            setShowNotifications(!showNotifications);
                                            setShowSettings(false);
                                        }}
                                        className="notification-button p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors relative"
                                    >
                                        <i className="fas fa-bell"></i>
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                                    </button>
                                    
                                    {showNotifications && (
                                        <div className="notification-popup absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                                            <div className="p-4 border-b">
                                                <h3 className="font-semibold text-gray-900">Notifications</h3>
                                            </div>
                                            <div className="max-h-64 overflow-y-auto">
                                                {notifications.map((notification) => (
                                                    <div key={notification.id} className={`p-4 border-b hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}>
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                                                                <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                                                                <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                                                            </div>
                                                            {notification.unread && (
                                                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="p-3 border-t">
                                                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                                    Mark all as read
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Settings */}
                                <div className="relative">
                                    <button 
                                        onClick={() => {
                                            setShowSettings(!showSettings);
                                            setShowNotifications(false);
                                        }}
                                        className="settings-button p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <i className="fas fa-cog"></i>
                                    </button>
                                    
                                    {showSettings && (
                                        <div className="settings-popup absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                                            <div className="p-4 border-b">
                                                <h3 className="font-semibold text-gray-900">Settings</h3>
                                            </div>
                                            <div className="py-2">
                                                <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3">
                                                    <i className="fas fa-user-edit text-gray-400"></i>
                                                    <span className="text-gray-700">Edit Profile</span>
                                                </button>
                                                <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3">
                                                    <i className="fas fa-key text-gray-400"></i>
                                                    <span className="text-gray-700">Change Password</span>
                                                </button>
                                                <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3">
                                                    <i className="fas fa-bell text-gray-400"></i>
                                                    <span className="text-gray-700">Notification Settings</span>
                                                </button>
                                                <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3">
                                                    <i className="fas fa-palette text-gray-400"></i>
                                                    <span className="text-gray-700">Theme Preferences</span>
                                                </button>
                                                <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3">
                                                    <i className="fas fa-download text-gray-400"></i>
                                                    <span className="text-gray-700">Export Data</span>
                                                </button>
                                                <div className="border-t my-2"></div>
                                                <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3">
                                                    <i className="fas fa-question-circle text-gray-400"></i>
                                                    <span className="text-gray-700">Help & Support</span>
                                                </button>
                                                <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3">
                                                    <i className="fas fa-info-circle text-gray-400"></i>
                                                    <span className="text-gray-700">About ExamPro</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                    title="Logout"
                                >
                                    <i className="fas fa-sign-out-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {user.name.split(' ')[0]}! 👋
                    </h2>
                    <p className="text-gray-600">
                        Ready to take your next exam? Check your performance and start a new assessment.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Total Exams"
                        value={stats.totalExams}
                        icon="fas fa-clipboard-list"
                        color="blue"
                    />
                    <StatsCard
                        title="Average Score"
                        value={`${stats.averageScore}%`}
                        icon="fas fa-chart-line"
                        color="green"
                    />
                    <StatsCard
                        title="Best Score"
                        value={`${stats.bestScore}%`}
                        icon="fas fa-trophy"
                        color="yellow"
                    />
                    <StatsCard
                        title="Completion Rate"
                        value={`${stats.completionRate}%`}
                        icon="fas fa-check-circle"
                        color="purple"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Available Exams */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Available Exams</h3>
                            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                <i className="fas fa-refresh mr-1"></i>
                                Refresh
                            </button>
                        </div>
                        
                        <div className="space-y-6">
                            {availableExams.map((exam) => (
                                <ExamCard
                                    key={exam.id}
                                    exam={exam}
                                    onStart={() => handleStartExam(exam)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Recent Results */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Results</h3>
                            <div className="space-y-3">
                                {examHistory.slice(0, 4).map((exam) => (
                                    <ResultCard key={exam.id} exam={exam} />
                                ))}
                            </div>
                            <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm py-2">
                                View All Results
                            </button>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-left">
                                    <div className="flex items-center">
                                        <i className="fas fa-history text-blue-600 mr-3"></i>
                                        <span className="font-medium">Exam History</span>
                                    </div>
                                    <i className="fas fa-chevron-right text-gray-400"></i>
                                </button>
                                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-left">
                                    <div className="flex items-center">
                                        <i className="fas fa-chart-bar text-green-600 mr-3"></i>
                                        <span className="font-medium">Performance Analytics</span>
                                    </div>
                                    <i className="fas fa-chevron-right text-gray-400"></i>
                                </button>
                                <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-left">
                                    <div className="flex items-center">
                                        <i className="fas fa-download text-purple-600 mr-3"></i>
                                        <span className="font-medium">Download Certificate</span>
                                    </div>
                                    <i className="fas fa-chevron-right text-gray-400"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Stats Card Component
const StatsCard = ({ title, value, icon, color }) => {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        yellow: 'bg-yellow-100 text-yellow-600',
        purple: 'bg-purple-100 text-purple-600'
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
                    <i className={`${icon} text-lg`}></i>
                </div>
            </div>
        </div>
    );
};

// Exam Card Component
const ExamCard = ({ exam, onStart }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center mb-2">
                        <h4 className="text-xl font-semibold text-gray-900">{exam.name}</h4>
                        <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                            exam.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                            exam.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                            {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
                        </span>
                    </div>
                    <p className="text-gray-600 mb-4">{exam.description}</p>
                </div>
                <div className="text-right ml-4">
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="font-semibold text-gray-900">{exam.duration} min</div>
                </div>
            </div>

            <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-6 text-sm">
                    <div className="flex items-center">
                        <i className="fas fa-question-circle text-gray-400 mr-2"></i>
                        <span className="text-gray-500">Questions:</span>
                        <span className="font-medium text-gray-900 ml-1">{exam.questions.length}</span>
                    </div>
                    <div className="flex items-center">
                        <i className="fas fa-list-alt text-gray-400 mr-2"></i>
                        <span className="text-gray-500">Type:</span>
                        <span className="font-medium text-gray-900 ml-1">Multiple Choice</span>
                    </div>
                    <div className="flex items-center">
                        <i className="fas fa-tags text-gray-400 mr-2"></i>
                        <span className="text-gray-500">Topics:</span>
                        <span className="font-medium text-gray-900 ml-1">{exam.topics.length}</span>
                    </div>
                </div>
            </div>

            <button
                onClick={onStart}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    isHovered
                        ? 'bg-blue-700 text-white transform scale-105'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
                <i className="fas fa-play-circle mr-2"></i>
                Start Exam
            </button>
        </div>
    );
};

// Result Card Component
const ResultCard = ({ exam }) => {
    const gradeInfo = utils.grading.getLetterGrade(exam.score);
    
    return (
        <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900 text-sm">{exam.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${gradeInfo.color} ${gradeInfo.bgColor}`}>
                    {exam.score}%
                </span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-600">
                <span className="flex items-center">
                    <i className="fas fa-calendar-alt mr-1"></i>
                    {utils.time.getTimeAgo(exam.date)}
                </span>
                <span className="flex items-center">
                    <i className="fas fa-clock mr-1"></i>
                    {exam.timeSpent}m
                </span>
            </div>
        </div>
    );
};

// Loading Spinner Component
const LoadingSpinner = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
        </div>
    </div>
);
export default Dashboard;