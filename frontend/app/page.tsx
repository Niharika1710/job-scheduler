"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 3000);
    return () => clearInterval(interval);
  }, []);

  const runJob = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/run-job/${id}`, {
      method: "POST",
    });
  };

  const deleteJob = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`, {
      method: "DELETE",
    });
    fetchJobs();
  };

  const filteredJobs = jobs.filter(job =>
    job.taskName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-10 text-white">

      <h2 className="text-3xl font-bold mb-6 text-center">
        📊 Job Dashboard
      </h2>

      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-3 rounded bg-gray-800 text-white w-full"
      />

      <div className="grid gap-4">

        {filteredJobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-800 p-5 rounded-xl shadow-lg flex justify-between items-center"
          >

            <div>
              <h3 className="text-xl font-semibold">{job.taskName}</h3>
              <p className="text-sm text-gray-400">
                Priority: {job.priority} | Status: {job.status}
              </p>
            </div>

            <div className="flex gap-3">
              {job.status === "pending" && (
                <button
                  onClick={() => runJob(job.id)}
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Run
                </button>
              )}

              <button
                onClick={() => deleteJob(job.id)}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>

          </motion.div>
        ))}

      </div>
    </main>
  );
}