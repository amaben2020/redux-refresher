"use client";

import { shuffleArray } from "@/helpers/shuffleArray";
import { useAppDispatch } from "@/hooks/redux-hook";
import { incrementScore } from "@/redux/features/quiz/quizSlice";
import { RootState } from "@/redux/store";

import { useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import sanitizeHtml from "sanitize-html";

const Question = () => {
  const [isClient, setIsClient] = useState(false);
  const id = useId();
  useEffect(() => {
    setIsClient(true);
  }, []);

  const quiz = useSelector((state: RootState) => state.quiz);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const finalQuestion = quiz?.questions?.length === currentQuestionIndex + 1;

  const [selectedAnswer, setSelectedAnswer] = useState("");

  // ensure that only 1 question is shown per time ✅
  // make correct answer randomly appear with incorrect ones using random ✅
  // when answer is correct, update score by 1
  // use progress bar
  // click next after answer selection to move to next question, you cannot move back.

  //bugs:
  // 1. questions are still randomly sorted after selection

  const limitQuestion = (array: any, index: number) => {
    const newArray = [...array];

    const limitedQuestion = newArray.slice(index, index + 1);

    return limitedQuestion;
  };

  const renderQuestionsRandomly = (question: any) => {
    const { correct_answer, incorrect_answers } = question;

    const incorrectAnswers = incorrect_answers.map((answer: any) => ({
      correct_answer: false,
      question: answer,
      id: answer.length,
    }));
    const correctAnswer = [
      { correct_answer: correct_answer, question: correct_answer, id },
    ];

    const allAnswers = [...incorrectAnswers, ...correctAnswer];

    console.log(allAnswers);
    // const allQuestions = questions.map(question => ({
    //   question:
    // }))
    console.log("shuffleArray(questions)", shuffleArray(allAnswers));
    // return shuffleArray(questions);
    return allAnswers;
  };

  const displayColorForQuestion = (question: any): boolean =>
    selectedAnswer === question.correct_answer;

  const dispatch = useAppDispatch();

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
                {renderQuestionsRandomly(question)?.map(
                  ({ question: answer, correct_answer, id }, index) => {
                    const isCorrect = selectedAnswer === correct_answer;

                    return (
                      <>
                        <button
                          onClick={() => {
                            setSelectedAnswer(answer);
                            if (isCorrect) {
                              toast.success(`${selectedAnswer} correct`);
                              dispatch(incrementScore());
                            }
                            displayColorForQuestion(question);
                            setTimeout(() => {
                              // setCurrentQuestionIndex((p) => p + 1);
                              // setSelectedAnswer("");
                              // toast.success("correct");
                            }, 500);
                          }}
                          className={`${
                            isCorrect ? "bg-green-600" : "bg-red-600"
                          } ${
                            !selectedAnswer.length && "!bg-white"
                          } border-2 p-3 rounded-lg disabled:cursor-not-allowed`}
                          // disabled={
                          //   selectedAnswer.length > 0 &&
                          //   selectedAnswer !== answer
                          // }
                        >
                          {answer}
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
            setSelectedAnswer("");
          }}
        >
          {finalQuestion ? "Last" : "Next"} Question
        </button>

        <p className="text-black text-lg"> {!selectedAnswer.length} </p>
      </div>
    </div>
  );
};

export default Question;
