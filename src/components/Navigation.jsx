import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md sticky top-0 z-20">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Title */}
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
            >
              <i className="fas fa-graduation-cap text-blue-600 text-lg"></i>
            </motion.div>
            <h1 className="text-2xl font-extrabold text-white tracking-wide">
              ExamPro
            </h1>
            <span className="hidden sm:inline text-blue-100 font-medium">
              Student Portal
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { name: "Dashboard", icon: "fa-home", page: "dashboard" },
              { name: "Study", icon: "fa-book", page: "study" },
              { name: "Analytics", icon: "fa-chart-line", page: "analytics" },
              { name: "Leaderboard", icon: "fa-trophy", page: "leaderboard" },
            ].map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className="text-white hover:text-yellow-300 font-medium flex items-center gap-2 transition duration-200"
              >
                <i className={`fas ${item.icon}`}></i>
                {item.name}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden sm:block relative">
              <input
                type="text"
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 rounded-full shadow-sm 
                  border border-transparent focus:outline-none 
                  focus:ring-2 focus:ring-yellow-400"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>

            {/* User */}
            <div className="hidden sm:flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow hover:shadow-md transition">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <span className="text-gray-700 font-medium">
                Hi, {user.name}
              </span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowSettings(false);
                }}
                className="p-2 text-white hover:bg-blue-700 rounded-full relative"
              >
                <i className="fas fa-bell"></i>
                {notifications.some((n) => n.unread) && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-lg border z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b bg-gray-50">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b hover:bg-gray-50 transition ${
                              notification.unread ? "bg-blue-50" : ""
                            }`}
                          >
                            <h4 className="font-medium text-gray-900 text-sm">
                              {notification.title}
                            </h4>
                            <p className="text-gray-600 text-sm">{notification.message}</p>
                            <span className="text-xs text-gray-400">{notification.time}</span>
                          </div>
                        ))
                      ) : (
                        <p className="p-4 text-gray-500 text-sm text-center">
                          No new notifications 🎉
                        </p>
                      )}
                    </div>
                    <div className="p-3 border-t text-center">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Mark all as read
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSettings(!showSettings);
                  setShowNotifications(false);
                }}
                className="p-2 text-white hover:bg-blue-700 rounded-full"
              >
                <i className="fas fa-cog"></i>
              </button>
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b bg-gray-50">
                      <h3 className="font-semibold text-gray-800">Settings</h3>
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
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition"
                        >
                          <i className={`fas ${item.icon} text-gray-400`}></i>
                          <span className="text-gray-700">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 text-white hover:bg-red-600 rounded-full transition"
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