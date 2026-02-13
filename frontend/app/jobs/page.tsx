"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const statusColor = (status: string) => {
  if (status === "pending") return "bg-yellow-500/20 text-yellow-400";
  if (status === "running") return "bg-blue-500/20 text-blue-400";
  if (status === "completed") return "bg-green-500/20 text-green-400";
  return "";
};

const priorityColor = (priority: string) => {
  if (priority === "High") return "bg-red-500/20 text-red-400";
  if (priority === "Medium") return "bg-orange-500/20 text-orange-400";
  if (priority === "Low") return "bg-gray-500/20 text-gray-300";
  return "";
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/jobs`
      );
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 5000);
    return () => clearInterval(interval);
  }, []);

  const runJob = async (id: number) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/run-job/${id}`,
      { method: "POST" }
    );
    fetchJobs();
  };

  const deleteJob = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`,
      { method: "DELETE" }
    );

    fetchJobs();
  };

  // Analytics
  const totalJobs = jobs.length;
  const completedJobs = jobs.filter(j => j.status === "completed").length;
  const pendingJobs = jobs.filter(j => j.status === "pending").length;
  const runningJobs = jobs.filter(j => j.status === "running").length;

  const filteredJobs = jobs.filter(job =>
    job.taskName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-10 text-white">

      {/* 🔥 Animated Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
          🚀 Job Execution Dashboard
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Real-Time Job Monitoring System
        </p>
      </div>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="🔎 Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8 p-3 rounded-xl bg-gray-800 border border-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      />

      {/* 📊 Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Jobs", value: totalJobs, color: "bg-gray-800" },
          { label: "Pending", value: pendingJobs, color: "bg-yellow-700/30" },
          { label: "Running", value: runningJobs, color: "bg-blue-700/30" },
          { label: "Completed", value: completedJobs, color: "bg-green-700/30" },
        ].map((card, index) => (
          <div
            key={index}
            className={`${card.color} p-6 rounded-2xl backdrop-blur-md shadow-lg hover:scale-105 transition duration-300 text-center`}
          >
            <p className="text-gray-300 text-lg">{card.label}</p>
            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* 📋 Jobs Table */}
      <div className="overflow-x-auto rounded-2xl shadow-xl">
        <table className="min-w-full bg-gray-900 rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-gray-300 text-left">
              <th className="p-4">Task</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredJobs.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No jobs found
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-t border-gray-800 hover:bg-gray-800 transition"
                >
                  <td className="p-4">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="text-blue-400 hover:underline"
                    >
                      {job.taskName}
                    </Link>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${priorityColor(job.priority)}`}
                    >
                      {job.priority}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColor(job.status)}`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="p-4 flex gap-3">
                    {job.status === "pending" && (
                      <button
                        onClick={() => runJob(job.id)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-lg transition"
                      >
                        ▶ Run
                      </button>
                    )}

                    <button
                      onClick={() => deleteJob(job.id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg transition"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </main>
  );
}