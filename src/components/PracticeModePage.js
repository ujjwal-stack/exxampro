import React, { useState } from 'react';
import { sampleQuestions } from '../data/questions';
export const PracticeModePage = ({ user, onNavigate }) => {
            const [selectedTopic, setSelectedTopic] = useState('javascript');
            const [practiceMode, setPracticeMode] = useState('quick'); // quick, timed, custom
            const [difficulty, setDifficulty] = useState('mixed');

            const practiceOptions = [
                {
                    id: 'quick',
                    title: 'Quick Practice',
                    description: '5 random questions',
                    icon: 'fa-bolt',
                    color: 'bg-green-500'
                },
                {
                    id: 'timed',
                    title: 'Timed Challenge',
                    description: '10 questions in 15 minutes',
                    icon: 'fa-clock',
                    color: 'bg-blue-500'
                },
                {
                    id: 'custom',
                    title: 'Custom Practice',
                    description: 'Choose your settings',
                    icon: 'fa-cog',
                    color: 'bg-purple-500'
                }
            ];

            return (
                <div className="min-h-screen bg-gray-50">
                    <nav className="bg-white shadow-sm border-b">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <button
                                    onClick={() => onNavigate('dashboard')}
                                    className="flex items-center text-gray-600 hover:text-gray-900"
                                >
                                    <i className="fas fa-arrow-left mr-2"></i>
                                    Back to Dashboard
                                </button>
                                <h1 className="text-xl font-bold text-gray-900">Practice Mode</h1>
                                <div></div>
                            </div>
                        </div>
                    </nav>

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Practice Mode Selection */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Practice Mode</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {practiceOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => setPracticeMode(option.id)}
                                        className={`p-6 rounded-xl border-2 transition-all text-left ${
                                            practiceMode === option.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300 bg-white'
                                        }`}
                                    >
                                        <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center mb-4`}>
                                            <i className={`fas ${option.icon} text-white`}></i>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
                                        <p className="text-gray-600 text-sm">{option.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Topic Selection */}
                        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Topic</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {Object.entries(sampleQuestions).map(([key, exam]) => (
                                    <button
                                        key={key}
                                        onClick={() => setSelectedTopic(key)}
                                        className={`p-4 rounded-lg border transition-all ${
                                            selectedTopic === key
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="font-medium">{exam.title}</div>
                                        <div className="text-sm text-gray-500">{exam.question.length} questions</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty Selection */}
                        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Difficulty Level</h3>
                            <div className="flex flex-wrap gap-3">
                                {['mixed', 'easy', 'medium', 'hard'].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setDifficulty(level)}
                                        className={`px-4 py-2 rounded-lg border transition-all capitalize ${
                                            difficulty === level
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Start Practice Button */}
                        <div className="text-center">
                            <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg">
                                <i className="fas fa-play mr-2"></i>
                                Start Practice Session
                            </button>
                        </div>
                    </div>
                </div>
            );
        };
        export default PracticeModePage;