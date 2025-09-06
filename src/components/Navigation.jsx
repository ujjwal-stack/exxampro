import React from "react";

const Navigation = ({
  onNavigate,
  searchTerm,
  setSearchTerm,
  user,
  showNotifications,
  setShowNotifications,
  notifications,
  showSettings,
  setShowSettings,
  handleLogout,
}) => {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-left h-16">
          {/* Logo + Title */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <i className="fas fa-graduation-cap text-white text-sm"></i>
            </div>
            <h1 className="text-xl font-bold text-gray-900">ExamPro</h1>
            <span className="hidden sm:inline text-gray-500">|</span>
            <span className="hidden sm:inline text-gray-600">
              Student Portal
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => onNavigate("dashboard")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              <i className="fas fa-home mr-2"></i>Dashboard
            </button>
            <button
              onClick={() => onNavigate("study")}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              <i className="fas fa-book mr-2"></i>Study
            </button>
            <button
              onClick={() => onNavigate("analytics")}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              <i className="fas fa-chart-line mr-2"></i>Analytics
            </button>
            <button
              onClick={() => onNavigate("leaderboard")}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              <i className="fas fa-trophy mr-2"></i>Leaderboard
            </button>
          </div>

          {/* Right Section: Search, User, Notifications, Settings, Logout */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden sm:block relative">
              <input
                type="text"
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>

            {/* User */}
            <div className="hidden sm:flex items-center space-x-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700">Welcome, {user.name}</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowSettings(false);
                }}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <i className="fas fa-bell"></i>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b hover:bg-gray-50 ${
                          notification.unread ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">
                              {notification.title}
                            </h4>
                            <p className="text-gray-600 text-sm mt-1">
                              {notification.message}
                            </p>
                            <p className="text-gray-400 text-xs mt-2">
                              {notification.time}
                            </p>
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
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <i className="fas fa-cog"></i>
              </button>
              {showSettings && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-gray-900">Settings</h3>
                  </div>
                  <div className="py-2">
                    {[
                      { icon: "fa-user-edit", label: "Edit Profile" },
                      { icon: "fa-key", label: "Change Password" },
                      { icon: "fa-bell", label: "Notification Settings" },
                      { icon: "fa-palette", label: "Theme Preferences" },
                      { icon: "fa-download", label: "Export Data" },
                      { icon: "fa-question-circle", label: "Help & Support" },
                      { icon: "fa-info-circle", label: "About ExamPro" },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                      >
                        <i className={`fas ${item.icon} text-gray-400`}></i>
                        <span className="text-gray-700">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Logout */}
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
    </nav>
  );
};

export default Navigation;
