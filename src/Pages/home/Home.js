import React from "react";
import Chart from "../../Components/chart/Chart";
import FeaturedInfo from "../../Components/featuredInfo/FeaturedInfo";
import "./Home.css";
import SmallWidget from "../../Components/widgetSm/SmallWidget";
import LargeWidget from "../../Components/widgetLg/LargeWidget";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {baseUrl} from "../../baseUrl";

const Home = () => {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(`${baseUrl}/users/stats`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzdlZTIzZmY4YWMyYzZiMDEwOTk4MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDUxMTU5NywiZXhwIjoxNjc1MTE2Mzk3fQ.CVCyySC76rFz2StaX_I0QUBRUhAwGaXu71IIvx4BdE4",
          },
        });
        const statsList = res.data.sort((a,b) => {
          return a._id - b._id;
        })
        console.log(statsList);
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New Users": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  const data = userStats.slice(0,4)

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={data} title="User Analytics" dataKey="New Users" />
      <div className="homeWidgets">
        <SmallWidget />
        <LargeWidget />
      </div>
    </div>
  );
};

export default Home;
