// HeatLossHeatmap — pertes par heure (24×365 pixels)
import { useMemo, useRef, useEffect } from 'react';
import { useSimulationStore } from '../../store/simulationStore';

export function HeatLossHeatmap() {
  const { annualResult } = useSimulationStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const data = annualResult?.Q_heat;

  useEffect(() => {
    if (!canvasRef.current || !data) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const H = 24, D = 365;
    canvas.width = D; canvas.height = H;

    const max = Math.max(...Array.from(data));
    const img = ctx.createImageData(D, H);

    for (let d = 0; d < D; d++) {
      for (let h = 0; h < H; h++) {
        const idx = d * 24 + h;
        const v = (data[idx] ?? 0) / max;
        const i4 = (h * D + d) * 4;
        // Palette : blanc → bleu marine
        img.data[i4]     = Math.round(244 - v * 180);
        img.data[i4 + 1] = Math.round(242 - v * 200);
        img.data[i4 + 2] = Math.round(237 - v * 30);
        img.data[i4 + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }, [data]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-32 text-xs font-mono text-ink-4">
        Lancer la simulation 8760h pour afficher la heatmap
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <p className="text-xs font-sans text-ink-3 uppercase tracking-wider">Pertes thermiques horaires — 8760h</p>
      <canvas
        ref={canvasRef}
        className="w-full border border-rule"
        style={{ imageRendering: 'pixelated', height: 80 }}
        aria-label="Heatmap des pertes thermiques horaires"
      />
      <div className="flex justify-between text-xs font-mono text-ink-4">
        <span>Janv.</span><span>Avr.</span><span>Juil.</span><span>Oct.</span><span>Déc.</span>
      </div>
    </div>
  );
}
