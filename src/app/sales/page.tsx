"use client";
import { AppDispatch, RootState } from "@/redux/store";
import { getSales } from "@/services/api/sales";
import cookie from "cookie-cutter";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const Sales = () => {
  // const user = { name: "BEN" };

  // useEffect(() => {
  //   if (user) {
  //     cookie.set("name", JSON.stringify(user));
  //   }
  // }, [user]);

  // const name = JSON.parse(cookie.get("name"));
  // console.log(name.name);

  const dispatch = useDispatch<AppDispatch>();

  const sales = useSelector((state: RootState) => state.sales);
  console.log(sales);
  useEffect(() => {
    dispatch(getSales({ id: "amaben s", name: "lkmsamlk" }));
  }, [dispatch]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  if (!show) {
    return null;
  }
  return (
    <div
      style={{
        minWidth: 500,
        minHeight: 500,
        border: "1px solid red",
        padding: 20,
      }}
    >
      Sales
      {sales.loading ? <div> Loading...</div> : <div>CHARTS</div>}
      {JSON.stringify(sales.data)}
      <ResponsiveContainer
        // width="100vh"
        // height="100vh"
        width={"99%"}
        height={300}
        minHeight={400}
        minWidth={400}
      >
        <LineChart
          width={500}
          height={300}
          data={sales.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#82ca9d"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Sales;
