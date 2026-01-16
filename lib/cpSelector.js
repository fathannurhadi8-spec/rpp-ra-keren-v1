// lib/cpSelector.js

import { generateTP } from "./aiGenerator";

// Adapter legacy selector → engine baru
export function pickCP(subtopicData, temaKBC, profilLulusan) {
  const tp = generateTP(subtopicData, temaKBC, profilLulusan);
  return tp.codes; // [AGxx, JDxx, LSxx]
}
