import Navbarss from "./Navbarss";
import { motion } from "framer-motion";
import {Link} from 'react-router-dom';

export default function Home() {
 
  

 return (
    <>
        <Navbarss />
      <div className="relative bg-gradient-to-r from-blue-100 via-white to-blue-50 min-h-screen flex flex-col items-center justify-center text-center px-6">
        
        {/* Hero Section */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4"
        >
          Welcome to <span className="text-blue-600">Our Platform</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8"
        >
          Explore facilities, connect with hospitals, and get the best healthcare services in one place.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-4"
        >
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-2xl shadow-md hover:bg-blue-700 transition"><Link to="/Login">
            Get Started</Link>
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-2xl shadow-md hover:bg-gray-300 transition">
         <Link to="/About"> Learn More</Link>  
          </button>
        </motion.div>
      </div>



      <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex flex-col items-center py-10 px-6">
        
        {/* Title Section */}
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          🏥 Hospital Facility & Report Management System
        </h1>
        
        {/* Theory / About Project */}
        <div className="max-w-4xl bg-white rounded-2xl shadow-lg p-8 text-center space-y-4">
          <p className="text-gray-700 leading-relaxed">
            The <span className="font-semibold">Hospital Facility & Report Management System</span> 
            is designed to provide an efficient platform that connects hospitals, patients, 
            and healthcare facilities. It enables patients to explore available facilities, 
            submit feedback, and hospitals to manage and improve services effectively.
          </p>

          <p className="text-gray-700 leading-relaxed">
            The system ensures <span className="text-blue-600 font-medium">transparency</span>, 
            enhances <span className="text-blue-600 font-medium">efficiency</span>, 
            and helps in improving the overall healthcare quality by gathering 
            real-time feedback from patients.
          </p>
        </div>

        {/* Features Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-lg text-slate-800 mb-2">👨‍⚕️ For Admin</h3>
            <p className="text-gray-600 text-sm">
              Manage hospitals, monitor reports, and oversee healthcare facilities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-lg text-slate-800 mb-2">🏥 For Hospitals</h3>
            <p className="text-gray-600 text-sm">
              Register details, track feedback, and improve patient care facilities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="font-bold text-lg text-slate-800 mb-2">🧑‍🤝‍🧑 For Users</h3>
            <p className="text-gray-600 text-sm">
              Explore hospital facilities, post feedback, and share healthcare experiences.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
