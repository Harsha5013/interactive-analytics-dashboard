import "./index.css";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import data from "./data.json";
import { BsPeople } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { BsTags } from "react-icons/bs";
import { TbMoneybag } from "react-icons/tb";
import { CiSearch } from "react-icons/ci";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
const Dashboard = ({ user }) => {
  const [stockData, setStockData] = useState([]);
  const totalRevenue = data.reduce((total, item) => total + item.revenue, 0);

  const totalTransactions = data.reduce(
    (total, item) => total + item.transactions,
    0,
  );

  const totalUsers = data.reduce((total, item) => total + item.users, 0);

  const totalLikes = data.reduce((total, item) => total + item.likes, 0);

  const getData = async () => {
    try {
      const apiUrl =
        "https://api.marketstack.com/v2/eod?access_key=a31eaf3784d09b19a04b4aa5fbd073c3&symbols=AAPL";

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.error) {
        throw new Error(responseData.error.message || "API request failed");
      }

      setStockData(responseData.data || []);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };
  // useEffect(() => {
  //   if (user) {
  //     getData();
  //   }
  // }, [user]);

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Dashboard</h1>{" "}
        <div className="searchBox">
          <input type="search" placeholder="search" />
          <CiSearch />
        </div>
      </div>
      <div className="valueContainer">
        <div className="values Revenues">
          <TbMoneybag className="icons" />
          Total Revenue <span>${totalRevenue}</span>
        </div>
        <div className="values Transactions">
          <BsTags className="icons" />
          Total Transactions <span>{totalTransactions}</span>
        </div>
        <div className="values Users">
          <BsPeople className="icons" />
          Total Users <span>{totalUsers}</span>
        </div>
        <div className="values Likes">
          <BiLike className="icons" />
          Total Likes <span>{totalLikes}</span>
        </div>
      </div>
      <div className="line">
        <Line
          data={{
            labels: data.map((data) => data.month),
            datasets: [
              {
                label: "revenue",
                data: data.map((data) => data.revenue),
              },
              {
                label: "high",
                data: data.map((data) => data.cost),
              },
              {
                label: "low",
                data: data.map((data) => data.profit),
              },
            ],
          }}
        />
      </div>
      <div className="miniChart">
        <div className="pie">
          <Doughnut
            data={{
              labels: data.map((data) => data.month),
              datasets: [
                {
                  label: "revenue",
                  data: data.map((data) => data.revenue),
                },
                {
                  label: "cost",
                  data: data.map((data) => data.cost),
                },
                {
                  label: "profit",
                  data: data.map((data) => data.profit),
                },
              ],
            }}
          />
        </div>
        <div className="bar">
          <Bar
            data={{
              labels: data.map((data) => data.month),
              datasets: [
                {
                  label: "revenue",
                  data: data.map((data) => data.revenue),
                },
                {
                  label: "cost",
                  data: data.map((data) => data.cost),
                },
                {
                  label: "profit",
                  data: data.map((data) => data.profit),
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
