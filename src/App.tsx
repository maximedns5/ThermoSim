import React, { Suspense, lazy } from 'react';
import { Header } from './components/layout/Header';
import { MetricsBar } from './components/layout/MetricsBar';
import { Folio } from './components/layout/Folio';
import { ConfigPanel } from './components/config/ConfigPanel';
import { FacadeView } from './components/svg/FacadeView';
import { SectionView } from './components/svg/SectionView';
import { PlanView } from './components/svg/PlanView';
import { AnalyseView } from './components/views/AnalyseView';
import { useUIStore } from './store/uiStore';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { HeatLossHeatmap } from './components/charts/HeatLossHeatmap';
import { SankeyEnergy } from './components/charts/SankeyEnergy';
import { TimeSeries24h } from './components/charts/TimeSeries24h';
import { TimeSeriesAnnual } from './components/charts/TimeSeriesAnnual';
import { GlaserDiagram } from './components/charts/GlaserDiagram';
import { HvacPerformance } from './components/charts/HvacPerformance';
import { ScenarioRadar } from './components/charts/ScenarioRadar';

const BuildingScene = lazy(() =>
  import('./components/three/BuildingScene').then((m) => ({ default: m.BuildingScene }))
);

function ViewPane() {
  const { activeView } = useUIStore();
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <div className="flex-1 relative overflow-hidden">
        {activeView === '3d' && (
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center text-xs font-mono text-ink-4 bg-paper-alt">
              Chargement moteur 3D…
            </div>
          }>
            <BuildingScene />
          </Suspense>
        )}
        {activeView === 'facade' && (
          <div className="w-full h-full overflow-auto p-4 bg-paper">
            <FacadeView />
          </div>
        )}
        {activeView === 'coupe' && (
          <div className="w-full h-full overflow-auto p-4 bg-paper">
            <SectionView />
          </div>
        )}
        {activeView === 'plan' && (
          <div className="w-full h-full overflow-auto p-4 bg-paper">
            <PlanView />
          </div>
        )}
        {activeView === 'analyse' && <AnalyseView />}
      </div>
      <div className="border-t border-rule bg-paper overflow-x-auto">
        <div className="flex gap-6 p-4 min-w-max">
          <div className="w-72 flex-shrink-0"><SankeyEnergy /></div>
          <div className="w-80 flex-shrink-0"><HeatLossHeatmap /></div>
          <div className="w-80 flex-shrink-0"><TimeSeries24h /></div>
          <div className="w-80 flex-shrink-0"><TimeSeriesAnnual /></div>
          <div className="w-72 flex-shrink-0"><GlaserDiagram /></div>
          <div className="w-72 flex-shrink-0"><HvacPerformance /></div>
          <div className="w-64 flex-shrink-0"><ScenarioRadar /></div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  useKeyboardShortcuts();
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-paper font-sans">
      <Header />
      <MetricsBar />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <ConfigPanel />
        <ViewPane />
      </div>
      <Folio />
    </div>
  );
}
