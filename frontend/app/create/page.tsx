"use client";
import { useState } from "react";

export default function CreateJob() {
  const [taskName, setTaskName] = useState("");
  const [payload, setPayload] = useState("{}");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskName,
        payload: JSON.parse(payload),
        priority
      })
    });

    alert("Job Created!");
    setTaskName("");
    setPayload("{}");
  };

  return (
    <main className="min-h-screen bg-white-100 p-10">
      <h2 className="text-2xl font-bold mb-6">Create New Job</h2>

      <form onSubmit={handleSubmit} className="bg-black p-6 rounded shadow-md max-w-lg mx-auto space-y-4">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Payload (JSON)"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          className="w-full border p-2 rounded h-32"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create Job
        </button>
      </form>
    </main>
  );
}
