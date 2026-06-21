"use client";

import { useEffect, useState } from "react";

export function OfflineIndicator() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    setOffline(!navigator.onLine);
    function onOffline() {
      setOffline(true);
    }
    function onOnline() {
      setOffline(false);
    }
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);
    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      className="fixed top-16 left-0 right-0 z-50 flex justify-center pointer-events-none print:hidden"
      role="status"
      aria-live="polite"
    >
      <span className="pointer-events-auto px-4 py-2 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800 shadow-lg">
        Offline — showing cached pages where available
      </span>
    </div>
  );
}
