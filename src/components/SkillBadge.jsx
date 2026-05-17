const LEVEL_STYLES = {
  Explorador: 'bg-palette-fonto-light text-palette-text-primary border-palette-button-primary',
  Practicante: 'bg-white text-palette-button-primary border-palette-button-primary',
  Experto: 'bg-palette-text-primary text-white border-palette-text-primary',
}

const LEVEL_DOT = {
  Explorador: 'bg-palette-button-primary',
  Practicante: 'bg-palette-text-primary',
  Experto: 'bg-palette-fonto-light',
}

export default function SkillBadge({ skill, level, icon, source, size = 'md' }) {
  const styles = LEVEL_STYLES[level] || LEVEL_STYLES.Explorador
  const dot = LEVEL_DOT[level] || LEVEL_DOT.Explorador
  const showIcon = icon && typeof icon !== 'string'

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles}`}>
        {showIcon && <span>{icon}</span>}
        {skill}
      </span>
    )
  }

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border-2 ${styles} transition-all hover:shadow-md`}>
      <div className="w-8 h-8 rounded-xl bg-palette-fonto-light border border-palette-button-primary flex items-center justify-center text-xs font-bold text-palette-text-primary mt-0.5">
        {showIcon ? icon : skill.slice(0, 1).toUpperCase()}
      </div>
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
