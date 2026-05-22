'use client'

import { supabase } from '../lib/supabase'
import { useState } from 'react'

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
              <th className="py-3">Nama</th>
              <th className="py-3">Laporan</th>
              <th className="py-3">Status</th>
              <th className="py-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b">

                <td className="py-3 font-medium text-slate-700">
                  {report.name}
                </td>

                <td className="py-3 text-slate-600">
                  {report.message}
                </td>

                <td className="py-3">
                  <span className={`
                    px-3 py-1 rounded-full text-xs
                    ${report.status === 'Done'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-yellow-100 text-yellow-600'}
                  `}>
                    {report.status}
                  </span>
                </td>

                <td className="py-3 flex gap-2">

                  <button
                    onClick={() => handleChangeStatus(report.id, 'dikirim')}
                    className="px-3 py-1 text-xs rounded bg-yellow-500 text-white"
                    disabled={updatingId === report.id}
                  >
                    Pending
                  </button>

                  <button
                    onClick={() => handleChangeStatus(report.id, 'Done')}
                    className="px-3 py-1 text-xs rounded bg-green-600 text-white"
                    disabled={updatingId === report.id}
                  >
                    Done
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
