"use client";

import type { ReactNode } from "react";
import { useI18n } from "./LanguageProvider";

export function T({ children }: { children: string }) {
  const { t } = useI18n();
  return <>{t(children)}</>;
}

export function LocalizedList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-1 text-emerald-600">✓</span>
          <span>{t(item)}</span>
        </li>
      ))}
    </ul>
  );
}

export function useLocalizedList(items: string[]) {
  const { t } = useI18n();
  return items.map((item) => t(item));
}

export function LocalizedNode({ children }: { children: ReactNode }) {
  return children;
}
