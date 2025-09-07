import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Contact Info Card */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📬 Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have questions? Reach out via email, phone, or visit our office. We’d love to hear from you!
          </p>
          <ul className="space-y-5 text-gray-700">
            <li className="flex items-center gap-3">
              <span className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                <i className="fas fa-envelope text-blue-600"></i>
              </span>
              <span>support@exampro.com</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full">
                <i className="fas fa-phone text-green-600"></i>
              </span>
              <span>+91 8755366145</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full">
                <i className="fas fa-map-marker-alt text-purple-600"></i>
              </span>
              <span>DLF Forum, Cybercity, Gurugram, Haryana</span>
            </li>
          </ul>
        </motion.div>

        {/* Contact Form Card */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">💬 Send us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
            >
              🚀 Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Google Map */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full h-96 rounded-t-2xl overflow-hidden shadow-lg"
      >
        <iframe
          title="map"
          className="w-full h-full border-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.366294352362!2d77.08882317459554!3d28.587993175686447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1930ebedb0f3%3A0x93de1aafdd3e0a93!2sDLF%20Cyber%20City%2C%20DLF%20Phase%202%2C%20Sector%2024%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1693738399391!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default Contact;