import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import resumeImg from "../assets/undraw_online-resume_z4sp.png";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center bg-gradient-to-b from-blue-50 to-blue-100 px-6">
      {/* Heading */}
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold text-gray-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Build Your <span className="text-blue-600">Professional Resume</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Create an ATS-friendly, modern resume in minutes — simple, fast, and free.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link
          to="/editor"
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
        >
          Create My Resume 🚀
        </Link>
      </motion.div>

      {/* Illustration or image (optional) */}
   
      <motion.img
        src={resumeImg}
        alt="Resume"
        className="w-64 mt-10 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      />
    </div>
  );
}

export default Home;
