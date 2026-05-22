

import TutorDetails from "@/components/TutorDetails";
import { authClient } from "@/lib/auth-client";
import { getSingleTutor } from "@/lib/tutorData";


const TutorDetailsPage = async ({ params }) => {
  const { id } = await params;
  const tutor = await getSingleTutor(id);





  return (
    <TutorDetails tutor={tutor}/>
  );
};

export default TutorDetailsPage;