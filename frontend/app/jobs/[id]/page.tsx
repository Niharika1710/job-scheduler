"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    async function fetchJob() {
      const res = await fetch(`http://localhost:5000/jobs/${id}`);
      const data = await res.json();
      setJob(data);
    }
    fetchJob();
  }, [id]);

  if (!job) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-white-100 p-10">
      <h2 className="text-2xl font-bold mb-4">Job Details</h2>

      <div className="bg-black p-6 rounded shadow max-w-2xl space-y-3">
        <p><strong>Task:</strong> {job.taskName}</p>
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Priority:</strong> {job.priority}</p>

        <div>
          <strong>Payload:</strong>
          <pre className="bg-gray-900 text-green-300 p-4 rounded mt-2 text-sm overflow-auto">
            {JSON.stringify(job.payload, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}