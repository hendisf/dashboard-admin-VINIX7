'use client'

import { supabase } from '@/app/lib/supabase'

export default function ReportTable({ reports, fetchReports }) {

  async function updateStatus(id, status) {
    await supabase
      .from('reports')
      .update({ status })
      .eq('id', id)

    fetchReports()
  }

  async function deleteReport(id) {
    await supabase
      .from('reports')
      .delete()
      .eq('id', id)

    fetchReports()
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">

      <table className="w-full border-collapse">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left p-4 text-slate-600 font-semibold">
              User
            </th>

            <th className="text-left p-4 text-slate-600 font-semibold">
              Title
            </th>

            <th className="text-left p-4 text-slate-600 font-semibold">
              Status
            </th>

            <th className="text-left p-4 text-slate-600 font-semibold">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {reports.map((report) => (

            <tr
              key={report.id}
              className="border-t hover:bg-slate-50 transition"
            >

              <td className="p-4 font-medium text-slate-700">
                {report.user_name}
              </td>

              <td className="p-4 text-slate-600">
                {report.title}
              </td>

              <td className="p-4">

                <span
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium
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

              </td>

              <td className="p-4">

                <div className="flex gap-2 flex-wrap">

                  <button
                    onClick={() => updateStatus(report.id, 'Process')}
                    className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-4 py-2 rounded-xl text-sm font-medium"
                  >
                    Process
                  </button>

                  <button
                    onClick={() => updateStatus(report.id, 'Done')}
                    className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 rounded-xl text-sm font-medium"
                  >
                    Done
                  </button>

                  <button
                    onClick={() => deleteReport(report.id)}
                    className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-xl text-sm font-medium"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}