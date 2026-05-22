'use client'

import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { supabase } from '../lib/supabase'

export default function LaporanPage() {

  const [reports, setReports] = useState([])

  async function fetchReports() {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    setReports(data)
  }

  useEffect(() => {
    fetchReports()
  }, [])

  async function updateStatus(id, status) {
    await supabase
      .from('reports')
      .update({ status })
      .eq('id', id)

    fetchReports()
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 flex flex-col bg-gradient-to-br from-blue-50 via-slate-100 to-indigo-50">

        <Navbar />

        <div className="p-6">

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800">
              Detail Laporan
            </h1>

            <p className="text-slate-500 mt-1">
              Semua data laporan masyarakat
            </p>
          </div>

          <div className="grid gap-5">

            {reports.map((report) => (

              <div
                key={report.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
              >

                {/* Header */}
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">

                  <div>
                    <h2 className="text-xl font-bold text-slate-800">
                      {report.title}
                    </h2>

                    <p className="text-slate-500 text-sm mt-1">
                      {report.created_at}
                    </p>
                  </div>

                  <span
                    className={`
                      px-4 py-2 rounded-full text-sm font-semibold
                      ${
                        report.status === 'Done'
                          ? 'bg-green-100 text-green-700'
                          : report.status === 'Process'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }
                    `}
                  >
                    {report.status}
                  </span>

                </div>

                {/* Content */}
                <div className="p-5 grid md:grid-cols-2 gap-6">

                  {/* Left */}
                  <div className="space-y-4">

                    <div>
                      <p className="text-sm text-slate-400 mb-1">
                        User ID
                      </p>

                      <p className="font-medium text-slate-700">
                        {report.user_id}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-400 mb-1">
                        Lokasi
                      </p>

                      <p className="font-medium text-slate-700">
                        {report.location}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-400 mb-1">
                        Tanggal
                      </p>

                      <p className="font-medium text-slate-700">
                        {report.date}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-400 mb-1">
                        Isi Laporan
                      </p>

                      <p className="text-slate-600 leading-relaxed">
                        {report.content}
                      </p>
                    </div>

                  </div>

                  {/* Right */}
                  <div>

                    <p className="text-sm text-slate-400 mb-3">
                      Gambar Bukti
                    </p>

                    <img
                      src={
                        report.image_url ||
                        'https://placehold.co/600x400?text=No+Image'
                      }
                      alt="report"
                      className="w-full h-72 object-cover rounded-2xl border"
                    />

                  </div>

                </div>

                {/* Footer */}
                <div className="p-5 border-t border-slate-100 flex gap-3">

                  <button
                    onClick={() => updateStatus(report.id, 'Process')}
                    className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-5 py-2 rounded-xl"
                  >
                    Process
                  </button>

                  <button
                    onClick={() => updateStatus(report.id, 'Done')}
                    className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-2 rounded-xl"
                  >
                    Done
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>
      </div>
    </div>
  )
}