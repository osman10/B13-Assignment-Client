
// get tutors data from the backend
export const tutorsData = async () => {
  try {
    const response = await fetch("http://localhost:5000/tutors", {
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




export const getSingleTutor = async (id) => {
  const response = await fetch(
    `http://localhost:5000/tutors/${id}`,
    {
      cache: "no-store",
    }
  );

  return response.json();
};