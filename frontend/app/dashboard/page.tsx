"use client";
import { useEffect, useState } from "react";
import { Home } from "lucide-react";

export default function Dashboard() {
  const [jobs, setJobs] = useState<any[]>([]);

  const fetchJobs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 4000);
    return () => clearInterval(interval);
  }, []);

  const runJob = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/run-job/${id}`, {
      method: "POST",
    });
    fetchJobs();
  };

  const deleteJob = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`, {
      method: "DELETE",
    });

    fetchJobs();
  };

  const statusBadge = (status: string) => {
    if (status === "pending")
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-400";
    if (status === "running")
      return "bg-blue-500/20 text-blue-400 border border-blue-400";
    if (status === "completed")
      return "bg-green-500/20 text-green-400 border border-green-400";
    return "";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] to-black text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111827] p-6 space-y-6">
        <h2 className="text-xl font-bold">Operational Dashboard</h2>

        <nav className="space-y-4">
          <div className="flex items-center gap-2 text-white bg-gray-800 px-3 py-2 rounded-lg">
            <Home size={18}/> Dashboard
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-8">
          Active Jobs
        </h1>

        <div className="bg-[#1f2937] p-6 rounded-xl shadow-xl">

          <table className="w-full text-left">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="pb-4">Job ID</th>
                <th className="pb-4">Job Name</th>
                <th className="pb-4">Priority</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No jobs available
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-t border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="py-4">J-{job.id}</td>

                    <td className="py-4 font-medium">
                      {job.taskName}
                    </td>

                    <td className="py-4">
                      {job.priority}
                    </td>

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${statusBadge(
                          job.status
                        )}`}
                      >
                        {job.status.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-4 flex gap-3">

                      {job.status === "pending" && (
                        <button
                          onClick={() => runJob(job.id)}
                          className="bg-blue-600 px-4 py-1 rounded-lg hover:bg-blue-700 transition"
                        >
                          Run
                        </button>
                      )}

                      <button
                        onClick={() => deleteJob(job.id)}
                        className="bg-red-600 px-4 py-1 rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>

      </main>
    </div>
  );
}