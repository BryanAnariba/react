import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartData,
} from "chart.js";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import type { Band } from "../types/band.types";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const graphicInitialState = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    },
  ],
};

export default function BandChart() {
  const [graphic, setGraphic] =
    useState<ChartData<"bar", (number | [number, number] | null)[], unknown>>(
      graphicInitialState
    );
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("bands-list-from-server", (data: Band[]) => {
      createGraphic(data);
    });
  }, [socket]);

  const createGraphic = (bands: Band[] = []): void => {
    const data = {
      labels: bands.map((band) => band.name),
      datasets: [
        {
          label: "# of Votes",
          data: bands.map((band) => band.votes),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 205, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    setGraphic(data);
  };

  return (
    <>
      <Bar
        data={graphic}
        options={{
          indexAxis: "y",
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        }}
      />
    </>
  );
}
