import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
} from 'chart.js';
import ChartsHeading from './ChartsHeading';
import { Select } from 'antd';
import { useGetIncomeOverviewQuery } from '../../Redux/Apis/dashboardApi';
import Loading from '../Shared/Loading';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

const IncomeOverView = () => {
    // states 
    const [year, setYear] = useState(new Date().getFullYear())
    // rtk query 
    const years = [new Date().getFullYear()]
    years.push(new Date().getFullYear() + 1)
    years.unshift(new Date().getFullYear() - 1)
    const { data: income, isLoading } = useGetIncomeOverviewQuery(year)
    const chartData = income?.data?.map(item => item?.totalAmount)
    // chart
    const canvasRef = React.useRef(null);
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Monthly Data',
                data: chartData || [],
                borderColor: '#007bff',
                borderWidth: 2,
                fill: true,
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        return null;
                    }

                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(0, 123, 255, 1)');
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                    return gradient;
                },
                tension: 0.4,
                pointRadius: 0,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 20,
                },
                grid: {
                    display: false,
                },
            },
            x: {
                ticks: {
                    font: {
                        size: 12,
                    },
                },
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

    const growthData = [
        {
            name: 'Yearly Growth',
            total: `${income?.data?.yearlyComparison}%`
        },
        {
            name: 'Monthly',
            total: `${income?.data?.monthlyComparison}%`
        },
        {
            name: 'Day',
            total: `${income?.data?.dailyComparison}%`
        },
    ]
    return (
        <div className='w-full h-full bg-[var(--bg-white)] rounded-md p-4'>
            {
                isLoading && <Loading />
            }
            <div className='between-center mb-6'>
                <ChartsHeading heading={`Tips Overview`} growthData={growthData} />
                <Select className='min-w-32' defaultValue={income?.data?.currentYear} placeholder='select year' onChange={(year) => setYear(year)} options={years?.map((item) => ({ value: item, label: item }))} />
            </div>
            <div className='h-[300px]'>
                <Line ref={canvasRef} data={data} options={options} />
            </div>
        </div>
    );
};


export default IncomeOverView
