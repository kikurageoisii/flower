import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface MoodData {
  date: string
  mood: string
  score: number
}

interface MoodChartProps {
  data: MoodData[]
}

const MoodChart: React.FC<MoodChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Mood Score',
        data: data.map(d => d.score),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Mood History',
      },
    },
    scales: {
      y: {
        min: -5,
        max: 5,
        ticks: {
          callback: (value: any) => {
            if (value === 5) return 'Excited'
            if (value === 2) return 'Happy'
            if (value === 0) return 'Neutral'
            if (value === -2) return 'Anxious'
            if (value === -5) return 'Stressed'
            return null
          }
        }
      }
    }
  }

  return <Line options={options} data={chartData} />
}

export default MoodChart
