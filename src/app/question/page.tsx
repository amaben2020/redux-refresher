"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Question = () => {
  const quiz = useSelector((state: RootState) => {
    // console.log("State", state);
    return state.quiz;
  });
  console.log(quiz.difficulty);
  console.log(quiz.questions);

  return (
    <div className="p-20">
      Question {quiz?.difficulty} -- {JSON.stringify(quiz.questions)}
    </div>
  );
};

export default Question;
