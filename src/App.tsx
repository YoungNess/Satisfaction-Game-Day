import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Loader } from './components/ui/Loader'
import { ErrorState } from './components/ui/ErrorState'
import { Dashboard } from './pages/Dashboard'
import { useData } from './hooks/useData'

function App() {
  const { data, status } = useData()

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Header />
      <main className="flex-1">
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorState />}
        {status === 'success' && data && <Dashboard data={data} />}
      </main>
      <Footer />
    </div>
  )
}

export default App
