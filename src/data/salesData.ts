/**
 * Données réelles SumUp — jeudi 26 mars 2026
 * Total journée : 57,01 € (35 transactions payées, 5 échecs)
 * Extraites manuellement depuis l'app SumUp.
 */

export interface Transaction {
  time: string
  amount: number
  method: string
  status: 'paid' | 'failed'
}

export const transactions: Transaction[] = [
  // 12h
  { time: '12:13', amount: 1.00, method: 'Apple Pay', status: 'paid' },
  { time: '12:17', amount: 2.50, method: 'Google Pay', status: 'failed' },
  { time: '12:20', amount: 1.00, method: 'Apple Pay', status: 'paid' },
  { time: '12:31', amount: 1.50, method: 'Apple Pay', status: 'paid' },
  { time: '12:37', amount: 1.50, method: 'Visa', status: 'paid' },
  { time: '12:41', amount: 1.50, method: 'Inconnu', status: 'failed' },
  { time: '12:41', amount: 1.50, method: 'Mastercard', status: 'paid' },
  { time: '12:44', amount: 1.50, method: 'Visa', status: 'paid' },
  { time: '12:45', amount: 1.50, method: 'Visa', status: 'paid' },
  { time: '12:48', amount: 1.00, method: 'Visa', status: 'paid' },
  { time: '12:53', amount: 1.50, method: 'Mastercard', status: 'paid' },
  // 13h
  { time: '13:00', amount: 1.50, method: 'Visa', status: 'paid' },
  { time: '13:04', amount: 2.50, method: 'Visa', status: 'paid' },
  { time: '13:09', amount: 1.50, method: 'Mastercard', status: 'paid' },
  { time: '13:12', amount: 1.50, method: 'Mastercard', status: 'paid' },
  { time: '13:14', amount: 1.50, method: 'Visa', status: 'paid' },
  { time: '13:15', amount: 1.50, method: 'Visa', status: 'paid' },
  { time: '13:17', amount: 1.00, method: 'Visa', status: 'paid' },
  { time: '13:18', amount: 2.00, method: 'Mastercard', status: 'paid' },
  { time: '13:22', amount: 1.00, method: 'Mastercard', status: 'paid' },
  { time: '13:31', amount: 1.00, method: 'Visa', status: 'paid' },
  { time: '13:32', amount: 1.00, method: 'Visa', status: 'paid' },
  { time: '13:32', amount: 1.00, method: 'Visa', status: 'paid' },
  { time: '13:35', amount: 1.00, method: 'Visa', status: 'paid' },
  { time: '13:35', amount: 1.00, method: 'Visa', status: 'paid' },
  { time: '13:37', amount: 1.00, method: 'Visa', status: 'paid' },
  { time: '13:38', amount: 2.00, method: 'Inconnu', status: 'failed' },
  { time: '13:38', amount: 2.00, method: 'Visa', status: 'paid' },
  // 14h
  { time: '14:11', amount: 1.00, method: 'Mastercard', status: 'paid' },
  { time: '14:20', amount: 1.00, method: 'Visa', status: 'paid' },
  { time: '14:21', amount: 1.00, method: 'Visa', status: 'paid' },
  { time: '14:22', amount: 2.20, method: 'Visa', status: 'paid' },
  { time: '14:25', amount: 2.00, method: 'Visa', status: 'paid' },
  { time: '14:25', amount: 1.00, method: 'Visa', status: 'paid' },
  // 15h
  { time: '15:00', amount: 1.09, method: 'Inconnu', status: 'failed' },
  { time: '15:01', amount: 10.09, method: 'Visa', status: 'paid' },
  { time: '15:01', amount: 1.20, method: 'Visa', status: 'paid' },
  { time: '15:06', amount: 1.00, method: 'Visa', status: 'paid' },
  { time: '15:09', amount: 1.32, method: 'Inconnu', status: 'failed' },
  { time: '15:27', amount: 1.32, method: 'Mastercard', status: 'paid' },
  { time: '15:46', amount: 1.20, method: 'Visa', status: 'paid' },
]

// Agrégations précalculées
export function getPaidTransactions() {
  return transactions.filter(t => t.status === 'paid')
}

export function getRevenueByHour() {
  const paid = getPaidTransactions()
  const slots: Record<string, { count: number; revenue: number }> = {}
  paid.forEach(t => {
    const hour = t.time.split(':')[0] + 'h'
    if (!slots[hour]) slots[hour] = { count: 0, revenue: 0 }
    slots[hour].count++
    slots[hour].revenue += t.amount
  })
  return ['12h', '13h', '14h', '15h'].map(h => ({
    hour: h,
    count: slots[h]?.count ?? 0,
    revenue: Math.round((slots[h]?.revenue ?? 0) * 100) / 100,
  }))
}

export function getPaymentMethodBreakdown() {
  const paid = getPaidTransactions()
  const methods: Record<string, number> = {}
  paid.forEach(t => {
    methods[t.method] = (methods[t.method] || 0) + 1
  })
  return Object.entries(methods)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

export function getSalesKpis() {
  const paid = getPaidTransactions()
  const failed = transactions.filter(t => t.status === 'failed')
  const totalRevenue = paid.reduce((s, t) => s + t.amount, 0)
  return {
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    transactionCount: paid.length,
    failedCount: failed.length,
    avgTransaction: Math.round((totalRevenue / paid.length) * 100) / 100,
  }
}
