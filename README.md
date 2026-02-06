# Job Scheduler & Automation Dashboard

A mini automation engine that allows users to create background jobs,
run them asynchronously, track their status, and trigger webhooks on completion.

## Tech Stack

Frontend:
- Next.js (App Router)
- Tailwind CSS

Backend:
- Node.js
- Express.js

Database:
- MySQL

Other:
- Webhook.site (webhook testing)

## Architecture

Frontend (Next.js)
→ Backend REST API (Express)
→ MySQL Database
→ Webhook trigger on job completion

## API Endpoints

POST /jobs           → Create a job  
GET /jobs            → List all jobs  
GET /jobs/:id        → Get job details  
POST /run-job/:id    → Run a job (simulate background process)

## Database Schema

jobs table:
- id (PK)
- taskName
- payload (JSON)
- priority
- status
- createdAt
- updatedAt

## Webhook

When a job is completed, the backend sends a POST request to a webhook URL
(webhook.site) containing job metadata and completion timestamp.

## Setup Instructions

Backend:
1. cd backend
2. npm install
3. npm run dev

Frontend:
1. cd frontend
2. npm install
3. npm run dev

Make sure MySQL is running.

## AI Usage

AI Tools Used:
- ChatGPT (GPT-4 / GPT-5)

Used for:
- API structure guidance
- Debugging Next.js App Router issues
- UI suggestions
- Documentation assistance

All logic and implementation decisions were understood and validated manually.