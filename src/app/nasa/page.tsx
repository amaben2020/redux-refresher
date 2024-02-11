"use client";
import { nasaThunk } from "@/redux/features/nasa/services";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const TOKEN = "7voLHITAIb26SYr93DVjUAjAFliKu39AwpHZjLZ8";

export const URL = `https://api.nasa.gov/planetary/apod?api_key=${TOKEN}`;
const NasaPage = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.nasa,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(nasaThunk());
  }, [dispatch]);

  if (loading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>Error....</div>;
  }

  return (
    <div className="p-20">
      NasaPage
      {JSON.stringify(data)}
      {loading}
    </div>
  );
};

export default NasaPage;
