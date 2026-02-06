export default function Home() {
  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Job Scheduler Dashboard</h1>

      <div style={{ marginTop: 20 }}>
        <a href="/create">Create Job</a>
        <br />
        <a href="/jobs">View Jobs</a>
      </div>
    </main>
  );
}