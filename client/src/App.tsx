import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Sparkles, Volume2, VolumeX, Plus, Loader2 } from 'lucide-react'
import { Chip } from './components/Chip'
import { GlowBubble } from './components/GlowBubble'
import { Mascot } from './components/Mascot'
import { QuoteBadge } from './components/QuoteBadge'
import { RecipeCard } from './components/RecipeCard'
import { LoadingSteps } from './components/LoadingSteps'
import { parseRecipeMarkdown } from './utils/recipeParser'
import { useSound } from './hooks/useSound'
import type { Recipe } from './types'

const cozyQuotes = [
  'Every recipe tells a story.',
  'Tiny bites bring big smiles.',
  'Your kitchen is a secret garden of flavors.',
  'Cooking is the sweetest kind of play.'
]

const loadingMessages = [
  'Finding recipes...',
  'Checking flavors...',
  'Adding spices...',
  'Almost ready...'
]

const badgeList = ['🧁 Mochi Master', '🍓 Strawberry Lover', '🍝 Pasta Wizard']

function App() {
  const [input, setInput] = useState('')
  const [chips, setChips] = useState<string[]>([])
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(false)
  const [progressIndex, setProgressIndex] = useState(0)
  const [recipeText, setRecipeText] = useState('')
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [quote] = useState(() => cozyQuotes[Math.floor(Math.random() * cozyQuotes.length)])
  const [badge] = useState(() => badgeList[Math.floor(Math.random() * badgeList.length)])
  const eventSourceRef = useRef<EventSource | null>(null)
  const { softPop, bubble, sparkle, bell, bubbleLoop } = useSound()

  useEffect(() => {
    if (soundEnabled) {
      setTimeout(() => bell(), 1200)
    }
  }, [bell, soundEnabled])

  useEffect(() => {
    if (!loading) return
    const interval = window.setInterval(() => {
      setProgressIndex((current) => Math.min(current + 1, loadingMessages.length - 1))
    }, 1600)
    return () => window.clearInterval(interval)
  }, [loading])

  const ingredients = useMemo(() => chips.join(', '), [chips])

  const handleAddChip = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setChips((current) => Array.from(new Set([...current, trimmed])))
    setInput('')
    softPop()
  }

  const handleRemoveChip = (label: string) => {
    setChips((current) => current.filter((item) => item !== label))
    bubble()
  }

 const handleGenerate = async () => {
  if (!ingredients) return

  setLoading(true)
  setCompleted(false)
  setProgressIndex(0)
  setRecipeText("")
  setRecipe(null)

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients,
        preferences: "",
        diet: "",
        servings: "2",
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate recipe")
    }

    const data = await response.json()

    setRecipeText(data.text)

    const parsed = parseRecipeMarkdown(data.text)

    setRecipe(parsed)

    setCompleted(true)

    sparkle()

  } catch (err) {
    console.error(err)
    alert("Failed to generate recipe")
  } finally {
    setLoading(false)
  }
}

  const handleCopy = async () => {
    if (!recipeText) return
    await navigator.clipboard.writeText(recipeText)
    sparkle()
  }

  const handleSave = () => {
    localStorage.setItem('mochi-bites-saved', recipeText)
    bell()
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-10">
      <div className="pointer-events-none absolute left-10 top-10 h-36 w-36 rounded-full bg-secondary/60 blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-28 h-28 w-28 rounded-full bg-highlight/70 blur-3xl" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10">
        <header className="grid gap-8 rounded-[3rem] border border-border bg-white/95 px-6 py-8 shadow-cozy sm:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="mb-3 inline-flex items-center gap-3 rounded-full bg-highlight/80 px-4 py-2 text-sm font-semibold text-text shadow-soft">
                <Sparkles className="h-4 w-4" /> Playful cooking awaits
              </p>
              <h1 className="text-5xl font-baloo leading-tight text-text sm:text-6xl">🍓 CozyChef AI</h1>
              <p className="mt-4 max-w-xl text-lg leading-8 text-text/85">What ingredients are hiding in your kitchen today? Turn pantry scraps into a cozy recipe adventure.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[2.25rem] bg-secondary/90 p-4 text-sm text-text shadow-soft">
                <p className="font-semibold">{badge}</p>
                <p className="mt-2 text-xs text-text/80">Collect cute badges as you cook more meals.</p>
              </div>
              <div className="rounded-[2.25rem] bg-accent/90 p-4 text-sm text-text shadow-soft">
                <p className="font-semibold">Daily Quote</p>
                <p className="mt-2 text-xs text-text/80">{quote}</p>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center rounded-[2.25rem] bg-highlight/90 p-8 shadow-soft">
            <Mascot state={loading ? 'cooking' : completed ? 'completed' : 'idle'} />
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[3rem] border border-border bg-white/95 p-6 shadow-cozy"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-primary">Your cozy pantry</p>
                <h2 className="text-3xl font-baloo text-text">Pick ingredients like game pieces</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSoundEnabled((current) => !current)
                  softPop()
                }}
                className="inline-flex items-center gap-2 rounded-3xl bg-background px-4 py-3 text-sm font-semibold text-text shadow-soft"
                aria-label="Toggle sound"
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                {soundEnabled ? 'Sound On' : 'Muted'}
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                {chips.map((chip) => (
                  <Chip key={chip} label={chip} onRemove={() => handleRemoveChip(chip)} />
                ))}
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <label className="sr-only" htmlFor="ingredient-input">Ingredients</label>
                <input
                  id="ingredient-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && handleAddChip()}
                  placeholder="I have tomato, cheese, bread..."
                  className="w-full rounded-[2rem] border border-border bg-background/80 px-5 py-4 text-base text-text outline-none transition focus:border-primary"
                />
                <button
                  type="button"
                  onClick={handleAddChip}
                  className="inline-flex items-center gap-2 rounded-[2rem] bg-primary px-6 py-4 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
                >
                  <Plus className="h-4 w-4" /> Add
                </button>
              </div>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading || chips.length === 0}
                className="inline-flex items-center justify-center gap-3 rounded-[2.5rem] bg-secondary px-6 py-4 text-base font-semibold text-text shadow-soft transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />} ✨ Cook Magic
              </button>
            </div>
          </motion.div>

          <div className="space-y-6">
            <QuoteBadge quote={quote} />
            <div className="rounded-[2.5rem] border border-border bg-white/95 p-5 shadow-cozy">
              <h3 className="mb-3 text-lg font-semibold text-text">Cute achievements</h3>
              <div className="grid gap-3">
                {badgeList.map((item) => (
                  <div key={item} className="rounded-3xl bg-highlight/80 px-4 py-4 text-sm text-text shadow-soft">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-[3rem] border border-border bg-white/95 p-6 shadow-cozy"
            >
              <LoadingSteps messages={loadingMessages} currentIndex={progressIndex} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {recipe && !loading && (
            <motion.div
              key="recipe-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <RecipeCard recipe={recipe} onRegenerate={handleGenerate} onCopy={handleCopy} onSave={handleSave} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
