"use client";

import { useEffect } from "react";

/** SW + cache-first HTML breaks Next.js dev (infinite GET / reload loop). Production only. */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      void navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => void r.unregister());
      });
      if ("caches" in window) {
        void caches.keys().then((keys) => keys.forEach((k) => void caches.delete(k)));
      }
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* offline optional */
    });
  }, []);

  return null;
}
