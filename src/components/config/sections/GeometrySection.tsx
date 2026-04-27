import { useBuildingStore } from '../../../store/buildingStore';
import { TechSlider } from '../controls/TechSlider';
import { NumberField } from '../controls/NumberField';
import { ToggleGroup } from '../controls/ToggleGroup';

export function GeometrySection() {
  const config = useBuildingStore((s) => s.config);
  const updateGeometry = useBuildingStore((s) => s.updateGeometry);
  const { geometry } = config;

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-3">
        <NumberField label="Longueur" value={geometry.length} min={5} max={60} step={0.5} unit="m" decimals={1}
          onChange={(v) => updateGeometry({ length: v })} />
        <NumberField label="Largeur" value={geometry.width} min={4} max={30} step={0.5} unit="m" decimals={1}
          onChange={(v) => updateGeometry({ width: v })} />
      </div>
      <TechSlider label="Hauteur sous plafond" value={geometry.floorHeight} min={2.4} max={3.5} step={0.05} unit="m" decimals={2}
        onChange={(v) => updateGeometry({ floorHeight: v })} />
      <NumberField label="Niveaux" value={geometry.nFloors} min={1} max={20} step={1} unit="niv."
        onChange={(v) => updateGeometry({ nFloors: v })} />
      <TechSlider label="Orientation façade princ." value={geometry.orientation} min={0} max={360} step={5} unit="°" decimals={0}
        onChange={(v) => updateGeometry({ orientation: v })} />
    </div>
  );
}
