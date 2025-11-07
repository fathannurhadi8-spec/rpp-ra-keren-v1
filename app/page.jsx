"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";
import topicsData from "../lib/topics";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { generateTP, generateIndicators } from "../lib/aiGenerator";
import { selectKBCMaterial } from "../lib/kbcSelector";

export default function AppRPPRA() {
  // ===== LOGIN SECTION =====
  const [users, setUsers] = useState([]);
  const [register, setRegister] = useState({ username: "", password: "" });
  const [login, setLogin] = useState({ username: "", password: "" });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("rpp_users")) || []);
    setCurrentUser(JSON.parse(localStorage.getItem("rpp_currentUser")) || null);
  }, []);

  const handleRegister = () => {
    if (!register.username || !register.password) return alert("Lengkapi registrasi!");
    if (users.find((u) => u.username === register.username)) return alert("Username sudah ada!");
    const newUsers = [...users, register];
    setUsers(newUsers);
    localStorage.setItem("rpp_users", JSON.stringify(newUsers));
    alert("Registrasi berhasil!");
    setRegister({ username: "", password: "" });
  };

  const handleLogin = () => {
    const valid = users.find(
      (u) => u.username === login.username && u.password === login.password
    );
    if (!valid) return alert("User tidak ditemukan!");
    localStorage.setItem("rpp_currentUser", JSON.stringify(valid));
    setCurrentUser(valid);
    alert(`Selamat datang, ${valid.username}!`);
  };

  const handleLogout = () => {
    localStorage.removeItem("rpp_currentUser");
    setCurrentUser(null);
  };

  // ===== FORM STATES =====
  const [identitas, setIdentitas] = useState({
    namaRA: "",
    fase: "Fondasi",
    kelompok: "",
    tahunAjaran: "",
    alokasiWaktu: "1 Pekan",
  });

  const [temaKBC, setTemaKBC] = useState("");
  const [profilLulusan, setProfilLulusan] = useState("");
  const [topik, setTopik] = useState("");
  const [subtopik, setSubtopik] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [indikator, setIndikator] = useState([]);
  const [preview, setPreview] = useState("");
  const [theme, setTheme] = useState("#6f42c1");
  const [materiInsersiFinal, setMateriInsersiFinal] = useState("");

  const temaOptions = [
    "Cinta Allah dan Rasul-Nya",
    "Cinta Ilmu",
    "Cinta Lingkungan",
    "Cinta Diri dan Sesama",
    "Cinta Tanah Air",
  ];

  const profilOptions = [
    "Keimanan dan Ketakwaan",
    "Berpikir Kritis",
    "Kemandirian",
    "Kreativitas",
    "Kewargaan",
    "Komunikasi",
    "Kolaborasi",
    "Kesehatan",
  ];

  // ===== HANDLERS =====
  const handleTopikChange = (e) => {
    const val = e.target.value;
    setTopik(val);
    setSubtopik("");
    setTujuan(topicsData[val]?.tujuanPembelajaran || "");
    setProfilLulusan(topicsData[val]?.profilLulusan || "");
    setTemaKBC(topicsData[val]?.temaKBC || "");
    setMateriInsersiFinal("");
  };

  const handleSubtopikChange = (e) => {
    const val = e.target.value;
    setSubtopik(val);
    if (!val) return;
    const tpResult = generateTP(val, temaKBC, profilLulusan);
    setTujuan(tpResult.text);
    setIndikator(generateIndicators(tpResult));
  };

  const handleTemaKBCChange = (e) => {
    const tema = e.target.value;
    setTemaKBC(tema);
    if (!tema || !topik || !subtopik) return setMateriInsersiFinal("");

    const kegiatan = topicsData[topik]?.subtopics?.[subtopik]?.kegiatanInti || [];
    setMateriInsersiFinal(
      selectKBCMaterial(tema, kegiatan[0]?.judul || "", kegiatan[0]?.kegiatanMain || "") || ""
    );
  };

  const materiInsersiAuto =
    tujuan && temaKBC && profilLulusan
      ? `${tujuan} terkait ${temaKBC} dan menumbuhkan ${profilLulusan}`
      : "";
  const materiInsersi = materiInsersiFinal || materiInsersiAuto;

  // ===== PREVIEW GENERATOR =====
  const generatePreview = () => {
    if (!topik || !subtopik) return alert("Pilih Topik & Subtopik!");

    fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guru: identitas,
        topik,
        subtopik,
        temaKBC,
        profilLulusan,
        tujuan,
        indikator,
      }),
    })
      .then(async (res) => {
        const rpp = await res.json();
        if (!res.ok) {
          setPreview(`<b>Error:</b> ${rpp.error}`);
          return;
        }

        setMateriInsersiFinal(rpp.identitas?.materiInsersi || "");

        // === Tampilkan Preview HTML ===
        const html = `
        <div style="font-family:Cambria; font-size:12pt; line-height:1.5; padding:14px;">
          <h2 style="text-align:center;">PERENCANAAN PEMBELAJARAN RAUDLATUL ATHFAL</h2>
          <h3 style="text-align:center; margin-top:0;">MODUL AJAR</h3>
          <p style="text-align:center; margin-top:-8px;">Integrasi Pembelajaran Mendalam & KBC</p>

          <h3>Identitas</h3>
          ${Object.entries(rpp.identitas).map(([k, v]) => `<p><b>${k}:</b> ${v}</p>`).join("")}

          <h3>A. Tujuan Pembelajaran</h3>
          <p>${rpp.tujuanPembelajaran}</p>

          <h3>B. Indikator</h3>
          <ul>${rpp.indikatorTujuanPembelajaran.map((i) => `<li>${i}</li>`).join("")}</ul>

          <h3>C. Kegiatan Pembelajaran</h3>

          <h4>1. Pendahuluan</h4>
          <ul>${rpp.kegiatanPembelajaran.pendahuluan.map((t) => `<li>${t}</li>`).join("")}</ul>

          <h4>2. Kegiatan Inti</h4>
          ${rpp.kegiatanPembelajaran.inti
            .map(
              (k, i) => `
            <div style="margin-bottom:10px;">
              <b>Kegiatan Inti ${i + 1}: ${k.nama}</b><br/>
              <b>Alat & Bahan:</b> ${k.detail.alat}<br/>

              <b>Pernyataan Guru:</b>
              <ul>${k.detail.dukunganGuru.map(d => `<li>${d.pernyataan}</li>`).join("")}</ul>

              <b>Pertanyaan Pemantik:</b>
              <ul>${k.detail.dukunganGuru.map(d => `<li>${d.pertanyaanPemantik}</li>`).join("")}</ul>

              <b>Penguatan Spiritual:</b>
              <ul><li>${k.detail.dukunganGuru[0]?.penguatanSpiritual || ""}</li></ul>

              <b>Kegiatan Main:</b>
              <ul>${k.detail.kegiatanMain.map(m => `<li>${m}</li>`).join("")}</ul>
            </div>`
            )
            .join("")}

          <h4>3. Penutup</h4>
          <ul>${rpp.kegiatanPembelajaran.penutup.map((t) => `<li>${t}</li>`).join("")}</ul>

          <p><i>*Preview ringkas — file Word lengkap tersedia di Download.</i></p>
        </div>`;

        setPreview(html);
      })
      .catch(() => setPreview("<b>Error sistem</b>"));
  };

  // ===== EXPORT WORD =====
  const exportWord = () => {
    fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guru: identitas, topik, subtopik, temaKBC, profilLulusan, tujuan, indikator }),
    }).then(async (res) => {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `RPP_${topik}_${subtopik}.docx`;
      a.click();
    });
  };

  // ===== UI RENDER =====
  return (
    <div className="app" style={{ background: theme }}>
      <header className="header" style={{ backgroundImage: "url('/wallpaper/header.jpg')", backgroundSize:"cover", borderRadius:"12px" }}>
        <div className="header-left"><img src="/logo.png" className="logo" /></div>
        <div className="header-center">
          <h1>APLIKASI CERDAS MODUL AJAR RA</h1>
          <h2>Integrasi Pembelajaran Mendalam & Kurikulum Berbasis Cinta</h2>
          <p>pengawas keren youtube channel @2025</p>
        </div>
      </header>

      <div className="info-banner">Aplikasi ini dibuat oleh Pengawas Keren Youtube Channel</div>

      {/* LOGIN */}
      <div className="login-box">
        <div>
          <label>Username</label>
          <input value={register.username} onChange={(e) => setRegister({ ...register, username: e.target.value })} />
          <label>Password</label>
          <input type="password" value={register.password} onChange={(e) => setRegister({ ...register, password: e.target.value })} />
          <button onClick={handleRegister}>Registrasi</button>
        </div>

        <div>
          <label>Username</label>
          <input value={login.username} onChange={(e) => setLogin({ ...login, username: e.target.value })} />
          <label>Password</label>
          <input type="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} />
          <button onClick={handleLogin}>Login</button>
          {currentUser && <button onClick={handleLogout} style={{ background:"#dc3545" }}>Logout</button>}
        </div>
      </div>

      {/* FORM & PREVIEW */}
      <div className="form-preview">
        <div className="form-col">
          <label>Nama RA<input value={identitas.namaRA} onChange={(e) => setIdentitas({ ...identitas, namaRA: e.target.value })} /></label>
          <label>Fase<input value={identitas.fase} onChange={(e) => setIdentitas({ ...identitas, fase: e.target.value })} /></label>
          <label>Kelompok<input value={identitas.kelompok} onChange={(e) => setIdentitas({ ...identitas, kelompok: e.target.value })} /></label>
          <label>Tahun Ajaran<input value={identitas.tahunAjaran} onChange={(e) => setIdentitas({ ...identitas, tahunAjaran: e.target.value })} /></label>
          <label>Alokasi Waktu<input value={identitas.alokasiWaktu} disabled /></label>

          <label>Pilih Topik<select value={topik} onChange={handleTopikChange}>
            <option value="">-- Pilih Topik --</option>
            {Object.keys(topicsData).map((t) => <option key={t} value={t}>{t}</option>)}
          </select></label>

          {topik && (
            <label>Pilih Subtopik<select value={subtopik} onChange={handleSubtopikChange}>
              <option value="">-- Pilih Subtopik --</option>
              {Object.keys(topicsData[topik].subtopics).map((s) => <option key={s} value={s}>{s}</option>)}
            </select></label>
          )}

          <label>Profil Lulusan<select value={profilLulusan} onChange={(e) => setProfilLulusan(e.target.value)}>
            <option value="">-- Pilih Profil --</option>
            {profilOptions.map((p) => <option key={p}>{p}</option>)}
          </select></label>

          <label>Tema KBC<select value={temaKBC} onChange={handleTemaKBCChange}>
            <option value="">-- Pilih Tema KBC --</option>
            {temaOptions.map((t) => <option key={t}>{t}</option>)}
          </select></label>

          <label>Tujuan<textarea rows="3" value={tujuan} onChange={(e) => setTujuan(e.target.value)} /></label>
          <label>Materi Insersi<textarea rows="2" value={materiInsersi} readOnly /></label>
        </div>

        <div className="preview-col">
          <div className="preview-box"
            dangerouslySetInnerHTML={{ __html: preview || "<i>Belum ada pratinjau...</i>" }} />
        </div>
      </div>

      {/* THEME PICKER */}
      <div className="color-row">
        <ThemeSwitcher value={theme} onChange={setTheme} />
      </div>

      {/* FOOTER */}
      <div className="bottom-row">
        <div className="info-box">© 2025 Pengawas Keren</div>
        {currentUser && (
          <div style={{ display:"flex", gap:"10px" }}>
            <button onClick={generatePreview}>Buat RPP</button>
            <button onClick={exportWord}>Download Ms Word</button>
          </div>
        )}
      </div>
    </div>
  );
}
