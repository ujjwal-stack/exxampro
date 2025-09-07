// Forum Page Component
import React, { useState } from 'react';        
export const ForumPage = ({ user, onNavigate }) => {
            const [activeTab, setActiveTab] = useState('recent');
            
            const forumPosts = [
                {
                    id: 1,
                    title: "Best practices for React state management?",
                    author: "Sarah Chen",
                    avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=667eea&color=fff",
                    category: "React",
                    replies: 12,
                    views: 156,
                    lastActivity: "2 hours ago",
                    isAnswered: true
                },
                {
                    id: 2,
                    title: "JavaScript closure confusion - need help!",
                    author: "Mike Rodriguez",
                    avatar: "https://ui-avatars.com/api/?name=Mike+Rodriguez&background=764ba2&color=fff",
                    category: "JavaScript",
                    replies: 8,
                    views: 89,
                    lastActivity: "4 hours ago",
                    isAnswered: false
                },
                {
                    id: 3,
                    title: "Python vs JavaScript for beginners?",
                    author: "Emily Johnson",
                    avatar: "https://ui-avatars.com/api/?name=Emily+Johnson&background=f093fb&color=fff",
                    category: "General",
                    replies: 24,
                    views: 312,
                    lastActivity: "1 day ago",
                    isAnswered: true
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
                                <h1 className="text-xl font-bold text-gray-900">Community Forum</h1>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <i className="fas fa-plus mr-2"></i>
                                    New Post
                                </button>
                            </div>
                        </div>
                    </nav>

                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Forum Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                                <div className="text-2xl font-bold text-blue-600 mb-1">1,247</div>
                                <div className="text-gray-600">Total Posts</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                                <div className="text-2xl font-bold text-green-600 mb-1">856</div>
                                <div className="text-gray-600">Answered</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                                <div className="text-2xl font-bold text-purple-600 mb-1">423</div>
                                <div className="text-gray-600">Active Users</div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                                <div className="text-2xl font-bold text-orange-600 mb-1">89</div>
                                <div className="text-gray-600">Online Now</div>
                            </div>
                        </div>

                        {/* Forum Tabs */}
                        <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
                            <div className="border-b">
                                <nav className="flex">
                                    {[
                                        { id: 'recent', label: 'Recent Posts', icon: 'fa-clock' },
                                        { id: 'popular', label: 'Popular', icon: 'fa-fire' },
                                        { id: 'unanswered', label: 'Unanswered', icon: 'fa-question-circle' },
                                        { id: 'categories', label: 'Categories', icon: 'fa-folder' }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                                activeTab === tab.id
                                                    ? 'border-blue-600 text-blue-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                            }`}
                                        >
                                            <i className={`fas ${tab.icon} mr-2`}></i>
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="p-6">
                                {/* Forum Posts */}
                                <div className="space-y-4">
                                    {forumPosts.map((post) => (
                                        <div key={post.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                            <img 
                                                src={post.avatar} 
                                                alt={post.author}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <h3 className="font-semibold text-gray-900">{post.title}</h3>
                                                    {post.isAnswered && (
                                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                            Answered
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <span>by {post.author}</span>
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                                        {post.category}
                                                    </span>
                                                    <span>{post.lastActivity}</span>
                                                </div>
                                            </div>
                                            <div className="text-right text-sm text-gray-500">
                                                <div className="flex items-center space-x-4">
                                                    <span><i className="fas fa-reply mr-1"></i>{post.replies}</span>
                                                    <span><i className="fas fa-eye mr-1"></i>{post.views}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
        export default ForumPage;