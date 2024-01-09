import { ItemType } from "../[id]/page";

export const currentQuestion = {
  id: "b489af6b-71be-4a09-9544-16e5a3cc8cf2",
  title: "I will never do wrong to you.",
  instruction: "The flower is beautiful.",
  next_question_id: 0,
  answered_type: "puzzle",
  media_url: null,
  image_url:
    "https://course-material-dev.s3.us-east-2.amazonaws.com/images/sLHRzO3zUaEUU8u.png",
  media_type: null,
  language: {
    id: 12,
    name: "Nigeria Pidgin",
    image_url:
      "https://course-material-dev.s3.us-east-2.amazonaws.com/images/LNLV1OcQLkhThog.png",
    created_at: "2023-06-23T14:03:33.000000Z",
    updated_at: "2023-09-22T07:55:54.000000Z",
    status: 0,
    order: 0,
  },
  topic: {
    id: 9,
    title: "Compliments",
    description: "...",
    image_url:
      "https://course-material-dev.s3.us-east-2.amazonaws.com/images/IgMrNjJEdua55ws.png",
    created_at: "2023-06-23T14:00:27.000000Z",
    updated_at: "2023-09-11T18:30:15.000000Z",
    section_id: null,
    media_type: null,
    type: "standalone",
    objective: "...",
    content: "....",
    question_type: "puzzle",
  },
  options: [
    {
      id: "8a213874-6740-41d2-985d-713115d7a711",
      title: ["a", "gi", "mehie.", "emekata", "gaghị", "N'anya"],
      hint: "N'anya gi a gaghị emekata mehie.",
      media_url:
        "https://course-material-dev.s3.us-east-2.amazonaws.com/audios/wXSlZYTXUDYfeHR.wav/trAYiXVlcc4MvkIMrQPb9jxd1DTCRS85HSrH5LdF.wav",
      media_type: "audio",
      image_url:
        "https://course-material-dev.s3.us-east-2.amazonaws.com/images/i1rZGrTo5khS22U.png",
    },
  ],
};

export const correctAnswers: ItemType[] = [
  { id: 6, name: "N'anya" },
  { id: 2, name: "gi" },
  { id: 1, name: "a" },
  { id: 5, name: "gaghị" },
  { id: 4, name: "emekata" },
  { id: 3, name: "mehie." },
];
