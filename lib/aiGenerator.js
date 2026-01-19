// lib/aiGenerator.js

import { CP_PROFILE } from "./CP_PROFILE";
import { cpRA } from "./topics";
import { getCPPointer, advanceCPPointer } from "./cpPointer";
import { getStoredCP, storeCP } from "./cpSession";
import { CP_META } from "./cpMeta";

// ================= UTIL =================

function normalizeWords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function extractKeywords(subtopicData) {
  let words = [];

  if (subtopicData?.title) {
    words.push(...normalizeWords(subtopicData.title));
  }

  if (Array.isArray(subtopicData?.kegiatanInti)) {
    subtopicData.kegiatanInti.forEach((k) => {
      if (k.judul) {
        words.push(...normalizeWords(k.judul));
      }
      if (Array.isArray(k.kegiatanMain)) {
        k.kegiatanMain.forEach((act) => {
          words.push(...normalizeWords(act));
        });
      }
    });
  }

  return [...new Set(words)];
}

function scoreCP(keywords, profile) {
  let score = 0;

  if (profile.konsep) {
    score += profile.konsep.filter((k) => keywords.includes(k)).length;
  }

  if (profile.aksi) {
    score += profile.aksi.filter((k) => keywords.includes(k)).length;
  }

  return score;
}

function getCandidates(domainKey, keywords) {
  const list = cpRA[domainKey] || [];
  return list.filter((cpKey) => {
    const profile = CP_PROFILE[cpKey];
    if (!profile) return false;
    return scoreCP(keywords, profile) > 0;
  });
}

function pickWithPointer(domainPointerKey, list) {
  if (!list || list.length === 0) return null;
  const idx = getCPPointer(domainPointerKey) % list.length;
  const selected = list[idx];
  advanceCPPointer(domainPointerKey, list.length);
  return selected;
}

// ================= GENERATOR =================

export function generateTP(subtopicData, temaKBC, profilLulusan) {
  const topik = subtopicData?.topicId || "default";
  const subtopik = subtopicData?.title || "";

  // ===== ambil dari session hanya jika VALID =====
  const stored = getStoredCP(topik, subtopik);
  let selected =
    stored &&
    stored.agama &&
    stored.jatiDiri &&
    stored.literasiSTEAM
      ? stored
      : null;

  // ===== generate baru =====
  if (!selected) {
    const keywords = extractKeywords(subtopicData);

    // kandidat berbasis keyword
    const agCandidates = getCandidates("agama", keywords);
    const jdCandidates = getCandidates("jatiDiri", keywords);
    const lsCandidates = getCandidates("literasiSTEAM", keywords);

    // pilih + fallback keras ke seluruh domain
    const agKey =
      pickWithPointer("agama", agCandidates) ??
      pickWithPointer("agama", cpRA.agama);

    const jdKey =
      pickWithPointer("jatidiri", jdCandidates) ??
      pickWithPointer("jatidiri", cpRA.jatiDiri);

    const lsKey =
      pickWithPointer("literasi", lsCandidates) ??
      pickWithPointer("literasi", cpRA.literasiSTEAM);

    // guard final
    if (!agKey || !jdKey || !lsKey) {
      throw new Error("CP selection failed");
    }

    selected = {
      agama: agKey,
      jatiDiri: jdKey,
      literasiSTEAM: lsKey,
    };

    storeCP(topik, subtopik, selected);
  }

  const AG = CP_META[selected.agama];
  const JD = CP_META[selected.jatiDiri];
  const LS = CP_META[selected.literasiSTEAM];

  if (!AG || !JD || !LS) {
    throw new Error("CP_META lookup failed");
  }

  return {
    text: `Melalui kegiatan bermain bermakna dengan dukungan guru, murid ${AG.text.toLowerCase()}, ${JD.text.toLowerCase()}, dan ${LS.text.toLowerCase()} dalam pembelajaran tentang ${subtopik.toLowerCase()}, sebagai wujud penguatan karakter ${temaKBC.toLowerCase()} dan pengembangan profil ${profilLulusan}. [${AG.id}, ${JD.id}, ${LS.id}]`,
    codes: [AG.id, JD.id, LS.id],
    cps: [AG.text, JD.text, LS.text],
  };
}

export function generateIndicators(tpResult) {
  if (!tpResult?.cps) return [];
  return tpResult.cps.map((cp) => `Murid mampu ${cp.toLowerCase()}.`);
}
