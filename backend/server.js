const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const db = require("./db");

const app = express();

// ✅ Allow requests from Next.js frontend
app.use(cors());

app.use(express.json());

// =======================
// TEST ROUTE
// =======================
app.get("/", (req, res) => {
  res.send("Job Scheduler API Running");
});

// =======================
// CREATE JOB
// =======================
app.post("/jobs", async (req, res) => {
  try {
    const { taskName, payload, priority } = req.body;

    if (!taskName || !payload || !priority) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [result] = await db.query(
      "INSERT INTO jobs (taskName, payload, priority, status) VALUES (?, ?, ?, 'pending')",
      [taskName, JSON.stringify(payload), priority]
    );

    res.json({ message: "Job created", jobId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// =======================
// GET ALL JOBS (DEBUG VERSION)
// =======================
app.get("/jobs", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM jobs ORDER BY id DESC");
    console.log("DB result:", result);
    res.json(result[0]);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({
      error: err.message,
      code: err.code,
      sqlMessage: err.sqlMessage
    });
  }
});

// =======================
// GET SINGLE JOB (DETAILS)
// =======================
app.get("/jobs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM jobs WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// =======================
// RUN JOB
// =======================
app.post("/run-job/:id", async (req, res) => {
  try {
    const jobId = req.params.id;

    const [jobs] = await db.query("SELECT * FROM jobs WHERE id = ?", [jobId]);
    if (jobs.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    const job = jobs[0];

    if (job.status !== "pending") {
      return res.status(400).json({ message: "Job already processed" });
    }

    // Update to running
    await db.query("UPDATE jobs SET status = 'running' WHERE id = ?", [jobId]);

    // Simulate 3 sec processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Update to completed
    await db.query("UPDATE jobs SET status = 'completed' WHERE id = ?", [jobId]);

    // Safe payload parsing
    let parsedPayload;
    try {
      parsedPayload = typeof job.payload === "string"
        ? JSON.parse(job.payload)
        : job.payload;
    } catch {
      parsedPayload = job.payload;
    }

    const webhookPayload = {
      jobId: job.id,
      taskName: job.taskName,
      priority: job.priority,
      payload: parsedPayload,
      completedAt: new Date()
    };

    // 🔔 Replace with your webhook.site URL
    await axios.post("https://webhook.site/YOUR_UNIQUE_ID", webhookPayload);

    console.log("Webhook sent successfully");

    res.json({ message: "Job completed and webhook triggered" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
