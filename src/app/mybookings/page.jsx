"use client";

import Loading from "@/components/Loading";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaUserTie } from "react-icons/fa";
import Link from "next/link";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            const session = await authClient.getSession();
            const userId = session?.data?.user?.id;
            setUserId(userId);

            const { data: tokenData } = await authClient.token();
            const token = tokenData?.token;

            if (!token) {
                setError("Authentication token not found.");
                return;
            }

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch bookings");
                }

                const data = await res.json();
                setBookings(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);


    // Cancel booking function
    const handleCancel = async (id) => {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        status: "Cancelled",
                    }),
                }
            );


            if (!res.ok) {
                throw new Error("Failed to cancel booking");
            }


            setBookings((prev) =>
                prev.map((booking) =>
                    booking._id === id
                        ? { ...booking, status: "Cancelled" }
                        : booking
                )
            );

        } catch (error) {
            console.error(error);
        }
    };
    if (loading) return <p><Loading /></p>;

    return (
        <div className="container mx-auto px-4 py-8 min-h-[70vh]">

            <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-sky-600  tracking-tight">
                    My Bookings
                </h1>

                <p className="mt-2 text-gray-500 text-lg">
                    Manage your booked tutors and upcoming sessions
                </p>

                <div className="mt-4 h-1 w-24 rounded-full bg-blue-600"></div>
            </div>

            {bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">

                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 mb-5">
                        <svg
                            className="w-10 h-10 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        No Bookings Yet
                    </h2>
                    <p className="text-gray-500 mt-2 text-center max-w-md">
                        You haven't booked any tutor sessions yet.
                        Find a tutor and start your learning journey.
                    </p>
                    <Link href="/tutors"
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
                    >
                        Find Tutor
                    </Link>

                </div>
            ) : (

                <div className="grid gap-5">

                    {bookings.map((booking) => (

                        <div key={booking._id} >

                            <div className="w-full flex justify-between items bg-white border border-gray-200 shadow dark:bg-slate-700 rounded-md p-4">
                                <div className="flex items-center gap-4 text-gray-800 dark:text-gray-200 ">

                                    <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 flex items-center justify-between gap-2">
                                        <span className="text-sky-800 dark:text-white"><FaUserTie size={20} /></span> {booking.tutorName}
                                    </h2>

                                    <p className="text-white flex items-center gap-2 text-sm font-medium bg-sky-600 px-3 py-1 rounded-full">
                                        <CiMail size={20} /> {booking.userEmail}
                                    </p>
                                </div>

                                <div className="flex md:justify-end gap-4 items-center mt-4 md:mt-0">
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${booking.status === "Booked"
                                            ? "bg-green-100 text-green-700"
                                            : booking.status === "Cancelled"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {booking.status}
                                    </span>
                                    <button
                                        onClick={() => handleCancel(booking._id)}
                                        disabled={booking.status === "Cancelled"}
                                        className={`font-medium px-4 py-2 rounded-xl transition w-full md:w-auto ${booking.status === "Cancelled"
                                                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                                : "bg-red-500 hover:bg-red-600 active:scale-95 text-white"
                                            }`}
                                    >
                                        {booking.status === "Cancelled" ? "Cancelled" : "Cancel Booking"}
                                    </button>

                                </div>
                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}