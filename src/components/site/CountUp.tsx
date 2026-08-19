"use client";

import { useEffect, useRef, useState } from "react";

function parseStat(value: string): { prefix: string; number: number; suffix: string } {
  const match = value.match(/^(.*?)([\d,]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value };
  return {
    prefix: match[1],
    number: Number(match[2].replace(/,/g, "")),
    suffix: match[3],
  };
}

export default function CountUp({ value, className }: { value: string; className?: string }) {
  const parsed = parseStat(value);
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const duration = 1100;
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - progress) ** 3;
          setShown(Math.round(parsed.number * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [parsed.number]);

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {shown.toLocaleString("en-IN")}
      {parsed.suffix}
    </span>
  );
}
