// ✅ Pointer CP per domain — default dalam memori
let cpPointer = {
  agama: 0,
  jatidiri: 0,
  literasi: 0,
};

// ✅ Load pointer dari localStorage jika ada
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("cpPointer");
  if (saved) {
    try {
      cpPointer = JSON.parse(saved);
    } catch (e) {}
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
  return cpPointer[domain] ?? 0;
}

// ✅ Maju pointer
export function advanceCPPointer(domain, max) {
  if (!(domain in cpPointer)) return;
  cpPointer[domain] = (cpPointer[domain] + 1) % max;
  savePointer();
}

// ✅ Reset pointer saat user tutup aplikasi
export function resetCPPointer() {
  cpPointer = { agama: 0, jatidiri: 0, literasi: 0 };
  savePointer();
}

// ✅ Optional: manual clear (jaga kalau dibutuhkan)
export function clearCPPointerStorage() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cpPointer");
  }
}
