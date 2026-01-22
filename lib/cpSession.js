// lib/cpSession.js
// =====================================================
// DINONAKTIFKAN TOTAL
// CP_LOCK–ONLY ENGINE
// FILE INI DIPERTAHANKAN AGAR TIDAK MERUSAK IMPORT LAMA
// TIDAK ADA STATE
// TIDAK ADA SESSION
// =====================================================

// Semua fungsi dibuat NO-OP (aman, tidak berpengaruh)

export function getStoredCP() {
  return null;
}

export function storeCP() {
  return;
}

export function resetSessionCP() {
  return;
}
