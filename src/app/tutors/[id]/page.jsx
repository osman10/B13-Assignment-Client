"use client";

import TutorDetails from "@/components/TutorDetails";
import { authClient } from "@/lib/auth-client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchTutor = async () => {
      try {
        setLoading(true);

        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        if (!token) {
          setError("Authentication token not found.");
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch tutor.");
        }

        setTutor(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-6 flex flex-col gap-2 items-center justify-center min-h-[70vh]"> Loading Tutor's Information...</div>;
  }
 
  if (error) {
    return <div className="container mx-auto p-6 text-red-500">{error}</div>;
  }

  return (
    <TutorDetails tutor={tutor} />
  );
}