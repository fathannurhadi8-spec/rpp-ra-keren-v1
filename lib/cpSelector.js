// lib/cpSelector.js
// =====================================================
// TIDAK ADA PERUBAHAN
// SUDAH SESUAI DENGAN aiGenerator BARU (CP_LOCK–ONLY)
// =====================================================

import { generateTP } from "./aiGenerator";

// Adapter legacy selector → engine baru (AMAN)
export function pickCP(subtopicData, temaKBC, profilLulusan) {
  const tp = generateTP(subtopicData, temaKBC, profilLulusan);

  if (!tp || !Array.isArray(tp.codes) || tp.codes.length === 0) {
    throw new Error("pickCP failed: invalid TP result");
  }

  return tp.codes;
}
