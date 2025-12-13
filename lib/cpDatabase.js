// ===== CP Elemen: Nilai Agama & Budi Pekerti =====
export const CP_Agama = [
  { id: "AG01", text: "mengenal dan percaya kepada Allah SWT melalui asmaulhusna dan ciptaan-Nya", used: false },
  { id: "AG02", text: "mengenal Al-Qur’an dan Al-Hadis sebagai pedoman hidupnya", used: false },
  { id: "AG03", text: "mempraktikkan ibadah sehari-hari dengan tuntunan orang dewasa", used: false },
  { id: "AG04", text: "membiasakan berakhlak karimah di lingkungan rumah, madrasah, dan lingkungan sekitarnya dengan menghargai perbedaan", used: false },
  { id: "AG05", text: "meneladani kisah Nabi Muhammad SAW dan para sahabat serta cerita-cerita islami", used: false },
  { id: "AG06", text: "mengenal kosa kata bahasa Arab secara sederhana", used: false },
  { id: "AG07", text: "berpartisipasi aktif dalam menjaga kebersihan, kesehatan, dan keselamatan diri sebagai bentuk rasa sayang terhadap dirinya dan rasa syukur kepada Allah SWT", used: false },
  { id: "AG08", text: "murid menghargai alam dengan cara merawatnya dan menunjukkan rasa sayang terhadap makhluk hidup yang merupakan ciptaan Allah SWT", used: false },
];

// ===== CP Elemen: Jati Diri =====
export const CP_Jatidiri = [
  { id: "JD01", text: "mengenali identitas dirinya yang terbentuk oleh karakteristik fisik, gender, minat, kebutuhan, agama dan sosial budaya", used: false },
  { id: "JD02", text: "mengenali kebiasaan-kebiasaan di lingkungan keluarga, satuan pendidikan, dan masyarakat", used: false },
  { id: "JD03", text: "mengenali, mengekspresikan, dan mengelola emosi diri, serta membangun hubungan sosial secara sehat", used: false },
  { id: "JD04", text: "mengenali perannya sebagai bagian dari keluarga, madarasah, masyarakat dan warga negara Indonesia sehingga dapat menyesuaikan diri dengan lingkungan, aturan dan norma yang berlaku, dan mengetahui keberadaan negara lain di dunia", used: false },
  { id: "JD05", text: "memiliki fungsi gerak (motorik kasar, halus dan taktil) untuk merawat dirinya, membangun kemandirian dan berkegiatan", used: false },
];

// ===== CP Elemen: Dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, Seni =====
export const CP_LiterasiSTEAM = [
  { id: "LS01", text: "mengenali dan memahami berbagai informasi, mengomunikasikan perasaan dan pikiran secara lisan, tulisan, atau menggunakan berbagai media serta membangun percakapan, menunjukkan minat, dan berpartisipasi dalam kegiatan pramembaca", used: false },
  { id: "LS02", text: "memiliki kepekaan bilangan, mengidentifikasi pola, memiliki kesadaran tentang bentuk, posisi, dan ruang, menyadari adanya persamaan dan perbedaan karakteristik antarobjek, mampu melakukan pengukuran dengan satuan tidak baku; dan memiliki kesadaran mengenal waktu", used: false },
  { id: "LS03", text: "mampu mengamati, menyebutkan alasan, pilihan atau keputusannya, mampu memecahkan masalah sederhana, serta mengetahui hubungan sebab akibat atau dari suatu kondisi atau situasi yang dipengaruhi oleh hukum alam dan kondisi sosial", used: false },
  { id: "LS04", text: "menunjukan kemampuan awal menggunakan dan merekayasa teknologi serta untuk mencari informasi, gagasan, dan keterampilan secara aman dan bertanggung jawab", used: false },
  { id: "LS05", text: "mengeksplorasi berbagai proses seni, mengekspresikannya serta mengapresiasi karya seni", used: false },
];

// ===== Gabungan Semua CP =====
export const CP_All = [
  ...CP_Agama,
  ...CP_Jatidiri,
  ...CP_LiterasiSTEAM
];
