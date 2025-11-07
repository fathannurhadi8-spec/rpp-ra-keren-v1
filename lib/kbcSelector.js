import { KBC_Paten } from "./kbcPaten";

// Kata kunci untuk match konteks
const themesKeywords = {
  "Cinta Allah dan Rasul-Nya": ["Allah", "doa", "asmaul", "syukur", "rasul", "shalat", "ibadah", "adil", "akhlak"],
  "Cinta Ilmu": ["belajar", "membaca", "tanya", "eksperimen", "mencoba", "menulis", "sains", "teknologi", "literasi"],
  "Cinta Lingkungan": ["tanaman", "air", "kebun", "alam", "bersih", "sampah", "daun", "hewan", "tanah", "taman"],
  "Cinta Diri dan Sesama": ["teman", "bantu", "berbagi", "adab", "kebaikan", "emosi", "sabar", "syukur", "tolong"],
  "Cinta Tanah Air": ["bendera", "indonesia", "gotong", "lagu", "pahlawan", "budaya", "kerja bakti"]
};

// Clean text → keyword list
const extractKeywords = (text) =>
  text.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "").split(" ");

export function selectKBCMaterial(tema, judul, kegiatanMain = []) {
  const sources = KBC_Paten[tema] || [];
  if (!sources.length) return "";

  const activityText = [judul, ...kegiatanMain].join(" ");
  const activityWords = extractKeywords(activityText);

  let best = sources[0];
  let bestScore = -1;

  for (const item of sources) {
    let score = 0;
    for (const word of activityWords) {
      if (themesKeywords[tema].includes(word)) score++;
    }
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }

  return best || sources[0] || "";
}
