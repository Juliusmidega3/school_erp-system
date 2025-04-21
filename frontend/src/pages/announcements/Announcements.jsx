import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance"; // assuming you have this
import MainLayout from "../../components/MainLayout";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axiosInstance.get("/announcements/");
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const response = await axiosInstance.post("/announcements/", {
        message,
      });
      setAnnouncements([response.data, ...announcements]);
      setMessage("");
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-[#065f46] mb-4">📢 Announcements</h1>

        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-[#065f46]"
            placeholder="Type your announcement here..."
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-[#065f46] text-white rounded hover:bg-[#054f3a] transition"
          >
            Post Announcement
          </button>
        </form>

        <div className="space-y-4">
          {announcements.length === 0 ? (
            <p className="text-gray-500">No announcements yet.</p>
          ) : (
            announcements.map((a) => (
              <div
                key={a.id}
                className="p-4 border border-gray-200 rounded shadow-sm bg-gray-50"
              >
                <p className="text-gray-800">{a.message}</p>
                <p className="text-sm text-gray-400">
                  Posted on {new Date(a.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Announcements;
