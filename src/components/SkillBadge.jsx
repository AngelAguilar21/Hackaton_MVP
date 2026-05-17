const LEVEL_STYLES = {
  Explorador: 'bg-sky-50 text-sky-700 border-sky-200',
  Practicante: 'bg-violet-50 text-violet-700 border-violet-200',
  Experto: 'bg-amber-50 text-amber-700 border-amber-200',
}

const LEVEL_DOT = {
  Explorador: 'bg-sky-400',
  Practicante: 'bg-violet-500',
  Experto: 'bg-amber-500',
}

export default function SkillBadge({ skill, level, icon, source, size = 'md' }) {
  const styles = LEVEL_STYLES[level] || LEVEL_STYLES.Explorador
  const dot = LEVEL_DOT[level] || LEVEL_DOT.Explorador

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles}`}>
        {icon && <span>{icon}</span>}
        {skill}
      </span>
    )
  }

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border-2 ${styles} transition-all hover:shadow-md`}>
      <div className="text-2xl mt-0.5">{icon || '🏅'}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-sm">{skill}</span>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-white/60 border ${styles}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
            {level}
          </span>
        </div>
        {source && <p className="text-xs mt-0.5 opacity-70 truncate">Verificado: {source}</p>}
      </div>
    </div>
  )
}
