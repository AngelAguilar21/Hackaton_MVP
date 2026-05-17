import { useParams, Link } from 'react-router-dom'
import { CANDIDATES } from '../data/mockData'
import ScoreRing from '../components/ScoreRing'
import SkillBadge from '../components/SkillBadge'
import { MapPin, GraduationCap, Star, Users, CheckCircle, Share2, ExternalLink } from 'lucide-react'

export default function CandidateProfile() {
  const { id } = useParams()
  const candidate = CANDIDATES.find(c => c.id === id) || CANDIDATES[0]

  function copyLink() {
    navigator.clipboard?.writeText(window.location.href)
      .then(() => alert('Enlace copiado'))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 page-enter">
      {/* Header card */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className={`w-20 h-20 ${candidate.avatarColor} rounded-3xl flex items-center justify-center text-white font-black text-3xl flex-shrink-0 shadow-md`}>
            {candidate.initials}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-slate-800">{candidate.name}</h1>
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><GraduationCap size={14} /> {candidate.career}</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} /> {candidate.location}</span>
              <span className="text-violet-600 font-medium">{candidate.year}</span>
            </div>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-lg">{candidate.bio}</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ScoreRing score={candidate.score} size="md" />
            <button
              onClick={copyLink}
              className="flex items-center gap-2 text-xs text-slate-500 hover:text-violet-600 transition-colors"
            >
              <Share2 size={13} /> Compartir perfil
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Retos completados', value: candidate.challengesCompleted, icon: <CheckCircle size={16} className="text-violet-500" /> },
            { label: 'Validaciones recibidas', value: candidate.validationsReceived, icon: <Users size={16} className="text-sky-500" /> },
            { label: 'Sellos de habilidad', value: candidate.badges.length, icon: <Star size={16} className="text-amber-500" /> },
          ].map((s, i) => (
            <div key={i}>
              <div className="flex justify-center mb-1">{s.icon}</div>
              <div className="text-xl font-black text-slate-800">{s.value}</div>
              <div className="text-xs text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Score breakdown */}
      <div className="card mb-6">
        <h2 className="font-bold text-slate-800 mb-4">Composición del Score de Reputación</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Evaluación de IA', pct: candidate.scoreBreakdown.ai, color: 'bg-violet-500', textColor: 'text-violet-700', desc: 'Calidad de soluciones a retos empresariales' },
            { label: 'Validación entre pares', pct: candidate.scoreBreakdown.peers, color: 'bg-sky-500', textColor: 'text-sky-700', desc: 'Avales ponderados por reputación del validador' },
            { label: 'Portafolio', pct: candidate.scoreBreakdown.portfolio, color: 'bg-emerald-500', textColor: 'text-emerald-700', desc: 'Variedad y consistencia de proyectos' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 rounded-xl p-4">
              <div className={`text-3xl font-black ${item.textColor} mb-1`}>{item.pct}%</div>
              <div className="font-semibold text-slate-700 text-sm mb-1">{item.label}</div>
              <div className="text-xs text-slate-400">{item.desc}</div>
              <div className="mt-3 h-2 bg-slate-200 rounded-full">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill badges */}
      <div className="card mb-6">
        <h2 className="font-bold text-slate-800 mb-4">Sellos de Habilidad Verificados</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {candidate.badges.map(b => (
            <SkillBadge key={b.id} skill={b.skill} level={b.level} icon={b.icon} source={b.source} />
          ))}
        </div>
      </div>

      {/* Portfolio */}
      <div className="card mb-6">
        <h2 className="font-bold text-slate-800 mb-4">Proyectos en Portafolio</h2>
        <div className="space-y-4">
          {candidate.projects.map(p => (
            <div key={p.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-violet-300 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-slate-800">{p.title}</h3>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold flex-shrink-0">
                  <Star size={12} fill="currentColor" />
                  {p.stars}
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {p.tags.map(t => (
                  <span key={t} className="text-xs bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA for employer */}
      <div className="card bg-gradient-to-r from-violet-600 to-purple-700 text-white text-center">
        <h3 className="font-bold text-lg mb-2">¿Este candidato te interesa?</h3>
        <p className="text-violet-200 text-sm mb-4">Contáctalo directamente o descubre más talentos verificados.</p>
        <div className="flex justify-center gap-3 flex-wrap">
          <button className="bg-white text-violet-700 hover:bg-violet-50 font-semibold px-6 py-2.5 rounded-xl text-sm transition-all shadow-md">
            Contactar candidato
          </button>
          <Link to="/employer" className="bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2">
            <ExternalLink size={14} />
            Ver más candidatos
          </Link>
        </div>
      </div>
    </div>
  )
}
