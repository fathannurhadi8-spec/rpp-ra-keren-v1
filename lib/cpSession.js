// lib/cpSession.js

const KEY = "cp_usage_map";

// ===== internal util =====
function isBrowser() {
  return typeof window !== "undefined" && typeof sessionStorage !== "undefined";
}

function isValidCPSet(cpSet) {
  return (
    cpSet &&
    typeof cpSet === "object" &&
    typeof cpSet.agama === "string" &&
    typeof cpSet.jatiDiri === "string" &&
    typeof cpSet.literasiSTEAM === "string"
  );
}

// ===== storage =====
function loadMap() {
  if (!isBrowser()) return {};
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function saveMap(map) {
  if (!isBrowser()) return;
  sessionStorage.setItem(KEY, JSON.stringify(map));
}

// ===== public API =====
export function getStoredCP(topik, subtopik) {
  if (!topik || !subtopik) return null;
  const key = `${topik}::${subtopik}`;
  const map = loadMap();
  const value = map[key];
  return isValidCPSet(value) ? value : null;
}

export function storeCP(topik, subtopik, cpSet) {
  if (!isBrowser()) return;
  if (!topik || !subtopik) return;
  if (!isValidCPSet(cpSet)) return;

  const key = `${topik}::${subtopik}`;
  const map = loadMap();
  map[key] = cpSet;
  saveMap(map);
}

export function resetSessionCP() {
  if (!isBrowser()) return;
  sessionStorage.removeItem(KEY);
}
