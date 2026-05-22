'use client'

import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import StatsCard from './components/StatsCard'
import ReportTable from './components/ReportTable'
import { supabase } from './lib/supabase'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchReports() {
    setLoading(true)

    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error)
      setLoading(false)
      return
    }

    setReports(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchReports()
  }, [])

  const pending = reports.filter(r => r.status === 'dikirim').length
  const done = reports.filter(r => r.status === 'Done').length

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6">

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800">
              Dashboard
            </h1>
            <p className="text-slate-500 mt-1">
              Monitoring laporan masyarakat
            </p>
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <StatsCard title="Laporan Masuk" value={pending} />
            <StatsCard title="Laporan Selesai" value={done} />
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">
              Data Laporan
            </h2>

            <ReportTable
              reports={reports}
              refreshReports={fetchReports}
              loading={loading}
            />
          </div>

        </div>
      </div>
    </div>
  )
}
