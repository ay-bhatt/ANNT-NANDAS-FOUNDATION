"use client";

import { useId, type KeyboardEvent } from "react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  name?: string;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-7 w-7 sm:h-8 sm:w-8 ${filled ? "text-amber-400" : "text-slate-300"}`}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 2.5l2.7 6.3 6.8.6-5.2 4.5 1.6 6.6L12 16.9 6.1 20.5l1.6-6.6L2.5 9.4l6.8-.6L12 2.5z"
      />
    </svg>
  );
}

export function StarRatingDisplay({ value }: { value: number }) {
  const safeValue = Math.min(5, Math.max(0, Math.round(value)));
  return (
    <div className="flex items-center gap-0.5" aria-label={`${safeValue} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon key={index} filled={index < safeValue} />
      ))}
    </div>
  );
}

export default function StarRating({ value, onChange, disabled = false, name = "rating" }: StarRatingProps) {
  const groupId = useId();

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onChange || disabled) return;

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      onChange(Math.min(5, value + 1 || 1));
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      onChange(Math.max(1, (value || 1) - 1));
    }
    if (event.key === "Home") {
      event.preventDefault();
      onChange(1);
    }
    if (event.key === "End") {
      event.preventDefault();
      onChange(5);
    }
  };

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Star rating from 1 to 5"
        className="flex flex-wrap items-center gap-1"
        onKeyDown={handleKeyDown}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const checked = value === star;
          return (
            <button
              key={star}
              id={`${groupId}-${star}`}
              type="button"
              role="radio"
              aria-checked={checked}
              aria-label={`${star} star${star === 1 ? "" : "s"}`}
              disabled={disabled}
              onClick={() => onChange?.(star)}
              className="rounded-md p-1 transition hover:scale-105 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              <StarIcon filled={star <= value} />
            </button>
          );
        })}
      </div>
      <input type="hidden" name={name} value={value || ""} />
    </div>
  );
}
