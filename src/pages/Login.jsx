import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { GraduationCap, Briefcase, ArrowRight } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 flex flex-col items-center justify-center p-6">
      <Link to="/" className="flex items-center gap-2 mb-10">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center">
          <span className="text-white font-black">T</span>
        </div>
        <span className="font-black text-2xl text-slate-800">Talently</span>
      </Link>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 w-full max-w-md">
        <h1 className="text-2xl font-black text-slate-800 text-center mb-2">Bienvenido de vuelta</h1>
        <p className="text-slate-500 text-center text-sm mb-8">¿Cómo quieres ingresar hoy?</p>

        <div className="space-y-4">
          <button
            onClick={handleCandidateLogin}
            className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-200 hover:border-violet-400 hover:bg-violet-50 transition-all duration-200 text-left group"
          >
            <div className="w-12 h-12 bg-violet-100 group-hover:bg-violet-200 rounded-2xl flex items-center justify-center transition-colors">
              <GraduationCap size={24} className="text-violet-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-800">Soy estudiante o egresado</p>
              <p className="text-xs text-slate-500">Construye y comparte tu reputación profesional</p>
            </div>
            <ArrowRight size={18} className="text-slate-300 group-hover:text-violet-500 transition-colors" />
          </button>

          <button
            onClick={handleEmployerLogin}
            className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-slate-200 hover:border-sky-400 hover:bg-sky-50 transition-all duration-200 text-left group"
          >
            <div className="w-12 h-12 bg-sky-100 group-hover:bg-sky-200 rounded-2xl flex items-center justify-center transition-colors">
              <Briefcase size={24} className="text-sky-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-800">Soy empleador</p>
              <p className="text-xs text-slate-500">Encuentra talento joven verificado y publicar retos</p>
            </div>
            <ArrowRight size={18} className="text-slate-300 group-hover:text-sky-500 transition-colors" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-400 text-center">
            Este es un prototipo demo del{' '}
            <span className="font-semibold text-violet-600">Hackathon Becas BCP 2026</span>.
            Haz clic en cualquier opción para explorar la plataforma.
          </p>
        </div>
      </div>
    </div>
  )
}
