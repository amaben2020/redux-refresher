"use client";
import { getProductAxios } from "@/services/api/products";
import { getSales } from "@/services/api/sales";
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

  const [sales, setSales] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getSales();
        setSales(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getProductAxios();
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(sales);

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`;
    setLoading(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        setCategoryOptions([
          { id: "vevwe3", name: "Please select a category" },
          ...response.trivia_categories,
        ]);
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
