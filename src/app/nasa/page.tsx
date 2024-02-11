"use client";
import { nasaThunk } from "@/redux/features/nasa/services";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const TOKEN = "7voLHITAIb26SYr93DVjUAjAFliKu39AwpHZjLZ8";

export const URL = `https://api.nasa.gov/planetary/apod?api_key=${TOKEN}`;
const NasaPage = () => {
  const [state, setState] = useState();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.nasa,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch(URL).then((r) => r.json().then((r) => setState(r)));
    dispatch(nasaThunk());
  }, [dispatch]);

  console.log(data);

  return (
    <div className="p-20">
      NasaPage
      {JSON.stringify(data)}
      {loading}
    </div>
  );
};

export default NasaPage;
