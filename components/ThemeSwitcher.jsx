"use client";
import React from "react";

/**
 * Komponen pengganti ThemeSwitcher lama
 * Sepenuhnya sinkron dengan style `app/app/page.jsx` dan `globals.css`
 * Bisa dipanggil dengan <ThemeSwitcher value={theme} onChange={setTheme} />
 */
export default function ThemeSwitcher({ value, onChange }) {
  const themes = [
    { name: "Pastel (default)", color: "#6f42c1" }, 
    { name: "Biru Langit", color: "#007bff" }, 
    { name: "Hijau Segar", color: "#28a745" }, 
    { name: "Pakistan Green", color: "#1F4006" },
    { name: "Mirtle Green", color: "#38726C" },
    { name: "Red Orange", color: "#D34E24" },
    { name: "Merah Cerah", color: "#dc3545" },
    { name: "Chose Harmony", color: "#C418BE" },
  ];

  return (
    <div className="color-row">
      {themes.map((t) => (
        <button
          key={t.color}
          onClick={() => onChange(t.color)}
          style={{
            background: t.color,
            border:
              value === t.color ? "2px solid #fff" : "1px solid rgba(255,255,255,0.3)",
            width: 30,
            height: 30,
            borderRadius: 4,
            cursor: "pointer",
          }}
          title={t.name}
        />
      ))}
    </div>
  );
}
