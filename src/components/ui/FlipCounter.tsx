// FlipCounter — animation par chiffre (AnimatePresence Framer Motion)
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';

interface FlipCounterProps {
  value: number;
  decimals?: number;
  unit?: string;
  critical?: boolean;
  className?: string;
}

function FlipDigit({ char, id }: { char: string; id: string }) {
  return (
    <span className="relative inline-block overflow-hidden" style={{ width: char === '.' ? '0.35em' : '0.65em', height: '1.2em', verticalAlign: 'bottom' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={id}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 flex items-end justify-center"
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function FlipCounter({ value, decimals = 0, unit, critical = false, className = '' }: FlipCounterProps) {
  const formatted = value.toFixed(decimals);
  const chars = useMemo(() => formatted.split(''), [formatted]);

  return (
    <span className={`font-mono tabular-nums inline-flex items-end ${critical ? 'text-accent' : ''} ${className}`}>
      {chars.map((ch, i) => (
        <FlipDigit key={i} char={ch} id={`${i}-${ch}`} />
      ))}
      {unit && <span className="text-xs text-ink-4 ml-0.5 leading-none">{unit}</span>}
    </span>
  );
}
