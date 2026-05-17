export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-purple-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xs">T</span>
          </div>
          <span className="font-bold text-white text-sm">Talently</span>
        </div>
        <p className="text-xs text-center">
          Prototipo para <span className="text-violet-400 font-semibold">Hackathon Becas BCP 2026</span> · Tu reputación profesional, construida desde cero.
        </p>
        <p className="text-xs">Hecho con ❤️ en Perú</p>
      </div>
    </footer>
  )
}
