import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface SimpleBarChartProps {
  data: { name: string; value: number }[]
  layout?: 'vertical' | 'horizontal'
  height?: number
  color?: string
}

const COLORS = ['#000000', '#424242', '#616161', '#757575', '#9e9e9e', '#bdbdbd']

export function SimpleBarChart({ data, layout = 'horizontal', height = 300, color }: SimpleBarChartProps) {
  if (layout === 'vertical') {
    return (
      <ResponsiveContainer width="100%" height={Math.max(height, data.length * 40)}>
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20, top: 0, bottom: 0 }}>
          <XAxis type="number" tick={{ fontSize: 11, fill: '#757575' }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#424242' }} width={130} />
          <Tooltip
            contentStyle={{ fontSize: 12, border: '1px solid #e5e5e5', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={24}>
            {data.map((_, i) => (
              <Cell key={i} fill={color || COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#757575' }} interval={0} angle={-20} textAnchor="end" height={50} />
        <YAxis tick={{ fontSize: 11, fill: '#757575' }} />
        <Tooltip
          contentStyle={{ fontSize: 12, border: '1px solid #e5e5e5', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40}>
          {data.map((_, i) => (
            <Cell key={i} fill={color || COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
