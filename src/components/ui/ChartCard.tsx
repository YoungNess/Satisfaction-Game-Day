import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function ChartCard({ title, subtitle, children, className = '' }: ChartCardProps) {
  return (
    <div className={`bg-white border border-border rounded-xl p-4 sm:p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-sm sm:text-base font-semibold text-primary">{title}</h3>
        {subtitle && <p className="text-xs text-tertiary mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}
