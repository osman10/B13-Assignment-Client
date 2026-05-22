
// get tutors data from the backend
export const tutorsData = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch tutors");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching tutors:", error);
    return [];
  }
};


// booking data
export const bookings = async () => {
  try {
    const booking = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {

      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch tutors");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching tutors:", error);
    return [];
  }
}





export const getSingleTutor = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`,
    {
      cache: "no-store",
    }
  );

  return response.json();
};

