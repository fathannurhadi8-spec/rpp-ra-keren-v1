// lib/cpMeta.js

import {
  CP_Agama,
  CP_Jatidiri,
  CP_LiterasiSTEAM
} from "./cpDatabase.js";

export const CP_META = {};

// ==================
// AGAMA
// ==================
CP_Agama.forEach(cp => {
  CP_META[cp.id] = cp;
});

// ==================
// JATI DIRI
// ==================
CP_Jatidiri.forEach(cp => {
  CP_META[cp.id] = cp;
});

// ==================
// LITERASI & STEAM
// ==================
CP_LiterasiSTEAM.forEach(cp => {
  CP_META[cp.id] = cp;
});
