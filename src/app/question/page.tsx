"use client";

import Modal from "@/components/elements/modal";
import { limitQuestion } from "@/helpers/limitQuestion";
import { renderQuestionsRandomly } from "@/helpers/renderQuestionsRandomly";
import { useAppDispatch } from "@/hooks/redux-hook";
import {
  incrementScore,
  resetQuestions,
  resetScore,
} from "@/redux/features/quiz/quizSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useCallback, useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import averageSVG from "./../../assets/average.svg";
import failSVG from "./../../assets/fail.svg";
import successSVG from "./../../assets/success.svg";

const Question = () => {
  const [isClient, setIsClient] = useState(false);
  const id = useId();
  useEffect(() => {
    setIsClient(true);
  }, []);

  const quiz = useSelector((state: RootState) => state.quiz);
  const router = useRouter();

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

  const [isOpen, setIsOpen] = useState(false);

  const computeScore = useCallback(() => {
    const totalLength = quiz.questions?.length;
    const totalScores = quiz.score;

    return Number(totalScores!! / totalLength!!);
  }, [quiz.questions?.length, quiz.score]);

  useEffect(() => {
    if (lastQuestion) {
      // show a modal to play again or finish
      // if play again is selected, modal displays settings
      // if finish is selected, modal displays svg based on grade
      //set score to 0

      const computedScore = computeScore();
      console.log(computeScore());

      if (computedScore!! > 0.7) {
        setGrade("pass");
      } else if (computedScore!! > 0.5 && computedScore!! < 0.7) {
        setGrade("average");
      } else if (computedScore < 0.5 && computedScore >= 0) {
        setGrade("fail");
      }

      // if (quiz.score!! > 7) {
      //   setGrade("pass");
      // } else if (quiz.score!! > 5 && quiz.score!! < 7) {
      //   setGrade("average");
      // } else {
      //   setGrade("fail");
      // }
    }
  }, [afterLastQuestion, computeScore, lastQuestion, quiz.score]);

  useEffect(() => {
    if (afterLastQuestion && quiz.score!! > 0) {
      setIsOpen(true);
    }
  }, [afterLastQuestion, quiz.score]);

  useEffect(() => {
    if (quiz.questions?.length === 0) {
      router.push("/");
    }
  }, [quiz.questions?.length, router]);

  if (!isClient) {
    return null;
  }

  const handleToggleModal = () => setIsOpen((p) => !p);

  return (
    <div className="p-20 border-2 justify-center flex flex-col items-center">
      <h3>Question</h3>
      <p>{quiz?.difficulty}</p>

      <p>
        Score {Number(quiz.score)}/{quiz?.questions?.length}
      </p>

      <div>
        <button
          onClick={() => {
            dispatch(resetScore());
            router.push("/");
          }}
        >
          {" "}
          Reset Game
        </button>
      </div>

      <p>{lastQuestion && <p> Grade : {grade} </p>}</p>

      {afterLastQuestion ? (
        grade === "pass" ? (
          <Modal handleToggleModal={handleToggleModal} isOpen={isOpen}>
            {" "}
            <div>
              PASS SVG with score
              <Image src={successSVG} height={150} width={100} alt="" />
              <button
                onClick={() => {
                  dispatch(resetScore());
                  dispatch(resetQuestions());
                }}
              >
                Try Again
              </button>
            </div>
          </Modal>
        ) : grade === "average" ? (
          <Modal handleToggleModal={handleToggleModal} isOpen={isOpen} alt="">
            {" "}
            <div>
              <Image height={150} width={100} src={averageSVG} alt="" />
            </div>
            Average SVG with score
          </Modal>
        ) : (
          <Modal handleToggleModal={handleToggleModal} isOpen={isOpen}>
            {" "}
            <div>
              <Image height={150} width={100} src={failSVG} alt="" />
            </div>
            Fail SVG with score and go to setting
          </Modal>
        )
      ) : (
        <div>
          {limitQuestion(quiz?.questions, currentQuestionIndex).map(
            (question, _) => (
              <>
                <h4>
                  {/* {currentQuestionIndex + 1}. {sanitizeHtml(question.question)} */}
                  {currentQuestionIndex + 1}. {question.question}
                </h4>
                <div className="flex flex-col gap-4 my-4">
                  {renderQuestionsRandomly(question, id)?.map(
                    ({
                      question: answer,
                      correct_answer,
                      correct_answer_text,
                      id,
                    }) => {
                      console.log(answer);
                      const isCorrect = correct_answer;

                      return (
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
                          {/* {sanitizeHtml(answer)} */}
                          {answer}
                        </button>
                      );
                    },
                  )}
                </div>
              </>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
