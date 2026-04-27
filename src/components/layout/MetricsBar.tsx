// Barre métriques — 56px, 4 cellules avec FlipCounter
import { FlipCounter } from '../ui/FlipCounter';
import { DpeLabel } from '../charts/DpeLabel';
import { useDerivedMetrics } from '../../hooks/useDerivedMetrics';
import { useUIStore } from '../../store/uiStore';
import { useBuildingStore } from '../../store/buildingStore';

export function MetricsBar() {
  const m = useDerivedMetrics();
  const { aptSizeM2 } = useUIStore();
  const config = useBuildingStore((s) => s.config);
  const critical = m.dpe === 'F' || m.dpe === 'G';

  const A_floor = config.geometry.length * config.geometry.width;
  const nAptTotal = Math.max(1, Math.floor(A_floor / aptSizeM2)) * config.geometry.nFloors;
  const costPerApt = m.cost_eur / nAptTotal;

  return (
    <div className="flex h-14 bg-paper-alt border-b border-rule divide-x divide-rule select-none">
      {/* U global paroi */}
      <div className="flex flex-col justify-center px-5 gap-0">
        <span className="text-2xs font-sans text-ink-4 uppercase tracking-wider leading-none">U paroi</span>
        <FlipCounter value={m.U_wall} decimals={3} unit="W/(m²·K)" className="text-sm" />
      </div>

      {/* R paroi */}
      <div className="flex flex-col justify-center px-5 gap-0">
        <span className="text-2xs font-sans text-ink-4 uppercase tracking-wider leading-none">R paroi</span>
        <FlipCounter value={m.R_wall} decimals={2} unit="m²·K/W" className="text-sm" />
      </div>

      {/* Q design */}
      <div className="flex flex-col justify-center px-5 gap-0">
        <span className="text-2xs font-sans text-ink-4 uppercase tracking-wider leading-none">Q design</span>
        <FlipCounter value={m.Q_design_W / 1000} decimals={1} unit="kW" className="text-sm" />
      </div>

      {/* EP / DPE */}
      <div className="flex items-center px-5 gap-3">
        <div className="flex flex-col gap-0">
          <span className="text-2xs font-sans text-ink-4 uppercase tracking-wider leading-none">Ep primaire</span>
          <FlipCounter value={m.EP_m2} decimals={0} unit="kWhEP/(m²·an)" className="text-sm" critical={critical} />
        </div>
        <DpeLabel letter={m.dpe} compact />
      </div>

      {/* CO2 */}
      <div className="flex flex-col justify-center px-5 gap-0">
        <span className="text-2xs font-sans text-ink-4 uppercase tracking-wider leading-none">CO₂</span>
        <FlipCounter value={m.CO2_m2} decimals={1} unit="kgCO₂/(m²·an)" className="text-sm" critical={critical} />
      </div>

      {/* Coût total */}
      <div className="flex flex-col justify-center px-5 gap-0">
        <span className="text-2xs font-sans text-ink-4 uppercase tracking-wider leading-none">Coût total</span>
        <FlipCounter value={m.cost_eur} decimals={0} unit="€/an" className="text-sm" />
      </div>

      {/* Coût / appartement */}
      <div className="flex flex-col justify-center px-5 gap-0" title={`${nAptTotal} appt(s) de ${aptSizeM2} m²`}>
        <span className="text-2xs font-sans text-ink-4 uppercase tracking-wider leading-none">Coût / appt</span>
        <FlipCounter value={costPerApt} decimals={0} unit="€/an" className="text-sm" />
      </div>
    </div>
  );
}
