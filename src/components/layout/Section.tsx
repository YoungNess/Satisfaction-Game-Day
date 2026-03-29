import type { ReactNode } from 'react'

interface SectionProps {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function Section({ title, subtitle, children, className = '' }: SectionProps) {
  return (
    <section className={`${className}`}>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-primary">{title}</h2>
        {subtitle && <p className="text-sm text-tertiary mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}
