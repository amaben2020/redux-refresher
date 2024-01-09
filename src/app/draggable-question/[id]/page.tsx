"use client";

import { useParams, useSearchParams } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { currentQuestion } from "../data/data";
import correctSound from "./../../../../public/audios/correct.mp3";
import wrongSound from "./../../../../public/audios/notCorrect.mp3";
interface ItemType {
  id: number;
  name: string;
}

const BasicFunction: FC = (props) => {
  const soundRef = useRef<HTMLAudioElement | null>(null);

  const options = currentQuestion.options;
  const params = useParams();
  console.log(params);
  const query = useSearchParams();
  console.log(query.get("langId"));
  console.log(options);

  const question = options[0].title.map((t, i) => ({
    id: i + 1,
    name: t,
  }));
  console.log(question);
  const [state, setState] = useState<ItemType[]>([...question]);
  const [isActive, setIsActive] = useState<number | undefined>();

  const correctAnswers: ItemType[] = [
    { id: 6, name: "N'anya" },
    { id: 2, name: "gi" },
    { id: 1, name: "a" },
    { id: 5, name: "gaghị" },
    { id: 4, name: "emekata" },
    { id: 3, name: "mehie." },
  ];

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

  const correctPlayback = useRef<HTMLAudioElement | null>();
  const handleCheckAnswer = (array1: ItemType[], array2: ItemType[]) => {
    for (let i = 0; i < array1.length; i++) {
      if (array1[i].id !== array2[i].id || array1[i].name !== array2[i].name) {
        setIsCorrect(false);
      } else {
        setIsCorrect(true);
      }
    }

    const correctAudio = new Audio(isCorrect ? correctSound : wrongSound);
    correctPlayback.current = correctAudio;

    correctPlayback.current.play();
  };

  const handleSelectAnswers = (answer: ItemType) => {
    const answerAvailable = answers.find((item) => item.id === answer.id);

    if (answerAvailable?.id) {
      const updatedState = [...state, answerAvailable];
      const updatedAnswers = [...answers].filter(
        (elem) => elem.id !== answerAvailable.id,
      );
      setState(updatedState);
      setAnswers(updatedAnswers);
    } else {
      const updateAnswersAndState = [...state];
      const updatedState = updateAnswersAndState.filter(
        (elem) => elem.id !== answer.id,
      );

      const updatedAnswers = [...answers, answer];
      setState(updatedState);
      setAnswers(updatedAnswers);
    }
  };

  return (
    <div className="p-10">
      <button onClick={handlePlay}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
          />
        </svg>
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
            onRemove={() => {
              setAnswers([]);
            }}
          >
            {answers.map((item) => (
              <div
                style={{
                  border: isActive === item.id ? "1px solid green" : "",
                }}
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
        {state.map((item) => (
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
          background: isCorrect ? "green" : "",
        }}
        onClick={() => handleCheckAnswer(answers, correctAnswers)}
        className="border p-3 rounded-lg my-3"
      >
        Check Answer {isCorrect ? "yeah" : "nope"}
      </button>
    </div>
  );
};

export default BasicFunction;
