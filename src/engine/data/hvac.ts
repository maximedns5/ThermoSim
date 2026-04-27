// Base de données systèmes CVC
// Sources : EN 14511, EN 14825, fiches fabricants, RE2020

import type { HeatingSystem, CoolingSystem, ECSSystem, VMCSpec } from '../types';

export const HEATING_SYSTEMS: Record<string, HeatingSystem> = {
  // Combustion
  chaudiere_gaz_basse_temp:  { id: 'chaudiere_gaz_basse_temp',  name: 'Chaudière gaz basse température', energy_vector: 'gaz_naturel',      eta_generation: 0.86, eta_distribution: 0.97, eta_emission: 0.95, eta_regulation: 0.97, category: 'combustion' },
  chaudiere_gaz_condensation: { id: 'chaudiere_gaz_condensation', name: 'Chaudière gaz à condensation',   energy_vector: 'gaz_naturel',      eta_generation: 1.05, eta_distribution: 0.97, eta_emission: 0.95, eta_regulation: 0.97, category: 'combustion' },
  chaudiere_fioul_cond:      { id: 'chaudiere_fioul_cond',      name: 'Chaudière fioul condensation',    energy_vector: 'fioul_domestique',  eta_generation: 1.00, eta_distribution: 0.97, eta_emission: 0.95, eta_regulation: 0.97, category: 'combustion' },

  // Électrique direct
  convecteurs_electriques:   { id: 'convecteurs_electriques',   name: 'Convecteurs électriques',         energy_vector: 'electricite',       eta_generation: 1.00, eta_distribution: 1.00, eta_emission: 0.92, eta_regulation: 0.92, category: 'electrique_direct' },
  plancher_electrique:       { id: 'plancher_electrique',       name: 'Plancher chauffant électrique',   energy_vector: 'electricite',       eta_generation: 1.00, eta_distribution: 0.99, eta_emission: 0.97, eta_regulation: 0.97, category: 'electrique_direct' },

  // Pompes à chaleur — EN 14511 à T_source=7°C / T_départ=35°C
  pac_air_eau_inverter:      { id: 'pac_air_eau_inverter',      name: 'PAC air/eau inverter',            energy_vector: 'electricite',       eta_generation: 1.00, eta_distribution: 0.97, eta_emission: 0.97, eta_regulation: 0.97, COP_nominal: 4.0, T_source_nominale: 7, T_depart_nominale: 35, T_bivalence: -7, inverter: true,  category: 'pac' },
  pac_air_eau_onoff:         { id: 'pac_air_eau_onoff',         name: 'PAC air/eau on/off',              energy_vector: 'electricite',       eta_generation: 1.00, eta_distribution: 0.97, eta_emission: 0.97, eta_regulation: 0.97, COP_nominal: 3.5, T_source_nominale: 7, T_depart_nominale: 35, T_bivalence: -5, inverter: false, category: 'pac' },
  pac_air_air:               { id: 'pac_air_air',               name: 'PAC air/air (climatiseur réversible)', energy_vector: 'electricite', eta_generation: 1.00, eta_distribution: 0.95, eta_emission: 0.99, eta_regulation: 0.97, COP_nominal: 3.8, T_source_nominale: 7, T_depart_nominale: 20, T_bivalence: -10, inverter: true, category: 'pac' },
  pac_geothermique:          { id: 'pac_geothermique',          name: 'PAC géothermique sol/eau',        energy_vector: 'electricite',       eta_generation: 1.00, eta_distribution: 0.98, eta_emission: 0.97, eta_regulation: 0.97, COP_nominal: 5.0, T_source_nominale: 10, T_depart_nominale: 35, T_bivalence: -20, inverter: true, category: 'pac' },

  // Biomasse
  chaudiere_granules:        { id: 'chaudiere_granules',        name: 'Chaudière granulés bois',         energy_vector: 'granules_bois',     eta_generation: 0.88, eta_distribution: 0.97, eta_emission: 0.95, eta_regulation: 0.97, category: 'biomasse' },
  insert_bois:               { id: 'insert_bois',               name: 'Insert bois bûches',              energy_vector: 'bois_buches',       eta_generation: 0.75, eta_distribution: 0.85, eta_emission: 0.90, eta_regulation: 0.85, category: 'biomasse' },

  // Réseau de chaleur
  reseau_chaleur_urbain:     { id: 'reseau_chaleur_urbain',     name: 'Réseau de chaleur urbain',        energy_vector: 'reseau_chaleur',    eta_generation: 1.00, eta_distribution: 0.97, eta_emission: 0.95, eta_regulation: 0.97, category: 'reseau' },
};

export const COOLING_SYSTEMS: Record<string, CoolingSystem> = {
  aucune:             { id: 'aucune',             name: 'Aucune climatisation',          EER_nominal: 0,   energy_vector: 'electricite' },
  clim_reversible:    { id: 'clim_reversible',    name: 'Climatiseur réversible inverter', EER_nominal: 4.0, energy_vector: 'electricite', T_source_nominale: 35 },
  clim_centralisee:   { id: 'clim_centralisee',   name: 'Climatisation centralisée',     EER_nominal: 3.2, energy_vector: 'electricite', T_source_nominale: 35 },
};

export const ECS_SYSTEMS: Record<string, ECSSystem> = {
  ballon_electrique:  { id: 'ballon_electrique',  name: 'Ballon électrique',             energy_vector: 'electricite',     COP_or_eta: 0.95 },
  chauffe_eau_thermo: { id: 'chauffe_eau_thermo', name: 'Chauffe-eau thermodynamique',   energy_vector: 'electricite',     COP_or_eta: 2.80 },
  gaz_instantane:     { id: 'gaz_instantane',     name: 'Gaz instantané',                energy_vector: 'gaz_naturel',     COP_or_eta: 0.90 },
  gaz_condensation:   { id: 'gaz_condensation',   name: 'Gaz condensation ECS',          energy_vector: 'gaz_naturel',     COP_or_eta: 1.00 },
  solaire_comb:       { id: 'solaire_comb',        name: 'Solaire combiné (CESI)',        energy_vector: 'solaire',         COP_or_eta: 0.60 },
};

export const VMC_TYPES: Record<string, VMCSpec> = {
  aucune:         { id: 'aucune',         name: 'Aucune (naturelle)',       recup: 0.00, conso_W_m3h: 0.0 },
  vmc_sf_a:       { id: 'vmc_sf_a',       name: 'VMC SF type A',            recup: 0.00, conso_W_m3h: 0.25 },
  vmc_sf_b:       { id: 'vmc_sf_b',       name: 'VMC SF type B',            recup: 0.00, conso_W_m3h: 0.20 },
  vmc_df_standard: { id: 'vmc_df_standard', name: 'VMC DF standard (68 %)', recup: 0.68, conso_W_m3h: 0.40 },
  vmc_df_haut_rdt: { id: 'vmc_df_haut_rdt', name: 'VMC DF haut rendement (85 %)', recup: 0.85, conso_W_m3h: 0.35 },
  vmc_df_passif:  { id: 'vmc_df_passif',  name: 'VMC DF Passivhaus (90 %)', recup: 0.90, conso_W_m3h: 0.30 },
};
