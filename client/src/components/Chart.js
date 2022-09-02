import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";

const Chart = ({ chartData, type, period }) => {
  const { variable, values } = chartData;

  //check if streamflow and/or gage height data is available
  if (type === "q" && values[0].value.length === 0) {
    return (
      <p style={{ textAlign: "center", maxWidth: "100%" }}>
        No streamflow data available for this site
      </p>
    );
  } else if (type === "h" && values[0].value.length === 0) {
    return (
      <p style={{ textAlign: "center", maxWidth: "100%" }}>
        No gage height data available for this site
      </p>
    );
  }

  //if data is available, convert USGS data into Chart.js data format
  const obj = values[0].value.reduce((acc, curr) => {
    acc[curr.dateTime] = curr.value;
    return acc;
  }, {});

  let x = Object.keys(obj);
  const y = Object.values(obj);

  //format dates and/or times depending on selected time period
  let dateFormat = "MMM DD";

  if (period === "P1D") {
    dateFormat = "ddd, h:mm a";
  } else if (period === "P7D") {
    dateFormat = "ddd, MMM DD";
  }

  x = x.map((item) => {
    return dayjs(item).format(dateFormat);
  });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
  );

  ChartJS.defaults.font.family = "'Nunito', sans-serif";

  //set chart options based on type of input data
  let titleText = "";
  let lineColor = "";
  let tooltipUnit = "";

  if (type === "q") {
    titleText = "Stream Flow";
    lineColor = "#3da9fc";
    tooltipUnit = " cfs";
  } else if (type === "h") {
    titleText = "Gage Height";
    lineColor = "#ef4565";
    tooltipUnit = " ft";
  }

  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 0,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: titleText,
        font: {
          weight: 600,
          size: 14,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return context.parsed.y + tooltipUnit;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      xAxis: {
        ticks: {
          autoSkip: true,
          autoSkipPadding: 15,
        },
      },
      yAxis: {
        title: {
          display: true,
          text: variable.unit.unitCode,
          font: {
            weight: 600,
            size: 12,
          },
        },
      },
    },
  };

  const data = {
    labels: x,
    datasets: [
      {
        data: y,
        pointRadius: 0,
        borderColor: lineColor,
        borderWidth: 2,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default Chart;
