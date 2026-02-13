export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        Job Scheduler Dashboard
      </h1>

      <div className="flex justify-center gap-4">
        <a
          href="/create"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
        >
          Create New Job
        </a>

        <a
          href="/jobs"
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700"
        >
          View All Jobs
        </a>
      </div>
    </main>
  );
}
