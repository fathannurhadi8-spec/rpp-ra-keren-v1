// lib/cpMeta.js

import {
  CP_Agama,
  CP_Jatidiri,
  CP_LiterasiSTEAM
} from "./cpDatabase";

export const CP_META = {};

// ==================
// AGAMA
// ==================
CP_META["syukur_ciptaan_allah"] = CP_Agama.find(cp => cp.id === "AG01");
CP_META["adab_ibadah"] = CP_Agama.find(cp => cp.id === "AG03");
CP_META["asmaul_husna"] = CP_Agama.find(cp => cp.id === "AG01");
CP_META["doa_harian"] = CP_Agama.find(cp => cp.id === "AG03");
CP_META["akhlak_karimah"] = CP_Agama.find(cp => cp.id === "AG04");
CP_META["menyayangi_makhluk"] = CP_Agama.find(cp => cp.id === "AG08");
CP_META["kebersihan_dan_kesehatan_sebagai_ibadah"] = CP_Agama.find(cp => cp.id === "AG07");
CP_META["menghargai_perbedaan"] = CP_Agama.find(cp => cp.id === "AG04");
CP_META["mengenal_alquran_hadis"] = CP_Agama.find(cp => cp.id === "AG02");

// ==================
// JATI DIRI
// ==================
CP_META["regulasi_emosi"] = CP_Jatidiri.find(cp => cp.id === "JD03");
CP_META["percaya_diri"] = CP_Jatidiri.find(cp => cp.id === "JD01");
CP_META["tanggung_jawab"] = CP_Jatidiri.find(cp => cp.id === "JD04");
CP_META["gotong_royong"] = CP_Jatidiri.find(cp => cp.id === "JD04");
CP_META["kepatuhan_aturan"] = CP_Jatidiri.find(cp => cp.id === "JD02");
CP_META["motorik_kasar"] = CP_Jatidiri.find(cp => cp.id === "JD05");
CP_META["motorik_halus"] = CP_Jatidiri.find(cp => cp.id === "JD05");
CP_META["identitas_diri"] = CP_Jatidiri.find(cp => cp.id === "JD01");
CP_META["bangga_jadi_anak_indonesia"] = CP_Jatidiri.find(cp => cp.id === "JD04");

// ==================
// LITERASI & STEAM
// ==================
CP_META["observasi"] = CP_LiterasiSTEAM.find(cp => cp.id === "LS03");
CP_META["klasifikasi"] = CP_LiterasiSTEAM.find(cp => cp.id === "LS03");
CP_META["komunikasi_lisan"] = CP_LiterasiSTEAM.find(cp => cp.id === "LS01");
CP_META["ekspresi_seni"] = CP_LiterasiSTEAM.find(cp => cp.id === "LS05");
CP_META["eksperimen"] = CP_LiterasiSTEAM.find(cp => cp.id === "LS03");
CP_META["pra_matematika"] = CP_LiterasiSTEAM.find(cp => cp.id === "LS02");
CP_META["pra_membaca"] = CP_LiterasiSTEAM.find(cp => cp.id === "LS01");
CP_META["pra_menulis"] = CP_LiterasiSTEAM.find(cp => cp.id === "LS01");
CP_META["teknologi_sederhana"] = CP_LiterasiSTEAM.find(cp => cp.id === "LS04");
CP_META["rasa_ingin_tahu"] = CP_LiterasiSTEAM.find(cp => cp.id === "LS03");
