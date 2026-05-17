import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import ScoreRing from '../components/ScoreRing'
import SkillBadge from '../components/SkillBadge'
import ChallengeCard from '../components/ChallengeCard'
import { CHALLENGES } from '../data/mockData'
import { ArrowRight, Star, Users, CheckCircle, Share2, TrendingUp } from 'lucide-react'

export default function CandidateDashboard() {
  const { currentUser, completedChallenges, earnedBadges } = useApp()
  if (!currentUser) return null

  const allBadges = [...earnedBadges, ...currentUser.badges]
  const totalScore = currentUser.score + completedChallenges.length * 40
  const clampedScore = Math.min(999, totalScore)

  function copyProfileLink() {
    navigator.clipboard?.writeText(window.location.origin + `/profile/${currentUser.id}`)
      .then(() => alert('Enlace copiado al portapapeles'))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 page-enter">
      {/* Header */}
      <div className="card mb-6 bg-gradient-to-r from-palette-text-primary to-palette-button-primary text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-5">
            <div className={`w-16 h-16 ${currentUser.avatarColor} rounded-3xl flex items-center justify-center text-white font-black text-2xl flex-shrink-0 shadow-lg`}>
              {currentUser.initials}
            </div>
            <div>
              <h1 className="text-2xl font-black">{currentUser.name}</h1>
              <p className="text-palette-fonto-light text-sm">{currentUser.career}</p>
              <p className="text-white/60 text-xs mt-1">{currentUser.year} · {currentUser.location}</p>
            </div>
          </div>
          <div className="md:ml-auto flex flex-col items-center gap-2">
            <ScoreRing score={clampedScore} size="md" />
          </div>
          <button
            onClick={copyProfileLink}
            className="bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all"
          >
            <Share2 size={16} />
            Compartir perfil
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Retos completados', value: currentUser.challengesCompleted + completedChallenges.length, icon: <CheckCircle size={18} className="text-palette-button-primary" /> },
          { label: 'Validaciones recibidas', value: currentUser.validationsReceived, icon: <Users size={18} className="text-palette-wt-accent" /> },
          { label: 'Sellos de habilidad', value: allBadges.length, icon: <Star size={18} className="text-palette-button-primary" /> },
        ].map((s, i) => (
          <div key={i} className="card text-center">
            <div className="flex justify-center mb-1">{s.icon}</div>
            <div className="text-2xl font-black text-palette-text-primary">{s.value}</div>
            <div className="text-xs text-palette-text-small mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left col */}
        <div className="space-y-6 lg:col-span-1">
          {/* Score breakdown */}
          <div className="card">
            <h2 className="font-bold text-palette-text-primary mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-palette-button-primary" />
              Composición del score
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Evaluación de IA', pct: currentUser.scoreBreakdown.ai, color: 'bg-palette-text-primary' },
                { label: 'Validación entre pares', pct: currentUser.scoreBreakdown.peers, color: 'bg-palette-button-primary' },
                { label: 'Portafolio', pct: currentUser.scoreBreakdown.portfolio, color: 'bg-palette-wt-accent' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs text-palette-text-small mb-1">
                    <span>{item.label}</span>
                    <span className="font-semibold">{item.pct}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="card">
            <h2 className="font-bold text-palette-text-primary mb-4">Mis sellos de habilidad</h2>
            <div className="space-y-3">
              {allBadges.slice(0, 4).map((b, i) => (
                <SkillBadge key={b.id || i} skill={b.skill} level={b.level} icon={b.icon} source={b.source} />
              ))}
              {allBadges.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">
                  Completa un reto para ganar tu primer sello
                </p>
              )}
            </div>
            <Link to="/challenges" className="mt-4 text-sm text-palette-button-primary hover:text-palette-text-primary font-semibold flex items-center gap-1">
              Ganar más sellos <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Right col */}
        <div className="space-y-6 lg:col-span-2">
          {/* Completed challenges */}
          {completedChallenges.length > 0 && (
            <div className="card">
              <h2 className="font-bold text-palette-text-primary mb-4">Retos completados recientemente</h2>
              <div className="space-y-3">
                {completedChallenges.map((c, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-palette-fonto-light rounded-xl border border-palette-button-primary">
                    <CheckCircle size={20} className="text-palette-wt-accent flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-palette-text-primary text-sm truncate">{c.title}</p>
                      <p className="text-xs text-palette-text-small">{c.company} · Puntaje: {c.result?.score ?? '—'}/100</p>
                    </div>
                    <span className="text-palette-button-primary font-bold text-sm flex-shrink-0">+{c.points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended challenges */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-palette-text-primary">Retos recomendados para ti</h2>
              <Link to="/challenges" className="text-sm text-palette-button-primary hover:text-palette-text-primary font-semibold flex items-center gap-1">
                Ver todos <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {CHALLENGES.slice(0, 2).map(c => (
                <ChallengeCard key={c.id} challenge={c} />
              ))}
            </div>
          </div>

          {/* Bio / about */}
          <div className="card">
            <h2 className="font-bold text-palette-text-primary mb-3">Sobre mí</h2>
            <p className="text-sm text-palette-text-small leading-relaxed">{currentUser.bio}</p>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-palette-text-primary mb-3">Proyectos en portafolio</h3>
              <div className="space-y-3">
                {currentUser.projects.map(p => (
                  <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-semibold text-sm text-palette-text-primary">{p.title}</p>
                    <p className="text-xs text-palette-text-small mt-1 line-clamp-2">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.tags.map(t => (
                        <span key={t} className="text-xs bg-palette-fonto-light text-palette-text-primary px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
