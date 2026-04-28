// Barre d'en-tête — 48px, onglets de vue + bouton simulation
import { useUIStore } from '../../store/uiStore';
import { useSimulationStore } from '../../store/simulationStore';
import { useSimulation } from '../../hooks/useSimulation';
import type { ViewMode } from '../../store/uiStore';

const VIEWS: Array<{ id: ViewMode; label: string; shortcut: string }> = [
  { id: '3d',      label: '3D',      shortcut: '1' },
  { id: 'facade',  label: 'FACADE',  shortcut: '2' },
  { id: 'coupe',   label: 'SECTION', shortcut: '3' },
  { id: 'plan',    label: 'PLAN',    shortcut: '4' },
  { id: 'analyse', label: 'ANALYSE', shortcut: '5' },
];

export function Header() {
  const { activeView, setActiveView, isSimRunning } = useUIStore();
  const { progress } = useSimulationStore();
  const { runDynamic } = useSimulation();

  return (
    <header className="flex items-stretch h-12 bg-paper border-b border-rule select-none">
      {/* Logo */}
      <div className="flex items-center px-4 border-r border-rule">
        <span className="text-sm font-mono font-semibold tracking-widest text-ink uppercase">
          ThermoSim
        </span>
        <span className="ml-2 text-xs font-mono text-ink-4 tracking-wider">v2</span>
      </div>

      {/* Onglets vue */}
      <div className="flex">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            onClick={() => setActiveView(v.id)}
            className={`relative px-5 h-full text-2xs font-mono tracking-widest uppercase transition-colors
              ${activeView === v.id
                ? 'bg-ink text-paper'
                : 'text-ink-3 hover:text-ink hover:bg-paper-alt'
              }
              border-r border-rule`}
            title={`View ${v.label} (${v.shortcut})`}
          >
            {v.label}
            {activeView === v.id && (
              <span className="absolute bottom-0 left-0 right-0 h-px bg-ink" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1" />

      {/* Bouton simulation */}
      <div className="flex items-center px-4 border-l border-rule gap-3">
        {isSimRunning && (
          <div className="flex items-center gap-2">
            <div className="w-24 h-px bg-rule">
              <div className="h-px bg-ink transition-all" style={{ width: `${progress * 100}%` }} />
            </div>
            <span className="text-xs font-mono text-ink-4">{Math.round(progress * 100)} %</span>
          </div>
        )}
        <button
          onClick={() => { void runDynamic(); }}
          disabled={isSimRunning}
          className="flex items-center gap-2 px-3 py-1.5 border border-ink text-xs font-mono
            hover:bg-ink hover:text-paper transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          title="Run dynamic simulation 8760h (⌘↵)"
        >
          <span className="text-sm leading-none">▷</span>
          SIM 8760h
        </button>
      </div>
    </header>
  );
}
