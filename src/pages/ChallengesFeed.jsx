import { useState } from 'react'
import { CHALLENGES } from '../data/mockData'
import ChallengeCard from '../components/ChallengeCard'
import { Filter, Search } from 'lucide-react'

const AREAS = ['Todos', 'Datos', 'Negocio', 'Diseño', 'Tecnología']
const DIFFICULTIES = ['Todos', 'Básico', 'Intermedio', 'Avanzado']

export default function ChallengesFeed() {
  const [area, setArea] = useState('Todos')
  const [difficulty, setDifficulty] = useState('Todos')
  const [search, setSearch] = useState('')

  const filtered = CHALLENGES.filter(c => {
    if (area !== 'Todos' && c.area !== area) return false
    if (difficulty !== 'Todos' && c.difficulty !== difficulty) return false
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.company.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 page-enter">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2">Retos de Empresas</h1>
        <p className="text-slate-500">Resuelve retos reales y suma puntos verificados a tu perfil de reputación.</p>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar retos o empresas..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm transition-all"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={16} className="text-slate-400 flex-shrink-0" />
            <div className="flex gap-1 flex-wrap">
              {AREAS.map(a => (
                <button
                  key={a}
                  onClick={() => setArea(a)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${area === a ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {a}
                </button>
              ))}
            </div>
            <div className="flex gap-1 flex-wrap ml-2">
              {DIFFICULTIES.map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${difficulty === d ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(c => (
            <ChallengeCard key={c.id} challenge={c} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400">
          <p className="text-5xl mb-4">🔍</p>
          <p className="font-semibold">No hay retos con esos filtros</p>
          <p className="text-sm mt-1">Prueba con otros criterios de búsqueda</p>
        </div>
      )}
    </div>
  )
}
