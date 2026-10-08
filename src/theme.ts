import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

// Keep in sync with the inline script in index.html and --canvas in index.css.
const storageKey = 'portfolio-theme'
const darkSchemeQuery = '(prefers-color-scheme: dark)'
const browserBarColor: Record<Theme, string> = { light: '#f3f5ee', dark: '#202a23' }

function savedTheme(): Theme | null {
  try {
    const saved = window.localStorage.getItem(storageKey)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

function systemTheme(): Theme {
  return window.matchMedia(darkSchemeQuery).matches ? 'dark' : 'light'
}

function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return savedTheme() ?? systemTheme()
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', browserBarColor[theme])
  }, [theme])

  // Follow the OS theme until the visitor picks one explicitly.
  useEffect(() => {
    const media = window.matchMedia(darkSchemeQuery)
    const followSystem = () => { if (!savedTheme()) setTheme(systemTheme()) }
    media.addEventListener('change', followSystem)
    return () => media.removeEventListener('change', followSystem)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { window.localStorage.setItem(storageKey, next) } catch { /* Storage is optional. */ }
  }

  return { theme, toggleTheme }
}
