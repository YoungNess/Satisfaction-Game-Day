import { useEffect, useState } from 'react'
import type { DashboardData } from '../types'
import { fetchDashboardData } from '../data/dataService'

type Status = 'loading' | 'success' | 'error'

export function useData() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    fetchDashboardData()
      .then(d => {
        setData(d)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }, [])

  return { data, status }
}
