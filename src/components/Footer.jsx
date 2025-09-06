// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t shadow-sm mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding Section */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <i className="fas fa-graduation-cap text-white text-sm"></i>
              </div>
              <span className="font-bold text-gray-900 text-lg">ExamPro</span>
            </div>
            <p className="text-sm text-gray-600">
              Your personal exam prep and study companion. Practice, analyze,
              and succeed with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Study Materials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Analytics
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Forum
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Help & Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Connect</h4>
            <p className="text-sm text-gray-600 mb-3">
              Email: <a href="mailto:support@exampro.com" className="text-blue-600 hover:underline">support@exampro.com</a>
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ExamPro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
