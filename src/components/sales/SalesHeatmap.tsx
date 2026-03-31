import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { PieChart, Pie, Cell as PieCell, Legend } from 'recharts'
import { KpiCard } from '../kpi/KpiCard'
import { getRevenueByHour, getPaymentMethodBreakdown, getSalesKpis } from '../../data/salesData'

const COLORS = ['#000000', '#424242', '#616161', '#757575', '#9e9e9e']

function RevenueTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const data = payload[0].payload
  return (
    <div className="bg-white border border-border rounded-lg px-3 py-2 shadow-sm text-xs">
      <p className="font-medium text-primary">{label}</p>
      <p className="text-secondary">{data.count} transactions</p>
      <p className="text-secondary font-semibold">{data.revenue.toFixed(2)} €</p>
    </div>
  )
}

export function SalesSection() {
  const hourlyData = getRevenueByHour()
  const methodData = getPaymentMethodBreakdown()
  const kpis = getSalesKpis()

  return (
    <div className="space-y-4">
      {/* KPIs ventes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KpiCard label="Recettes totales" value={`${kpis.totalRevenue.toFixed(2)} €`} subtitle="transactions réussies" />
        <KpiCard label="Transactions" value={kpis.transactionCount} subtitle={`${kpis.failedCount} échecs`} />
        <KpiCard label="Panier moyen" value={`${kpis.avgTransaction.toFixed(2)} €`} subtitle="par transaction" />
        <KpiCard label="Pic d'activité" value="13h" subtitle="16 transactions" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue par heure */}
        <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="text-sm sm:text-base font-semibold text-primary">Recettes par créneau horaire</h3>
            <p className="text-xs text-tertiary mt-0.5">Montant total encaissé par heure</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={hourlyData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
              <XAxis dataKey="hour" tick={{ fontSize: 12, fill: '#757575' }} />
              <YAxis tick={{ fontSize: 11, fill: '#757575' }} unit=" €" />
              <Tooltip content={<RevenueTooltip />} />
              <Bar dataKey="revenue" radius={[4, 4, 0, 0]} maxBarSize={48}>
                {hourlyData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Moyens de paiement */}
        <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="text-sm sm:text-base font-semibold text-primary">Moyens de paiement</h3>
            <p className="text-xs text-tertiary mt-0.5">Répartition des transactions réussies</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={methodData}
                cx="50%"
                cy="50%"
                innerRadius="50%"
                outerRadius="75%"
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {methodData.map((_, i) => (
                  <PieCell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ fontSize: 12, border: '1px solid #e5e5e5', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                formatter={(value) => [`${value} transactions`, '']}
              />
              <Legend
                wrapperStyle={{ fontSize: 11 }}
                formatter={(value: string) => <span className="text-secondary">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Heatmap transactions par demi-heure */}
      <HeatmapGrid />
    </div>
  )
}

function HeatmapGrid() {
  const hourlyData = getRevenueByHour()
  const maxCount = Math.max(...hourlyData.map(h => h.count))

  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
      <div className="mb-4">
        <h3 className="text-sm sm:text-base font-semibold text-primary">Densité des transactions</h3>
        <p className="text-xs text-tertiary mt-0.5">Nombre de transactions et montant par créneau</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {hourlyData.map(slot => {
          const ratio = slot.count / maxCount
          let bg = 'bg-gray-100 text-secondary'
          if (ratio > 0.75) bg = 'bg-primary text-white'
          else if (ratio > 0.5) bg = 'bg-secondary text-white'
          else if (ratio > 0.25) bg = 'bg-tertiary text-white'
          else if (ratio > 0) bg = 'bg-neutral/30 text-primary'

          return (
            <div
              key={slot.hour}
              className={`rounded-xl p-4 text-center transition-colors duration-200 ${bg}`}
            >
              <p className="text-lg sm:text-xl font-bold">{slot.hour}</p>
              <p className="text-sm font-semibold mt-1">{slot.revenue.toFixed(2)} €</p>
              <p className="text-xs opacity-80 mt-0.5">{slot.count} transactions</p>
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-3 mt-4 text-xs text-tertiary">
        <span>Faible</span>
        <div className="flex gap-1">
          <div className="w-6 h-4 rounded bg-gray-100" />
          <div className="w-6 h-4 rounded bg-neutral/30" />
          <div className="w-6 h-4 rounded bg-tertiary" />
          <div className="w-6 h-4 rounded bg-secondary" />
          <div className="w-6 h-4 rounded bg-primary" />
        </div>
        <span>Fort</span>
      </div>
    </div>
  )
}
