"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TutorClient = ({ tutors = [] }) => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const keyword = search.toLowerCase();

      const searchMatch =
        tutor.TutorName?.toLowerCase().includes(keyword) ||
        tutor.Subject?.toLowerCase().includes(keyword);

      const tutorStart = new Date(tutor.SessionStartDate)
        .toISOString()
        .split("T")[0];

      const tutorEnd = new Date(tutor.SessionEndDate)
        .toISOString()
        .split("T")[0];

      const startMatch = startDate ? tutorStart >= startDate : true;
      const endMatch = endDate ? tutorEnd <= endDate : true;

      return searchMatch && startMatch && endMatch;
    });
  }, [tutors, search, startDate, endDate]);

  const resetFilters = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-10 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-center text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
        Our Tutors
      </h1>

      {/* Filter Section */}
      <div className="mb-10 grid gap-4 md:grid-cols-4">
        <input
          type="text"
          placeholder="Search tutor or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
        />

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="rounded-lg border px-4 py-3 focus:border-blue-500 focus:outline-none"
        />

        <button
          onClick={resetFilters}
          className="rounded-lg bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600"
        >
          Reset
        </button>
      </div>

      {/* Tutor Cards */}
      {filteredTutors.length === 0 ? (
        <div className="py-20 text-center text-xl font-semibold text-gray-500">
          No tutors found.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTutors.map((tutor) => (
            <div
              key={tutor._id}
              className="overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={tutor.PhotoURL || "/default-avatar.jpg"}
                  alt={tutor.TutorName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-800">
                    {tutor.TutorName}
                  </h2>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    {tutor.Subject}
                  </span>
                </div>

                <p className="text-gray-600">
                  {tutor.Description?.slice(0, 100)}...
                </p>

                <div className="space-y-1 text-sm text-gray-500">
                  <p>
                    <strong>Start:</strong>{" "}
                    {new Date(tutor.SessionStartDate).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>End:</strong>{" "}
                    {new Date(tutor.SessionEndDate).toLocaleDateString()}
                  </p>
                </div>

                <Link href={`/tutors/${tutor._id}`}>
                  <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorClient;