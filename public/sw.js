self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("message", (event) => {
  const { title, body } = event.data || {};
  if (title) self.registration.showNotification(title, { body, icon: "/favicon.ico" });
});
