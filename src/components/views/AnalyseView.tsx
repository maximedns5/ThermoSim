// Onglet Analyse — tous les graphiques en grand + explications
import { useState } from 'react';
import { SankeyEnergy } from '../charts/SankeyEnergy';
import { HeatLossHeatmap } from '../charts/HeatLossHeatmap';
import { TimeSeries24h } from '../charts/TimeSeries24h';
import { TimeSeriesAnnual } from '../charts/TimeSeriesAnnual';
import { GlaserDiagram } from '../charts/GlaserDiagram';
import { HvacPerformance } from '../charts/HvacPerformance';
import { ScenarioRadar } from '../charts/ScenarioRadar';
import { useDerivedMetrics } from '../../hooks/useDerivedMetrics';
import { useBuildingStore } from '../../store/buildingStore';
import { useUIStore } from '../../store/uiStore';
import { HEATING_SYSTEMS } from '../../engine/data/hvac';

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, explain, children }: {
  title: string;
  explain: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-rule bg-paper rounded-sm overflow-hidden">
      <div className="px-4 pt-3 pb-2 border-b border-rule bg-paper-alt">
        <p className="text-xs font-sans font-semibold uppercase tracking-widest text-ink">{title}</p>
        <p className="mt-1 text-xs font-sans text-ink-3 leading-relaxed">{explain}</p>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

// ─── Bloc KPI ─────────────────────────────────────────────────────────────────
function Kpi({ label, value, unit, sub }: { label: string; value: string; unit: string; sub?: string }) {
  return (
    <div className="flex flex-col border border-rule px-4 py-3 bg-paper-alt rounded-sm">
      <span className="text-2xs font-sans uppercase tracking-wider text-ink-4">{label}</span>
      <span className="text-xl font-mono font-bold text-ink leading-tight">
        {value} <span className="text-sm font-normal text-ink-3">{unit}</span>
      </span>
      {sub && <span className="text-xs font-mono text-ink-4">{sub}</span>}
    </div>
  );
}

// ─── Composant principal ──────────────────────────────────────────────────────
export function AnalyseView() {
  const m = useDerivedMetrics();
  const config = useBuildingStore((s) => s.config);
  const { aptSizeM2, setAptSizeM2 } = useUIStore();
  const heatingSys = HEATING_SYSTEMS[config.hvac?.heatingId ?? ''] as { name: string } | undefined;
  const A_floor = config.geometry.length * config.geometry.width;
  const A_total = A_floor * config.geometry.nFloors;

  // Dérivations par appartement
  const nAptPerFloor = Math.max(1, Math.floor(A_floor / aptSizeM2));
  const nAptTotal = nAptPerFloor * config.geometry.nFloors;
  const costPerApt = nAptTotal > 0 ? m.cost_eur / nAptTotal : 0;
  const costPerM2Apt = aptSizeM2 > 0 ? costPerApt / aptSizeM2 : 0;

  // Input local pour l'éditeur apt size
  const [aptInput, setAptInput] = useState(String(aptSizeM2));

  return (
    <div className="h-full overflow-y-auto bg-paper">
      <div className="max-w-5xl mx-auto px-6 py-6 space-y-8">

        {/* ── En-tête ── */}
        <div className="border-b border-rule pb-4">
          <h1 className="text-base font-mono font-bold text-ink uppercase tracking-widest">
            Analyse thermique du bâtiment
          </h1>
          <p className="mt-1 text-xs font-sans text-ink-3">
            Résultats de la simulation régime permanent + dynamique 8760h.
            Lancez « SIM 8760h » pour activer les graphiques dynamiques.
          </p>
        </div>

        {/* ── KPIs synthèse ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Kpi label="U paroi" value={m.U_wall.toFixed(3)} unit="W/(m²·K)"
            sub={`R = ${m.R_wall.toFixed(2)} m²·K/W`} />
          <Kpi label="Q design" value={(m.Q_design_W / 1000).toFixed(1)} unit="kW"
            sub="puiss. max hiver" />
          <Kpi label="Ep primaire" value={m.EP_m2.toFixed(0)} unit="kWhEP/(m²·an)"
            sub={`DPE : ${m.dpe}`} />
          <Kpi label="CO₂" value={m.CO2_m2.toFixed(1)} unit="kgCO₂/(m²·an)" />
          <Kpi label="Coût total/an" value={m.cost_eur.toFixed(0)} unit="€/an"
            sub={`${heatingSys?.name ?? '—'}`} />
          <Kpi label="Surface totale" value={A_total.toFixed(0)} unit="m²"
            sub={`${config.geometry.nFloors} étage(s)`} />
        </div>

        {/* ── Calculateur coût par appartement ── */}
        <div className="border border-rule bg-paper rounded-sm overflow-hidden">
          <div className="px-4 pt-3 pb-2 border-b border-rule bg-paper-alt">
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-ink">Coût par appartement</p>
            <p className="mt-1 text-xs font-sans text-ink-3 leading-relaxed">
              Renseignez la surface type d'un appartement pour estimer le coût annuel chauffage + ECS par logement.
            </p>
          </div>
          <div className="p-4 space-y-4">
            {/* Saisie taille apt */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-mono text-ink-3 shrink-0">Surface appartement</label>
              <input
                type="number"
                min={10}
                max={500}
                step={5}
                value={aptInput}
                onChange={(e) => setAptInput(e.target.value)}
                onBlur={() => {
                  const v = parseFloat(aptInput);
                  if (!isNaN(v) && v >= 10) { setAptSizeM2(v); setAptInput(String(v)); }
                  else setAptInput(String(aptSizeM2));
                }}
                className="w-24 border border-rule bg-paper px-2 py-1 text-sm font-mono text-ink focus:outline-none focus:border-ink"
              />
              <span className="text-xs font-mono text-ink-4">m²</span>
            </div>

            {/* Résultats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Kpi label="Apts / étage" value={String(nAptPerFloor)} unit=""
                sub={`${A_floor.toFixed(0)} m² ÷ ${aptSizeM2} m²`} />
              <Kpi label="Apts total" value={String(nAptTotal)} unit=""
                sub={`${config.geometry.nFloors} niv.`} />
              <Kpi label="Coût / apt / an" value={costPerApt.toFixed(0)} unit="€/an"
                sub={`${heatingSys?.name ?? '—'}`} />
              <Kpi label="Coût / m² apt" value={costPerM2Apt.toFixed(1)} unit="€/(m²·an)"
                sub="chauffage + ECS" />
            </div>

            <p className="text-xs font-sans text-ink-4 leading-relaxed">
              <strong>Méthode :</strong> le nombre d'appartements par étage est calculé par
              {' '}<em>floor(S_plancher ÷ S_apt)</em> — sans déduire les circulations.
              Le coût total annuel est divisé équitablement entre tous les appartements.
              Ce coût couvre uniquement le chauffage et l'eau chaude sanitaire.
            </p>
          </div>
        </div>

        {/* ── Explications coût ── */}
        <div className="p-4 bg-paper-alt border border-rule text-xs font-sans text-ink-3 leading-relaxed space-y-1">
          <p className="font-semibold text-ink">Comment est calculé le coût annuel ?</p>
          <p>
            1. On calcule les <strong>besoins de chauffage</strong> (kWh/an) via les degrés-jours unifiés (DJU 2500 par défaut)
            depuis la puissance de déperditions Q_design et l'enveloppe du bâtiment.
          </p>
          <p>
            2. On divise par le <strong>rendement</strong> du système de chauffage choisi (COP PAC, η chaudière…)
            pour obtenir l'énergie finale consommée (kWh EF).
          </p>
          <p>
            3. On ajoute une estimation de l'<strong>ECS</strong> (eau chaude sanitaire, EN 15316 : ≈ 35 kWh/m²/an
            divisé par le rendement ECS).
          </p>
          <p>
            4. L'énergie finale est multipliée par le <strong>prix unitaire</strong> du vecteur énergétique
            (ex. électricité ≈ 0,228 €/kWh, gaz ≈ 0,119 €/kWh).
            <em> Ce coût couvre uniquement le chauffage + ECS, pas les autres usages électriques.</em>
          </p>
        </div>

        {/* ── Flux de pertes ── */}
        <Section
          title="Flux de pertes thermiques — régime permanent"
          explain={
            <>
              Ce diagramme montre comment les <strong>déperditions totales</strong> du bâtiment (en W, pour le jour
              de pointe hivernal) se répartissent entre les cinq postes : parois, fenêtres, toiture, plancher bas
              et ventilation. La largeur de chaque bande est proportionnelle à la part du poste.
              <br />
              <strong>Comment le lire :</strong> le nœud de gauche (carré) représente la puissance totale à fournir
              par le système de chauffage. Les bandes qui partent vers la droite représentent les chemins de fuite
              de la chaleur. Plus une bande est large, plus ce poste contribue aux pertes.
            </>
          }
        >
          <div className="max-w-lg"><SankeyEnergy /></div>
        </Section>

        {/* ── Heatmap ── */}
        <Section
          title="Heatmap besoins de chauffage — 8760h"
          explain={
            <>
              Chaque pixel représente <strong>1 heure</strong> de l'année.
              <strong> Axe horizontal</strong> = 365 jours (janvier à gauche, décembre à droite).
              <strong> Axe vertical</strong> = 24 heures de la journée (0h en haut, 23h en bas).
              <strong> Couleur</strong> = puissance de chauffe nécessaire : blanc ≈ 0 W (pas de chauffage),
              bleu foncé = forte demande.
              <br />
              Les zones blanches en été montrent l'absence de besoin de chauffe. Les bandes sombres
              en janvier/février correspondent aux nuits froides. Si vous voyez des colonnes sombres isolées,
              ce sont des vagues de froid passagères.
            </>
          }
        >
          <HeatLossHeatmap />
        </Section>

        {/* ── Profil 24h + PMV ── */}
        <Section
          title="Profil moyen journalier — température & confort"
          explain={
            <>
              Moyenne horaire sur l'année entière. La <strong>courbe pleine</strong> est la température intérieure
              T_zone (°C) — elle montre si le système de chauffage maintient bien la consigne.
              La <strong>courbe pointillée</strong> est le PMV (Predicted Mean Vote, ISO 7730) :
              0 = confort neutre, −3 = froid, +3 = chaud. Visez −0,5 à +0,5 pour un bâtiment confortable.
            </>
          }
        >
          <div className="max-w-lg"><TimeSeries24h /></div>
        </Section>

        {/* ── Série annuelle ── */}
        <Section
          title="Évolution annuelle — température & chauffe"
          explain={
            <>
              Série temporelle 8760h. La <strong>courbe pleine (°C)</strong> est la température intérieure T_zone
              au fil de l'année. La <strong>courbe pointillée (kW)</strong> est la puissance de chauffage Q_heat :
              elle monte en hiver et tombe à zéro en été. Les pics correspondent aux nuits les plus froides.
              Cette vue permet de vérifier que le bâtiment ne surchauffe pas en été (T_zone ne doit pas dépasser
              26–28 °C prolongés).
            </>
          }
        >
          <div className="max-w-lg"><TimeSeriesAnnual /></div>
        </Section>

        {/* ── Diagramme de Glaser ── */}
        <Section
          title="Diagramme de Glaser — risque de condensation"
          explain={
            <>
              Ce diagramme analyse le risque de <strong>condensation dans la paroi</strong> en régime permanent
              hivernal (hypothèse : T_ext = −5 °C, HR_ext = 80 %, T_int = 20 °C, HR_int = 50 %).
              <br />
              <strong>Axe X</strong> : épaisseur de la paroi de l'extérieur (EXT) vers l'intérieur (INT).
              <br />
              <strong>Courbe p_sat (trait plein)</strong> : pression de vapeur saturante — elle suit le profil
              de température dans la paroi. Si la température baisse en allant vers l'extérieur, p_sat baisse aussi.
              <br />
              <strong>Courbe p_v (tirets)</strong> : pression de vapeur réelle calculée par la méthode de Glaser.
              <br />
              <strong>Risque</strong> : si p_v &gt; p_sat en un point, la vapeur se condense dans la paroi
              → risque de moisissures et dégradation de l'isolant. Assurez-vous que p_v reste toujours en dessous
              de p_sat.
            </>
          }
        >
          <div className="max-w-sm"><GlaserDiagram /></div>
        </Section>

        {/* ── COP PAC ── */}
        <Section
          title="Performance PAC — COP selon T source"
          explain={
            <>
              Courbe de COP (Coefficient de Performance) de la pompe à chaleur en fonction de la
              <strong> température de la source froide</strong> (T_ext pour une PAC air/air ou air/eau).
              Un COP de 3 signifie que la PAC fournit 3 kWh de chaleur pour 1 kWh d'électricité consommé.
              <br />
              Plus il fait froid dehors, plus le COP chute — c'est pourquoi les PAC fonctionnent moins bien
              par grand froid. La zone grisée indique la plage de températures habituellement rencontrée sur le
              site climatique choisi.
            </>
          }
        >
          <div className="max-w-sm"><HvacPerformance /></div>
        </Section>

        {/* ── Radar scénarios ── */}
        <Section
          title="Radar multi-critères"
          explain={
            <>
              Vue synthétique en étoile sur 6 critères normalisés (0 = mauvais, 1 = excellent) :
              isolation thermique, performance des vitrages, efficacité du système HVAC, étanchéité à l'air,
              inertie thermique et DPE. Permet de comparer rapidement les forces et faiblesses du bâtiment
              et d'identifier les postes prioritaires à améliorer.
            </>
          }
        >
          <div className="max-w-xs"><ScenarioRadar /></div>
        </Section>

        {/* ── Explication Coupe & Plan ── */}
        <div className="p-4 bg-paper-alt border border-rule text-xs font-sans text-ink-3 leading-relaxed space-y-3">
          <p className="font-semibold text-ink text-sm">À quoi servent les onglets Coupe et Plan ?</p>
          <p>
            <strong>COUPE</strong> — Vue en coupe verticale du bâtiment. Elle montre, du sol jusqu'au toit,
            l'empilement des couches de la paroi extérieure (béton, isolant, enduit…) avec leurs épaisseurs et
            conductivités thermiques (λ). Elle permet de vérifier visuellement la cohérence de la composition
            de paroi et d'estimer l'épaisseur totale.
          </p>
          <p>
            <strong>PLAN</strong> — Vue en plan horizontal (comme si on coupait le bâtiment à mi-hauteur et qu'on
            regardait de dessus). Elle montre la géométrie du bâtiment, l'orientation, et la composition de la
            paroi nord couche par couche. Utile pour vérifier le ratio de surface vitrée et l'orientation solaire.
          </p>
        </div>

      </div>
    </div>
  );
}
