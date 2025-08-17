import { useEffect } from 'react'
import type { Forecast } from '../types'

export default function AlertBell({ data }: { data: Forecast | null }) {
  useEffect(() => {
    if (!data?.alerts?.warnings?.length) return
    // ask for permission
    if (Notification && Notification.permission === 'default') {
      Notification.requestPermission()
    }
    // show a notification
    if (Notification && Notification.permission === 'granted') {
      const first = data.alerts.warnings[0]
      navigator.serviceWorker?.getRegistration()?.then((reg) => {
        reg?.showNotification(`Weather alert: ${first.event}`, {
          body: first.headline || first.description || 'Check details in app',
          icon: '/icons/pwa-192x192.png',
        })
      })
    }
  }, [data?.alerts?.warnings?.length])

  const count = data?.alerts?.warnings?.length || 0
  return (
    <div
      title={count ? `${count} alert(s)` : 'No alerts'}
      className={`rounded-xl px-3 py-2 ${count ? 'bg-red-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}
    >
      ⚠️ {count}
    </div>
  )
}
