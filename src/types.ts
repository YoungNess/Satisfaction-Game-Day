export interface KpiData {
  label: string
  value: number | string
  subtitle?: string
  icon?: string
}

export interface ChartItem {
  name: string
  value: number
  fill?: string
}

export interface GroupedChartItem {
  name: string
  [key: string]: string | number
}

export interface SondageEntry {
  plateforme: string
  frequence_jeu: string
  type_de_jeu_prefere: string
  participation: string
  participation_anterieure: string
}

export interface SatisfactionEntry {
  horodateur: string
  formation: string
  participation_anterieure: string
  participation_duree: string
  canaux: string[]
  evaluation_globale: string
  inscription_claire: string
  accueil: string
  horaires_respectes: string
  probleme_organisationnel: string
  variete_jeux: string
  materiel_suffisant: string
  espace_adapte: string
  format_tournoi: string
  regles_claires: string
  gestion_matchs: string
  niveau_competition: string
  qualite_materiel: number
  confort_espaces: string
  temps_attente: string
  cours_avant_apres: string
  inscription_timing: string
  qualite_stand: string
  quantite_stand: number
  prix_adaptes: string
  stand_echanges: string
  ambiance: string
  integration: number
  cohesion: number
  recommandation: number
  jeux_a_ajouter: string
  activites_ameliorer: string
  suggestions: string
}

export interface DashboardData {
  sondage: SondageEntry[]
  satisfaction: SatisfactionEntry[]
}
