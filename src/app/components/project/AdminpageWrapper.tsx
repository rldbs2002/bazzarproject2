"use client";

import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { Paragraph } from "../Typography";
import AdminDashboard from "./AdminDashboard";
import {
  getCompleteCartData,
  getCompleteCheckoutData,
  getCompleteRequestData,
  getDailyCartData,
  getDailyCheckoutData,
  getDailyRequestData,
  getRemainCartsData,
  getRemainCheckoutsData,
  getRemainRequestsData,
} from "@/app/lib/data";

const AdminpageWrapper = () => {
  const { data: session } = useSession();
  console.log(session);
  const lastLoginDate = session?.expires ? new Date(session.expires) : null;
  if (lastLoginDate) {
    lastLoginDate.setDate(lastLoginDate.getDate() - 1);
  }

  // const [remainRequestsData, setRemainRequestsData] = useState([]);

  // const [remainCartsData, setRemainCartsData] = useState([]);

  // const [remainCheckoutsData, setRemainCheckoutsData] = useState([]);

  // const [dailyRequestData, setDailyRequestData] = useState([]);

  // const [dailyCartData, setDailyCartData] = useState([]);

  // const [dailyCheckoutData, setDailyCheckoutData] = useState([]);

  // const [completeRequestData, setCompleteRequestData] = useState([]);

  // const [completeCartData, setCompleteCartData] = useState([]);

  // const [completeCheckoutData, setCompleteCheckoutData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getRemainRequestsData();

  //       setRemainRequestsData(result);
  //     } catch (error: any) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getRemainCartsData();

  //       setRemainCartsData(result);
  //     } catch (error: any) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getRemainCheckoutsData();

  //       setRemainCheckoutsData(result);
  //     } catch (error: any) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getDailyRequestData();

  //       setDailyRequestData(result);
  //     } catch (error: any) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getDailyCartData();

  //       setDailyCartData(result);
  //     } catch (error: any) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getDailyCheckoutData();

  //       setDailyCheckoutData(result);
  //     } catch (error: any) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getCompleteRequestData();

  //       setCompleteRequestData(result);
  //     } catch (error: any) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getCompleteCartData();

  //       setCompleteCartData(result);
  //     } catch (error: any) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getCompleteCheckoutData();

  //       setCompleteCheckoutData(result);
  //     } catch (error: any) {
  //       console.error("Error fetching data:", error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <AdminDashboard
      // remainRequestsData={remainRequestsData}
      // remainCartsData={remainCartsData}
      // remainCheckoutsData={remainCheckoutsData}
      // dailyRequestData={dailyRequestData}
      // dailyCartData={dailyCartData}
      // dailyCheckoutData={dailyCheckoutData}
      // completeRequestData={completeRequestData}
      // completeCartData={completeCartData}
      // completeCheckoutData={completeCheckoutData}
      />
      <Paragraph
        style={{
          fontSize: "1rem",
          marginTop: "4rem",
          marginBottom: "4rem",
        }}
      >
        Lastest Loggin Date: {lastLoginDate?.toLocaleString()}
      </Paragraph>
    </>
  );
};

export default AdminpageWrapper;
