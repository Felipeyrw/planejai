import { createContext } from 'react'

export type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toogleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)
