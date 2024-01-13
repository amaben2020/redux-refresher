"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData } from "./features/user";
import { RootState } from "@/redux/store";

const AuthPage = () => {
  const id = 10;
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.auth);
  console.log(state);

  useEffect(() => {
    dispatch(fetchUsersData(id));
  }, [dispatch, id]);
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
