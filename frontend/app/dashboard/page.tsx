"use client";
import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { Home, Briefcase, FileText, Settings } from "lucide-react";

export default function Dashboard() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
    const data = await res.json();
    setJobs(data);
  };

  const chartData = [
    { day: "Sun", value: 96 },
    { day: "Mon", value: 97 },
    { day: "Tue", value: 99 },
    { day: "Wed", value: 96 },
    { day: "Thu", value: 100 },
    { day: "Fri", value: 98 },
    { day: "Sat", value: 99 },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] to-black text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111827] p-6 space-y-6">
        <h2 className="text-xl font-bold">Operational Dashboard</h2>
        <nav className="space-y-4 text-gray-400">
          <div className="flex items-center gap-2 text-white">
            <Home size={18}/> Home
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={18}/> Jobs
          </div>
          <div className="flex items-center gap-2">
            <FileText size={18}/> Logs
          </div>
          <div className="flex items-center gap-2">
            <Settings size={18}/> Settings
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">

        {/* CHARTS */}
        <div className="grid grid-cols-2 gap-8">

          <div className="bg-[#1f2937] p-6 rounded-xl">
            <h3 className="mb-4">Jobs Success Rate</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="day" stroke="#aaa"/>
                <YAxis stroke="#aaa"/>
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#00ffcc" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#1f2937] p-6 rounded-xl">
            <h3 className="mb-4">System Load</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="day" stroke="#aaa"/>
                <YAxis stroke="#aaa"/>
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#a855f7" />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* ACTIVE JOBS TABLE */}
        <div className="mt-10 bg-[#1f2937] p-6 rounded-xl">
          <h3 className="mb-4">Active Jobs</h3>

          <table className="w-full text-left">
            <thead className="text-gray-400">
              <tr>
                <th>Job ID</th>
                <th>Job Name</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map(job => (
                <tr key={job.id} className="border-t border-gray-700">
                  <td>J-{job.id}</td>
                  <td>{job.taskName}</td>
                  <td>{job.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}