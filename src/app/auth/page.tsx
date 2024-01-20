"use client";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData } from "./features/api/fetchUser";

const AuthPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const id = 10;
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchUsersData(id));
  }, [dispatch, id]);

  if (!isLoaded) {
    return null;
  }

  return (
    <div>
      AuthPage
      {JSON.stringify(state.data)}
      {JSON.stringify(state.status)}
      {JSON.stringify(state.error)}
    </div>
  );
};

export default AuthPage;
