import React, { useState, useEffect } from "react";
import * as utils from "./utils/helpers";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import ExamInterface from "./components/ExamInterface";
import ResultsPage from "./components/ResultsPage";
import PracticeModePage from "./components/PracticeModePage";
import ForumPage from "./components/ForumPage";
import StudyMaterialPage from "./components/StudyMaterialPage";
import { ExamHistory } from "./components/ExamHistory";


import { sampleQuestions } from "./data/questions";
import CertificatesPage from "./components/CertificatesPage";
// import { sampleExamHistory, performanceStats, examConfigs } from "./data/questions"; --- IGNORE ---


const App = () => {
    const { useState, useEffect } = React;
    
    const [user, setUser] = useState(null);
    const [currentView, setCurrentView] = useState('auth');
    const [examResult, setExamResult] = useState(null);
    const [currentExamConfig, setCurrentExamConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userProgress, setUserProgress] = useState({
                totalExams: 12,
                passedExams: 8,
                averageScore: 82,
                studyHours: 45,
                streak: 5,
                level: 3,
                xp: 2450,
                nextLevelXp: 3000,
                certificates: 3,
                rank: 156
            });

    // Initialize app and check for existing user session
    useEffect(() => {
        const initializeApp = () => {
            try {
                const savedUser = utils.storage.getItem('user');
                const loginTime = utils.storage.getItem('loginTime');
                
                // Check if user session is still valid (24 hours)
                if (savedUser && loginTime) {
                    const sessionAge = Date.now() - new Date(loginTime).getTime();
                    const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
                    
                    if (sessionAge < maxSessionAge) {
                        setUser(savedUser);
                        setCurrentView('dashboard');
                    } else {
                        // Session expired, clean up
                        utils.storage.removeItem('user');
                        utils.storage.removeItem('loginTime');
                    }
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Error initializing app:', error);
                setLoading(false);
            }
        };

        // Simulate initial loading delay
        setTimeout(initializeApp, 1000);
    }, []);

    // Handle successful login
    const handleLogin = (userData) => {
        setUser(userData);
        setCurrentView('dashboard');
        
        // Update login time
        utils.storage.setItem('loginTime', new Date().toISOString());
        
        // Track user activity
        trackUserActivity('login', { userId: userData.id, email: userData.email });
    };

    // Handle logout
    const handleLogout = () => {
        // Track activity
        trackUserActivity('logout', { userId: user?.id });
        
        // Clear storage
        utils.storage.removeItem('user');
        utils.storage.removeItem('loginTime');
        
        // Reset state
        setUser(null);
        setCurrentView('auth');
        setExamResult(null);
        setCurrentExamConfig(null);
    };

    // Handle exam start
    const handleStartExam = (examConfig) => {
        setCurrentExamConfig(examConfig);
        setCurrentView('exam');
        
        // Track exam start
        trackUserActivity('exam_started', {
            userId: user?.id,
            examId: examConfig.id,
            examName: examConfig.name
        });
    };

    // Handle exam completion
    const handleExamComplete = (result) => {
        setExamResult(result);
        setCurrentView('results');
        
        setUserProgress(prev => ({
                    ...prev,
                    totalExams: prev.totalExams + 1,
                    passedExams: result.score >= result.examConfig.passingScore  ? prev.passedExams + 1 : prev.passedExams,
                    xp: prev.xp + Math.floor(result.score * 2)
                }));


        // Track exam completion

        trackUserActivity('exam_completed', {
            userId: user?.id,
            examId: result.examConfig.id,
            score: result.score,
            timeSpent: result.timeSpent,
            isAutoSubmit: result.isAutoSubmit
        });
        
        // Update user's exam history in storage
        updateExamHistory(result);
    };

    // Handle return to dashboard
    const handleReturnToDashboard = () => {
        setCurrentView('dashboard');
        setExamResult(null);
        setCurrentExamConfig(null);
    };

    // Handle exit exam
    const handleExitExam = () => {
        // Track exam exit
        trackUserActivity('exam_exited', {
            userId: user?.id,
            examId: currentExamConfig?.id,
            currentQuestion: 0 // You might want to pass this from the exam component
        });
        
        setCurrentView('dashboard');
        setCurrentExamConfig(null);
    };

    // Update exam history
    const updateExamHistory = (result) => {
        try {
            const historyKey = `examHistory_${user.id}`;
            const existingHistory = utils.storage.getItem(historyKey) || [];
            
            const newHistoryEntry = {
                id: Date.now(),
                examId: result.examConfig.id,
                name: result.examConfig.name,
                score: result.score,
                grade: result.grade.grade,
                date: new Date().toISOString(),
                timeSpent: Math.floor(result.timeSpent / 60), // Convert to minutes
                questionsCorrect: result.correctAnswers,
                totalQuestions: result.totalQuestions,
                status: 'completed'
            };
            
            existingHistory.unshift(newHistoryEntry);
            
            // Keep only last 10 results
            if (existingHistory.length > 10) {
                existingHistory.splice(10);
            }
            
            utils.storage.setItem(historyKey, existingHistory);
        } catch (error) {
            console.error('Error updating exam history:', error);
        }
    };

    // Track user activity (for analytics)
    const trackUserActivity = (action, data = {}) => {
        try {
            const activityLog = utils.storage.getItem('activityLog') || [];
            const activity = {
                id: Date.now(),
                action,
                timestamp: new Date().toISOString(),
                data,
                userAgent: navigator.userAgent,
                url: window.location.href
            };
            
            activityLog.push(activity);
            
            // Keep only last 100 activities
            if (activityLog.length > 100) {
                activityLog.splice(0, activityLog.length - 100);
            }
            
            utils.storage.setItem('activityLog', activityLog);
        } catch (error) {
            console.error('Error tracking activity:', error);
        }
    };

    // Handle browser back/forward navigation
    useEffect(() => {
        const handlePopState = (event) => {
            if (currentView === 'exam') {
                event.preventDefault();
                const confirmExit = window.confirm('Are you sure you want to leave the exam? Your progress will be lost.');
                if (!confirmExit) {
                    window.history.pushState(null, '', window.location.href);
                    return;
                }
            }
            
            // Handle navigation based on current state
            if (user && currentView !== 'auth') {
                setCurrentView('dashboard');
                setExamResult(null);
                setCurrentExamConfig(null);
            }
        };

        window.addEventListener('popstate', handlePopState);
        
        // Push initial state
        window.history.pushState(null, '', window.location.href);
        
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [currentView, user]);

    // Handle visibility change (tab switching)
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (currentView === 'exam' && document.visibilityState === 'hidden') {
                trackUserActivity('tab_switched_during_exam', {
                    userId: user?.id,
                    examId: currentExamConfig?.id
                });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [currentView, user, currentExamConfig]);

    // Loading screen
    if (loading) {
        return <LoadingScreen />;
    }

    // Error boundary fallback
    const ErrorFallback = ({ error, resetError }) => (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-exclamation-triangle text-2xl text-red-600"></i>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
                <p className="text-gray-600 mb-6">
                    We encountered an unexpected error. Please try refreshing the page.
                </p>
                <div className="space-y-2">
                    <button
                        onClick={resetError}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Refresh Page
                    </button>
                </div>
            </div>
        </div>
    );

    const navigateTo = (view) => {
                setCurrentView(view);
            };

    // Render current view
    const renderCurrentView = () => {
        try {
            switch (currentView) {
                case 'auth':
                    return <AuthForm onLogin={handleLogin} />;
                
                case 'dashboard':
                    return (
                        <Dashboard 
                            user={user} 
                            userProgress={userProgress}
                            onStartExam={handleStartExam}
                            onLogout={handleLogout}
                            onNavigate={navigateTo}
                        />
                    );
                
                case 'exam':
                    return (
                        <ExamInterface 
                            user={user}
                            examConfig={currentExamConfig}
                            onExamComplete={handleExamComplete}
                            onExitExam={handleExitExam}
                        />
                    );

                case 'practice':
                    return (
                        <PracticeModePage
                            user={user}
                            onNavigate={navigateTo}
                        />
                    );

                case 'certificates':
                    return (
                        <CertificatesPage 
                            user={user}
                            userProgress={userProgress}
                            onNavigate={navigateTo}
                        />
                    )

                case 'studym':
                    return (
                        <StudyMaterialPage 
                            user={user}
                            onNavigate={navigateTo}
                        />
                    );

                case 'examHistory':
                    return (
                        <ExamHistory 
                            onNavigate={navigateTo}
                        />
                    );

                case 'forum':
                    return (
                        <ForumPage 
                            user={user}
                            onNavigate={navigateTo}
                        />
                    );
                
                case 'results':
                    return (
                        <ResultsPage 
                            result={examResult}
                            user={user}
                            onReturnToDashboard={handleReturnToDashboard}
                        />
                    );
                
                default:
                    return <AuthForm onLogin={handleLogin} />;
            }
        } catch (error) {
            console.error('Error rendering view:', error);
            return <ErrorFallback error={error} resetError={() => setCurrentView('auth')} />;
        }
    };

    return (
        <ErrorBoundary fallback={ErrorFallback}>
            <div className="app">
                {renderCurrentView()}
                
                {/* Global notifications or overlays can go here */}
                <GlobalNotifications />
            </div>
        </ErrorBoundary>
    );
};

// Loading Screen Component
const LoadingScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <i className="fas fa-graduation-cap text-2xl text-blue-600"></i>
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">ExamPro</h1>
            <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <p className="text-blue-200">Loading your examination portal...</p>
        </div>
    </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        
        // Log error to storage for debugging
        try {
            const errorLog = utils.storage.getItem('errorLog') || [];
            errorLog.push({
                timestamp: new Date().toISOString(),
                error: error.toString(),
                errorInfo,
                userAgent: navigator.userAgent
            });
            utils.storage.setItem('errorLog', errorLog);
        } catch (e) {
            console.error('Failed to log error:', e);
        }
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback({ 
                error: this.state.error, 
                resetError: () => this.setState({ hasError: false, error: null })
            });
        }

        return this.props.children;
    }
}

// Global Notifications Component
const GlobalNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    // This would typically connect to a notification system
    // For now, it's just a placeholder
    
    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`px-4 py-3 rounded-lg shadow-lg text-white max-w-sm ${
                        notification.type === 'success' ? 'bg-green-600' :
                        notification.type === 'error' ? 'bg-red-600' :
                        notification.type === 'warning' ? 'bg-yellow-600' :
                        'bg-blue-600'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span>{notification.message}</span>
                        <button
                            onClick={() => setNotifications(prev => 
                                prev.filter(n => n.id !== notification.id)
                            )}
                            className="ml-2 text-white hover:text-gray-200"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
