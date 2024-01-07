"use client";

import { limitQuestion } from "@/helpers/limitQuestion";
import { renderQuestionsRandomly } from "@/helpers/renderQuestionsRandomly";
import { useAppDispatch } from "@/hooks/redux-hook";
import { incrementScore } from "@/redux/features/quiz/quizSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

import { useCallback, useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import sanitizeHtml from "sanitize-html";

// ensure that only 1 question is shown per time ✅
// make correct answer randomly appear with incorrect ones using random ✅
// when answer is correct, update score by 1 ✅
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
  const [grade, setGrade] = useState<"pass" | "average" | "fail">();

  // the last question for the user
  const lastQuestion = quiz?.questions?.length === currentQuestionIndex + 1;

  // displays after the user has finished answering all questions
  const afterLastQuestion = currentQuestionIndex + 1 > quiz.questions?.length;

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const dispatch = useAppDispatch();

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      if (isCorrect) {
        toast.success(`Selected answer is correct`);
        dispatch(incrementScore(quiz?.questions?.length));
      } else {
        toast.error(`Selected answer is wrong`);
      }
      setTimeout(() => {
        setCurrentQuestionIndex((p) => p + 1);
        setSelectedAnswer("");
      }, 2000);
    },
    [dispatch, quiz?.questions?.length],
  );

  useEffect(() => {
    if (afterLastQuestion) {
      alert("End");
    }
    if (lastQuestion) {
      // show a modal to play again or finish
      // if play again is selected, modal displays settings
      // if finish is selected, modal displays svg based on grade
      //set score to 0

      if (quiz.score!! > 7) {
        setGrade("pass");
      } else if (quiz.score!! > 5 && quiz.score!! < 7) {
        setGrade("average");
      } else {
        setGrade("fail");
      }
    }
  }, [lastQuestion, quiz.score]);

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

      <p>{lastQuestion && <p> Grade : {grade} </p>}</p>

      <div>
        {limitQuestion(quiz?.questions, currentQuestionIndex).map(
          (question, _) => (
            <>
              <h4>
                {currentQuestionIndex + 1}. {sanitizeHtml(question.question)}
              </h4>
              <div className="flex flex-col gap-4 my-4">
                {renderQuestionsRandomly(question, id)?.map(
                  ({
                    question: answer,
                    correct_answer,
                    correct_answer_text,
                    id,
                  }) => {
                    const isCorrect = correct_answer;

                    return (
                      <>
                        <button
                          key={id}
                          onClick={(e) => {
                            setSelectedAnswer(e.target.textContent);
                            handleAnswer(isCorrect);
                          }}
                          className={`
                          ${
                            selectedAnswer.length && correct_answer_text
                              ? "bg-green-600"
                              : "bg-red-600"
                          } 
                          ${
                            !selectedAnswer.length && "!bg-white"
                          } border-2 p-3 rounded-lg cursor-pointer disabled:cursor-not-allowed hover:border-3 hover:border-gray-400`}
                          disabled={selectedAnswer.length > 0}
                        >
                          {sanitizeHtml(answer)}
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
          disabled={lastQuestion}
          onClick={() => {
            setCurrentQuestionIndex((p) => p + 1);
            // setSelectedAnswer("");
          }}
        >
          {lastQuestion ? "Last" : "Next"} Question
        </button>
      </div>
    </div>
  );
};

export default Question;
