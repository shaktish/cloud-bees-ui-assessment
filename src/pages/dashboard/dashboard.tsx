import "zingchart/es6";
import ZingChart from "zingchart-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [graphData, setGraphData] = useState<any>();

  useEffect(() => {
    setGraphData({
      type: "bar",
      series: [
        {
          values: [4, 5, 3, 4, 5, 3, 5, 4, 11],
        },
      ],
    });
  }, []);
  return (
    <>
      <h1>Dashboard</h1>
      <ZingChart data={graphData} />
    </>
  );
};

export default Dashboard;
