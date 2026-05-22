export default function Navbar() {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-blue-100 h-20 flex items-center justify-between px-6">

      <h1 className="text-2xl font-bold text-slate-800">
        Dashboard
      </h1>

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
          A
        </div>

        <p className="font-semibold text-slate-700">
          Admin
        </p>

      </div>
    </div>
  )
}