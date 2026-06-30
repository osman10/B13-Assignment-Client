"use client";

import Loading from "@/components/Loading";
import { UpdateTutor } from "@/components/UpdateTutor";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaBook, FaDollarSign, FaUserGraduate } from "react-icons/fa";

const MyTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Tutors:", tutors)
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const session = await authClient.getSession();
        const { data: tokenData } = await authClient.token();

        const userId = session?.data?.user?.id;
        const token = tokenData?.token;

        if (!userId || !token) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setTutors(data);
        } else {
          console.log(data.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tutor?"
    );

    if (!confirmDelete) return;

    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      // remove deleted tutor from UI
      setTutors((prev) =>
        prev.filter((tutor) => tutor._id !== id)
      );

      alert(data.message);

    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message);
    }
  };



  const handleTutorUpdate = (updatedTutor) => {
    setTutors((prev) =>
      prev.map((tutor) =>
        tutor._id === updatedTutor._id
          ? { ...tutor, ...updatedTutor }
          : tutor
      )
    );
  };





  if (loading) return <Loading />;
  return (
    <div className="container mx-auto px-4 py-10 min-h-[70vh]">
      <div className="overflow-x-auto dark:bg-base-200">
        {tutors.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-sky-600">My Tutors</h1>
                <p className="text-gray-500 mt-1">
                  Manage all of your tutor profiles in one place.
                </p>
              </div>
              <div className="bg-sky-100 text-sky-700 px-5 py-3 rounded-xl font-semibold shadow">
                {tutors.length} Tutors
              </div>
            </div>
            <div className="grid gap-4">
              {tutors.map((tutor) => (

                <div
                  key={tutor._id}
                  className="rounded-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all p-4"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Tutor Info */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-800 dark:text-gray-100">
                      <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {tutor.TutorName}
                      </h2>

                      <p className="flex items-center gap-2">
                        <FaBook className="text-green-600" />
                        <span className="font-medium">{tutor.Subject}</span>
                      </p>

                      <p className="flex items-center gap-2">
                        <FaDollarSign className="text-yellow-500" />
                        <span className="font-medium">${tutor.HourlyFee}/hr</span>
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-3">
                      <button

                        className=""
                      >

                        <UpdateTutor
                          tutor={tutor}
                          onUpdate={handleTutorUpdate}
                        />
                      </button>

                      <button
                        onClick={() => handleDelete(tutor._id)}
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-1 text-white"
                      >
                        <FaTrashAlt />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <FaUserGraduate
              className="text-gray-300 mb-4"
              size={70}
            />
            <h2 className="text-2xl font-semibold">
              No Tutors Found
            </h2>
            <p className="text-gray-500 mt-2">
              You haven't added any tutor yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default MyTutors;