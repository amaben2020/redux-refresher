"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// import ReactAudioPlayer from "react-audio-player";
import { data } from "./../../data/data";

const Sound = () => {
  const [apiData, setData] = useState([...data]);

  const MEDIA_URL =
    "https://course-material-dev.s3.us-east-2.amazonaws.com/audios/WPuufzJj6mLDH76.mp3/vL3F0oIDGfrqfFhTqRdEPlhTWiqAFNIUn0WOl64r.mp3";

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

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current = null;
    }
  };

  return (
    <div>
      <h2>Sound </h2>

      <button onClick={handlePlay}>Play</button>

      <div>
        {apiData?.map(({ image_url, title, media_url, id }) => {
          return (
            <div key={id}>
              <h2>{title}</h2>
              {image_url !== null && typeof image_url === "string" && (
                <>
                  <Image
                    src={image_url}
                    key={id}
                    width={400}
                    height={200}
                    alt=""
                  />
                </>
              )}

              {/* <ReactAudioPlayer src={media_url} controls /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sound;
