import { shuffleArray } from "./shuffleArray";
const decodeHTML = function (html: any) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
export const renderQuestionsRandomly = (question: any, id: string) => {
  const { correct_answer, incorrect_answers } = question;

  const incorrectAnswers = incorrect_answers.map((answer: any) => ({
    correct_answer: false,

    question: decodeHTML(answer),
    id: answer.length,
  }));
  const correctAnswer = [
    {
      correct_answer: true,
      question: decodeHTML(correct_answer),
      correct_answer_text: decodeHTML(correct_answer),
      id,
    },
  ];

  const allAnswers = [...incorrectAnswers, ...correctAnswer];

  console.log(allAnswers);

  console.log("shuffleArray(questions)", shuffleArray(allAnswers));
  // return shuffleArray(questions);
  return allAnswers;
};
