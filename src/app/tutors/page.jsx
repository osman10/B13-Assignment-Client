import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import TutorClient from "@/components/TutorClient";

const Page = async () => {
  try {
    // Get Better Auth session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("No session found");
    }

    const token = session.session.token;

    // Fetch backend API
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch tutors");
    }

    const tutors = await res.json();

    return (
      <div>
        <TutorClient tutors={tutors} />
      </div>
    );
  } catch (error) {
    console.error("Tutor fetch error:", error);

    return (
      <div className="py-20 text-center text-red-500">
        Failed to load tutors
      </div>
    );
  }
};

export default Page;