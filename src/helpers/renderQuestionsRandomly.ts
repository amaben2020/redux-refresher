import { shuffleArray } from "./shuffleArray";

export const renderQuestionsRandomly = (question: any, id: string) => {
  const { correct_answer, incorrect_answers } = question;

  const incorrectAnswers = incorrect_answers.map((answer: any) => ({
    correct_answer: false,

    question: answer,
    id: answer.length,
  }));
  const correctAnswer = [
    {
      correct_answer: true,
      question: correct_answer,
      correct_answer_text: correct_answer,
      id,
    },
  ];

  const allAnswers = [...incorrectAnswers, ...correctAnswer];

  console.log(allAnswers);

  console.log("shuffleArray(questions)", shuffleArray(allAnswers));
  // return shuffleArray(questions);
  return allAnswers;
};
