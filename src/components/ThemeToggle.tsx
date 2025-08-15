import { useEffect, useState } from 'react'
import { storage } from '../services/storage'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(storage.getPrefs().theme)

  useEffect(() => {
    const root = document.documentElement
    const apply = (t: typeof theme) => {
      if (t === 'system') {
        root.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches)
      } else {
        root.classList.toggle('dark', t === 'dark')
      }
    }
    apply(theme)
    storage.savePrefs({ theme })
  }, [theme])

  return (
    <div className="inline-flex rounded-2xl bg-slate-200 dark:bg-slate-700 p-1">
      {(['light','dark','system'] as const).map(t => (
        <button key={t} className={`toggle ${theme===t ? 'bg-white dark:bg-slate-900 shadow' : ''}`} onClick={() => setTheme(t)}>
          {t}
        </button>
      ))}
    </div>
  )
}

