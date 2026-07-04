"use client";

import { useState } from "react";

type GlassInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function GlassInput({ label, className = "", ...props }: GlassInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      {label && (
        <label className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--text-muted)]">
          {label}
        </label>
      )}
      <div
        className={`relative rounded-xl transition-all duration-300 ${
          focused
            ? "shadow-[0_0_20px_var(--accent-glow)] ring-1 ring-[var(--accent)]"
            : ""
        }`}
      >
        <input
          {...props}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          className={`w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm backdrop-blur-xl outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] ${className}`}
        />
        {focused && (
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent)]/5 via-transparent to-purple-500/5" />
        )}
      </div>
    </div>
  );
}

type GlassTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function GlassTextarea({
  label,
  className = "",
  ...props
}: GlassTextareaProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      {label && (
        <label className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--text-muted)]">
          {label}
        </label>
      )}
      <div
        className={`relative rounded-xl transition-all duration-300 ${
          focused
            ? "shadow-[0_0_20px_var(--accent-glow)] ring-1 ring-[var(--accent)]"
            : ""
        }`}
      >
        <textarea
          {...props}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          className={`w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm backdrop-blur-xl outline-none transition-all placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] ${className}`}
        />
        {focused && (
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent)]/5 via-transparent to-purple-500/5" />
        )}
      </div>
    </div>
  );
}
