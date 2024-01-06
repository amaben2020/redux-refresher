"use client";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Question = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const quiz = useSelector((state: RootState) => {
    // console.log("State", state);
    return state.quiz;
  });
  console.log(quiz.questions);

  if (!isClient) {
    return null;
  }

  // make correct answer randomly appear with incorrect ones using random
  // ensure that only 1 question is shown per time
  // use progress bar
  // when answer is correct, update score by 1
  // click next after answer selection to move to next question, you cannot move back.

  return (
    <div className="p-20">
      {/* Question {quiz?.difficulty} -- {JSON.stringify(quiz.questions)} */}

      <h3>Question</h3>
      <p>{quiz?.difficulty}</p>
      <p>{quiz?.questions[0]?.type}</p>

      <div>
        {quiz?.questions.map((question) => (
          <>
            <h4>{question.question}</h4>
            {question.incorrect_answers.map((answer) => (
              <button>{answer}</button>
            ))}
          </>
        ))}
      </div>
    </div>
  );
};

export default Question;
