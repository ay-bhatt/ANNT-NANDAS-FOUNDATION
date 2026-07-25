"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";

const inputClass =
  "w-full px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-300 transition-all font-inter text-sm";

interface FieldWrapperProps {
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormField({ label, required, children, className }: FieldWrapperProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
        {label}
        {required && <span className="text-primary-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export function FormInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClass, props.className)} />;
}

export function FormTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(inputClass, "resize-none", props.className)}
    />
  );
}

export function FormSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(inputClass, props.className)} />;
}
