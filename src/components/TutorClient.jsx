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
      const nameMatch =
        tutor.TutorName.toLowerCase().includes(search.toLowerCase()) ||
        tutor.Subject.toLowerCase().includes(search.toLowerCase());

      const tutorStart = new Date(tutor.SessionStartDate).toISOString().split("T")[0];
      const tutorEnd = new Date(tutor.SessionEndDate).toISOString().split("T")[0];

      const startMatch = startDate ? tutorStart >= startDate : true;
      const endMatch = endDate ? tutorEnd <= endDate : true;

      return nameMatch && startMatch && endMatch;
    });
  }, [tutors, search, startDate, endDate]);

  const resetFilters = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Your Favorite Tutors
      </h1>

      {/* FILTER SECTION */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search tutor or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border px-4 py-2"
        />

        {/* Session Start */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="rounded-lg border px-4 py-2"
        />

        {/* Session End */}
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="rounded-lg border px-4 py-2"
        />

        {/* Reset */}
        <button
          onClick={resetFilters}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Reset
        </button>
      </div>

      {/* NO DATA */}
      {filteredTutors.length === 0 ? (
        <div className="py-20 text-center text-xl font-semibold text-gray-500">
          No tutor available
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTutors.map((tutor) => (
            <div
              key={tutor._id}
              className="overflow-hidden rounded-2xl border bg-white shadow-md hover:shadow-xl"
            >
              <Image
                src={tutor.PhotoURL}
                alt={tutor.TutorName}
                width={400}
                height={250}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">
                <div className="mb-2 flex justify-between">
                  <h2 className="text-xl font-bold">{tutor.TutorName}</h2>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    {tutor.Subject}
                  </span>
                </div>

                <p className="mb-3 text-sm text-gray-600">
                  {tutor.Description?.slice(0, 100)}...
                </p>

                <p className="text-sm text-gray-600">
                  Start: {new Date(tutor.SessionStartDate).toLocaleDateString()}
                </p>

                <p className="text-sm text-gray-600 mb-4">
                  End: {new Date(tutor.SessionEndDate).toLocaleDateString()}
                </p>

                <Link href={`/tutors/${tutor._id}`}>
                  <button className="w-full rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800">
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