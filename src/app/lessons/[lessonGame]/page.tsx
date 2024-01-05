"use client";
import { useParams, useSearchParams } from "next/navigation";

const LessonGame = () => {
  const params = useParams();
  const query = useSearchParams();

  return <div>LessonGame</div>;
};

export default LessonGame;
