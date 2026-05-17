import { Link } from 'react-router-dom'
import { Clock, Users, Star } from 'lucide-react'

function daysLeft(deadline) {
  const diff = new Date(deadline) - new Date()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export default function ChallengeCard({ challenge }) {
  const { id, title, company, companyColor, area, difficulty, difficultyColor, points, deadline, participants } = challenge
  const days = daysLeft(deadline)

  return (
    <div className="card hover:shadow-md transition-all duration-200 flex flex-col gap-4 group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${companyColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
            {company[0]}
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">{company}</p>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${difficultyColor}`}>
              {difficulty}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-amber-500 font-bold text-sm flex-shrink-0">
          <Star size={14} fill="currentColor" />
          +{points} pts
        </div>
      </div>

      <h3 className="font-bold text-slate-800 leading-snug group-hover:text-violet-700 transition-colors">
        {title}
      </h3>

      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-lg font-medium text-slate-600">
          {area}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {days === 0 ? 'Último día' : `${days} días`}
        </span>
        <span className="flex items-center gap-1">
          <Users size={12} />
          {participants} participantes
        </span>
      </div>

      <Link
        to={`/challenges/${id}`}
        className="mt-auto btn-primary text-center text-sm py-2.5 block"
      >
        Ver reto y participar
      </Link>
    </div>
  )
}
