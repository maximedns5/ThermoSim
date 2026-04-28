// ConfigPanel principal
import { useUIStore } from '../../store/uiStore';
import { useBuildingStore } from '../../store/buildingStore';
import { SCENARIOS } from '../../engine/data/scenarios';
import {
  GeometrySection, WallSection, WindowSection, RoofSection,
  VentilationSection, HvacSection, ClimateSection,
} from './sections';
import type { ActivePanel } from '../../store/uiStore';

const PANELS: Array<{ id: ActivePanel; label: string }> = [
  { id: 'geometry',    label: 'Geom.' },
  { id: 'wall',        label: 'Walls' },
  { id: 'windows',     label: 'Windows' },
  { id: 'roof',        label: 'Roof' },
  { id: 'ventilation', label: 'Ventil.' },
  { id: 'hvac',        label: 'HVAC' },
  { id: 'climate',     label: 'Climate' },
  { id: 'scenarios',   label: 'Scenarios' },
];

const SECTION_COMPONENTS: Record<ActivePanel, React.FC | null> = {
  geometry:    GeometrySection,
  wall:        WallSection,
  windows:     WindowSection,
  roof:        RoofSection,
  ventilation: VentilationSection,
  hvac:        HvacSection,
  climate:     ClimateSection,
  scenarios:   null,
};

export function ConfigPanel() {
  const { activePanel, setActivePanel } = useUIStore();
  const { applyScenario } = useBuildingStore();
  const Section = SECTION_COMPONENTS[activePanel];

  return (
    <aside className="w-80 min-w-80 h-full flex flex-col bg-paper border-r border-rule overflow-hidden">
      {/* Onglets horizontaux scrollables */}
      <div className="flex overflow-x-auto border-b border-rule scrollbar-none">
        {PANELS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePanel(p.id)}
            className={`flex-shrink-0 px-3 py-2 text-2xs font-mono uppercase tracking-wider transition-colors
              ${activePanel === p.id
                ? 'bg-ink text-paper'
                : 'text-ink-3 hover:text-ink hover:bg-paper-alt'
              }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Contenu section */}
      <div className="flex-1 overflow-y-auto p-4">
        {activePanel === 'scenarios' ? (
          <div className="space-y-2">
            <p className="text-xs font-sans text-ink-3 mb-3">Select a preconfigured scenario:</p>
            {Object.values(SCENARIOS).map((s) => (
              <button
                key={s.id}
                onClick={() => applyScenario(s)}
                className="w-full text-left px-3 py-2.5 border border-rule hover:border-ink hover:bg-paper-alt transition-colors"
              >
                <div className="text-sm font-sans text-ink">{s.name}</div>
                <div className="text-xs font-mono text-ink-4 mt-0.5">{s.hint}</div>
              </button>
            ))}
          </div>
        ) : Section ? (
          <Section />
        ) : null}
      </div>
    </aside>
  );
}
