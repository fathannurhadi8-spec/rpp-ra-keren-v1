// lib/cpSelector.js

import { generateTP } from "./aiGenerator";

// Adapter legacy selector → engine baru (AMAN)
export function pickCP(subtopicData, temaKBC, profilLulusan) {
  const tp = generateTP(subtopicData, temaKBC, profilLulusan);

  if (!tp || !Array.isArray(tp.codes) || tp.codes.length !== 3) {
    throw new Error("pickCP failed: invalid TP result");
  }

  return tp.codes; // [AGxx, JDxx, LSxx]
}
