import { useEffect, useRef } from "react";

export function useNotifications() {
  const grantedRef = useRef(Notification.permission === "granted");

  const request = async () => {
    if (!("Notification" in window)) return false;
    if (Notification.permission === "default") {
      const p = await Notification.requestPermission();
      grantedRef.current = p === "granted";
    } else {
      grantedRef.current = Notification.permission === "granted";
    }
    return grantedRef.current;
  };

  const notify = (title: string, body?: string) => {
    if (!grantedRef.current) return;
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ title, body });
    } else if ("serviceWorker" in navigator) {
      // fallback if controller not yet ready
      new Notification(title, { body });
    }
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return { request, notify };
}
