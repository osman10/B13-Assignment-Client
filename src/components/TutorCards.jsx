import { tutorsData } from "@/lib/tutorData";
import Image from "next/image";
import Link from "next/link";

const TutorCards = async () => {
  const tutors = await tutorsData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Your Favorite Tutors
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor) => {
          const {
            _id,
            PhotoURL,
            TutorName,
            Subject,
            Description,
          } = tutor;

          return (
            <div
              key={_id}
              className="overflow-hidden rounded-2xl border bg-white shadow-md transition hover:shadow-xl"
            >
              <Image
                src={PhotoURL}
                alt={TutorName}
                width={400}
                height={250}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {TutorName}
                  </h2>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    {Subject}
                  </span>
                </div>

                <p className="mb-4 text-sm text-gray-600">
                  {Description?.slice(0, 100)}...
                </p>

                <Link href={`/tutors/${_id}`}>
                  <button className="w-full rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TutorCards;