// Exam Interface Component
import React, { useState } from "react";
import * as utils from "../utils/helpers";

const ExamInterface = ({ user, examConfig, onExamComplete, onExitExam }) => {
    const { useState, useEffect, useCallback } = React;
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(examConfig.duration * 60); // Convert to seconds
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);
    const [questions] = useState(utils.data.shuffleArray([...examConfig.questions]));
    const [examStartTime] = useState(new Date().getTime());
    const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);

    // Timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleAutoSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Auto-submit when time runs out
    const handleAutoSubmit = useCallback(() => {
        if (!isAutoSubmitting) {
            setIsAutoSubmitting(true);
            setTimeout(() => {
                handleSubmitExam(true);
            }, 1000);
        }
    }, [isAutoSubmitting]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key >= '1' && event.key <= '4') {
                const optionIndex = parseInt(event.key) - 1;
                if (optionIndex < questions[currentQuestion].options.length) {
                    handleAnswerSelect(questions[currentQuestion].id, optionIndex);
                }
            } else if (event.key === 'ArrowRight' && currentQuestion < questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
            } else if (event.key === 'ArrowLeft' && currentQuestion > 0) {
                setCurrentQuestion(prev => prev - 1);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentQuestion, questions]);

    const formatTime = (seconds) => utils.time.formatTime(seconds);

    const handleAnswerSelect = (questionId, answerIndex) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answerIndex
        }));
    };

    const handleSubmitExam = (isAutoSubmit = false) => {
        const examEndTime = new Date().getTime();
        const timeSpent = Math.floor((examEndTime - examStartTime) / 1000);
        
        let correctAnswers = 0;
        const detailedResults = [];
        
        questions.forEach(question => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            
            if (isCorrect) correctAnswers++;
            
            detailedResults.push({
                questionId: question.id,
                question: question.question,
                options: question.options,
                correctAnswer: question.correctAnswer,
                userAnswer,
                isCorrect,
                topic: question.topic,
                difficulty: question.difficulty
            });
        });

        const score = utils.grading.calculateScore(correctAnswers, questions.length);
        const result = {
            score,
            correctAnswers,
            totalQuestions: questions.length,
            answers,
            timeSpent,
            detailedResults,
            examConfig,
            isAutoSubmit,
            completedAt: new Date().toISOString(),
            grade: utils.grading.getLetterGrade(score)
        };

        // Save result to storage
        const savedResults = utils.storage.getItem('examResults') || [];
        savedResults.push(result);
        utils.storage.setItem('examResults', savedResults);

        setShowSubmitModal(false);
        onExamComplete(result);
    };

    const getAnsweredCount = () => Object.keys(answers).length;

    const getQuestionStatus = (questionIndex) => {
        const question = questions[questionIndex];
        if (answers[question.id] !== undefined) return 'answered';
        if (questionIndex === currentQuestion) return 'current';
        return 'unanswered';
    };

    const handleExitExam = () => {
        setShowExitModal(true);
    };

    const confirmExit = () => {
        setShowExitModal(false);
        onExitExam();
    };

    const getTimeWarningClass = () => {
        if (timeLeft < 300) return 'text-red-600 animate-pulse'; // Less than 5 minutes
        if (timeLeft < 600) return 'text-orange-600'; // Less than 10 minutes
        return 'text-gray-900';
    };

    const getProgressPercentage = () => {
        return Math.round((getAnsweredCount() / questions.length) * 100);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                    <i className="fas fa-clipboard-check text-white text-sm"></i>
                                </div>
                                <h1 className="text-lg font-bold text-gray-900">{examConfig.name}</h1>
                            </div>
                            <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-600">
                                <span>Question {currentQuestion + 1} of {questions.length}</span>
                                <span className="w-px h-4 bg-gray-300"></span>
                                <span>{getProgressPercentage()}% Complete</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {/* Progress Bar */}
                            <div className="hidden md:flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Progress:</span>
                                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-blue-600 transition-all duration-300"
                                        style={{ width: `${getProgressPercentage()}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{getProgressPercentage()}%</span>
                            </div>
                            
                            {/* Timer */}
                            <div className={`text-lg font-mono font-bold ${getTimeWarningClass()}`}>
                                <i className="fas fa-clock mr-2"></i>
                                {formatTime(timeLeft)}
                            </div>
                            
                            {/* Exit Button */}
                            <button
                                onClick={handleExitExam}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Exit Exam"
                            >
                                <i className="fas fa-times text-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Question Navigation Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-900">Questions</h3>
                                <span className="text-sm text-gray-500">{getAnsweredCount()}/{questions.length}</span>
                            </div>
                            
                            <div className="grid grid-cols-5 lg:grid-cols-4 gap-2 mb-4">
                                {questions.map((_, index) => {
                                    const status = getQuestionStatus(index);
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentQuestion(index)}
                                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                                                status === 'current'
                                                    ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                                                    : status === 'answered'
                                                    ? 'bg-green-500 text-white hover:bg-green-600'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                            title={`Question ${index + 1} - ${status}`}
                                        >
                                            {index + 1}
                                        </button>
                                    );
                                })}
                            </div>
                            
                            {/* Legend */}
                            <div className="space-y-2 text-xs">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                                    <span className="text-gray-600">Answered</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
                                    <span className="text-gray-600">Current</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-gray-100 rounded mr-2"></div>
                                    <span className="text-gray-600">Unanswered</span>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Time Remaining:</span>
                                        <span className={`font-medium ${getTimeWarningClass()}`}>
                                            {formatTime(timeLeft)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Answered:</span>
                                        <span className="font-medium text-gray-900">
                                            {getAnsweredCount()}/{questions.length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Question Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm border">
                            {/* Question Header */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-3">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                            Question {currentQuestion + 1}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            questions[currentQuestion].difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                                            questions[currentQuestion].difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {questions[currentQuestion].difficulty}
                                        </span>
                                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                            {questions[currentQuestion].topic}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {currentQuestion + 1} / {questions.length}
                                    </div>
                                </div>
                            </div>

                            {/* Question Content */}
                            <div className="p-8">
                                <h2 className="text-xl font-semibold text-gray-900 mb-8 leading-relaxed">
                                    {questions[currentQuestion].question}
                                </h2>
                                
                                <div className="space-y-4">
                                    {questions[currentQuestion].options.map((option, index) => (
                                        <label
                                            key={index}
                                            className={`flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                                answers[questions[currentQuestion].id] === index
                                                    ? 'border-blue-500 bg-blue-50 shadow-md transform scale-[1.02]'
                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name={`question-${questions[currentQuestion].id}`}
                                                    value={index}
                                                    checked={answers[questions[currentQuestion].id] === index}
                                                    onChange={() => handleAnswerSelect(questions[currentQuestion].id, index)}
                                                    className="sr-only"
                                                />
                                                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0 ${
                                                    answers[questions[currentQuestion].id] === index
                                                        ? 'border-blue-500 bg-blue-500'
                                                        : 'border-gray-300'
                                                }`}>
                                                    {answers[questions[currentQuestion].id] === index && (
                                                        <div className="w-3 h-3 rounded-full bg-white"></div>
                                                    )}
                                                </div>
                                                <div className="flex items-center">
                                                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium mr-4 ${
                                                        answers[questions[currentQuestion].id] === index
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-gray-200 text-gray-600'
                                                    }`}>
                                                        {String.fromCharCode(65 + index)}
                                                    </span>
                                                    <span className="text-gray-900 text-lg">{option}</span>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                </div>

                                {/* Keyboard Shortcuts Hint */}
                                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        <i className="fas fa-keyboard mr-2"></i>
                                        <strong>Keyboard shortcuts:</strong> Use 1-4 to select options, ← → to navigate questions
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Footer */}
                            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                        disabled={currentQuestion === 0}
                                        className="flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <i className="fas fa-chevron-left mr-2"></i>
                                        Previous
                                    </button>

                                    <div className="flex items-center space-x-4">
                                        {/* Mark for Review Button */}
                                        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                                            <i className="fas fa-flag mr-2"></i>
                                            Mark for Review
                                        </button>

                                        {/* Next/Submit Button */}
                                        {currentQuestion === questions.length - 1 ? (
                                            <button
                                                onClick={() => setShowSubmitModal(true)}
                                                className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all transform hover:scale-105"
                                            >
                                                <i className="fas fa-check-circle mr-2"></i>
                                                Submit Exam
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                                                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                            >
                                                Next
                                                <i className="fas fa-chevron-right ml-2"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Confirmation Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full transform animate-pulse">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-exclamation-triangle text-2xl text-yellow-600"></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Submit Exam?</h3>
                        </div>
                        
                        <div className="space-y-4 mb-6">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">Questions Answered:</span>
                                        <div className="font-semibold text-gray-900">
                                            {getAnsweredCount()} / {questions.length}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Time Remaining:</span>
                                        <div className={`font-semibold ${getTimeWarningClass()}`}>
                                            {formatTime(timeLeft)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {getAnsweredCount() < questions.length && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <p className="text-sm text-yellow-800">
                                        <i className="fas fa-info-circle mr-2"></i>
                                        You have {questions.length - getAnsweredCount()} unanswered questions. 
                                        These will be marked as incorrect.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowSubmitModal(false)}
                                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            >
                                Continue Exam
                            </button>
                            <button
                                onClick={() => handleSubmitExam(false)}
                                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                            >
                                Submit Now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Exit Confirmation Modal */}
            {showExitModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-exclamation-triangle text-2xl text-red-600"></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Exit Exam?</h3>
                            <p className="text-gray-600">
                                Are you sure you want to exit? Your progress will be lost and this attempt will not be saved.
                            </p>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowExitModal(false)}
                                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            >
                                Stay in Exam
                            </button>
                            <button
                                onClick={confirmExit}
                                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                Exit Exam
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Auto-submit Warning */}
            {timeLeft <= 60 && timeLeft > 0 && (
                <div className="fixed top-20 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-30 animate-bounce">
                    <div className="flex items-center">
                        <i className="fas fa-clock mr-2"></i>
                        <span className="font-medium">Auto-submitting in {timeLeft}s!</span>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ExamInterface;