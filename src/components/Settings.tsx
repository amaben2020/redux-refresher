"use client";
import { useEffect, useState } from "react";

function Settings() {
  // useState hook
  const [options, setOptions] = useState(null);

  // useEffect hook
  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        setOptions(response.trivia_categories);
      });
  }, [setOptions]);

  console.log(options);
  return <div></div>;
}
export default Settings;
