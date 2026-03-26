import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline-light'
type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bg-ochre text-cream border-ochre hover:bg-ochre-dark hover:border-ochre-dark active:scale-[0.98]',
  secondary:
    'bg-forest text-cream border-forest hover:bg-forest-light hover:border-forest-light active:scale-[0.98]',
  ghost:
    'bg-transparent text-forest border-forest/30 hover:bg-forest/8 hover:border-forest/60 active:scale-[0.98]',
  'outline-light':
    'bg-transparent text-cream border-cream/50 hover:bg-cream/10 hover:border-cream active:scale-[0.98]',
}

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  disabled,
}: ButtonProps) {
  const base = `
    inline-flex items-center gap-2 border
    font-body font-500 tracking-[0.06em] uppercase text-[0.8125rem]
    transition-all duration-200 cursor-pointer select-none
    ${VARIANT_STYLES[variant]}
    ${SIZE_STYLES[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
    ${className}
  `

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  )
}
