import React from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

interface PersonalityRadarProps {
  traits: Record<string, number>
}

const PersonalityRadar: React.FC<PersonalityRadarProps> = ({ traits }) => {
  const labels = Object.keys(traits).map(key => key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' '))
  const dataValues = Object.values(traits)

  const data = {
    labels,
    datasets: [
      {
        label: 'Personality Profile',
        data: dataValues,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 1,
      }
    }
  }

  return <Radar data={data} options={options} />
}

export default PersonalityRadar
