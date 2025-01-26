import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);
import ChartsHeading from "./ChartsHeading";
import { Select, Spin } from "antd";
import { useGetAppointmentOverviewQuery } from "../../Redux/Apis/dashboardApi";

const AppointmentsOverview = () => {
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
  const { data: appointment, isLoading } = useGetAppointmentOverviewQuery(year);
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <Spin tip="Loading data..." />
      </div>
    );
  }
  const chartData = appointment?.data?.map((item) => item?.userCount);

  const data = {
    labels: [
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
    datasets: [
      {
        label: "Monthly Data",
        data: chartData || [],
        backgroundColor: "#007bff",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 200,
        },
        grid: {
          display: false,
        },
      },
      x: {
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
    responsive: true,
    maintainAspectRatio: false,
  };
  // chart end
  //data
  const growthData = [
    {
      name: "Yearly Growth",
      total: `${appointment?.data?.yearlyComparison}%`,
    },
    {
      name: "Monthly",
      total: `${appointment?.data?.monthlyComparison}%`,
    },
    {
      name: "Day",
      total: `${appointment?.data?.dailyComparison}%`,
    },
  ];
  return (
    <div className="w-full h-full bg-[var(--bg-white)] rounded-md p-4">
      <div className="between-center mb-6">
        <ChartsHeading heading={`User Growth`} growthData={growthData} />
        <Select
          defaultValue={appointment?.data?.currentYear}
          className="min-w-32"
          placeholder="select year"
          onChange={(year) => setYear(year)}
          options={years?.map((item) => ({ value: item, label: item }))}
        />
      </div>
      <div className="h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AppointmentsOverview;
