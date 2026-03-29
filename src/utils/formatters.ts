export function percent(value: number, total: number): string {
  if (total === 0) return '0%'
  return `${Math.round((value / total) * 100)}%`
}

export function countBy<T>(arr: T[], key: (item: T) => string): Record<string, number> {
  return arr.reduce<Record<string, number>>((acc, item) => {
    const k = key(item)
    if (k) acc[k] = (acc[k] || 0) + 1
    return acc
  }, {})
}

export function toChartData(counts: Record<string, number>): { name: string; value: number }[] {
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

export function flattenCanaux(entries: { canaux: string[] }[]): Record<string, number> {
  const counts: Record<string, number> = {}
  entries.forEach(e => {
    e.canaux.forEach(c => {
      if (c) counts[c] = (counts[c] || 0) + 1
    })
  })
  return counts
}

export function averageScore(values: number[]): number {
  if (values.length === 0) return 0
  return values.reduce((s, v) => s + v, 0) / values.length
}

export function collectFreeText(entries: { text: string }[]): string[] {
  return entries
    .map(e => e.text.trim())
    .filter(t => t.length > 0 && !['non', 'rien', 'aucun', 'aucune', 'rien du tout (bien)', 'aucune (parfait)', 'rien'].includes(t.toLowerCase()))
}
