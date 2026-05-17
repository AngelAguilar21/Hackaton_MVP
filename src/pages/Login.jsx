import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { GraduationCap, Briefcase, ArrowRight } from 'lucide-react'
import logo from '../../assets/Logo.svg'

export default function Login() {
  const [mode, setMode] = useState('select') // 'select' | 'candidate' | 'employer'
  const { loginAsCandidate, loginAsEmployer } = useApp()
  const navigate = useNavigate()

  function handleCandidateLogin() {
    loginAsCandidate('u1')
    navigate('/dashboard')
  }

  function handleEmployerLogin() {
    loginAsEmployer()
    navigate('/employer')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-palette-fonto-light to-palette-text-small flex flex-col items-center justify-center p-6">
      <Link to="/" className="flex items-center gap-2 mb-10">
        <img src={logo} alt="DameChamba" className="w-12 h-12 object-contain" />
        <span className="flex flex-col leading-none font-black text-2xl text-palette-text-primary">
          <span>Dame</span>
          <span className="ml-4 -mt-0.5">Chamba</span>
        </span>
      </Link>

      <div className="bg-white rounded-3xl shadow-xl border border-palette-fonto-light p-8 w-full max-w-md">
        <h1 className="text-2xl font-black text-palette-text-primary text-center mb-2">Bienvenido de vuelta</h1>
        <p className="text-palette-text-small text-center text-sm mb-8">¿Cómo quieres ingresar hoy?</p>

        <div className="space-y-4">
          <button
            onClick={handleCandidateLogin}
            className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-palette-fonto-light hover:border-palette-button-primary hover:bg-palette-fonto-light transition-all duration-200 text-left group"
          >
            <div className="w-12 h-12 bg-palette-fonto-light group-hover:bg-palette-button-primary group-hover:bg-opacity-20 rounded-2xl flex items-center justify-center transition-colors">
              <GraduationCap size={24} className="text-palette-button-primary" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-palette-text-primary">Soy estudiante o egresado</p>
              <p className="text-xs text-palette-text-small">Construye y comparte tu reputación profesional</p>
            </div>
            <ArrowRight size={18} className="text-palette-text-small group-hover:text-palette-button-primary transition-colors" />
          </button>

          <button
            onClick={handleEmployerLogin}
            className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-palette-fonto-light hover:border-palette-text-primary hover:bg-palette-fonto-light transition-all duration-200 text-left group"
          >
            <div className="w-12 h-12 bg-palette-fonto-light group-hover:bg-palette-text-primary group-hover:bg-opacity-20 rounded-2xl flex items-center justify-center transition-colors">
              <Briefcase size={24} className="text-palette-text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-palette-text-primary">Soy empleador</p>
              <p className="text-xs text-palette-text-small">Encuentra talento joven verificado y publicar retos</p>
            </div>
            <ArrowRight size={18} className="text-palette-text-small group-hover:text-palette-text-primary transition-colors" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-palette-fonto-light">
          <p className="text-xs text-palette-text-small text-center">
            Este es un prototipo demo del{' '}
            <span className="font-semibold text-palette-button-primary">Hackathon Becas BCP 2026</span>.
            Haz clic en cualquier opción para explorar la plataforma.
          </p>
        </div>
      </div>
    </div>
  )
}
