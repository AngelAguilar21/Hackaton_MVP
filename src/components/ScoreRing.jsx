import { useEffect, useState } from 'react'

const RADIUS = 76
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function scoreColor(score) {
  if (score >= 800) return '#7c3aed'
  if (score >= 600) return '#0ea5e9'
  return '#10b981'
}

function scoreLabel(score) {
  if (score >= 800) return 'Talento Destacado'
  if (score >= 600) return 'En Desarrollo'
  return 'Iniciando'
}

export default function ScoreRing({ score, size = 'md' }) {
  const [animated, setAnimated] = useState(0)

  const dimensions = { sm: 100, md: 180, lg: 220 }
  const dim = dimensions[size] ?? 180
  const strokeWidth = size === 'sm' ? 8 : 12
  const r = (dim / 2) - strokeWidth - 4
  const circ = 2 * Math.PI * r
  const offset = circ - (animated / 1000) * circ

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(score), 100)
    return () => clearTimeout(timeout)
  }, [score])

  const color = scoreColor(score)

  return (
    <div className="flex flex-col items-center gap-1">
      <div style={{ width: dim, height: dim }} className="relative">
        <svg width={dim} height={dim} className="drop-shadow-sm">
          <circle
            cx={dim / 2} cy={dim / 2} r={r}
            fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth}
          />
          <circle
            cx={dim / 2} cy={dim / 2} r={r}
            fill="none" stroke={color} strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)', transformOrigin: '50% 50%', transform: 'rotate(-90deg)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-bold leading-none"
            style={{ fontSize: size === 'sm' ? 20 : size === 'lg' ? 52 : 40, color }}
          >
            {score}
          </span>
          {size !== 'sm' && (
            <span className="text-xs text-slate-400 font-medium mt-1">/ 1000</span>
          )}
        </div>
      </div>
      {size !== 'sm' && (
        <span className="text-sm font-semibold" style={{ color }}>{scoreLabel(score)}</span>
      )}
    </div>
  )
}
