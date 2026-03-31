import { useMemo } from 'react'
import { salesData, HOURS, CATEGORIES } from '../../data/salesData'

function getIntensity(count: number, max: number): string {
  if (count === 0) return 'bg-gray-100'
  const ratio = count / max
  if (ratio > 0.75) return 'bg-primary text-white'
  if (ratio > 0.5) return 'bg-secondary text-white'
  if (ratio > 0.25) return 'bg-tertiary text-white'
  return 'bg-neutral/30 text-primary'
}

export function SalesHeatmap() {
  const maxCount = useMemo(
    () => Math.max(...salesData.map(s => s.count)),
    []
  )

  const grid = useMemo(() => {
    const map = new Map<string, number>()
    salesData.forEach(s => map.set(`${s.category}-${s.hour}`, s.count))
    return map
  }, [])

  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
      <div className="mb-4">
        <h3 className="text-sm sm:text-base font-semibold text-primary">Ventes par créneau horaire</h3>
        <p className="text-xs text-tertiary mt-0.5">Intensité = volume de ventes (données mock — à remplacer par SumUp)</p>
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="min-w-[480px]">
          {/* Hour headers */}
          <div className="grid gap-1" style={{ gridTemplateColumns: `80px repeat(${HOURS.length}, 1fr)` }}>
            <div />
            {HOURS.map(h => (
              <div key={h} className="text-center text-xs text-tertiary font-medium py-1">
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {CATEGORIES.map(cat => (
            <div
              key={cat}
              className="grid gap-1 mt-1"
              style={{ gridTemplateColumns: `80px repeat(${HOURS.length}, 1fr)` }}
            >
              <div className="text-xs text-secondary font-medium flex items-center">
                {cat}
              </div>
              {HOURS.map(h => {
                const count = grid.get(`${cat}-${h}`) ?? 0
                return (
                  <div
                    key={h}
                    className={`
                      rounded-md flex items-center justify-center text-xs font-medium
                      h-10 sm:h-12 transition-colors duration-200
                      ${getIntensity(count, maxCount)}
                    `}
                    title={`${cat} à ${h} : ${count} ventes`}
                  >
                    {count}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
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
