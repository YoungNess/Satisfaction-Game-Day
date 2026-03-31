import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'
import type { SatisfactionEntry } from '../../types'
import { countBy, toChartData } from '../../utils/formatters'

interface SatisfactionInteractiveProps {
  data: SatisfactionEntry[]
}

const FILTERS = [
  { key: 'accueil', label: 'Accueil', getter: (s: SatisfactionEntry) => s.accueil },
  { key: 'variete', label: 'Variété de jeux', getter: (s: SatisfactionEntry) => s.variete_jeux },
  { key: 'tournoi', label: 'Format tournois', getter: (s: SatisfactionEntry) => s.format_tournoi },
  { key: 'matchs', label: 'Gestion de matchs', getter: (s: SatisfactionEntry) => s.gestion_matchs },
] as const

const COLORS = ['#000000', '#333333', '#555555', '#777777', '#999999', '#bbbbbb']

export function SatisfactionInteractive({ data }: SatisfactionInteractiveProps) {
  const [activeFilter, setActiveFilter] = useState<string>('accueil')

  const currentFilter = FILTERS.find(f => f.key === activeFilter) ?? FILTERS[0]
  const chartData = toChartData(countBy(data, currentFilter.getter))

  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
      <div className="mb-4">
        <h3 className="text-sm sm:text-base font-semibold text-primary">Satisfaction par critère</h3>
        <p className="text-xs text-tertiary mt-0.5">Sélectionnez un critère pour afficher la répartition</p>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`
              px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium
              transition-all duration-200 min-h-[40px]
              ${activeFilter === f.key
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface text-secondary hover:bg-surface-alt border border-border'
              }
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Chart with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#757575' }}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 11, fill: '#757575' }} />
              <Tooltip
                contentStyle={{
                  fontSize: 12,
                  border: '1px solid #e5e5e5',
                  borderRadius: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
                formatter={(value) => [`${value} réponses`, '']}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={48} animationDuration={400}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
