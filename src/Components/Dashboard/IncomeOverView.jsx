import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useGetIncomeOverviewQuery } from "../../Redux/Apis/dashboardApi";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Select, Spin } from "antd";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip
);

const IncomeOverView = () => {
  const [years, setYears] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 2024;
    const yearsArray = Array.from(
      { length: currentYear - startYear + 1 },
      (_, index) => startYear + index
    );
    setYears(yearsArray);
  }, []);
  const {
    data: chartData,
    isError,
    isLoading,
  } = useGetIncomeOverviewQuery(year);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <Spin tip="Loading data..." />
      </div>
    );
  }
  // Handle error state
  if (isError) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <p>Failed to load data. Please try again later.</p>
      </div>
    );
  }

  // Prepare months data
  const months = [
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
  ];

  // Extracting data for sales and profit
  const salesData = chartData?.data?.map((month) => month.totalAmount);
  const profitData = chartData?.data?.map((month) => month.profit);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Total Tips ($)",
        data: salesData,
        borderColor: "#007bff",
        borderWidth: 2,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "rgba(0, 123, 255, 0.5)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          return gradient;
        },
        tension: 0.4,
        pointBackgroundColor: "#007bff",
        pointHoverRadius: 6,
        pointRadius: 3,
        pointHoverBorderWidth: 2,
      },
      {
        label: "Profit ($)",
        data: profitData,
        borderColor: "#00ff00",
        borderWidth: 2,
        fill: true,
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#00ff00",
        pointHoverRadius: 6,
        pointRadius: 3,
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        display: true,
        grid: {
          display: true,
        },
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-full bg-[var(--bg-white)] rounded-md p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{year} Tips</h2>
        <Select
          className="min-w-32"
          defaultValue={year}
          placeholder="Select year"
          onChange={(year) => setYear(year)}
          options={years?.map((item) => ({ value: item, label: item }))}
        />
      </div>

      <div className="h-[400px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default IncomeOverView;
