import type { DashboardData } from '../types'
import { Section } from '../components/layout/Section'
import { KpiCard } from '../components/kpi/KpiCard'
import { ChartCard } from '../components/ui/ChartCard'
import { SimpleBarChart } from '../components/charts/SimpleBarChart'
import { DonutChart } from '../components/charts/DonutChart'
import { SatisfactionBarChart } from '../components/charts/SatisfactionBarChart'
import { FeedbackCards } from '../components/feedback/FeedbackCards'
import { countBy, toChartData, flattenCanaux, averageScore, collectFreeText } from '../utils/formatters'

interface DashboardProps {
  data: DashboardData
}

export function Dashboard({ data }: DashboardProps) {
  const { sondage, satisfaction } = data
  const totalPost = satisfaction.length
  const totalPre = sondage.length

  // KPIs
  const excellentCount = satisfaction.filter(s => s.evaluation_globale === 'Excellent').length
  const tresBienCount = satisfaction.filter(s => s.evaluation_globale === 'Très bien').length
  const positifPct = Math.round(((excellentCount + tresBienCount) / totalPost) * 100)

  // Recommandation: échelle 1=oui 5=non, donc 1-2 = positif
  const recommandationPositive = satisfaction.filter(s => s.recommandation <= 2).length
  const recommandationPct = Math.round((recommandationPositive / totalPost) * 100)

  const avgQualiteMateriel = averageScore(satisfaction.map(s => s.qualite_materiel))

  const journeeComplete = satisfaction.filter(s => s.participation_duree === 'Oui').length

  // Satisfaction globale
  const evalData = toChartData(countBy(satisfaction, s => s.evaluation_globale))

  // Par formation
  const formationData = toChartData(countBy(satisfaction, s => s.formation))

  // Canaux de communication
  const canauxData = toChartData(flattenCanaux(satisfaction))

  // Durée de participation
  const dureeData = toChartData(countBy(satisfaction, s => s.participation_duree))

  // Pré-event: plateforme
  const plateformeData = toChartData(countBy(sondage, s => s.plateforme))

  // Pré-event: type de jeu
  const typeJeuData = toChartData(countBy(sondage, s => s.type_de_jeu_prefere))

  // Pré-event: fréquence
  const frequenceData = toChartData(countBy(sondage, s => s.frequence_jeu))

  // Accueil satisfaction
  const accueilData = toChartData(countBy(satisfaction, s => s.accueil))

  // Variété des jeux
  const varieteData = toChartData(countBy(satisfaction, s => s.variete_jeux))

  // Format tournoi
  const tournoiData = toChartData(countBy(satisfaction, s => s.format_tournoi))

  // Inscription clarté
  const inscriptionData = toChartData(countBy(satisfaction, s => s.inscription_claire))

  // Stand qualité
  const standData = toChartData(countBy(satisfaction, s => s.qualite_stand))

  // Prix
  const prixData = toChartData(countBy(satisfaction, s => s.prix_adaptes))

  // Inscription timing
  const timingData = toChartData(countBy(satisfaction, s => s.inscription_timing))

  // Ambiance
  const ambianceData = toChartData(countBy(satisfaction, s => s.ambiance))

  // Confort
  const confortData = toChartData(countBy(satisfaction, s => s.confort_espaces))

  // Satisfaction multi-critères pour bar groupé
  const criteresSatisfaction = [
    { name: 'Accueil', ...buildScaleCount(satisfaction.map(s => s.accueil)) },
    { name: 'Variété jeux', ...buildScaleCount(satisfaction.map(s => s.variete_jeux)) },
    { name: 'Format tournoi', ...buildScaleCount(satisfaction.map(s => s.format_tournoi)) },
    { name: 'Gestion matchs', ...buildScaleCount(satisfaction.map(s => s.gestion_matchs)) },
  ]

  // Retours qualitatifs
  const jeuxSuggeres = collectFreeText(satisfaction.map(s => ({ text: s.jeux_a_ajouter })))
  const suggestionsLibres = collectFreeText(satisfaction.map(s => ({ text: s.suggestions })))
  const activitesAmeliorer = collectFreeText(satisfaction.map(s => ({ text: s.activites_ameliorer })))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">
      {/* KPI Cards */}
      <Section title="Vue d'ensemble" subtitle="Indicateurs clés de l'événement">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <KpiCard label="Répondants post" value={totalPost} subtitle="formulaire satisfaction" />
          <KpiCard label="Inscrits pré-event" value={totalPre} subtitle="sondage en amont" />
          <KpiCard label="Satisfaction positive" value={`${positifPct}%`} subtitle="Excellent + Très bien" />
          <KpiCard label="Recommandation" value={`${recommandationPct}%`} subtitle="recommanderaient l'événement" />
          <KpiCard label="Qualité matériel" value={`${avgQualiteMateriel.toFixed(1)}/5`} subtitle="note moyenne" />
          <KpiCard label="Journée complète" value={journeeComplete} subtitle={`sur ${totalPost} répondants`} />
        </div>
      </Section>

      {/* Satisfaction globale */}
      <Section title="Satisfaction globale" subtitle="Évaluation de l'événement dans sa globalité">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Évaluation globale" subtitle="Répartition des réponses">
            <DonutChart data={evalData} />
          </ChartCard>
          <ChartCard title="Satisfaction par critère" subtitle="Accueil, jeux, tournoi, gestion">
            <SatisfactionBarChart
              data={criteresSatisfaction}
              keys={[
                { key: 'excellent', label: 'Très satisfaisant', color: '#000000' },
                { key: 'bon', label: 'Satisfaisant', color: '#616161' },
                { key: 'moyen', label: 'Correct/Moyen', color: '#9e9e9e' },
                { key: 'faible', label: 'Insatisfaisant', color: '#d4d4d4' },
              ]}
              height={320}
            />
          </ChartCard>
        </div>
      </Section>

      {/* Participation */}
      <Section title="Participation" subtitle="Profil des participants et durée de présence">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Répondants par formation">
            <SimpleBarChart data={formationData} color="#000000" />
          </ChartCard>
          <ChartCard title="Durée de participation">
            <DonutChart data={dureeData} />
          </ChartCard>
        </div>
      </Section>

      {/* Communication */}
      <Section title="Communication" subtitle="Comment les participants ont entendu parler de l'événement">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Canaux de communication" subtitle="Mentions multiples possibles">
            <SimpleBarChart data={canauxData} layout="vertical" color="#424242" />
          </ChartCard>
          <ChartCard title="Moment d'inscription">
            <SimpleBarChart data={timingData} layout="vertical" color="#000000" />
          </ChartCard>
        </div>
      </Section>

      {/* Organisation */}
      <Section title="Organisation" subtitle="Clarté d'inscription, accueil, confort">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ChartCard title="Clarté de l'inscription">
            <SimpleBarChart data={inscriptionData} color="#000000" height={220} />
          </ChartCard>
          <ChartCard title="Qualité de l'accueil">
            <SimpleBarChart data={accueilData} color="#424242" height={220} />
          </ChartCard>
          <ChartCard title="Confort des espaces">
            <SimpleBarChart data={confortData} color="#616161" height={220} />
          </ChartCard>
        </div>
      </Section>

      {/* Jeux & Tournoi */}
      <Section title="Jeux & Tournoi" subtitle="Variété, format et ambiance">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Variété des jeux proposés">
            <SimpleBarChart data={varieteData} color="#000000" />
          </ChartCard>
          <ChartCard title="Format du tournoi">
            <SimpleBarChart data={tournoiData} color="#424242" />
          </ChartCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <ChartCard title="Ambiance générale">
            <SimpleBarChart data={ambianceData} color="#000000" />
          </ChartCard>
          <ChartCard title="Qualité du stand">
            <SimpleBarChart data={standData} color="#424242" />
          </ChartCard>
        </div>
      </Section>

      {/* Prix stand */}
      <Section title="Stand & Tarifs" subtitle="Perception des prix">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Prix adaptés ?">
            <DonutChart data={prixData} />
          </ChartCard>
        </div>
      </Section>

      {/* Profil joueurs (pré-événement SQL) */}
      <Section title="Profil des joueurs" subtitle="Données du sondage pré-événement (base de données)">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ChartCard title="Plateforme préférée">
            <DonutChart data={plateformeData} height={240} />
          </ChartCard>
          <ChartCard title="Type de jeu préféré">
            <SimpleBarChart data={typeJeuData} color="#000000" />
          </ChartCard>
          <ChartCard title="Fréquence de jeu">
            <SimpleBarChart data={frequenceData} color="#424242" />
          </ChartCard>
        </div>
      </Section>

      {/* Retours qualitatifs */}
      <Section title="Retours qualitatifs" subtitle="Verbatims et suggestions des participants">
        <div className="space-y-6">
          <ChartCard title="Jeux suggérés par les participants" subtitle={`${jeuxSuggeres.length} suggestions`}>
            <FeedbackCards items={jeuxSuggeres} emptyMessage="Aucune suggestion de jeux." />
          </ChartCard>
          <ChartCard title="Suggestions générales" subtitle={`${suggestionsLibres.length} retours`}>
            <FeedbackCards items={suggestionsLibres} emptyMessage="Aucune suggestion." />
          </ChartCard>
          {activitesAmeliorer.length > 0 && (
            <ChartCard title="Activités à améliorer" subtitle={`${activitesAmeliorer.length} retours`}>
              <FeedbackCards items={activitesAmeliorer} />
            </ChartCard>
          )}
        </div>
      </Section>

      {/* Méthodologie */}
      <Section title="Méthodologie">
        <div className="bg-white border border-border rounded-xl p-4 sm:p-6 text-sm text-secondary space-y-3">
          <div>
            <p className="font-medium text-primary">Sources de données</p>
            <ul className="mt-1 space-y-1 text-tertiary">
              <li>Sondage pré-événement : base de données MariaDB (gameday_db), table SONDAGE — {totalPre} réponses</li>
              <li>Formulaire post-événement : Google Forms exporté en XLSX — {totalPost} réponses, collectées le 27/03/2026</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-primary">Notes</p>
            <ul className="mt-1 space-y-1 text-tertiary">
              <li>Les échelles de satisfaction textuelles ont été normalisées en 4 niveaux pour les graphiques groupés.</li>
              <li>L'échelle de recommandation va de 1 (oui) à 5 (non). Les scores 1-2 sont comptés comme positifs.</li>
              <li>Les canaux de communication sont multi-valeurs (un répondant peut en mentionner plusieurs).</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  )
}

// Helper pour normaliser les échelles textuelles en 4 niveaux
function buildScaleCount(values: string[]): { excellent: number; bon: number; moyen: number; faible: number } {
  let excellent = 0, bon = 0, moyen = 0, faible = 0
  values.forEach(v => {
    const lower = v.toLowerCase()
    if (lower.includes('très satisfaisant') || lower.includes('très fluide') || lower.includes('très variés')) excellent++
    else if (lower.includes('satisfaisant') || lower.includes('fluide') || lower.includes('variés') || lower.includes('adapté')) bon++
    else if (lower.includes('correct') || lower.includes('moyennement') || lower.includes('acceptable')) moyen++
    else if (lower.includes('insatisfaisant') || lower.includes('pas participé')) faible++
  })
  return { excellent, bon, moyen, faible }
}
