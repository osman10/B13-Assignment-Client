// components/BookNowButton.jsx
"use client"; // ⚠️ must be client component

export default function BookNowButton() {
  const handleBookNow = () => {
    
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