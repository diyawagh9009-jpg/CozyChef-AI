import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

type MascotProps = {
  state: 'idle' | 'loading' | 'cooking' | 'completed'
}

const states = {
  idle: { filter: 'brightness(1)', rotate: 0 },
  loading: { filter: 'brightness(1.05)', rotate: 2 },
  cooking: { filter: 'brightness(1.1)', rotate: -2 },
  completed: { filter: 'brightness(1.08)', rotate: 0 }
}

export function Mascot({ state }: MascotProps) {
  return (
    <motion.div
      animate={states[state]}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="relative flex h-52 w-52 items-center justify-center"
    >
      <motion.div
        animate={{ y: ['0%', '-6%', '0%'] }}
        transition={{ duration: 3.5, ease: 'easeInOut', repeat: Infinity }}
        className="absolute inset-0"
      >
        <div className="absolute left-2 top-10 h-8 w-8 rounded-full bg-secondary/70 blur-xl" />
        <div className="absolute right-6 top-14 h-6 w-6 rounded-full bg-accent/70 blur-xl" />
      </motion.div>
      <div className="relative flex h-44 w-44 flex-col items-center justify-center rounded-[2.5rem] border border-border bg-card shadow-soft">
        <div className="absolute -top-3 flex h-10 w-24 items-end justify-center rounded-full bg-white/90 p-1 shadow-soft">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div className="ml-1 h-2 w-2 rounded-full bg-primary" />
          <div className="ml-1 h-2 w-2 rounded-full bg-primary" />
        </div>
        <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-4xl">
          🍥
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-text">
          <span className="inline-block h-3 w-3 rounded-full bg-primary animate-pulse" />
          <span>Cozy Dumpling</span>
        </div>
        <div className="mt-3 flex h-10 w-24 items-center justify-center rounded-full bg-accent/80 text-sm text-text">{state === 'loading' ? 'Stirring...' : state === 'cooking' ? 'Mixing' : state === 'completed' ? 'Sparkling!' : 'Hello!'}</div>
      </div>
      {state === 'completed' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-0 right-0 flex items-center gap-1"
        >
          <Sparkles className="h-5 w-5 text-highlight" />
          <span className="text-xs text-text">Yay!</span>
        </motion.div>
      )}
    </motion.div>
  )
}
