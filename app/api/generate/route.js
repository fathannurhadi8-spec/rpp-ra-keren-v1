import { NextResponse } from "next/server";
import generateRPP from "../../../lib/generator";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body?.topik || !body?.subtopik) {
      return NextResponse.json(
        { error: "Topik & Subtopik wajib dipilih" },
        { status: 400 }
      );
    }

    const rpp = generateRPP(body);

    const safeRPP = {
      ...rpp,

      // A. Capaian Pembelajaran = TUJUAN LAMA DARI FORM
      capaianPembelajaran: body.tujuan || "-",

      // B. Tujuan Pembelajaran (BARU)
      tujuanPembelajaran: "Isi disesuaikan dengan pemetaan CP.",

      // C. Indikator Tujuan Pembelajaran
      indikatorTujuanPembelajaran: "Isi disesuaikan dengan kelompok.",

      identitas: rpp.identitas ?? {},
      kegiatanPembelajaran: rpp.kegiatanPembelajaran ?? {},
      asesmen: rpp.asesmen ?? {},
    };

    return NextResponse.json(safeRPP, { status: 200 });
  } catch (err) {
    console.error("❌ Error generate RPP (PREVIEW):", err);
    return NextResponse.json(
      { error: "Gagal generate RPP, cek input atau file topics.js" },
      { status: 500 }
    );
  }
}
