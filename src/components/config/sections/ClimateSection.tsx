import { useBuildingStore } from '../../../store/buildingStore';
import { MaterialDropdown } from '../controls/MaterialDropdown';
import { ToggleGroup } from '../controls/ToggleGroup';

const CITY_OPTS = [
  { value: 'paris',       label: 'Paris (H1b)' },
  { value: 'strasbourg',  label: 'Strasbourg (H1a)' },
  { value: 'brest',       label: 'Brest (H1c)' },
  { value: 'bordeaux',    label: 'Bordeaux (H2b)' },
  { value: 'lyon',        label: 'Lyon (H2a)' },
  { value: 'marseille',   label: 'Marseille (H3)' },
  { value: 'clermont',    label: 'Clermont-Fd (H2d)' },
  { value: 'perpignan',   label: 'Perpignan (H3)' },
];

const TERRAIN_OPTS = [
  { value: 'campagne',     label: 'Campagne' },
  { value: 'suburbain',    label: 'Péri-urbain' },
  { value: 'urbain',       label: 'Urbain' },
  { value: 'centre_ville', label: 'Centre-ville' },
] as const;

const USAGE_OPTS = [
  { value: 'logement', label: 'Logement' },
  { value: 'bureau',   label: 'Bureau' },
  { value: 'mixte',    label: 'Mixte' },
] as const;

export function ClimateSection() {
  const config = useBuildingStore((s) => s.config);
  const updateTerrain = useBuildingStore((s) => s.updateTerrain);
  const { terrain } = config;

  return (
    <div className="space-y-3">
      <MaterialDropdown
        label="Ville / Zone climatique"
        value={terrain.climateCity}
        options={CITY_OPTS}
        onChange={(v) => updateTerrain({ climateCity: v })}
        hint="Les données TMY sont chargées automatiquement"
      />

      <ToggleGroup
        label="Contexte terrain"
        value={terrain.terrain}
        options={TERRAIN_OPTS as unknown as Array<{ value: string; label: string }>}
        onChange={(v) => updateTerrain({ terrain: v as typeof terrain.terrain })}
      />

      <ToggleGroup
        label="Usage"
        value={terrain.usage}
        options={USAGE_OPTS as unknown as Array<{ value: string; label: string }>}
        onChange={(v) => updateTerrain({ usage: v as typeof terrain.usage })}
      />
    </div>
  );
}
