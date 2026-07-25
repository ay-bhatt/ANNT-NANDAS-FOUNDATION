"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode, MouseEvent } from "react";

type ButtonVariant = "primary" | "secondary" | "green" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  showArrow?: boolean;
  external?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:from-primary-600 hover:to-primary-700",
  secondary:
    "bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 hover:border-white/50",
  green:
    "bg-gradient-to-r from-nature-500 to-nature-600 text-white shadow-lg shadow-nature-500/25 hover:shadow-nature-500/40 hover:from-nature-600 hover:to-emerald-600",
  ghost:
    "bg-transparent text-primary-600 hover:bg-primary-50",
  outline:
    "bg-transparent text-primary-600 border-2 border-primary-200 hover:border-primary-500 hover:bg-primary-50",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-base",
  lg: "px-9 py-4 text-lg",
};

function RippleButton({
  children,
  className,
  onClick,
  type = "button",
  showArrow,
}: Omit<ButtonProps, "href" | "variant" | "size" | "external"> & {
  className: string;
}) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute;border-radius:50%;background:rgba(255,255,255,0.4);
      width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;pointer-events:none;
      transform:scale(0);animation:ripple 0.6s ease-out forwards;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    onClick?.(e);
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      className={className}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {showArrow && (
          <motion.svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        )}
      </span>
    </motion.button>
  );
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  showArrow = false,
  external = false,
}: ButtonProps) {
  const baseClass = cn(
    "relative overflow-hidden inline-flex items-center justify-center font-semibold font-inter rounded-full transition-all duration-300",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={baseClass}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        <span className="flex items-center gap-2">
          {children}
          {showArrow && (
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          )}
        </span>
      </Link>
    );
  }

  return (
    <RippleButton className={baseClass} onClick={onClick} type={type} showArrow={showArrow}>
      {children}
    </RippleButton>
  );
}
