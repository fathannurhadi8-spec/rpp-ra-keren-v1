// lib/cpSession.js

const KEY = "cp_usage_map";

// Load session map
function loadMap() {
  const raw = sessionStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : {};
}

// Save session map
function saveMap(map) {
  sessionStorage.setItem(KEY, JSON.stringify(map));
}

// Get stored CP set for a subtopic
export function getStoredCP(topik, subtopik) {
  const key = `${topik}::${subtopik}`;
  const map = loadMap();
  return map[key] || null;
}

// Store CP set for a subtopic
// cpSet = { agama, jatiDiri, literasiSTEAM }
export function storeCP(topik, subtopik, cpSet) {
  const key = `${topik}::${subtopik}`;
  const map = loadMap();
  map[key] = cpSet;
  saveMap(map);
}

// Reset CP session
export function resetSessionCP() {
  sessionStorage.removeItem(KEY);
}
