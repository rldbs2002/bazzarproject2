"use client";

import React, { useEffect, useState } from "react";
import { Divider, Avatar, Typography, Grid } from "@mui/material";
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
import { Paragraph } from "../Typography";

const AdminDashboard = () => {
  const [requestData, setRequestData] = useState([]);

  const [cartData, setCartData] = useState([]);

  const [checkoutData, setCheckoutData] = useState([]);

  const [completeRequestData, setCompleteRequestData] = useState([]);

  const [completeCartData, setCompleteCartData] = useState([]);

  const [completeCheckoutData, setCompleteCheckoutData] = useState([]);

  const pendingRequestCount = requestData.length - completeRequestData.length;

  const pendingCartCount = cartData.length - completeCartData.length;

  const pendingCheckoutCount =
    checkoutData.length - completeCheckoutData.length;

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
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "15rem",
              }}
            >
              <Paragraph
                style={{
                  fontSize: "1.7rem",
                }}
              >
                Requests
              </Paragraph>
              <Link href="/admin/request">
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    color: "primary.text",
                    backgroundColor: "paste.main",
                  }}
                >
                  {pendingRequestCount}
                </Avatar>
              </Link>
            </div>
            <Divider
              sx={{
                mb: 5,
                borderColor: "paste.400",
                borderBottomWidth: "5px",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Paragraph
                style={{
                  fontSize: "1.7rem",
                }}
              >
                Carts
              </Paragraph>
              <Link href="/admin/cart">
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    color: "primary.text",
                    backgroundColor: "success.main",
                  }}
                >
                  {pendingCartCount}
                </Avatar>
              </Link>
            </div>
            <Divider
              sx={{
                mb: 5,
                borderColor: "success.400",
                borderBottomWidth: "5px",
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Paragraph
                style={{
                  fontSize: "1.7rem",
                }}
              >
                Checkout
              </Paragraph>
              <Link href="/admin/checkout">
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    color: "secondary.text",
                    backgroundColor: "marron.main",
                  }}
                >
                  {pendingCheckoutCount}
                </Avatar>
              </Link>
            </div>
            <Divider
              sx={{
                mb: 3,
                borderColor: "marron.400",
                borderBottomWidth: "5px",
              }}
            />
          </>
        </Grid>
        <Grid item md={6} xs={12}>
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
        </Grid>
      </Grid>
    </>
  );
};

export default AdminDashboard;
