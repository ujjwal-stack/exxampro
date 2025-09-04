// Results Page Component
import React, { useState } from "react";
import * as utils from "../utils/helpers";

const ResultsPage = ({ result, user, onReturnToDashboard }) => {
    const { useState, useEffect } = React;
    
    const [showDetails, setShowDetails] = useState(false);
    const [animatedScore, setAnimatedScore] = useState(0);
    const [selectedFilter, setSelectedFilter] = useState('all');

    // Animate score counter
    useEffect(() => {
        const timer = setTimeout(() => {
            const increment = result.score / 50;
            const animate = () => {
                setAnimatedScore(prev => {
                    const next = prev + increment;
                    if (next >= result.score) {
                        return result.score;
                    }
                    requestAnimationFrame(animate);
                    return next;
                });
            };
            animate();
        }, 500);

        return () => clearTimeout(timer);
    }, [result.score]);

    const gradeInfo = result.grade;
    const performanceMessage = utils.grading.getPerformanceMessage(result.score);
    const timeSpentMinutes = Math.floor(result.timeSpent / 60);
    const timeSpentSeconds = result.timeSpent % 60;

    // Filter questions based on selected filter
    const getFilteredQuestions = () => {
        switch (selectedFilter) {
            case 'correct':
                return result.detailedResults.filter(q => q.isCorrect);
            case 'incorrect':
                return result.detailedResults.filter(q => !q.isCorrect && q.userAnswer !== undefined);
            case 'unanswered':
                return result.detailedResults.filter(q => q.userAnswer === undefined);
            default:
                return result.detailedResults;
        }
    };

    // Get topic-wise performance
    const getTopicPerformance = () => {
        const topicGroups = utils.data.groupBy(result.detailedResults, 'topic');
        return Object.entries(topicGroups).map(([topic, questions]) => {
            const correct = questions.filter(q => q.isCorrect).length;
            const total = questions.length;
            const percentage = Math.round((correct / total) * 100);
            
            return {
                topic: topic.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                correct,
                total,
                percentage,
                color: percentage >= 80 ? 'green' : percentage >= 60 ? 'yellow' : 'red'
            };
        });
    };

    const topicPerformance = getTopicPerformance();
    const filteredQuestions = getFilteredQuestions();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <i className="fas fa-chart-line text-white text-sm"></i>
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">Exam Results</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                                <i className="fas fa-download mr-2"></i>
                                Download Report
                            </button>
                            <button
                                onClick={onReturnToDashboard}
                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <i className="fas fa-home mr-2"></i>
                                Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Score Section */}
                <div className="text-center mb-12">
                    <div className="relative inline-block">
                        <div className={`text-8xl font-bold ${gradeInfo.color} mb-4 relative z-10`}>
                            {Math.round(animatedScore)}%
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full transform scale-150 opacity-20"></div>
                    </div>
                    
                    <div className={`text-3xl font-semibold ${gradeInfo.color} mb-4`}>
                        Grade: {gradeInfo.grade}
                    </div>
                    
                    <p className="text-xl text-gray-600 mb-2">
                        {result.examConfig.name}
                    </p>
                    
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {performanceMessage}
                    </p>

                    {result.isAutoSubmit && (
                        <div className="mt-4 inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                            <i className="fas fa-clock mr-2"></i>
                            Automatically submitted due to time limit
                        </div>
                    )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Correct Answers"
                        value={result.correctAnswers}
                        total={result.totalQuestions}
                        icon="fas fa-check-circle"
                        color="green"
                    />
                    <StatCard
                        title="Incorrect Answers"
                        value={result.totalQuestions - result.correctAnswers}
                        total={result.totalQuestions}
                        icon="fas fa-times-circle"
                        color="red"
                    />
                    <StatCard
                        title="Time Spent"
                        value={`${timeSpentMinutes}:${timeSpentSeconds.toString().padStart(2, '0')}`}
                        subtitle="minutes"
                        icon="fas fa-clock"
                        color="blue"
                    />
                    <StatCard
                        title="Accuracy Rate"
                        value={`${result.score}%`}
                        icon="fas fa-target"
                        color="purple"
                    />
                </div>

                {/* Topic Performance */}
                <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Performance by Topic</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {topicPerformance.map((topic, index) => (
                            <TopicCard key={index} topic={topic} />
                        ))}
                    </div>
                </div>

                {/* Detailed Results */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Detailed Review</h3>
                        <div className="flex items-center space-x-4">
                            {/* Filter Buttons */}
                            <div className="flex rounded-lg bg-gray-100 p-1">
                                {[
                                    { key: 'all', label: 'All', count: result.detailedResults.length },
                                    { key: 'correct', label: 'Correct', count: result.correctAnswers },
                                    { key: 'incorrect', label: 'Incorrect', count: result.detailedResults.filter(q => !q.isCorrect && q.userAnswer !== undefined).length },
                                    { key: 'unanswered', label: 'Unanswered', count: result.detailedResults.filter(q => q.userAnswer === undefined).length }
                                ].map((filter) => (
                                    <button
                                        key={filter.key}
                                        onClick={() => setSelectedFilter(filter.key)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                            selectedFilter === filter.key
                                                ? 'bg-white text-blue-600 shadow-sm'
                                                : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                    >
                                        {filter.label} ({filter.count})
                                    </button>
                                ))}
                            </div>
                            
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <i className={`fas ${showDetails ? 'fa-eye-slash' : 'fa-eye'} mr-2`}></i>
                                {showDetails ? 'Hide' : 'Show'} Explanations
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {filteredQuestions.map((question, index) => (
                            <QuestionReview
                                key={question.questionId}
                                question={question}
                                questionNumber={result.detailedResults.findIndex(q => q.questionId === question.questionId) + 1}
                                showDetails={showDetails}
                            />
                        ))}
                        
                        {filteredQuestions.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                <i className="fas fa-search text-4xl mb-4"></i>
                                <p>No questions match the selected filter.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={onReturnToDashboard}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        <i className="fas fa-home mr-2"></i>
                        Return to Dashboard
                    </button>
                    <button className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                        <i className="fas fa-redo mr-2"></i>
                        Take Again
                    </button>
                    <button className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                        <i className="fas fa-share mr-2"></i>
                        Share Results
                    </button>
                </div>
            </div>
        </div>
    );
};

// Stat Card Component
const StatCard = ({ title, value, total, subtitle, icon, color }) => {
    const colorClasses = {
        green: 'bg-green-100 text-green-600 border-green-200',
        red: 'bg-red-100 text-red-600 border-red-200',
        blue: 'bg-blue-100 text-blue-600 border-blue-200',
        purple: 'bg-purple-100 text-purple-600 border-purple-200'
    };

    return (
        <div className={`bg-white rounded-xl shadow-sm border-2 p-6 ${colorClasses[color]}`}>
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
                    <i className={`${icon} text-xl`}></i>
                </div>
                {total && (
                    <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                            {value}<span className="text-lg text-gray-500">/{total}</span>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                {!total && (
                    <p className="text-3xl font-bold text-gray-900">
                        {value}
                        {subtitle && <span className="text-lg text-gray-500 ml-1">{subtitle}</span>}
                    </p>
                )}
            </div>
        </div>
    );
};

// Topic Performance Card
const TopicCard = ({ topic }) => {
    const colorClasses = {
        green: 'bg-green-100 text-green-800 border-green-200',
        yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        red: 'bg-red-100 text-red-800 border-red-200'
    };

    return (
        <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{topic.topic}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses[topic.color]}`}>
                    {topic.percentage}%
                </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
                <span>{topic.correct}/{topic.total} correct</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                        topic.color === 'green' ? 'bg-green-500' :
                        topic.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${topic.percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

// Question Review Component
const QuestionReview = ({ question, questionNumber, showDetails }) => {
    const isCorrect = question.isCorrect;
    const wasAnswered = question.userAnswer !== undefined;

    return (
        <div className={`rounded-xl border-2 p-6 ${
            isCorrect ? 'border-green-200 bg-green-50' :
            wasAnswered ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
        }`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center mb-2">
                        <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 mr-3">
                            Question {questionNumber}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            question.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                            question.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                            {question.difficulty}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm ml-2">
                            {question.topic}
                        </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-4">{question.question}</h4>
                </div>
                
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                    isCorrect ? 'bg-green-100 text-green-800' :
                    wasAnswered ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                    <i className={`fas ${
                        isCorrect ? 'fa-check-circle' :
                        wasAnswered ? 'fa-times-circle' : 'fa-minus-circle'
                    } mr-2`}></i>
                    {isCorrect ? 'Correct' : wasAnswered ? 'Incorrect' : 'Not Answered'}
                </div>
            </div>

            <div className="space-y-3">
                {question.options.map((option, index) => {
                    const isCorrectAnswer = index === question.correctAnswer;
                    const isUserAnswer = index === question.userAnswer;
                    
                    return (
                        <div
                            key={index}
                            className={`flex items-center p-3 rounded-lg ${
                                isCorrectAnswer ? 'bg-green-100 border border-green-300' :
                                isUserAnswer && !isCorrectAnswer ? 'bg-red-100 border border-red-300' :
                                'bg-white border border-gray-200'
                            }`}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                                isCorrectAnswer ? 'border-green-500 bg-green-500' :
                                isUserAnswer && !isCorrectAnswer ? 'border-red-500 bg-red-500' :
                                'border-gray-300'
                            }`}>
                                {isCorrectAnswer && <i className="fas fa-check text-white text-xs"></i>}
                                {isUserAnswer && !isCorrectAnswer && <i className="fas fa-times text-white text-xs"></i>}
                            </div>
                            
                            <div className="flex items-center flex-1">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium mr-3 ${
                                    isCorrectAnswer ? 'bg-green-600 text-white' :
                                    isUserAnswer && !isCorrectAnswer ? 'bg-red-600 text-white' :
                                    'bg-gray-200 text-gray-600'
                                }`}>
                                    {String.fromCharCode(65 + index)}
                                </span>
                                <span className="text-gray-900">{option}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                                {isCorrectAnswer && (
                                    <span className="text-green-700 text-sm font-medium">
                                        <i className="fas fa-check-circle mr-1"></i>
                                        Correct Answer
                                    </span>
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                    <span className="text-red-700 text-sm font-medium">
                                        <i className="fas fa-times-circle mr-1"></i>
                                        Your Answer
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {showDetails && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <h5 className="font-medium text-blue-900 mb-2">
                            <i className="fas fa-lightbulb mr-2"></i>
                            Explanation
                        </h5>
                        <p className="text-blue-800 text-sm">
                            The correct answer is <strong>{question.options[question.correctAnswer]}</strong>. 
                            This question tests your understanding of {question.topic.replace('-', ' ')} concepts.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
export default ResultsPage;