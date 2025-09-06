import React from "react";

export const ExamHistory = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b p-4 flex items-center">
        <button
          onClick={() => onNavigate("dashboard")}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back
        </button>
        <h1 className="ml-4 text-xl font-bold text-gray-900">Exam History</h1>
      </nav>

      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-600">
            Here you will see a list of all exams you attempted, along with
            scores, dates, and status.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamHistory;