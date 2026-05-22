'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ReportTable({ reports, refreshReports, loading }) {
  const [updatingId, setUpdatingId] = useState(null)

  async function handleChangeStatus(id, newStatus) {
    setUpdatingId(id)

    const { error } = await supabase
      .from('reports')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      console.log(error)
      setUpdatingId(null)
      return
    }

    await refreshReports()
    setUpdatingId(null)
  }

  return (
    <div className="overflow-x-auto">

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <table className="w-full text-sm text-left">

          {/* HEADER */}
          <thead>
            <tr className="text-slate-500 border-b">
              <th className="py-3">Laporan</th>
              <th className="py-3">Detail</th>
              <th className="py-3">Status</th>
              <th className="py-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b align-top">

                {/* TITLE */}
                <td className="py-3 font-medium text-slate-700 w-[180px]">
                  {report.title || '-'}
                </td>

                {/* CONTEXT DETAIL */}
                <td className="py-3 text-slate-600 space-y-1">
                 {report.content || '-'}
                </td>

                {/* STATUS */}
                <td className="py-3">
                  <span className={`
                    px-3 py-1 rounded-full text-xs
                    ${
                      report.status === 'selesai'
                        ? 'bg-green-100 text-green-600'
                        : report.status === 'proses'
                        ? 'bg-blue-100 text-blue-600'
                        : report.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {report.status}
                  </span>
                </td>

                {/* ACTION */}
                <td className="py-3 flex gap-2 flex-wrap">

                  <button
                    onClick={() => handleChangeStatus(report.id, 'pending')}
                    disabled={updatingId === report.id}
                    className="px-3 py-1 text-xs bg-yellow-500 text-white rounded"
                  >
                    Pending
                  </button>

                  <button
                    onClick={() => handleChangeStatus(report.id, 'proses')}
                    disabled={updatingId === report.id}
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded"
                  >
                    Proses
                  </button>

                  <button
                    onClick={() => handleChangeStatus(report.id, 'selesai')}
                    disabled={updatingId === report.id}
                    className="px-3 py-1 text-xs bg-green-600 text-white rounded"
                  >
                    Selesai
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}

    </div>
  )
}
