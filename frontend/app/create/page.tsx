"use client";
import { useState } from "react";

export default function CreateJob() {
  const [taskName, setTaskName] = useState("");
  const [payload, setPayload] = useState("");
  const [priority, setPriority] = useState("High");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!taskName.trim()) {
      alert("Please enter job name");
      return;
    }

    let parsedPayload = {};

    // ✅ Safe JSON Parsing
    try {
      parsedPayload = payload ? JSON.parse(payload) : {};
    } catch (err) {
      alert("Invalid JSON format in payload ❌");
      return;
    }

    try {
      setLoading(true);

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskName,
          payload: parsedPayload,
          priority,
        }),
      });

      alert("Job Scheduled Successfully 🚀");

      // ✅ RESET FORM FIELDS AFTER SUCCESS
      setTaskName("");
      setPayload("");
      setPriority("High");

    } catch (error) {
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-2xl shadow-2xl w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Create Job</h2>

        <input
          type="text"
          placeholder="Job Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full border p-3 rounded mb-4"
          required
        />

        <textarea
          placeholder='Example: { "type": "email", "time": "09:00" }'
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          className="w-full border p-3 rounded mb-4"
          rows={4}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border p-3 rounded mb-6"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Scheduling..." : "Schedule Job →"}
        </button>
      </form>
    </main>
  );
}