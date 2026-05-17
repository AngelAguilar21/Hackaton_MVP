import logo from '../../assets/Logo.svg'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="DameChamba" className="w-8 h-8 object-contain" />
          <span className="flex flex-col leading-none font-bold text-white text-sm">
            <span>Dame</span>
            <span className="ml-3 -mt-0.5">Chamba</span>
          </span>
        </div>
        <p className="text-xs text-center">
          Prototipo para <span className="text-palette-button-primary font-semibold">Hackathon Becas BCP 2026</span> · Tu reputación profesional, construida desde cero.
        </p>
        <p className="text-xs">Hecho con ❤️ en Perú</p>
      </div>
    </footer>
  )
}
