"use client";
import { buildUrl } from "@/helpers/buildUrl";
import { useAppSelector } from "@/hooks/redux-hook";
import { addQuestions } from "@/redux/features/quiz/quizSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Settings() {
  const [categoryOptions, setCategoryOptions] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const quiz = useAppSelector((state) => {
    console.log("State", state);
    return state.quiz;
  });

  console.log("Difficulty", quiz.difficulty);
  console.log("Questions", quiz.questions);

  const [category, setCategory] = useState("9");
  const [questions, setQuestions] = useState([]);
  const [amount, setAmount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy",
  );
  const [type, setType] = useState<"multiple" | "boolean">("multiple");
  const [loading, setLoading] = useState(false);

  const DIFFICULTY = ["easy", "medium", "hard"];
  const TYPE = ["multiple", "boolean"];

  const handleQuestionsFetch = useCallback(async () => {
    const apiUrl = buildUrl({
      amount,
      type,
      difficulty,
      category,
    });

    setLoading(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        setQuestions(response.results);
        dispatch(addQuestions({ difficulty, questions: response?.results }));
        setLoading(false);
        if (response.results?.length) {
          toast.success("Quiz session successfully created");
          setTimeout(() => {
            router.push("/question");
          }, 1000);
        }
      });
  }, [amount, category, difficulty, dispatch, router, type]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await axios.get("https://opentdb.com/api_category.php");
      setCategoryOptions([
        { id: "vevwe3", name: "Please select a category" },
        ...data.trivia_categories,
      ]);
      setLoading(false);
    })();
  }, []);

  const handleCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setCategory(category);
  };

  const handleDifficultySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const difficulty = e.target.value;
    setDifficulty(difficulty as any);
  };

  const handleChoiceSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setType(type as any);
  };

  return (
    <div className="flex flex-col gap-6">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <select
          name="Category"
          className="border-2 p-4 rounded-lg"
          onChange={handleCategorySelect}
        >
          {!loading &&
            categoryOptions.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
        </select>
      )}

      <select
        name="Difficulty"
        className="border-2 p-4 rounded-lg"
        onChange={handleDifficultySelect}
      >
        {DIFFICULTY.map((difficulty) => (
          <option value={difficulty} key={difficulty}>
            {difficulty}
          </option>
        ))}
      </select>

      <select
        name="Type"
        className="border-2 p-4 rounded-lg"
        onChange={handleChoiceSelect}
      >
        {TYPE.map((type) => (
          <option value={type} key={type}>
            {type}
          </option>
        ))}
      </select>

      <input
        className="border-2 p-4 rounded-lg"
        type="number"
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
      />

      <button
        className="border-2 p-4 rounded-lg"
        onClick={async () => {
          await handleQuestionsFetch();
        }}
      >
        Fetch Questions
      </button>

      {JSON.stringify(questions)}
    </div>
  );
}
export default Settings;
