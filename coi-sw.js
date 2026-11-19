// Cross-origin isolation for static hosts that can't set headers (GitHub Pages, ConfigMap-served files).
// Only page loads get the headers: COEP "credentialless" lets the CDN and Hugging Face downloads through, and the
// isolation it brings lets the CPU engine (wllama) run on several threads.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') return;
  event.respondWith(
    fetch(event.request).then((res) => {
      const headers = new Headers(res.headers);
      headers.set('Cross-Origin-Opener-Policy', 'same-origin');
      headers.set('Cross-Origin-Embedder-Policy', 'credentialless');
      return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
    }),
  );
});
