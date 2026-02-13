"use client";
import { useState } from "react";

export default function CreateJob() {
  const [taskName, setTaskName] = useState("");
  const [payload, setPayload] = useState("");
  const [priority, setPriority] = useState("High");

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskName,
        payload: JSON.parse(payload || "{}"),
        priority
      })
    });

    alert("Job Scheduled Successfully");
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
          onChange={(e)=>setTaskName(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <textarea
          placeholder="Command or JSON Payload"
          value={payload}
          onChange={(e)=>setPayload(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <select
          value={priority}
          onChange={(e)=>setPriority(e.target.value)}
          className="w-full border p-3 rounded mb-6"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
        >
          Schedule Job →
        </button>
      </form>

    </main>
  );
}