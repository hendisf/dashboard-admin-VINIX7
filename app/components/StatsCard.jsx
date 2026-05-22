import { FileText } from 'lucide-react'

export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-slate-500 mb-2 text-sm">
            {title}
          </p>

          <h1 className="text-4xl font-bold text-slate-800">
            {value}
          </h1>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">

          <FileText className="text-white" size={26} />

        </div>

      </div>
    </div>
  )
}