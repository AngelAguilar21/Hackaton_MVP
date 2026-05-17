import { Link } from 'react-router-dom'
import ScoreRing from './ScoreRing'
import SkillBadge from './SkillBadge'

export default function CandidateCard({ candidate }) {
  const { id, name, career, initials, avatarColor, score, badges } = candidate

  return (
    <div className="card hover:shadow-lg transition-all duration-200 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl ${avatarColor} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-palette-text-primary truncate">{name}</h3>
          <p className="text-xs text-palette-text-small truncate">{career}</p>
        </div>
        <ScoreRing score={score} size="sm" />
      </div>

      <div className="flex flex-wrap gap-2">
        {badges.slice(0, 2).map(b => (
          <SkillBadge key={b.id} skill={b.skill} level={b.level} icon={b.icon} size="sm" />
        ))}
        {badges.length > 2 && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-palette-fonto-light text-palette-text-primary border border-palette-button-primary">
            +{badges.length - 2} más
          </span>
        )}
      </div>

      <Link
        to={`/profile/${id}`}
        className="btn-secondary text-center text-sm py-2.5 block"
      >
        Ver perfil completo
      </Link>
    </div>
  )
}
