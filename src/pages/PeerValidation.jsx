import { useState } from 'react'
import { VALIDATION_QUEUE } from '../data/mockData'
import { useApp } from '../context/AppContext'
import { CheckCircle, Star, Users, MessageSquare, ChevronRight, Award } from 'lucide-react'

const CRITERIA_OPTIONS = [
  'Claridad en la presentación',
  'Profundidad técnica',
  'Creatividad e innovación',
  'Aplicación práctica',
  'Calidad de la documentación',
  'Resolución de problemas',
]

export default function PeerValidation() {
  const { currentUser, addPeerValidation, peerValidations } = useApp()
  const [selected, setSelected] = useState(null)
  const [criteriaChecked, setCriteriaChecked] = useState([])
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(new Set())
  const [done, setDone] = useState(null)

  function toggleCriteria(c) {
    setCriteriaChecked(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  }

  function handleSubmit() {
    if (!selected || criteriaChecked.length === 0 || comment.trim().length < 20) return
    const validation = {
      id: Date.now(),
      targetCandidate: selected.candidate.name,
      projectTitle: selected.project.title,
      criteria: criteriaChecked,
      comment,
      validator: currentUser.name,
      timestamp: new Date().toISOString(),
    }
    addPeerValidation(validation)
    setSubmitted(prev => new Set([...prev, selected.id]))
    setDone(selected.candidate.name)
    setSelected(null)
    setCriteriaChecked([])
    setComment('')
  }

  const queue = VALIDATION_QUEUE.filter(v => !submitted.has(v.id))

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 page-enter">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 mb-2">Validación entre pares</h1>
        <p className="text-slate-500">Revisa proyectos de otros candidatos y avala sus habilidades. Tu validación suma a la reputación de la comunidad.</p>
      </div>

      {done && (
        <div className="card bg-emerald-50 border-2 border-emerald-200 mb-6 flex items-center gap-4">
          <CheckCircle size={24} className="text-emerald-500 flex-shrink-0" />
          <div>
            <p className="font-bold text-emerald-800">¡Validación enviada exitosamente!</p>
            <p className="text-sm text-emerald-600">Tu aval a {done} ya es parte de su perfil de reputación.</p>
          </div>
        </div>
      )}

      {/* My given validations */}
      {peerValidations.length > 0 && (
        <div className="card mb-6">
          <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Award size={18} className="text-violet-500" />
            Validaciones que has dado ({peerValidations.length})
          </h2>
          <div className="space-y-2">
            {peerValidations.map((v, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-violet-50 rounded-xl border border-violet-100">
                <CheckCircle size={16} className="text-violet-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{v.projectTitle}</p>
                  <p className="text-xs text-slate-500">Avalado a {v.targetCandidate}</p>
                </div>
                <div className="flex gap-1 flex-wrap justify-end">
                  {v.criteria.slice(0, 2).map(c => (
                    <span key={c} className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Queue */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-bold text-slate-700 flex items-center gap-2">
            <Users size={18} className="text-sky-500" />
            Proyectos esperando validación ({queue.length})
          </h2>

          {queue.map(item => (
            <button
              key={item.id}
              onClick={() => { setSelected(item); setCriteriaChecked([]); setComment('') }}
              className={`w-full text-left card hover:shadow-md transition-all duration-200 border-2 ${selected?.id === item.id ? 'border-violet-400 bg-violet-50' : 'border-transparent'}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${item.candidate.avatarColor} rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {item.candidate.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-sm truncate">{item.candidate.name}</p>
                  <p className="text-xs text-slate-500 truncate">{item.candidate.career}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Star size={11} />
                  {item.candidate.score}
                </div>
                <ChevronRight size={16} className={`text-slate-300 transition-colors ${selected?.id === item.id ? 'text-violet-500' : ''}`} />
              </div>
              <h3 className="font-semibold text-slate-700 text-sm line-clamp-2">{item.project.title}</h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.skills.slice(0, 2).map(s => (
                  <span key={s} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
            </button>
          ))}

          {queue.length === 0 && (
            <div className="card text-center py-10 text-slate-400">
              <p className="text-4xl mb-3">✅</p>
              <p className="font-semibold">¡Has validado todos los proyectos!</p>
              <p className="text-sm mt-1">Vuelve más tarde para nuevas solicitudes.</p>
            </div>
          )}
        </div>

        {/* Validation form */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="card space-y-5">
              {/* Project details */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 ${selected.candidate.avatarColor} rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0`}>
                    {selected.candidate.initials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{selected.candidate.name}</p>
                    <p className="text-xs text-slate-500">{selected.candidate.career}</p>
                  </div>
                </div>
                <h2 className="text-lg font-black text-slate-800 mb-3">{selected.project.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{selected.project.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {selected.project.tags.map(t => (
                    <span key={t} className="text-xs bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full font-medium">{t}</span>
                  ))}
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Criteria */}
              <div>
                <h3 className="font-bold text-slate-700 mb-3 text-sm">¿Qué habilidades demostró? (selecciona al menos 1)</h3>
                <div className="grid grid-cols-2 gap-2">
                  {CRITERIA_OPTIONS.map(c => (
                    <button
                      key={c}
                      onClick={() => toggleCriteria(c)}
                      className={`text-left px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                        criteriaChecked.includes(c)
                          ? 'bg-violet-50 border-violet-400 text-violet-700'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {criteriaChecked.includes(c) && <span className="mr-1">✓</span>}
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <h3 className="font-bold text-slate-700 mb-2 text-sm flex items-center gap-2">
                  <MessageSquare size={14} />
                  Feedback específico para el candidato
                </h3>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Escribe un feedback específico y constructivo. ¿Qué te pareció destacable? ¿Qué podría mejorar?"
                  rows={4}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm resize-none transition-all"
                />
                <p className={`text-xs mt-1 ${comment.trim().length < 20 ? 'text-slate-400' : 'text-emerald-600'}`}>
                  {comment.trim().length}/20 caracteres mínimo
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={criteriaChecked.length === 0 || comment.trim().length < 20}
                className="w-full btn-primary disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} />
                Enviar aval y feedback
              </button>
            </div>
          ) : (
            <div className="card h-full flex flex-col items-center justify-center text-center py-16 text-slate-400">
              <Users size={40} className="mb-4 text-slate-300" />
              <p className="font-semibold">Selecciona un proyecto</p>
              <p className="text-sm mt-1">Elige un proyecto de la lista para revisarlo y dejar tu aval.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
