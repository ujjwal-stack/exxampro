// Dashboard Component
import React, { useState, useEffect } from "react";
import utils from "../utils/helpers";
import Contact from "./Contact";
import { motion } from "framer-motion";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { sampleExamHistory, performanceStats, examConfigs } from "../data/questions";

/* const Dashboard = ({ user, onStartExam, onLogout, }) => { */
const Dashboard = ({ user, userProgress, onStartExam, onLogout, onNavigate }) => {
    const { useState, useEffect } = React;
    const [searchTerm, setSearchTerm] = useState('');
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

    // add the section of some cards
    const quickActions = [
        { title: "Practice Mode", description: "Quick practice questions", icon: "fa-dumbbell", action: () => onNavigate('practice'), color: "bg-green-500" },
        { title: "Study Materials", description: "Access learning resources", icon: "fa-book", action: () => onNavigate('studym'), color: "bg-blue-500" },
        { title: "Certificates", description: "View your achievements", icon: "fa-certificate", action: () => onNavigate('certificates'), color: "bg-purple-500" },
        { title: "Forum", description: "Join discussions", icon: "fa-comments", action: () => onNavigate('forum'), color: "bg-orange-500" }
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
            <Navigation
                onNavigate={onNavigate}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                user={user}
                showNotifications={showNotifications}
                setShowNotifications={setShowNotifications}
                notifications={notifications}
                showSettings={showSettings}
                setShowSettings={setShowSettings}
                handleLogout={handleLogout}
            />
            {/* Main Content */}


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                {/*  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {user.name.split(' ')[0]}! 👋
                    </h2>
                    <p className="text-gray-600">
                        Ready to take your next exam? Check your performance and start a new assessment.
                    </p>
                </div> */}

                {/* Welcome Section with Enhanced Progress */}

                <div className="mb-8 relative z-0">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl"
                    >
                        {/* Background decorative circles */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"
                        ></motion.div>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"
                        ></motion.div>

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                                {/* Welcome + Stats */}
                                <div>
                                    <motion.h2
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.7 }}
                                        className="text-3xl font-bold mb-2"
                                    >
                                        Welcome back, {user.name}! 👋
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-blue-100 mb-4"
                                    >
                                        Ready to continue your learning journey?
                                    </motion.p>

                                    {/* Stats */}
                                    <motion.div
                                        className="flex items-center space-x-6"
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                transition: { staggerChildren: 0.2 },
                                            },
                                        }}
                                    >
                                        {[
                                            { value: userProgress.streak, label: "Day Streak" },
                                            { value: userProgress.xp, label: "Total XP" },
                                            { value: `${userProgress.averageScore}%`, label: "Avg Score" },
                                            { value: `#${userProgress.rank}`, label: "Global Rank" },
                                        ].map((stat, index) => (
                                            <motion.div
                                                key={index}
                                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                                className="text-center"
                                            >
                                                <div className="text-2xl font-bold">{stat.value}</div>
                                                <div className="text-sm text-blue-100">{stat.label}</div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* Progress Bar */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-6 lg:mt-0"
                                >
                                    <div className="bg-white bg-opacity-20 rounded-lg p-4 shadow-lg backdrop-blur-md">
                                        <div className="text-sm text-blue-100 mb-2">
                                            Progress to Level {userProgress.level + 1}
                                        </div>
                                        <div className="w-48 bg-white bg-opacity-30 rounded-full h-2 overflow-hidden">
                                            <motion.div
                                                className="bg-white rounded-full h-2"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(userProgress.xp / userProgress.nextLevelXp) * 100}%` }}
                                                transition={{ duration: 1, ease: "easeInOut" }}
                                            ></motion.div>
                                        </div>
                                        <div className="text-xs text-blue-100 mt-1">
                                            {userProgress.xp} / {userProgress.nextLevelXp} XP
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {quickActions.map((action, index) => (
                        <button
                            key={index}
                            onClick={action.action}
                            className="bg-white rounded-xl shadow-sm border p-6 text-left transition transform hover:shadow-md hover:scale-105"
                        >
                            <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                                <i className={`fas ${action.icon} text-white`}></i>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                            <p className="text-sm text-gray-600">{action.description}</p>
                        </button>
                    ))}
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
                                {/* <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-left"> */}
                                <button
                                    onClick={() => onNavigate("examHistory")}
                                    className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-left"
                                >
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
            <Contact />
            <Footer />
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
                        <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${exam.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
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
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${isHovered
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