import React, { useState } from "react";

export const studyMaterials = {
  javascript: [
    { id: 1, title: "JavaScript Basics Guide", type: "PDF", size: "2.5 MB", downloadUrl: "#", category: "Fundamentals" },
    { id: 2, title: "ES6 Features Overview", type: "Video", duration: "45 min", downloadUrl: "#", category: "Advanced" },
    { id: 3, title: "DOM Manipulation Cheat Sheet", type: "PDF", size: "1.2 MB", downloadUrl: "#", category: "DOM" },
    { id: 4, title: "Async/Await Tutorial", type: "Interactive", duration: "30 min", downloadUrl: "#", category: "Async" },
    { id: 5, title: "JavaScript Design Patterns", type: "PDF", size: "3.8 MB", downloadUrl: "#", category: "Patterns" }
  ],
  react: [
    { id: 1, title: "React Hooks Deep Dive", type: "PDF", size: "3.1 MB", downloadUrl: "#", category: "Hooks" },
    { id: 2, title: "Component Lifecycle", type: "Video", duration: "35 min", downloadUrl: "#", category: "Components" },
    { id: 3, title: "State Management Patterns", type: "PDF", size: "2.8 MB", downloadUrl: "#", category: "State" },
    { id: 4, title: "React Performance Optimization", type: "Interactive", duration: "50 min", downloadUrl: "#", category: "Performance" }
  ],
  python: [
    { id: 1, title: "Python Syntax Reference", type: "PDF", size: "1.8 MB", downloadUrl: "#", category: "Syntax" },
    { id: 2, title: "Data Structures in Python", type: "Video", duration: "60 min", downloadUrl: "#", category: "Data Structures" },
    { id: 3, title: "OOP Concepts Explained", type: "Interactive", duration: "40 min", downloadUrl: "#", category: "OOP" },
    { id: 4, title: "Python Best Practices", type: "PDF", size: "2.2 MB", downloadUrl: "#", category: "Best Practices" }
  ]
};

export const StudyMaterialsPage = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState("javascript");

  const categories = [
    { id: "javascript", label: "JavaScript", icon: "fa-js-square", color: "text-yellow-500" },
    { id: "react", label: "React", icon: "fa-react", color: "text-blue-500" },
    { id: "python", label: "Python", icon: "fa-python", color: "text-green-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => onNavigate("dashboard")}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Dashboard
            </button>
            <h1 className="text-xl font-bold text-gray-900">Study Materials</h1>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <i className="fas fa-upload mr-2"></i>
              Upload Material
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <nav className="flex">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeCategory === cat.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
               
                 
                <i className={`fab ${cat.icon} mr-2 ${cat.color}`}></i>
                {cat.label}
                
              </button>
            ))}
          </nav>
        </div>

        {/* Study Material List */}
        <div className="space-y-4">
          {studyMaterials[activeCategory].map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border hover:bg-gray-50 transition-colors"
            >
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                    {item.category}
                  </span>
                  <span className="flex items-center">
                    <i className="fas fa-file-alt mr-1"></i>
                    {item.type}
                  </span>
                  {item.size && <span>{item.size}</span>}
                  {item.duration && <span>{item.duration}</span>}
                </div>
              </div>
              <a
                href={item.downloadUrl}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <i className="fas fa-download mr-2"></i>
                Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialsPage;
