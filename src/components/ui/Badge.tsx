import type { ActivityStatus, PostCategory, ProgrammeCategory } from '@/lib/types'

const POST_CATEGORY_STYLES: Record<PostCategory, string> = {
  announcement:       'bg-ochre/10 text-ochre-dark border-ochre/25',
  'event-report':     'bg-forest/10 text-forest border-forest/25',
  'programme-update': 'bg-forest-light/10 text-forest-light border-forest-light/25',
  'press-release':    'bg-bark/10 text-bark border-bark/25',
  'cultural-heritage':'bg-ochre-dark/10 text-ochre-dark border-ochre-dark/25',
  community:          'bg-stone/10 text-stone border-stone/25',
}

const POST_CATEGORY_LABELS: Record<PostCategory, string> = {
  announcement:       'Announcement',
  'event-report':     'Event Report',
  'programme-update': 'Programme Update',
  'press-release':    'Press Release',
  'cultural-heritage':'Cultural Heritage',
  community:          'Community',
}

const ACTIVITY_STATUS_STYLES: Record<ActivityStatus, string> = {
  upcoming:  'bg-ochre/10 text-ochre-dark border-ochre/30',
  ongoing:   'bg-forest/10 text-forest-light border-forest/30',
  completed: 'bg-stone/10 text-stone border-stone/25',
  cancelled: 'bg-bark/10 text-bark-light border-bark/25',
}

const ACTIVITY_STATUS_LABELS: Record<ActivityStatus, string> = {
  upcoming:  'Upcoming',
  ongoing:   'Ongoing',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

const PROGRAMME_CATEGORY_STYLES: Record<ProgrammeCategory, string> = {
  education:   'bg-forest/10 text-forest border-forest/25',
  environment: 'bg-forest-light/10 text-forest-light border-forest-light/25',
  health:      'bg-ochre/10 text-ochre-dark border-ochre/25',
  peace:       'bg-bark/10 text-bark border-bark/25',
  women:       'bg-ochre-dark/10 text-ochre-dark border-ochre-dark/25',
  cultural:    'bg-bark-light/10 text-bark border-bark-light/25',
  youth:       'bg-forest-muted/10 text-forest-muted border-forest-muted/25',
  investment:  'bg-stone/10 text-stone border-stone/25',
}

const PROGRAMME_CATEGORY_LABELS: Record<ProgrammeCategory, string> = {
  education:   'Education',
  environment: 'Environment',
  health:      'Health',
  peace:       'Peace',
  women:       'Women',
  cultural:    'Cultural',
  youth:       'Youth',
  investment:  'Investment',
}

interface BadgeProps {
  /** Post category */
  category?: PostCategory
  /** Activity status */
  status?: ActivityStatus
  /** Programme category */
  programme?: ProgrammeCategory
  /** Raw label + custom styles */
  label?: string
  className?: string
}

export default function Badge({ category, status, programme, label, className = '' }: BadgeProps) {
  let text = label ?? ''
  let styles = 'bg-sand/50 text-stone border-sand'

  if (category) {
    text = POST_CATEGORY_LABELS[category]
    styles = POST_CATEGORY_STYLES[category]
  } else if (status) {
    text = ACTIVITY_STATUS_LABELS[status]
    styles = ACTIVITY_STATUS_STYLES[status]
  } else if (programme) {
    text = PROGRAMME_CATEGORY_LABELS[programme]
    styles = PROGRAMME_CATEGORY_STYLES[programme]
  }

  return (
    <span
      className={`
        inline-block border px-2.5 py-0.5
        text-[0.6875rem] font-body font-500 tracking-[0.07em] uppercase
        rounded-sm whitespace-nowrap
        ${styles} ${className}
      `}
    >
      {text}
    </span>
  )
}
