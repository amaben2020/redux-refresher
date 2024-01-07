"use client";

import { limitQuestion } from "@/helpers/limitQuestion";
import { renderQuestionsRandomly } from "@/helpers/renderQuestionsRandomly";
import { useAppDispatch } from "@/hooks/redux-hook";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

import { useCallback, useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import sanitizeHtml from "sanitize-html";

// ensure that only 1 question is shown per time ✅
// make correct answer randomly appear with incorrect ones using random ✅
// when answer is correct, update score by 1
// use progress bar
// click next after answer selection to move to next question, you cannot move back.

//bugs:
// 1. questions are still randomly sorted after selection

const Question = () => {
  const [isClient, setIsClient] = useState(false);
  const id = useId();
  useEffect(() => {
    setIsClient(true);
  }, []);

  const quiz = useSelector((state: RootState) => state.quiz);
  const router = useRouter();

  useEffect(() => {
    if (!quiz.questions?.length) {
      router.push("/");
    }
  }, [quiz.questions?.length, router]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const finalQuestion = quiz?.questions?.length === currentQuestionIndex + 1;

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const dispatch = useAppDispatch();

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      if (selectedAnswer.length) {
        console.log("selectedAnswer", selectedAnswer);
        toast.info(selectedAnswer);
        if (isCorrect) {
          // console.log(selectedAnswer);
          // toast.success(`${selectedAnswer} is correct`);
          // dispatch(incrementScore());
          // setTimeout(() => {
          //   // setCurrentQuestionIndex((p) => p + 1);
          // }, 1200);
        } else {
          setTimeout(() => {
            // setCurrentQuestionIndex((p) => p + 1);
            // toast.error(`${String(selectedAnswer)} is wrong`);
            // setSelectedAnswer("");
          }, 1200);
        }
      }
    },
    [selectedAnswer],
  );

  const handleSelectAnswer = (answer: string) => {
    console.log(answer);
    setSelectedAnswer(answer);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="p-20 border-2 justify-center flex flex-col items-center">
      <h3>Question</h3>
      <p>{quiz?.difficulty}</p>

      <p>
        Score {Number(quiz.score)}/{quiz?.questions?.length}
      </p>

      <div>
        {limitQuestion(quiz?.questions, currentQuestionIndex).map(
          (question, _) => (
            <>
              <h4>
                {currentQuestionIndex + 1}. {sanitizeHtml(question.question)}
              </h4>
              <div className="flex flex-col gap-4 my-4">
                {renderQuestionsRandomly(question, id)?.map(
                  ({ question: answer, correct_answer, id }, index) => {
                    const isCorrect = selectedAnswer === correct_answer;
                    return (
                      <>
                        <button
                          key={id}
                          onClick={() => {
                            handleSelectAnswer(answer);
                            if (selectedAnswer.length > 0) {
                              handleAnswer(isCorrect);
                            }
                          }}
                          className={`${
                            isCorrect || correct_answer === answer
                              ? "bg-green-600"
                              : "bg-red-600"
                          } ${
                            !selectedAnswer && "bg-white"
                          } border-2 p-3 rounded-lg disabled:cursor-not-allowed hover:bg-gray-200 hover:border-3 hover:border-gray-400`}
                          // disabled={
                          //   selectedAnswer.length > 0 &&
                          //   selectedAnswer !== answer
                          // }
                        >
                          {answer} {selectedAnswer}
                        </button>
                      </>
                    );
                  },
                )}
              </div>
            </>
          ),
        )}
        <button
          className="border-2 p-3 rounded-lg w-full mt-6 italic hover:bg-green-600 hover:border-white hover:text-white transition-all duration-200"
          disabled={finalQuestion}
          onClick={() => {
            setCurrentQuestionIndex((p) => p + 1);
            // setSelectedAnswer("");
          }}
        >
          {finalQuestion ? "Last" : "Next"} Question
        </button>

        <p className="text-black text-lg"> {!selectedAnswer} </p>
      </div>
    </div>
  );
};

export default Question;
