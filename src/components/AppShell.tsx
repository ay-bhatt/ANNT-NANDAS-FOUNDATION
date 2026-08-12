"use client";

import { useCallback, useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

const SPLASH_STORAGE_KEY = "anf-intro-v1-seen";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  const completeIntro = useCallback(() => {
    try {
      window.localStorage.setItem(SPLASH_STORAGE_KEY, "true");
    } catch {
      // Storage can be unavailable in privacy-restricted browsers.
    }
    setShowIntro(false);
  }, []);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(SPLASH_STORAGE_KEY) === "true") {
        setShowIntro(false);
        return;
      }
    } catch {
      // Continue with the intro when local storage is unavailable.
    }

    const startedAt = performance.now();
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const hero = document.querySelector<HTMLImageElement>(
      'img[data-critical-hero="true"]',
    );
    const heroReady =
      hero?.complete && hero.naturalWidth > 0
        ? hero.decode().catch(() => undefined)
        : new Promise<void>((resolve) => {
            if (!hero) {
              resolve();
              return;
            }
            hero.addEventListener("load", () => resolve(), { once: true });
            hero.addEventListener("error", () => resolve(), { once: true });
          });

    const criticalResources = Promise.allSettled([fontsReady, heroReady]);
    const safetyLimit = new Promise<void>((resolve) => {
      window.setTimeout(resolve, 2600);
    });

    Promise.race([criticalResources, safetyLimit]).then(() => {
      const elapsed = performance.now() - startedAt;
      const remainingBrandTime = Math.max(0, 650 - elapsed);
      window.setTimeout(completeIntro, remainingBrandTime);
    });
  }, [completeIntro]);

  return (
    <>
      <LoadingScreen visible={showIntro} />
      <div className={showIntro ? "app-shell app-shell-loading" : "app-shell app-shell-ready"}>
        {children}
      </div>
    </>
  );
}
