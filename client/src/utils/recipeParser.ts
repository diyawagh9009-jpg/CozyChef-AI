import { Recipe } from '../types'

export function parseRecipeMarkdown(markdown: string): Recipe {
  const cleaned = markdown.replace(/^\s+|\s+$/g, '')
  const sections = cleaned.split(/\n(?=#)/g)
  const result: Partial<Recipe> = {
    name: 'Cozy Recipe',
    description: '',
    time: '30 mins',
    difficulty: 'Easy',
    calories: 'N/A',
    ingredients: [],
    steps: [],
    tips: [],
    alternative: 'Try a lighter swap if you want.',
    funFact: 'Cooking is the coziest kind of magic.',
    presentation: 'Serve with a smile and a sprinkle of love.'
  }

  sections.forEach((section) => {
    const headingMatch = section.match(/^#*\s*(.*?)\s*\n/)
    if (!headingMatch) return
    const heading = headingMatch[1].toLowerCase()
    const body = section.slice(section.indexOf('\n') + 1).trim()
    const lines = body.split(/\n+/).map((line) => line.replace(/^[-*\d\.\s]+/, '').trim()).filter(Boolean)

    if (heading.includes('recipe name')) {
      result.name = lines[0] || result.name
    } else if (heading.includes('short description')) {
      result.description = lines.join(' ')
    } else if (heading.includes('cooking time')) {
      result.time = lines[0] || result.time
    } else if (heading.includes('difficulty')) {
      result.difficulty = lines[0] || result.difficulty
    } else if (heading.includes('calories')) {
      result.calories = lines[0] || result.calories
    } else if (heading.includes('ingredients')) {
      result.ingredients = lines
    } else if (heading.includes('steps')) {
      result.steps = lines
    } else if (heading.includes('chef tips')) {
      result.tips = lines
    } else if (heading.includes('healthy alternative')) {
      result.alternative = lines.join(' ')
    } else if (heading.includes('fun fact')) {
      result.funFact = lines.join(' ')
    } else if (heading.includes('presentation tips')) {
      result.presentation = lines.join(' ')
    }
  })

  return result as Recipe
}
