"use client";

import React, { useEffect, useState } from "react";
import { Paragraph } from "../Typography";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  getCompleteCartData,
  getCompleteCheckoutData,
  getCompleteRequestData,
  getDailyCartData,
  getDailyCheckoutData,
  getDailyRequestData,
} from "@/app/lib/data";
import Link from "next/link";

const AdminDashboard = () => {
  const [requestData, setRequestData] = useState([]);

  const [cartData, setCartData] = useState([]);

  const [checkoutData, setCheckoutData] = useState([]);

  const [completeRequestData, setCompleteRequestData] = useState([]);

  const [completeCartData, setCompleteCartData] = useState([]);

  const [completeCheckoutData, setCompleteCheckoutData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDailyRequestData();

        setRequestData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDailyCartData();

        setCartData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDailyCheckoutData();

        setCheckoutData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCompleteRequestData();

        setCompleteRequestData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCompleteCartData();

        setCompleteCartData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCompleteCheckoutData();

        setCompleteCheckoutData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  console.log("Complete Request Data:", completeRequestData);
  console.log("Complete Cart Data:", completeCartData);
  console.log("Complete Checkout Data:", completeCheckoutData);

  const barChartData = [
    { name: "New Request", value: requestData.length, color: "#4BB4B4" },
    { name: "New Carts", value: cartData.length, color: "rgb(51, 208, 103)" },
    { name: "New Checkout", value: checkoutData.length, color: "#BE7374" },
  ];

  const completedData = [
    {
      name: "Completed Request",
      value: completeRequestData.length,
      color: "#4BB4B4",
    },
    {
      name: "Completed Carts",
      value: completeCartData.length,
      color: "rgb(51, 208, 103)",
    },
    {
      name: "Completed Checkout",
      value: completeCheckoutData.length,
      color: "#BE7374",
    },
  ];

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  return (
    <>
      <Paragraph
        style={{
          fontSize: "1.7rem",
          marginBottom: "3rem",
          marginLeft: "7rem",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Daily Status ({formattedDate})
      </Paragraph>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barChartData} layout="vertical">
          <CartesianGrid opacity={0.5} />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fontSize: 20 }}
            interval={0}
            width={170}
            tickLine={false}
          />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#8884d8"
            label={{ fontSize: 14, position: "insideTop" }}
            barSize={20}
          >
            {/* Display value as percentage based on the 100 units */}
            {barChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                fillOpacity={(entry.value / barChartData.length) * 100}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Bar Chart for Completed */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={completedData} layout="vertical">
          <CartesianGrid opacity={0.5} />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fontSize: 16 }}
            interval={0}
            width={170}
          />
          <Tooltip />
          <Bar
            dataKey="value"
            label={{ fontSize: 20, position: "insideTop" }}
            barSize={20}
          >
            {completedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                fillOpacity={(entry.value / completedData.length) * 100}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default AdminDashboard;
