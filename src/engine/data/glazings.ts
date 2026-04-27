// Base de données vitrages et cadres
// Sources : certifications CEKAL / ACOTHERM, EN ISO 10077, RE2020

import type { Glazing, Frame } from '../types';

export const GLAZING_DB: Record<string, Glazing> = {
  // Simple vitrage
  simple_4mm:           { id: 'simple_4mm',          name: 'Simple vitrage 4 mm',           Ug: 5.7, Uw: 5.1, g: 0.85, TL: 0.89, glazingType: 'simple' },

  // Double vitrage air
  double_4_12_4_air:    { id: 'double_4_12_4_air',   name: 'Double 4/12/4 air',             Ug: 2.9, Uw: 2.4, g: 0.75, TL: 0.80, glazingType: 'double' },
  double_4_16_4_air:    { id: 'double_4_16_4_air',   name: 'Double 4/16/4 air',             Ug: 2.7, Uw: 2.3, g: 0.75, TL: 0.80, glazingType: 'double' },

  // Double vitrage argon
  double_4_16_4_argon:  { id: 'double_4_16_4_argon', name: 'Double 4/16/4 argon',           Ug: 2.5, Uw: 2.1, g: 0.75, TL: 0.80, glazingType: 'double' },
  double_be_argon:      { id: 'double_be_argon',     name: 'Double BE 4/16/4 argon Low-E',  Ug: 1.1, Uw: 1.3, g: 0.60, TL: 0.72, glazingType: 'double' },
  double_be_argon_solar:{ id: 'double_be_argon_solar',name: 'Double BE contrôle solaire',   Ug: 1.1, Uw: 1.3, g: 0.37, TL: 0.64, glazingType: 'double' },

  // Triple vitrage
  triple_be_argon:      { id: 'triple_be_argon',     name: 'Triple BE 4/12/4/12/4 argon',   Ug: 0.6, Uw: 0.8, g: 0.50, TL: 0.65, glazingType: 'triple' },
  triple_be_krypton:    { id: 'triple_be_krypton',   name: 'Triple BE krypton passif',      Ug: 0.5, Uw: 0.7, g: 0.52, TL: 0.68, glazingType: 'triple' },
};

export const FRAME_DB: Record<string, Frame> = {
  alu_standard:   { id: 'alu_standard',   name: 'Aluminium standard',       Uf: 5.0, material: 'alu'     },
  alu_rupt:       { id: 'alu_rupt',       name: 'Aluminium rupture thermique', Uf: 2.0, material: 'alu_rupt' },
  pvc_2rail:      { id: 'pvc_2rail',      name: 'PVC 2 rails',              Uf: 2.2, material: 'pvc'     },
  pvc_3rail:      { id: 'pvc_3rail',      name: 'PVC 3 rails',              Uf: 1.7, material: 'pvc'     },
  bois_chene:     { id: 'bois_chene',     name: 'Bois chêne',               Uf: 1.5, material: 'bois'    },
  bois_alu:       { id: 'bois_alu',       name: 'Bois-aluminium',           Uf: 1.3, material: 'bois_alu'},
};
