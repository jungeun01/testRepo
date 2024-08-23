// import React, { useState } from "react";
// import {
//   Chart,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import FileUpload from "../componets/FileUpload";
// // import FileUpload from "../components/FileUpload";

// // Chart.js에 필요한 요소와 스케일을 등록
// Chart.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function Dashboard() {
//   const [chartData, setChartData] = useState(null);

//   const handleDataLoaded = (data) => {
//     const labels = data.map((row) => row.날짜);
//     const temperatureData = data.map((row) => row.온도);
//     const humidityData = data.map((row) => row.습도);

//     setChartData({
//       labels,
//       datasets: [
//         {
//           label: "Temperature (°C)",
//           data: temperatureData,
//           borderColor: "red",
//           fill: false,
//         },
//         {
//           label: "Humidity (%)",
//           data: humidityData,
//           borderColor: "blue",
//           fill: false,
//         },
//       ],
//     });
//   };

//   return (
//     <div style={styles.container}>
//       <h2>스마트팜 대시보드</h2>
//       <FileUpload onDataLoaded={handleDataLoaded} />
//       {chartData && <Line data={chartData} />}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: "20px",
//   },
// };

// export default Dashboard;
// ------------------위에 차트 형식 아래 그래프 형식
// import React, { useState } from "react";
// import FileUpload from "../componets/FileUpload";
// // import FileUpload from "../components/FileUpload";

// function Dashboard() {
//   const [tableData, setTableData] = useState([]);

//   const handleDataLoaded = (data) => {
//     setTableData(data);
//   };

//   return (
//     <div style={styles.container}>
//       <h2>스마트팜 대시보드</h2>
//       <FileUpload onDataLoaded={handleDataLoaded} />
//       {tableData.length > 0 && (
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>날짜</th>
//               <th>온도 (°C)</th>
//               <th>습도 (%)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tableData.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.날짜}</td>
//                 <td>{row.온도}</td>
//                 <td>{row.습도}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: "20px",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginTop: "20px",
//   },
//   th: {
//     border: "1px solid #ddd",
//     padding: "8px",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     textAlign: "left",
//   },
//   td: {
//     border: "1px solid #ddd",
//     padding: "8px",
//     textAlign: "left",
//   },
// };

// export default Dashboard;
// import React, { useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import FileUpload from "../componets/FileUpload";

// // Chart.js 스케일 및 요소 등록
// Chart.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function Dashboard() {
//   const [tableData, setTableData] = useState([]);
//   const [chartData, setChartData] = useState(null);

//   const handleDataLoaded = (data) => {
//     setTableData(data);

//     // 차트 데이터 설정
//     const labels = data.map((row) => row.날짜);
//     const temperatureData = data.map((row) => row.온도);
//     const humidityData = data.map((row) => row.습도);

//     setChartData({
//       labels,
//       datasets: [
//         {
//           label: "Temperature (°C)",
//           data: temperatureData,
//           borderColor: "red",
//           fill: false,
//         },
//         {
//           label: "Humidity (%)",
//           data: humidityData,
//           borderColor: "blue",
//           fill: false,
//         },
//       ],
//     });
//   };

//   return (
//     <div style={styles.container}>
//       <h2>스마트팜 대시보드</h2>
//       <FileUpload onDataLoaded={handleDataLoaded} />

//       {/* 차트 렌더링 */}
//       {chartData && (
//         <div style={styles.chartContainer}>
//           <h3>데이터 시각화 (차트)</h3>
//           <Line data={chartData} />
//         </div>
//       )}

//       {/* 표 렌더링 */}
//       {tableData.length > 0 && (
//         <div style={styles.tableContainer}>
//           <h3>데이터 표 (그래프 형식)</h3>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th>날짜</th>
//                 <th>온도 (°C)</th>
//                 <th>습도 (%)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((row, index) => (
//                 <tr key={index}>
//                   <td>{row.날짜}</td>
//                   <td>{row.온도}</td>
//                   <td>{row.습도}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: "20px",
//   },
//   chartContainer: {
//     marginBottom: "40px",
//   },
//   tableContainer: {
//     marginTop: "20px",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//   },
//   th: {
//     border: "1px solid #ddd",
//     padding: "8px",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     textAlign: "left",
//   },
//   td: {
//     border: "1px solid #ddd",
//     padding: "8px",
//     textAlign: "left",
//   },
// };

// export default Dashboard;
import React, { useState } from "react";
// import FileUpload from "../components/FileUpload";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import FileUpload from "../componets/FileUpload";

// Chart.js 스케일 및 요소 등록
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState(null);

  const handleDataLoaded = (data) => {
    setTableData(data);

    // 차트 데이터 설정
    const labels = data.map((row) => row.날짜);
    const temperatureData = data.map((row) => row["온도"]);
    const humidityData = data.map((row) => row["습도"]);
    const groundwaterData = data.map((row) => row["지하수위"]);
    const soilMoistureData = data.map((row) => row["토양 수분"]);

    setChartData({
      labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperatureData,
          borderColor: "red",
          fill: false,
        },
        {
          label: "Humidity (%)",
          data: humidityData,
          borderColor: "blue",
          fill: false,
        },
        {
          label: "Groundwater Level (cm)",
          data: groundwaterData,
          borderColor: "green",
          fill: false,
        },
        {
          label: "Soil Moisture (%)",
          data: soilMoistureData,
          borderColor: "brown",
          fill: false,
        },
      ],
    });
  };

  return (
    <div style={styles.container}>
      <h2>스마트팜 대시보드</h2>
      <FileUpload onDataLoaded={handleDataLoaded} />

      {/* 차트 렌더링 */}
      {chartData && (
        <div style={styles.chartContainer}>
          <h3>데이터 시각화 (차트)</h3>
          <Line data={chartData} />
        </div>
      )}

      {/* 표 렌더링 */}
      {tableData.length > 0 && (
        <div style={styles.tableContainer}>
          <h3>데이터 표 (그래프 형식)</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>날짜</th>
                <th>온도 (°C)</th>
                <th>습도 (%)</th>
                <th>지하수위 (cm)</th>
                <th>토양 수분 (%)</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.날짜}</td>
                  <td>{row["온도"]}</td>
                  <td>{row["습도"]}</td>
                  <td>{row["지하수위"]}</td>
                  <td>{row["토양 수분"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  chartContainer: {
    marginBottom: "40px",
  },
  tableContainer: {
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#4CAF50",
    color: "white",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
};

export default Dashboard;
