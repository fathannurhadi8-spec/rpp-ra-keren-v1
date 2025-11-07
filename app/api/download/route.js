import { NextResponse } from "next/server";
import {
  Document,
  Packer,
  Paragraph,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  TextRun,
} from "docx";
import generateRPP from "../../../lib/generator"; // ✅ sudah membaca langsung dari topics.js

// Helper paragraph biasa
const p = (text) =>
  new Paragraph({
    children: [new TextRun({ text, font: "Cambria", size: 24 })],
    spacing: { after: 120 },
  });

// Helper paragraph bold
const pb = (text) =>
  new Paragraph({
    children: [new TextRun({ text, bold: true, font: "Cambria", size: 24 })],
    spacing: { after: 120 },
  });

// Fungsi untuk bikin nama file aman
const safe = (s) => (s || "").replace(/[^a-z0-9-_]+/gi, "_").slice(0, 60);

export async function POST(req) {
  try {
    const body = await req.json();
    const rpp = generateRPP(body); // ✅ data lengkap dari generator.js (langsung dari topics.js)

    const indikator   = rpp.indikatorTujuanPembelajaran || [];
    const inti        = rpp.kegiatanPembelajaran.inti || [];
    const pendahuluan = rpp.kegiatanPembelajaran.pendahuluan || [];
    const penutup     = rpp.kegiatanPembelajaran.penutup || [];

    // ===== KEGIATAN INTI =====
    const kegiatan = inti.map((k, idx) => {
      const dukunganList = [];

      // Judul kegiatan inti
      dukunganList.push(
        new Paragraph({
          children: [
            new TextRun({ text: `Kegiatan Inti ${idx + 1}: `, bold: true, font: "Cambria", size: 24 }),
            new TextRun({ text: k.nama, font: "Cambria", size: 24 }),
          ],
          spacing: { before: 200, after: 100 },
        })
      );

      // Alat & bahan
      dukunganList.push(
        new Paragraph({
          children: [
            new TextRun({ text: "Alat & Bahan: ", bold: true, font: "Cambria", size: 24 }),
            new TextRun({ text: k.detail.alat, font: "Cambria", size: 24 }),
          ],
        })
      );

      // ✅ Dukungan Guru (langsung dari topics.js)
      dukunganList.push(pb("Dukungan Guru:"));

      dukunganList.push(pb("Pernyataan Guru:"));
      dukunganList.push(...k.detail.dukunganGuru.map(d => p(`• ${d.pernyataan}`)));

      dukunganList.push(pb("Pertanyaan Pemantik:"));
      dukunganList.push(...k.detail.dukunganGuru.map(d => p(`• ${d.pertanyaanPemantik}`)));

      dukunganList.push(pb("Penguatan Spiritual:"));
      dukunganList.push(p(`• ${k.detail.dukunganGuru[0]?.penguatanSpiritual || ""}`));

      // Foto dokumentasi slot (tetap)
      dukunganList.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Penataan Alat & Bahan (Foto Dokumentasi):",
              bold: true,
              font: "Cambria",
              size: 24,
            }),
          ],
        })
      );

      dukunganList.push(
        new Table({
          width: { size: 60, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [new TableCell({ children: [p("(Foto)")] }), new TableCell({ children: [p("(Foto)")] })],
            }),
            new TableRow({
              children: [new TableCell({ children: [p("(Foto)")] }), new TableCell({ children: [p("(Foto)")] })],
            }),
          ],
        })
      );

      // Kegiatan Main
      dukunganList.push(pb("Kegiatan Main:"));
      dukunganList.push(...k.detail.kegiatanMain.map(step => p(`- ${step}`)));

      return dukunganList;
    }).flat();

    // ===== TABEL SUMATIF =====
    const sumTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: ["Indikator", "BSB", "BSH", "MB", "BB"].map((h) =>
            new TableCell({ children: [pb(h)] })
          ),
        }),
        ...indikator.map(i =>
          new TableRow({
            children: [
              new TableCell({ children: [p(i)] }),
              ...Array(4).fill("").map(() => new TableCell({ children: [p("")] })),
            ],
          })
        ),
      ],
    });

    // ===== BUILD DOC =====
    const doc = new Document({
      styles: { default: { document: { run: { font: "Cambria", size: 24 } } } },
      sections: [
        {
          children: [
            new Paragraph({
              children: [ new TextRun({ text: "PERENCANAAN PEMBELAJARAN RAUDLATUL ATHFAL", bold: true, size: 28 }) ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 120 },
            }),
            new Paragraph({
              children: [ new TextRun({ text: "MODUL AJAR", bold: true, size: 36 }) ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [ new TextRun({ text: "Integrasi Pembelajaran Mendalam & KBC", size: 24 }) ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 250 },
            }),

            pb(`Nama RA: ${rpp.identitas.namaRA}`),
            p(`Fase: ${rpp.identitas.fase}`),
            p(`Kelompok: ${rpp.identitas.kelompok}`),
            p(`Tahun Ajaran: ${rpp.identitas.tahunAjaran}`),
            p(`Alokasi Waktu: ${rpp.identitas.alokasiWaktu}`),
            p(`Topik: ${rpp.identitas.topik}`),
            p(`Subtopik: ${rpp.identitas.subtopik}`),
            p(`Tema KBC: ${rpp.identitas.temaKBC}`),
            p(`Profil Lulusan: ${rpp.identitas.profilLulusan}`),
            p(`Materi Insersi KBC: ${rpp.identitas.materiInsersi}`),

            pb("A. Tujuan Pembelajaran"),
            p(rpp.tujuanPembelajaran),

            pb("B. Indikator Tujuan Pembelajaran"),
            ...indikator.map(i => p(i)),

            pb("C. Kegiatan Pembelajaran"),

            pb("1. Pendahuluan"),
            ...pendahuluan.map(i => p(`- ${i}`)),

            pb("2. Kegiatan Inti"),
            ...kegiatan,

            pb("3. Penutup"),
            ...penutup.map(i => p(`- ${i}`)),

            pb("D. Asesmen Formatif"),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: ["No","Indikator","BSB","BSH","MB","BB","Catatan Guru"].map(h => new TableCell({ children: [pb(h)] })),
                }),
                ...rpp.asesmen.formatif.map((k, i) =>
                  new TableRow({
                    children: [
                      new TableCell({ children: [p(String(i + 1))] }),
                      new TableCell({ children: [p(k)] }),
                      ...Array(5).fill("").map(() => new TableCell({ children: [p("")] })),
                    ],
                  })
                ),
              ],
            }),

            pb("Asesmen Sumatif"),
            sumTable,
          ],
        },
      ],
    });

    // ====== LAMPIRAN ======
    doc.addSection({
      children: [
        new Paragraph({
          children: [ new TextRun({ text: "LAMPIRAN", bold: true, size: 28 }) ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [ new TextRun({ text: "Instrumen Lembar Pengamatan", bold: true, size: 26 }) ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
        }),
      ],
    });

    // ====== LEMBAR PENGAMATAN PER KEGIATAN ======
    rpp.kegiatanPembelajaran.inti.forEach((item, idx) => {
      doc.addSection({
        properties: idx === 0 ? {} : { pageBreakBefore: true },
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: `Kegiatan Inti ${idx + 1}: `, bold: true, size: 26 }),
              new TextRun({ text: item.nama, size: 26 }),
            ],
            spacing: { after: 200 },
          }),

          p(`Nama             : ______________________________`),
          p(`Kelompok         : ______________________________`),
          p(`Hari/Tanggal     : ______________________________`),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: ["No","Aktivitas Bermain","BSB","BSH","MB","BB","Catatan Guru"].map(h => new TableCell({ children: [pb(h)] })),
              }),
              ...item.detail.kegiatanMain.map((main, i) =>
                new TableRow({
                  children: [
                    new TableCell({ children: [p(String(i + 1))] }),
                    new TableCell({ children: [p(main)] }),
                    ...Array(5).fill("").map(() => new TableCell({ children: [p("")] })),
                  ],
                })
              ),
            ],
          }),
        ],
      });
    });

    // ====== EXPORT FILE ======
    const buffer = await Packer.toBuffer(doc);
    const filename = `RPP_${safe(rpp.identitas.topik)}_${safe(rpp.identitas.subtopik)}.docx`;

    return new NextResponse(buffer, {
      headers: {
        "Content-Disposition": `attachment; filename=${filename}`,
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    });

  } catch (err) {
    console.error("❌ Error generate RPP DOCX:", err);
    return NextResponse.json({ error: "Gagal generate RPP DOCX" }, { status: 500 });
  }
}
