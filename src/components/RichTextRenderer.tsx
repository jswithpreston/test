import { RichText } from '@payloadcms/richtext-lexical/react'

interface RichTextRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any
  className?: string
}

export default function RichTextRenderer({ content, className }: RichTextRendererProps) {
  if (!content) return null

  return (
    <div className={`prose-lango ${className ?? ''}`}>
      <RichText data={content} />
    </div>
  )
}
