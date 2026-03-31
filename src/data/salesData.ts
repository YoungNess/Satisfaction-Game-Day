/**
 * Mock data pour la heatmap des ventes.
 * Structure prête à être remplacée par les données SumUp.
 *
 * Pour intégrer les données réelles :
 * 1. Exporter l'historique SumUp en CSV/JSON
 * 2. Parser les transactions avec date/heure + montant
 * 3. Agréger par créneau horaire (et optionnellement par catégorie)
 * 4. Remplacer le tableau ci-dessous
 */

export interface SalesSlot {
  hour: string
  category: string
  count: number
}

export const salesData: SalesSlot[] = [
  // Boissons
  { hour: '10h', category: 'Boissons', count: 2 },
  { hour: '11h', category: 'Boissons', count: 5 },
  { hour: '12h', category: 'Boissons', count: 12 },
  { hour: '13h', category: 'Boissons', count: 18 },
  { hour: '14h', category: 'Boissons', count: 15 },
  { hour: '15h', category: 'Boissons', count: 20 },
  { hour: '16h', category: 'Boissons', count: 14 },
  { hour: '17h', category: 'Boissons', count: 8 },
  { hour: '18h', category: 'Boissons', count: 3 },
  // Snacks
  { hour: '10h', category: 'Snacks', count: 1 },
  { hour: '11h', category: 'Snacks', count: 3 },
  { hour: '12h', category: 'Snacks', count: 8 },
  { hour: '13h', category: 'Snacks', count: 14 },
  { hour: '14h', category: 'Snacks', count: 10 },
  { hour: '15h', category: 'Snacks', count: 16 },
  { hour: '16h', category: 'Snacks', count: 11 },
  { hour: '17h', category: 'Snacks', count: 6 },
  { hour: '18h', category: 'Snacks', count: 2 },
  // Goodies
  { hour: '10h', category: 'Goodies', count: 0 },
  { hour: '11h', category: 'Goodies', count: 1 },
  { hour: '12h', category: 'Goodies', count: 3 },
  { hour: '13h', category: 'Goodies', count: 5 },
  { hour: '14h', category: 'Goodies', count: 7 },
  { hour: '15h', category: 'Goodies', count: 9 },
  { hour: '16h', category: 'Goodies', count: 6 },
  { hour: '17h', category: 'Goodies', count: 4 },
  { hour: '18h', category: 'Goodies', count: 1 },
]

export const HOURS = ['10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h']
export const CATEGORIES = ['Boissons', 'Snacks', 'Goodies']
