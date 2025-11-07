// lib/aiGenerator.js
import { 
  CP_Agama, 
  CP_Jatidiri, 
  CP_LiterasiSTEAM 
} from "./cpDatabase";

import { 
  getCPPointer, 
  advanceCPPointer 
} from "./cpPointer";

// --- Domain ALWAYS 3 ---
const domains = [
  { key:"agama", list:CP_Agama },
  { key:"jatidiri", list:CP_Jatidiri },
  { key:"literasi", list:CP_LiterasiSTEAM },
];

// ✅ Ambil 1 CP tiap domain (AG, JD, LS)
function getNextCPSet() {
  return domains.map(({ key, list }) => {
    const idx = getCPPointer(key);
    const item = list[idx];
    advanceCPPointer(key, list.length);
    return item;
  });
}

// ✅ Generate Tujuan Pembelajaran
export function generateTP(subtopik, temaKBC, profilLulusan) {
  const [AG, JD, LS] = getNextCPSet();

  return {
    text: `Melalui kegiatan bermain bermakna dengan dukungan guru, murid ${AG.text.toLowerCase()}, ${JD.text.toLowerCase()}, dan ${LS.text.toLowerCase()} dalam pembelajaran tentang ${subtopik.toLowerCase()}, sebagai wujud penguatan karakter ${temaKBC.toLowerCase()} dan pengembangan profil ${profilLulusan}. [${AG.id}, ${JD.id}, ${LS.id}]`,
    codes: [AG.id, JD.id, LS.id],
    cps: [AG.text, JD.text, LS.text]
  };
}

// ✅ Generate Indikator dari CP TP
export function generateIndicators(tpResult) {
  if (!tpResult?.cps) return [];

  return tpResult.cps.map(cp => `Murid mampu ${cp.toLowerCase()}.`);
}
