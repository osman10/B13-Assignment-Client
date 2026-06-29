"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Tutor from "@/assets/Tutor.jpeg";

import { FaArrowRight, FaStar, FaBookReader } from "react-icons/fa";
import { HiOutlineAcademicCap } from "react-icons/hi";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl"></div>
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700 dark:bg-sky-900 dark:text-sky-300">
              ⭐ Trusted by 500+ Students
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight lg:text-6xl">
              Find Your
              <span className="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent">
                {" "}
                Perfect Tutor
              </span>
              <br />
              For Every Subject
            </h1>

            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Learn from experienced tutors, schedule sessions instantly,
              and achieve your academic goals with a personalized learning
              experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/tutors">
                <button className="flex items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600">
                  Explore Tutors
                  <FaArrowRight />
                </button>
              </Link>

              <Link href="/addtutor">
                <button className="rounded-lg border border-sky-500 px-6 py-3 font-semibold text-sky-600 transition hover:bg-sky-500 hover:text-white">
                  Become a Tutor
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="rounded-2xl border bg-background p-5 shadow">
                <FaStar className="mb-2 text-xl text-yellow-500" />
                <h2 className="text-2xl font-bold">4.9</h2>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>

              <div className="rounded-2xl border bg-background p-5 shadow">
                <HiOutlineAcademicCap className="mb-2 text-2xl text-sky-500" />
                <h2 className="text-2xl font-bold">250+</h2>
                <p className="text-sm text-muted-foreground">Expert Tutors</p>
              </div>

              <div className="rounded-2xl border bg-background p-5 shadow">
                <FaBookReader className="mb-2 text-xl text-green-500" />
                <h2 className="text-2xl font-bold">1200+</h2>
                <p className="text-sm text-muted-foreground">Sessions</p>
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="overflow-hidden rounded-[30px] border bg-white p-3 shadow-2xl dark:bg-slate-900">
              <Image
                src={Tutor}
                alt="Tutor"
                width={650}
                height={650}
                className="rounded-[24px] object-cover"
                priority
              />
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute left-0 top-10 rounded-2xl bg-white p-4 shadow-xl dark:bg-slate-900"
            >
              <h3 className="font-semibold">🎯 20+ Subjects</h3>
              <p className="text-sm text-muted-foreground">
                Learn Anytime
              </p>
            </motion.div>

            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute -right-4 bottom-12 rounded-2xl bg-white p-4 shadow-xl dark:bg-slate-900"
            >
              <h3 className="font-semibold">📅 Easy Booking</h3>
              <p className="text-sm text-muted-foreground">
                Instant Confirmation
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;