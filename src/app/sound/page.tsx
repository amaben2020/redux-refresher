"use client";
import { ElementRef, useEffect, useRef, useState } from "react";
import useSoundPlayer from "./hook/useSoundPlayer";
const MEDIA_URL =
  "https://course-material-dev.s3.us-east-2.amazonaws.com/audios/WPuufzJj6mLDH76.mp3/vL3F0oIDGfrqfFhTqRdEPlhTWiqAFNIUn0WOl64r.mp3";

const Sound = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { isPlaying: play, handlePlay: playMedia } =
    useSoundPlayer<string>(MEDIA_URL);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioPlayback = new Audio(MEDIA_URL);
    audioPlayback.preload = "auto";
    audioRef.current = audioPlayback;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // enables play and pause
  const handlePlay = () => {
    if (audioRef.current && isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
    } else if (!isPlaying) {
      setIsPlaying(true);
      audioRef.current?.play();
    }
  };

  const a2Ref = useRef<ElementRef<"audio">>(null);
  console.log();
  const handleA2Play = () => (a2Ref.current ? a2Ref.current.play() : null);

  return (
    <div>
      <h2>Sound </h2>

      <button onClick={playMedia}>{play ? "PAUSE" : "PLAY"} </button>

      <audio src={MEDIA_URL} ref={a2Ref} onClick={handleA2Play}></audio>

      <button onClick={handlePlay}>
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Sound;
