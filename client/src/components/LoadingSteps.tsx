import { motion } from 'framer-motion'

type LoadingStepsProps = {
  messages: string[]
  currentIndex: number
}

export function LoadingSteps({ messages, currentIndex }: LoadingStepsProps) {
  return (
    <div className="space-y-3 rounded-[2.5rem] border border-border bg-card/90 p-6 shadow-cozy">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-primary">Cooking</p>
          <h3 className="text-2xl font-baloo text-text">Your recipe is simmering...</h3>
        </div>
        <div className="rounded-3xl bg-highlight px-4 py-3 text-sm text-text">Patience</div>
      </div>
      <div className="grid gap-3">
        {messages.map((message, index) => (
          <motion.div
            key={message}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: index <= currentIndex ? 1 : 0.35, x: 0 }}
            transition={{ duration: 0.4 }}
            className={`rounded-3xl border border-border bg-secondary/10 px-4 py-4 text-sm ${index === currentIndex ? 'bg-secondary/20 shadow-soft' : ''}`}
          >
            {message}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
