export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">
      
      <h1 className="text-4xl font-bold mb-4 text-center">
        ⚙️ Job Execution Dashboard
      </h1>

      <p className="text-gray-400 text-center max-w-2xl mb-8">
        A cloud-based job orchestration system built with Next.js, Express, and MySQL.
        Create, execute, and monitor background jobs in real time with full deployment on Vercel, Render, and Railway.
      </p>

      <div className="flex gap-6">
        <a
          href="/create"
          className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Create Job
        </a>

        <a
          href="/jobs"
          className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          View Dashboard
        </a>
      </div>

    </main>
  );
}