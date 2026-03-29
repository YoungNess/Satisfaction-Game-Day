import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface SatisfactionBarChartProps {
  data: { name: string; [key: string]: string | number }[]
  keys: { key: string; label: string; color: string }[]
  height?: number
}

export function SatisfactionBarChart({ data, keys, height = 300 }: SatisfactionBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#757575' }} interval={0} angle={-25} textAnchor="end" height={60} />
        <YAxis tick={{ fontSize: 11, fill: '#757575' }} />
        <Tooltip
          contentStyle={{ fontSize: 12, border: '1px solid #e5e5e5', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
        />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        {keys.map(k => (
          <Bar key={k.key} dataKey={k.key} name={k.label} fill={k.color} radius={[2, 2, 0, 0]} maxBarSize={20} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
