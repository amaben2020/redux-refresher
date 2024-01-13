"use client";

import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { correctAnswers, currentQuestion } from "../data/data";
import correctSound from "./../../../../public/audios/correct.mp3";
import wrongSound from "./../../../../public/audios/notCorrect.mp3";
import soundSVG from "./../../../../public/sound.svg";

export interface ItemType {
  id: number;
  name: string;
}

const BasicFunction: FC = (props) => {
  const soundRef = useRef<HTMLAudioElement | null>(null);
  const options = currentQuestion.options;
  // const params = useParams();
  // const query = useSearchParams();

  const question = options[0].title.map((t, i) => ({
    id: i + 1,
    name: t,
  }));

  const [questions, setQuestions] = useState<ItemType[]>([...question]);

  const [answers, setAnswers] = useState<ItemType[]>([]);

  useEffect(() => {
    const audioPlayback = new Audio(options[0].media_url);
    audioPlayback.preload = "auto";
    soundRef.current = audioPlayback;

    return () => {
      if (soundRef.current) {
        soundRef.current.pause();
        soundRef.current = null;
      }
    };
  }, [options]);

  const handlePlay = () => {
    if (soundRef.current) {
      soundRef.current?.play();
    }
  };
  const [isCorrect, setIsCorrect] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const correctPlayback = useRef<HTMLAudioElement | null>();

  const handleCheckAnswer = (array1: ItemType[], array2: ItemType[]) => {
    for (let i = 0; i < array1.length; i++) {
      if (array1[i].id === array2[i].id || array1[i].name === array2[i].name) {
        setIsCorrect(true);
      }
      if (array1[i].id !== array2[i].id || array1[i].name !== array2[i].name) {
        setIsCorrect(false);
      }
    }

    const audioPlayback = new Audio(isCorrect ? correctSound : wrongSound);
    correctPlayback.current = audioPlayback;
    correctPlayback.current.play();
  };

  useEffect(() => {
    if (isChecking) {
      setTimeout(() => {
        setIsChecking(false);
      }, 2000);
    }
  }, [isChecking, isCorrect, question]);

  const handleSelectAnswers = (answer: ItemType) => {
    const answerAvailable = answers.find((item) => item.id === answer.id);

    if (answerAvailable?.id) {
      const updatedState = [...questions, answerAvailable];
      const updatedAnswers = [...answers].filter(
        (elem) => elem.id !== answerAvailable.id,
      );
      setQuestions(updatedState);
      setAnswers(updatedAnswers);
    } else {
      const updateAnswersAndState = [...questions];
      const updatedState = updateAnswersAndState.filter(
        (elem) => elem.id !== answer.id,
      );

      const updatedAnswers = [...answers, answer];
      setQuestions(updatedState);
      setAnswers(updatedAnswers);
    }
  };

  return (
    <div className="p-10">
      <button onClick={handlePlay}>
        <Image width={100} height={150} src={soundSVG} alt="" />
      </button>

      <div className="py-4">
        <h3> Answers: </h3>

        <div className=" border-gray-700 w-fit">
          <ReactSortable
            list={answers}
            setList={setAnswers}
            group="groupName"
            animation={200}
            delay={2}
            filter=".addImageButtonContainer"
            className="flex"
          >
            {answers.map((item) => (
              <div
                onClick={() => handleSelectAnswers(item)}
                className="border p-3 rounded-lg m-3 cursor-pointer"
                key={item.id}
              >
                {item.name}
              </div>
            ))}
          </ReactSortable>{" "}
        </div>
      </div>

      <div className="border-t-2 border-gray-700 w-fit flex">
        {questions.map((item) => (
          <div
            className="border p-3 rounded-lg m-3 cursor-pointer"
            onClick={() => handleSelectAnswers(item)}
            key={item.id}
          >
            {item.name}
          </div>
        ))}
      </div>

      <button
        style={{
          background:
            isChecking && isCorrect
              ? "green"
              : isChecking && !isCorrect
              ? "red"
              : "",
        }}
        onClick={() => {
          handleCheckAnswer(answers, correctAnswers);
          setIsChecking(true);
        }}
        className="border p-3 rounded-lg my-3"
      >
        Check Answer
      </button>
    </div>
  );
};

export default BasicFunction;
