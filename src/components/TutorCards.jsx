import TutorClient from "./TutorClient";


const TutorCards = async () => {
  try {
    // 1. Get session from Better Auth
  

    if (!token) {
      throw new Error("No auth token found");
    }

    // 2. Fetch tutors with token
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`,
      {
        method: "GET",
        cache: "no-store",
        
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch tutors");
    }

    const tutors = await res.json();

    return <TutorClient tutors={tutors} />;
  } catch (error) {
    console.error("Tutor fetch error:", error);

    return (
      <div className="py-20 text-center text-red-500">
        Failed to load tutors
      </div>
    );
  }
};

export default TutorCards;