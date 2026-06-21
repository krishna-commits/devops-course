const CACHE = "devops-world-v4";

const PRECACHE = [
  "/cheatsheets/",
  "/cheatsheets/kubectl/",
  "/cheatsheets/docker/",
  "/cheatsheets/git/",
  "/cheatsheets/terraform/",
  "/cheatsheets/linux-ops/",
  "/cheatsheets/helm/",
  "/cheatsheets/ansible/",
  "/cheatsheets/aws-cli/",
  "/cheatsheets/github-actions/",
  "/cheatsheets/systemd/",
  "/manifest.webmanifest",
  "/icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isNextAsset(pathname) {
  return pathname.startsWith("/_next/") || pathname.startsWith("/__next");
}

function isCheatsheet(pathname) {
  return pathname.startsWith("/cheatsheets/");
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // Never touch Next.js bundles or dev/HMR assets
  if (isNextAsset(url.pathname)) return;

  const isNavigate =
    event.request.mode === "navigate" ||
    (event.request.headers.get("accept") || "").includes("text/html");

  // HTML: network first (avoids stale shell); offline falls back to cache
  if (isNavigate) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cheat sheets: cache first for offline use on phone/SSH
  if (isCheatsheet(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const network = fetch(event.request).then((response) => {
          if (response.ok) {
            caches.open(CACHE).then((cache) => cache.put(event.request, response.clone()));
          }
          return response;
        });
        return cached || network;
      })
    );
  }
});
