export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-forest-deep)' }}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-2.5 h-2.5 rotate-45 animate-pulse"
          style={{ backgroundColor: 'var(--color-ochre)' }}
        />
        <p
          className="text-[0.65rem] tracking-[0.22em] uppercase"
          style={{ color: 'var(--color-ochre-light)', fontFamily: 'var(--font-body)' }}
        >
          Loading
        </p>
      </div>
    </div>
  )
}
