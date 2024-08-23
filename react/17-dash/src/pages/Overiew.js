import React from "react";
import { Line } from "react-chartjs-2";

function Overview() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [22, 21, 23, 24, 22, 25],
        fill: false,
        borderColor: "red",
      },
      {
        label: "Humidity (%)",
        data: [65, 62, 64, 63, 67, 68],
        fill: false,
        borderColor: "blue",
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h2>Smart Farm Overview</h2>
      <Line data={data} />
    </div>
  );
}

const styles = {
  container: {
    marginLeft: "220px",
    padding: "20px",
  },
};

export default Overview;
