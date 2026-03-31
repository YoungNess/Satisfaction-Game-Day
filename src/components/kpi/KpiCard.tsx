import { motion } from 'framer-motion'

interface KpiCardProps {
  label: string
  value: string | number
  subtitle?: string
}

export function KpiCard({ label, value, subtitle }: KpiCardProps) {
  return (
    <motion.div
      className="bg-white border border-border rounded-xl p-4 sm:p-5 cursor-default"
      whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.2 }}
    >
      <p className="text-xs sm:text-sm text-tertiary font-medium uppercase tracking-wide">{label}</p>
      <p className="text-2xl sm:text-3xl font-bold text-primary mt-1">{value}</p>
      {subtitle && <p className="text-xs text-tertiary mt-1">{subtitle}</p>}
    </motion.div>
  )
}
