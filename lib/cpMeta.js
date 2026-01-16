// lib/cpMeta.js

import { 
  CP_Agama, 
  CP_Jatidiri, 
  CP_LiterasiSTEAM 
} from "./cpDatabase";

export const CP_META = {};

// Gabungkan semua CP jadi satu lookup
[...CP_Agama, ...CP_Jatidiri, ...CP_LiterasiSTEAM].forEach(cp => {
  CP_META[cp.id === "AG01" ? "syukur_ciptaan_allah" : null];
});

// Manual mapping aman & eksplisit
CP_Agama.forEach(cp => {
  CP_META[cp.id] = cp;
});

CP_Jatidiri.forEach(cp => {
  CP_META[cp.id] = cp;
});

CP_LiterasiSTEAM.forEach(cp => {
  CP_META[cp.id] = cp;
});
