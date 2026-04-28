// Folio — bande de bas de page 24px
import { useBuildingStore } from '../../store/buildingStore';

export function Folio() {
  const config = useBuildingStore((s) => s.config);
  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const version = import.meta.env.VITE_APP_VERSION ?? '2.0.0';

  return (
    <footer className="flex items-center justify-between h-6 px-4 bg-paper border-t border-rule">
      <span className="text-2xs font-mono text-ink-4 tracking-wider">
        THERMOSIM WEB  ·  {version}  ·  RE2020
      </span>
      <span className="text-2xs font-mono text-ink-4 tracking-wider">
        {'Projet sans titre'}  ·  {dateStr}
      </span>
      <span className="text-2xs font-mono text-ink-4 tracking-wider">
        Folio 1/1
      </span>
    </footer>
  );
}
