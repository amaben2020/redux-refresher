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

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const finalQuestion = quiz?.questions.length === currentQuestionIndex + 1;
  console.log(quiz?.questions.length);
  console.log(currentQuestionIndex);

  // useEffect(() => {
  //   if (finalQuestion) {
  //     alert("last question");
  //   }
  // }, [finalQuestion]);

  if (!isClient) {
    return null;
  }

  // ensure that only 1 question is shown per time ✅
  // make correct answer randomly appear with incorrect ones using random
  // use progress bar
  // when answer is correct, update score by 1
  // click next after answer selection to move to next question, you cannot move back.

  const limitQuestion = (array: any, index: number) => {
    const newArray = [...array];

    const limitedQuestion = newArray.slice(index, index + 1);

    return limitedQuestion;
  };

  return (
    <div className="p-20 border-2 justify-center flex flex-col items-center">
      <h3>Question</h3>
      <p>{quiz?.difficulty}</p>
      <p>{quiz?.questions[0]?.type}</p>

      <p>Score 0/10</p>

      <div>
        {limitQuestion(quiz?.questions, currentQuestionIndex).map(
          (question, index) => (
            <>
              <h4>
                {currentQuestionIndex + 1}. {question.question}
              </h4>
              <div className="flex flex-col gap-4 my-4">
                {question.incorrect_answers.map((answer, _) => (
                  <>
                    <button className="border-2 p-3 rounded-lg">
                      {answer}
                    </button>
                  </>
                ))}
              </div>
            </>
          ),
        )}
        <button
          className="border-2 p-3 rounded-lg w-full mt-6 italic hover:bg-green-600 hover:border-white hover:text-white transition-all duration-200"
          disabled={finalQuestion}
          onClick={() => setCurrentQuestionIndex((p) => p + 1)}
        >
          {finalQuestion ? "Last" : "Next"} Question
        </button>
      </div>
    </div>
  );
};

export default Question;
