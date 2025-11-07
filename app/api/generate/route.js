import { NextResponse } from "next/server";
import generateRPP from "../../../lib/generator";

export async function POST(req) {
  try {
    const body = await req.json();

    // ✅ Validasi input sederhana
    if (!body?.topik || !body?.subtopik) {
      return NextResponse.json(
        { error: "Topik & Subtopik wajib dipilih" },
        { status: 400 }
      );
    }

    // ✅ Generate RPP final (form override topics)
    const rpp = generateRPP(body);

    // ✅ Pastikan struktur aman
    const safeRPP = {
      ...rpp,
      identitas: rpp.identitas ?? {},
      tujuanPembelajaran: rpp.tujuanPembelajaran ?? "-",
      indikatorTujuanPembelajaran: Array.isArray(rpp.indikatorTujuanPembelajaran)
        ? rpp.indikatorTujuanPembelajaran
        : [],
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
