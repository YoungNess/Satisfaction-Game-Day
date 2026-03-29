export function Header() {
  return (
    <header className="border-b border-border bg-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-primary leading-tight">Game Days</h1>
            <p className="text-xs text-tertiary">Bilan post-événement — 27 mars 2026</p>
          </div>
        </div>
        <span className="hidden sm:inline text-xs text-tertiary bg-surface px-3 py-1 rounded-full">
          Dashboard analytique
        </span>
      </div>
    </header>
  )
}
