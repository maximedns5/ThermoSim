// Dropdown matériau — style liste technique
import { useId } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface MaterialDropdownProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (v: string) => void;
  hint?: string;
}

export function MaterialDropdown({ label, value, options, onChange, hint }: MaterialDropdownProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1 py-1">
      <label htmlFor={id} className="text-xs font-sans text-ink-3 uppercase tracking-wide">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-paper border border-rule text-sm font-mono text-ink
          px-2 py-1.5 appearance-none cursor-pointer
          focus:outline-none focus:border-ink focus-visible:ring-1 focus-visible:ring-ink
          hover:border-ink-3 transition-colors"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {hint && <p className="text-xs font-sans text-ink-4 mt-0.5">{hint}</p>}
    </div>
  );
}
