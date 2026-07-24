export type RecipeSection = {
  title: string
  content: string[]
}

export type Recipe = {
  name: string
  description: string
  time: string
  difficulty: string
  calories: string
  ingredients: string[]
  steps: string[]
  tips: string[]
  alternative: string
  funFact: string
  presentation: string
}
