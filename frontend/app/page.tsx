"use client";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-black text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-12 py-6">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Rocket className="text-blue-500" />
          JS
        </div>
        <div className="space-x-8 text-gray-400">
          <Link href="/dashboard">Features</Link>
          <Link href="/dashboard">Pricing</Link>
          <Link href="/dashboard">Resources</Link>
          <button className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="text-center mt-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold leading-tight"
        >
          Job Scheduler. Orchestrate <br /> Your Workflows 🚀
        </motion.h1>

        <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
          A powerful, secure, and user-friendly system to manage,
          schedule, and monitor your professional tasks efficiently.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <Link href="/create">
            <button className="bg-blue-600 px-8 py-3 rounded-xl hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>

          <Link href="/dashboard">
            <button className="border border-blue-500 px-8 py-3 rounded-xl hover:bg-blue-800 transition">
              View Dashboard
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}