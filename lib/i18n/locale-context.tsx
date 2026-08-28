'use client'
/* eslint-disable react-hooks/set-state-in-effect -- preferences are synchronized from browser storage after hydration */

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { dictionary, type DictionaryKey, type Locale, type FontSize, type ColorTheme } from './dictionary'

const LOCALE_KEY = 'halla-plus-locale'
const FONT_SIZE_KEY = 'halla-plus-font-size'
const COLOR_THEME_KEY = 'halla-plus-color-theme'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
  t: (key: DictionaryKey) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [fontSize, setFontSizeState] = useState<FontSize>('md')
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('champagne')

  // Read stored preferences after mount only — avoids a server/client
  // hydration mismatch, at the cost of one render in the default (en/md)
  // state before a saved preference applies.
  useEffect(() => {
    try {
      const storedLocale = localStorage.getItem(LOCALE_KEY)
      if (storedLocale === 'en' || storedLocale === 'id') setLocaleState(storedLocale)
      const storedSize = localStorage.getItem(FONT_SIZE_KEY)
      if (storedSize === 'sm' || storedSize === 'md' || storedSize === 'lg') setFontSizeState(storedSize)
      const storedTheme = localStorage.getItem(COLOR_THEME_KEY)
      if (storedTheme === 'champagne' || storedTheme === 'forest' || storedTheme === 'oxblood' || storedTheme === 'slate') {
        setColorThemeState(storedTheme)
      }
    } catch {
      // localStorage unavailable (private mode, etc.) — fall back to defaults
    }
  }, [])

  useEffect(() => {
    if (fontSize === 'md') {
      document.documentElement.removeAttribute('data-font-size')
    } else {
      document.documentElement.setAttribute('data-font-size', fontSize)
    }
  }, [fontSize])

  useEffect(() => {
    document.documentElement.setAttribute('data-color-theme', colorTheme)
  }, [colorTheme])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(LOCALE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  const setFontSize = useCallback((next: FontSize) => {
    setFontSizeState(next)
    try {
      localStorage.setItem(FONT_SIZE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  const setColorTheme = useCallback((next: ColorTheme) => {
    setColorThemeState(next)
    document.documentElement.setAttribute('data-color-theme', next)
    try {
      localStorage.setItem(COLOR_THEME_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  const t = useCallback(
    (key: DictionaryKey) => dictionary[key]?.[locale] ?? dictionary[key]?.en ?? key,
    [locale]
  )

  return (
    <LocaleContext.Provider value={{ locale, setLocale, fontSize, setFontSize, colorTheme, setColorTheme, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within a LocaleProvider')
  return ctx
}
