// lib/cpPointer.js

// ✅ Pointer CP per domain — default
let cpPointer = {
  agama: 0,
  jatidiri: 0,
  literasi: 0,
};

// ✅ Load pointer dari localStorage jika valid
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("cpPointer");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      cpPointer = {
        agama: Number.isInteger(parsed?.agama) ? parsed.agama : 0,
        jatidiri: Number.isInteger(parsed?.jatidiri) ? parsed.jatidiri : 0,
        literasi: Number.isInteger(parsed?.literasi) ? parsed.literasi : 0,
      };
    } catch (e) {
      // fallback ke default
      cpPointer = { agama: 0, jatidiri: 0, literasi: 0 };
    }
  }
}

// ✅ Simpan pointer ke localStorage
function savePointer() {
  if (typeof window !== "undefined") {
    localStorage.setItem("cpPointer", JSON.stringify(cpPointer));
  }
}

// ✅ Ambil pointer
export function getCPPointer(domain) {
  return Number.isInteger(cpPointer[domain]) ? cpPointer[domain] : 0;
}

// ✅ Maju pointer (rotasi aman)
export function advanceCPPointer(domain, max) {
  if (!(domain in cpPointer)) return;
  if (!Number.isInteger(max) || max <= 0) return;

  cpPointer[domain] = (cpPointer[domain] + 1) % max;
  savePointer();
}

// ✅ Reset pointer
export function resetCPPointer() {
  cpPointer = { agama: 0, jatidiri: 0, literasi: 0 };
  savePointer();
}

// ✅ Clear storage manual
export function clearCPPointerStorage() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cpPointer");
  }
}
