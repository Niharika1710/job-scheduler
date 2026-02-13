"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CreateJob() {
  const [taskName, setTaskName] = useState("");
  const [payload, setPayload] = useState("{}");
  const [priority, setPriority] = useState("Low");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskName,
        payload: JSON.parse(payload),
        priority
      })
    });

    setLoading(false);
    setTaskName("");
    setPayload("{}");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center p-10">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg"
      >

        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          🚀 Create New Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            placeholder="Payload (JSON)"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white h-32 focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 p-3 rounded hover:bg-blue-700 transition duration-300 text-white font-semibold"
          >
            {loading ? "Creating..." : "Create Job"}
          </button>

        </form>
      </motion.div>
    </main>
  );
}