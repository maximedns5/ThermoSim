// Base de données des matériaux de construction
// Sources : EN ISO 10456:2007, Guide CSTB, RE2020, DTU
// Dernière vérification : 2024

import type { Material } from '../types';

export const MATERIALS_DB: Record<string, Material> = {
  // ── STRUCTURE ──────────────────────────────────────────────────────────
  beton_arme:           { id: 'beton_arme',           name: 'Béton armé',            lambda: 2.30,  rho: 2400, cp: 1000, mu: 130,    eps: 0.92, alpha_sol: 0.60, category: 'structure'    },
  beton_cellulaire:     { id: 'beton_cellulaire',      name: 'Béton cellulaire',      lambda: 0.18,  rho: 600,  cp: 1000, mu: 6,      eps: 0.90, alpha_sol: 0.55, category: 'structure'    },
  beton_banche:         { id: 'beton_banche',          name: 'Béton banché',          lambda: 1.75,  rho: 2300, cp: 1000, mu: 80,     eps: 0.92, alpha_sol: 0.60, category: 'structure'    },

  // ── MAÇONNERIE ─────────────────────────────────────────────────────────
  brique_pleine:        { id: 'brique_pleine',         name: 'Brique pleine',         lambda: 0.84,  rho: 1800, cp: 900,  mu: 10,     eps: 0.93, alpha_sol: 0.70, category: 'maconnerie'   },
  brique_creuse_20cm:   { id: 'brique_creuse_20cm',    name: 'Brique creuse 20 cm',   lambda: 0.44,  rho: 1200, cp: 900,  mu: 10,     eps: 0.93, alpha_sol: 0.70, category: 'maconnerie'   },
  brique_monomur_37cm:  { id: 'brique_monomur_37cm',   name: 'Brique monomur 37 cm',  lambda: 0.12,  rho: 700,  cp: 1000, mu: 8,      eps: 0.93, alpha_sol: 0.70, category: 'maconnerie'   },
  parpaing_creux:       { id: 'parpaing_creux',        name: 'Parpaing creux',        lambda: 1.05,  rho: 1300, cp: 900,  mu: 6,      eps: 0.92, alpha_sol: 0.55, category: 'maconnerie'   },
  pierre_calcaire:      { id: 'pierre_calcaire',       name: 'Pierre calcaire',       lambda: 1.70,  rho: 2200, cp: 1000, mu: 40,     eps: 0.93, alpha_sol: 0.50, category: 'maconnerie'   },
  pierre_granit:        { id: 'pierre_granit',         name: 'Pierre granit',         lambda: 3.50,  rho: 2700, cp: 900,  mu: 10000,  eps: 0.93, alpha_sol: 0.55, category: 'maconnerie'   },

  // ── BOIS ───────────────────────────────────────────────────────────────
  bois_massif_resineux: { id: 'bois_massif_resineux',  name: 'Bois massif résineux',  lambda: 0.15,  rho: 500,  cp: 1600, mu: 50,     eps: 0.90, alpha_sol: 0.50, category: 'bois'         },
  bois_massif_feuillu:  { id: 'bois_massif_feuillu',   name: 'Bois massif feuillu',   lambda: 0.23,  rho: 700,  cp: 1600, mu: 200,    eps: 0.90, alpha_sol: 0.55, category: 'bois'         },
  panneau_osb:          { id: 'panneau_osb',           name: 'Panneau OSB',           lambda: 0.13,  rho: 650,  cp: 1700, mu: 50,     eps: 0.90, alpha_sol: 0.50, category: 'bois'         },
  panneau_ctbh:         { id: 'panneau_ctbh',          name: 'Panneau CTBH',          lambda: 0.15,  rho: 600,  cp: 1600, mu: 150,    eps: 0.90, alpha_sol: 0.50, category: 'bois'         },
  bois_lamelle_colle:   { id: 'bois_lamelle_colle',    name: 'Bois lamellé-collé',    lambda: 0.13,  rho: 500,  cp: 1600, mu: 50,     eps: 0.90, alpha_sol: 0.50, category: 'bois'         },
  fibre_de_bois:        { id: 'fibre_de_bois',         name: 'Fibre de bois',         lambda: 0.042, rho: 160,  cp: 2100, mu: 3,      eps: 0.90, alpha_sol: 0.50, category: 'isolant_bio'  },

  // ── ISOLANTS MINÉRAUX ──────────────────────────────────────────────────
  laine_de_verre_32:    { id: 'laine_de_verre_32',     name: 'Laine de verre 32',     lambda: 0.032, rho: 18,   cp: 840,  mu: 1,      eps: 0.90, alpha_sol: 0.20, category: 'isolant'      },
  laine_de_verre_35:    { id: 'laine_de_verre_35',     name: 'Laine de verre 35',     lambda: 0.035, rho: 25,   cp: 840,  mu: 1,      eps: 0.90, alpha_sol: 0.20, category: 'isolant'      },
  laine_de_verre_40:    { id: 'laine_de_verre_40',     name: 'Laine de verre 40',     lambda: 0.040, rho: 15,   cp: 840,  mu: 1,      eps: 0.90, alpha_sol: 0.20, category: 'isolant'      },
  laine_de_roche_34:    { id: 'laine_de_roche_34',     name: 'Laine de roche 34',     lambda: 0.034, rho: 40,   cp: 840,  mu: 1,      eps: 0.90, alpha_sol: 0.20, category: 'isolant'      },
  laine_de_roche_36:    { id: 'laine_de_roche_36',     name: 'Laine de roche 36',     lambda: 0.036, rho: 30,   cp: 840,  mu: 1,      eps: 0.90, alpha_sol: 0.20, category: 'isolant'      },
  laine_de_roche_40:    { id: 'laine_de_roche_40',     name: 'Laine de roche 40',     lambda: 0.040, rho: 100,  cp: 840,  mu: 1,      eps: 0.90, alpha_sol: 0.20, category: 'isolant'      },
  vermiculite:          { id: 'vermiculite',            name: 'Vermiculite',           lambda: 0.065, rho: 100,  cp: 1080, mu: 3,      eps: 0.90, alpha_sol: 0.30, category: 'isolant'      },
  perlite:              { id: 'perlite',                name: 'Perlite',               lambda: 0.050, rho: 100,  cp: 900,  mu: 2,      eps: 0.90, alpha_sol: 0.30, category: 'isolant'      },

  // ── ISOLANTS SYNTHÉTIQUES ──────────────────────────────────────────────
  polystyrene_expanse:  { id: 'polystyrene_expanse',   name: 'Polystyrène expansé',   lambda: 0.038, rho: 20,   cp: 1450, mu: 60,     eps: 0.60, alpha_sol: 0.30, category: 'isolant'      },
  polystyrene_extrude:  { id: 'polystyrene_extrude',   name: 'Polystyrène extrudé',   lambda: 0.034, rho: 35,   cp: 1450, mu: 150,    eps: 0.60, alpha_sol: 0.30, category: 'isolant'      },
  polyurethane:         { id: 'polyurethane',           name: 'Polyuréthane',          lambda: 0.025, rho: 35,   cp: 1400, mu: 60,     eps: 0.90, alpha_sol: 0.30, category: 'isolant'      },
  mousse_phenolique:    { id: 'mousse_phenolique',      name: 'Mousse phénolique',     lambda: 0.022, rho: 35,   cp: 1400, mu: 50,     eps: 0.90, alpha_sol: 0.30, category: 'isolant'      },
  aerogel:              { id: 'aerogel',                name: 'Aérogel',               lambda: 0.015, rho: 150,  cp: 1000, mu: 5,      eps: 0.90, alpha_sol: 0.20, category: 'isolant'      },

  // ── BIOSOURCÉS ─────────────────────────────────────────────────────────
  laine_de_chanvre:     { id: 'laine_de_chanvre',      name: 'Laine de chanvre',      lambda: 0.042, rho: 40,   cp: 1800, mu: 2,      eps: 0.90, alpha_sol: 0.40, category: 'isolant_bio'  },
  laine_de_mouton:      { id: 'laine_de_mouton',       name: 'Laine de mouton',       lambda: 0.040, rho: 20,   cp: 1720, mu: 2,      eps: 0.90, alpha_sol: 0.40, category: 'isolant_bio'  },
  ouate_de_cellulose:   { id: 'ouate_de_cellulose',    name: 'Ouate de cellulose',    lambda: 0.040, rho: 50,   cp: 2000, mu: 2,      eps: 0.90, alpha_sol: 0.40, category: 'isolant_bio'  },
  liege_expanse:        { id: 'liege_expanse',          name: 'Liège expansé',         lambda: 0.042, rho: 120,  cp: 1560, mu: 15,     eps: 0.90, alpha_sol: 0.50, category: 'isolant_bio'  },
  paille:               { id: 'paille',                 name: 'Paille',                lambda: 0.052, rho: 100,  cp: 2000, mu: 3,      eps: 0.90, alpha_sol: 0.50, category: 'isolant_bio'  },

  // ── FINITIONS ──────────────────────────────────────────────────────────
  platre:               { id: 'platre',                 name: 'Plâtre',                lambda: 0.57,  rho: 1300, cp: 1000, mu: 10,     eps: 0.90, alpha_sol: 0.30, category: 'finition'     },
  plaque_platre_ba13:   { id: 'plaque_platre_ba13',     name: 'Plaque plâtre BA13',    lambda: 0.25,  rho: 900,  cp: 1000, mu: 10,     eps: 0.90, alpha_sol: 0.30, category: 'finition'     },
  enduit_ciment:        { id: 'enduit_ciment',          name: 'Enduit ciment',         lambda: 1.15,  rho: 1900, cp: 1000, mu: 15,     eps: 0.92, alpha_sol: 0.55, category: 'finition'     },
  enduit_chaux:         { id: 'enduit_chaux',           name: 'Enduit chaux',          lambda: 0.87,  rho: 1600, cp: 1000, mu: 10,     eps: 0.92, alpha_sol: 0.50, category: 'finition'     },
  enduit_platre:        { id: 'enduit_platre',          name: 'Enduit plâtre',         lambda: 0.57,  rho: 1300, cp: 1000, mu: 10,     eps: 0.90, alpha_sol: 0.30, category: 'finition'     },
  carrelage:            { id: 'carrelage',              name: 'Carrelage',             lambda: 1.70,  rho: 2300, cp: 900,  mu: 1000,   eps: 0.90, alpha_sol: 0.60, category: 'finition'     },
  parquet_bois:         { id: 'parquet_bois',           name: 'Parquet bois',          lambda: 0.18,  rho: 700,  cp: 1600, mu: 50,     eps: 0.90, alpha_sol: 0.50, category: 'finition'     },

  // ── ÉTANCHÉITÉ ────────────────────────────────────────────────────────
  bitume:               { id: 'bitume',                 name: 'Bitume',                lambda: 0.23,  rho: 1050, cp: 1000, mu: 50000,  eps: 0.92, alpha_sol: 0.90, category: 'etancheite'   },
  membrane_epdm:        { id: 'membrane_epdm',          name: 'Membrane EPDM',         lambda: 0.25,  rho: 1150, cp: 1000, mu: 6000,   eps: 0.92, alpha_sol: 0.85, category: 'etancheite'   },
  pare_vapeur_sd100:    { id: 'pare_vapeur_sd100',      name: 'Pare-vapeur Sd100',     lambda: 0.50,  rho: 900,  cp: 1000, mu: 100000, eps: 0.90, alpha_sol: 0.50, category: 'etancheite'   },

  // ── DIVERS ─────────────────────────────────────────────────────────────
  terre_cuite:          { id: 'terre_cuite',            name: 'Terre cuite',           lambda: 0.65,  rho: 1700, cp: 900,  mu: 10,     eps: 0.93, alpha_sol: 0.65, category: 'divers'       },
  acier:                { id: 'acier',                  name: 'Acier',                 lambda: 50.0,  rho: 7800, cp: 450,  mu: 1e10,   eps: 0.25, alpha_sol: 0.40, category: 'divers'       },
  aluminium:            { id: 'aluminium',              name: 'Aluminium',             lambda: 200.0, rho: 2700, cp: 880,  mu: 1e10,   eps: 0.05, alpha_sol: 0.20, category: 'divers'       },
  lame_air_verticale:   { id: 'lame_air_verticale',     name: "Lame d'air verticale",  lambda: 0.18,  rho: 1.23, cp: 1008, mu: 1,      eps: 0.90, alpha_sol: 0.00, category: 'divers'       },
};

// Groupes pour l'affichage dans les dropdowns
export const MATERIAL_CATEGORIES: Record<string, { label: string; ids: string[] }> = {
  structure:    { label: 'Structure',                ids: ['beton_arme','beton_cellulaire','beton_banche']                                          },
  maconnerie:   { label: 'Maçonnerie',               ids: ['brique_pleine','brique_creuse_20cm','brique_monomur_37cm','parpaing_creux','pierre_calcaire','pierre_granit'] },
  bois:         { label: 'Bois',                     ids: ['bois_massif_resineux','bois_massif_feuillu','panneau_osb','panneau_ctbh','bois_lamelle_colle'] },
  isolant:      { label: 'Isolants minéraux',         ids: ['laine_de_verre_32','laine_de_verre_35','laine_de_verre_40','laine_de_roche_34','laine_de_roche_36','laine_de_roche_40','vermiculite','perlite'] },
  isolant_syn:  { label: 'Isolants synthétiques',     ids: ['polystyrene_expanse','polystyrene_extrude','polyurethane','mousse_phenolique','aerogel'] },
  isolant_bio:  { label: 'Isolants biosourcés',       ids: ['fibre_de_bois','laine_de_chanvre','laine_de_mouton','ouate_de_cellulose','liege_expanse','paille'] },
  finition:     { label: 'Finitions',                 ids: ['platre','plaque_platre_ba13','enduit_ciment','enduit_chaux','enduit_platre','carrelage','parquet_bois'] },
  etancheite:   { label: 'Étanchéité',               ids: ['bitume','membrane_epdm','pare_vapeur_sd100'] },
  divers:       { label: 'Divers',                    ids: ['terre_cuite','acier','aluminium','lame_air_verticale'] },
};
