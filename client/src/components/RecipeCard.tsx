import { motion } from 'framer-motion'
import { Heart, Repeat, ClipboardCopy } from 'lucide-react'
import { Recipe } from '../types'

type RecipeCardProps = {
  recipe: Recipe
  onRegenerate: () => void
  onCopy: () => void
  onSave: () => void
}

export function RecipeCard({ recipe, onRegenerate, onCopy, onSave }: RecipeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2.75rem] border border-border bg-card p-6 shadow-cozy"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-sm uppercase tracking-[0.2em] text-primary">Cozy Recipe</p>
          <h2 className="text-3xl font-baloo leading-snug text-text">{recipe.name}</h2>
        </div>
        <div className="rounded-3xl bg-highlight px-4 py-3 text-xs font-semibold text-text">✨ {recipe.difficulty}</div>
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-3xl bg-secondary/80 p-4 text-sm text-text">⏱️ {recipe.time}</div>
        <div className="rounded-3xl bg-accent/80 p-4 text-sm text-text">🔥 {recipe.calories}</div>
        <div className="rounded-3xl bg-highlight/80 p-4 text-sm text-text">🍓 {recipe.ingredients.length} items</div>
      </div>

      <div className="space-y-4">
        <section className="rounded-3xl bg-background/90 p-5">
          <h3 className="mb-3 text-lg font-semibold text-text">Ingredients</h3>
          <ul className="grid gap-2 text-sm text-text/90 sm:grid-cols-2">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient} className="rounded-2xl bg-white px-3 py-2 shadow-soft">{ingredient}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl bg-background/90 p-5">
          <h3 className="mb-3 text-lg font-semibold text-text">Steps</h3>
          <ol className="space-y-3 text-sm text-text/90">
            {recipe.steps.map((step, index) => (
              <li key={step} className="rounded-2xl bg-white px-4 py-3 shadow-soft">{`${index + 1}. ${step}`}</li>
            ))}
          </ol>
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-secondary/90 p-5 text-sm text-text/90">
            <h4 className="mb-2 font-semibold text-text">Chef Tips</h4>
            <ul className="space-y-2">
              {recipe.tips.map((tip) => (
                <li key={tip} className="rounded-2xl bg-white px-3 py-2 shadow-soft">{tip}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-accent/90 p-5 text-sm text-text/90">
            <h4 className="mb-2 font-semibold text-text">Healthy Alternative</h4>
            <p>{recipe.alternative}</p>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-highlight/90 p-5 text-sm text-text/90">
            <h4 className="mb-2 font-semibold text-text">Fun Fact</h4>
            <p>{recipe.funFact}</p>
          </div>
          <div className="rounded-3xl bg-white/95 p-5 text-sm text-text/90 shadow-soft">
            <h4 className="mb-2 font-semibold text-text">Presentation Tips</h4>
            <p>{recipe.presentation}</p>
          </div>
        </section>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center justify-center gap-2 rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
        >
          <Heart className="h-4 w-4" /> Save
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center justify-center gap-2 rounded-3xl border border-border bg-white px-5 py-3 text-sm font-semibold text-text shadow-soft transition hover:-translate-y-0.5"
        >
          <ClipboardCopy className="h-4 w-4" /> Copy
        </button>
        <button
          type="button"
          onClick={onRegenerate}
          className="inline-flex items-center justify-center gap-2 rounded-3xl bg-secondary px-5 py-3 text-sm font-semibold text-text shadow-soft transition hover:-translate-y-0.5"
        >
          <Repeat className="h-4 w-4" /> Generate Again
        </button>
      </div>
    </motion.div>
  )
}
