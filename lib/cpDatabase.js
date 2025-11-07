// ===== CP Elemen: Nilai Agama & Budi Pekerti =====
export const CP_Agama = [
  { id: "AG01", text: "mengenal dan percaya kepada Allah melalui Asmaul Husna dan ciptaan-Nya", used: false },
  { id: "AG02", text: "mengenal Al-Qur’an dan hadis sebagai pedoman hidup", used: false },
  { id: "AG03", text: "mempraktikkan ibadah harian dengan tuntunan orang dewasa", used: false },
  { id: "AG04", text: "membiasakan akhlak karimah dan menghargai perbedaan", used: false },
  { id: "AG05", text: "meneladani kisah Nabi Muhammad saw. dan para sahabat", used: false },
  { id: "AG06", text: "mengenal kosakata bahasa Arab sederhana", used: false },
  { id: "AG07", text: "menjaga kebersihan, kesehatan, dan keselamatan diri sebagai bentuk syukur kepada Allah", used: false },
  { id: "AG08", text: "merawat alam sebagai ciptaan Allah", used: false },
];

// ===== CP Elemen: Jati Diri =====
export const CP_Jatidiri = [
  { id: "JD01", text: "mengenali, mengekspresikan, dan mengelola emosi diri dengan baik", used: false },
  { id: "JD02", text: "menunjukkan perilaku positif dan bangga sebagai anak Indonesia", used: false },
  { id: "JD03", text: "menyesuaikan diri dengan aturan dan norma yang berlaku", used: false },
  { id: "JD04", text: "menggunakan kemampuan motorik untuk eksplorasi dan pengembangan diri", used: false },
];

// ===== CP Elemen: Dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, Seni =====
export const CP_LiterasiSTEAM = [
  { id: "LS01", text: "memahami informasi dan mengomunikasikan gagasan melalui berbagai media", used: false },
  { id: "LS02", text: "menunjukkan minat dalam kegiatan pramembaca dan pramenulis", used: false },
  { id: "LS03", text: "menggunakan konsep pramatematika untuk memecahkan masalah sehari-hari", used: false },
  { id: "LS04", text: "menunjukkan kemampuan berpikir kritis, kreatif, dan kolaboratif", used: false },
  { id: "LS05", text: "melakukan observasi dan eksplorasi fenomena alam dan sosial", used: false },
  { id: "LS06", text: "menggunakan teknologi secara aman dan bertanggung jawab", used: false },
  { id: "LS07", text: "mengekspresikan dan mengapresiasi karya seni", used: false },
];

// ===== Gabungan Semua CP =====
export const CP_All = [
  ...CP_Agama,
  ...CP_Jatidiri,
  ...CP_LiterasiSTEAM
];
