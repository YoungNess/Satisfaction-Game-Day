import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface DonutChartProps {
  data: { name: string; value: number }[]
  height?: number
}

const COLORS = ['#000000', '#424242', '#616161', '#757575', '#9e9e9e', '#bdbdbd']

export function DonutChart({ data, height = 280 }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="55%"
          outerRadius="80%"
          paddingAngle={2}
          dataKey="value"
          stroke="none"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ fontSize: 12, border: '1px solid #e5e5e5', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
          formatter={(value) => [`${value} réponses`, '']}
        />
        <Legend
          wrapperStyle={{ fontSize: 11 }}
          formatter={(value: string) => <span className="text-secondary">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
