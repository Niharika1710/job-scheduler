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
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const runJob = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/run-job/${id}`, {
  method: "POST",
});
    alert("Job triggered!");
    fetchJobs(); // refresh list
  };

  return (
    <main className="min-h-screen bg-black-100 p-10">
      <h2 className="text-2xl font-bold mb-6 text-center">All Jobs</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-black shadow rounded">
          <thead>
            <tr className="bg-black-200 text-left">
              <th className="p-3">Task</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job: any) => (
              <tr key={job.id} className="border-t">
                <td className="p-3">
                       <Link
                          href={`/jobs/${job.id}`}
                            className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
                              >
                            {job.taskName}
                        </Link>
                </td>
                <td className="p-3">
                     <span className={`px-3 py-1 rounded-full text-sm ${priorityColor(job.priority)}`}>
                      {job.priority}
                      </span>
                </td>
                <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${statusColor(job.status)}`}>
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
                    <span className="text-black-500">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
