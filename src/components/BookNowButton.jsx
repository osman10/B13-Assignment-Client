// components/BookNowButton.jsx
"use client";
import { toast } from "react-toastify";

 // ⚠️ must be client component

export default function BookNowButton() {

const handleBookNow = async () => {
  // Example booking data
  const bookingData = {
    userName: "John Doe",
    userEmail: "john@example.com",
    tutorId: "tutor123",
    date: "2026-05-25",
    time: "14:00",
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      // console.error("Booking failed:", errorData.message);
      toast.error("Failed to create booking: " + errorData.message);
      return;
    }

    const result = await response.json();
    // console.log("Booking successful:", result);
    toast.success("Booking created successfully!");
  } catch (error) {
    // console.error("Network or server error:", error);
    toast.error("An error occurred while booking. Please try again.");
  }
};


  return (
    <button
      onClick={handleBookNow}
      className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full"
    >
      Book Now
    </button>
  );
}