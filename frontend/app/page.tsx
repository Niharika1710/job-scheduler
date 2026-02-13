"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-10">

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-12 text-center"
      >
        🚀 Job Scheduler System
      </motion.h1>

      <div className="flex gap-8">

        <Link href="/create">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-blue-600 px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            ➕ Create Job
          </motion.button>
        </Link>

        <Link href="/jobs">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-green-600 px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:bg-green-700 transition"
          >
            📊 View Dashboard
          </motion.button>
        </Link>

      </div>

    </main>
  );
}