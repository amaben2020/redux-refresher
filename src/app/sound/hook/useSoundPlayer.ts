"use client";
import { useEffect, useRef, useState } from "react";

const useSoundPlayer = <T extends string>(url: T) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioPlayback = new Audio(url);
    audioPlayback.preload = "auto";
    audioRef.current = audioPlayback;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [url]);

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

  // const a2Ref = useRef<ElementRef<"audio">>(null); // with element ref

  return { handlePlay, isPlaying };
};

export default useSoundPlayer;
