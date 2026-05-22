'use client'

import Link from 'next/link'
import { LayoutDashboard, FileText } from 'lucide-react'

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-10">
        Admin Panel
      </h1>

      <div className="space-y-3">

        <Link href="/">
          <div className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-xl cursor-pointer transition">
            <LayoutDashboard size={20} />
            <p>Dashboard</p>
          </div>
        </Link>

        <Link href="/laporan">
          <div className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-xl cursor-pointer transition">
            <FileText size={20} />
            <p>Laporan</p>
          </div>
        </Link>

      </div>
    </div>
  )
}