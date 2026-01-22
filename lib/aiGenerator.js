// lib/aiGenerator.js
// =====================================================
// CP_LOCK–ONLY ENGINE (FINAL)
// TANPA KEYWORD
// TANPA AI FALLBACK
// TANPA CP_PROFILE
// TANPA cpRA
// TANPA SESSION / POINTER LAMA
// =====================================================

import { CP_LOCK } from "./CP_LOCK";
import { CP_META } from "./cpMeta";

// ================= ROTATION STATE =================
const rotationState = {};

// ================= UTIL =================
function normalizeKey(str) {
  return String(str || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

// ================= CP_LOCK ACCESS =================
function getCPLock(topic, subtopic) {
  const tKey = normalizeKey(topic);
  const sKey = normalizeKey(subtopic);

  for (const t in CP_LOCK) {
    if (normalizeKey(t) !== tKey) continue;

    for (const s in CP_LOCK[t]) {
      if (normalizeKey(s) !== sKey) continue;

      const lock = CP_LOCK[t][s];

      return {
        AG: Array.isArray(lock.AG) ? lock.AG : [],
        JD: Array.isArray(lock.JD) ? lock.JD : [],
        LS: Array.isArray(lock.LS) ? lock.LS : [],
      };
    }
  }

  return null;
}

// ================= ROTATOR =================
function rotate(key, list) {
  if (!Array.isArray(list) || list.length === 0) return null;

  const last = rotationState[key] ?? -1;
  const next = (last + 1) % list.length;
  rotationState[key] = next;

  return list[next];
}

// ================= GENERATOR =================
export function generateTP(subtopicData, temaKBC, profilLulusan) {
  const topik = subtopicData?.topicId || "";
  const subtopik = subtopicData?.title || "";

  const locked = getCPLock(topik, subtopik);
  if (!locked) {
    throw new Error("CP_LOCK NOT FOUND");
  }

  const agKey = rotate(`AG|${topik}|${subtopik}`, locked.AG);
  const jdKey = rotate(`JD|${topik}|${subtopik}`, locked.JD);
  const lsKey = rotate(`LS|${topik}|${subtopik}`, locked.LS);

  if (!agKey || !jdKey || !lsKey) {
    throw new Error("CP_ROTATION_FAILED");
  }

  const AG = CP_META[agKey];
  const JD = CP_META[jdKey];
  const LS = CP_META[lsKey];

  if (!AG || !JD || !LS) {
    throw new Error("CP_META_LOOKUP_FAILED");
  }

  const all = [AG, JD, LS];

  return {
    text: `Melalui kegiatan bermain bermakna dengan dukungan guru, murid ${all
      .map((c) => c.text.toLowerCase())
      .join(", ")} dalam pembelajaran tentang ${subtopik.toLowerCase()}, sebagai wujud penguatan karakter ${temaKBC.toLowerCase()} dan pengembangan profil ${profilLulusan}. [${all
      .map((c) => c.id)
      .join(", ")}]`,
    codes: all.map((c) => c.id),
    cps: all.map((c) => c.text),
  };
}

// ================= INDICATORS =================
export function generateIndicators(tpResult) {
  if (!tpResult?.cps) return [];
  return tpResult.cps.map(
    (cp) => `Murid mampu ${cp.toLowerCase()}.`
  );
}
