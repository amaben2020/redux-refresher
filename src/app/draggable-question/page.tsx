"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { currentQuestion } from "./data/data";

const Draggable = () => {
  const [data, setData] = useState(() => currentQuestion);
  console.log(data);
  return (
    <Link
      // href={`/draggable-question/${data.topic.id}`}
      href={{
        pathname: `/draggable-question/${data.topic.id}`,
        query: { langId: data.language.id },
      }}
    >
      <div className="border-2 w-[300px] p-3 rounded-lg m-20 flex flex-col text-center gap-y-3 justify-center">
        <Image src={data.topic.image_url} height={200} width={200} alt="" />

        <div>
          <h3>{data.topic.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Draggable;
