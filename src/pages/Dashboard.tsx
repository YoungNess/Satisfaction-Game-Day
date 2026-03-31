import type { DashboardData } from '../types'
import { Section } from '../components/layout/Section'
import { KpiCard } from '../components/kpi/KpiCard'
import { ChartCard } from '../components/ui/ChartCard'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { SimpleBarChart } from '../components/charts/SimpleBarChart'
import { DonutChart } from '../components/charts/DonutChart'
import { SatisfactionInteractive } from '../components/satisfaction/SatisfactionInteractive'
import { SalesHeatmap } from '../components/sales/SalesHeatmap'
import { FeedbackCards } from '../components/feedback/FeedbackCards'
import { countBy, toChartData, flattenCanaux, averageScore, collectFreeText } from '../utils/formatters'

interface DashboardProps {
  data: DashboardData
}

// Données réelles fournies
const INSCRITS_PRE = 40
const INSCRITS_PENDANT = 34
const PASSAGES_TOTAL = 60

export function Dashboard({ data }: DashboardProps) {
  const { sondage, satisfaction } = data
  const totalPost = satisfaction.length

  // KPIs
  const excellentCount = satisfaction.filter(s => s.evaluation_globale === 'Excellent').length
  const tresBienCount = satisfaction.filter(s => s.evaluation_globale === 'Très bien').length
  const positifPct = Math.round(((excellentCount + tresBienCount) / totalPost) * 100)

  const recommandationPositive = satisfaction.filter(s => s.recommandation <= 2).length
  const recommandationPct = Math.round((recommandationPositive / totalPost) * 100)

  const avgQualiteMateriel = averageScore(satisfaction.map(s => s.qualite_materiel))

  // Satisfaction globale
  const evalData = toChartData(countBy(satisfaction, s => s.evaluation_globale))

  // Par formation
  const formationData = toChartData(countBy(satisfaction, s => s.formation))

  // Canaux de communication
  const canauxData = toChartData(flattenCanaux(satisfaction))

  // Durée de participation
  const dureeData = toChartData(countBy(satisfaction, s => s.participation_duree))

  // Pré-event
  const plateformeData = toChartData(countBy(sondage, s => s.plateforme))
  const typeJeuData = toChartData(countBy(sondage, s => s.type_de_jeu_prefere))
  const frequenceData = toChartData(countBy(sondage, s => s.frequence_jeu))

  // Organisation
  const inscriptionData = toChartData(countBy(satisfaction, s => s.inscription_claire))
  const confortData = toChartData(countBy(satisfaction, s => s.confort_espaces))

  // Jeux
  const varieteData = toChartData(countBy(satisfaction, s => s.variete_jeux))
  const standData = toChartData(countBy(satisfaction, s => s.qualite_stand))
  const ambianceData = toChartData(countBy(satisfaction, s => s.ambiance))
  const prixData = toChartData(countBy(satisfaction, s => s.prix_adaptes))
  const timingData = toChartData(countBy(satisfaction, s => s.inscription_timing))

  // Retours qualitatifs
  const jeuxSuggeres = collectFreeText(satisfaction.map(s => ({ text: s.jeux_a_ajouter })))
  const suggestionsLibres = collectFreeText(satisfaction.map(s => ({ text: s.suggestions })))
  const activitesAmeliorer = collectFreeText(satisfaction.map(s => ({ text: s.activites_ameliorer })))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">

      {/* ============ KPI CARDS ============ */}
      <AnimatedSection>
        <Section title="Vue d'ensemble" subtitle="Indicateurs clés de l'événement">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <KpiCard label="Inscrits pré-event" value={INSCRITS_PRE} subtitle="inscriptions avant le jour J" />
            <KpiCard label="Inscrits sur place" value={INSCRITS_PENDANT} subtitle="inscriptions le jour même" />
            <KpiCard label="Passages total" value={PASSAGES_TOTAL} subtitle="personnes comptabilisées" />
            <KpiCard label="Satisfaction positive" value={`${positifPct}%`} subtitle="Excellent + Très bien" />
            <KpiCard label="Recommandation" value={`${recommandationPct}%`} subtitle="recommanderaient l'événement" />
            <KpiCard label="Qualité matériel" value={`${avgQualiteMateriel.toFixed(1)}/5`} subtitle="note moyenne" />
          </div>
        </Section>
      </AnimatedSection>

      {/* ============ PARTICIPATION ============ */}
      <AnimatedSection>
        <Section title="Participation" subtitle="Profil des participants et durée de présence">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard title="Répondants par formation">
              <SimpleBarChart data={formationData} color="#000000" />
            </ChartCard>
            <ChartCard title="Durée de participation">
              <DonutChart data={dureeData} />
            </ChartCard>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <ChartCard title="Canaux de communication" subtitle="Mentions multiples possibles">
              <SimpleBarChart data={canauxData} layout="vertical" color="#424242" />
            </ChartCard>
            <ChartCard title="Moment d'inscription">
              <SimpleBarChart data={timingData} layout="vertical" color="#000000" />
            </ChartCard>
          </div>
        </Section>
      </AnimatedSection>

      {/* ============ JEUX & TOURNOI ============ */}
      <AnimatedSection>
        <Section title="Jeux & Tournoi" subtitle="Variété, ambiance et profil joueurs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard title="Variété des jeux proposés">
              <SimpleBarChart data={varieteData} color="#000000" />
            </ChartCard>
            <ChartCard title="Ambiance générale">
              <SimpleBarChart data={ambianceData} color="#424242" />
            </ChartCard>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <ChartCard title="Plateforme préférée" subtitle="Sondage pré-event">
              <DonutChart data={plateformeData} height={220} />
            </ChartCard>
            <ChartCard title="Type de jeu préféré" subtitle="Sondage pré-event">
              <SimpleBarChart data={typeJeuData} color="#000000" height={220} />
            </ChartCard>
            <ChartCard title="Fréquence de jeu" subtitle="Sondage pré-event">
              <SimpleBarChart data={frequenceData} color="#424242" height={220} />
            </ChartCard>
          </div>
        </Section>
      </AnimatedSection>

      {/* ============ SATISFACTION INTERACTIVE ============ */}
      <AnimatedSection>
        <Section title="Satisfaction" subtitle="Cliquez sur un critère pour explorer la répartition">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard title="Évaluation globale" subtitle="Répartition des réponses">
              <DonutChart data={evalData} />
            </ChartCard>
            <SatisfactionInteractive data={satisfaction} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <ChartCard title="Clarté de l'inscription">
              <SimpleBarChart data={inscriptionData} color="#000000" height={220} />
            </ChartCard>
            <ChartCard title="Confort des espaces">
              <SimpleBarChart data={confortData} color="#424242" height={220} />
            </ChartCard>
            <ChartCard title="Qualité du stand">
              <SimpleBarChart data={standData} color="#616161" height={220} />
            </ChartCard>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <ChartCard title="Prix adaptés ?">
              <DonutChart data={prixData} />
            </ChartCard>
          </div>
        </Section>
      </AnimatedSection>

      {/* ============ VENTES (HEATMAP) ============ */}
      <AnimatedSection>
        <Section title="Ventes" subtitle="Volume de ventes par créneau horaire">
          <SalesHeatmap />
        </Section>
      </AnimatedSection>

      {/* ============ RETOURS QUALITATIFS ============ */}
      <AnimatedSection>
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
      </AnimatedSection>

      {/* ============ MÉTHODOLOGIE ============ */}
      <AnimatedSection>
        <Section title="Méthodologie">
          <div className="bg-white border border-border rounded-xl p-4 sm:p-6 text-sm text-secondary space-y-3">
            <div>
              <p className="font-medium text-primary">Sources de données</p>
              <ul className="mt-1 space-y-1 text-tertiary list-disc list-inside">
                <li>Sondage pré-événement : base MariaDB (gameday_db), table SONDAGE — {sondage.length} réponses</li>
                <li>Formulaire post-événement : Google Forms (XLSX) — {totalPost} réponses, 27/03/2026</li>
                <li>Inscriptions et passages : données fournies manuellement (40 + 34 inscrits, 60 passages)</li>
                <li>Ventes : données mock en attente de l'historique SumUp</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-primary">Notes</p>
              <ul className="mt-1 space-y-1 text-tertiary list-disc list-inside">
                <li>L'échelle de recommandation va de 1 (oui) à 5 (non). Scores 1-2 = positifs.</li>
                <li>Les canaux de communication sont multi-valeurs.</li>
                <li>La heatmap de ventes utilise des données fictives. Remplacer dans <code className="text-xs bg-surface px-1 py-0.5 rounded">src/data/salesData.ts</code></li>
              </ul>
            </div>
          </div>
        </Section>
      </AnimatedSection>
    </div>
  )
}
