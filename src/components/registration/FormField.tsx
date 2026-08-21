"use client";

import { useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldBaseProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
}

interface InputFieldProps extends FieldBaseProps {
  type?: "text" | "email" | "tel" | "date" | "number";
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  max?: string;
  min?: string;
  maxLength?: number;
  placeholder?: string;
  readOnly?: boolean;
}

interface TextareaFieldProps extends FieldBaseProps {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

interface SelectFieldProps extends FieldBaseProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

function FieldShell({
  id,
  label,
  required,
  error,
  hint,
  className,
  children,
}: FieldBaseProps & { children: ReactNode }) {
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={id} className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-800">
        <span>{label}</span>
        {required ? (
          <span className="text-rose-500" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Optional</span>
        )}
      </label>
      {children}
      {hint && !error ? <p className="mt-1.5 text-xs leading-5 text-slate-500">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const controlClass =
  "w-full rounded-2xl border bg-white px-4 py-3.5 text-[15px] text-slate-950 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 min-h-12";

export function TextField({
  id,
  label,
  required,
  error,
  hint,
  className,
  type = "text",
  value,
  onChange,
  autoComplete,
  inputMode,
  max,
  min,
  maxLength,
  placeholder,
  readOnly,
}: InputFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        max={max}
        min={min}
        maxLength={maxLength}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        onInput={(event) => onChange((event.target as HTMLInputElement).value)}
        className={cn(controlClass, error ? "border-rose-300 ring-2 ring-rose-100" : "border-slate-200")}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  id,
  label,
  required,
  error,
  hint,
  className,
  value,
  onChange,
  rows = 4,
}: TextareaFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <textarea
        id={id}
        name={id}
        value={value}
        rows={rows}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(controlClass, "resize-none", error ? "border-rose-300 ring-2 ring-rose-100" : "border-slate-200")}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  required,
  error,
  hint,
  className,
  value,
  onChange,
  options,
  placeholder = "Select",
}: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <select
        id={id}
        name={id}
        value={value}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(controlClass, error ? "border-rose-300 ring-2 ring-rose-100" : "border-slate-200")}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function ChipSelect({
  label,
  required,
  error,
  options,
  value,
  onChange,
  multiple = true,
}: {
  label: string;
  required?: boolean;
  error?: string;
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
  multiple?: boolean;
}) {
  const toggle = (option: string) => {
    if (multiple) {
      onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option]);
      return;
    }
    onChange(value.includes(option) ? [] : [option]);
  };

  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-800">
        <span>{label}</span>
        {required ? <span className="text-rose-500">*</span> : <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Optional</span>}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              aria-pressed={selected}
              className={cn(
                "min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition",
                selected
                  ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-800",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error ? <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p> : null}
    </div>
  );
}

export function SegmentedField({
  label,
  required,
  error,
  value,
  onChange,
  options,
}: {
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-800">
        <span>{label}</span>
        {required ? <span className="text-rose-500">*</span> : null}
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={selected}
              className={cn(
                "min-h-12 rounded-2xl border px-3 py-3 text-sm font-semibold transition",
                selected
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : "border-slate-200 bg-white text-slate-700 hover:border-emerald-200",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {error ? <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p> : null}
    </div>
  );
}

function dobParts(value: string): { day: string; month: string; year: string } {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (iso) return { year: iso[1], month: iso[2], day: iso[3] };
  const dmy = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
  if (dmy) return { day: dmy[1], month: dmy[2], year: dmy[3] };
  return { day: "", month: "", year: "" };
}

const DOB_DAYS = Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, "0"));
const DOB_MONTHS = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, "0"));
const DOB_MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function dobYears(): string[] {
  const now = new Date().getFullYear();
  const years: string[] = [];
  for (let year = now - 8; year >= now - 90; year -= 1) years.push(String(year));
  return years;
}

export function DateOfBirthField({
  id,
  label = "Date of Birth",
  required,
  error,
  hint = "Date / Month / Year (DD/MM/YYYY)",
  className,
  value,
  onChange,
}: FieldBaseProps & { value: string; onChange: (value: string) => void }) {
  const initial = dobParts(value);
  const [day, setDay] = useState(initial.day);
  const [month, setMonth] = useState(initial.month);
  const [year, setYear] = useState(initial.year);
  const partsRef = useRef({ day: initial.day, month: initial.month, year: initial.year });
  const years = dobYears();

  const emit = (patch: { day?: string; month?: string; year?: string }) => {
    const next = { ...partsRef.current, ...patch };
    partsRef.current = next;
    setDay(next.day);
    setMonth(next.month);
    setYear(next.year);
    onChange(next.day && next.month && next.year ? `${next.year}-${next.month}-${next.day}` : "");
  };

  const selectClass = cn(controlClass, "min-w-0 px-3", error ? "border-rose-300 ring-2 ring-rose-100" : "border-slate-200");

  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <div className="grid grid-cols-3 gap-2">
        <label className="min-w-0">
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Date (DD)</span>
          <select
            id={`${id}-day`}
            name={`${id}-day`}
            aria-label="Date"
            value={day}
            required={required}
            aria-invalid={Boolean(error)}
            onChange={(event) => emit({ day: event.target.value })}
            className={selectClass}
          >
            <option value="">DD</option>
            {DOB_DAYS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="min-w-0">
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Month (MM)</span>
          <select
            id={`${id}-month`}
            name={`${id}-month`}
            aria-label="Month"
            value={month}
            required={required}
            aria-invalid={Boolean(error)}
            onChange={(event) => emit({ month: event.target.value })}
            className={selectClass}
          >
            <option value="">MM</option>
            {DOB_MONTHS.map((option, index) => (
              <option key={option} value={option}>
                {option} · {DOB_MONTH_LABELS[index]}
              </option>
            ))}
          </select>
        </label>
        <label className="min-w-0">
          <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Year (YYYY)</span>
          <select
            id={id}
            name={id}
            aria-label="Year"
            value={year}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            onChange={(event) => emit({ year: event.target.value })}
            className={selectClass}
          >
            <option value="">YYYY</option>
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
    </FieldShell>
  );
}

export function SectionCard({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] sm:p-7">
      <div className="mb-5">
        {eyebrow ? <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">{eyebrow}</p> : null}
        <h2 className="text-2xl font-bold tracking-[-0.03em] text-slate-950">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
