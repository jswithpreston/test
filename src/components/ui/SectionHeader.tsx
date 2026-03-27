interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
}: SectionHeaderProps) {
  const textAlign = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  const titleColor = light ? 'text-cream' : 'text-forest'
  const eyebrowColor = light ? 'text-ochre-light' : 'text-ochre'
  const subtitleColor = light ? 'text-cream/70' : 'text-stone'

  return (
    <div className={`flex flex-col gap-3 ${textAlign} ${className}`}>
      {eyebrow && (
        <span
          className={`
            font-body text-[0.6875rem] font-600 tracking-[0.14em] uppercase
            ${eyebrowColor}
          `}
        >
          {eyebrow}
        </span>
      )}

      {/* Ochre ornament */}
      <div className={`flex ${align === 'center' ? 'justify-center' : ''}`}>
        <span
          style={{ fontFamily: 'var(--font-display)' }}
          className={`text-4xl md:text-5xl font-600 leading-tight ${titleColor}`}
        >
          {title}
        </span>
      </div>

      {/* Accent line */}
      <div className={`flex ${align === 'center' ? 'justify-center' : ''}`}>
        <div className="flex items-center gap-1.5">
          <div className="h-px w-8 bg-ochre" />
          <div
            className="w-1.5 h-1.5 rotate-45 bg-ochre"
            style={{ flexShrink: 0 }}
          />
          <div className="h-px w-8 bg-ochre" />
        </div>
      </div>

      {subtitle && (
        <p className={`font-body text-base leading-relaxed max-w-2xl ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
