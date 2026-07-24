type QuoteBadgeProps = {
  quote: string
}

export function QuoteBadge({ quote }: QuoteBadgeProps) {
  return (
    <div className="rounded-[2rem] border border-border bg-white/90 px-5 py-4 shadow-soft">
      <p className="text-sm text-text/80">“{quote}”</p>
    </div>
  )
}
