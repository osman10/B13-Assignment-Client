import { tutorsData } from "@/lib/tutorData";
import TutorClient from "./TutorClient";

const TutorCards = async () => {
  const tutors = await tutorsData();

  return <TutorClient tutors={tutors} />;
};

export default TutorCards;