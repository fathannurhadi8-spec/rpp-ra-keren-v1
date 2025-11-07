// lib/cpSession.js

// Simpan mapping subtopik → { domain, index }
const KEY = "cp_usage_map";

// Ambil data dari sessionStorage
function loadMap() {
  const raw = sessionStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : {};
}

// Simpan data ke sessionStorage
function saveMap(map) {
  sessionStorage.setItem(KEY, JSON.stringify(map));
}

// Cek apakah subtopik sudah dipakai & punya CP
export function getStoredCP(topik, subtopik) {
  const key = `${topik}::${subtopik}`;
  const map = loadMap();
  return map[key] || null;
}

// Simpan CP untuk subtopik baru
export function storeCP(topik, subtopik, domain, index) {
  const key = `${topik}::${subtopik}`;
  const map = loadMap();
  map[key] = { domain, index };
  saveMap(map);
}

// Reset CP saat sesi baru (opsional dipanggil jika kamu mau)
export function resetSessionCP() {
  sessionStorage.removeItem(KEY);
}
