interface FeedbackCardsProps {
  items: string[]
  emptyMessage?: string
}

export function FeedbackCards({ items, emptyMessage = 'Aucun retour disponible.' }: FeedbackCardsProps) {
  if (items.length === 0) {
    return <p className="text-sm text-tertiary italic">{emptyMessage}</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((text, i) => (
        <div
          key={i}
          className="bg-surface border border-border rounded-lg p-3 sm:p-4 text-sm text-secondary leading-relaxed"
        >
          <span className="text-tertiary mr-1">"</span>
          {text}
          <span className="text-tertiary ml-1">"</span>
        </div>
      ))}
    </div>
  )
}
