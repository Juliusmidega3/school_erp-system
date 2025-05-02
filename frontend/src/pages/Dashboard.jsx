import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { toast, Toaster } from "react-hot-toast";

// Simple Emoji Icon component
const EmojiIcon = ({ symbol, label }) => (
  <span role="img" aria-label={label} className="text-4xl">
    {symbol}
  </span>
);

function Dashboard() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    staffs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No token found");

        const response = await axios.get("http://localhost:8000/api/counts/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCounts(response.data);
      } catch (error) {
        console.error("Failed to fetch counts:", error);
        if (error.response?.status === 401) {
          handleLogout();
        } else {
          toast.error("An error occurred while fetching data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/admin-login"), 1500);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const Card = ({ title, count, link, icon, bgColor, textColor, delay }) => (
    <motion.div
      className={`p-6 ${bgColor} rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col justify-between min-h-[180px]`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      </div>
      <div className="flex items-center justify-between">
        <p className={`text-5xl font-bold ${textColor}`}>
          <CountUp end={count ?? 0} duration={1.5} />
        </p>
        <Link
          to={link}
          className={`text-sm font-medium underline ${textColor} hover:opacity-80 transition`}
        >
          View All
        </Link>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 sm:p-8 bg-[#F9FAFB] min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#065f46]">Dashboard</h1>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <Card
          title="Students"
          count={counts.students}
          link="/app/students"
          icon={<EmojiIcon symbol="🎓" label="Students" />}
          bgColor="bg-blue-50"
          textColor="text-blue-700"
          delay={0.2}
        />
        <Card
          title="Teachers"
          count={counts.teachers}
          link="/app/teachers"
          icon={<EmojiIcon symbol="👨‍🏫" label="Teachers" />}
          bgColor="bg-green-50"
          textColor="text-green-700"
          delay={0.4}
        />
        <Card
          title="Staffs"
          count={counts.staffs}
          link="/app/staffs"
          icon={<EmojiIcon symbol="🧑‍💼" label="Staffs" />}
          bgColor="bg-yellow-50"
          textColor="text-yellow-700"
          delay={0.6}
        />
        <Card
          title="Fees"
          count={null}
          link="/app/fees"
          icon={<EmojiIcon symbol="💳" label="Fees" />}
          bgColor="bg-purple-50"
          textColor="text-purple-700"
          delay={0.8}
        />
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
