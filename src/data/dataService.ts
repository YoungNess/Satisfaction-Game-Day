import { sondageData, satisfactionData } from './mockData'
import type { DashboardData } from '../types'

/**
 * Couche d'abstraction data.
 * Actuellement : données statiques issues du SQL dump et du XLSX.
 * À remplacer par des appels API / Google Sheets API quand disponible.
 */
export async function fetchDashboardData(): Promise<DashboardData> {
  // Simule un délai réseau
  await new Promise(resolve => setTimeout(resolve, 300))
  return {
    sondage: sondageData,
    satisfaction: satisfactionData,
  }
}
