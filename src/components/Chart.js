import "../styles/_variables.scss";

import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "JoJoJo.... Happy April Fools Day!!",
      font: {
        size: "30rem",
        weight: "bold",
      },
    },
    legend: {
      display: true,
      position: "top",
      labels: {
        font: {
          size: "20rem",
          weight: "bold",
        },
      },
    },
  },

  animation: {
    easing: "linear",
  },
};

export default function ChartStatistics({ colorsList }) {
  let values = Object.values(colorsList);

  let data = {
    labels: [
      "60s-52s",
      "51s-42s",
      "41s-32s",
      "31s-22s",
      "21s-12s",
      "11s-0s",
      "Not clicked",
      "Not able to click",
    ],
    datasets: [
      {
        label: "Innocent People Like You....",
        data: [...values],
        backgroundColor: [
          "rgba(128, 0, 128, 0.4)",
          "rgba(0, 0, 255, 0.4)",
          "rgba(0, 128, 0, 0.4)",
          "rgba(255, 255, 0, 0.4)",
          "rgba(255, 165, 0, 0.4)",
          "rgba(255, 0, 0, 0.4)",
          "rgba(128, 128, 128, 0.4)",
          "rgba(255, 255, 255, 0.4)",
        ],
        borderColor: [
          "rgb(128, 0, 128)",
          "rgb(0, 0, 255)",
          "rgb(0, 128, 0)",
          "rgb(255, 255, 0",
          "rgb(255, 165, 0)",
          "rgb(255, 0, 0)",
          "rgb(128, 128, 128)",
          "rgb(255, 255, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Bar data={data} width={200} height={300} options={options} />
    </div>
  );
}
