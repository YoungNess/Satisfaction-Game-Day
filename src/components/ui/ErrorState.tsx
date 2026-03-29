export function ErrorState() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <p className="text-lg font-semibold text-primary">Erreur de chargement</p>
        <p className="text-sm text-tertiary mt-1">Impossible de récupérer les données.</p>
      </div>
    </div>
  )
}
