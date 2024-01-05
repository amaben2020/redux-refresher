"use client";
import { ChangeEvent, useEffect, useState } from "react";

function Settings() {
  const [categoryOptions, setCategoryOptions] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`;
    setLoading(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        setCategoryOptions(response.trivia_categories);
        setLoading(false);
      });
  }, [setCategoryOptions]);

  const handleCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setCategory(category);
  };

  console.log(category);

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
              <option value={option.name} key={option.id}>
                {option.name}
              </option>
            ))}
        </select>
      )}

      <button className="border-2 p-4 rounded-lg">Fetch Questions</button>
    </div>
  );
}
export default Settings;
