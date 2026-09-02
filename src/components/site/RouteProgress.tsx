"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import BrandLoader from "@/components/site/BrandLoader";

type Phase = "idle" | "bar" | "overlay";

export default function RouteProgress() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [width, setWidth] = useState(0);
  const timers = useRef<number[]>([]);
  const activePath = useRef(pathname);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const start = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    clearTimers();
    setPhase("bar");
    setWidth(14);
    timers.current.push(window.setTimeout(() => setWidth(55), 90));
    timers.current.push(window.setTimeout(() => setWidth(78), 420));
    timers.current.push(window.setTimeout(() => setPhase("overlay"), 260));
  }, [clearTimers]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
        return;
      }
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      start();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [start]);

  useEffect(() => {
    if (activePath.current === pathname) return;
    activePath.current = pathname;
    clearTimers();
    setWidth(100);
    const done = window.setTimeout(() => {
      setPhase("idle");
      setWidth(0);
    }, 280);
    return () => window.clearTimeout(done);
  }, [pathname]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  if (phase === "idle") return null;

  return (
    <>
      <div className="route-progress" role="progressbar" aria-hidden="true" aria-valuemin={0} aria-valuemax={100}>
        <div className="route-progress-bar" style={{ width: `${width}%` }} />
      </div>
      {phase === "overlay" ? <BrandLoader overlay label="Loading" /> : null}
    </>
  );
}
