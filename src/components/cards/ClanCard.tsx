import type { Clan } from '@/lib/types'
import { DISTRICT_LABELS } from '@/lib/types'

interface ClanCardProps {
  clan: Clan
}

export default function ClanCard({ clan }: ClanCardProps) {
  const districtLabel = clan.district
    ? DISTRICT_LABELS[clan.district] ?? clan.district
    : null

  return (
    <div
      className="group flex flex-col gap-3 p-5 bg-white transition-all duration-200 hover:shadow-md cursor-default"
      style={{ border: '1px solid var(--color-sand)' }}
    >
      {/* Clan name */}
      <div className="flex items-start justify-between gap-2">
        <h3
          className="text-lg font-600 leading-snug"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forest)' }}
        >
          {clan.name}
        </h3>
        {/* Ochre diamond accent */}
        <span
          className="text-[0.55rem] mt-1.5 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--color-ochre)' }}
        >
          ◆
        </span>
      </div>

      {/* Meta row */}
      <div className="flex flex-col gap-1.5">
        {clan.symbol && (
          <div className="flex items-center gap-2">
            <span
              className="text-[0.6rem] tracking-[0.14em] uppercase w-14 flex-shrink-0"
              style={{ color: 'var(--color-ochre-dark)' }}
            >
              Symbol
            </span>
            <span
              className="text-sm capitalize"
              style={{ color: 'var(--color-charcoal)' }}
            >
              {clan.symbol}
            </span>
          </div>
        )}
        {districtLabel && (
          <div className="flex items-center gap-2">
            <span
              className="text-[0.6rem] tracking-[0.14em] uppercase w-14 flex-shrink-0"
              style={{ color: 'var(--color-ochre-dark)' }}
            >
              District
            </span>
            <span
              className="text-sm"
              style={{ color: 'var(--color-charcoal)' }}
            >
              {districtLabel}
            </span>
          </div>
        )}
        {clan.clanLeader && (
          <div className="flex items-center gap-2">
            <span
              className="text-[0.6rem] tracking-[0.14em] uppercase w-14 flex-shrink-0"
              style={{ color: 'var(--color-ochre-dark)' }}
            >
              Awitong
            </span>
            <span
              className="text-sm"
              style={{ color: 'var(--color-charcoal)' }}
            >
              {clan.clanLeader}
            </span>
          </div>
        )}
      </div>

      {clan.origin && (
        <p
          className="text-xs leading-relaxed line-clamp-2 mt-1 pt-3"
          style={{
            color: 'var(--color-stone)',
            borderTop: '1px solid var(--color-mist)',
          }}
        >
          {clan.origin}
        </p>
      )}
    </div>
  )
}
