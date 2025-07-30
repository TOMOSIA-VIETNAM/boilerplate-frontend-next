'use client'

import dynamic from 'next/dynamic'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js'
import { getPrimaryColor } from '@/lib/utils'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement)

// Dynamic imports for charts to avoid SSR issues
const Line = dynamic(() => import('react-chartjs-2').then((mod) => ({ default: mod.Line })), {
  ssr: false,
  loading: () => <div className="h-48 flex items-center justify-center">Loading chart...</div>
})
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => ({ default: mod.Bar })), {
  ssr: false,
  loading: () => <div className="h-48 flex items-center justify-center">Loading chart...</div>
})

const horizontalBarData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Sales',
      data: [120, 190, 300, 500, 200, 300, 450],
      borderColor: getPrimaryColor(),
      backgroundColor: getPrimaryColor().replace(')', ' / 0.1)'),
      borderRadius: 8
    },
    {
      label: 'Revenue',
      data: [120, 190, 300, 500, 200, 300, 450],
      borderColor: 'hsl(0, 0%, 0%)',
      backgroundColor: 'hsl(0, 0%, 0%, 0.1)',
      borderRadius: 8
    }
  ]
}

const horizontalBarOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false }
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { color: '#f1f1f3' }, beginAtZero: true }
  }
}

const lineData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Sales',
      data: [120, 190, 300, 500, 200, 300, 450],
      borderColor: getPrimaryColor(),
      backgroundColor: getPrimaryColor().replace(')', ' / 0.1)'),
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointBackgroundColor: getPrimaryColor()
    }
  ]
}

const lineOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false }
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { color: '#f1f1f3' }, beginAtZero: true }
  }
}

export function AnalyticsChart() {
  return (
    <>
      <div className="flex items-end gap-2 mb-4">
        <span className="text-base font-bold">- $4,5430</span>
        <span className="text-xs text-red-500 font-semibold">-0.4%</span>
      </div>
      <Bar data={horizontalBarData} options={horizontalBarOptions} />
    </>
  )
}

export function SalesPerformanceChart() {
  return <Line data={lineData} options={lineOptions} height={180} />
}
