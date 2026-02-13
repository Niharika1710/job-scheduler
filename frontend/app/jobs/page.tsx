"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const statusColor = (status: string) => {
  if (status === "pending") return "bg-yellow-100 text-yellow-800";
  if (status === "running") return "bg-blue-100 text-blue-800";
  if (status === "completed") return "bg-green-100 text-green-800";
  return "";
};

const priorityColor = (priority: string) => {
  if (priority === "High") return "bg-red-100 text-red-800";
  if (priority === "Medium") return "bg-orange-100 text-orange-800";
  if (priority === "Low") return "bg-gray-100 text-gray-800";
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

  // Auto refresh every 3 seconds
  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 3000);
    return () => clearInterval(interval);
  }, []);

  const runJob = async (id: number) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/run-job/${id}`,
      { method: "POST" }
    );
    fetchJobs();
  };

  // 🔹 Analytics
  const totalJobs = jobs.length;
  const completedJobs = jobs.filter(j => j.status === "completed").length;
  const pendingJobs = jobs.filter(j => j.status === "pending").length;
  const runningJobs = jobs.filter(j => j.status === "running").length;

  // 🔹 Search Filter
  const filteredJobs = jobs.filter(job =>
    job.taskName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Job Execution Dashboard
      </h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-2 rounded bg-gray-800 text-white w-full"
      />

      {/* 📊 Analytics Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded text-center">
          📦 Total Jobs <br />
          <span className="text-xl font-bold">{totalJobs}</span>
        </div>

        <div className="bg-yellow-700 p-4 rounded text-center">
          ⏳ Pending <br />
          <span className="text-xl font-bold">{pendingJobs}</span>
        </div>

        <div className="bg-blue-700 p-4 rounded text-center">
          ⚙️ Running <br />
          <span className="text-xl font-bold">{runningJobs}</span>
        </div>

        <div className="bg-green-700 p-4 rounded text-center">
          ✅ Completed <br />
          <span className="text-xl font-bold">{completedJobs}</span>
        </div>
      </div>

      {/* 📋 Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black shadow rounded">
          <thead>
            <tr className="bg-gray-900 text-left">
              <th className="p-3">Task</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredJobs.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-400">
                  No jobs found
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => (
                <tr key={job.id} className="border-t border-gray-700">
                  <td className="p-3">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="text-blue-400 underline hover:text-blue-300"
                    >
                      {job.taskName}
                    </Link>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${priorityColor(
                        job.priority
                      )}`}
                    >
                      {job.priority}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${statusColor(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {job.status === "pending" ? (
                      <button
                        onClick={() => runJob(job.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Run Job
                      </button>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
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