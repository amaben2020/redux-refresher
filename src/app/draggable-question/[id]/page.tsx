"use client";

import { useParams, useSearchParams } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { currentQuestion } from "../data/data";

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

  console.log(state);

  console.log(options[0].media_url);

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
  const handleCheckAnswer = () => {};
  const handleSelectedAnswer = () => {};
  const handleRemoveAnswer = () => {};

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
      <ReactSortable
        list={state}
        setList={setState}
        group="groupName"
        animation={200}
        delay={2}
        filter=".addImageButtonContainer"
        className="flex"
      >
        {state.map((item) => (
          <div className="border p-3 rounded-lg m-3" key={item.id}>
            {item.name}
          </div>
        ))}
      </ReactSortable>{" "}
      <button className="border p-3 rounded-lg my-3">Check Answer</button>
    </div>
  );
};

export default BasicFunction;
