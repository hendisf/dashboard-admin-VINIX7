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

          <thead>
            <tr className="text-slate-500 border-b">
              <th className="py-3">Laporan</th>
              <th className="py-3">Status</th>
              <th className="py-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b">

                {/* TITLE */}
                <td className="py-3 font-medium text-slate-700">
                  {report.title || '-'}
                </td>

                {/* STATUS BADGE */}
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
                    className="px-3 py-1 text-xs bg-yellow-500 text-white rounded"
                    disabled={updatingId === report.id}
                  >
                    Pending
                  </button>

                  <button
                    onClick={() => handleChangeStatus(report.id, 'proses')}
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded"
                    disabled={updatingId === report.id}
                  >
                    Proses
                  </button>

                  <button
                    onClick={() => handleChangeStatus(report.id, 'selesai')}
                    className="px-3 py-1 text-xs bg-green-600 text-white rounded"
                    disabled={updatingId === report.id}
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
