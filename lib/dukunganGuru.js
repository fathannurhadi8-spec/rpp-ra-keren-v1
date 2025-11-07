// ===== Dukungan Guru Generator FINAL =====
// Rule: 1 kegiatanMain → 1 pernyataan + 1 pertanyaan + 1 penguatanSpiritual
// Style: Islami lembut, apresiatif RA, pakai kata kerja + konteks kegiatan

// (Opsional) Ekstraksi kata kerja/objek – saat ini tidak dipakai langsung,
// tapi disiapkan kalau nanti ingin memperkaya kalimat berbasis konteks spesifik.
function extractAction(text) {
  const kalimat = String(text || "").toLowerCase();
  const actions = [
    "mengamati","menyebut","meniru","bergerak","melompat","mewarnai",
    "menggambar","menempel","membentuk","bercerita","mendengarkan",
    "bermain","menjelajah","membaca","menyusun","mengurutkan",
    "menonton","mendoakan","bersyukur","mencoba"
  ];
  const kata = actions.find(a => kalimat.includes(a)) || "melakukan kegiatan";
  const objek = kalimat
    .replace(/anak|murid|peserta didik|melakukan|kegiatan|bermain/gi, "")
    .replace(kata, "")
    .trim();
  return { kata, objek: objek || "" };
}

export function generateDukungan(kegiatanMain) {
  const text = String(kegiatanMain || "");
  const lower = text.toLowerCase();

  // Pernyataan kandidat (pilih satu)
  let pernyataanPool = [];
  if (/mengamati|melihat|mengenali|menyebut/.test(lower)) {
    pernyataanPool = [
      "MasyaAllah, anak sholeh/sholehah mengamati dengan teliti sekali.",
      "Alhamdulillah, kamu bisa mengenali bentuk dan ciptaan Allah dengan baik.",
      "Wah hebat! Kamu memperhatikan dengan penuh rasa ingin tahu."
    ];
  } else if (/gerak|meniru|melompat|berdiri|menepuk|menari|berlari|membungkuk/.test(lower)) {
    pernyataanPool = [
      "MasyaAllah, gerakanmu penuh semangat dan percaya diri.",
      "Hebat! Anak sholeh/sholehah bisa menirukan gerak dengan baik sekali.",
      "Kamu bergerak dengan kompak dan semangat, ibu/guru bangga."
    ];
  } else if (/mewarnai|menggambar|membentuk|menempel|melipat|meronce/.test(lower)) {
    pernyataanPool = [
      "MasyaAllah, hasil karyamu indah sekali, Allah beri kamu kreativitas bagus.",
      "Wah cantik sekali warnanya, kamu memilih dengan penuh perhatian.",
      "Ibu/guru bangga, kamu berkarya dengan hati yang gembira."
    ];
  } else if (/berbagi|membantu|bergiliran|kerjasama|bekerja sama/.test(lower)) {
    pernyataanPool = [
      "MasyaAllah, kamu mau bekerja sama dengan teman dengan baik.",
      "Bagus sekali, kamu membantu teman dengan hati yang baik.",
      "Ibu/guru bangga, kamu bermain dengan sopan dan ramah."
    ];
  } else if (/bercerita|mendengarkan|menjawab|bertanya|membaca/.test(lower)) {
    pernyataanPool = [
      "MasyaAllah, kamu bercerita dengan jelas sekali.",
      "Kamu menjawab pertanyaan dengan penuh percaya diri.",
      "Bagus, kamu sudah menggunakan kata-kata dengan baik."
    ];
  } else {
    pernyataanPool = [
      "MasyaAllah, usaha anak sholeh/sholehah luar biasa.",
      "Hebat, kamu berani mencoba dan belajar.",
      "Alhamdulillah, kamu serius mengikuti kegiatan."
    ];
  }

  // Pertanyaan pemantik kandidat (pilih satu)
  let tanyaPool = [];
  if (/mengamati|melihat|mengenali|menyebut/.test(lower)) {
    tanyaPool = [
      "Menurut anak sholeh/sholehah, apa yang paling menarik dari yang kamu lihat?",
      "Apa ciptaan Allah yang kamu ingat dari pengamatan ini?",
      "Menurutmu, mengapa Allah ciptakan ini begitu indah?"
    ];
  } else if (/gerak|meniru|melompat|berdiri|menepuk|menari|berlari|membungkuk/.test(lower)) {
    tanyaPool = [
      "Bagaimana cara anak sholeh/sholehah membuat gerakan lebih lembut atau lebih kuat?",
      "Menurutmu, gerakan ini mirip apa ya di alam ciptaan Allah?",
      "Kalau kita ulang lagi, bagaimana gerakan terbaikmu?"
    ];
  } else if (/mewarnai|menggambar|membentuk|menempel|melipat|meronce/.test(lower)) {
    tanyaPool = [
      "Kenapa anak sholeh/sholehah memilih warna ini?",
      "Menurutmu, bagaimana cara membuat karya ini lebih bagus lagi?",
      "Apa bagian ciptaan Allah yang paling kamu suka untuk digambar?"
    ];
  } else if (/berbagi|membantu|bergiliran|kerjasama|bekerja sama/.test(lower)) {
    tanyaPool = [
      "Bagaimana perasaanmu saat membantu teman?",
      "Apa cara terbaik untuk bermain bersama dengan baik?",
      "Menurutmu, mengapa Allah suka anak yang berbagi?"
    ];
  } else if (/bercerita|mendengarkan|menjawab|bertanya|membaca/.test(lower)) {
    tanyaPool = [
      "Bisakah anak sholeh/sholehah ceritakan lebih banyak lagi?",
      "Apa yang paling kamu ingat dari cerita ini?",
      "Bagaimana kalau kita ganti kata-kata jadi lebih indah?"
    ];
  } else {
    tanyaPool = [
      "Apa yang paling kamu suka dari kegiatan ini?",
      "Bagaimana kalau kita coba cara baru lagi?",
      "Apa yang ingin kamu lakukan setelah ini?"
    ];
  }

  // Penguatan spiritual kontekstual (pilih satu)
  let spiritualPool = [];
  if (/mengamati|melihat|mengenali|menyebut/.test(lower)) {
    spiritualPool = [
      "MasyaAllah, Allah memberi kita mata & akal untuk melihat ciptaan-Nya.",
      "Alhamdulillah, pengamatan membuat kita makin kagum pada ciptaan Allah."
    ];
  } else if (/gerak|meniru|melompat|berdiri|menepuk|menari|berlari|membungkuk/.test(lower)) {
    spiritualPool = [
      "Alhamdulillah, Allah beri tubuh yang kuat untuk bergerak dan belajar.",
      "MasyaAllah, gerak yang baik adalah amanah menjaga tubuh dari Allah."
    ];
  } else if (/mewarnai|menggambar|membentuk|menempel|melipat|meronce/.test(lower)) {
    spiritualPool = [
      "MasyaAllah, Allah memberi ilham indah agar kita bisa berkarya.",
      "Alhamdulillah, kreatifitas adalah nikmat yang harus disyukuri."
    ];
  } else if (/berbagi|membantu|bergiliran|kerjasama|bekerja sama/.test(lower)) {
    spiritualPool = [
      "Allah mencintai anak yang suka menolong dan berbagi.",
      "MasyaAllah, kebersamaan adalah berkah dari Allah."
    ];
  } else {
    spiritualPool = [
      "MasyaAllah, Allah beri kita akal dan hati untuk belajar & berbuat baik.",
      "Alhamdulillah, setiap kebaikan adalah ibadah bila niat karena Allah."
    ];
  }

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return {
    pernyataan: pick(pernyataanPool),
    pertanyaanPemantik: pick(tanyaPool),
    penguatanSpiritual: pick(spiritualPool),
    sumber: kegiatanMain
  };
}

// Helper: dari array kegiatanMain → array dukungan (1–1)
export function generateDukunganList(kegiatanMainList = []) {
  return (kegiatanMainList || []).map(km => generateDukungan(km));
}

export default generateDukungan;
