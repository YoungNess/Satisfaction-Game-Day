interface KpiCardProps {
  label: string
  value: string | number
  subtitle?: string
}

export function KpiCard({ label, value, subtitle }: KpiCardProps) {
  return (
    <div className="bg-white border border-border rounded-xl p-4 sm:p-5 hover:shadow-sm transition-shadow">
      <p className="text-xs sm:text-sm text-tertiary font-medium uppercase tracking-wide">{label}</p>
      <p className="text-2xl sm:text-3xl font-bold text-primary mt-1">{value}</p>
      {subtitle && <p className="text-xs text-tertiary mt-1">{subtitle}</p>}
    </div>
  )
}
