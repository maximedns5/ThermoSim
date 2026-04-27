// Toggle group — boutons radio horizontaux style technique

interface ToggleGroupProps<T extends string> {
  label?: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (v: T) => void;
}

export function ToggleGroup<T extends string>({ label, value, options, onChange }: ToggleGroupProps<T>) {
  return (
    <div className="flex flex-col gap-1 py-1">
      {label && (
        <span className="text-xs font-sans text-ink-3 uppercase tracking-wide">{label}</span>
      )}
      <div className="flex divide-x divide-rule border border-rule">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`flex-1 px-2 py-1.5 text-xs font-mono transition-colors
              ${value === o.value
                ? 'bg-ink text-paper'
                : 'bg-paper text-ink-3 hover:bg-paper-alt hover:text-ink'
              }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
