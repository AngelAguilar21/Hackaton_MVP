import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { CHALLENGES } from '../data/mockData'
import { useApp } from '../context/AppContext'
import SkillBadge from '../components/SkillBadge'
import { ArrowLeft, Send, Loader2, CheckCircle, Star, AlertCircle, Sparkles } from 'lucide-react'

const ANTHROPIC_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY

async function evaluateWithClaude(challenge, solution) {
  if (!ANTHROPIC_KEY) return getMockEvaluation(challenge, solution)

  try {
    const Anthropic = (await import('@anthropic-ai/sdk')).default
    const client = new Anthropic({ apiKey: ANTHROPIC_KEY, dangerouslyAllowBrowser: true })

    const prompt = `Eres un evaluador experto de habilidades profesionales para DameChamba, una plataforma de reputación profesional para jóvenes talentos latinoamericanos.

RETO: ${challenge.title}
EMPRESA: ${challenge.company}
DESCRIPCIÓN: ${challenge.description}

CRITERIOS DE EVALUACIÓN:
${challenge.criteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}

SOLUCIÓN DEL CANDIDATO:
${solution}

Evalúa esta solución de forma honesta y constructiva. El candidato es un estudiante o egresado reciente buscando su primera oportunidad laboral.

Responde EXACTAMENTE en este formato JSON (sin markdown, sin bloques de código):
{
  "score": <número 0-100>,
  "nivel": "<Explorador|Practicante|Experto>",
  "habilidadDemostrada": "<nombre de la habilidad principal demostrada>",
  "resumenEjecutivo": "<2-3 oraciones evaluando la solución globalmente>",
  "puntosFuertes": ["<punto 1>", "<punto 2>", "<punto 3>"],
  "areasMejora": ["<área 1>", "<área 2>"],
  "feedbackDetallado": "<3-4 párrafos de feedback constructivo y específico>",
  "icono": "<un emoji relevante a la habilidad demostrada>"
}`

    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })

    const text = message.content[0].text.trim()
    return JSON.parse(text)
  } catch (err) {
    console.warn('Claude API error, using mock:', err.message)
    return getMockEvaluation(challenge, solution)
  }
}

function getMockEvaluation(challenge, solution) {
  const wordCount = solution.trim().split(/\s+/).length
  const baseScore = Math.min(95, Math.max(55, 60 + Math.floor(wordCount / 5)))
  const level = baseScore >= 80 ? 'Practicante' : 'Explorador'

  return {
    score: baseScore,
    nivel: level,
    habilidadDemostrada: challenge.skillTag,
    resumenEjecutivo: `El candidato demuestra una comprensión sólida del problema planteado por ${challenge.company}. La solución propuesta refleja pensamiento analítico y capacidad para estructurar ideas complejas de forma clara. Se evidencia potencial para desarrollarse en el área de ${challenge.skillTag.toLowerCase()}.`,
    puntosFuertes: [
      'Estructura clara y coherente en la presentación de ideas',
      'Comprensión del contexto empresarial y del problema planteado',
      'Propuesta concreta con enfoque en resultados medibles',
    ],
    areasMejora: [
      'Profundizar en los aspectos cuantitativos y métricas específicas',
      'Incluir consideraciones de implementación y posibles obstáculos',
    ],
    feedbackDetallado: `Tu solución aborda el reto de ${challenge.company} con una perspectiva interesante y bien articulada. Demuestras capacidad para analizar el problema desde múltiples ángulos y proponer acciones concretas, lo cual es altamente valorado en entornos empresariales reales.\n\nUno de los aspectos más destacados es tu habilidad para contextualizar la solución dentro de las limitaciones y oportunidades del negocio. Esto demuestra madurez profesional que va más allá de lo teórico.\n\nPara llevar tu solución al siguiente nivel, te recomiendo incorporar datos cuantitativos que respalden tus propuestas. Los empleadores valoran especialmente las soluciones que pueden medirse y evaluarse con métricas claras.\n\nEn general, esta es una respuesta que refleja tus capacidades reales y te posiciona como un candidato competente. Continúa desarrollando tu portafolio con este nivel de profundidad.`,
    icono: '🎯',
  }
}

export default function ChallengeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const challenge = CHALLENGES.find(c => c.id === id)
  const { addCompletedChallenge } = useApp()

  const [solution, setSolution] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'evaluating' | 'done'
  const [result, setResult] = useState(null)
  const [badgeSaved, setBadgeSaved] = useState(false)

  if (!challenge) return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <p className="text-5xl mb-4 text-palette-button-primary">?</p>
      <h2 className="font-bold text-palette-text-primary text-xl mb-4">Reto no encontrado</h2>
      <Link to="/challenges" className="btn-primary inline-block">Ver todos los retos</Link>
    </div>
  )

  async function handleSubmit() {
    if (solution.trim().length < 50) return
    setStatus('evaluating')
    try {
      const evaluation = await evaluateWithClaude(challenge, solution)
      setResult(evaluation)
      setStatus('done')
    } catch {
      setStatus('idle')
    }
  }

  function handleSaveBadge() {
    const badge = {
      id: `badge-${Date.now()}`,
      skill: result.habilidadDemostrada,
      level: result.nivel,
      icon: result.icono || null,
      source: `Reto empresarial — ${challenge.company}`,
    }
    addCompletedChallenge(challenge, { ...result, badge })
    setBadgeSaved(true)
  }

  const scoreColor = result?.score >= 80 ? 'text-palette-wt-accent' : result?.score >= 60 ? 'text-palette-button-primary' : 'text-palette-button-primary'
  const scoreBg = result?.score >= 80 ? 'from-palette-fonto-light to-palette-fonto-light border-palette-wt-accent' : result?.score >= 60 ? 'from-palette-fonto-light to-palette-fonto-light border-palette-button-primary' : 'from-palette-fonto-light to-palette-fonto-light border-palette-button-primary'

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 page-enter">
      <Link to="/challenges" className="flex items-center gap-2 text-palette-text-small hover:text-palette-button-primary text-sm font-medium mb-6 transition-colors w-fit">
        <ArrowLeft size={16} /> Volver a retos
      </Link>

      {/* Challenge header */}
      <div className="card mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 ${challenge.companyColor} rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0`}>
            {challenge.company[0]}
          </div>
          <div>
            <p className="text-sm font-semibold text-white/80">{challenge.company} · {challenge.area}</p>
            <h1 className="text-xl font-black text-white leading-snug">{challenge.title}</h1>
          </div>
          <div className="ml-auto flex items-center gap-1 text-palette-button-primary font-bold text-sm flex-shrink-0">
            <Star size={14} fill="currentColor" />
            +{challenge.points} pts
          </div>
        </div>

        <div className="prose prose-sm max-w-none">
          {challenge.description.split('\n').filter(Boolean).map((para, i) => (
            <p key={i} className="text-palette-text-small leading-relaxed mb-3">{para}</p>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-palette-text-primary mb-3">Criterios de evaluación:</h3>
          <ul className="space-y-1.5">
            {challenge.criteria.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-palette-text-small">
                <CheckCircle size={14} className="text-palette-wt-accent mt-0.5 flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Submission area */}
      {status !== 'done' && (
        <div className="card mb-6">
          <h2 className="font-bold text-palette-text-primary mb-1">Tu solución</h2>
          <p className="text-sm text-palette-text-small mb-4">
            Escribe tu propuesta de solución al reto. La IA la evaluará según los criterios de {challenge.company}.
          </p>

          {!ANTHROPIC_KEY && (
            <div className="flex items-start gap-3 p-3 bg-palette-fonto-light border border-palette-button-primary rounded-xl mb-4 text-xs text-palette-text-primary">
              <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
              <span>
                <strong>Modo demo:</strong> No se detectó VITE_ANTHROPIC_API_KEY. La evaluación usará una respuesta simulada. Para activar la IA real, crea un archivo <code>.env</code> con tu API key de Anthropic.
              </span>
            </div>
          )}

          <textarea
            value={solution}
            onChange={e => setSolution(e.target.value)}
            placeholder="Describe tu propuesta de solución aquí. Incluye tu análisis del problema, las acciones concretas que recomendarías y cómo medirías el éxito..."
            rows={10}
            className="w-full p-4 rounded-xl border border-slate-200 focus:border-palette-button-primary focus:ring-2 focus:ring-palette-fonto-light outline-none text-sm leading-relaxed resize-none transition-all"
          />
          <div className="flex items-center justify-between mt-3">
            <span className={`text-xs ${solution.length < 50 ? 'text-palette-text-small' : 'text-palette-wt-accent'}`}>
              {solution.trim().split(/\s+/).filter(Boolean).length} palabras {solution.length < 50 && '(mínimo ~50 palabras)'}
            </span>
            <button
              onClick={handleSubmit}
              disabled={solution.trim().length < 50 || status === 'evaluating'}
              className="flex items-center gap-2 bg-palette-button-primary hover:opacity-90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm shadow-md hover:shadow-lg"
            >
              {status === 'evaluating' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Evaluando con IA...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Evaluar con IA
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {status === 'evaluating' && (
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-palette-fonto-light rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <Sparkles size={28} className="text-palette-button-primary" />
          </div>
          <h3 className="font-bold text-palette-text-primary mb-2">Analizando tu solución...</h3>
          <p className="text-sm text-palette-text-small">La IA está evaluando tu respuesta según los criterios de {challenge.company}.</p>
          <div className="mt-6 flex justify-center gap-1">
            {[0,1,2].map(i => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-palette-button-primary animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {status === 'done' && result && (
        <div className="space-y-5 page-enter">
          {/* Score banner */}
          <div className={`card bg-gradient-to-br ${scoreBg} border-2`}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm font-semibold text-palette-text-small mb-1">Resultado de tu evaluación</p>
                <h2 className="font-black text-palette-text-primary text-xl">{challenge.title}</h2>
                <p className="text-sm text-palette-text-small mt-1">{challenge.company}</p>
              </div>
              <div className="text-center">
                <div className={`text-6xl font-black ${scoreColor}`}>{result.score}</div>
                <div className="text-xs text-palette-text-small font-medium">/ 100 puntos</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm text-palette-text-primary leading-relaxed italic">\"{result.resumenEjecutivo}\"</p>
            </div>
          </div>

          {/* New badge */}
          <div className="card border-2 border-palette-button-primary bg-palette-fonto-light">
            <div className="flex items-center gap-2 mb-4">
              <Star size={18} className="text-palette-button-primary" fill="currentColor" />
              <h3 className="font-bold text-palette-text-primary">¡Sello de habilidad generado!</h3>
            </div>
            <SkillBadge
              skill={result.habilidadDemostrada}
              level={result.nivel}
              icon={result.icono || null}
              source={`Reto empresarial — ${challenge.company}`}
            />
            {!badgeSaved ? (
              <button
                onClick={handleSaveBadge}
                className="mt-4 bg-palette-button-primary hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl w-full flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <CheckCircle size={16} />
                Agregar sello a mi perfil
              </button>
            ) : (
              <div className="mt-4 flex items-center gap-2 text-palette-wt-accent font-semibold text-sm justify-center p-3 bg-palette-fonto-light rounded-xl border border-palette-button-primary">
                <CheckCircle size={16} />
                ¡Sello agregado a tu perfil! +{challenge.points} puntos
              </div>
            )}
          </div>

          {/* Detailed feedback */}
          <div className="card">
            <h3 className="font-bold text-palette-text-primary mb-4">Feedback detallado de la IA</h3>
            <div className="space-y-3 text-sm text-palette-text-small leading-relaxed">
              {result.feedbackDetallado.split('\n').filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Strengths & improvements */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card border-l-4 border-palette-wt-accent">
              <h4 className="font-bold text-palette-text-primary mb-3 flex items-center gap-2">
                <CheckCircle size={16} className="text-palette-wt-accent" />
                Puntos fuertes
              </h4>
              <ul className="space-y-2">
                {result.puntosFuertes.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-palette-text-small">
                    <span className="text-palette-wt-accent font-bold flex-shrink-0">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card border-l-4 border-palette-button-primary">
              <h4 className="font-bold text-palette-text-primary mb-3 flex items-center gap-2">
                <AlertCircle size={16} className="text-palette-button-primary" />
                Áreas de mejora
              </h4>
              <ul className="space-y-2">
                {result.areasMejora.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-palette-text-small">
                    <span className="text-palette-button-primary font-bold flex-shrink-0">→</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link to="/challenges" className="bg-slate-100 hover:bg-slate-200 text-palette-text-primary font-semibold px-6 py-3 rounded-xl flex-1 text-center transition-all">
              Ver más retos
            </Link>
            <Link to="/dashboard" className="bg-palette-button-primary hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl flex-1 text-center transition-all shadow-md">
              Ver mi perfil actualizado
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
