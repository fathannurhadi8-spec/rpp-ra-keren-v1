// lib/generator.js

import topicsData from "./topics";
import { selectKBCMaterial } from "./kbcSelector";
import { pendahuluanSet } from "./pendahuluanBank";
import { penutupSet } from "./penutupBank";

export default function generateRPP(data) {
  const { guru = {}, topik, subtopik } = data;

  const topic = topicsData?.[topik] || {};
  const sub = topic?.subtopics?.[subtopik] || {};

  // === MERGE RULE (ENGINE PRIORITY) ===
  const finalTujuan = data.tujuan || "";
  const finalProfil = data.profilLulusan || topic?.profilLulusan || "";
  const finalTema   = data.temaKBC || topic?.temaKBC || "";

  // === KEGIATAN INTI RAW ===
  let kegiatanIntiRaw = sub?.kegiatanInti || [];
  if (!kegiatanIntiRaw.length) {
    throw new Error(`❌ Kegiatan Inti untuk subtopik "${subtopik}" tidak ditemukan`);
  }

  // repeat pattern to create 6 kegiatan inti (RA weekly plan)
  kegiatanIntiRaw = Array.from(
    { length: 6 },
    (_, i) => kegiatanIntiRaw[i % kegiatanIntiRaw.length]
  );

  // === Build kegiatan inti + dukungan guru ===
  const kegiatan = kegiatanIntiRaw.map((item, idx) => {
    const dukunganGuru = item.kegiatanMain.map((_, i) => ({
      pernyataan: item.pernyataan?.[i] || "",
      pertanyaanPemantik: item.pertanyaan?.[i] || "",
      penguatanSpiritual: item.spiritual || ""
    }));

    return {
      nomor: idx + 1,
      nama: item.judul,
      detail: {
        alat: item.alat,
        kegiatanMain: item.kegiatanMain,
        dukunganGuru
      }
    };
  });

  // === FLATTEN FOR FORMATIF ASESMEN ===
  const semuaKegiatanMain = kegiatanIntiRaw.flatMap(item => item.kegiatanMain);

  // === MATERI INSERSI KBC ===
  const firstInti = kegiatanIntiRaw[0] || {};
  const chosenInsersi = selectKBCMaterial(
    finalTema,
    firstInti.judul || "",
    firstInti.kegiatanMain || []
  );

  const materiInsersi =
    chosenInsersi ||
    `Kegiatan bertema ${finalTema} untuk menumbuhkan ${finalProfil}`;

  // === INDIKATOR (ENGINE PRIORITY) ===
  const indikator =
    Array.isArray(data.indikator) && data.indikator.length
      ? data.indikator
      : [];

  // === Pendahuluan & Penutup Rotation (GUARDED) ===
  const subKeys = Object.keys(topic?.subtopics || {});
  const index = Math.max(0, subKeys.indexOf(subtopik));
  const pendahuluan = pendahuluanSet[index % pendahuluanSet.length];
  const penutup     = penutupSet[index % penutupSet.length];

  // === OUTPUT RPP ===
  return {
    identitas: {
      namaRA: guru?.namaRA || "",
      fase: guru?.fase || "Fondasi",
      kelompok: guru?.kelompok || "",
      tahunAjaran: guru?.tahunAjaran || "",
      alokasiWaktu: guru?.alokasiWaktu || "1 Pekan",
      topik,
      subtopik,
      temaKBC: finalTema,
      profilLulusan: finalProfil,
      materiInsersi,
    },

    tujuanPembelajaran: finalTujuan || "-",
    indikatorTujuanPembelajaran: indikator,

    kegiatanPembelajaran: {
      pendahuluan: pendahuluan.map(a => `${a}`),
      inti: kegiatan,
      penutup: penutup.map(a => `${a}`),
    },

    asesmen: {
      formatif: semuaKegiatanMain,
      sumatif: {
        header: ["Indikator", "BSB", "BSH", "MB", "BB"],
        rows: indikator.map((ik) => [ik, "", "", "", ""]),
      },
    },
  };
}
