import { useState } from 'react'
import { CANDIDATES, CHALLENGES } from '../data/mockData'
import CandidateCard from '../components/CandidateCard'
import { Search, Filter, Plus, X, CheckCircle, TrendingUp, Users, Briefcase, Star } from 'lucide-react'

const SKILLS = ['Todas', 'Análisis de Datos', 'Diseño UX', 'Estrategia de Negocio', 'Gestión de Proyectos', 'Marketing Digital']
const CAREERS = ['Todas', 'Ingeniería de Sistemas', 'Administración de Empresas', 'Diseño UX', 'Ingeniería Industrial']

export default function EmployerDashboard() {
  const [search, setSearch] = useState('')
  const [skill, setSkill] = useState('Todas')
  const [minScore, setMinScore] = useState(0)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [publishedChallenge, setPublishedChallenge] = useState(false)
  const [newChallenge, setNewChallenge] = useState({ title: '', area: '', description: '' })

  const filtered = CANDIDATES.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.career.toLowerCase().includes(search.toLowerCase())) return false
    if (skill !== 'Todas' && !c.badges.some(b => b.skill === skill)) return false
    if (c.score < minScore) return false
    return true
  }).sort((a, b) => b.score - a.score)

  function handlePublish(e) {
    e.preventDefault()
    setPublishedChallenge(true)
    setShowPublishModal(false)
    setNewChallenge({ title: '', area: '', description: '' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 page-enter">
      {/* Header */}
      <div className="card mb-6 bg-gradient-to-r from-sky-600 to-blue-700 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-black text-xl">
                B
              </div>
              <div>
                <h1 className="text-xl font-black">BCP — Panel de Empleador</h1>
                <p className="text-sky-200 text-sm">Recursos Humanos</p>
              </div>
            </div>
            <p className="text-sky-100 text-sm">Descubre talento joven verificado y publica retos de reclutamiento.</p>
          </div>
          <button
            onClick={() => setShowPublishModal(true)}
            className="flex items-center gap-2 bg-white text-sky-700 hover:bg-sky-50 font-bold px-5 py-3 rounded-xl transition-all shadow-md text-sm flex-shrink-0"
          >
            <Plus size={16} />
            Publicar nuevo reto
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-sky-500">
          {[
            { label: 'Candidatos en plataforma', value: CANDIDATES.length + 2400, icon: <Users size={18} /> },
            { label: 'Retos publicados', value: publishedChallenge ? 4 : 3, icon: <Briefcase size={18} /> },
            { label: 'Score promedio del pool', value: '782', icon: <TrendingUp size={18} /> },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center mb-1 text-sky-300">{s.icon}</div>
              <div className="text-2xl font-black">{typeof s.value === 'number' ? s.value.toLocaleString() : s.value}</div>
              <div className="text-xs text-sky-200 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {publishedChallenge && (
        <div className="card bg-emerald-50 border-2 border-emerald-200 mb-6 flex items-center gap-4">
          <CheckCircle size={24} className="text-emerald-500 flex-shrink-0" />
          <div>
            <p className="font-bold text-emerald-800">¡Reto publicado exitosamente!</p>
            <p className="text-sm text-emerald-600">Los candidatos ya pueden ver y participar en tu reto. Te notificaremos cuando alguien entregue su solución.</p>
          </div>
        </div>
      )}

      {/* Mis retos */}
      <div className="card mb-6">
        <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Briefcase size={18} className="text-sky-500" />
          Mis retos publicados
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-100">
                <th className="pb-3 pr-4 font-semibold">Reto</th>
                <th className="pb-3 pr-4 font-semibold">Área</th>
                <th className="pb-3 pr-4 font-semibold">Participantes</th>
                <th className="pb-3 pr-4 font-semibold">Vence</th>
                <th className="pb-3 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {CHALLENGES.filter(c => c.company === 'BCP').map(c => (
                <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 pr-4 font-medium text-slate-800">{c.title}</td>
                  <td className="py-3 pr-4 text-slate-500">{c.area}</td>
                  <td className="py-3 pr-4">
                    <span className="flex items-center gap-1 text-slate-600">
                      <Users size={12} />
                      {c.participants}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-slate-500">{c.deadline}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Activo
                    </span>
                  </td>
                </tr>
              ))}
              {publishedChallenge && (
                <tr className="border-b border-slate-50">
                  <td className="py-3 pr-4 font-medium text-slate-800">{newChallenge.title || 'Mi nuevo reto'}</td>
                  <td className="py-3 pr-4 text-slate-500">{newChallenge.area || 'General'}</td>
                  <td className="py-3 pr-4"><span className="flex items-center gap-1 text-slate-600"><Users size={12} />0</span></td>
                  <td className="py-3 pr-4 text-slate-500">2026-06-15</td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Activo
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Search candidates */}
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-800 mb-4">Buscar candidatos verificados</h2>

        <div className="card mb-5">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o carrera..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none text-sm transition-all"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={16} className="text-slate-400 flex-shrink-0" />
              <select
                value={skill}
                onChange={e => setSkill(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-400 outline-none text-sm text-slate-600 bg-white"
              >
                {SKILLS.map(s => <option key={s}>{s}</option>)}
              </select>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 whitespace-nowrap">Score mínimo:</span>
                <input
                  type="range" min="0" max="900" step="50" value={minScore}
                  onChange={e => setMinScore(Number(e.target.value))}
                  className="w-24 accent-sky-600"
                />
                <span className="text-sm font-bold text-slate-700 w-10">{minScore}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-4">{filtered.length} candidatos encontrados · ordenados por score</p>

        {/* Ranking table view */}
        <div className="card mb-5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-slate-500 text-xs">
                  <th className="px-4 py-3 font-semibold">#</th>
                  <th className="px-4 py-3 font-semibold">Candidato</th>
                  <th className="px-4 py-3 font-semibold">Carrera</th>
                  <th className="px-4 py-3 font-semibold">
                    <span className="flex items-center gap-1"><Star size={11} /> Score</span>
                  </th>
                  <th className="px-4 py-3 font-semibold">Top habilidad</th>
                  <th className="px-4 py-3 font-semibold">Retos</th>
                  <th className="px-4 py-3 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.id} className="border-t border-slate-100 hover:bg-violet-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`font-black text-lg ${i === 0 ? 'text-amber-500' : i === 1 ? 'text-slate-400' : i === 2 ? 'text-orange-400' : 'text-slate-300'}`}>
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${c.avatarColor} rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                          {c.initials}
                        </div>
                        <span className="font-semibold text-slate-800">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{c.career.split('—')[0].trim()}</td>
                    <td className="px-4 py-3">
                      <span className="font-black text-violet-600">{c.score}</span>
                    </td>
                    <td className="px-4 py-3">
                      {c.badges[0] && (
                        <span className="inline-flex items-center gap-1 text-xs bg-violet-50 text-violet-700 border border-violet-200 px-2 py-0.5 rounded-full">
                          {c.badges[0].icon} {c.badges[0].skill}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-500">{c.challengesCompleted}</td>
                    <td className="px-4 py-3">
                      <a href={`/profile/${c.id}`} className="text-xs font-semibold text-violet-600 hover:text-violet-800 transition-colors whitespace-nowrap">
                        Ver perfil →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map(c => (
            <CandidateCard key={c.id} candidate={c} />
          ))}
        </div>
      </div>

      {/* Publish challenge modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-slate-800">Publicar nuevo reto</h2>
              <button onClick={() => setShowPublishModal(false)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handlePublish} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Título del reto</label>
                <input
                  required
                  value={newChallenge.title}
                  onChange={e => setNewChallenge(p => ({ ...p, title: e.target.value }))}
                  placeholder="ej. Análisis de comportamiento de usuarios..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Área</label>
                <select
                  value={newChallenge.area}
                  onChange={e => setNewChallenge(p => ({ ...p, area: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-400 outline-none text-sm bg-white"
                >
                  <option value="">Selecciona un área...</option>
                  {['Datos', 'Negocio', 'Diseño', 'Tecnología', 'Marketing'].map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Descripción del reto</label>
                <textarea
                  required
                  rows={4}
                  value={newChallenge.description}
                  onChange={e => setNewChallenge(p => ({ ...p, description: e.target.value }))}
                  placeholder="Describe el problema, el contexto empresarial y lo que esperas como entregable..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm resize-none transition-all"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowPublishModal(false)} className="btn-secondary flex-1">
                  Cancelar
                </button>
                <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <Plus size={16} />
                  Publicar reto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
