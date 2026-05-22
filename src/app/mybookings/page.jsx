// Mybookings.jsx (or page.jsx if using Next.js app directory)

const Mybookings = async () => {
    try {
        // Fetch data from your server endpoint
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`); // adjust URL if needed
        if (!res.ok) throw new Error("Failed to fetch bookings");

        const bookings = await res.json();
        console.log(bookings);



        // userName

        // userEmail

        // tutorName

        // phoneNumber

        // status



        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl mb-4">My Bookings</h1>
                <ul>
                    {bookings.map((booking) => (
                        <li
                            key={booking._id}
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border p-4 mb-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Left section: booking details */}
                            <div className="flex flex-col sm:flex-row sm:gap-6 w-full sm:w-auto">
                                <p className="text-gray-800 font-medium"><span className="font-semibold">User:</span> {booking.userName}</p>
                                <p className="text-gray-600"><span className="font-semibold">Email:</span> {booking.userEmail}</p>
                                <p className="text-gray-800"><span className="font-semibold">Tutor:</span> {booking.tutorName}</p>
                                <p className={`font-semibold ${booking.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>
                                    Status: {booking.status}
                                </p>
                            </div>

                            {/* Right section: Cancel button */}
                            <div className="mt-3 sm:mt-0">
                                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl transition-colors">
                                    Cancel Booking
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } catch (err) {
        return (
            <div className="container mx-auto p-4">
                <p className="text-red-500">Error: {err.message}</p>
            </div>
        );
    }
};

export default Mybookings;