import { motion } from 'framer-motion'
import { X } from 'lucide-react'

type ChipProps = {
  label: string
  onRemove: () => void
}

export function Chip({ label, onRemove }: ChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-sm text-text shadow-cozy"
    >
      <span>{label}</span>
      <button type="button" onClick={onRemove} aria-label={`Remove ${label}`}>
        <X className="h-4 w-4 text-primary" />
      </button>
    </motion.div>
  )
}
