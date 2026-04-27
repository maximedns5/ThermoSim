// Slider technique — rail 1px, thumb carré 10×10
import { useId } from 'react';

interface TechSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  decimals?: number;
  onChange: (v: number) => void;
  critical?: boolean; // accent rouge si valeur problématique
}

export function TechSlider({
  label, value, min, max, step = 0.01, unit = '', decimals = 2, onChange, critical = false,
}: TechSliderProps) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-1 py-1">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-xs font-sans text-ink-3 uppercase tracking-wide">
          {label}
        </label>
        <span className={`text-sm font-mono tabular-nums ${critical ? 'text-accent' : 'text-ink'}`}>
          {value.toFixed(decimals)}{unit && <span className="text-ink-3 text-xs"> {unit}</span>}
        </span>
      </div>
      <div className="relative h-4 flex items-center">
        {/* Rail */}
        <div className="absolute inset-x-0 h-px bg-rule" />
        {/* Progression */}
        <div className="absolute left-0 h-px bg-ink-2" style={{ width: `${pct}%` }} />
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="relative w-full h-4 appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-2.5
            [&::-webkit-slider-thumb]:h-2.5
            [&::-webkit-slider-thumb]:bg-ink
            [&::-webkit-slider-thumb]:border-0
            [&::-webkit-slider-runnable-track]:h-0"
        />
      </div>
    </div>
  );
}
