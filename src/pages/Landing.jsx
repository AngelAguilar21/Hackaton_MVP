import { Link } from 'react-router-dom'
import { ArrowRight, Star, Users, Briefcase, CheckCircle, TrendingUp, Award, Shield, Zap } from 'lucide-react'
import ScoreRing from '../components/ScoreRing'
import SkillBadge from '../components/SkillBadge'
import Footer from '../components/Footer'

const PILLARS = [
  { icon: '📁', title: 'Portafolio de proyectos reales', desc: 'Sube tus proyectos académicos y personales. Vincula código, diseños y documentos. La base de toda tu experiencia demostrable.' },
  { icon: '🏆', title: 'Retos publicados por empresas', desc: 'Empresas reales publican desafíos con criterios objetivos. La IA evalúa tu solución y suma puntos verificados a tu perfil.' },
  { icon: '🤝', title: 'Validación entre pares', desc: 'Egresados con experiencia avalan tus habilidades. El aval tiene peso según la reputación del validador. Sistema anti-fraude incluido.' },
  { icon: '🔗', title: 'Red directa con empleadores', desc: 'Empresas buscan candidatos por habilidad y score. Contacto directo sin intermediarios. Tú eres visible cuando más importa.' },
]

const STATS = [
  { value: '+2,400', label: 'Talentos registrados', icon: <Users size={20} /> },
  { value: '87%', label: 'Encontraron empleo en 3 meses', icon: <TrendingUp size={20} /> },
  { value: '150+', label: 'Empresas buscando talento', icon: <Briefcase size={20} /> },
  { value: '4.8★', label: 'Satisfacción promedio', icon: <Star size={20} /> },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Crea tu perfil', desc: 'Regístrate en minutos, sube tu primer proyecto real o académico.' },
  { step: '02', title: 'Recibe feedback', desc: 'Tus pares con experiencia validan y comentan tu trabajo con criterios claros.' },
  { step: '03', title: 'Completa retos', desc: 'La IA evalúa tus soluciones a retos reales de empresas y genera sellos verificados.' },
  { step: '04', title: 'Conéctate', desc: 'Empleadores te descubren por tus habilidades demostradas, no por tu CV.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar minimal */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-sm">T</span>
            </div>
            <span className="font-black text-xl text-slate-800">Talently</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-violet-700 transition-colors hidden sm:block">
              Ingresar
            </Link>
            <Link to="/login" className="btn-primary text-sm py-2 px-5">
              Comenzar gratis <ArrowRight size={14} className="inline ml-1" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 text-white py-20 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(139,92,246,0.3),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(99,102,241,0.2),_transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="page-enter">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Zap size={14} className="text-amber-400" />
                Hackathon Becas BCP 2026
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Tu reputación profesional,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
                  construida desde cero
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-violet-200 mb-8 leading-relaxed">
                Demuestra lo que sabes hacer — no solo lo que dices que sabes. Tu reputación la construye la comunidad y la valida la inteligencia artificial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="bg-white text-violet-700 hover:bg-violet-50 font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl text-center text-lg">
                  Crear mi perfil gratis
                </Link>
                <Link to="/login?role=employer" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all text-center text-lg">
                  Soy empleador
                </Link>
              </div>
              <p className="mt-6 text-sm text-violet-300 flex items-center gap-2">
                <CheckCircle size={14} />
                Sin costo para estudiantes y egresados
              </p>
            </div>

            {/* Score demo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl min-w-[280px]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                      MG
                    </div>
                    <div>
                      <p className="font-bold text-white">María García</p>
                      <p className="text-xs text-violet-300">Ing. de Sistemas · UPC</p>
                    </div>
                  </div>
                  <div className="flex justify-center mb-6">
                    <ScoreRing score={847} size="lg" />
                  </div>
                  <div className="space-y-2">
                    <SkillBadge skill="Análisis de Datos" level="Practicante" icon="📊" size="sm" />
                    <SkillBadge skill="Python" level="Practicante" icon="🐍" size="sm" />
                    <SkillBadge skill="Pensamiento Crítico" level="Explorador" icon="🧠" size="sm" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20 flex justify-between text-xs text-violet-300">
                    <span>3 retos completados</span>
                    <span>7 validaciones</span>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-amber-400 text-amber-900 rounded-2xl px-4 py-2 shadow-xl font-bold text-sm animate-bounce">
                  🏅 Nuevo sello generado
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center mb-2 text-violet-600">{s.icon}</div>
              <p className="text-2xl font-black text-slate-800">{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-6">
            El <span className="gradient-text">círculo vicioso</span> del primer empleo
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Miles de egresados en Latinoamérica enfrentan una paradoja frustrante: necesitan experiencia para conseguir empleo, pero no pueden obtener experiencia sin ese primer empleo.
          </p>
          <div className="bg-violet-50 border border-violet-200 rounded-2xl p-6 text-left">
            <p className="text-sm font-semibold text-violet-700 mb-2 flex items-center gap-2">
              <Shield size={16} /> Dato clave
            </p>
            <p className="text-slate-700">
              Más del <strong>60% de egresados</strong> tardan más de 6 meses en conseguir su primer empleo formal. La principal razón: imposibilidad de verificar las habilidades declaradas en el CV.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-4">
              Cómo funciona Talently
            </h2>
            <p className="text-slate-500">Un ciclo continuo de construcción de reputación</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="relative">
                <div className="card text-center hover:shadow-md transition-all">
                  <div className="text-4xl font-black text-violet-100 mb-3">{step.step}</div>
                  <h3 className="font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </div>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 text-slate-300 text-xl font-bold">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-4">
              Los 4 pilares de tu reputación
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              No son módulos independientes — son engranajes de un mismo sistema que se potencian entre sí.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {PILLARS.map((p, i) => (
              <div key={i} className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Score breakdown */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-800 mb-4">El score que no se puede falsificar</h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              A diferencia del CV, el score de Talently es construido por tres fuentes independientes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { pct: '40%', label: 'Evaluación de IA', desc: 'Calidad objetiva de soluciones a retos empresariales', icon: '🤖', color: 'violet' },
              { pct: '35%', label: 'Validación entre pares', desc: 'Avales ponderados por la reputación del validador', icon: '🤝', color: 'sky' },
              { pct: '25%', label: 'Consistencia del portafolio', desc: 'Variedad, frecuencia y diversidad de proyectos', icon: '📁', color: 'emerald' },
            ].map((item, i) => (
              <div key={i} className="card text-center hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className={`text-4xl font-black mb-2 ${item.color === 'violet' ? 'text-violet-600' : item.color === 'sky' ? 'text-sky-600' : 'text-emerald-600'}`}>
                  {item.pct}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{item.label}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-violet-700 to-purple-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Ningún talento joven merece quedarse invisible
          </h2>
          <p className="text-violet-200 text-lg mb-8">
            La experiencia no es el único camino para demostrar que eres capaz — solo era el único que existía hasta ahora.
          </p>
          <Link to="/login" className="bg-white text-violet-700 hover:bg-violet-50 font-bold px-10 py-4 rounded-xl transition-all shadow-xl text-lg inline-block">
            Empieza a construir tu reputación →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
