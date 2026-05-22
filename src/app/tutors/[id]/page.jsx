
// app/tutors/[id]/page.jsx

import BookNowButton from "@/components/BookNowButton";
import { getSingleTutor } from "@/lib/tutorData";
import Image from "next/image";

const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;
  const tutor = await getSingleTutor(id);
  const { PhotoURL, TutorName, Subject, HourlyFee, TotalSlots, Available, SessionStartDate, SessionEndDate, Institution, Experience, Location, TeachingMode, Description } = tutor;

 


  return (
    <div className="container mx-auto p-6">
      <div className="border rounded-xl p-4 shadow flex flex-col md:flex-row gap-10 items-center text-gray-800  dark:bg-gray-800">
        {/* Tutor Photo */}
        <div className="flex-1 ">
          <Image src={PhotoURL} alt={TutorName} width={100} height={100} className="w-full rounded-lg" />
        </div>
        {/* Tutor Information */}
        <div className="flex-1">
          <div className="flex flex-col justify-between h-full">
                      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            <div className="flex items-center gap-6 mb-6">
              <div>
                <h2 className="text-2xl font-bold">{TutorName}</h2>
                <p className="text-gray-600">{Subject} Tutor</p>
              </div>
            </div>

            <table className="w-full border border-gray-300">
              <tbody>
                <tr className="border-b">
                  <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">Hourly Fee</td>
                  <td className="p-3">${HourlyFee}</td>
                </tr>

                <tr className="border-b">
                  <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">Total Slots</td>
                  <td className="p-3">{TotalSlots}</td>
                </tr>

                <tr className="border-b">
                  <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">Available</td>
                  <td className="p-3">{Available}</td>
                </tr>

                <tr className="border-b">
                  <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">
                    Session Start Date
                  </td>
                  <td className="p-3">
                    {new Date(SessionStartDate).toUTCString()}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">
                    Session End Date
                  </td>
                  <td className="p-3">
                    {new Date(SessionEndDate).toUTCString()}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">Institution</td>
                  <td className="p-3">{Institution}</td>
                </tr>

                <tr className="border-b">
                  <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">Experience</td>
                  <td className="p-3">{Experience}</td>
                </tr>

                <tr className="border-b">
                  <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">Location</td>
                  <td className="p-3">{Location}</td>
                </tr>

                <tr className="border-b">
                  <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">Teaching Mode</td>
                  <td className="p-3">{TeachingMode}</td>
                </tr>

                <tr>
                  <td className="font-semibold p-3 bg-gray-100 min-w-[150px]">Description</td>
                  <td className="p-3">{Description}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <BookNowButton />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsPage;