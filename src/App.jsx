import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, 
  BarChart, Bar, Cell, AreaChart, Area, PieChart, Pie, Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, ComposedChart
} from 'recharts';
import { 
  LayoutDashboard, Table as TableIcon, TrendingUp, TrendingDown, PlusCircle, DollarSign, Target, 
  MessageSquare, ShoppingBag, Save, Trash2, Calendar, Loader2, Download, Upload, 
  Settings, ChevronRight, Share2, MousePointer2, Calculator, Lightbulb, Menu, X, 
  Edit3, CheckSquare, DatabaseBackup, RefreshCw, Activity, Eye, BarChart3, 
  ArrowDownUp, ChevronUp, ChevronDown, Wand2, Info, Code2, AlertCircle, Users, Layers, 
  Filter, Wallet, PieChart as PieIcon, LineChart as LineChartIcon, ArrowDown, ArrowUp,
  FileText, Printer, Headset, Clock, MapPin, PhoneCall, ClipboardPaste, 
  History, Undo2, Redo2, List, MousePointerClick, MessageCircle, ListFilter, Search, Check,
  HardDriveDownload, HardDriveUpload, Database, FilterX, Wrench, Copy, Terminal, CheckCircle, Sparkles, BrainCircuit, Crosshair, Megaphone, Film, Smartphone, Youtube, Instagram, Facebook, Lock, KeyRound, Flag, Archive, Camera, UserCheck
} from 'lucide-react';

// --- RIWAYAT VERSI APLIKASI ---
// V 1.0 (29 Maret 2026, 19:07 WIB) - Penetapan versi perdana aplikasi dan format penamaan dinamis.
// V 1.1 (29 Maret 2026, 21:30 WIB) - Update judul dokumen untuk menyertakan log waktu dan detail perubahan.
// V 1.2 (29 Maret 2026, 21:33 WIB) - Perbaikan izin popup GPS Absensi dan penambahan tombol coba ulang lokasi.
// V 1.3 (29 Maret 2026, 21:41 WIB) - Fix masalah GPS terblokir (Iframe/Browser) dengan menambahkan Fallback Jaringan (IP Geolocation).
// V 1.4 (29 Maret 2026, 21:47 WIB) - Eksekusi izin Kamera & GPS secara simultan (berbarengan) menggunakan Promise.allSettled.
// V 1.5 (29 Maret 2026, 21:55 WIB) - Pemisahan tombol izin Kamera & GPS (Step-by-step) untuk bypass pemblokiran browser, + fitur Input Lokasi Manual.
// V 1.6 (29 Maret 2026, 22:02 WIB) - Wajib Izin GPS murni. Fitur Ketik Manual dihapus dan diganti dengan panduan unblock izin browser.
// V 1.7 (29 Maret 2026, 22:07 WIB) - Implementasi Hybrid GPS: Otomatis memanggil koordinat jaringan (IP) tanpa error jika GPS perangkat diblokir oleh lingkungan Iframe/Browser.
// V 1.8 (29 Maret 2026, 22:11 WIB) - Penambahan Watermark (Jam, Tanggal, Lokasi) secara visual dan di-burn permanen ke file foto Absensi.
// V 1.9 (29 Maret 2026, 22:15 WIB) - Menyembunyikan kolom Data Validasi (Selfie & GPS) pada menu Absensi dari Role selain Owner dan Finance.
// V 1.10 (29 Maret 2026, 22:19 WIB) - Menambahkan sistem Kata Bijak / Quotes Pekerjaan secara dinamis (acak) pada layar awal login.
// V 1.11 (29 Maret 2026, 22:24 WIB) - Membuat kata bijak pada halaman login berganti otomatis setiap 10 detik beserta animasi.
// V 1.12 (29 Maret 2026, 22:29 WIB) - Memperbanyak stok Quotes Login, dengan prioritas lelucon dan motivasi khusus untuk Tim Operasional Lapangan.
// V 1.13 (27 April 2026, 08:08 WIB) - Tambahan kolom "Spam" di samping "Luar kota" pada Data Closing.
// V 1.14 (27 April 2026, 08:17 WIB) - Ubah teks Total Booking Masuk & Revenue Aktual di Executive Summary.
// V 1.15 (27 April 2026, 09:10 WIB) - Perbaikan format kolom CRM agar tampil sebagai angka, bukan persen.
// V 1.16 (27 April 2026, 09:55 WIB) - Menambahkan fitur "Live Sheets Sync" (Smart Upsert) di semua menu database tabel.
// V 1.17 (27 April 2026, 10:04 WIB) - Ubah nama kolom "Konten Iklan" menjadi "Junk" di Database Leads.
// V 1.18 (01 Mei 2026, 19:26 WIB) - Integrasi Gemini AI Assistant & Fitur Schema Manager (Tambah/Ubah Kolom).
// V 1.19 (01 Mei 2026, 20:35 WIB) - Penerapan metode update kode parsial (manual) & Pembaruan Judul Aplikasi.
// V 1.20 (01 Mei 2026, 20:37 WIB) - Menambahkan fitur Smart Booking Form Publik yang terintegrasi Kalender SPK.
// V 1.21 (01 Mei 2026, 20:43 WIB) - Mengubah sistem agar Form Booking memiliki URL (Link) khusus yang bisa disalin dan dibagikan ke customer.
// V 1.22 (01 Mei 2026, 20:48 WIB) - Memperpendek parameter URL Booking menjadi ?b=1 dan menambahkan peringatan ruang uji coba.
// ------------------------------

// Firebase Imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, doc, deleteDoc, writeBatch, updateDoc, setDoc, deleteField } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAytu49JyqYW-tEEWgUS4xPY7-ypgqEblI",
  authDomain: "hagia-pro.firebaseapp.com",
  projectId: "hagia-pro",
  storageBucket: "hagia-pro.firebasestorage.app",
  messagingSenderId: "152322791693",
  appId: "1:152322791693:web:24f7790511cdad28573844"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// --- GEMINI API INTEGRATION ---
const fetchGeminiAI = async (prompt, systemInstruction) => {
  const apiKey = ""; // API Key disediakan otomatis oleh environment saat eksekusi
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  let retries = 5;
  let delay = 1000;
  while (retries > 0) {
    try {
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Gagal mendapatkan respon AI.";
    } catch (error) {
      retries--;
      if (retries === 0) return `Error AI: ${error.message}`;
      await new Promise(r => setTimeout(r, delay));
      delay *= 2;
    }
  }
};

// --- Parser Data (Menghindari Error) ---
const smartParse = (val) => {
  if (val === null || val === undefined || val === "") return 0;
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  
  // PERBAIKAN: Bersihkan teks pengganggu (IDR, RP, USD, <, >) yang diexport dari Meta Ads
  let clean = String(val).toUpperCase().replace(/RP/g, '').replace(/IDR/g, '').replace(/USD/g, '').replace(/%/g, '').replace(/[<>]/g, '').trim();
  if (clean === "" || clean === "-") return 0;
  
  let isNegative = false;
  if (clean.startsWith('-')) {
    isNegative = true;
    clean = clean.substring(1);
  }
  const lastDot = clean.lastIndexOf('.');
  const lastComma = clean.lastIndexOf(',');
  if (lastComma > lastDot && lastDot !== -1) {
    clean = clean.replace(/\./g, '').replace(',', '.');
  } else if (lastDot > lastComma && lastComma !== -1) {
    clean = clean.replace(/,/g, '');
  } else if (lastComma !== -1 && lastDot === -1) {
    const parts = clean.split(',');
    if (parts[parts.length - 1].length === 3 && parts.length > 1) {
       clean = clean.replace(/,/g, ''); 
    } else {
       clean = clean.replace(',', '.'); 
    }
  } else if (lastDot !== -1 && lastComma === -1) {
    const parts = clean.split('.');
    if (parts[parts.length - 1].length === 3 && parts.length > 1) {
       clean = clean.replace(/\./g, ''); 
    }
  }
  clean = clean.replace(/\s/g, '');
  let parsed = parseFloat(clean);
  if (isNaN(parsed)) return 0;
  return isNegative ? -parsed : parsed;
};

const formatIDR = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

const formatTableCell = (val, formatType) => {
  if (val === null || val === undefined || val === "") return "-";
  const safeVal = typeof val === 'object' ? JSON.stringify(val) : String(val);
  if (formatType === 'text' || formatType === 'link' || formatType === 'badge' || formatType === 'dropdown') return safeVal;
  if (formatType === 'boolean') {
     const lower = safeVal.toLowerCase();
     return (lower === 'true' || lower === 'ya' || lower === 'yes' || lower === '1' || lower === 'aktif') ? 'Ya' : 'Tidak';
  }
  if (formatType === 'date') {
     const d = parseSafeDateLocal(safeVal);
     if(d.getTime() !== 0) return d.toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'});
     return safeVal;
  }
  if (formatType === 'phone') {
    let str = String(safeVal).trim();
    if (str.toLowerCase().includes('e')) {
       if (!str.includes('.') && str.startsWith('62')) {
           const [base, exp] = str.toLowerCase().split('e');
           if (exp && parseInt(exp) > 0) {
              const correctedBase = base.charAt(0) + '.' + base.slice(1);
              str = correctedBase + 'e' + exp;
           }
       }
       try {
          const num = Number(str);
          if (!isNaN(num)) str = num.toLocaleString('fullwide', {useGrouping: false});
       } catch(e) {}
    }
    if (str.endsWith('.0')) str = str.slice(0, -2);
    return str.replace(/[^\d+]/g, '');
  }
  if (formatType === 'currency') return formatIDR(smartParse(safeVal));
  if (formatType === 'percent') return `${Number.isInteger(smartParse(safeVal)) ? smartParse(safeVal) : smartParse(safeVal).toFixed(2)}%`;
  if (formatType === 'number') return smartParse(safeVal).toLocaleString('id-ID');
  return safeVal;
};

const renderTableCell = (val, formatType) => {
  const strVal = formatTableCell(val, formatType);
  if (strVal === "-" || strVal === "") return strVal;

  if (formatType === 'link') {
     let url = String(val).trim();
     if (!url.startsWith('http://') && !url.startsWith('https://')) url = 'https://' + url;
     return <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 font-bold" onClick={e => e.stopPropagation()}>{strVal}</a>;
  }
  
  if (formatType === 'badge') {
     const lower = strVal.toLowerCase();
     let colorClass = "bg-slate-100 text-slate-700 border-slate-200";
     if (lower === 'true' || lower.includes('deal') || lower.includes('sukses') || lower.includes('done') || lower.includes('hot') || lower.includes('sudah') || lower.includes('ya')) colorClass = "bg-emerald-100 text-emerald-700 border-emerald-200";
     else if (lower === 'false' || lower.includes('gagal') || lower.includes('batal') || lower.includes('cold') || lower.includes('belum') || lower.includes('tidak')) colorClass = "bg-rose-100 text-rose-700 border-rose-200";
     else if (lower.includes('pending') || lower.includes('proses') || lower.includes('warm') || lower.includes('follow up') || lower.includes('minggu')) colorClass = "bg-amber-100 text-amber-700 border-amber-200";
     
     return <span className={`px-2.5 py-1 rounded-lg text-[10px] md:text-[11px] font-black border ${colorClass}`}>{strVal}</span>;
  }

  if (formatType === 'boolean') {
     const lower = String(val).toLowerCase();
     const isTrue = lower === 'true' || lower === 'ya' || lower === 'yes' || lower === '1' || lower === 'aktif';
     return isTrue ? <span className="text-emerald-600 font-black flex items-center gap-1"><Check size={14}/> Ya</span> : <span className="text-rose-500 font-bold flex items-center gap-1"><X size={14}/> Tidak</span>;
  }
  
  return strVal;
};

// Engine Pembaca Tanggal
const parseSafeDateLocal = (dateStr) => {
  if (!dateStr) return new Date(0);
  let originalStr = String(dateStr).trim();
  let s = originalStr.toLowerCase().split('t')[0]; 
  
  if (!isNaN(s) && parseInt(s, 10) > 30000) {
     let excelEpoch = new Date(Date.UTC(1899, 11, 30));
     excelEpoch.setUTCDate(excelEpoch.getUTCDate() + Math.floor(parseFloat(s)));
     return new Date(excelEpoch.getUTCFullYear(), excelEpoch.getUTCMonth(), excelEpoch.getUTCDate(), 0, 0, 0);
  }

  const monthsIndo = {
    'januari': 1, 'jan': 1, 'februari': 2, 'feb': 2, 'maret': 3, 'mar': 3,
    'april': 4, 'apr': 4, 'mei': 5, 'juni': 6, 'jun': 6, 'juli': 7, 'jul': 7,
    'agustus': 8, 'agu': 8, 'agus': 8, 'september': 9, 'sep': 9, 'sept': 9,
    'oktober': 10, 'okt': 10, 'november': 11, 'nov': 11, 'desember': 12, 'des': 12
  };

  for (const [mName, mNum] of Object.entries(monthsIndo)) {
    if (s.includes(mName)) {
       s = s.replace(mName, `-${mNum}-`);
       break;
    }
  }

  s = s.replace(/[^0-9-]/g, '-').replace(/-+/g, '-').replace(/^\-|\-$/g, '');

  if (s.includes('-')) {
    const parts = s.split('-');
    if (parts.length >= 3) {
        let y, m, d;
        if (parts[0].length === 4) {
           y = parseInt(parts[0], 10);
           m = parseInt(parts[1], 10);
           d = parseInt(parts[2], 10);
        } else {
           y = parts[2].length === 4 ? parseInt(parts[2], 10) : 2000 + parseInt(parts[2], 10);
           m = parseInt(parts[1], 10);
           d = parseInt(parts[0], 10);
        }
        if (m > 12) { let temp = m; m = d; d = temp; }
        return new Date(y, m-1, d, 0, 0, 0);
    }
  }
  
  const dObj = new Date(originalStr);
  return isNaN(dObj.getTime()) ? new Date(0) : dObj;
};

// Peningkatan pencarian nilai yang kebal spasi/kapitalisasi
const getExactVal = (rowObj, exactKey, fallbackKeyword) => {
  if (rowObj[exactKey] !== undefined && rowObj[exactKey] !== "") return smartParse(rowObj[exactKey]);
  const cleanFallback = fallbackKeyword.toLowerCase().replace(/[^a-z0-9]/g, '');
  const key = Object.keys(rowObj).find(k => k.toLowerCase().replace(/[^a-z0-9]/g, '').includes(cleanFallback));
  return key ? smartParse(rowObj[key]) : 0;
};

// --- DATA MAPPING HELPERS ---
const SERVICES_LIST = [
  { id: 'bed', name: 'Hagia Bed', label: 'Bed', adKey: 'Biaya Iklan Bed', color: '#3b82f6' },
  { id: 'living', name: 'Hagia Living', label: 'Living', adKey: 'Biaya Iklan Living', color: '#8b5cf6' },
  { id: 'clean_mover', name: 'Clean Mover', label: 'Clean Mover', adKey: 'Biaya Iklan Clean Mover', color: '#10b981' },
  { id: 'auto', name: 'Hagia Auto', label: 'Auto', adKey: 'Biaya Iklan Auto', color: '#f59e0b' },
  { id: 'lainnya', name: 'Lainnya', label: 'Lainnya', adKey: 'Biaya Iklan Lainnya', color: '#94a3b8' }
];

const categorizeService = (layanan) => {
  if (!layanan) return 'lainnya';
  const l = String(layanan).toLowerCase();
  if (l.includes('bed')) return 'bed';
  if (l.includes('living')) return 'living';
  if (l.includes('mover') || l.includes('clean')) return 'clean_mover';
  if (l.includes('auto')) return 'auto';
  return 'lainnya';
};

const categorizeSource = (source) => {
  if (!source || String(source).trim() === '') return 'wa_kosong';
  const s = String(source).toLowerCase();
  if (s === 'wa kosong' || s.includes('kosong')) return 'wa_kosong';
  if (s.includes('iklan wa')) return 'iklan_saja';
  if (s.includes('instagram wa') || s.includes('ig wa') || s.includes('dm') || s.includes('komentar ig')) return 'ig_wa_dm';
  if (s.includes('blast')) return 'blast_existing';
  if (s.includes('existing')) return 'existing';
  return 'organik';
};

const checkLuarKota = (lokasi, catatan) => {
  const l = String(lokasi || '').toLowerCase() + " " + String(catatan || '').toLowerCase();
  return l.includes('luar kota') || l.includes('lk');
};

const checkClosing = (closingVal) => {
  const c = String(closingVal || '').toLowerCase().trim();
  // Abaikan jika kosong atau berisi penolakan
  if (!c || c === '-' || c === '0' || c === 'tidak' || c === 'belum' || c === 'no' || c === 'false') return false;
  // Deteksi kata kunci closing yang biasa dipakai CS (Termasuk 'form booking')
  return c.includes('form') || c.includes('booking') || c.includes('ya') || c.includes('yes') || c.includes('closing') || c.includes('deal') || c.includes('transfer') || c.includes('tf') || c === '1' || smartParse(c) > 0;
};

// --- Hitung Tren Sebelumnya ---
const calculateTrend = (currentValue, previousValue, lowerIsBetter = false) => {
  if (previousValue === 0 || !previousValue) return null;
  const diff = currentValue - previousValue;
  const percentage = (diff / Math.abs(previousValue)) * 100;
  if (percentage === 0) return null;
  let isBetter = diff > 0;
  if (lowerIsBetter) isBetter = diff < 0;
  
  return {
    value: percentage,
    isBetter,
    text: `${percentage > 0 ? '+' : ''}${percentage.toFixed(1)}%`
  };
};

// --- HEADERS ---
const ADS_HEADERS = [
  "Tanggal", "Biaya Iklan", "Impresi", "Reach", "Klik Tautan Semua", "Kunjungan Profil IG by Meta", "Hasil", "Percakapan Pesan Di Mulai", "DM IG & FB", "Komentar Ig & FB", 
  "Frekuensi", "CPC (Biaya per Klik Tautan) (IDR)", "CTR (Rasio Klik Tayang Tautan)", "CTR Semua", "CPM (Biaya Per 1.000 Tayangan) (IDR)", 
  "Total Keseluruhan Leads", "CR to Whatsapp", "CR to keseluruhan lead", "Biaya Iklan per hasil", "Biaya Iklan per percakapan", 
  "Biaya Iklan per keseluruhan lead", "Biaya Iklan perimpresi", "Biaya Iklan perreach", "CTR Klik Tautan", "Biaya Iklan Perleads WA", 
  "Biaya Iklan Perclosing", "Persentase Iklan ke Sales", "Kunjungan Profil Instagram Keseluruhan", "Ketukan Situs Web", "Rate Ketukan situs web", 
  "Pengunjung Desty Page Instagram", "Klik Desty Page Instagram", "Closing", "Closing Rate", "Sales", "Roas Keseluruhan", 
  "Biaya Iklan Bed", "Biaya Iklan Living", "Biaya Iklan Clean Mover", "Biaya Iklan Auto", "Biaya Iklan Lainnya", 
  "Total Biaya Iklan", "Closing Hagia Bed", "Closing Hagia Living", "Closing Hagia Clean Mover", "Closing Hagia Auto", 
  "Closing Lainnya", "Total Closing Iklan", "Lead Bed", "Lead Living", "Lead Clean Mover", "Lead Auto", "Lead Lainnya", 
  "Total Lead Iklan", "Closing Rate Bed", "Closing Rate Living", "Closing Rate Clean Mover", "Closing Rate Auto", 
  "Closing Rate Lainnya", "Rata - rata closing rate", "Sales Bed", "Sales Living", "Sales Clean Mover", "Sales Auto", 
  "Sales Lainnya", "Total Sales Iklan", "ROAS Bed", "ROAS Living", "ROAS Clean Mover", "Roas Auto", "Roas Lainnya", 
  "Total Roas Iklan", "Leads Iklan Whatsapp", "Leads Instagram Whatsapp", "Leads DM", "Total Leads"
];

const ADSET_HEADERS = [
  "Tanggal", "Nama Adset", "Campaign Layanan", "Jenis Iklan", "Budget Iklan", "Biaya Iklan", "Impresi", "Reach", "Klik Tautan Semua", "Kunjungan Profil IG by Meta", "Hasil Klik Tautan", 
  "Percakapan Pesan Di Mulai", "DM IG & FB", "Komentar Ig & FB", "Frekuensi", "CPC (Biaya per Klik Tautan) (IDR)", 
  "CTR (Rasio Klik Tayang Tautan)", "CTR Semua", "CPM (Biaya Per 1.000 Tayangan) (IDR)", "Total Leads Iklan", "CR to Whatsapp", 
  "CR to keseluruhan lead", "Biaya Iklan per hasil", "Biaya Iklan per percakapan", "Biaya iklan per keseluruhan lead", 
  "Biaya Iklan perimpresi", "Biaya Iklan perreach", "CTR Klik Tautan"
];

const LEADS_HEADERS = [
  "Tanggal", "Jam Masuk Chat", "Nama", "Nomor Telepon", "Asal Leads", 
  "Layanan", "Template Teks", "Lokasi", "Junk", "Catatan", 
  "Status Follow Up", "FU H+1", "FU H+3", "Closing", "Kualitas", 
  "Nominal Closing", "Admin"
];

const CLOSING_HEADERS = [
  "Tanggal", "CRM", "Iklan IG", "Iklan FB", "IG (WA)", "IG (DM&COM)", "TIK TOK (WA)", "TIK TOK (DM&COM)", "YOUTUBE", "YOUTUBE COM", 
  "WA Kosong", "FB WA", "FB (DM&KOM)", "IG Bayangan WA", "IG Bayangan DM & COM", "Tiktok Bayangan WA", "Tiktok Bayangan DM & COM", 
  "Youtube Bayangan WA", "Youtube Bayangan COM", "Facebook Bayangan WA", "Facebook Bayangan DM & COM", "LEADS Keseluruhan", 
  "Luar kota", "Spam", "Lead Terjangkau", "Closing CS1", "Sales CS1", "Total Lead CS 1", "Closing CS 2", "Sales CS 2", "Total Lead CS 2", 
  "Closing Rate", "TOTAL CLOSING", "Average Order Value", "TOTAL SALES", "TOTAL REVENUE"
];

const KOL_HEADERS = [
  "No", "Tanggal Pencarian", "Nama KOL", "PIC", "Sosial Media", "Kategori KOL", "LINK SOSMED", "No Telp", "Lokasi", "Followers", 
  "Rata rata View", "Engagement Rate", "Dihubungi", "Deal", "Rate Card", "Konten", "Tanggal Pengerjaan", "Status Pengerjaan", 
  "Tanggal Deadline", "Tanggal Upload", "Status Upload", "Status Affiliate", "Sudah Download & Taruh di Google Drive", 
  "Sudah Di Post Ke Official", "Link Post", "Reach", "Impressions", "Like", "Coment", "Share", "Save", "Tawaran"
];

const CONTENT_HEADERS = [
  "No", "Bulan", "Tanggal", "Tema atau Kategori", "Judul Thumbnail", "Untuk Judul Youtube", "Hook", "Isi Konten", "Caption untuk di ig & tiktok", "Link File", "STATUS", 
  "Link Postingan Instagram", "Jam Upload", "Tayangan (IG)", "Jangkauan (IG)", "konversi tayangan ke jangkauan", "Tayangan Video (IG)", "Suka (IG)", "Komentar (IG)", "Di Bagikan (IG)", "Di simpan (IG)", "Mengikuti (IG)", "Engagement Rate (IG)", "Waktu Menonton Rata rata ( Detik)", "Waktu Nonton", "Kekuatan 3 detik pertama Reel ini", "Kekuatan 3 detik pertama Reel biasanya", "Usia 18-24 tahun (IG)", "Usia 25-34 tahun (IG)", "Usia 35-44 tahun (IG)", "Usia 45-54 tahun (IG)", "Pengikut", "Bukan Pengikut", "Pemirsa Laki-laki", "Pemirsa Perempuan", "Dari rekomendasi", "Dari pembagian ulang", "Dari kabar", "Dari profil", "Dari lainnya (IG)", 
  "Link Postingan Tiktok", "Jangkauan (Tiktok)", "Tayangan Video (Tiktok)", "Tingkat Penyelesaian", "Waktu Tayangan Rata-rata", "Tayangan Profil", "Konversi", "Laki-laki (Tiktok)", "Perempuan (Tiktok)", "Usia 18-24 tahun (Tiktok)", "Usia 25-34 tahun (Tiktok)", "Usia 35-44 tahun (Tiktok)", "Usia 45-54 tahun (Tiktok)", "Suka (Tiktok)", "Komentar (Tiktok)", "Bagikan (Tiktok)", "Simpan (Tiktok)", "Engagement Rate (Tiktok)", 
  "Jakarta", "Tangerang", "Bekasi", "Semarang", "Bogor", "Palembang", "Sleman", "Surabaya", "Bandung", "Sumatera", "Makasar", "Banjarmasin", "Pontianak", "Denpasar", "Yogyakarta", "Lainnya (Lokasi)", "Saran", "Mengikuti (Tiktok)", "Cari", "Profil (Tiktok)", "Lainnya (Tiktok)", 
  "Link Postingan Youtube", "Di tampilkan di feed", "Penayangan", "rata-rata durasi tonton", "Waktu Tonton jam", "Persentase penayangan rata - rata", "Penonton kembali", "Penonton Baru", "Subscriber", "Jumlah orang yang memilih untuk melihat", "Jumlah orang yang memilih untuk melewati", "Feed Short", "Penelusuran Youtube", "Halaman Channel", "Fitur Jelajah", "Fitur Youtube Lainnya", "Pria (YT)", "Wanita (YT)", "Tidak Subscribe", "Subscribe", "18-24 tahun (YT)", "25-34 tahun (YT)", "35-44 tahun (YT)", "45-54 tahun (YT)", "55-56 tahun"
];

const TIKTOK_DAILY_HEADERS = [
  "Tanggal", "Postingan", "Influencer / Mention", "Tayangan Video", "Penonton yang dijangkau", "Tampilan Profil", "Pengunjung Desty Page", "Total Leads", "Suka", "Komentar", "Bagikan", "Jumlah klik situs web", "Jumlah klik nomor telepon", "Pesan / Prospek", "Total Interaksi", "Pengikut baru", "Pengikut yang hilang", "Pengikut Bersih", "Total Pengikut"
];

const YOUTUBE_DAILY_HEADERS = [
  "Tanggal", "Postingan", "Tayangan", "Penayangan (jangkauan)", "Pengunjung Desty Page", "Total Leads", "Rasio klik-tayang dari tayangan (%)", "Waktu tonton (jam)", "Rata-rata durasi tonton", "Penonton yang kembali", "Penonton baru", "Di bagikan", "Tidak suka", "Suka", "Komentar ditambahkan", "Subscriber yang diperoleh", "Subscriber yang hilang", "Total Pendapatan Subscriber", "Total Subscriber"
];

const IG_DAILY_HEADERS = [
  "Tanggal", "Total Postingan", "Influencer", "Jangkauan Iklan", "Jangkauan Organik", "Jangkauan Keseluruhan", 
  "Tayangan Iklan", "Tayangan Organik", "Tayangan Keseluruhan", "Tayangan Video", "Kunjungan Profil", 
  "Ketukan Situs Website", "Rate Ketukan Situs Website", "Pengunjung Desty Page", "Leads WA", "Leads DM", 
  "Pengikut Baru", "Pengikut Hilang", "Pengikut Bersih", "Total Pengikut", "Post Photo", "Post Reels", 
  "Post Stories", "Suka", "Komentar", "Simpan", "Bagikan", "Total Interaksi", "Balasan Stories", 
  "Stories Video", "Stories Photo", "Jangkauan Stories", "Tayangan Stories"
];

const FB_DAILY_HEADERS = [
  "Tanggal", "Total Postingan", "Jangkauan", "Tayangan", "Tayangan Video", "Kunjungan Profil", "Ketukan Situs Website", "Pengikut Bersih", "Total Interaksi"
];

const IG_BAYANGAN_HEADERS = [
  "Tanggal", "Akun IG Bayangan", "Total Postingan", "Jangkauan", "Tayangan", "Tayangan Video", "Kunjungan Profil", "Ketukan Situs Website", "Pengikut Bersih", "Total Interaksi"
];

const FB_BAYANGAN_HEADERS = [
  "Tanggal", "Akun FB Bayangan", "Total Postingan", "Jangkauan", "Tayangan", "Tayangan Video", "Kunjungan Profil", "Ketukan Situs Website", "Pengikut Bersih", "Total Interaksi"
];

const TIKTOK_BAYANGAN_HEADERS = [
  "Tanggal", "Akun Tiktok Bayangan", "Postingan", "Tayangan Video", "Penonton yang dijangkau", "Tampilan Profil", "Jumlah klik nomor telepon", "Pesan / Prospek", "Suka", "Komentar", "Bagikan", "Total Interaksi", "Pengikut baru", "Pengikut yang hilang", "Pengikut Bersih"
];

const YOUTUBE_BAYANGAN_HEADERS = [
  "Tanggal", "Akun Youtube Bayangan", "Video yang dipublikasikan", "Penayangan", "Tayangan", "Komentar ditambahkan", "Pembagian", "Suka", "Subscriber yang diperoleh", "Subscriber yang hilang"
];

const CRM_BLAST_HEADERS = [
  "Tanggal", "Jam Masuk Chat", "Nama", "Nomor Telepon", "Asal Leads", 
  "Layanan", "Template Teks", "Lokasi", "Konten Iklan", "Catatan", 
  "Status Follow Up", "FU H+1", "FU H+3", "Closing", "Kualitas", 
  "Nominal Closing", "Admin", "Tanggal Blast", "Campaign Blast atau Copywriting Blast", 
  "Terkirim", "Respon", "Closing atau Tidak", "Tanggal Closing", 
  "Nominal Closing Blast", "Layanan Closing"
];

const KALENDER_HEADERS = [
  "Tanggal", "Jadwal 1 atau Jadwal 2", "Nama Tim", "Nama Operasional", "Nama Customer", 
  "Nomor telepon Customer", "Layanan", "Detail Layanan", "Alamat atau Sharelok", "Alamat Detail"
];

const SPK_HEADERS = [
  "ID Booking", "Tanggal", "Nama Tim", "Nama Customer", "Waktu Tiba di Lokasi", "Titik Koordinat Tiba (GPS)", 
  "Layanan yang Dikerjakan", "Metode Pembersihan", "Kondisi Awal / Temuan", "Foto Sebelum", 
  "Foto Sesudah", "Catatan Teknisi", "Waktu Selesai Pengerjaan", "Durasi Total Pengerjaan", 
  "Rating Kepuasan", "Tanda Tangan Pelanggan"
];

const DAILY_OPS_HEADERS = [
  "Tanggal", "Nama Tim", "Total Slot", "Slot Terisi", "Slot Kosong", 
  "Not Available (N/A)", "Vacant", "Absensi / Keterangan"
];

const ASSETS_HEADERS = [
  "Tanggal", "Nama Peralatan", "Jumlah", "Kondisi", "Keterangan"
];

const INVENTORY_HEADERS = [
  "Tanggal", "Item Chemical", "Stok Awal", "Barang Masuk", "Barang Keluar", "Sisa Stok", "Keterangan"
];

const COMPLAINT_HEADERS = [
  "Tanggal Pekerjaan", "Nama Customer", "Masalah Komplain", "Nama Cleaner Pelaksana", 
  "Rencana Tindakan Solusi", "Keterangan", "Tanggal Pekerjaan Rewash", "Nama Cleaner Rewash"
];

const SURVEY_HEADERS = [
  "Tanggal Survey", "Nama Client", "Lokasi", "Nomor HP Client", "Luasan (Meter Persegi)", 
  "Hasil Eksekusi", "Lama Proses Pekerjaan", "Keterangan", "Jumlah Pekerjaan"
];

const SCHEDULE_HEADERS = [
  "Tanggal", "Total Postingan", "Instagram Official Video", "Instagram Official Photo", "Instagram Official Stories", 
  "Tiktok Official", "Youtube Official", "FacebooK Official", "X Official", "Maps Official", 
  "ig cuciKasurbeKasi", "ig cuciKasurexpress", "ig cuci KasurjabodetabeK", "ig cuciKasurmurah", "ig cuciKasurspringbed", 
  "ig cuciKasurtangerang", "ig cucisofa_", "ig cucisofaexpress", "ig jasa.cucispringbed", "Fb Hagia Cleaners Indonesia", 
  "Fb Cuci Kasur Express", "Fb Cuci Kasur JabodetabeK", "Fb cuciKasurmurah", "Fb Cuci Kasur Springbed", "Fb cuciKasurtangerang", 
  "Fb Cuci Sofa", "Fb Cuci Sofa JabodetabeK", "Fb Jasa Cuci Sofa dan kasur", "FB cuci Sofa Kasur Springbed Karpet", "FB Cuci Kasur Sofa Jok Mobil", 
  "TiKtoK Jasa Cuci Kasur", "TiKtoK jasa cuci sofa", "TiKtoK Cuci Kasur Hagia Cleaners", "TiKtoK Jasa Cuci Springbed", "TiKtoK cuciKasurviral", 
  "mobilhomecleaning", "jasa cuci springbed", "Youtube Jasa Cuci Kasur", "Youtube ASMR cleaning", "Youtube Cuci Kasur", "Youtube Jasa Cuci Kasur 2"
];

const LP_HEADERS = [
  "Tanggal", 
  "Info Layanan", "Info Harga", "Info Promo", "Customer Service", "Form Order / Booking", "Hagia Shop", "Sosial Media", 
  "Total Pengunjung Desty Page", "Total Klik Tautan Desty Page", "Tayangan Video", "Whats App Instagram", "DM & Komentar", "Total Leads Instagram", "Pengunjung Desty Page >> Klik Tautan Desty Pege", "Klik tautan Desty Page >> Whatsapp",
  
  "Booking / Info harga (TikTok)", "Promo (TikTok)", "Info Layanan (TikTok)", "Sosial Media ? Hagia Shop", 
  "Total Pengunjung Desty Page (TikTok)", "Total Klik Tautan Desty Page (TikTok)", "Tayangan Video (TikTok)", "Whats App Tiktok", "Dm & Komentar (TikTok)", "Total Leads Tiktok", "Pengunjung Desty Page >> Klik Tautan Desty Pege (TikTok)", "Klik tautan Desty Page >> Whatsapp (TikTok)",
  
  "Booking / Harga (YT)", "Promo (YT)", "Info Layanan (YT)", "Sosial Media atau Website / hagia", 
  "Total Pengunjung Desty Page (YT)", "Total Klik Tautan Desty Page (YT)", "Tayangan Video (YT)", "Whats App Youtube", "Dm & Komentar (YT)", "Total Leads Youtube", "Pengunjung Desty Page >> Klik Tautan Desty Pege (YT)", "Klik tautan Desty Page >> Whatsapp (YT)",
  
  "Booking / Info harga (IG Bayangan)", "Promo (IG Bayangan)", "Layanan / Konsultasi (IG Bayangan)", "Sosial Media atau Website hagia shop", 
  "Total Pengunjung Desty Page (IG Bayangan)", "Total Klik Tautan Desty Page (IG Bayangan)", "Tayangan Video (IG Bayangan)", "Whats App IG Bayangan", "Dm & Komentar (IG Bayangan)", "Total Leads Instagram Bayangan", "Pengunjung Desty Page >> Klik Tautan Desty Pege (IG Bayangan)", "Klik tautan Desty Page >> Whatsapp (IG Bayangan)",
  
  "Booking / Harga (FB)", "Promo (FB)", "Info Layanan (FB)", "Sosial Media atau Website / Hagia Shop", 
  "Total Pengunjung Desty Page (FB)", "Total Klik Tautan Desty Page (FB)", "Tayangan Video (FB)", "Whats App Sosial MediaFacebook", "Dm & Komentar (FB)", "Total Leads Facebook", "Pengunjung Desty Page >> Klik Tautan Desty Pege (FB)", "Klik tautan Desty Page >> Whatsapp (FB)",
  
  "Booking / Harga (FB Bayangan)", "Promo (FB Bayangan)", "Info Layanan (FB Bayangan)", "Sosial Media atau Website / hagia shop", 
  "Total Pengunjung Desty Page (FB Bayangan)", "Total Klik Tautan Desty Page (FB Bayangan)", "Tayangan Video (FB Bayangan)", "Whats App Sosial MediaFaceb ook", "Dm & Komentar (FB Bayangan)", "Total Leads Facebook (Bayangan)", "Pengunjung Desty Page >> Klik Tautan Desty Pege (FB Bayangan)", "Klik tautan Desty Page >> Whatsapp (FB Bayangan)",
  
  "Booking / Harga (YT Bayangan)", "Promo (YT Bayangan)", "Info Layanan (YT Bayangan)", "Sosial Media atau Website", 
  "Total Pengunjung Desty Page (YT Bayangan)", "Total Klik Tautan Desty Page (YT Bayangan)", "Tayangan Video (YT Bayangan)", "Whats App Bayangan Youtube", "Dm & Komentar (YT Bayangan)", "Total Leads Youtube Bayangan", "Pengunjung Desty Page >> Klik Tautan Desty Pege (YT Bayangan)", "Klik tautan Desty Page >> Whatsapp (YT Bayangan)",
  
  "Layanan / Konsultasi (TikTok Bayangan)", "Promo (TikTok Bayangan)", "Harga (TikTok Bayangan)", "Sosial Media atau Website / Hagia", 
  "Total Pengunjung Desty Page (TikTok Bayangan)", "Total Klik Tautan Desty Page (TikTok Bayangan)", "Tayangan Video (TikTok Bayangan)", "Whats App Bayangan Tiktok", "Dm & Komentar (TikTok Bayangan)", "Total Leads Tiktok Bayangan", "Pengunjung Desty Page >> Klik Tautan Desty Pege (TikTok Bayangan)", "Klik tautan Desty Page >> Whatsapp (TikTok Bayangan)",
  
  "Website", "Iklan IG WA", "Iklan FB WA", "Google Maps", "WA Kosong", "Blast", "Existing", "Total WA CS", "Total DM & Komentar", "Total Leads CS", "Leads Luar Kota", "Lead Terjangkau", "Closing", "Closing Rate", "Sales", "Revenue", 
  "Total Pengunjung Desty Page (All)", "Total Klik Desty Page", "Rate Klik Desty Page ke Whatsapp", "Rate Pengunjung ke Klik Desty Page", "Customer Service (All)", "Promo (All)", "Layanan (All)", "Booking / Info Harga (All)", "Sosial Media / Website/ hagia shop (All)", "Tayangan Video Keseluruhan"
];

const GROUPED_HEADERS = [
  { label: "--- Database Iklan ---", options: ADS_HEADERS },
  { label: "--- Database Per Adset ---", options: ADSET_HEADERS },
  { label: "--- Database Leads ---", options: LEADS_HEADERS },
  { label: "--- Data Closing ---", options: CLOSING_HEADERS },
  { label: "--- Database KOL ---", options: KOL_HEADERS },
  { label: "--- Database Konten ---", options: CONTENT_HEADERS },
  { label: "--- Jadwal Posting Sosmed ---", options: SCHEDULE_HEADERS },
  { label: "--- Data Landing Page ---", options: LP_HEADERS },
  { label: "--- Analisa Harian Tiktok ---", options: TIKTOK_DAILY_HEADERS },
  { label: "--- Analisa Harian Youtube ---", options: YOUTUBE_DAILY_HEADERS },
  { label: "--- Analisa Harian Instagram ---", options: IG_DAILY_HEADERS },
  { label: "--- Analisa Harian Facebook ---", options: FB_DAILY_HEADERS },
  { label: "--- Analisa IG Bayangan ---", options: IG_BAYANGAN_HEADERS },
  { label: "--- Analisa FB Bayangan ---", options: FB_BAYANGAN_HEADERS },
  { label: "--- Analisa Tiktok Bayangan ---", options: TIKTOK_BAYANGAN_HEADERS },
  { label: "--- Analisa Youtube Bayangan ---", options: YOUTUBE_BAYANGAN_HEADERS },
  { label: "--- Database CRM & Blast ---", options: CRM_BLAST_HEADERS },
  { label: "--- Kalender & SPK ---", options: KALENDER_HEADERS },
  { label: "--- Dokumentasi SPK ---", options: SPK_HEADERS },
  { label: "--- Daily Operasional ---", options: DAILY_OPS_HEADERS },
  { label: "--- Manajemen Aset ---", options: ASSETS_HEADERS },
  { label: "--- Stok Opname Chemical ---", options: INVENTORY_HEADERS },
  { label: "--- Data Complaint & QC ---", options: COMPLAINT_HEADERS },
  { label: "--- Laporan Survei B2B ---", options: SURVEY_HEADERS }
];

const ALL_HEADERS = Array.from(new Set([...ADS_HEADERS, ...ADSET_HEADERS, ...LEADS_HEADERS, ...CLOSING_HEADERS, ...KOL_HEADERS, ...CONTENT_HEADERS, ...SCHEDULE_HEADERS, ...LP_HEADERS, ...TIKTOK_DAILY_HEADERS, ...YOUTUBE_DAILY_HEADERS, ...IG_DAILY_HEADERS, ...FB_DAILY_HEADERS, ...IG_BAYANGAN_HEADERS, ...FB_BAYANGAN_HEADERS, ...TIKTOK_BAYANGAN_HEADERS, ...YOUTUBE_BAYANGAN_HEADERS, ...CRM_BLAST_HEADERS, ...KALENDER_HEADERS, ...SPK_HEADERS, ...DAILY_OPS_HEADERS, ...ASSETS_HEADERS, ...INVENTORY_HEADERS, ...COMPLAINT_HEADERS, ...SURVEY_HEADERS])).sort();

const getDefaultFormats = (headers) => {
  const formats = {};
  headers.forEach(h => {
    const lower = h.toLowerCase();
    if (h === 'Tanggal' || lower.includes('tanggal') || lower.includes('deadline') || lower.includes('upload')) formats[h] = 'date';
    else if (lower.includes('nomor telepon') || lower.includes('telepon') || lower.includes('hp client') || lower.includes('hp')) formats[h] = 'phone';
    else if (lower.includes('budget') || lower.includes('cpm') || lower.includes('cpc') || lower.includes('biaya') || lower.includes('sales') || lower.includes('idr') || lower.includes('nominal') || lower.includes('revenue') || lower.includes('value') || lower.includes('rate card') || lower.includes('tawaran')) formats[h] = 'currency';
    else if ((lower.includes('cr') && !lower.includes('crm')) || lower.includes('rate') || lower.includes('persentase') || lower.includes('ctr') || lower.includes('engagement') || lower.includes('>>')) formats[h] = 'percent';
    else if (lower.includes('roas') || lower.includes('frekuensi') || lower.includes('followers') || lower.includes('view') || lower.includes('reach') || lower.includes('impression') || lower.includes('like') || lower.includes('coment') || lower.includes('share') || lower.includes('save') || lower.includes('hasil') || lower.includes('luasan') || lower.includes('jumlah') || lower.includes('stok awal') || lower.includes('barang masuk') || lower.includes('barang keluar') || lower.includes('sisa stok') || lower === 'crm') formats[h] = 'number';
    else if (lower.includes('link') || lower.includes('sosmed') || lower.includes('url') || lower.includes('sharelok') || lower.includes('foto') || lower.includes('tanda tangan')) formats[h] = 'link';
    else if (lower.includes('status') || lower.includes('sudah') || lower.includes('deal') || lower.includes('dihubungi') || lower.includes('minggu 1') || lower === 'closing' || lower.includes('jadwal') || lower.includes('metode pembersihan') || lower.includes('kondisi') || lower.includes('hasil eksekusi')) formats[h] = 'badge';
    else if (['jam masuk chat', 'nama', 'asal leads', 'layanan', 'template teks', 'lokasi', 'junk', 'catatan', 'kualitas', 'admin', 'nama adset', 'jenis iklan', 'campaign layanan', 'nama kol', 'pic', 'kategori kol', 'konten', 'sosial media', 'influencer', 'postingan', 'nama tim', 'nama operasional', 'nama customer', 'layanan yang dikerjakan', 'absensi / keterangan', 'nama peralatan', 'item chemical', 'masalah komplain', 'nama cleaner pelaksana', 'rencana tindakan solusi', 'nama client'].includes(lower)) formats[h] = 'text';
    else formats[h] = 'number';
  });
  return formats;
};

const DEFAULT_FORMULAS = [
  { id: 'f5', target: 'Closing Rate', expression: '({Closing} / {Total Keseluruhan Leads}) * 100' },
  { id: 'f6', target: 'Roas Keseluruhan', expression: '{Sales} / {Biaya Iklan}' }
];

const DASHBOARD_TABS = [
  { id: 'summary', label: 'Executive Summary', icon: Activity },
  { id: 'meta', label: 'Performa Meta Ads', icon: Target },
  { id: 'adset_analysis', label: 'Analisa Adset', icon: Layers },
  { id: 'leads_quality', label: 'Sumber Trafik Lead', icon: PieIcon },
  { id: 'lead_temperature', label: 'Suhu Prospek', icon: ListFilter },
  { id: 'closing_performance', label: 'Performa Closing', icon: CheckSquare },
  { id: 'funnel', label: 'Conversion Funnel', icon: Filter },
  { id: 'categories', label: 'Kekuatan Layanan', icon: BarChart3 },
  { id: 'finance', label: 'Finansial & Efisiensi', icon: DollarSign },
  { id: 'cs_performance', label: 'Kinerja Tim CS', icon: Headset },
  { id: 'time_analysis', label: 'Tren Jam Sibuk', icon: Clock },
  { id: 'geo_analysis', label: 'Demografi Lokasi', icon: MapPin },
  { id: 'follow_up', label: 'Status Follow Up', icon: PhoneCall }
];

const ALL_SIDEBAR_TABS = [
  { id: 'dashboard', label: 'Dashboard Utama' },
  { id: 'absensi', label: 'Absensi Karyawan' },
  { id: 'roas_report', label: 'Laporan ROAS & Layanan' },
  { id: 'report', label: 'Pembuat Laporan PDF' },
  { id: 'data', label: 'Database Iklan' },
  { id: 'adset', label: 'Database Per Adset' },
  { id: 'leads', label: 'Database Leads' },
  { id: 'closing', label: 'Data Closing' },
  { id: 'kol', label: 'Database KOL' },
  { id: 'content', label: 'Planing & Analisa Konten' },
  { id: 'schedule', label: 'Jadwal Posting Sosmed' },
  { id: 'landing_page', label: 'Data Landing Page (Desty)' },
  { id: 'tiktok_daily', label: 'Analisa Harian Tiktok' },
  { id: 'youtube_daily', label: 'Analisa Harian Youtube' },
  { id: 'ig_daily', label: 'Analisa Harian Instagram' },
  { id: 'fb_daily', label: 'Analisa Harian Facebook' },
  { id: 'ig_bayangan', label: 'Analisa IG Bayangan' },
  { id: 'fb_bayangan', label: 'Analisa FB Bayangan' },
  { id: 'tiktok_bayangan', label: 'Analisa Tiktok Bayangan' },
  { id: 'youtube_bayangan', label: 'Analisa Youtube Bayangan' },
  { id: 'crm_blast', label: 'Database CRM & Blast' },
  { id: 'kalender', label: 'Kalender & SPK' },
  { id: 'spk', label: 'Dokumentasi SPK' },
  { id: 'daily_ops', label: 'Daily Operasional' },
  { id: 'assets', label: 'Manajemen Aset Peralatan' },
  { id: 'inventory', label: 'Stok Opname Chemical' },
  { id: 'complaint', label: 'Data Complaint & QC' },
  { id: 'survey', label: 'Laporan Survei B2B' },
  { id: 'okr', label: 'OKR Corporate Dashboard' },
  { id: 'tools', label: 'Konfigurasi & Rumus' },
  { id: 'history', label: 'Log Aktivitas' },
  { id: 'system', label: 'Sistem & Backup' }
];

// --- SISTEM RBAC (ROLE-BASED ACCESS CONTROL) ---
const DEFAULT_ROLES = {
  'SUPER_ADMIN': { name: 'Owner / Super Admin', pin: '1111', tabs: ['dashboard', 'roas_report', 'report', 'absensi', 'data', 'adset', 'leads', 'closing', 'kol', 'content', 'schedule', 'landing_page', 'tiktok_daily', 'youtube_daily', 'ig_daily', 'fb_daily', 'ig_bayangan', 'fb_bayangan', 'tiktok_bayangan', 'youtube_bayangan', 'crm_blast', 'kalender', 'spk', 'daily_ops', 'assets', 'inventory', 'complaint', 'survey', 'okr', 'tools', 'history', 'system'] },
  'FINANCE': { name: 'Finance / Keuangan', pin: '8899', tabs: ['dashboard', 'roas_report', 'closing', 'absensi', 'assets', 'inventory', 'report', 'okr'] },
  'ADVERTISER': { name: 'Advertiser / Meta Ads', pin: '5555', tabs: ['dashboard', 'roas_report', 'absensi', 'data', 'adset', 'landing_page', 'leads', 'closing'] },
  'KONTEN_KREATOR': { name: 'Konten Kreator', pin: '6666', tabs: ['absensi', 'content', 'schedule', 'tiktok_daily', 'youtube_daily', 'ig_daily', 'fb_daily', 'ig_bayangan', 'fb_bayangan', 'tiktok_bayangan', 'youtube_bayangan'] },
  'KOL_SPEC': { name: 'KOL Specialist', pin: '7777', tabs: ['absensi', 'kol', 'schedule', 'content', 'landing_page'] },
  'SPV_SALES': { name: 'SPV Sales Admin', pin: '2222', tabs: ['dashboard', 'absensi', 'leads', 'closing', 'crm_blast', 'complaint', 'survey', 'kalender', 'report'] },
  'SALES_ADMIN': { name: 'Sales / Admin', pin: '3333', tabs: ['absensi', 'leads', 'closing', 'kalender'] },
  'CRM': { name: 'CRM (Customer Rel.)', pin: '4444', tabs: ['absensi', 'leads', 'closing', 'crm_blast', 'complaint', 'survey'] },
  'SPV_CLEANER': { name: 'SPV Cleaner (Ops)', pin: '1234', tabs: ['absensi', 'kalender', 'spk', 'daily_ops', 'assets', 'inventory', 'complaint', 'survey', 'okr'] },
  'AREA_LEADER': { name: 'Area / Leader (Ops)', pin: '4321', tabs: ['absensi', 'kalender', 'spk', 'daily_ops', 'assets', 'inventory'] },
  'DAILY_WORKER': { name: 'Daily Worker (Ops)', pin: '0000', tabs: ['absensi', 'kalender', 'spk'] }
};

const WORK_QUOTES = [
  "Gaji Anda dibayar oleh konsumen, jadi hargailah konsumen Anda.",
  "Kerja keras itu penting, tapi kerja cerdas itu yang bikin target tembus.",
  "Bersihin noda di kasur customer lebih gampang daripada bersihin noda di masa lalu. Semangat tim Ops!",
  "Panas matahari di jalan tak sepanas omelan istri kalau setoran kurang. Tarik napas, gas lagi!",
  "Kotoran dan debu adalah musuh kita, senyum dan tip dari pelanggan adalah bonus kita.",
  "Jalanan macet itu biasa, yang luar biasa itu kamu yang tetap sabar sampai lokasi SPK.",
  "Customer cerewet? Anggap aja radio rusak. Tetap senyum, kerjakan sesuai SOP!",
  "Biar badan bau keringat matahari, yang penting rezeki wangi dan berkah untuk keluarga.",
  "Otot kawat tulang besi, kerja keras hari ini buat bayar cicilan panci.",
  "Peralatan mesin dirawat ya! Belinya pakai uang perusahaan, bukan pakai daun.",
  "Cuaca boleh mendung atau hujan, tapi semangat tim lapangan Hagia harus tetap cerah ceria!",
  "Sebersih apapun kamu bekerja, pasti ada aja debu yang kelewat. Makanya wajib cek ulang (QC) sebelum pulang!",
  "Berangkat bawa alat berat, pulang bawa cerita (dan tip kalau lagi hoki).",
  "GPS maps kadang bikin nyasar ke kuburan, tapi niat baik pasti sampai ke tujuan.",
  "Rebahan memang paling enak, tapi rebahan nggak bisa buat bayar tagihan motor. Ayo berangkat!",
  "Kalau customer bilang 'Mas, tolong bersihin sebelah sini juga sekalian', tarik napas, senyum, lalu kerjakan.",
  "Jangan lupa minum air putih, karena menghadapi kemacetan dan customer butuh kewarasan ekstra.",
  "SPK diselesaikan dengan baik, komplain dihindari, hati tenang, dompet riang.",
  "Kerja pakai hati, pulang bawa rezeki. Hati-hati di jalan ngebutnya, keluarga nunggu di rumah.",
  "Jangan menunggu termotivasi baru bekerja, bekerjalah maka motivasi (dan uang) akan datang.",
  "Konsumen yang banyak komplain adalah guru terbaik untuk menguji kesabaran Anda.",
  "Sukses itu 1% inspirasi, 99% keringat (dan sedikit kopi saset di jalan).",
  "Kalau capek istirahat ngopi sebentar, jangan malah bikin status WA berkeluh kesah.",
  "Target bulan ini: Kurangi sambat, perbanyak kerjain SPK dengan teliti.",
  "Senyum ke customer itu gratis, tapi efeknya bisa bikin mereka langganan terus.",
  "Disiplin adalah jembatan antara angan-angan dan pencapaian nyata.",
  "Tidak ada pelanggan yang kebal dengan pelayanan yang ramah, sopan, dan wangi.",
  "Omzet perusahaan meroket dimulai dari tangan-tangan terampil kalian di lapangan.",
  "Ingat cicilan menanti, ingat target penyelesaian SPK hari ini!",
  "Kerja ikhlas, kerja keras, kerja cerdas, kerja tuntas.",
  "Gagal capai target hari ini? Evaluasi, perbaiki, dan hajar lagi besok pagi!",
  "Rezeki sudah ada yang mengatur, tapi kalau cuma diam ya bakal diatur ke tempat orang lain."
];

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardSubTab, setDashboardSubTab] = useState('summary');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  const [randomQuote, setRandomQuote] = useState(() => WORK_QUOTES[Math.floor(Math.random() * WORK_QUOTES.length)]);

  // Efek ganti kata bijak otomatis setiap 10 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setRandomQuote(WORK_QUOTES[Math.floor(Math.random() * WORK_QUOTES.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  
  // STATE RBAC & LOGIN
  const [activeRole, setActiveRole] = useState(null);
  const [pinInput, setPinInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [rolesConfig, setRolesConfig] = useState(DEFAULT_ROLES);
  const [editingRoleKey, setEditingRoleKey] = useState(null);
  const [roleForm, setRoleForm] = useState({ name: '', pin: '', tabs: [] });
  
  const [adsData, setAdsData] = useState([]);
  const [adsetData, setAdsetData] = useState([]);
  const [leadsData, setLeadsData] = useState([]);
  const [closingData, setClosingData] = useState([]);
  const [kolData, setKolData] = useState([]);
  const [contentData, setContentData] = useState([]);
  const [tiktokDailyData, setTiktokDailyData] = useState([]);
  const [youtubeDailyData, setYoutubeDailyData] = useState([]);
  const [igDailyData, setIgDailyData] = useState([]);
  const [fbDailyData, setFbDailyData] = useState([]);
  const [igBayanganData, setIgBayanganData] = useState([]);
  const [fbBayanganData, setFbBayanganData] = useState([]);
  const [tiktokBayanganData, setTiktokBayanganData] = useState([]);
  const [youtubeBayanganData, setYoutubeBayanganData] = useState([]);
  const [crmBlastData, setCrmBlastData] = useState([]);
  const [kalenderData, setKalenderData] = useState([]);
  const [spkData, setSpkData] = useState([]);
  const [dailyOpsData, setDailyOpsData] = useState([]);
  const [assetsData, setAssetsData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [complaintData, setComplaintData] = useState([]);
  const [surveyData, setSurveyData] = useState([]);
  const [lpData, setLpData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [logsData, setLogsData] = useState([]); 
  const [absensiData, setAbsensiData] = useState([]);
  
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const [loading, setLoading] = useState(true);
  const [uploadState, setUploadState] = useState({ isUploading: false, progress: 0, timeLeft: '', rowCount: 0 });

  const [selectedRows, setSelectedRows] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dialog, setDialog] = useState({ isOpen: false, type: '', message: '', onConfirm: null });

  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pasteInput, setPasteInput] = useState("");

  // --- STATE SMART BOOKING PUBLIK ---
  const [showPublicForm, setShowPublicForm] = useState(false);
  const [publicForm, setPublicForm] = useState({ layanan: '', unit: '', tanggal: '', jadwal: '', alamat: '', shareloc: '', nama: '', hp: '' });

  // Efek untuk membaca parameter URL agar langsung membuka form jika link dibagikan
  useEffect(() => {
     // Mendukung parameter baru yang lebih pendek (?b=1)
     if (window.location.search.includes('booking=true') || window.location.search.includes('b=1')) {
        setShowPublicForm(true);
     }
  }, []);

  // Fungsi untuk menyalin link dengan parameter booking
  const handleCopyBookingLink = () => {
     let baseUrl = window.location.origin + window.location.pathname;
     if(baseUrl.endsWith('/')) baseUrl = baseUrl.slice(0, -1);
     
     // Menggunakan ?b=1 agar link lebih pendek
     const link = baseUrl + "?b=1"; 
     
     const textArea = document.createElement("textarea");
     textArea.value = link;
     document.body.appendChild(textArea);
     textArea.select();
     try {
         document.execCommand('copy');
         setDialog({
             isOpen: true, 
             type: 'alert', 
             message: `Link berhasil disalin ke memori HP/Laptop Anda!\n\n${link}\n\n💡 INFO: Karena saat ini aplikasi masih di tahap "Uji Coba" (Preview), link di atas adalah link sementara. Agar bisa dibuka oleh customer, aplikasi ini harus di-online-kan (hosting domain) terlebih dahulu nantinya.`
         });
     } catch (err) {
         prompt("Gagal menyalin otomatis, silakan salin link berikut secara manual:", link);
     }
     document.body.removeChild(textArea);
  };

  const [adsColFormats, setAdsColFormats] = useState(getDefaultFormats(ADS_HEADERS));
  const [adsetColFormats, setAdsetColFormats] = useState(getDefaultFormats(ADSET_HEADERS));
  const [leadsColFormats, setLeadsColFormats] = useState(getDefaultFormats(LEADS_HEADERS));
  const [closingColFormats, setClosingColFormats] = useState(getDefaultFormats(CLOSING_HEADERS));
  const [kolColFormats, setKolColFormats] = useState(getDefaultFormats(KOL_HEADERS));
  const [contentColFormats, setContentColFormats] = useState(getDefaultFormats(CONTENT_HEADERS));
  const [tiktokDailyColFormats, setTiktokDailyColFormats] = useState(getDefaultFormats(TIKTOK_DAILY_HEADERS));
  const [youtubeDailyColFormats, setYoutubeDailyColFormats] = useState(getDefaultFormats(YOUTUBE_DAILY_HEADERS));
  const [igDailyColFormats, setIgDailyColFormats] = useState(getDefaultFormats(IG_DAILY_HEADERS));
  const [fbDailyColFormats, setFbDailyColFormats] = useState(getDefaultFormats(FB_DAILY_HEADERS));
  const [igBayanganColFormats, setIgBayanganColFormats] = useState(getDefaultFormats(IG_BAYANGAN_HEADERS));
  const [fbBayanganColFormats, setFbBayanganColFormats] = useState(getDefaultFormats(FB_BAYANGAN_HEADERS));
  const [tiktokBayanganColFormats, setTiktokBayanganColFormats] = useState(getDefaultFormats(TIKTOK_BAYANGAN_HEADERS));
  const [youtubeBayanganColFormats, setYoutubeBayanganColFormats] = useState(getDefaultFormats(YOUTUBE_BAYANGAN_HEADERS));
  const [crmBlastColFormats, setCrmBlastColFormats] = useState(getDefaultFormats(CRM_BLAST_HEADERS));
  const [kalenderColFormats, setKalenderColFormats] = useState(getDefaultFormats(KALENDER_HEADERS));
  const [spkColFormats, setSpkColFormats] = useState(getDefaultFormats(SPK_HEADERS));
  const [dailyOpsColFormats, setDailyOpsColFormats] = useState(getDefaultFormats(DAILY_OPS_HEADERS));
  const [assetsColFormats, setAssetsColFormats] = useState(getDefaultFormats(ASSETS_HEADERS));
  const [inventoryColFormats, setInventoryColFormats] = useState(getDefaultFormats(INVENTORY_HEADERS));
  const [complaintColFormats, setComplaintColFormats] = useState(getDefaultFormats(COMPLAINT_HEADERS));
  const [surveyColFormats, setSurveyColFormats] = useState(getDefaultFormats(SURVEY_HEADERS));
  const [lpColFormats, setLpColFormats] = useState(getDefaultFormats(LP_HEADERS));
  const [scheduleColFormats, setScheduleColFormats] = useState(getDefaultFormats(SCHEDULE_HEADERS));

  const [editCell, setEditCell] = useState({ rowId: null, header: null });
  const [editValue, setEditValue] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [columnFilters, setColumnFilters] = useState({});
  const [filterModalCol, setFilterModalCol] = useState(null);
  const [tempFilterValues, setTempFilterValues] = useState([]);
  const [filterSearch, setFilterSearch] = useState("");

  const [syncUrl, setSyncUrl] = useState(""); // STATE BARU UNTUK LINK G-SHEET

  const [filterType, setFilterType] = useState('all'); 
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'Tanggal', direction: 'descending' });

  const [highlightedFilter, setHighlightedFilter] = useState(null);

  const [kpiTargets, setKpiTargets] = useState([
    { id: 'roas_overall', name: 'Target ROAS Keseluruhan', value: 4.0, unit: 'x' },
    { id: 'roas_ads', name: 'Target ROAS Iklan (Meta)', value: 4.0, unit: 'x' },
    { id: 'cpa', name: 'Target CPA Maksimal', value: 15000, unit: 'Rp' },
    { id: 'cpc', name: 'Target CPC Maksimal', value: 3000, unit: 'Rp' },
    { id: 'ctr', name: 'Target CTR Minimum', value: 1.5, unit: '%' }
  ]);
  const [newKpi, setNewKpi] = useState({ name: '', value: '', unit: '' });

  const [okrTargetsMap, setOkrTargetsMap] = useState({});
  const [okrPeriod, setOkrPeriod] = useState(() => {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [isEditingOkr, setIsEditingOkr] = useState(false);
  const [tempOkrTargets, setTempOkrTargets] = useState({});

  const [customFormulas, setCustomFormulas] = useState(DEFAULT_FORMULAS);
  const [newFormula, setNewFormula] = useState({ target: ADS_HEADERS[31], expression: '' });

  // --- STATE APP BUILDER VISUAL & AI INSTINCT ---
  const [isBuilderMode, setIsBuilderMode] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [builderInput, setBuilderInput] = useState("");
  const [generatedVisualPrompt, setGeneratedVisualPrompt] = useState("");
  const [isCopiedPrompt, setIsCopiedPrompt] = useState(false);

  // --- STATE KANBAN KALENDER OPERASIONAL ---
  const [kalenderViewMode, setKalenderViewMode] = useState('kanban');
  const [kanbanDate, setKanbanDate] = useState(() => {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  });

  // --- STATE WIZARD SPK & ABSENSI ---
  const [spkWizard, setSpkWizard] = useState({ isOpen: false, step: 1, job: null, data: {} });
  const signatureCanvasRef = useRef(null);

  const [absensiUI, setAbsensiUI] = useState({ isOpen: false, photo: null, gps: null, status: 'Masuk', error: '' });
  const videoRef = useRef(null);
  const absensiCanvasRef = useRef(null);

  // --- STATE SCHEMA & KOLOM MANAGER ---
  const [tableSchemas, setTableSchemas] = useState({});
  const [colManager, setColManager] = useState({ isOpen: false, type: '', targetCol: '', newName: '', position: 'right' });

  // --- STATE GEMINI AI ASSISTANT ---
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiActiveTab, setAiActiveTab] = useState('analisa'); // 'analisa', 'copywriter', 'cs'
  const [aiInputData, setAiInputData] = useState({ layanan: '', promo: '', audiens: '', keluhan: '' });
  const [aiOutput, setAiOutput] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const isAdsTab = activeTab === 'data';
  const isAdsetTab = activeTab === 'adset';
  const isLeadsTab = activeTab === 'leads';
  const isClosingTab = activeTab === 'closing';
  const isKolTab = activeTab === 'kol';
  const isContentTab = activeTab === 'content';
  const isTiktokDailyTab = activeTab === 'tiktok_daily';
  const isYoutubeDailyTab = activeTab === 'youtube_daily';
  const isIgDailyTab = activeTab === 'ig_daily';
  const isFbDailyTab = activeTab === 'fb_daily';
  const isIgBayanganTab = activeTab === 'ig_bayangan';
  const isFbBayanganTab = activeTab === 'fb_bayangan';
  const isTiktokBayanganTab = activeTab === 'tiktok_bayangan';
  const isYoutubeBayanganTab = activeTab === 'youtube_bayangan';
  const isCrmBlastTab = activeTab === 'crm_blast';
  const isKalenderTab = activeTab === 'kalender';
  const isSpkTab = activeTab === 'spk';
  const isDailyOpsTab = activeTab === 'daily_ops';
  const isAssetsTab = activeTab === 'assets';
  const isInventoryTab = activeTab === 'inventory';
  const isComplaintTab = activeTab === 'complaint';
  const isSurveyTab = activeTab === 'survey';
  const isLpTab = activeTab === 'landing_page';
  const isScheduleTab = activeTab === 'schedule';
  const isOkrTab = activeTab === 'okr';
  const isAbsensiTab = activeTab === 'absensi';

  // --- LOGIC PENGECEKAN KETERSEDIAAN JADWAL SPK ---
  const checkSlotAvailability = (dateStr, slotKey) => {
      // SlotKey: '1' untuk Jadwal 1 (Pagi), '2' untuk Jadwal 2 (Siang)
      if (!dateStr) return false;
      const jobsOnDate = kalenderData.filter(d => {
          if (!d.Tanggal) return false;
          const parsed = parseSafeDateLocal(d.Tanggal);
          const cleanDate = `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
          return cleanDate === dateStr;
      });
      const jobsInSlot = jobsOnDate.filter(d => String(d["Jadwal 1 atau Jadwal 2"]).includes(slotKey));
      // Asumsi maksimal melayani 5 Tim bersamaan di satu slot waktu
      return jobsInSlot.length < 5; 
  };

  const handleSubmitPublicBooking = async (e) => {
      e.preventDefault();
      if (!publicForm.tanggal || !publicForm.jadwal || !publicForm.nama || !publicForm.hp) {
          return setDialog({isOpen: true, type: 'alert', message: 'Mohon lengkapi Tanggal, Jadwal, Nama, dan Nomor HP.'});
      }
      
      setLoading(true);
      try {
          const newBooking = {
              "Tanggal": publicForm.tanggal,
              "Jadwal 1 atau Jadwal 2": publicForm.jadwal === '1' ? 'Jadwal 1 (10:00)' : 'Jadwal 2 (14:00)',
              "Nama Tim": "Menunggu Plotting",
              "Nama Operasional": "Booking Online",
              "Nama Customer": publicForm.nama,
              "Nomor telepon Customer": publicForm.hp,
              "Layanan": publicForm.layanan,
              "Detail Layanan": `${publicForm.layanan} - ${publicForm.unit} Unit/Meter`,
              "Alamat atau Sharelok": publicForm.shareloc,
              "Alamat Detail": publicForm.alamat
          };
          
          await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'kalender_v1'), newBooking);
          setDialog({isOpen: true, type: 'alert', message: 'Booking Berhasil! Jadwal Anda telah masuk ke sistem kami. Tim CS akan segera menghubungi Anda via WhatsApp untuk konfirmasi.'});
          
          setShowPublicForm(false);
          setPublicForm({ layanan: '', unit: '', tanggal: '', jadwal: '', alamat: '', shareloc: '', nama: '', hp: '' });
      } catch (err) {
          setErrorMsg(err.message);
      }
      setLoading(false);
  };
  
  const isTableTabRaw = isAdsTab || isAdsetTab || isLeadsTab || isClosingTab || isKolTab || isContentTab || isTiktokDailyTab || isYoutubeDailyTab || isIgDailyTab || isFbDailyTab || isIgBayanganTab || isFbBayanganTab || isTiktokBayanganTab || isYoutubeBayanganTab || isCrmBlastTab || isKalenderTab || isSpkTab || isDailyOpsTab || isAssetsTab || isInventoryTab || isComplaintTab || isSurveyTab || isLpTab || isScheduleTab;
  const isTableTab = isTableTabRaw && !(isKalenderTab && kalenderViewMode === 'kanban');

  const currentCollection = isAdsTab ? 'master_v6' : isAdsetTab ? 'adset_v1' : isLeadsTab ? 'leads_v1' : isClosingTab ? 'closing_v1' : isKolTab ? 'kol_v1' : isContentTab ? 'content_v1' : isScheduleTab ? 'schedule_v1' : isLpTab ? 'landing_page_v1' : isTiktokDailyTab ? 'tiktok_daily_v1' : isYoutubeDailyTab ? 'youtube_daily_v1' : isIgDailyTab ? 'ig_daily_v1' : isFbDailyTab ? 'fb_daily_v1' : isIgBayanganTab ? 'ig_bayangan_v1' : isFbBayanganTab ? 'fb_bayangan_v1' : isTiktokBayanganTab ? 'tiktok_bayangan_v1' : isYoutubeBayanganTab ? 'youtube_bayangan_v1' : isCrmBlastTab ? 'crm_blast_v1' : isKalenderTab ? 'kalender_v1' : isSpkTab ? 'spk_v1' : isDailyOpsTab ? 'daily_ops_v1' : isAssetsTab ? 'assets_v1' : isInventoryTab ? 'inventory_v1' : isComplaintTab ? 'complaint_v1' : isSurveyTab ? 'survey_v1' : '';
  
  const DEFAULT_HEADERS_MAP = {
    'master_v6': ADS_HEADERS, 'adset_v1': ADSET_HEADERS, 'leads_v1': LEADS_HEADERS, 'closing_v1': CLOSING_HEADERS,
    'kol_v1': KOL_HEADERS, 'content_v1': CONTENT_HEADERS, 'schedule_v1': SCHEDULE_HEADERS, 'landing_page_v1': LP_HEADERS,
    'tiktok_daily_v1': TIKTOK_DAILY_HEADERS, 'youtube_daily_v1': YOUTUBE_DAILY_HEADERS, 'ig_daily_v1': IG_DAILY_HEADERS,
    'fb_daily_v1': FB_DAILY_HEADERS, 'ig_bayangan_v1': IG_BAYANGAN_HEADERS, 'fb_bayangan_v1': FB_BAYANGAN_HEADERS,
    'tiktok_bayangan_v1': TIKTOK_BAYANGAN_HEADERS, 'youtube_bayangan_v1': YOUTUBE_BAYANGAN_HEADERS, 'crm_blast_v1': CRM_BLAST_HEADERS,
    'kalender_v1': KALENDER_HEADERS, 'spk_v1': SPK_HEADERS, 'daily_ops_v1': DAILY_OPS_HEADERS, 'assets_v1': ASSETS_HEADERS,
    'inventory_v1': INVENTORY_HEADERS, 'complaint_v1': COMPLAINT_HEADERS, 'survey_v1': SURVEY_HEADERS
  };
  const defaultCurrentHeaders = currentCollection ? (DEFAULT_HEADERS_MAP[currentCollection] || []) : [];
  const tableHeaders = (tableSchemas && tableSchemas[currentCollection]) ? tableSchemas[currentCollection] : defaultCurrentHeaders;

  const tableColFormats = isAdsTab ? adsColFormats : isAdsetTab ? adsetColFormats : isLeadsTab ? leadsColFormats : isClosingTab ? closingColFormats : isKolTab ? kolColFormats : isContentTab ? contentColFormats : isScheduleTab ? scheduleColFormats : isLpTab ? lpColFormats : isTiktokDailyTab ? tiktokDailyColFormats : isYoutubeDailyTab ? youtubeDailyColFormats : isIgDailyTab ? igDailyColFormats : isFbDailyTab ? fbDailyColFormats : isIgBayanganTab ? igBayanganColFormats : isFbBayanganTab ? fbBayanganColFormats : isTiktokBayanganTab ? tiktokBayanganColFormats : isYoutubeBayanganTab ? youtubeBayanganColFormats : isCrmBlastTab ? crmBlastColFormats : isKalenderTab ? kalenderColFormats : isSpkTab ? spkColFormats : isDailyOpsTab ? dailyOpsColFormats : isAssetsTab ? assetsColFormats : isInventoryTab ? inventoryColFormats : isComplaintTab ? complaintColFormats : isSurveyTab ? surveyColFormats : {};
  const setTableColFormats = isAdsTab ? setAdsColFormats : isAdsetTab ? setAdsetColFormats : isLeadsTab ? setLeadsColFormats : isClosingTab ? setClosingColFormats : isKolTab ? setKolColFormats : isContentTab ? setContentColFormats : isScheduleTab ? setScheduleColFormats : isLpTab ? setLpColFormats : isTiktokDailyTab ? setTiktokDailyColFormats : isYoutubeDailyTab ? setYoutubeDailyColFormats : isIgDailyTab ? setIgDailyColFormats : isFbDailyTab ? setFbDailyColFormats : isIgBayanganTab ? setIgBayanganColFormats : isFbBayanganTab ? setFbBayanganColFormats : isTiktokBayanganTab ? setTiktokBayanganColFormats : isYoutubeBayanganTab ? setYoutubeBayanganColFormats : isCrmBlastTab ? setCrmBlastColFormats : isKalenderTab ? setKalenderColFormats : isSpkTab ? setSpkColFormats : isDailyOpsTab ? setDailyOpsColFormats : isAssetsTab ? setAssetsColFormats : isInventoryTab ? setInventoryColFormats : isComplaintTab ? setComplaintColFormats : isSurveyTab ? setSurveyColFormats : setDailyOpsColFormats;

  // FITUR: Handle perubahan filter & Log aktivitas
  const updateFiltersAndLog = (newFilters, desc) => {
     const oldFilters = { ...columnFilters };
     setColumnFilters(newFilters);
     logActivity(desc);
     pushUndo({ type: 'FILTER', desc: `Membatalkan aksi: ${desc}`, oldData: oldFilters, newData: newFilters });
  };

  const handleGlobalFilterChange = (type) => {
     setFilterType(type);
     logActivity(`Mengubah rentang waktu global menjadi: ${type}`);
  };

  const handleDrillDown = (targetTab, columnName, filterValue) => {
    if (!filterValue) return;
    const newFilters = { [columnName]: [String(filterValue)] };
    updateFiltersAndLog(newFilters, `Drill Down Otomatis: Melihat Data ${columnName} -> ${filterValue}`);
    setActiveTab(targetTab);
    setHighlightedFilter(columnName);
    setTimeout(() => setHighlightedFilter(null), 3000);
  };

  const getCurrentDataList = () => {
    if (isAdsTab) return adsData;
    if (isAdsetTab) return adsetData;
    if (isLeadsTab) return leadsData;
    if (isClosingTab) return closingData;
    if (isKolTab) return kolData;
    if (isContentTab) return contentData;
    if (isScheduleTab) return scheduleData;
    if (isLpTab) return lpData;
    if (isTiktokDailyTab) return tiktokDailyData;
    if (isYoutubeDailyTab) return youtubeDailyData;
    if (isIgDailyTab) return igDailyData;
    if (isFbDailyTab) return fbDailyData;
    if (isIgBayanganTab) return igBayanganData;
    if (isFbBayanganTab) return fbBayanganData;
    if (isTiktokBayanganTab) return tiktokBayanganData;
    if (isYoutubeBayanganTab) return youtubeBayanganData;
    if (isCrmBlastTab) return crmBlastData;
    if (isKalenderTab) return kalenderData;
    if (isSpkTab) return spkData;
    if (isDailyOpsTab) return dailyOpsData;
    if (isAssetsTab) return assetsData;
    if (isInventoryTab) return inventoryData;
    if (isComplaintTab) return complaintData;
    if (isSurveyTab) return surveyData;
    return [];
  };

  const handleAppClickCapture = (e) => {
    if (!isBuilderMode) return;
    
    // Abaikan klik jika yang diklik adalah UI Modal Builder itu sendiri
    if (e.target.closest('#ai-builder-ui')) return;

    e.preventDefault();
    e.stopPropagation();

    const el = e.target;
    setSelectedTarget({
       tag: el.tagName.toLowerCase(),
       classes: el.className && typeof el.className === 'string' ? el.className : 'Tidak ada kelas',
       text: el.innerText ? el.innerText.substring(0, 100) : '(Elemen tanpa teks)'
    });
    setGeneratedVisualPrompt("");
    setBuilderInput("");
  };

  const generateActionPrompt = () => {
    if (!builderInput) return;
    const prompt = `[SYSTEM OVERRIDE: PARTIAL UPDATE / DIFF ONLY]
Halo AI, saya mengklik sebuah elemen di UI aplikasi dan ingin melakukan perubahan spesifik.
Detail Elemen yang saya klik:
- Tag: <${selectedTarget?.tag}>
- Kelas CSS saat ini: ${selectedTarget?.classes}
- Teks di dalamnya: "${selectedTarget?.text}..."

Instruksi Perubahan:
"${builderInput}"

Tolong jalankan perubahan tersebut dan berikan potongan kode yang berubah saja (Code Diff) untuk file App.jsx.`;
    setGeneratedVisualPrompt(prompt);
    logActivity("Membuat Visual AI Prompt");
  };

  const generateInstinctPrompt = () => {
    const prompt = `[SYSTEM OVERRIDE: AI INSTINCT ANALYSIS]
Halo AI, saya menggunakan fitur 'AI Instinct'. Saya menyorot elemen UI berikut di aplikasi:
- Tag: <${selectedTarget?.tag}>
- Kelas CSS saat ini: ${selectedTarget?.classes}
- Teks di dalamnya: "${selectedTarget?.text}..."

Sebagai UI/UX Expert dan Senior Developer, tolong berikan analisa instingmu:
1. Apa kelemahan atau potensi masalah dari elemen/desain ini?
2. Berikan 2-3 ide perbaikan spesifik (tampilan, fitur, interaksi, atau performa).
3. Jika saya setuju, berikan instruksi agar saya bisa memintamu mengeksekusinya.`;
    setGeneratedVisualPrompt(prompt);
    logActivity("Meminta saran AI Instinct");
  };

  // Menggunakan execCommand sebagai fallback aman di dalam Iframe untuk copy teks
  const copyVisualPrompt = () => {
    const textArea = document.createElement("textarea");
    textArea.value = generatedVisualPrompt;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setIsCopiedPrompt(true);
      setTimeout(() => setIsCopiedPrompt(false), 3000);
    } catch (err) {
      console.error('Fallback copy failed', err);
      alert("Gagal menyalin otomatis. Silakan salin teks secara manual.");
    }
    document.body.removeChild(textArea);
  };

  useEffect(() => {
    setSelectedRows([]);
    setEditingRow(null);
    setIsAdding(false);
    setEditCell({ rowId: null, header: null });
  }, [activeTab]);

  useEffect(() => {
    if(window.innerWidth > 768) setIsSidebarOpen(true);
  }, []);

  useEffect(() => {
    const scripts = [
      "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
    ];
    scripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      document.head.appendChild(script);
    });
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else { await signInAnonymously(auth); }
      } catch (err) { console.error(err); }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // --- HANDLER GEMINI AI ---
  const handleRunAI = async () => {
    setIsAiLoading(true);
    setAiOutput("");
    
    try {
      let prompt = "";
      let sysPrompt = "Anda adalah asisten AI jenius bernama ✨ Hagia AI, spesialis dalam bisnis Jasa Kebersihan (Cleaning Service: cuci kasur, sofa, mobil). Berikan jawaban yang terstruktur, rapi (gunakan markdown bullet points untuk kemudahan baca), dan bernada profesional namun asik.";
      
      if (aiActiveTab === 'analisa') {
         sysPrompt += " Anda bertindak sebagai Chief Marketing Officer (CMO) dan Data Scientist. Jangan mengulang data mentah, tapi berikan insight konklusif.";
         const contextData = {
            filterWaktuSaatIni: filterType,
            omzetTotal: roasReportData.keseluruhan.total.sales,
            biayaIklanTotal: roasReportData.keseluruhan.total.budget,
            totalLeadsAsli: roasReportData.keseluruhan.total.leads,
            costPerAcquisition_CPA: stats.validLeads > 0 ? roasReportData.keseluruhan.total.budget / stats.validLeads : 0,
            rataRataCPC: stats.avgCPC,
            rataRataCTR: stats.avgCTR,
            roasSistem: roasReportData.keseluruhan.total.budget > 0 ? roasReportData.keseluruhan.total.sales / roasReportData.keseluruhan.total.budget : 0,
            jumlahWAKosong_Dropoff: leadsDataChart.wa_kosong
         };
         prompt = `Tolong analisa metrik bisnis real-time berikut (format Rupiah dan Persen). Data Bisnis: ${JSON.stringify(contextData)}. \n1. Buat paragraf ringkasan kesehatan finansial kampanye.\n2. Berikan 3 rekomendasi taktis (apa yang harus dinaikkan/scale-up, dihentikan/kill, atau dievaluasi SOP-nya).`;
      } 
      else if (aiActiveTab === 'copywriter') {
         sysPrompt += " Anda adalah Copywriter Kelas Atas. Buat 2 variasi teks WA Blast/Broadcast (Versi Pendek yang to-the-point & Versi Panjang bercerita) yang sangat persuasif. Gunakan ilmu copywriting AIDA atau PAS. Gunakan emoji secukupnya agar estetik.";
         prompt = `Tolong buatkan skrip copywriting promosi untuk WhatsApp. \nLayanan: ${aiInputData.layanan || 'Semua Layanan Kebersihan Hagia'}. \nPromo/Penawaran Khusus: ${aiInputData.promo || 'Berikan diskon atau free bonus relevan'}. \nTarget Audiens: ${aiInputData.audiens || 'Pelanggan Baru (Dingin)'}. Pastikan ada Call-to-Action (CTA) yang mendesak di akhir.`;
      }
      else if (aiActiveTab === 'cs') {
         sysPrompt += " Anda adalah Customer Service Expert yang ramah, sopan, memiliki empati, dan jago 'handling objection' (teknik membalikkan penolakan) untuk meyakinkan calon pelanggan agar mau booking hari ini juga tanpa terkesan memaksa.";
         prompt = `Pelanggan chat dan mengatakan hal berikut: "${aiInputData.keluhan}". Tolong buatkan draf balasan (reply) WhatsApp yang ramah, profesional, mengatasi keraguan mereka, dan mengarahkan mereka untuk mengisi form order/booking.`;
      }

      const response = await fetchGeminiAI(prompt, sysPrompt);
      setAiOutput(response);
      logActivity(`Mengeksekusi asisten AI untuk task: ${aiActiveTab.toUpperCase()}`);
    } catch (error) {
      setAiOutput(`Terjadi kesalahan jaringan AI: ${error.message}`);
    }
    setIsAiLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    const dbRefs = [
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'master_v6'), setter: setAdsData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'adset_v1'), setter: setAdsetData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'leads_v1'), setter: setLeadsData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'closing_v1'), setter: setClosingData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'kol_v1'), setter: setKolData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'content_v1'), setter: setContentData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'tiktok_daily_v1'), setter: setTiktokDailyData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'youtube_daily_v1'), setter: setYoutubeDailyData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'ig_daily_v1'), setter: setIgDailyData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'fb_daily_v1'), setter: setFbDailyData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'ig_bayangan_v1'), setter: setIgBayanganData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'fb_bayangan_v1'), setter: setFbBayanganData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'tiktok_bayangan_v1'), setter: setTiktokBayanganData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'youtube_bayangan_v1'), setter: setYoutubeBayanganData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'crm_blast_v1'), setter: setCrmBlastData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'kalender_v1'), setter: setKalenderData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'spk_v1'), setter: setSpkData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'daily_ops_v1'), setter: setDailyOpsData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'assets_v1'), setter: setAssetsData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'inventory_v1'), setter: setInventoryData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'complaint_v1'), setter: setComplaintData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'survey_v1'), setter: setSurveyData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'landing_page_v1'), setter: setLpData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'schedule_v1'), setter: setScheduleData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'system_logs_v1'), setter: setLogsData },
      { q: collection(db, 'artifacts', appId, 'public', 'data', 'absensi_v1'), setter: setAbsensiData }
    ];

    const unsubscribes = dbRefs.map(ref => 
      onSnapshot(ref.q, (snapshot) => {
        const data = snapshot.docs.map(doc => {
           const d = doc.data();
           delete d.id; // Mencegah konflik ID internal dari Firestore data
           return { id: doc.id, ...d };
        });
        ref.setter(data);
        if (ref.setter === setAdsData) setLoading(false);
      }, (err) => console.error(err))
    );

    const formulasRef = doc(db, 'artifacts', appId, 'public', 'data', 'config', 'formulas');
    const unsubscribeFormulas = onSnapshot(formulasRef, (docSnap) => {
       if(docSnap.exists() && docSnap.data().formulas) {
          const loaded = docSnap.data().formulas.filter(f => 
             !f.target.toUpperCase().includes('CPM') && 
             !f.target.toUpperCase().includes('CPC') && 
             !f.target.toUpperCase().includes('CTR') &&
             !f.target.toUpperCase().includes('HASIL')
          );
          setCustomFormulas(loaded);
       }
    }, (err) => console.error(err));

    const kpiRef = doc(db, 'artifacts', appId, 'public', 'data', 'config', 'kpi');
    const unsubscribeKpi = onSnapshot(kpiRef, (docSnap) => {
           if(docSnap.exists() && docSnap.data().targets) {
              setKpiTargets(docSnap.data().targets);
           }
        }, (err) => console.error(err));

    const okrRef = doc(db, 'artifacts', appId, 'public', 'data', 'config', 'okr_targets');
    const unsubscribeOkr = onSnapshot(okrRef, (docSnap) => {
           if(docSnap.exists() && docSnap.data().targetsMap) {
              setOkrTargetsMap(docSnap.data().targetsMap);
           }
        }, (err) => console.error(err));

    const schemaRef = doc(db, 'artifacts', appId, 'public', 'data', 'config', 'table_schemas');
    const unsubscribeSchemas = onSnapshot(schemaRef, (docSnap) => {
       if(docSnap.exists() && docSnap.data().schemas) {
          setTableSchemas(docSnap.data().schemas);
       } else {
          setTableSchemas({});
       }
    }, (err) => console.error(err));

        const rolesRef = doc(db, 'artifacts', appId, 'public', 'data', 'config', 'roles');
        const unsubscribeRoles = onSnapshot(rolesRef, (docSnap) => {
           if(docSnap.exists() && docSnap.data().roles) {
              setRolesConfig(docSnap.data().roles);
           } else {
              setRolesConfig(DEFAULT_ROLES);
           }
        }, (err) => console.error(err));

        return () => { unsubscribes.forEach(unsub => unsub()); unsubscribeFormulas(); unsubscribeKpi(); unsubscribeRoles(); unsubscribeOkr(); unsubscribeSchemas(); };
  }, [user]);

  useEffect(() => {
      if (activeTab === 'okr') {
          const [year, month] = okrPeriod.split('-');
          const start = `${year}-${month}-01`;
          const lastDay = new Date(year, month, 0).getDate();
          const end = `${year}-${month}-${lastDay}`;
          setFilterType('custom');
          setDateRange({ start, end });
      }
  }, [okrPeriod, activeTab]);

  // --- HANDLER MANAJEMEN KOLOM ---
  const executeColAction = async () => {
    if (!colManager.newName.trim()) return setErrorMsg("Nama kolom tidak boleh kosong.");
    const newHeaders = [...tableHeaders];
    const newSchemas = { ...(tableSchemas || {}) };
    const targetIdx = newHeaders.indexOf(colManager.targetCol);
    
    if (targetIdx === -1) return;

    if (colManager.type === 'rename') {
        newHeaders[targetIdx] = colManager.newName.trim();
        newSchemas[currentCollection] = newHeaders;

        setUploadState({ isUploading: true, progress: 10, timeLeft: 'Memperbarui nama kolom di database...', rowCount: 0 });
        try {
            await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'config', 'table_schemas'), { schemas: newSchemas });
            
            const currentDataList = getCurrentDataList();
            const ops = [];
            currentDataList.forEach(row => {
                if (row[colManager.targetCol] !== undefined) {
                    ops.push({ 
                        type: 'update', 
                        collection: currentCollection, 
                        id: row.id, 
                        data: {
                            [colManager.newName.trim()]: row[colManager.targetCol],
                            [colManager.targetCol]: deleteField()
                        } 
                    });
                }
            });
            
            await runBatchOperations(ops, (p, t, tot) => setUploadState({ isUploading: true, progress: 10 + (p*0.9), timeLeft: t, rowCount: tot }));
            logActivity(`Mengubah nama kolom '${colManager.targetCol}' menjadi '${colManager.newName}' di tabel ${currentCollection}`);
            setDialog({ isOpen: true, type: 'alert', message: 'Kolom berhasil diubah namanya di seluruh database!' });
        } catch(err) {
            setErrorMsg(err.message);
        }
    } else if (colManager.type === 'add') {
        const insertIdx = colManager.position === 'right' ? targetIdx + 1 : targetIdx;
        newHeaders.splice(insertIdx, 0, colManager.newName.trim());
        newSchemas[currentCollection] = newHeaders;

        try {
            await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'config', 'table_schemas'), { schemas: newSchemas });
            logActivity(`Menambahkan kolom baru '${colManager.newName}' di tabel ${currentCollection}`);
            setDialog({ isOpen: true, type: 'alert', message: 'Kolom baru berhasil ditambahkan!' });
        } catch(err) {
            setErrorMsg(err.message);
        }
    }
    setColManager({ isOpen: false, type: '', targetCol: '', newName: '', position: 'right' });
    setUploadState({ isUploading: false, progress: 0, timeLeft: '', rowCount: 0 });
  };

  const runBatchOperations = async (operations, onProgressUpdate) => {
  
     const CHUNK_SIZE = 400;
     const startTime = Date.now();
     const totalOps = operations.length;

     for(let i=0; i<totalOps; i+=CHUNK_SIZE) {
         const chunk = operations.slice(i, i+CHUNK_SIZE);
         const batch = writeBatch(db);
         chunk.forEach(op => {
             const docRef = doc(db, 'artifacts', appId, 'public', 'data', op.collection, op.id);
             if (op.type === 'set') batch.set(docRef, op.data);
             if (op.type === 'update') batch.update(docRef, op.data);
             if (op.type === 'delete') batch.delete(docRef);
         });
         await batch.commit();

         if (onProgressUpdate) {
            const processed = Math.min(i + CHUNK_SIZE, totalOps);
            const progress = Math.round((processed / totalOps) * 100);
            const elapsed = Date.now() - startTime;
            const timePerOp = processed > 0 ? elapsed / processed : 0;
            const remainingOps = totalOps - processed;
            const timeLeftMs = remainingOps * timePerOp;
            let timeLeftStr = 'Menghitung waktu...';
            if (processed > Math.min(CHUNK_SIZE, totalOps / 4)) {
                if (timeLeftMs > 60000) timeLeftStr = `Kira-kira ${Math.ceil(timeLeftMs/60000)} menit lagi...`;
                else timeLeftStr = `Kira-kira ${Math.ceil(timeLeftMs/1000)} detik lagi...`;
            }
            onProgressUpdate(progress, timeLeftStr, totalOps);
         }
     }
  };

  const logActivity = async (desc) => {
     try {
       await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'system_logs_v1'), {
         timestamp: Date.now(),
         dateStr: new Date().toLocaleString('id-ID'),
         desc
       });
     } catch (e) { console.error("Logging error", e); }
  };

  const pushUndo = (actionPayload) => {
     setUndoStack(prev => [...prev, actionPayload]);
     setRedoStack([]); 
  };

  const handleUndo = async () => {
     if(undoStack.length === 0) return;
     const action = undoStack[undoStack.length - 1];
     
     if (action.type === 'FILTER') {
         setColumnFilters(action.oldData);
         logActivity(`UNDO: Filter Data Dikembalikan`);
         setUndoStack(prev => prev.slice(0, -1));
         setRedoStack(prev => [...prev, action]);
         return;
     }

     setLoading(true);
     try {
         const reverseOps = [];
         if (action.type === 'EDIT_MULTI') {
             action.updates.forEach(u => {
                 const safeData = { ...u.oldData };
                 delete safeData.id;
                 reverseOps.push({ type: 'update', collection: action.collection, id: u.id, data: safeData });
             });
         } else if (action.type === 'DELETE_MULTI') {
             action.docs.forEach(d => {
                 const safeData = { ...d.data };
                 delete safeData.id;
                 reverseOps.push({ type: 'set', collection: action.collection, id: d.id, data: safeData });
             });
         } else if (action.type === 'ADD_MULTI') {
             action.docs.forEach(d => reverseOps.push({ type: 'delete', collection: action.collection, id: d.id }));
         }
         
         await runBatchOperations(reverseOps);
         await logActivity(`UNDO: ${action.desc}`);
         
         setUndoStack(prev => prev.slice(0, -1));
         setRedoStack(prev => [...prev, action]);
     } catch(e) { setErrorMsg(e.message); }
     setLoading(false);
  };

  const handleRedo = async () => {
     if(redoStack.length === 0) return;
     const action = redoStack[redoStack.length - 1];
     
     if (action.type === 'FILTER') {
         setColumnFilters(action.newData);
         logActivity(`REDO: Filter Data Diterapkan Kembali`);
         setRedoStack(prev => prev.slice(0, -1));
         setUndoStack(prev => [...prev, action]);
         return;
     }

     setLoading(true);
     try {
         const forwardOps = [];
         if (action.type === 'EDIT_MULTI') {
             action.updates.forEach(u => {
                 const safeData = { ...u.newData };
                 delete safeData.id;
                 forwardOps.push({ type: 'update', collection: action.collection, id: u.id, data: safeData });
             });
         } else if (action.type === 'DELETE_MULTI') {
             action.docs.forEach(d => forwardOps.push({ type: 'delete', collection: action.collection, id: d.id }));
         } else if (action.type === 'ADD_MULTI') {
             action.docs.forEach(d => {
                 const safeData = { ...d.data };
                 delete safeData.id;
                 forwardOps.push({ type: 'set', collection: action.collection, id: d.id, data: safeData });
             });
         }
         
         await runBatchOperations(forwardOps);
         await logActivity(`REDO: ${action.desc}`);
         
         setRedoStack(prev => prev.slice(0, -1));
         setUndoStack(prev => [...prev, action]);
     } catch(e) { setErrorMsg(e.message); }
     setLoading(false);
  };

  const applyFormulasToRow = (rowData, formulas) => {
    let tempRow = { ...rowData };
    formulas.forEach(f => {
        let expr = f.expression.replace(/\{([^}]+)\}/g, (match, colName) => {
            const key = Object.keys(tempRow).find(k => k.toLowerCase() === colName.toLowerCase().trim());
            return key ? (smartParse(tempRow[key]) || 0) : 0;
        });

        try {
            if (expr.includes('/ 0') || expr.includes('/0')) {
                tempRow[f.target] = "0";
                return;
            }
            let result = Function(`"use strict"; return (${expr})`)();
            if (!isFinite(result) || isNaN(result)) result = 0;
            tempRow[f.target] = String(Number.isInteger(result) ? result : parseFloat(result.toFixed(4)));
        } catch(e) {
            console.error("Formula error on target", f.target, ":", e);
        }
    });
    return tempRow;
  };

  const saveFormula = async () => {
    if(!newFormula.target || !newFormula.expression) return;
    const updated = [...customFormulas, { id: Date.now().toString(), ...newFormula }];
    try {
       await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'config', 'formulas'), { formulas: updated });
       setNewFormula({ target: tableHeaders[0] || ADS_HEADERS[31], expression: '' });
       logActivity(`Membuat rumus baru untuk kolom ${newFormula.target}`);
    } catch(err) { setErrorMsg(String(err.message)); }
  };

  const removeFormula = async (id) => {
    const updated = customFormulas.filter(f => f.id !== id);
    try {
       await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'config', 'formulas'), { formulas: updated });
       logActivity(`Menghapus sebuah rumus sistem`);
    } catch(err) { setErrorMsg(String(err.message)); }
  };

  const handleKpiChange = (id, field, value) => {
     setKpiTargets(kpiTargets.map(k => k.id === id ? { ...k, [field]: value } : k));
  };

  const saveKpiEdits = async () => {
     try {
        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'config', 'kpi'), { targets: kpiTargets });
     } catch(err) { setErrorMsg(String(err.message)); }
  };

  const addKpi = async () => {
     if (!newKpi.name || newKpi.value === '') return;
     const target = { id: `kpi_${Date.now()}`, name: newKpi.name, value: parseFloat(newKpi.value) || 0, unit: newKpi.unit || '' };
     const updated = [...kpiTargets, target];
     setKpiTargets(updated);
     try {
        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'config', 'kpi'), { targets: updated });
        setNewKpi({ name: '', value: '', unit: '' });
        logActivity(`Menambahkan Target KPI baru: ${target.name}`);
     } catch(err) { setErrorMsg(err.message); }
  };

  const removeKpi = async (id) => {
     const updated = kpiTargets.filter(k => k.id !== id);
     setKpiTargets(updated);
     try {
        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'config', 'kpi'), { targets: updated });
        logActivity(`Menghapus salah satu Target KPI`);
     } catch(err) { setErrorMsg(err.message); }
  };

  const handleSaveRole = async () => {
     if (!roleForm.name || !roleForm.pin) return setErrorMsg("Nama dan PIN role wajib diisi.");
     const newRoles = { ...rolesConfig };
     const key = editingRoleKey || `ROLE_${Date.now()}`;
     newRoles[key] = { name: roleForm.name, pin: roleForm.pin, tabs: roleForm.tabs };
     
     try {
        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'config', 'roles'), { roles: newRoles });
        setRolesConfig(newRoles);
        setEditingRoleKey(null);
        setRoleForm({ name: '', pin: '', tabs: [] });
        logActivity(`Menyimpan konfigurasi Role: ${roleForm.name}`);
     } catch (err) { setErrorMsg(err.message); }
  };

  const handleDeleteRole = async (roleKey) => {
     if (roleKey === 'SUPER_ADMIN') return setErrorMsg("Role Super Admin utama tidak dapat dihapus!");
     const newRoles = { ...rolesConfig };
     delete newRoles[roleKey];
     try {
        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'config', 'roles'), { roles: newRoles });
        setRolesConfig(newRoles);
        logActivity(`Menghapus Role: ${roleKey}`);
     } catch (err) { setErrorMsg(err.message); }
  };

  const getFilterBounds = () => {
    const now = new Date();
    let start, end;
    switch (filterType) {
      case 'today':
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        break;
      case 'yesterday':
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59);
        break;
      case 'this_week':
        const day = now.getDay() || 7; 
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day + 1, 0, 0, 0);
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (7 - day), 23, 59, 59);
        break;
      case 'this_month':
        start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        break;
      case 'last_month':
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0);
        end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
        break;
      case 'custom':
        if (dateRange.start) {
           const [y,m,d] = dateRange.start.split('-');
           start = new Date(parseInt(y, 10), parseInt(m, 10)-1, parseInt(d, 10), 0, 0, 0);
        }
        if (dateRange.end) {
           const [y,m,d] = dateRange.end.split('-');
           end = new Date(parseInt(y, 10), parseInt(m, 10)-1, parseInt(d, 10), 23, 59, 59);
        }
        break;
      default:
        break; 
    }
    return { start, end };
  };

  const getPreviousFilterBounds = (currentStart, currentEnd) => {
    if (!currentStart || !currentEnd) return { start: null, end: null };
    const diffTime = Math.abs(currentEnd.getTime() - currentStart.getTime());
    
    const prevEnd = new Date(currentStart.getTime() - 1);
    prevEnd.setHours(23, 59, 59, 999);
    
    const prevStart = new Date(currentStart.getTime() - diffTime - 1);
    prevStart.setHours(0, 0, 0, 0);
    
    return { start: prevStart, end: prevEnd };
  };

  const filterDataList = (dataList, bounds) => {
    const { start, end } = bounds;
    return dataList.filter(item => {
      const dateStr = item.Tanggal || item["Tanggal Pencarian"];
      if (!dateStr) return filterType === 'all';
      const d = parseSafeDateLocal(dateStr);
      
      if (isNaN(d.getTime()) || d.getTime() === 0) return filterType === 'all';
      
      if (start && d.getTime() < start.getTime()) return false;
      if (end && d.getTime() > end.getTime()) return false;
      return true;
    });
  };

  const currentBounds = getFilterBounds();
  const previousBounds = getPreviousFilterBounds(currentBounds.start, currentBounds.end);

  const filteredAdsData = useMemo(() => filterDataList(adsData, currentBounds), [adsData, filterType, dateRange]);
  const filteredAdsetData = useMemo(() => filterDataList(adsetData, currentBounds), [adsetData, filterType, dateRange]);
  const filteredLeadsData = useMemo(() => filterDataList(leadsData, currentBounds), [leadsData, filterType, dateRange]);
  const filteredClosingData = useMemo(() => filterDataList(closingData, currentBounds), [closingData, filterType, dateRange]);
  const filteredKolData = useMemo(() => filterDataList(kolData, currentBounds), [kolData, filterType, dateRange]);
  const filteredContentData = useMemo(() => filterDataList(contentData, currentBounds), [contentData, filterType, dateRange]);
  const filteredTiktokDailyData = useMemo(() => filterDataList(tiktokDailyData, currentBounds), [tiktokDailyData, filterType, dateRange]);
  const filteredYoutubeDailyData = useMemo(() => filterDataList(youtubeDailyData, currentBounds), [youtubeDailyData, filterType, dateRange]);
  const filteredIgDailyData = useMemo(() => filterDataList(igDailyData, currentBounds), [igDailyData, filterType, dateRange]);
  const filteredFbDailyData = useMemo(() => filterDataList(fbDailyData, currentBounds), [fbDailyData, filterType, dateRange]);
  const filteredIgBayanganData = useMemo(() => filterDataList(igBayanganData, currentBounds), [igBayanganData, filterType, dateRange]);
  const filteredFbBayanganData = useMemo(() => filterDataList(fbBayanganData, currentBounds), [fbBayanganData, filterType, dateRange]);
  const filteredTiktokBayanganData = useMemo(() => filterDataList(tiktokBayanganData, currentBounds), [tiktokBayanganData, filterType, dateRange]);
  const filteredYoutubeBayanganData = useMemo(() => filterDataList(youtubeBayanganData, currentBounds), [youtubeBayanganData, filterType, dateRange]);
  const filteredCrmBlastData = useMemo(() => filterDataList(crmBlastData, currentBounds), [crmBlastData, filterType, dateRange]);
  const filteredKalenderData = useMemo(() => filterDataList(kalenderData, currentBounds), [kalenderData, filterType, dateRange]);
  const filteredSpkData = useMemo(() => filterDataList(spkData, currentBounds), [spkData, filterType, dateRange]);
  const filteredDailyOpsData = useMemo(() => filterDataList(dailyOpsData, currentBounds), [dailyOpsData, filterType, dateRange]);
  const filteredAssetsData = useMemo(() => filterDataList(assetsData, currentBounds), [assetsData, filterType, dateRange]);
  const filteredInventoryData = useMemo(() => filterDataList(inventoryData, currentBounds), [inventoryData, filterType, dateRange]);
  const filteredComplaintData = useMemo(() => filterDataList(complaintData, currentBounds), [complaintData, filterType, dateRange]);
  const filteredSurveyData = useMemo(() => filterDataList(surveyData, currentBounds), [surveyData, filterType, dateRange]);
  const filteredLpData = useMemo(() => filterDataList(lpData, currentBounds), [lpData, filterType, dateRange]);
  const filteredScheduleData = useMemo(() => filterDataList(scheduleData, currentBounds), [scheduleData, filterType, dateRange]);

  const prevFilteredAdsData = useMemo(() => filterDataList(adsData, previousBounds), [adsData, filterType, dateRange]);
  const prevFilteredLeadsData = useMemo(() => filterDataList(leadsData, previousBounds), [leadsData, filterType, dateRange]);
  const prevFilteredClosingData = useMemo(() => filterDataList(closingData, previousBounds), [closingData, filterType, dateRange]);

  const totalActualRevenue = useMemo(() => {
      return filteredClosingData.reduce((acc, row) => acc + getExactVal(row, "TOTAL REVENUE", "REVENUE"), 0);
  }, [filteredClosingData]);

  const handleSort = (key, explicitDirection = null) => {
    if (explicitDirection === 'none') {
        setSortConfig({ key: null, direction: 'ascending' });
        return;
    }
    let direction = 'ascending';
    if (explicitDirection) {
       direction = explicitDirection;
    } else if (sortConfig?.key === key && sortConfig?.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const processTableData = (dataList) => {
    let processedItems = dataList.filter(item => {
      for (const key in columnFilters) {
        const allowedValues = columnFilters[key];
        if (allowedValues && allowedValues.length > 0) {
          const cellValue = String(formatTableCell(item[key], tableColFormats[key])).trim();
          if (!allowedValues.includes(cellValue)) return false;
        }
      }
      return true;
    });

    if (sortConfig !== null && sortConfig.key) {
      processedItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'Tanggal' || sortConfig.key === 'Tanggal Pencarian') {
          aValue = parseSafeDateLocal(aValue).getTime() || 0;
          bValue = parseSafeDateLocal(bValue).getTime() || 0;
        } else {
          aValue = smartParse(aValue);
          bValue = smartParse(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return processedItems;
  };

  const processedFilteredAdsData = useMemo(() => processTableData(filteredAdsData), [filteredAdsData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredAdsetData = useMemo(() => processTableData(filteredAdsetData), [filteredAdsetData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredLeadsData = useMemo(() => processTableData(filteredLeadsData), [filteredLeadsData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredClosingData = useMemo(() => processTableData(filteredClosingData), [filteredClosingData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredKolData = useMemo(() => processTableData(filteredKolData), [filteredKolData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredContentData = useMemo(() => processTableData(filteredContentData), [filteredContentData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredTiktokDailyData = useMemo(() => processTableData(filteredTiktokDailyData), [filteredTiktokDailyData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredYoutubeDailyData = useMemo(() => processTableData(filteredYoutubeDailyData), [filteredYoutubeDailyData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredIgDailyData = useMemo(() => processTableData(filteredIgDailyData), [filteredIgDailyData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredFbDailyData = useMemo(() => processTableData(filteredFbDailyData), [filteredFbDailyData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredIgBayanganData = useMemo(() => processTableData(filteredIgBayanganData), [filteredIgBayanganData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredFbBayanganData = useMemo(() => processTableData(filteredFbBayanganData), [filteredFbBayanganData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredTiktokBayanganData = useMemo(() => processTableData(filteredTiktokBayanganData), [filteredTiktokBayanganData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredYoutubeBayanganData = useMemo(() => processTableData(filteredYoutubeBayanganData), [filteredYoutubeBayanganData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredCrmBlastData = useMemo(() => processTableData(filteredCrmBlastData), [filteredCrmBlastData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredKalenderData = useMemo(() => processTableData(filteredKalenderData), [filteredKalenderData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredSpkData = useMemo(() => processTableData(filteredSpkData), [filteredSpkData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredDailyOpsData = useMemo(() => processTableData(filteredDailyOpsData), [filteredDailyOpsData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredAssetsData = useMemo(() => processTableData(filteredAssetsData), [filteredAssetsData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredInventoryData = useMemo(() => processTableData(filteredInventoryData), [filteredInventoryData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredComplaintData = useMemo(() => processTableData(filteredComplaintData), [filteredComplaintData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredSurveyData = useMemo(() => processTableData(filteredSurveyData), [filteredSurveyData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredLpData = useMemo(() => processTableData(filteredLpData), [filteredLpData, sortConfig, columnFilters, tableColFormats]);
  const processedFilteredScheduleData = useMemo(() => processTableData(filteredScheduleData), [filteredScheduleData, sortConfig, columnFilters, tableColFormats]);

  const getUniqueValuesForCol = (col) => {
     const baseData = isAdsTab ? filteredAdsData : isAdsetTab ? filteredAdsetData : isLeadsTab ? filteredLeadsData : isClosingTab ? filteredClosingData : isKolTab ? filteredKolData : isContentTab ? filteredContentData : isScheduleTab ? filteredScheduleData : isLpTab ? filteredLpData : isTiktokDailyTab ? filteredTiktokDailyData : isYoutubeDailyTab ? filteredYoutubeDailyData : isIgDailyTab ? filteredIgDailyData : isFbDailyTab ? filteredFbDailyData : isIgBayanganTab ? filteredIgBayanganData : isFbBayanganTab ? filteredFbBayanganData : isTiktokBayanganTab ? filteredTiktokBayanganData : isYoutubeBayanganTab ? filteredYoutubeBayanganData : isCrmBlastTab ? filteredCrmBlastData : isKalenderTab ? filteredKalenderData : isSpkTab ? filteredSpkData : isDailyOpsTab ? filteredDailyOpsData : isAssetsTab ? filteredAssetsData : isInventoryTab ? filteredInventoryData : isComplaintTab ? filteredComplaintData : isSurveyTab ? filteredSurveyData : filteredDailyOpsData;
     
     const filteredForThisCol = baseData.filter(item => {
         for (const key in columnFilters) {
             if (key === col) continue; 
             const allowedValues = columnFilters[key];
             if (allowedValues && allowedValues.length > 0) {
                 const cellValue = String(formatTableCell(item[key], tableColFormats[key])).trim();
                 if (!allowedValues.includes(cellValue)) return false;
             }
         }
         return true;
     });
     
     return [...new Set(filteredForThisCol.map(item => String(formatTableCell(item[col], tableColFormats[col])).trim()))].sort();
  };

  const uniqueValuesForCol = useMemo(() => {
     if (!filterModalCol) return [];
     return getUniqueValuesForCol(filterModalCol);
  }, [filterModalCol, filteredAdsData, filteredAdsetData, filteredLeadsData, filteredClosingData, isAdsTab, isAdsetTab, isLeadsTab, tableColFormats, columnFilters]);

  const filteredUniqueValues = useMemo(() => {
     return uniqueValuesForCol.filter(val => val.toLowerCase().includes(filterSearch.toLowerCase()));
  }, [uniqueValuesForCol, filterSearch]);

  const openFilterModal = (col) => {
     setFilterModalCol(col);
     setFilterSearch("");
     const allUnique = getUniqueValuesForCol(col);
     if (columnFilters[col] && columnFilters[col].length > 0) {
       setTempFilterValues(columnFilters[col]);
     } else {
       setTempFilterValues(allUnique);
     }
  };

  const applyFilter = () => {
     const allUnique = getUniqueValuesForCol(filterModalCol);
     const isAllSelected = allUnique.every(v => tempFilterValues.includes(v)) && tempFilterValues.length >= allUnique.length;
     
     let newFilters = { ...columnFilters };
     if (isAllSelected || tempFilterValues.length === 0) {
       delete newFilters[filterModalCol];
     } else {
       newFilters = { ...columnFilters, [filterModalCol]: tempFilterValues };
     }
     
     updateFiltersAndLog(newFilters, `Menerapkan filter pada kolom ${filterModalCol}`);
     setFilterModalCol(null);
  };

  // FUNGSI RENDER CELL DENGAN SENSOR DATA (RBAC)
  const renderMaskedCell = (val, formatType, header) => {
     // Masking Nomor HP untuk Tim Marketing & Ops Lapangan
     if (formatType === 'phone' && (activeRole === 'MARKETING' || activeRole === 'OPS_LAPANGAN')) {
        return <span className="text-slate-400 italic font-bold px-2">*** Disensor ***</span>;
     }

     // Masking Data Keuangan / Omzet / Biaya untuk Tim Ops Lapangan
     if ((formatType === 'currency' || header.toLowerCase().includes('biaya') || header.toLowerCase().includes('sales') || header.toLowerCase().includes('nominal') || header.toLowerCase().includes('revenue')) && activeRole === 'OPS_LAPANGAN') {
        return <span className="text-slate-400 italic px-2">Rp ***.***</span>;
     }
     
     return renderTableCell(val, formatType);
  };

  const getCurrentProcessedData = () => {
    if (isAdsTab) return processedFilteredAdsData;
    if (isAdsetTab) return processedFilteredAdsetData;
    if (isLeadsTab) return processedFilteredLeadsData;
    if (isClosingTab) return processedFilteredClosingData;
    if (isKolTab) return processedFilteredKolData;
    if (isContentTab) return processedFilteredContentData;
    if (isScheduleTab) return processedFilteredScheduleData;
    if (isLpTab) return processedFilteredLpData;
    if (isTiktokDailyTab) return processedFilteredTiktokDailyData;
    if (isYoutubeDailyTab) return processedFilteredYoutubeDailyData;
    if (isIgDailyTab) return processedFilteredIgDailyData;
    if (isFbDailyTab) return processedFilteredFbDailyData;
    if (isIgBayanganTab) return processedFilteredIgBayanganData;
    if (isFbBayanganTab) return processedFilteredFbBayanganData;
    if (isTiktokBayanganTab) return processedFilteredTiktokBayanganData;
    if (isYoutubeBayanganTab) return processedFilteredYoutubeBayanganData;
    if (isCrmBlastTab) return processedFilteredCrmBlastData;
    if (isKalenderTab) return processedFilteredKalenderData;
    if (isSpkTab) return processedFilteredSpkData;
    if (isDailyOpsTab) return processedFilteredDailyOpsData;
    if (isAssetsTab) return processedFilteredAssetsData;
    if (isInventoryTab) return processedFilteredInventoryData;
    if (isComplaintTab) return processedFilteredComplaintData;
    if (isSurveyTab) return processedFilteredSurveyData;
    return [];
  };

  // Helper untuk menghitung Total / Rata-rata dinamis di tabel
  const getColumnTotal = (header, dataList, format) => {
     if (dataList.length === 0) return "-";
     const lowerH = header.toLowerCase();
     const isText = format === 'text' || format === 'phone' || lowerH.includes('tanggal') || lowerH.includes('jam') || lowerH.includes('nama') || lowerH.includes('layanan');
     if (isText) return "-";

     let sum = 0;
     let count = 0;
     dataList.forEach(row => {
         let val = smartParse(row[header]);
         if (!isNaN(val) && row[header] !== "" && row[header] !== undefined) {
             sum += val;
             count++;
         }
     });

     if (count === 0) return "-";

     // Menentukan secara cerdas apakah kolom ini harus dirata-rata (bukan ditambah)
     const isAverage = lowerH.includes('cpm') || lowerH.includes('cpc') || lowerH.includes('ctr') || lowerH.includes('cpr') || lowerH.includes('roas') || lowerH.includes('rate') || lowerH.includes('frekuensi') || lowerH.includes('persentase') || lowerH.includes('per ') || lowerH.includes('aov') || lowerH.includes('average');

     let finalVal = isAverage ? (sum / count) : sum;

     if (format === 'currency') return formatIDR(finalVal);
     if (format === 'percent') return `${Number.isInteger(finalVal) ? finalVal : finalVal.toFixed(2)}%`;
     if (format === 'number') return isAverage ? parseFloat(finalVal.toFixed(2)).toLocaleString('id-ID') : finalVal.toLocaleString('id-ID');
     
     return finalVal;
  };

  const buildTimelineData = (ads, leads) => {
      const dateMap = {};
      
      ads.forEach(ad => {
          const dStr = ad.Tanggal;
          if (!dStr) return;
          const parsed = parseSafeDateLocal(dStr);
          if (parsed.getTime() === 0) return;
          
          const cleanDate = `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
          
          if(!dateMap[cleanDate]) dateMap[cleanDate] = { date: cleanDate, Cost: 0, Sales: 0, Leads: 0, Closing: 0, CPC: 0, CTR: 0, Impresi: 0, ClicksSemua: 0 };
          dateMap[cleanDate].Cost += getExactVal(ad, "Biaya Iklan", "Biaya Iklan");
          
          dateMap[cleanDate].CPC += getExactVal(ad, "CPC (Biaya per Klik Tautan) (IDR)", "CPC");
          dateMap[cleanDate].CTR += getExactVal(ad, "CTR (Rasio Klik Tayang Tautan)", "CTR");
          dateMap[cleanDate].Impresi += getExactVal(ad, "Impresi", "Impresi");
          dateMap[cleanDate].ClicksSemua += getExactVal(ad, "Klik Tautan Semua", "Klik Tautan Semua");
      });

      leads.forEach(lead => {
          const dStr = lead.Tanggal;
          if (!dStr) return;
          const parsed = parseSafeDateLocal(dStr);
          if (parsed.getTime() === 0) return;

          const cleanDate = `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
          
          if(!dateMap[cleanDate]) dateMap[cleanDate] = { date: cleanDate, Cost: 0, Sales: 0, Leads: 0, Closing: 0, CPC: 0, CTR: 0, Impresi: 0, ClicksSemua: 0 };
          dateMap[cleanDate].Sales += smartParse(lead["Nominal Closing"]);
          dateMap[cleanDate].Leads += 1;
          if(checkClosing(lead["Closing"]) || smartParse(lead["Nominal Closing"]) > 0) dateMap[cleanDate].Closing += 1;
      });

      return Object.values(dateMap).sort((a,b) => parseSafeDateLocal(a.date).getTime() - parseSafeDateLocal(b.date).getTime());
  };

  const buildRoasReportData = (leads, ads) => {
    const createEmptySource = () => {
       const obj = { total: { sales:0, leads:0, lk:0, closing:0, budget:0 } };
       SERVICES_LIST.forEach(s => {
          obj[s.id] = { sales:0, leads:0, lk:0, closing:0, budget: 0 };
       });
       return obj;
    };

    const report = {
      iklan_saja: createEmptySource(),
      ig_wa_dm: createEmptySource(),
      organik: createEmptySource(),
      wa_kosong: createEmptySource(),
      existing: createEmptySource(),
      blast_existing: createEmptySource(),
      keseluruhan: createEmptySource()
    };

    leads.forEach(lead => {
      const sourceKey = categorizeSource(lead["Asal Leads"]);
      const serviceKey = categorizeService(lead["Layanan"]);
      const salesVal = smartParse(lead["Nominal Closing"]);
      const isLk = checkLuarKota(lead["Lokasi"], lead["Catatan"]) ? 1 : 0;
      const isClosing = (checkClosing(lead["Closing"]) || salesVal > 0) ? 1 : 0;

      if (report[sourceKey] && report[sourceKey][serviceKey]) {
        report[sourceKey][serviceKey].sales += salesVal;
        report[sourceKey][serviceKey].leads += 1;
        report[sourceKey][serviceKey].lk += isLk;
        report[sourceKey][serviceKey].closing += isClosing;

        report[sourceKey].total.sales += salesVal;
        report[sourceKey].total.leads += 1;
        report[sourceKey].total.lk += isLk;
        report[sourceKey].total.closing += isClosing;
      }

      if (report.keseluruhan[serviceKey]) {
        report.keseluruhan[serviceKey].sales += salesVal;
        report.keseluruhan[serviceKey].leads += 1;
        report.keseluruhan[serviceKey].lk += isLk;
        report.keseluruhan[serviceKey].closing += isClosing;

        report.keseluruhan.total.sales += salesVal;
        report.keseluruhan.total.leads += 1;
        report.keseluruhan.total.lk += isLk;
        report.keseluruhan.total.closing += isClosing;
      }
    });

    let totalBudget = { total: 0 };
    SERVICES_LIST.forEach(s => totalBudget[s.id] = 0);

    ads.forEach(ad => {
      SERVICES_LIST.forEach(s => {
        const spend = getExactVal(ad, s.adKey, s.adKey);
        totalBudget[s.id] += spend;
        totalBudget.total += spend;
      });
      const trueTotalSpend = getExactVal(ad, "Biaya Iklan", "Biaya Iklan");
      if (trueTotalSpend > totalBudget.total) totalBudget.total = trueTotalSpend;
    });

    report.iklan_saja.total.budget = totalBudget.total;
    report.keseluruhan.total.budget = totalBudget.total;
    
    SERVICES_LIST.forEach(s => {
      report.iklan_saja[s.id].budget = totalBudget[s.id];
      report.keseluruhan[s.id].budget = totalBudget[s.id];
    });

    return report;
  };

  const buildStatsData = (ads, timelineData) => {
    const initial = { 
      spend: 0, sales: 0, salesIklan: 0, 
      metaHasil: 0, validLeads: 0, waLeads: 0, igWaLeads: 0, dmValidLeads: 0,
      closing: 0, closingIklan: 0, impresi: 0, clicks: 0, clicksSemua: 0, reach: 0,
      cpmTotal: 0, cpcTotal: 0, ctrTotal: 0, cprTotal: 0, rowCount: 0
    };

    const res = ads.reduce((acc, curr) => {
      acc.spend += getExactVal(curr, "Biaya Iklan", "Biaya Iklan");
      acc.salesIklan += getExactVal(curr, "Total Sales Iklan", "Sales Iklan");
      acc.metaHasil += getExactVal(curr, "Hasil", "Hasil");
      acc.validLeads += (getExactVal(curr, "Total Keseluruhan Leads", "Total Leads"));
      acc.waLeads += getExactVal(curr, "Leads Iklan Whatsapp", "WA");
      acc.igWaLeads += getExactVal(curr, "Leads Instagram Whatsapp", "IG");
      acc.dmValidLeads += getExactVal(curr, "Leads DM", "DM");
      acc.closingIklan += getExactVal(curr, "Total Closing Iklan", "Closing Iklan");
      acc.impresi += getExactVal(curr, "Impresi", "Impresi");
      acc.reach += getExactVal(curr, "Reach", "Reach");
      
      acc.clicks += getExactVal(curr, "Hasil", "Hasil");
      acc.clicksSemua += getExactVal(curr, "Klik Tautan Semua", "Klik Tautan Semua");

      acc.cpmTotal += getExactVal(curr, "CPM (Biaya Per 1.000 Tayangan) (IDR)", "CPM");
      acc.cpcTotal += getExactVal(curr, "CPC (Biaya per Klik Tautan) (IDR)", "CPC");
      acc.ctrTotal += getExactVal(curr, "CTR (Rasio Klik Tayang Tautan)", "CTR");
      acc.cprTotal += getExactVal(curr, "Biaya Iklan per hasil", "per hasil");
      acc.rowCount += 1;
      return acc;
    }, initial);

    res.avgCPM = res.rowCount > 0 ? res.cpmTotal / res.rowCount : 0;
    res.avgCPC = res.rowCount > 0 ? res.cpcTotal / res.rowCount : 0;
    res.avgCTR = res.rowCount > 0 ? res.ctrTotal / res.rowCount : 0;
    res.avgCPR = res.rowCount > 0 ? res.cprTotal / res.rowCount : 0;
    
    res.chartDataList = timelineData;

    return res;
  };

  const roasReportData = useMemo(() => buildRoasReportData(filteredLeadsData, filteredAdsData), [filteredLeadsData, filteredAdsData]);
  
  const currentTimeline = useMemo(() => buildTimelineData(filteredAdsData, filteredLeadsData), [filteredAdsData, filteredLeadsData]);
  const stats = useMemo(() => buildStatsData(filteredAdsData, currentTimeline), [filteredAdsData, currentTimeline]);
  
  const prevTimeline = useMemo(() => buildTimelineData(prevFilteredAdsData, prevFilteredLeadsData), [prevFilteredAdsData, prevFilteredLeadsData]);
  const prevRoasReportData = useMemo(() => buildRoasReportData(prevFilteredLeadsData, prevFilteredAdsData), [prevFilteredLeadsData, prevFilteredAdsData]);
  const prevStats = useMemo(() => buildStatsData(prevFilteredAdsData, prevTimeline), [prevFilteredAdsData, prevTimeline]);

  const trends = useMemo(() => {
     if (filterType === 'all') return {}; 
     
     const currentRoas = roasReportData.keseluruhan.total.budget > 0 ? (roasReportData.keseluruhan.total.sales / roasReportData.keseluruhan.total.budget) : 0;
     const prevRoas = prevRoasReportData.keseluruhan.total.budget > 0 ? (prevRoasReportData.keseluruhan.total.sales / prevRoasReportData.keseluruhan.total.budget) : 0;
     
     const currentCpa = roasReportData.keseluruhan.total.closing > 0 ? (roasReportData.keseluruhan.total.budget / roasReportData.keseluruhan.total.closing) : roasReportData.keseluruhan.total.budget;
     const prevCpa = prevRoasReportData.keseluruhan.total.closing > 0 ? (prevRoasReportData.keseluruhan.total.budget / prevRoasReportData.keseluruhan.total.closing) : prevRoasReportData.keseluruhan.total.budget;

     const currentRevenue = filteredClosingData.reduce((acc, row) => acc + getExactVal(row, "TOTAL REVENUE", "REVENUE"), 0);
     const prevRevenue = prevFilteredClosingData.reduce((acc, row) => acc + getExactVal(row, "TOTAL REVENUE", "REVENUE"), 0);

     return {
        sales: calculateTrend(roasReportData.keseluruhan.total.sales, prevRoasReportData.keseluruhan.total.sales),
        revenue: calculateTrend(currentRevenue, prevRevenue),
        spend: calculateTrend(roasReportData.keseluruhan.total.budget, prevRoasReportData.keseluruhan.total.budget, true), 
        roas: calculateTrend(currentRoas, prevRoas),
        cpa: calculateTrend(currentCpa, prevCpa, true),
        ctr: calculateTrend(stats.avgCTR, prevStats.avgCTR),
        cpc: calculateTrend(stats.avgCPC, prevStats.avgCPC, true),
        cpm: calculateTrend(stats.avgCPM, prevStats.avgCPM, true),
        cpr: calculateTrend(stats.avgCPR, prevStats.avgCPR, true)
     }
  }, [roasReportData, prevRoasReportData, stats, prevStats, filterType, filteredClosingData, prevFilteredClosingData]);

  const leadsDataChart = useMemo(() => {
    const res = { wa_kosong: 0, iklan_saja: 0, ig_wa_dm: 0, organik: 0, existing: 0, blast_existing: 0, total: 0, terjangkau: 0, luarkota: 0 };
    filteredLeadsData.forEach(lead => {
      res.total++;
      res[categorizeSource(lead["Asal Leads"])]++;
      if (checkLuarKota(lead["Lokasi"], lead["Catatan"])) res.luarkota++;
      else res.terjangkau++;
    });
    
    res.chartArray = [
      { name: 'Iklan Saja', value: res.iklan_saja, fill: '#3b82f6' },
      { name: 'IG DM/WA', value: res.ig_wa_dm, fill: '#8b5cf6' },
      { name: 'Organik', value: res.organik, fill: '#10b981' },
      { name: 'Database Existing', value: res.existing, fill: '#f59e0b' },
      { name: 'Blast Existing', value: res.blast_existing, fill: '#d97706' },
      { name: 'WA Kosong', value: res.wa_kosong, fill: '#ef4444' }
    ];
    
    return res;
  }, [filteredLeadsData]);

  const closingPerformanceData = useMemo(() => {
    const res = { 
      total_closing: 0,
      total_leads: 0,
      total_sales: 0,
      locMap: {},
      sources: {
        iklan_meta: { leads: 0, closing: 0, sales: 0, label: 'Iklan Meta (WA & IG)' }, 
        organik: { leads: 0, closing: 0, sales: 0, label: 'Organik' },
        existing: { leads: 0, closing: 0, sales: 0, label: 'Database Existing' },
        blast_existing: { leads: 0, closing: 0, sales: 0, label: 'Blast Existing' },
      },
      detailsArray: []
    };

    const detailsMap = {
      iklan_saja: { name: 'Iklan Meta WA', leads: 0, closing: 0, sales: 0, idKey: 'iklan_saja' },
      ig_wa_dm: { name: 'Instagram & DM', leads: 0, closing: 0, sales: 0, idKey: 'ig_wa_dm' },
      organik: { name: 'Organik Web/SEO', leads: 0, closing: 0, sales: 0, idKey: 'organik' },
      existing: { name: 'Database Existing', leads: 0, closing: 0, sales: 0, idKey: 'existing' },
      blast_existing: { name: 'Blast & Promo', leads: 0, closing: 0, sales: 0, idKey: 'blast_existing' },
      wa_kosong: { name: 'Lead Drop / WA Kosong', leads: 0, closing: 0, sales: 0, idKey: 'wa_kosong' },
    };

    filteredLeadsData.forEach(lead => {
      res.total_leads++;
      const source = categorizeSource(lead["Asal Leads"]);
      const isClosing = checkClosing(lead["Closing"]) || smartParse(lead["Nominal Closing"]) > 0;
      const salesVal = smartParse(lead["Nominal Closing"]);

      let categoryKey = 'organik';
      if (source === 'iklan_saja' || source === 'ig_wa_dm') categoryKey = 'iklan_meta';
      else if (source === 'existing') categoryKey = 'existing';
      else if (source === 'blast_existing') categoryKey = 'blast_existing';
      else if (source === 'wa_kosong') categoryKey = 'wa_kosong'; 

      if (res.sources[categoryKey]) res.sources[categoryKey].leads++;
      if (detailsMap[source]) detailsMap[source].leads++;

      if (isClosing) {
        res.total_closing++;
        res.total_sales += salesVal;
        
        if (res.sources[categoryKey]) {
            res.sources[categoryKey].closing++;
            res.sources[categoryKey].sales += salesVal;
        }
        
        if (detailsMap[source]) {
            detailsMap[source].closing++;
            detailsMap[source].sales += salesVal;
        }

        const loc = (lead["Lokasi"] || 'Tidak Diketahui').trim();
        res.locMap[loc] = (res.locMap[loc] || 0) + 1;
      }
    });

    res.chartArray = Object.keys(res.sources).map(k => {
       const data = res.sources[k];
       return {
          name: data.label,
          closing: data.closing,
          leads: data.leads,
          sales: data.sales,
          cr: data.leads > 0 ? parseFloat(((data.closing / data.leads) * 100).toFixed(1)) : 0
       };
    }).sort((a,b) => b.closing - a.closing); 

    res.detailsArray = Object.values(detailsMap).map(d => ({
        ...d,
        cr: d.leads > 0 ? parseFloat(((d.closing / d.leads) * 100).toFixed(1)) : 0
    })).sort((a,b) => b.closing - a.closing);

    res.topLocations = Object.entries(res.locMap).map(([name, closing]) => ({ name, closing })).sort((a,b) => b.closing - a.closing).slice(0, 6);

    return res;
  }, [filteredLeadsData]);

  const csStats = useMemo(() => {
    const map = {};
    filteredLeadsData.forEach(l => {
       const admin = (l["Admin"] || 'Tidak Terdata').trim();
       if(!map[admin]) map[admin] = { leads: 0, closing: 0, sales: 0 };
       map[admin].leads++;
       if(checkClosing(l["Closing"]) || smartParse(l["Nominal Closing"]) > 0) map[admin].closing++;
       map[admin].sales += smartParse(l["Nominal Closing"]);
    });
    return Object.entries(map).map(([name, data]) => ({
       name, ...data, cr: data.leads > 0 ? ((data.closing/data.leads)*100).toFixed(1) : 0
    })).sort((a,b) => b.closing - a.closing);
  }, [filteredLeadsData]);

  const timeStats = useMemo(() => {
    const map = Array(24).fill(0);
    filteredLeadsData.forEach(l => {
       const jam = String(l["Jam Masuk Chat"] || "");
       let hour = parseInt(jam.substring(0,2), 10);
       if(!isNaN(hour) && hour >= 0 && hour < 24) {
          map[hour]++;
       }
    });
    return map.map((count, hr) => ({ name: `${hr.toString().padStart(2, '0')}:00`, leads: count }));
  }, [filteredLeadsData]);

  const qualityStats = useMemo(() => {
    let hot = 0, warm = 0, cold = 0, unlabeled = 0;
    filteredLeadsData.forEach(l => {
       const q = String(l["Kualitas"] || "").toLowerCase().trim();
       if (q.includes('hot')) hot++;
       else if (q.includes('warm')) warm++;
       else if (q.includes('cold')) cold++;
       else unlabeled++;
    });
    return [
      { name: 'Hot', value: hot, fill: '#ef4444' },
      { name: 'Warm', value: warm, fill: '#f59e0b' },
      { name: 'Cold', value: cold, fill: '#3b82f6' },
      { name: 'Tidak Terlabel', value: unlabeled, fill: '#94a3b8' }
    ];
  }, [filteredLeadsData]);

  const fuStats = useMemo(() => {
    const statusMap = { 'Belum Follow Up': 0, 'Follow Up 1': 0, 'Follow Up 2': 0, 'Follow Up 3': 0, 'Lainnya': 0 };
    filteredLeadsData.forEach(l => {
      const s = String(l["Status Follow Up"] || "").toLowerCase();
      if(s.includes('belum')) statusMap['Belum Follow Up']++;
      else if(s.includes('1') || String(l["FU H+1"]).length > 1) statusMap['Follow Up 1']++;
      else if(s.includes('2')) statusMap['Follow Up 2']++;
      else if(s.includes('3') || String(l["FU H+3"]).length > 1) statusMap['Follow Up 3']++;
      else statusMap['Lainnya']++;
    });
    return Object.entries(statusMap).map(([name, value]) => ({ name, value }));
  }, [filteredLeadsData]);

  const geoStats = useMemo(() => {
    const map = {};
    filteredLeadsData.forEach(l => {
      const loc = (l["Lokasi"] || 'Tidak Diketahui').trim();
      if(!map[loc]) map[loc] = 0;
      map[loc]++;
    });
    return Object.entries(map).map(([name, leads]) => ({ name, leads })).sort((a,b) => b.leads - a.leads).slice(0, 10);
  }, [filteredLeadsData]);

  const categoryAnalytics = useMemo(() => {
    return SERVICES_LIST.map(s => {
      const adsData = roasReportData.iklan_saja[s.id];
      const allData = roasReportData.keseluruhan[s.id];
      return {
        id: s.id,
        name: s.name,
        sales: allData.sales,
        spend: allData.budget,
        leads: allData.leads,
        closing: allData.closing,
        roas: allData.budget > 0 ? (allData.sales / allData.budget).toFixed(2) : 0,
        cr: allData.leads > 0 ? ((allData.closing / allData.leads) * 100).toFixed(1) : 0,
        fullMark: 10
      }
    });
  }, [roasReportData]);

  // --- TAMBAHAN: Logika Data Analisa Adset Spesifik ---
  const adsetAnalytics = useMemo(() => {
    const map = {};
    filteredAdsetData.forEach(row => {
      const adsetName = String(row["Nama Adset"] || 'Tanpa Nama').trim();
      if (!map[adsetName]) {
        map[adsetName] = {
          name: adsetName,
          spend: 0,
          results: 0,
          metaHasil: 0,
          clicks: 0,
          impressions: 0,
          igVisits: 0,
          cpcSum: 0,
          ctrLinkSum: 0,
          ctrAllSum: 0,
          rowCount: 0,
          campaign: row["Campaign Layanan"] || '-'
        };
      }
      map[adsetName].spend += getExactVal(row, "Biaya Iklan", "Biaya Iklan");
      map[adsetName].results += getExactVal(row, "Total Leads Iklan", "Total Leads Iklan") || 0;
      map[adsetName].metaHasil += getExactVal(row, "Hasil Klik Tautan", "Hasil Klik Tautan") || getExactVal(row, "Hasil", "Hasil");
      map[adsetName].clicks += getExactVal(row, "Klik Tautan Semua", "Klik Tautan Semua");
      map[adsetName].impressions += getExactVal(row, "Impresi", "Impresi");
      map[adsetName].igVisits += getExactVal(row, "Kunjungan Profil IG by Meta", "Kunjungan Profil");
      
      map[adsetName].cpcSum += getExactVal(row, "CPC (Biaya per Klik Tautan) (IDR)", "CPC");
      map[adsetName].ctrLinkSum += getExactVal(row, "CTR (Rasio Klik Tayang Tautan)", "CTR (Rasio");
      map[adsetName].ctrAllSum += getExactVal(row, "CTR Semua", "CTR Semua");
      map[adsetName].rowCount += 1;
    });

    return Object.values(map).map(adset => ({
      ...adset,
      cpr: adset.results > 0 ? adset.spend / adset.results : (adset.metaHasil > 0 ? adset.spend / adset.metaHasil : 0),
      ctrLinkAvg: adset.rowCount > 0 ? adset.ctrLinkSum / adset.rowCount : 0,
      ctrAllAvg: adset.rowCount > 0 ? adset.ctrAllSum / adset.rowCount : 0,
      cpcAvg: adset.rowCount > 0 ? adset.cpcSum / adset.rowCount : 0
    })).sort((a, b) => b.spend - a.spend); // Sortir otomatis dari budget yang paling banyak dihabiskan
  }, [filteredAdsetData]);

  const getTarget = (id, fallback) => {
     const t = kpiTargets.find(k => k.id === id);
     return t !== undefined ? parseFloat(t.value) : fallback;
  };

  const getAnalysis = (tab) => {
    const spend = roasReportData.keseluruhan.total.budget;
    const salesAll = roasReportData.keseluruhan.total.sales;
    const closingAll = roasReportData.keseluruhan.total.closing;
    const leadsAll = roasReportData.keseluruhan.total.leads;
    
    const roas = spend > 0 ? (salesAll / spend) : 0;
    const cpaValid = closingAll > 0 ? spend / closingAll : 0;
    const isDaily = filterType === 'today';

    const t_roas_all = getTarget('roas_overall', 4.0);
    const t_cpa = getTarget('cpa', 15000);
    const waKosongRate = leadsDataChart.total > 0 ? (leadsDataChart.wa_kosong / leadsDataChart.total) * 100 : 0;

    if (tab === 'summary') {
      return [
         { title: "1. Kesehatan Profitabilitas (ROAS)", status: roas >= t_roas_all ? "success" : "danger", text: `ROAS Keseluruhan: ${roas.toFixed(2)}x (Target: ${t_roas_all}x). ${roas >= t_roas_all ? 'Sangat sehat dan profit. Layak tambah budget.' : 'Perhatian: Di bawah target profit. Segera matikan adset boncos atau ubah skrip jualan.'}` },
         { title: "2. Efisiensi Akuisisi Deal (CPA)", status: cpaValid > (t_cpa * 1.5) ? "danger" : "success", text: `Biaya rata-rata untuk mendapat 1 pelanggan (CPA) adalah ${formatIDR(cpaValid)}. Terus pertahankan angka ini serendah mungkin dengan evaluasi materi iklan.` },
         { title: "3. Booking vs Revenue Aktual", status: "info", text: `Total booking masuk (Gross Sales) tercatat ${formatIDR(salesAll)}, sedangkan uang riil yang sudah ditransfer (Net Revenue) adalah ${formatIDR(totalActualRevenue)}. Selalu pantau selisih gap antara keduanya.` },
         { title: "4. Peringatan Serapan Iklan", status: "warning", text: `Total pengeluaran uang iklan di Meta adalah ${formatIDR(spend)}. Lakukan pemantauan setiap sore, jika uang habis tapi chat sepi, artinya algoritma melenceng.` },
         { title: "5. Evaluasi Hari Ini", status: isDaily && spend > 0 && salesAll === 0 ? "danger" : "action", text: (isDaily && spend > 0 && salesAll === 0) ? "ALERT: Kampanye bakar uang hari ini namun omzet Rp0. Periksa performa tim sales!" : "Sistem dalam kondisi normal. Selalu ingatkan CS untuk memindahkan data deal ke tabel Closing." }
      ];
    }
    if (tab === 'meta') {
       const ctr = stats.avgCTR;
       return [
         { title: "1. Kualitas Video/Gambar Iklan (CTR)", status: ctr >= 1.5 ? "success" : "danger", text: `CTR (Rasio Klik Tautan) berada di ${ctr.toFixed(2)}%. ${ctr < 1.5 ? 'Terlalu banyak yang skip. Hook/Detik awal konten gagal memancing audiens. Buat konten baru!' : 'Materi visual berjalan sangat baik dan disukai market.'}` },
         { title: "2. Biaya Lelang Iklan (CPC)", status: "info", text: `Anda membayar ${formatIDR(stats.avgCPC)} setiap 1 orang klik link. Jika semakin mahal tiap minggunya, ini pertanda audiens jenuh (Ad Fatigue).` },
         { title: "3. Indikator CPR Meta vs Real CPL", status: "warning", text: `Jangan tertipu angka Cost per Result di Ads Manager (${formatIDR(stats.avgCPR)}). Bandingkan terus dengan total leads nyata di database untuk deteksi WA Drop/Kosong.` },
         { title: "4. Analisa Kompetitor (CPM)", status: "action", text: `Biaya tayang per 1000 orang (CPM) ${formatIDR(stats.avgCPM)}. CPM yang melonjak tinggi berarti pesaing berani bayar mahal di target market yang sama dengan Anda.` },
         { title: "5. Konversi Impresi ke Klik", status: "success", text: `Ada ${stats.clicksSemua.toLocaleString('id-ID')} ketukan dari total ${stats.impresi.toLocaleString('id-ID')} kali iklan tayang. Optimalkan terus copywriting headline Anda!` }
       ];
    }
    if (tab === 'adset_analysis') {
       return [
         { title: "1. Deteksi Winning Adset", status: "success", text: "Fokuskan minimal 70% budget pada Adset teratas yang memiliki kombinasi 'Hasil Leads' banyak dan 'Cost / Result' (CPR) termurah." },
         { title: "2. Potong Kampanye Boncos", status: "danger", text: "Urutkan berdasarkan 'Biaya Spend'. Jika ada adset boros tapi Leads-nya 0 (nol) atau CPR-nya tidak wajar mahalnya, matikan (Kill) tanpa ragu hari ini juga." },
         { title: "3. Perilaku Audiens Profil IG", status: "info", text: "Perhatikan kolom 'Kunj. Profil IG'. Jika angkanya tinggi tapi Leads WA sedikit, artinya calon pembeli ragu setelah melihat feed IG Anda. Rapikan highlight & tambah testimoni." },
         { title: "4. Anomali CTR Tinggi, Leads Nol", status: "warning", text: "Adset dengan CTR Semua yang besar tapi CPR jelek biasanya menandakan 'Clickbait' atau audiens yang tidak tertarget (hanya asal klik). Persempit penargetan (Umur/Minat)." },
         { title: "5. Skala Perlahan (Scaling Rules)", status: "action", text: "Menemukan Winning Adset? Jangan langsung melipatgandakan budget harian 2x! Naikkan perlahan 20% setiap dua hari sekali agar algoritma Meta tidak mereset ulang (Learning Phase)." }
       ];
    }
    if (tab === 'leads_quality') {
       return [
         { title: "1. Dominasi Iklan vs Organik", status: "info", text: `Bandingkan porsi ungu (Iklan WA) dan hijau (Organik). Semakin besar porsi organik, bisnis makin sehat tanpa membebankan cost besar pada Zuckerberg.` },
         { title: "2. Kebocoran Trafik (WA Kosong)", status: waKosongRate > 25 ? "danger" : "success", text: `Rasio 'WA Kosong / Batal Chat' di level ${waKosongRate.toFixed(1)}%. ${waKosongRate > 25 ? 'Terlalu tinggi! Ada masalah dengan kalimat template sapaan WA Anda atau performa loading desty page lambat.' : 'Angka drop-off ini tergolong sangat aman dan wajar.'}` },
         { title: "3. Pemanfaatan Database Lama", status: "warning", text: "Lakukan strategi 'Blast Existing' ke pelanggan lama (Retensi) minimal satu bulan sekali untuk mendongkrak omzet gratis tanpa bayar iklan." },
         { title: "4. Kualitas Jangkauan Logistik", status: "action", text: "Cek bar 'Wasted Leads / Luar Kota'. Jika merahnya mendominasi, berarti algoritma Meta salah meluaskan target. Pasang 'Exclude' (kecualikan) wilayah luar kota di Ads Manager." },
         { title: "5. Performa Retargeting Sosmed", status: "success", text: "Gabungan traffic IG DM & Komentar membuktikan brand awareness Anda terbangun. Jadikan audiens ini (Video Viewers/Engagers) sebagai Custom Audience di iklan Retargeting." }
       ];
    }
    if (tab === 'lead_temperature') {
       return [
         { title: "1. Rasio Siap Beli (Hot/Warm)", status: "success", text: "Leads bersuhu Hot & Warm adalah uang di depan mata. Tim CS wajib memprioritaskan melayani mereka dengan Service Level Agreement (SLA) balas kurang dari 3 menit!" },
         { title: "2. Penanganan Prospek Dingin", status: "warning", text: "Banyak batang berwarna biru (Cold Leads)? Mereka bukannya tidak mau beli, tapi butuh diedukasi ulang. Siapkan PDF portofolio atau garansi untuk meyakinkan." },
         { title: "3. Ketertiban Sistem Admin", status: "danger", text: "Jika porsi 'Tidak Terlabel' (Abu-abu) mendominasi grafik, Anda membabi buta. Peringatkan Admin/CS agar disiplin melabeli chat suhu tiap harinya." },
         { title: "4. Evaluasi Batal Deal", status: "info", text: "Normalnya, persentase konversi Hot Lead bisa mencapai >50%. Jika gagal tembus Deal, pastikan tidak ada kebocoran atau masalah komunikasi pada skrip Admin CS." },
         { title: "5. Promo Dadakan 'Flash Sale'", status: "action", text: "Agar prospek bersuhu Warm cepat panas, berikan jurus 'Diskon Kilat Berbatas Waktu'. Scarcity/Kelangkaan memancing emosi pembelian instan." }
       ];
    }
    if (tab === 'closing_performance') {
       const crOverall = leadsAll > 0 ? (closingAll / leadsAll) * 100 : 0;
       return [
         { title: "1. Kinerja Konversi Keseluruhan", status: crOverall >= 15 ? "success" : "danger", text: `Closing Rate (CR) tembus ${crOverall.toFixed(1)}%. ${crOverall < 15 ? 'Siaga Merah! Uang iklan hangus. Evaluasi skrip CS, handling objection harga, & kecepatan respons.' : 'Tim sales bekerja memuaskan! Konversi prima.'}` },
         { title: "2. Analisis Saluran Omzet", status: "info", text: "Perhatikan tabel rincian omzet. Channel dengan angka Penjualan tertinggi wajib diprioritaskan alokasi dananya untuk di-Scale Up minggu ini." },
         { title: "3. Top 6 Lokasi Tambang Emas", status: "success", text: "Grafik batang Top Area merekam domisili terbanyak para pelanggan deal. Duplikasi kampanye iklan (Lookalike) dengan penargetan ke kota-kota juara ini saja!" },
         { title: "4. Nilai Pesanan Rata-Rata (AOV)", status: "warning", text: "Bagi Total Sales dengan Total Closing untuk mengetahui daya beli rata-rata audiens. Anda dapat meningkatkannya dengan menawarkan Bundling." },
         { title: "5. Minimalkan Ghosting", status: "action", text: "Calon pelanggan yang kabur setelah negoisasi harga adalah masalah utama. Ajarkan CS teknik bridging/pertanyaan menggiring untuk mengunci konfirmasi." }
       ];
    }
    if (tab === 'funnel') {
       return [
         { title: "1. Kegagalan Hook (Impresi > Klik)", status: "warning", text: "Banyak tayang namun CTR amblas. Ganti '3 Detik Pertama' konten video Anda dengan visual yang menyolok atau sebutkan rasa sakit (pain point) pelanggan." },
         { title: "2. Masalah Botol Leher (Drop-Off Web)", status: "danger", text: "Ribuan klik di laporan tapi Chat WA yang masuk hitungan jari? Periksa apakah link di Bio IG atau kecepatan muat (loading) web Anda tidak lebih dari 3 detik." },
         { title: "3. Saringan Algoritma Meta", status: "info", text: "Tiap lapisan kerucut menyaring kualitas prospek. Bandingkan persentase antar-lapis dengan bulan lalu untuk mengetahui tren efisiensi jualan." },
         { title: "4. Konversi Tahap Akhir (Bottom Funnel)", status: "success", text: "Begitu masuk fase 'Chat Masuk', bola sepenuhnya ada di tangan CS. Pertahankan rasio Deal semaksimal mungkin melalui follow up gigih." },
         { title: "5. Terapi Iklan Ulang", status: "action", text: "Pasang 'Pixel' di website Anda. Buat kampanye re-targeting mengejar 100% orang yang mengetuk tautan namun mengurungkan niat chat ke WhatsApp Anda." }
       ];
    }
    if (tab === 'categories') {
       return [
         { title: "1. Deteksi Kekuatan Inti (Hero Service)", status: "success", text: "Batang omzet kotor berwarna hijau yang paling dominan mengindikasikan pasar sedang menggandrungi layanan tersebut. Permudah proses checkout untuk layanan ini." },
         { title: "2. Lubang Kebocoran (Blackhole Budget)", status: "danger", text: "Cermati layanan dengan porsi batang merah (Biaya Iklan) panjang namun hijau (Sales) kerdil. Ini adalah parasit! Pangkas atau hentikan budget hariannya." },
         { title: "3. Kekuatan Basis Organik", status: "info", text: "Bila CR (Closing Rate) jalur 'Keseluruhan' lebih kuat daripada 'Iklan WA', ini pertanda pamor brand Anda di luar jalur ads sangat dipercaya konsumen." },
         { title: "4. Rekomendasi Cross Selling Lintas Kategori", status: "warning", text: "Layanan sepi bisa dikemas ke dalam paket layanan laris (Upsell/Bundling) agar omzet ikut tertarik, karena biaya akuisisi (CPA) nya disubsidi produk pemenang." },
         { title: "5. Sudut Pandang (Angle) Promosi", status: "action", text: "Eksperimen angle promo baru untuk kategori yang stagnan. Market mungkin jenuh dengan visual lama. Uji cobakan penawaran garansi purna jual gratis." }
       ];
    }
    if (tab === 'finance') {
       return [
         { title: "1. Pembanding Biaya CPL", status: "info", text: "Perbedaan CPL antara Iklan murni dan Keseluruhan menunjukkan seberapa tangguh subsidi lalu lintas gratis (SEO, Organik, Database) menyokong kampanye berbayar Anda." },
         { title: "2. Waspada Inflasi CPA", status: "warning", text: `Jika nilai CPA di blok amber melampaui batas KPI Rp${formatIDR(t_cpa)}, artinya ongkos bakar uang berpotensi membunuh margin keuntungan bersih perusahaan.` },
         { title: "3. Kampanye Membakar Laba", status: "danger", text: "Cek grafik Distribusi CPA per Layanan. Batang oranye yang menembus langit (sangat tinggi) adalah indikator utama inefisiensi yang menelan cashflow perusahaan." },
         { title: "4. Break-Even Analysis", status: "success", text: "Terus amati perbandingan rata-rata omzet (AOV) dengan ongkos CPA. Selama rasio AOV berada di atas CPA secara stabil, mesin bisnis ini sehat mencetak uang." },
         { title: "5. Pengereman Anggaran Strategis", status: "action", text: "Ketika CPL meroket naik 3 hari berturut-turut, tahan godaan untuk menyiram budget lebih besar. Fokuskan tenaga merubah thumbnail iklan atau menawarkan diskon ongkir kilat." }
       ];
    }
    if (tab === 'cs_performance') {
       return [
         { title: "1. Benchmarking Kinerja Admin", status: "success", text: "Admin #1 dengan mahkota tertinggi membuktikan SOP pendekatannya adalah yang terampuh. Ekstrak teknik chat-nya & jadikan standar wajib (SOP) kantor." },
         { title: "2. Darurat Rotasi Beban Leads", status: "danger", text: "Pantau porsi Admin berbeban Leads besar tapi Win Rate (CR) kecil. Ini ibarat menuang air ke ember bocor. Segera sesuaikan porsi pembagian leads via mesin Rotator!" },
         { title: "3. Keseimbangan Rasio Kesepakatan", status: "warning", text: "Prospek gagal (Lost) itu wajar, namun disparitas Win Rate drastis (contoh selisih >10%) antar admin mengindikasikan darurat bimbingan skill komunikasi." },
         { title: "4. Indikator Kecepatan Tersirat (SLA)", status: "info", text: "Faktor tak terlihat penyebab jeleknya performa closing sering kali adalah lamanya admin merespon. Lakukan sidak (audit chat log) di jam sibuk tanpa pemberitahuan." },
         { title: "5. Eksekusi Pembinaan Rutin", status: "action", text: "Susun simulasi roleplay rutin mingguan (latihan menangkis tolakan 'Izin tanya suami dulu' atau 'Uangnya belum ada') agar mental tarung CS semakin tajam." }
       ];
    }
    if (tab === 'time_analysis') {
       return [
         { title: "1. Penyelarasan Jam Emas (Prime Time)", status: "success", text: "Puncak gunung di diagram menunjukan momentum audiens 'tersadar' & memegang HP. Pastikan personil CS standby 100% dan fokus melayani saat jam ini berlangsung." },
         { title: "2. Kesalahan Fatal Jam Tayang", status: "danger", text: "Sangat bahaya jika traffic memuncak di pukul 21:00 tapi tim CS tertidur pulas. Matikan iklan (pause) saat jam operasional tutup, atau rekrut admin khusus shift malam." },
         { title: "3. Dayparting Meta Ads (Penjadwalan)", status: "action", text: "Berdasarkan grafik di atas, segera formulasikan fitur 'Ad Scheduling' (Penjadwalan Iklan) di dalam platform Meta Ads, agar budget hanya tayang di jam-jam potensial ini." },
         { title: "4. Momentum Tugas Administratif", status: "info", text: "Gunakan jam yang landai/lembah (sepi chat baru) untuk menyuruh CS merapikan laporan CRM atau menembak ulang pelanggan lama di buku kontak." },
         { title: "5. Pemanfaatan Robot (Auto-Reply)", status: "warning", text: "Demi menahan pelarian pelanggan di jam malam, aktifkan bot sapaan (Greeting Message) WhatsApp berisi FAQ, Katalog, dan janji balasan instan saat fajar menyingsing." }
       ];
    }
    if (tab === 'geo_analysis') {
       return [
         { title: "1. Pemusatan Targeting (Laser Focus)", status: "success", text: "Lokasi peringkat 1 & 2 di grafik adalah zona kemenangan Anda. Hentikan penargetan iklan Nasional yang boros, ubah jadi kampanye khusus Radius wilayah dominan ini saja." },
         { title: "2. Eksklusi Zona Kegagalan (Wasted Areas)", status: "danger", text: "Periksa kembali data domisili pelanggan yang 'Ditolak/Kejauhan'. Jangan biarkan iklan Meta menyebarkan impresi mubazir ke zona out-of-coverage logistik ini." },
         { title: "3. Wawasan Ekspansi Jaringan (Blueprint)", status: "info", text: "Apabila perusahaan berencana buka cabang/gudang baru, data statistik peta pelanggan organik inilah instrumen paling valid dan tanpa-resiko untuk riset penentuan lokasi." },
         { title: "4. Adaptasi Bahasa Iklan (Hyperlocal Copywriting)", status: "action", text: "Rancang konten baru dengan seruan khusus: 'Spesial Warga [Nama Kota Dominan]...'. Tarikan ikatan psikologis lokal seperti ini sanggup melipatgandakan persentase konversi." },
         { title: "5. Sinkronisasi Kemitraan Ekspedisi", status: "warning", text: "Jika ongkos kirim sering digarisbawahi sebagai alasan gagal deal, evaluasi kontrak perjanjian ekspedisi (Logistics) Anda untuk rute-rute menuju titik pendaratan terbanyak ini." }
       ];
    }
    if (tab === 'follow_up') {
       return [
         { title: "1. Harta Karun yang Terdampar (Unfollowed)", status: "danger", text: "Porsi grafik 'Belum Follow Up' adalah perwujudan membuang uang cash hasil iklan. Wajibkan tim Anda menyentuh angka 0% untuk prospek mangkrak sore ini." },
         { title: "2. Penerapan Doktrin Kontak (Rule of 3)", status: "warning", text: "Psikologi pembeli online kerap butuh 3-4 teguran sebelum yakin melakukan transfer. Kawal ketat proses teguran (FU H+1 dan H+3) tanpa alasan lupa." },
         { title: "3. Retensi Pendekatan Edukatif", status: "info", text: "Pelanggan di tahap H+3 yang tidak kunjung merespons butuh asupan baru. Stop berjualan kasar (Hard Selling), sisipkan pesan tips informatif via japri atau status WA." },
         { title: "4. Pembedahan Kalimat Pancingan", status: "success", text: "Eksperimenkan kalimat bernada desakan psikologis (FOMO/Kelangkaan) saat Follow Up akhir (Contoh: 'Kak, bonusnya hangus jam 12 ini ya'). Catat perbedaan konversinya." },
         { title: "5. Obral Penguras Database Mati", status: "action", text: "Tiap Jumat akhir bulan, kumpulkan ratusan prospek di kolom 'Lainnya'. Lemparkan (Blast) promo cuci gudang ekstra miring ke mereka sebagai bonus panen penutup." }
       ];
    }

    return [
       { title: "Analisis Data Tersedia", status: "success", text: "Sistem mendeteksi dan siap mengolah metrik bisnis ini." },
       { title: "Pantau Pergerakan Indikator", status: "info", text: "Selalu cermati naik turunnya nilai yang ada untuk mengambil keputusan preventif." },
       { title: "Kesehatan Sistem & Filter", status: "warning", text: "Pastikan Anda memilih rentang tanggal filter yang tepat agar komparasi data ini menjadi logis." },
       { title: "Hindari Pengambilan Kesimpulan Prematur", status: "danger", text: "Tunggu minimal 3 hari sejak iklan berjalan sebelum mengambil tindakan potong budget berdasarkan data ini." },
       { title: "Eksekusi A/B Testing", status: "action", text: "Jika ragu, ciptakan variasi layanan/iklan B dan uji kinerjanya melawan variasi A pada dashboard ini." }
    ];
  };

  const getReportInsights = () => {
     const spend = roasReportData.keseluruhan.total.budget;
     const salesIklan = roasReportData.iklan_saja.total.sales;
     const salesAll = roasReportData.keseluruhan.total.sales;
     const roasIklan = spend > 0 ? salesIklan / spend : 0;
     const roasAll = spend > 0 ? salesAll / spend : 0;
     const crIklan = roasReportData.iklan_saja.total.leads > 0 ? (roasReportData.iklan_saja.total.closing / roasReportData.iklan_saja.total.leads) * 100 : 0;
     const crAll = roasReportData.keseluruhan.total.leads > 0 ? (roasReportData.keseluruhan.total.closing / roasReportData.keseluruhan.total.leads) * 100 : 0;
     const cpc = stats.avgCPC;
     const ctr = stats.avgCTR;

     const t_roas_all = getTarget('roas_overall', 4.0);
     const t_roas_ads = getTarget('roas_ads', 4.0);
     const t_cpc = getTarget('cpc', 3000);
     const t_ctr = getTarget('ctr', 1.5);

     const getPeriodText = () => {
        if(filterType === 'today') return 'Hari Ini';
        if(filterType === 'yesterday') return 'Kemarin';
        if(filterType === 'this_week') return 'Minggu Ini';
        if(filterType === 'this_month') return 'Bulan Ini';
        if(filterType === 'last_month') return 'Bulan Lalu';
        if(filterType === 'custom') return `Periode Custom`;
        return 'Sepanjang Waktu';
     };
     const periodTxt = getPeriodText();

     const conclusions = [];

     if (spend > 0) {
        conclusions.push({
           title: `Serapan Anggaran (${periodTxt})`,
           status: "info",
           text: `Total biaya iklan yang telah dihabiskan adalah ${formatIDR(spend)} dengan omzet penutupan keseluruhan mencapai ${formatIDR(salesAll)}. Iklan murni (WA) menyumbang ${(salesAll > 0 ? (salesIklan/salesAll)*100 : 0).toFixed(1)}% dari total pendapatan pada waktu ini. ROAS Iklan mencapai ${roasIklan.toFixed(2)}x (Target: ${t_roas_ads}x).`
        });
     } else if (salesAll > 0) {
        conclusions.push({
           title: `Dominasi Organik (${periodTxt})`,
           status: "success",
           text: `Tercatat omzet sebesar ${formatIDR(salesAll)} masuk tanpa adanya pengeluaran iklan Meta (Rp0). Penjualan sepenuhnya didorong oleh leads organik atau follow up database existing.`
        });
     } else {
        conclusions.push({
           title: `Aktivitas Kampanye (${periodTxt})`,
           status: "warning",
           text: `Belum ada pergerakan signifikan, baik dari sisi pengeluaran budget iklan Meta maupun omzet masuk pada periode yang sedang Anda filter.`
        });
     }

     if (spend > 0) {
         if (roasAll >= t_roas_all) {
             conclusions.push({
                title: "Kesehatan Profitabilitas & ROAS",
                status: "success",
                text: `Sangat sehat! ROAS gabungan pada periode ini berada di angka ${roasAll.toFixed(2)}x (melebihi target KPI ${t_roas_all}x). Kampanye berjalan baik dan layak untuk ditambahkan budget (scale-up).`
             });
         } else {
             conclusions.push({
                title: "Kesehatan Profitabilitas & ROAS",
                status: "danger",
                text: `Waspada boncos. ROAS hanya ${roasAll.toFixed(2)}x (di bawah KPI aman ${t_roas_all}x). Segera evaluasi penawaran harga dan kualitas trafik.`
             });
         }
     }

     if (spend > 0) {
         if (cpc > t_cpc || ctr < t_ctr) {
            conclusions.push({
               title: "Evaluasi Konten Iklan",
               status: "danger",
               text: `Performa lelang Meta sedang turun. Biaya per klik (CPC) mencapai ${formatIDR(cpc)} dan CTR ${ctr.toFixed(2)}% (Target CTR: ${t_ctr}%). Sangat disarankan membuat materi iklan atau video baru.`
            });
         } else {
            conclusions.push({
               title: "Kinerja Lelang Iklan (Bidding)",
               status: "success",
               text: `Materi iklan sangat baik. Berhasil memancing interaksi dengan biaya klik yang murah (${formatIDR(cpc)}) dan CTR kuat (${ctr.toFixed(2)}%).`
            });
         }
     }

     const waKosongRate = leadsDataChart.total > 0 ? (leadsDataChart.wa_kosong / leadsDataChart.total) * 100 : 0;
     if (waKosongRate > 20) {
         conclusions.push({
            title: "Kebocoran Trafik (Dropoff WA)",
            status: "warning",
            text: `Rasio 'WA Kosong' lumayan berbahaya di persentase ${waKosongRate.toFixed(1)}%. Banyak prospek yang klik link tapi batal chat. Coba optimasi ucapan sapaan awal link WA.`
         });
     } else if (leadsDataChart.total > 0) {
         conclusions.push({
            title: "Kualitas Intensi Audiens",
            status: "success",
            text: `Kebocoran prospek berada pada persentase yang rendah dan aman (${waKosongRate.toFixed(1)}%). Ini membuktikan target audiens sudah pas dan memiliki niat beli yang tinggi.`
         });
     }

     if (roasReportData.keseluruhan.total.leads > 0) {
         if (crAll < 15) {
             conclusions.push({
                title: "Evaluasi Konversi Tim CS",
                status: "danger",
                text: `Tingkat Closing Rate (CR) jatuh di angka ${crAll.toFixed(1)}%. Terlalu banyak prospek yang gagal disepakati. Tinjau kembali cara CS membalas (Handling Objection) ini darurat.`
             });
         } else {
             conclusions.push({
                title: "Performa Penjualan Tim CS",
                status: "success",
                text: `Kinerja negosiasi memuaskan (Closing Rate ${crAll.toFixed(1)}%). Tim CS sukses meyakinkan masuknya prospek menjadi omzet bersih.`
             });
         }
     }

     let finalRec = "";
     if (roasAll >= t_roas_all && crAll >= 15) {
         finalRec = `**SANGAT DIREKOMENDASIKAN**: Karena Metrik Meta & CS sehat dan sesuai, lakukan "SCALE-UP" perlahan (tambah budget 15-20%) di adset yang menang untuk melipatgandakan keuntungan.`;
     } else if (roasAll > 0 && roasAll < t_roas_all && ctr >= t_ctr) {
         finalRec = `**TAHAN BUDGET**: CTR murah tapi susah closing. Fokus perbaikan jangan pada Iklan, tapi pada kualitas Penawaran (Promo) dan taktik Follow-up admin.`;
     } else if (spend > 0) {
         finalRec = `**EVALUASI TOTAL**: Strategi di bawah standar KPI. Matikan atau turunkan sementara budget iklan sambil merombak materi hook dan audiens target sebelum menghabiskan sisa uang.`;
     } else {
         finalRec = `**SARAN ORGANIK**: Selama iklan tidak aktif, usahakan utamakan broadcast atau remarketing ke sisa kontak di WA.`;
     }

     conclusions.push({
        title: "Kesimpulan & Petunjuk Eksekusi",
        status: "action",
        text: finalRec
     });

     return conclusions;
  };

  const handleUpload = async (e, mode) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadState({ isUploading: true, progress: 0, timeLeft: 'Menyiapkan file...', rowCount: 0 });
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        let imported = [];
        if (mode === 'restore') imported = JSON.parse(evt.target.result);
        else {
          const windowObj = window;
          if (!windowObj.XLSX) throw new Error("Sistem Excel belum dimuat, tunggu sebentar.");
          const wb = windowObj.XLSX.read(evt.target.result, { type: 'binary' });
          imported = windowObj.XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { raw: true, defval: "" });
        }
        
        const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');

        const parsedData = [];
        imported.forEach(item => {
          let cleaned = {};
          tableHeaders.forEach(h => {
            let matchKey = Object.keys(item).find(k => norm(k) === norm(h));
            if (!matchKey && (isAdsTab || isAdsetTab)) {
                const upperH = h.toUpperCase();
                if (upperH.includes('CPM')) matchKey = Object.keys(item).find(k => k.toUpperCase().replace(/[^A-Z0-9]/g, '').includes('CPM'));
                else if (upperH.includes('CPC')) matchKey = Object.keys(item).find(k => k.toUpperCase().replace(/[^A-Z0-9]/g, '').includes('CPC'));
                else if (upperH.includes('CTR') && upperH.includes('RASIO')) matchKey = Object.keys(item).find(k => k.toUpperCase().includes('CTR'));
                else if (upperH.includes('HASIL') && upperH.includes('BIAYA')) matchKey = Object.keys(item).find(k => k.toUpperCase().includes('PER HASIL'));
            }
            
            let val = matchKey !== undefined ? item[matchKey] : "";
            
            if (h === 'Tanggal' && val !== "") {
                if (typeof val === 'number' && val > 20000) {
                    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
                    excelEpoch.setUTCDate(excelEpoch.getUTCDate() + Math.floor(val));
                    val = `${excelEpoch.getUTCFullYear()}-${String(excelEpoch.getUTCMonth() + 1).padStart(2, '0')}-${String(excelEpoch.getUTCDate()).padStart(2, '0')}`;
                } else if (typeof val === 'string') {
                    const parsed = parseSafeDateLocal(val);
                    if (parsed.getTime() !== 0) {
                        val = `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
                    }
                }
            }
            
            cleaned[h] = val !== undefined && val !== null ? String(val) : "";
          });
          cleaned = applyFormulasToRow(cleaned, customFormulas);
          const newDocRef = doc(collection(db, 'artifacts', appId, 'public', 'data', currentCollection));
          parsedData.push({ id: newDocRef.id, data: cleaned });
        });

        await runBatchOperations(parsedData.map(d => ({ type: 'set', collection: currentCollection, id: d.id, data: d.data })), (progress, time, total) => {
             setUploadState({ isUploading: true, progress, timeLeft: time, rowCount: total });
        });
        
        const desc = `Mengunggah/Restore ${parsedData.length} baris ke tabel ${currentCollection}`;
        logActivity(desc);
        pushUndo({ type: 'ADD_MULTI', collection: currentCollection, desc, docs: parsedData });
        setDialog({ isOpen: true, type: 'alert', message: `Berhasil mengunggah ${parsedData.length} baris data baru ke dalam sistem!` });
      } catch (err) { setErrorMsg(String(err.message)); }
      finally { 
         setUploadState({ isUploading: false, progress: 0, timeLeft: '', rowCount: 0 });
         e.target.value = ''; 
      }
    };
    if (mode === 'restore') reader.readAsText(file);
    else reader.readAsBinaryString(file);
  };

  const handleProcessPaste = async () => {
     if (!pasteInput.trim()) return;
     setUploadState({ isUploading: true, progress: 0, timeLeft: 'Memproses teks...', rowCount: 0 });
     setShowPasteModal(false);
     try {
        const rows = pasteInput.split('\n').map(r => r.trim()).filter(r => r !== '');
        if (rows.length < 2) throw new Error("Data kurang. Pastikan Anda juga meng-copy baris judul (header) tabelnya.");
        
        const pastedHeaders = rows[0].split('\t').map(h => h.trim().toLowerCase().replace(/[^a-z0-9]/g, ''));
        const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');

        const parsedData = [];
        for (let i = 1; i < rows.length; i++) {
           const cols = rows[i].split('\t');
           const itemMap = {};
           pastedHeaders.forEach((h, idx) => { itemMap[h] = cols[idx] !== undefined ? cols[idx].trim() : ""; });

           let cleaned = {};
           tableHeaders.forEach(h => {
               let matchKey = pastedHeaders.find(k => k === norm(h));
               if (!matchKey && (isAdsTab || isAdsetTab)) {
                   const upperH = h.toUpperCase();
                   if (upperH.includes('CPM')) matchKey = pastedHeaders.find(k => k.includes('cpm'));
                   else if (upperH.includes('CPC')) matchKey = pastedHeaders.find(k => k.includes('cpc'));
                   else if (upperH.includes('CTR') && upperH.includes('RASIO')) matchKey = pastedHeaders.find(k => k.includes('ctr'));
                   else if (upperH.includes('HASIL') && upperH.includes('BIAYA')) matchKey = pastedHeaders.find(k => k.includes('perhasil') || k.includes('hasil'));
               }
               let val = matchKey !== undefined ? itemMap[matchKey] : "";

               if (h === 'Tanggal' && val !== "") {
                   const parsed = parseSafeDateLocal(val);
                   if (parsed.getTime() !== 0) {
                       val = `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
                   }
               }

               cleaned[h] = val !== undefined && val !== null ? String(val) : "";
           });
           cleaned = applyFormulasToRow(cleaned, customFormulas);
           
           const newDocRef = doc(collection(db, 'artifacts', appId, 'public', 'data', currentCollection));
           parsedData.push({ id: newDocRef.id, data: cleaned });
        }

        await runBatchOperations(parsedData.map(d => ({ type: 'set', collection: currentCollection, id: d.id, data: d.data })), (progress, time, total) => {
             setUploadState({ isUploading: true, progress, timeLeft: time, rowCount: total });
        });

        const desc = `Paste Excel (${parsedData.length} baris) ke tabel ${currentCollection}`;
        logActivity(desc);
        pushUndo({ type: 'ADD_MULTI', collection: currentCollection, desc, docs: parsedData });
        
        setPasteInput("");
        setDialog({ isOpen: true, type: 'alert', message: `Berhasil mengimpor ${parsedData.length} baris data dari hasil paste!` });
     } catch(err) { setErrorMsg(String(err.message)); }
     setUploadState({ isUploading: false, progress: 0, timeLeft: '', rowCount: 0 });
  };

  const handleSmartSync = async () => {
     if (!syncUrl) return setErrorMsg("Tolong tempelkan link Google Sheets terlebih dahulu.");
     
     setUploadState({ isUploading: true, progress: 10, timeLeft: 'Menghubungkan ke Google Sheets...', rowCount: 0 });
     
     try {
         let fetchUrl = syncUrl;
         // Ekstrak ID Google Sheets dan ubah paksa ke format unduhan CSV
         if (syncUrl.includes('/edit') || syncUrl.includes('/view')) {
             const match = syncUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
             const gidMatch = syncUrl.match(/gid=([0-9]+)/);
             if (match) {
                 fetchUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv`;
                 if (gidMatch) fetchUrl += `&gid=${gidMatch[1]}`;
             }
         }

         const response = await fetch(fetchUrl);
         if (!response.ok) throw new Error("Akses Ditolak. Pastikan pengaturan Share Google Sheet adalah 'Siapa saja yang memiliki link dapat melihat' (Anyone with the link can view).");
         
         const csvText = await response.text();
         
         const windowObj = window;
         if (!windowObj.XLSX) throw new Error("Mesin pembaca format tabel belum siap, tunggu sebentar.");
         
         setUploadState({ isUploading: true, progress: 40, timeLeft: 'Membaca dan mencocokkan data...', rowCount: 0 });
         
         const wb = windowObj.XLSX.read(csvText, { type: 'string', raw: true });
         const imported = windowObj.XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: "" });

         const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
         const ops = [];
         const currentData = getCurrentDataList();

         // Ambil 3 kolom pertama sebagai identifier (Sidik Jari) untuk mencegah duplikasi
         const uniqueKeyCols = [tableHeaders[0], tableHeaders[1], tableHeaders[2]].filter(Boolean);

         let newCount = 0;
         let updateCount = 0;

         imported.forEach((item, index) => {
             let cleaned = {};
             tableHeaders.forEach(h => {
                 let matchKey = Object.keys(item).find(k => norm(k) === norm(h));
                 if (!matchKey && (isAdsTab || isAdsetTab)) {
                     const upperH = h.toUpperCase();
                     if (upperH.includes('CPM')) matchKey = Object.keys(item).find(k => k.toUpperCase().replace(/[^A-Z0-9]/g, '').includes('CPM'));
                     else if (upperH.includes('CPC')) matchKey = Object.keys(item).find(k => k.toUpperCase().replace(/[^A-Z0-9]/g, '').includes('CPC'));
                     else if (upperH.includes('CTR') && upperH.includes('RASIO')) matchKey = Object.keys(item).find(k => k.toUpperCase().includes('CTR'));
                     else if (upperH.includes('HASIL') && upperH.includes('BIAYA')) matchKey = Object.keys(item).find(k => k.toUpperCase().includes('PER HASIL'));
                 }
                 
                 let val = matchKey !== undefined ? item[matchKey] : "";
                 
                 if (h === 'Tanggal' && val !== "") {
                     if (typeof val === 'number' && val > 20000) {
                         const excelEpoch = new Date(Date.UTC(1899, 11, 30));
                         excelEpoch.setUTCDate(excelEpoch.getUTCDate() + Math.floor(val));
                         val = `${excelEpoch.getUTCFullYear()}-${String(excelEpoch.getUTCMonth() + 1).padStart(2, '0')}-${String(excelEpoch.getUTCDate()).padStart(2, '0')}`;
                     } else if (typeof val === 'string') {
                         const parsed = parseSafeDateLocal(val);
                         if (parsed.getTime() !== 0) {
                             val = `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
                         }
                     }
                 }
                 cleaned[h] = val !== undefined && val !== null ? String(val) : "";
             });
             
             cleaned = applyFormulasToRow(cleaned, customFormulas);

             // Lewati jika tanggal kosong (biasanya baris kosong di bawah G-Sheet)
             if (!cleaned["Tanggal"] || cleaned["Tanggal"].trim() === "") return;

             // SMART UPSERT LOGIC
             const existingRow = currentData.find(r => {
                 return uniqueKeyCols.every(key => {
                     const val1 = String(r[key] || '').trim().toLowerCase();
                     const val2 = String(cleaned[key] || '').trim().toLowerCase();
                     return val1 === val2;
                 });
             });

             if (existingRow) {
                 ops.push({ type: 'update', collection: currentCollection, id: existingRow.id, data: cleaned });
                 updateCount++;
             } else {
                 const newDocRef = doc(collection(db, 'artifacts', appId, 'public', 'data', currentCollection));
                 ops.push({ type: 'set', collection: currentCollection, id: newDocRef.id, data: cleaned });
                 newCount++;
             }
         });

         await runBatchOperations(ops, (progress, time, total) => {
              setUploadState({ isUploading: true, progress: 40 + (progress * 0.6), timeLeft: time, rowCount: total });
         });

         const desc = `Smart Sync dari Google Sheets ke tabel ${currentCollection} (Baru: ${newCount}, Update: ${updateCount})`;
         logActivity(desc);
         
         setSyncUrl("");
         setDialog({ isOpen: true, type: 'alert', message: `Sinkronisasi Selesai!\n\n${newCount} Data baru dimasukkan.\n${updateCount} Data lama diperbarui otomatis.` });

     } catch (error) {
         setErrorMsg(`Sync Gagal: ${error.message}`);
     } finally {
         setUploadState({ isUploading: false, progress: 0, timeLeft: '', rowCount: 0 });
     }
  };

  const handleCellDoubleClick = (row, header) => {
    setEditCell({ rowId: row.id, header });
    setEditValue(String(row[header] || ""));
  };

  const saveInlineEdit = async (rowId, header) => {
    if (!rowId) {
       setEditCell({ rowId: null, header: null });
       return setErrorMsg("Baris ini tidak memiliki ID yang valid. Coba muat ulang halaman.");
    }
    if (editCell.rowId === rowId && editCell.header === header) {
      try {
        const currentDataList = getCurrentDataList();
        const currentRow = currentDataList.find(r => r.id === rowId);
        if (currentRow) {
           let updatedRow = { ...currentRow, [header]: String(editValue) };
           updatedRow = applyFormulasToRow(updatedRow, customFormulas);
           
           const dataToSave = {};
           Object.keys(updatedRow).forEach(k => {
              if (k !== 'id') dataToSave[k] = updatedRow[k];
           });
           
           await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', currentCollection, String(rowId)), dataToSave);
           
           const desc = `Mengedit isi ${header} secara manual di tabel ${currentCollection}`;
           logActivity(desc);
           pushUndo({ type: 'EDIT_MULTI', collection: currentCollection, desc, updates: [{ id: rowId, oldData: currentRow, newData: updatedRow }] });
        }
      } catch(err) { setErrorMsg(String(err.message)); }
      setEditCell({ rowId: null, header: null });
    }
  };

  const handleApplyFormulasToSelected = async () => {
    if(selectedRows.length === 0) return setDialog({ isOpen: true, type: 'alert', message: 'Pilih baris di tabel terlebih dahulu.' });
    setUploadState({ isUploading: true, progress: 0, timeLeft: 'Menghitung rumus...', rowCount: selectedRows.length });
    try {
      const currentDataList = getCurrentDataList();
      const updates = [];
      const ops = [];
      
      selectedRows.forEach(rowId => {
        if (!rowId) return;
        const row = currentDataList.find(r => r.id === rowId);
        if(row) {
           const calculatedRow = applyFormulasToRow(row, customFormulas);
           const dataToSave = {};
           Object.keys(calculatedRow).forEach(k => {
              if (k !== 'id') dataToSave[k] = calculatedRow[k];
           });
           ops.push({ type: 'update', collection: currentCollection, id: String(rowId), data: dataToSave });
           updates.push({ id: rowId, oldData: row, newData: calculatedRow });
        }
      });
      await runBatchOperations(ops, (progress, time, total) => setUploadState({ isUploading: true, progress, timeLeft: time, rowCount: total }));
      
      const desc = `Kalkulasi rumus ulang untuk ${selectedRows.length} baris data`;
      logActivity(desc);
      pushUndo({ type: 'EDIT_MULTI', collection: currentCollection, desc, updates });

      setSelectedRows([]);
      setDialog({ isOpen: true, type: 'alert', message: 'Kalkulasi selesai diterapkan!' });
    } catch(err) { setErrorMsg(String(err.message)); }
    setUploadState({ isUploading: false, progress: 0, timeLeft: '', rowCount: 0 });
  };

  const createEmptyRow = async () => {
    setLoading(true);
    try {
      const newRow = {};
      tableHeaders.forEach(h => newRow[h] = "");
      newRow["Tanggal"] = new Date().toISOString().split('T')[0];
      const docRef = doc(collection(db, 'artifacts', appId, 'public', 'data', currentCollection));
      await setDoc(docRef, newRow);

      const desc = `Menambahkan 1 baris kosong baru`;
      logActivity(desc);
      pushUndo({ type: 'ADD_MULTI', collection: currentCollection, desc, docs: [{ id: docRef.id, data: newRow }] });
    } catch(err) { setErrorMsg(String(err.message)); }
    setLoading(false);
  };

  const deleteSelected = () => {
    setDialog({
      isOpen: true, type: 'confirm', message: `Hapus ${selectedRows.length} data yang dipilih secara permanen?`,
      onConfirm: async () => {
        setDialog({ isOpen: false });
        setUploadState({ isUploading: true, progress: 0, timeLeft: 'Menghapus...', rowCount: selectedRows.length });
        try {
           const currentDataList = getCurrentDataList();
           const docsToDelete = [];
           const ops = [];
           
           selectedRows.forEach(id => {
              if (!id) return;
              const row = currentDataList.find(r => r.id === id);
              if (row) {
                  docsToDelete.push({ id, data: row });
                  ops.push({ type: 'delete', collection: currentCollection, id: String(id) });
              }
           });
           await runBatchOperations(ops, (progress, time, total) => setUploadState({ isUploading: true, progress, timeLeft: time, rowCount: total }));
           
           const desc = `Menghapus ${selectedRows.length} baris data dari sistem`;
           logActivity(desc);
           pushUndo({ type: 'DELETE_MULTI', collection: currentCollection, desc, docs: docsToDelete });
           
           setSelectedRows([]);
        } catch(e) { setErrorMsg(e.message); }
        setUploadState({ isUploading: false, progress: 0, timeLeft: '', rowCount: 0 });
      }
    });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (!editingRow) return;
    try {
      const calculatedRow = applyFormulasToRow(editingRow, customFormulas);
      
      const dataToSave = {};
      Object.keys(calculatedRow).forEach(k => {
         if (k !== 'id') dataToSave[k] = calculatedRow[k];
      });

      // Pastikan kita menyimpan ke koleksi yang benar (penting untuk Quick Booking Kalender)
      const targetCollection = isKalenderTab ? 'kalender_v1' : currentCollection;

      if (calculatedRow.id) {
         const rowId = String(calculatedRow.id);
         const oldData = getCurrentDataList().find(r => r.id === rowId);
         await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', targetCollection, rowId), dataToSave);
         const desc = `Mengedit baris melalui Form di ${targetCollection}`;
         logActivity(desc);
         pushUndo({ type: 'EDIT_MULTI', collection: targetCollection, desc, updates: [{ id: rowId, oldData, newData: calculatedRow }] });
      } else {
         const docRef = doc(collection(db, 'artifacts', appId, 'public', 'data', targetCollection));
         await setDoc(docRef, dataToSave);
         
         const rowWithId = { id: docRef.id, ...dataToSave };
         const desc = `Input baris baru melalui formulir pop-up di ${targetCollection}`;
         logActivity(desc);
         pushUndo({ type: 'ADD_MULTI', collection: targetCollection, desc, docs: [{ id: docRef.id, data: rowWithId }] });
      }
      setEditingRow(null); setIsAdding(false);
    } catch(err) { setErrorMsg(String(err.message)); }
  };

  // --- HANDLER QUICK BOOKING KANBAN ---
  const handleQuickBooking = (teamName, slotKey) => {
      const newRow = {};
      KALENDER_HEADERS.forEach(h => newRow[h] = "");
      newRow["Tanggal"] = kanbanDate;
      newRow["Nama Tim"] = teamName;
      newRow["Jadwal 1 atau Jadwal 2"] = slotKey;
      
      setEditingRow(newRow);
      setIsAdding(true);
  };

  // --- HANDLER SPK WIZARD ---
  const openSpkWizard = (job) => {
      setSpkWizard({
          isOpen: true,
          step: 1,
          job: job,
          data: {
              "ID Booking": job.id || `SPK-${Date.now()}`,
              "Tanggal": kanbanDate,
              "Nama Tim": job["Nama Tim"],
              "Nama Customer": job["Nama Customer"],
              "Layanan yang Dikerjakan": job["Layanan"] || job["Detail Layanan"],
              "Waktu Tiba di Lokasi": "",
              "Titik Koordinat Tiba (GPS)": "",
              "Metode Pembersihan": "",
              "Kondisi Awal / Temuan": "",
              "Foto Sebelum": "",
              "Foto Sesudah": "",
              "Catatan Teknisi": "",
              "Waktu Selesai Pengerjaan": "",
              "Durasi Total Pengerjaan": "",
              "Rating Kepuasan": "",
              "Tanda Tangan Pelanggan": ""
          }
      });
  };

  const handleSpkImageUpload = (e, field) => {
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
          setSpkWizard(prev => ({...prev, data: {...prev.data, [field]: ev.target.result}}));
      };
      reader.readAsDataURL(file); // Konversi ke Base64 (Disimpan sebagai teks panjang di DB)
  };

  const submitSpkWizard = async () => {
      try {
          const docRef = doc(collection(db, 'artifacts', appId, 'public', 'data', 'spk_v1'));
          await setDoc(docRef, spkWizard.data);
          logActivity(`Tim Operasional mensubmit SPK baru untuk Pelanggan: ${spkWizard.data["Nama Customer"]}`);
          setDialog({ isOpen: true, type: 'alert', message: 'Laporan SPK Digital berhasil dikirim ke database pusat!' });
          setSpkWizard({ isOpen: false, step: 1, job: null, data: {} });
      } catch (error) {
          setErrorMsg("Gagal menyimpan SPK: " + error.message);
      }
  };

  // --- ENGINE DATA OKR CORPORATE (LIVE TRACKING ERP) ---
  const okrData = useMemo(() => {
     // Kalkulasi Otomatis dari Modul
     const revBed = roasReportData.keseluruhan.bed?.sales || 0;
     const revMover = roasReportData.keseluruhan.clean_mover?.sales || 0;
     const revLiving = roasReportData.keseluruhan.living?.sales || 0;
     const revLainnya = (roasReportData.keseluruhan.lainnya?.sales || 0) + (roasReportData.keseluruhan.auto?.sales || 0);
     const totalRev = revBed + revMover + revLiving + revLainnya;

     const totalLeads = leadsDataChart.total || 0;
     const spendIklan = stats.spend || 0;
     const cpr = stats.avgCPR || 0;
     const ctr = stats.avgCTR || 0;
     
     const cr = closingPerformanceData.total_leads > 0 ? (closingPerformanceData.total_closing / closingPerformanceData.total_leads) * 100 : 0;
     const aov = closingPerformanceData.total_closing > 0 ? closingPerformanceData.total_sales / closingPerformanceData.total_closing : 0;

     // TARGET DINAMIS PER BULAN
     const cT = okrTargetsMap[okrPeriod] || {
         revTarget: 150000000,
         leadsTarget: 1750,
         salesTarget: 150000000,
         opsTarget: 95,
         hrTarget: 95,
         financeTarget: 95
     };

     return [
         {
             title: "OKR 1 - Target Revenue",
             target: cT.revTarget,
             realisasi: totalRev,
             format: 'currency',
             type: 'higher_better',
             keyResults: [
                 { name: 'Hagia Bed', target: cT.revTarget * 0.34, realisasi: revBed, format: 'currency', type: 'higher_better' },
                 { name: 'Hagia Clean Mover', target: cT.revTarget * 0.35, realisasi: revMover, format: 'currency', type: 'higher_better' },
                 { name: 'Hagia Living', target: cT.revTarget * 0.21, realisasi: revLiving, format: 'currency', type: 'higher_better' },
                 { name: 'Layanan Lain', target: cT.revTarget * 0.10, realisasi: revLainnya, format: 'currency', type: 'higher_better' }
             ]
         },
         {
             title: "OKR 2 - Marketing",
             target: cT.leadsTarget,
             realisasi: totalLeads,
             format: 'number',
             type: 'higher_better',
             subTitle: "Leads",
             keyResults: [
                 { name: 'Spending Iklan', target: cT.revTarget * 0.075, realisasi: spendIklan, format: 'currency', type: 'higher_better' }, 
                 { name: 'CPR (Cost Per Result)', target: 10000, realisasi: cpr, format: 'currency', type: 'lower_better' },
                 { name: 'CTR (Rasio Klik)', target: 2, realisasi: ctr, format: 'percent', type: 'higher_better' },
                 { name: 'Kreatif Baru (Ads)', target: 10, realisasi: 9, format: 'number', type: 'higher_better' }, // Mock
                 { name: 'Upload Konten All Platform', target: 1860, realisasi: contentData.length, format: 'number', type: 'higher_better' },
                 { name: 'KOL Upload Konten', target: 10, realisasi: kolData.filter(k => String(k["Status Upload"]).toLowerCase().includes('sudah') || String(k.Deal).toLowerCase() === 'deal').length, format: 'number', type: 'higher_better' },
                 { name: 'CRM Existing (Blast)', target: 3000, realisasi: crmBlastData.length, format: 'number', type: 'higher_better' }
             ]
         },
         {
             title: "OKR 3 - Sales",
             target: cT.salesTarget,
             realisasi: totalRev,
             format: 'currency',
             type: 'higher_better',
             subTitle: "Sales / Penjualan",
             keyResults: [
                 { name: 'Closing Rate', target: 10, realisasi: cr, format: 'percent', type: 'higher_better' },
                 { name: 'AOV per Customer', target: 1300000, realisasi: aov, format: 'currency', type: 'higher_better' },
                 { name: 'Respon Time (Menit)', target: 5, realisasi: 4, format: 'number', type: 'lower_better' }, // Mock
                 { name: 'Review Customer di Google', target: 50, realisasi: 9, format: 'number', type: 'higher_better' } // Mock
             ]
         },
         {
             title: "OKR 4 - Operasional",
             target: cT.opsTarget,
             realisasi: 90, // Mock
             format: 'percent',
             type: 'higher_better',
             subTitle: "Kepuasan Customer",
             keyResults: [
                 { name: 'Komplain', target: 5, realisasi: 2, format: 'percent', type: 'lower_better' }, // Mock
                 { name: 'Ketepatan Kedatangan', target: 100, realisasi: 95, format: 'percent', type: 'higher_better' }, // Mock
                 { name: 'Dokumentasi Hasil (SPK)', target: 100, realisasi: kalenderData.length > 0 ? (spkData.length / kalenderData.length) * 100 : 0, format: 'percent', type: 'higher_better' }
             ]
         },
         {
             title: "OKR 5 - Human Resource",
             target: cT.hrTarget,
             realisasi: 16,
             format: 'percent',
             type: 'higher_better',
             subTitle: "Bahagia, Bisa, Bertumbuh",
             keyResults: [
                 { name: 'Absensi dan Jadwal', target: 100, realisasi: 16, format: 'percent', type: 'higher_better' }, // Mock
                 { name: 'Rekrutmen', target: 100, realisasi: 13, format: 'percent', type: 'higher_better' }, // Mock
                 { name: 'Hari Bahagia', target: 1, realisasi: 0, format: 'number', type: 'higher_better' } // Mock
             ]
         },
         {
             title: "OKR 6 - Finance",
             target: cT.financeTarget,
             realisasi: 14.67,
             format: 'percent',
             type: 'higher_better',
             subTitle: "Menjaga Cashflow Sehat",
             keyResults: [
                 { name: 'COGS max 35%', target: 35, realisasi: 14.67, format: 'percent', type: 'lower_better' }, // Mock
                 { name: 'Laporan Keuangan', target: 100, realisasi: 0, format: 'percent', type: 'higher_better' }, // Mock
                 { name: 'Piutang', target: 0, realisasi: 0, format: 'number', type: 'lower_better' } // Mock
             ]
         }
     ];
  }, [roasReportData, leadsDataChart, stats, closingPerformanceData, contentData, crmBlastData, spkData, kalenderData, kolData, okrTargetsMap, okrPeriod]);

  // Fungsi helper untuk rendering OKR
  const formatOkrValue = (val, format) => {
      if (format === 'currency') return formatIDR(val);
      if (format === 'percent') return `${val.toFixed(2)}%`;
      return Number(val).toLocaleString('id-ID');
  };

  const getOkrProgress = (target, realisasi, type) => {
      if (target === 0) return 0;
      let pct = (realisasi / target) * 100;
      return pct; // Tampilkan persentase pencapaian murni
  };

  const getOkrStatus = (target, realisasi, type) => {
      const pct = target > 0 ? (realisasi / target) * 100 : 0;
      if (type === 'higher_better') {
          if (pct >= 100) return { text: 'Tercapai', color: 'text-emerald-700 bg-emerald-100 border-emerald-200', bar: 'bg-emerald-500' };
          if (pct >= 50) return { text: 'Progres', color: 'text-amber-700 bg-amber-100 border-amber-200', bar: 'bg-amber-500' };
          return { text: 'Tertinggal', color: 'text-rose-700 bg-rose-100 border-rose-200', bar: 'bg-rose-500' };
      } else {
          // Lower is better (contoh CPR, Komplain)
          if (realisasi <= target) return { text: 'Sangat Baik', color: 'text-emerald-700 bg-emerald-100 border-emerald-200', bar: 'bg-emerald-500' };
          if (realisasi <= target * 1.2) return { text: 'Batas Wajar', color: 'text-amber-700 bg-amber-100 border-amber-200', bar: 'bg-amber-500' };
          return { text: 'Peringatan', color: 'text-rose-700 bg-rose-100 border-rose-200', bar: 'bg-rose-500' };
      }
  };

  const handleExport = (type) => {
    const currentName = isAdsTab ? 'Ads' : isAdsetTab ? 'Adset' : isLeadsTab ? 'Leads' : isClosingTab ? 'Closing' : isKolTab ? 'KOL' : isContentTab ? 'Konten' : isScheduleTab ? 'JadwalPosting' : isLpTab ? 'LandingPage' : isTiktokDailyTab ? 'TiktokDaily' : isYoutubeDailyTab ? 'YoutubeDaily' : isIgDailyTab ? 'InstagramDaily' : isFbDailyTab ? 'FacebookDaily' : isIgBayanganTab ? 'IgBayangan' : isFbBayanganTab ? 'FbBayangan' : isTiktokBayanganTab ? 'TiktokBayangan' : isYoutubeBayanganTab ? 'YoutubeBayangan' : isCrmBlastTab ? 'CRMBlast' : isKalenderTab ? 'KalenderSPK' : isSpkTab ? 'DokumentasiSPK' : isDailyOpsTab ? 'DailyOperasional' : isAssetsTab ? 'ManajemenAset' : isInventoryTab ? 'StokChemical' : isComplaintTab ? 'DataComplaint' : isSurveyTab ? 'SurveiB2B' : 'Data';

    if (type === 'excel') {
      const windowObj = window;
      if (!windowObj.XLSX) {
          alert("Sistem ekspor sedang disiapkan. Tunggu sebentar lalu coba lagi.");
          return;
      }
      const dataToExport = getCurrentProcessedData();
      const ws = windowObj.XLSX.utils.json_to_sheet(dataToExport, { header: tableHeaders });
      const wb = windowObj.XLSX.utils.book_new();
      windowObj.XLSX.utils.book_append_sheet(wb, ws, `Data_${currentName}`);
      windowObj.XLSX.writeFile(wb, `Hagia_${currentName}_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
    }
  };

  // --- PEMBARUAN: FULL BACKUP MENDUKUNG JSON & EXCEL ---
  const handleFullBackup = (format = 'json') => {
     const now = new Date();
     const dateStr = now.toISOString().split('T')[0];
     const timeStr = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');

     if (format === 'json') {
         const fullBackupData = {
             timestamp: now.toISOString(),
             version: "v2.0",
             data: {
                master_v6: adsData.map(({ id, ...rest }) => rest),
                adset_v1: adsetData.map(({ id, ...rest }) => rest),
                leads_v1: leadsData.map(({ id, ...rest }) => rest),
                closing_v1: closingData.map(({ id, ...rest }) => rest),
                kol_v1: kolData.map(({ id, ...rest }) => rest),
                content_v1: contentData.map(({ id, ...rest }) => rest),
                tiktok_daily_v1: tiktokDailyData.map(({ id, ...rest }) => rest),
             youtube_daily_v1: youtubeDailyData.map(({ id, ...rest }) => rest),
             ig_daily_v1: igDailyData.map(({ id, ...rest }) => rest),
             fb_daily_v1: fbDailyData.map(({ id, ...rest }) => rest),
             ig_bayangan_v1: igBayanganData.map(({ id, ...rest }) => rest),
             fb_bayangan_v1: fbBayanganData.map(({ id, ...rest }) => rest),
             tiktok_bayangan_v1: tiktokBayanganData.map(({ id, ...rest }) => rest),
             youtube_bayangan_v1: youtubeBayanganData.map(({ id, ...rest }) => rest),
             crm_blast_v1: crmBlastData.map(({ id, ...rest }) => rest),
             kalender_v1: kalenderData.map(({ id, ...rest }) => rest),
             spk_v1: spkData.map(({ id, ...rest }) => rest),
             daily_ops_v1: dailyOpsData.map(({ id, ...rest }) => rest),
             assets_v1: assetsData.map(({ id, ...rest }) => rest),
             inventory_v1: inventoryData.map(({ id, ...rest }) => rest),
             complaint_v1: complaintData.map(({ id, ...rest }) => rest),
             survey_v1: surveyData.map(({ id, ...rest }) => rest),
             landing_page_v1: lpData.map(({ id, ...rest }) => rest),
             schedule_v1: scheduleData.map(({ id, ...rest }) => rest),
          },
          config: {
             formulas: customFormulas,
                kpi: kpiTargets
             }
         };
         const blob = new Blob([JSON.stringify(fullBackupData, null, 2)], { type: 'application/json' });
         const a = document.createElement('a');
         a.href = URL.createObjectURL(blob);
         a.download = `Hagia_FullBackup_${dateStr}_${timeStr}.json`;
         a.click();
         logActivity(`Membuat Full Backup (JSON) pada jam ${timeStr}`);
     } else if (format === 'excel') {
         const windowObj = window;
         if (!windowObj.XLSX) { alert("Sistem Excel sedang disiapkan. Tunggu sebentar lalu coba lagi."); return; }
         
         const wb = windowObj.XLSX.utils.book_new();
         
         const addSheet = (dataList, sheetName, headers) => {
             const cleanData = dataList.map(({ id, ...rest }) => rest);
             const ws = windowObj.XLSX.utils.json_to_sheet(cleanData, { header: headers });
             windowObj.XLSX.utils.book_append_sheet(wb, ws, sheetName);
         };

         addSheet(adsData, 'Database_Iklan', ADS_HEADERS);
         addSheet(adsetData, 'Database_Adset', ADSET_HEADERS);
         addSheet(leadsData, 'Database_Leads', LEADS_HEADERS);
         addSheet(closingData, 'Data_Closing', CLOSING_HEADERS);
         addSheet(kolData, 'Database_KOL', KOL_HEADERS);
         addSheet(contentData, 'Database_Konten', CONTENT_HEADERS);
         addSheet(tiktokDailyData, 'Database_Tiktok', TIKTOK_DAILY_HEADERS);
         addSheet(youtubeDailyData, 'Database_Youtube', YOUTUBE_DAILY_HEADERS);
         addSheet(igDailyData, 'Database_Instagram', IG_DAILY_HEADERS);
         addSheet(fbDailyData, 'Database_Facebook', FB_DAILY_HEADERS);
         addSheet(igBayanganData, 'Database_IG_Bayangan', IG_BAYANGAN_HEADERS);
         addSheet(fbBayanganData, 'Database_FB_Bayangan', FB_BAYANGAN_HEADERS);
         addSheet(tiktokBayanganData, 'Database_Tiktok_Bayangan', TIKTOK_BAYANGAN_HEADERS);
         addSheet(youtubeBayanganData, 'Database_Youtube_Bayangan', YOUTUBE_BAYANGAN_HEADERS);
         addSheet(crmBlastData, 'Database_CRM_Blast', CRM_BLAST_HEADERS);
         addSheet(kalenderData, 'Data_Kalender_SPK', KALENDER_HEADERS);
         addSheet(spkData, 'Data_Dokumentasi_SPK', SPK_HEADERS);
         addSheet(dailyOpsData, 'Data_Daily_Operasional', DAILY_OPS_HEADERS);
         addSheet(assetsData, 'Data_Manajemen_Aset', ASSETS_HEADERS);
         addSheet(inventoryData, 'Data_Stok_Chemical', INVENTORY_HEADERS);
         addSheet(complaintData, 'Data_Complaint_QC', COMPLAINT_HEADERS);
         addSheet(surveyData, 'Data_Survei_B2B', SURVEY_HEADERS);
         addSheet(lpData, 'Data_LandingPage', LP_HEADERS);
         addSheet(scheduleData, 'Data_JadwalPosting', SCHEDULE_HEADERS);

         windowObj.XLSX.writeFile(wb, `Hagia_FullBackup_${dateStr}_${timeStr}.xlsx`);
         logActivity(`Membuat Full Backup (Excel) pada jam ${timeStr}`);
     }
  };

  // --- PEMBARUAN: FULL RESTORE MENDUKUNG JSON & EXCEL ---
  const handleFullRestore = (e, format = 'json') => {
     const file = e.target.files[0];
     if (!file) return;
     
     setDialog({
        isOpen: true,
        type: 'confirm',
        message: `PERHATIAN: Restore dari file ${format.toUpperCase()} ini akan MENGHAPUS seluruh database saat ini dan menggantinya dengan data baru. Apakah Anda yakin?`,
        onConfirm: () => {
           setDialog({ isOpen: false });
           setUploadState({ isUploading: true, progress: 0, timeLeft: 'Membaca file...', rowCount: 0 });
           
           if (format === 'json') {
               const reader = new FileReader();
               reader.onload = async (evt) => {
                  try {
                     const backup = JSON.parse(evt.target.result);
                     if (!backup.data || !backup.config) throw new Error("Format file JSON ini tidak valid atau rusak.");

                     const ops = [];
                     
                     // 1. Delete Existing
                     adsData.forEach(d => ops.push({ type: 'delete', collection: 'master_v6', id: d.id }));
                     adsetData.forEach(d => ops.push({ type: 'delete', collection: 'adset_v1', id: d.id }));
                     leadsData.forEach(d => ops.push({ type: 'delete', collection: 'leads_v1', id: d.id }));
                     closingData.forEach(d => ops.push({ type: 'delete', collection: 'closing_v1', id: d.id }));
                     kolData.forEach(d => ops.push({ type: 'delete', collection: 'kol_v1', id: d.id }));
                     contentData.forEach(d => ops.push({ type: 'delete', collection: 'content_v1', id: d.id }));
                     tiktokDailyData.forEach(d => ops.push({ type: 'delete', collection: 'tiktok_daily_v1', id: d.id }));
                     youtubeDailyData.forEach(d => ops.push({ type: 'delete', collection: 'youtube_daily_v1', id: d.id }));
                     igDailyData.forEach(d => ops.push({ type: 'delete', collection: 'ig_daily_v1', id: d.id }));
                     fbDailyData.forEach(d => ops.push({ type: 'delete', collection: 'fb_daily_v1', id: d.id }));
                     igBayanganData.forEach(d => ops.push({ type: 'delete', collection: 'ig_bayangan_v1', id: d.id }));
                     fbBayanganData.forEach(d => ops.push({ type: 'delete', collection: 'fb_bayangan_v1', id: d.id }));
                     tiktokBayanganData.forEach(d => ops.push({ type: 'delete', collection: 'tiktok_bayangan_v1', id: d.id }));
                     youtubeBayanganData.forEach(d => ops.push({ type: 'delete', collection: 'youtube_bayangan_v1', id: d.id }));
                     crmBlastData.forEach(d => ops.push({ type: 'delete', collection: 'crm_blast_v1', id: d.id }));
                     kalenderData.forEach(d => ops.push({ type: 'delete', collection: 'kalender_v1', id: d.id }));
                     spkData.forEach(d => ops.push({ type: 'delete', collection: 'spk_v1', id: d.id }));
                     dailyOpsData.forEach(d => ops.push({ type: 'delete', collection: 'daily_ops_v1', id: d.id }));
                     assetsData.forEach(d => ops.push({ type: 'delete', collection: 'assets_v1', id: d.id }));
                     inventoryData.forEach(d => ops.push({ type: 'delete', collection: 'inventory_v1', id: d.id }));
                     complaintData.forEach(d => ops.push({ type: 'delete', collection: 'complaint_v1', id: d.id }));
                     surveyData.forEach(d => ops.push({ type: 'delete', collection: 'survey_v1', id: d.id }));
                     lpData.forEach(d => ops.push({ type: 'delete', collection: 'landing_page_v1', id: d.id }));
                     scheduleData.forEach(d => ops.push({ type: 'delete', collection: 'schedule_v1', id: d.id }));

                     // 2. Insert New
                     ['master_v6', 'adset_v1', 'leads_v1', 'closing_v1', 'kol_v1', 'content_v1', 'schedule_v1', 'landing_page_v1', 'tiktok_daily_v1', 'youtube_daily_v1', 'ig_daily_v1', 'fb_daily_v1', 'ig_bayangan_v1', 'fb_bayangan_v1', 'tiktok_bayangan_v1', 'youtube_bayangan_v1', 'crm_blast_v1', 'kalender_v1', 'spk_v1', 'daily_ops_v1', 'assets_v1', 'inventory_v1', 'complaint_v1', 'survey_v1'].forEach(collectionName => {
                        if (backup.data[collectionName]) {
                           backup.data[collectionName].forEach(item => {
                              const newDocRef = doc(collection(db, 'artifacts', appId, 'public', 'data', collectionName));
                              ops.push({ type: 'set', collection: collectionName, id: newDocRef.id, data: item });
                           });
                        }
                     });

                     await runBatchOperations(ops, (progress, time, total) => setUploadState({ isUploading: true, progress, timeLeft: time, rowCount: total }));

                     if (backup.config.formulas) await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'config', 'formulas'), { formulas: backup.config.formulas });
                     if (backup.config.kpi) await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'config', 'kpi'), { targets: backup.config.kpi });

                     logActivity("Berhasil Full Restore dari file JSON");
                     setDialog({ isOpen: true, type: 'alert', message: 'Full Restore JSON berhasil! Semua data telah diperbarui.' });
                  } catch (err) { setErrorMsg("Gagal merestore JSON: " + err.message); }
                  setUploadState({ isUploading: false, progress: 0, timeLeft: '', rowCount: 0 });
               };
               reader.readAsText(file);
           } 
           else if (format === 'excel') {
               const reader = new FileReader();
               reader.onload = async (evt) => {
                  try {
                      const windowObj = window;
                      if (!windowObj.XLSX) throw new Error("Library Excel belum siap.");
                      
                      const wb = windowObj.XLSX.read(evt.target.result, { type: 'binary' });
                      const ops = [];

                      // 1. Delete Existing
                      adsData.forEach(d => ops.push({ type: 'delete', collection: 'master_v6', id: d.id }));
                      adsetData.forEach(d => ops.push({ type: 'delete', collection: 'adset_v1', id: d.id }));
                      leadsData.forEach(d => ops.push({ type: 'delete', collection: 'leads_v1', id: d.id }));
                      closingData.forEach(d => ops.push({ type: 'delete', collection: 'closing_v1', id: d.id }));
                      kolData.forEach(d => ops.push({ type: 'delete', collection: 'kol_v1', id: d.id }));
                      contentData.forEach(d => ops.push({ type: 'delete', collection: 'content_v1', id: d.id }));
                      tiktokDailyData.forEach(d => ops.push({ type: 'delete', collection: 'tiktok_daily_v1', id: d.id }));
                      youtubeDailyData.forEach(d => ops.push({ type: 'delete', collection: 'youtube_daily_v1', id: d.id }));
                      igDailyData.forEach(d => ops.push({ type: 'delete', collection: 'ig_daily_v1', id: d.id }));
                      fbDailyData.forEach(d => ops.push({ type: 'delete', collection: 'fb_daily_v1', id: d.id }));
                      igBayanganData.forEach(d => ops.push({ type: 'delete', collection: 'ig_bayangan_v1', id: d.id }));
                      fbBayanganData.forEach(d => ops.push({ type: 'delete', collection: 'fb_bayangan_v1', id: d.id }));
                      tiktokBayanganData.forEach(d => ops.push({ type: 'delete', collection: 'tiktok_bayangan_v1', id: d.id }));
                      youtubeBayanganData.forEach(d => ops.push({ type: 'delete', collection: 'youtube_bayangan_v1', id: d.id }));
                      crmBlastData.forEach(d => ops.push({ type: 'delete', collection: 'crm_blast_v1', id: d.id }));
                      kalenderData.forEach(d => ops.push({ type: 'delete', collection: 'kalender_v1', id: d.id }));
                      spkData.forEach(d => ops.push({ type: 'delete', collection: 'spk_v1', id: d.id }));
                      dailyOpsData.forEach(d => ops.push({ type: 'delete', collection: 'daily_ops_v1', id: d.id }));
                      assetsData.forEach(d => ops.push({ type: 'delete', collection: 'assets_v1', id: d.id }));
                      inventoryData.forEach(d => ops.push({ type: 'delete', collection: 'inventory_v1', id: d.id }));
                      complaintData.forEach(d => ops.push({ type: 'delete', collection: 'complaint_v1', id: d.id }));
                      surveyData.forEach(d => ops.push({ type: 'delete', collection: 'survey_v1', id: d.id }));
                      lpData.forEach(d => ops.push({ type: 'delete', collection: 'landing_page_v1', id: d.id }));
                      scheduleData.forEach(d => ops.push({ type: 'delete', collection: 'schedule_v1', id: d.id }));

                      // Helper function to read sheet safely
                      const readSheet = (sheetName, collectionName, headersRef) => {
                          const sheet = wb.Sheets[sheetName];
                          if (!sheet) return;
                          
                          const imported = windowObj.XLSX.utils.sheet_to_json(sheet, { raw: true, defval: "" });
                          const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');

                          imported.forEach(item => {
                              let cleaned = {};
                              headersRef.forEach(h => {
                                 let matchKey = Object.keys(item).find(k => norm(k) === norm(h));
                                 let val = matchKey !== undefined ? item[matchKey] : "";
                                 
                                 if (h === 'Tanggal' && val !== "") {
                                    if (typeof val === 'number' && val > 20000) {
                                        const excelEpoch = new Date(Date.UTC(1899, 11, 30));
                                        excelEpoch.setUTCDate(excelEpoch.getUTCDate() + Math.floor(val));
                                        val = `${excelEpoch.getUTCFullYear()}-${String(excelEpoch.getUTCMonth() + 1).padStart(2, '0')}-${String(excelEpoch.getUTCDate()).padStart(2, '0')}`;
                                    }
                                 }
                                 cleaned[h] = val !== undefined && val !== null ? String(val) : "";
                              });
                              // Rumus tidak kita terapkan ulang di Restore Excel karena asumsinya excel sudah punya value akhir, 
                              // atau user bisa nge-klik tombol Kalkulasi secara manual nanti.
                              const newDocRef = doc(collection(db, 'artifacts', appId, 'public', 'data', collectionName));
                              ops.push({ type: 'set', collection: collectionName, id: newDocRef.id, data: cleaned });
                          });
                      };

                      // 2. Insert from Sheets (Nama sheet harus match)
                      readSheet('Database_Iklan', 'master_v6', ADS_HEADERS);
                      readSheet('Database_Adset', 'adset_v1', ADSET_HEADERS);
                      readSheet('Database_Leads', 'leads_v1', LEADS_HEADERS);
                      readSheet('Data_Closing', 'closing_v1', CLOSING_HEADERS);
                      readSheet('Database_KOL', 'kol_v1', KOL_HEADERS);
                      readSheet('Database_Konten', 'content_v1', CONTENT_HEADERS);
                      readSheet('Database_Tiktok', 'tiktok_daily_v1', TIKTOK_DAILY_HEADERS);
                      readSheet('Database_Youtube', 'youtube_daily_v1', YOUTUBE_DAILY_HEADERS);
                      readSheet('Database_Instagram', 'ig_daily_v1', IG_DAILY_HEADERS);
                      readSheet('Database_Facebook', 'fb_daily_v1', FB_DAILY_HEADERS);
                      readSheet('Database_IG_Bayangan', 'ig_bayangan_v1', IG_BAYANGAN_HEADERS);
                      readSheet('Database_FB_Bayangan', 'fb_bayangan_v1', FB_BAYANGAN_HEADERS);
                      readSheet('Database_Tiktok_Bayangan', 'tiktok_bayangan_v1', TIKTOK_BAYANGAN_HEADERS);
                      readSheet('Database_Youtube_Bayangan', 'youtube_bayangan_v1', YOUTUBE_BAYANGAN_HEADERS);
                      readSheet('Database_CRM_Blast', 'crm_blast_v1', CRM_BLAST_HEADERS);
                      readSheet('Data_Kalender_SPK', 'kalender_v1', KALENDER_HEADERS);
                      readSheet('Data_Dokumentasi_SPK', 'spk_v1', SPK_HEADERS);
                      readSheet('Data_Daily_Operasional', 'daily_ops_v1', DAILY_OPS_HEADERS);
                      readSheet('Data_Manajemen_Aset', 'assets_v1', ASSETS_HEADERS);
                      readSheet('Data_Stok_Chemical', 'inventory_v1', INVENTORY_HEADERS);
                      readSheet('Data_Complaint_QC', 'complaint_v1', COMPLAINT_HEADERS);
                      readSheet('Data_Survei_B2B', 'survey_v1', SURVEY_HEADERS);
                      readSheet('Data_LandingPage', 'landing_page_v1', LP_HEADERS);
                      readSheet('Data_JadwalPosting', 'schedule_v1', SCHEDULE_HEADERS);

                      if (ops.length === (adsData.length + adsetData.length + leadsData.length + closingData.length + kolData.length + contentData.length + lpData.length + scheduleData.length + tiktokDailyData.length + youtubeDailyData.length + igDailyData.length + fbDailyData.length + igBayanganData.length + fbBayanganData.length + tiktokBayanganData.length + youtubeBayanganData.length + crmBlastData.length + kalenderData.length + spkData.length + dailyOpsData.length + assetsData.length + inventoryData.length + complaintData.length + surveyData.length)) {
                          throw new Error("Tidak ada sheet valid yang ditemukan di file Excel. Pastikan nama sheet adalah: Database_Iklan, Database_Adset, Database_Leads, Data_Closing, Database_KOL, Database_Konten, Data_JadwalPosting, Data_LandingPage, Database_Tiktok, Database_Youtube, Database_Instagram, Database_Facebook, Database_IG_Bayangan, Database_FB_Bayangan, Database_Tiktok_Bayangan, Database_Youtube_Bayangan, Database_CRM_Blast, Data_Kalender_SPK, Data_Dokumentasi_SPK, Data_Daily_Operasional, Data_Manajemen_Aset, Data_Stok_Chemical, Data_Complaint_QC, dan Data_Survei_B2B.");
                      }

                      await runBatchOperations(ops, (progress, time, total) => setUploadState({ isUploading: true, progress, timeLeft: time, rowCount: total }));

                      logActivity("Berhasil Full Restore dari file Excel");
                      setDialog({ isOpen: true, type: 'alert', message: 'Full Restore EXCEL berhasil! Semua data telah diimpor sesuai sheet.' });
                  } catch (err) { setErrorMsg("Gagal merestore Excel: " + err.message); }
                  setUploadState({ isUploading: false, progress: 0, timeLeft: '', rowCount: 0 });
               };
               reader.readAsBinaryString(file);
           }
        }
     });
     e.target.value = '';
  };

  // --- TAMBAHAN: FUNGSI RESET TOTAL ---
  const handleWipeData = () => {
      setDialog({
        isOpen: true,
        type: 'confirm',
        message: '🚨 PERINGATAN KRITIS: Anda akan MENGHAPUS BERSIH seluruh database (Iklan, Adset, Leads, Closing, Log Aktivitas). Aplikasi akan kembali kosong total. Pastikan Anda sudah mem-backup data sebelumnya. Lanjutkan penghapusan?',
        onConfirm: async () => {
           setDialog({ isOpen: false });
           setUploadState({ isUploading: true, progress: 0, timeLeft: 'Menghapus permanen...', rowCount: 0 });
           try {
               const ops = [];
               adsData.forEach(d => ops.push({ type: 'delete', collection: 'master_v6', id: d.id }));
               adsetData.forEach(d => ops.push({ type: 'delete', collection: 'adset_v1', id: d.id }));
               leadsData.forEach(d => ops.push({ type: 'delete', collection: 'leads_v1', id: d.id }));
               closingData.forEach(d => ops.push({ type: 'delete', collection: 'closing_v1', id: d.id }));
               kolData.forEach(d => ops.push({ type: 'delete', collection: 'kol_v1', id: d.id }));
               contentData.forEach(d => ops.push({ type: 'delete', collection: 'content_v1', id: d.id }));
               tiktokDailyData.forEach(d => ops.push({ type: 'delete', collection: 'tiktok_daily_v1', id: d.id }));
               youtubeDailyData.forEach(d => ops.push({ type: 'delete', collection: 'youtube_daily_v1', id: d.id }));
               igDailyData.forEach(d => ops.push({ type: 'delete', collection: 'ig_daily_v1', id: d.id }));
               fbDailyData.forEach(d => ops.push({ type: 'delete', collection: 'fb_daily_v1', id: d.id }));
               igBayanganData.forEach(d => ops.push({ type: 'delete', collection: 'ig_bayangan_v1', id: d.id }));
               fbBayanganData.forEach(d => ops.push({ type: 'delete', collection: 'fb_bayangan_v1', id: d.id }));
               tiktokBayanganData.forEach(d => ops.push({ type: 'delete', collection: 'tiktok_bayangan_v1', id: d.id }));
               youtubeBayanganData.forEach(d => ops.push({ type: 'delete', collection: 'youtube_bayangan_v1', id: d.id }));
               crmBlastData.forEach(d => ops.push({ type: 'delete', collection: 'crm_blast_v1', id: d.id }));
               kalenderData.forEach(d => ops.push({ type: 'delete', collection: 'kalender_v1', id: d.id }));
               spkData.forEach(d => ops.push({ type: 'delete', collection: 'spk_v1', id: d.id }));
               dailyOpsData.forEach(d => ops.push({ type: 'delete', collection: 'daily_ops_v1', id: d.id }));
               assetsData.forEach(d => ops.push({ type: 'delete', collection: 'assets_v1', id: d.id }));
               inventoryData.forEach(d => ops.push({ type: 'delete', collection: 'inventory_v1', id: d.id }));
               complaintData.forEach(d => ops.push({ type: 'delete', collection: 'complaint_v1', id: d.id }));
               surveyData.forEach(d => ops.push({ type: 'delete', collection: 'survey_v1', id: d.id }));
               lpData.forEach(d => ops.push({ type: 'delete', collection: 'landing_page_v1', id: d.id }));
               scheduleData.forEach(d => ops.push({ type: 'delete', collection: 'schedule_v1', id: d.id }));
               logsData.forEach(d => ops.push({ type: 'delete', collection: 'system_logs_v1', id: d.id }));

               await runBatchOperations(ops, (progress, time, total) => setUploadState({ isUploading: true, progress, timeLeft: time, rowCount: total }));
               
               // Sengaja kita bikin log baru setelah reset agar history tidak benar-benar blank
               await logActivity("⚠ SISTEM DI-RESET TOTAL OLEH PENGGUNA ⚠");
               
               setDialog({ isOpen: true, type: 'alert', message: 'Data berhasil dihapus bersih! Sistem sekarang seperti baru.' });
           } catch(e) { setErrorMsg("Gagal mereset sistem: " + e.message); }
           setUploadState({ isUploading: false, progress: 0, timeLeft: '', rowCount: 0 });
        }
      });
  };

  const generateWordReport = async () => {
    const originalElement = document.getElementById('pdf-report-content');
    if (!originalElement) return;

    setUploadState({ isUploading: true, progress: 50, timeLeft: 'Memproses grafik ke Word...', rowCount: 0 });

    try {
      // Menggandakan elemen agar UI asli tidak rusak saat diproses
      const clonedElement = originalElement.cloneNode(true);
      
      // Memuat library html2canvas secara otomatis jika belum ada
      if (!window.html2canvas) {
         await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
         });
      }

      // Mengubah setiap grafik/chart (recharts) menjadi file gambar PNG agar terbaca oleh MS Word
      const chartContainers = originalElement.querySelectorAll('.recharts-wrapper');
      const clonedContainers = clonedElement.querySelectorAll('.recharts-wrapper');

      for (let i = 0; i < chartContainers.length; i++) {
         const canvas = await window.html2canvas(chartContainers[i], { scale: 2, logging: false });
         const imgData = canvas.toDataURL('image/png');
         const img = document.createElement('img');
         img.src = imgData;
         img.style.width = '100%';
         img.style.maxWidth = '600px';
         img.style.height = 'auto';
         clonedContainers[i].parentNode.replaceChild(img, clonedContainers[i]);
      }

      const preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Laporan Hagia</title></head><body>";
      const postHtml = "</body></html>";
      const html = preHtml + clonedElement.innerHTML + postHtml;

      const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Laporan_Hagia_${filterType === 'custom' ? dateRange.start : filterType}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDialog({ isOpen: true, type: 'alert', message: 'File DOC (Word) berhasil diunduh lengkap dengan grafik visualnya!' });
    } catch (err) {
      console.error(err);
      setDialog({ isOpen: true, type: 'alert', message: 'Gagal menyematkan grafik. Pastikan koneksi internet stabil.' });
    } finally {
      setUploadState({ isUploading: false, progress: 0, timeLeft: '', rowCount: 0 });
    }
  };

  const generatePDFReport = () => {
    const element = document.getElementById('pdf-report-content');
    if (!element) return;
    
    if (!window.html2pdf) {
       setDialog({ isOpen: true, type: 'alert', message: 'Sistem PDF sedang disiapkan, silakan coba beberapa detik lagi.' });
       return;
    }
    
    setUploadState({ isUploading: true, progress: 80, timeLeft: 'Merender PDF...', rowCount: 0 });
    
    const reportName = `Laporan_Hagia_${filterType === 'custom' ? dateRange.start : filterType}.pdf`;
    const opt = {
      margin:       [10, 10, 10, 10], // Margin aman agar tidak terpotong
      filename:     reportName,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    window.html2pdf().set(opt).from(element).save().then(() => {
        setUploadState({ isUploading: false, progress: 0, timeLeft: '', rowCount: 0 });
        setDialog({ isOpen: true, type: 'alert', message: 'File PDF berhasil diunduh secara langsung!' });
    }).catch(err => {
        setUploadState({ isUploading: false, progress: 0, timeLeft: '', rowCount: 0 });
        setErrorMsg("Gagal membuat PDF: " + err.message);
    });
  };

  // HANDLER LOGIN & LOGOUT RBAC
  const handleLogin = (e) => {
     e.preventDefault();
     const roleEntry = Object.entries(rolesConfig).find(([key, val]) => val.pin === pinInput);
     if (roleEntry) {
        setActiveRole(roleEntry[0]);
        setActiveTab(rolesConfig[roleEntry[0]].tabs[0] || 'dashboard');
        setPinInput("");
        setLoginError("");
        logActivity(`User Login sebagai: ${rolesConfig[roleEntry[0]].name}`);
     } else {
        setLoginError("PIN Salah. Akses ditolak.");
     }
  };

  const handleLogout = () => {
     logActivity(`User Logout: ${rolesConfig[activeRole]?.name}`);
     setActiveRole(null);
     setActiveTab('dashboard');
  };

  if (loading && adsData.length === 0 && adsetData.length === 0 && leadsData.length === 0 && closingData.length === 0) return <div className="h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-indigo-600 md:w-14 md:h-14" size={40} /></div>;

  // GERBANG LOGIN RBAC & FORM PUBLIK
  if (!activeRole) {
     if (showPublicForm) {
         return (
             <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-10 font-sans">
                 <div className="bg-white rounded-[2rem] shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
                     <div className="bg-indigo-600 p-8 text-center text-white relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                         <h1 className="text-2xl font-black uppercase tracking-tight relative z-10">Form Booking Layanan</h1>
                         <p className="text-xs font-medium text-indigo-200 mt-2 relative z-10">Hagia Cleaners Indonesia</p>
                     </div>
                     
                     <form onSubmit={handleSubmitPublicBooking} className="p-6 md:p-8 space-y-6">
                         {/* Section 1: Layanan */}
                         <div>
                             <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2"><CheckSquare size={16}/> 1. Detail Layanan</h3>
                             <div className="grid grid-cols-2 gap-4 mb-4">
                                 <div>
                                     <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Pilih Layanan</label>
                                     <select required value={publicForm.layanan} onChange={e => setPublicForm({...publicForm, layanan: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-xs outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50">
                                         <option value="">-- Pilih --</option>
                                         <option value="Cuci Kasur Springbed">Cuci Kasur Springbed</option>
                                         <option value="Cuci Sofa / Kursi">Cuci Sofa / Kursi</option>
                                         <option value="Cuci Jok Mobil">Cuci Jok Mobil</option>
                                         <option value="General Cleaning">General Cleaning</option>
                                     </select>
                                 </div>
                                 <div>
                                     <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Jumlah Unit</label>
                                     <input required type="text" placeholder="Cth: 1 Kasur, 2 Bantal" value={publicForm.unit} onChange={e => setPublicForm({...publicForm, unit: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-xs outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50" />
                                 </div>
                             </div>
                         </div>

                         {/* Section 2: Jadwal */}
                         <div className="pt-4 border-t border-slate-100">
                             <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2"><Calendar size={16}/> 2. Tentukan Jadwal</h3>
                             <div className="mb-4">
                                 <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Pilih Tanggal</label>
                                 <input required type="date" value={publicForm.tanggal} onChange={e => setPublicForm({...publicForm, tanggal: e.target.value, jadwal: ''})} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-xs outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50" min={new Date().toISOString().split('T')[0]} />
                             </div>
                             
                             {publicForm.tanggal && (
                                 <div className="mb-4">
                                     <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Pilih Jam Kedatangan Tim</label>
                                     <div className="grid grid-cols-2 gap-3">
                                         <button type="button" disabled={!checkSlotAvailability(publicForm.tanggal, '1')} onClick={() => setPublicForm({...publicForm, jadwal: '1'})} className={`p-3 rounded-xl border-2 text-left transition-all ${!checkSlotAvailability(publicForm.tanggal, '1') ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60' : publicForm.jadwal === '1' ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md' : 'bg-white border-slate-200 hover:border-indigo-300'}`}>
                                             <p className="text-xs font-black">Pagi (10:00)</p>
                                             <p className="text-[9px] mt-1">{checkSlotAvailability(publicForm.tanggal, '1') ? 'Tersedia' : 'Penuh'}</p>
                                         </button>
                                         <button type="button" disabled={!checkSlotAvailability(publicForm.tanggal, '2')} onClick={() => setPublicForm({...publicForm, jadwal: '2'})} className={`p-3 rounded-xl border-2 text-left transition-all ${!checkSlotAvailability(publicForm.tanggal, '2') ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60' : publicForm.jadwal === '2' ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md' : 'bg-white border-slate-200 hover:border-indigo-300'}`}>
                                             <p className="text-xs font-black">Siang (14:00)</p>
                                             <p className="text-[9px] mt-1">{checkSlotAvailability(publicForm.tanggal, '2') ? 'Tersedia' : 'Penuh'}</p>
                                         </button>
                                     </div>
                                 </div>
                             )}
                         </div>

                         {/* Section 3: Lokasi & Kontak */}
                         <div className="pt-4 border-t border-slate-100">
                             <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2"><MapPin size={16}/> 3. Lokasi & Data Diri</h3>
                             <div className="space-y-4">
                                 <div>
                                     <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Link Google Maps (Shareloc)</label>
                                     <input type="url" placeholder="https://maps.app.goo.gl/..." value={publicForm.shareloc} onChange={e => setPublicForm({...publicForm, shareloc: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-xs outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 text-blue-600" />
                                 </div>
                                 <div>
                                     <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Alamat Lengkap (Patokan)</label>
                                     <textarea required placeholder="Jalan, RT/RW, Patokan Rumah..." value={publicForm.alamat} onChange={e => setPublicForm({...publicForm, alamat: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-xs outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 h-20 resize-none custom-scrollbar" />
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                     <div>
                                         <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Nama Lengkap</label>
                                         <input required type="text" placeholder="Nama Anda" value={publicForm.nama} onChange={e => setPublicForm({...publicForm, nama: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-xs outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50" />
                                     </div>
                                     <div>
                                         <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Nomor WhatsApp</label>
                                         <input required type="tel" placeholder="08..." value={publicForm.hp} onChange={e => setPublicForm({...publicForm, hp: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-xs outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50" />
                                     </div>
                                 </div>
                             </div>
                         </div>

                         <div className="pt-6 flex gap-3">
                             <button type="button" onClick={() => setShowPublicForm(false)} className="px-6 py-4 bg-slate-100 text-slate-500 rounded-xl font-black hover:bg-slate-200 transition-colors">Batal</button>
                             <button type="submit" disabled={!publicForm.tanggal || !publicForm.jadwal} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed">Kirim Booking</button>
                         </div>
                     </form>
                 </div>
                 
                 {/* Modal Notifikasi di dalam Form Publik */}
                 {dialog.isOpen && (
                    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col text-center p-8">
                        <CheckCircle className="text-emerald-500 mx-auto mb-4" size={48} />
                        <h3 className="font-black text-xl text-slate-800 tracking-tight mb-2">Sukses!</h3>
                        <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">{dialog.message}</p>
                        <button onClick={() => setDialog({ isOpen: false })} className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-md transition-colors">Tutup Jendela</button>
                      </div>
                    </div>
                  )}
             </div>
         );
     }

     return (
        <div className="h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
           <div className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-sm w-full animate-in zoom-in duration-500">
              <div className="flex flex-col items-center mb-8">
                 <div className="bg-indigo-100 p-4 rounded-3xl mb-4">
                    <Lock size={36} className="text-indigo-600" />
                 </div>
                 <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Hagia Pro</h1>
                 <div className="min-h-[80px] w-full flex items-center justify-center mt-3">
                    <p key={randomQuote} className="text-xs text-slate-500 font-bold text-center bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl italic leading-relaxed shadow-inner w-full animate-in fade-in duration-500">"{randomQuote}"</p>
                 </div>
              </div>
              {loginError && <div className="bg-rose-50 text-rose-600 p-3 rounded-xl text-xs font-bold mb-5 text-center flex items-center justify-center gap-2 border border-rose-100"><AlertCircle size={14}/> {loginError}</div>}
              <form onSubmit={handleLogin} className="space-y-5">
                 <div>
                    <input type="password" value={pinInput} onChange={e => setPinInput(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 text-center text-3xl font-black tracking-[0.3em] text-indigo-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-inner" placeholder="••••" maxLength={6} autoFocus />
                 </div>
                 <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all uppercase tracking-widest text-xs flex justify-center items-center gap-2"><KeyRound size={16}/> Verifikasi PIN</button>
              </form>
              <div className="mt-8 pt-6 border-t border-slate-100 text-[9px] text-slate-400 font-bold space-y-1.5 bg-slate-50 p-4 rounded-xl">
                 <p className="text-slate-500 mb-2 uppercase tracking-widest">Daftar PIN Tersedia:</p>
                 {Object.entries(rolesConfig).map(([key, role]) => (
                    <p key={key} className="flex justify-between"><span>{role.name}:</span> <span className="text-indigo-600">{role.pin}</span></p>
                 ))}
              </div>
           </div>
           
           {/* Tombol Form Publik di Luar Login */}
           <button onClick={() => setShowPublicForm(true)} className="mt-8 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl font-black text-sm border border-white/20 backdrop-blur-sm transition-all shadow-lg flex items-center gap-2 hover:-translate-y-1">
               <Calendar size={16}/> Form Booking Customer
           </button>
        </div>
     );
  }

  return (
    <div onClickCapture={handleAppClickCapture} className={`min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 overflow-hidden ${isBuilderMode ? 'builder-mode-active' : ''}`}>
      
      {/* Mobile Overlay for Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar - Disesuaikan untuk Mobile */}
      <aside className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 ${isSidebarOpen ? 'w-72' : 'md:w-20'} bg-slate-900 h-screen transition-all duration-300 flex flex-col z-50 text-white shadow-2xl`}>
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          {(isSidebarOpen || window.innerWidth > 768) && <div className={`flex items-center gap-3 ${!isSidebarOpen && 'md:hidden'}`}><div className="bg-indigo-600 p-2 rounded-xl shadow-lg"><Target size={20} /></div><span className="font-black text-xl uppercase tracking-tighter">Hagia Pro</span></div>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-xl transition-all md:block hidden">{isSidebarOpen ? <X size={20} /> : <Menu size={20} />}</button>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all md:hidden"><X size={20} /></button>
        </div>
        <nav className="flex-1 p-3 mt-2 overflow-y-auto custom-scrollbar pb-6">
          {[
            {
              group: 'HR & Kepegawaian',
              items: [
                { id: 'absensi', icon: UserCheck, label: 'Absensi Karyawan' }
              ]
            },
            {
              group: 'Executive & Finance',
              items: [
                { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard Utama' },
                { id: 'roas_report', icon: LineChartIcon, label: 'Laporan ROAS & Layan..' },
                { id: 'report', icon: FileText, label: 'Pembuat Laporan PDF' },
                { id: 'okr', icon: Flag, label: 'OKR Corporate Dashboard' }
              ]
            },
            {
              group: 'Sales & CRM',
              items: [
                { id: 'leads', icon: Users, label: 'Database Leads' },
                { id: 'closing', icon: ShoppingBag, label: 'Data Closing' },
                { id: 'crm_blast', icon: MessageSquare, label: 'Database CRM & Blast' },
                { id: 'survey', icon: MapPin, label: 'Laporan Survei B2B' }
              ]
            },
            {
              group: 'Operasional & QC',
              items: [
                { id: 'kalender', icon: Calendar, label: 'Kalender & SPK' },
                { id: 'spk', icon: FileText, label: 'Dokumentasi SPK' },
                { id: 'daily_ops', icon: ClipboardPaste, label: 'Daily Operasional' },
                { id: 'assets', icon: Wrench, label: 'Manajemen Aset Peralatan' },
                { id: 'inventory', icon: Archive, label: 'Stok Opname Chemical' },
                { id: 'complaint', icon: AlertCircle, label: 'Data Complaint & QC' }
              ]
            },
            {
              group: 'Marketing & Ads',
              items: [
                { id: 'data', icon: TableIcon, label: 'Database Iklan' },
                { id: 'adset', icon: Layers, label: 'Database Per Adset' },
                { id: 'kol', icon: Megaphone, label: 'Database KOL' },
                { id: 'content', icon: Film, label: 'Planing & Analisa Konten' },
                { id: 'schedule', icon: Calendar, label: 'Jadwal Posting Sosmed' },
                { id: 'landing_page', icon: MousePointerClick, label: 'Data Landing Page' }
              ]
            },
            {
              group: 'Analisa Sosmed',
              items: [
                { id: 'tiktok_daily', icon: Smartphone, label: 'Harian Tiktok' },
                { id: 'youtube_daily', icon: Youtube, label: 'Harian Youtube' },
                { id: 'ig_daily', icon: Instagram, label: 'Harian Instagram' },
                { id: 'fb_daily', icon: Facebook, label: 'Harian Facebook' },
                { id: 'ig_bayangan', icon: Instagram, label: 'IG Bayangan' },
                { id: 'fb_bayangan', icon: Facebook, label: 'FB Bayangan' },
                { id: 'tiktok_bayangan', icon: Smartphone, label: 'Tiktok Bayangan' },
                { id: 'youtube_bayangan', icon: Youtube, label: 'Youtube Bayangan' }
              ]
            },
            {
              group: 'Pengaturan Sistem',
              items: [
                { id: 'tools', icon: Settings, label: 'Konfigurasi & Rumus' },
                { id: 'history', icon: History, label: 'Log Aktivitas' }
              ]
            }
          ].map((menuGroup, gIdx) => {
            // Filter menu berdasarkan Role Akses (RBAC) yang sedang login
            const visibleItems = menuGroup.items.filter(item => activeRole && rolesConfig[activeRole]?.tabs?.includes(item.id));
            
            // Jika dalam satu grup tidak ada menu yang bisa diakses sama sekali, sembunyikan grup tersebut
            if (visibleItems.length === 0) return null;

            return (
              <div key={gIdx} className="mb-5">
                {(isSidebarOpen || window.innerWidth > 768) && (
                   <p className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-500/70 mb-2.5 mt-2">{menuGroup.group}</p>
                )}
                <div className="space-y-1.5">
                   {visibleItems.map(item => (
                     <button key={item.id} onClick={() => {setActiveTab(item.id); if(window.innerWidth < 768) setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${activeTab === item.id ? 'bg-indigo-600 shadow-lg shadow-indigo-600/30 text-white font-bold' : 'hover:bg-white/5 text-slate-400 font-medium'}`}>
                        <item.icon size={20} className={`flex-shrink-0 ${activeTab === item.id ? 'text-white' : 'opacity-70'}`} />
                        {(isSidebarOpen || window.innerWidth <= 768) && <span className="text-sm truncate">{item.label}</span>}
                     </button>
                   ))}
                </div>
              </div>
            );
          })}
        </nav>
        
        {/* MENU: SISTEM & DATABASE */}
        {activeRole && rolesConfig[activeRole]?.tabs?.includes('system') && (
           <div className="p-4 mt-auto border-t border-white/5">
              <button onClick={() => {setActiveTab('system'); if(window.innerWidth < 768) setIsSidebarOpen(false);}} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${activeTab === 'system' ? 'bg-rose-600 shadow-xl shadow-rose-600/30 text-white font-bold' : 'hover:bg-rose-500/10 text-rose-300 font-medium'}`}>
                 <Database size={22} className="flex-shrink-0" />
                 {(isSidebarOpen || window.innerWidth <= 768) && <span className="text-sm truncate">Sistem & Backup</span>}
              </button>
           </div>
        )}
        
        {/* TOMBOL LOGOUT */}
        <div className={`p-4 border-t border-white/5 ${!rolesConfig[activeRole]?.tabs?.includes('system') ? 'mt-auto' : ''}`}>
           <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all hover:bg-slate-800 text-slate-400 font-medium group">
              <KeyRound size={22} className="flex-shrink-0 text-rose-500 group-hover:text-rose-400" />
              {(isSidebarOpen || window.innerWidth <= 768) && <span className="text-sm truncate text-rose-500 group-hover:text-rose-400 font-bold">Keluar ({rolesConfig[activeRole]?.name?.split('/')[0]?.trim()})</span>}
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen flex flex-col overflow-hidden w-full">
        {/* Mobile Header (Hanya tampil di HP) */}
        <div className="md:hidden bg-white border-b border-slate-200 px-5 py-4 flex items-center justify-between z-30 shadow-sm shrink-0">
            <div className="flex items-center gap-3">
               <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 bg-slate-100 text-slate-600 rounded-lg"><Menu size={20}/></button>
               <span className="font-black text-lg tracking-tighter text-slate-800">HAGIA PRO</span>
            </div>
            {/* Tombol AI Mobile */}
            <button onClick={() => setIsAiModalOpen(true)} className="bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white p-2 rounded-xl font-black shadow-lg shadow-fuchsia-500/30 flex items-center justify-center animate-pulse">
               <Sparkles size={20} />
            </button>
        </div>

        {/* Header with Filters */}
        {activeTab !== 'report' && activeTab !== 'builder' && activeTab !== 'okr' && (
          <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 md:py-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4 sticky top-0 z-20 shadow-sm shrink-0">
             <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase hidden md:block">Analytics Hagia</h2>
             <div className="flex flex-wrap items-center gap-2 md:gap-3">
                {/* TOMBOL AI ASSISTANT DESKTOP */}
                <button onClick={() => setIsAiModalOpen(true)} className="hidden md:flex bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white px-4 py-2.5 rounded-xl text-[10px] md:text-xs font-black shadow-lg shadow-fuchsia-500/30 items-center gap-2 hover:-translate-y-0.5 transition-transform xl:mr-4 border border-fuchsia-400/50">
                  <Sparkles size={16} className="animate-pulse" /> ✨ Tanya Asisten AI
                </button>
                
                <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner overflow-x-auto w-full xl:w-auto custom-scrollbar">
                   {[
                     { id: 'all', label: 'Semua' }, { id: 'today', label: 'Hari Ini' }, { id: 'yesterday', label: 'Kemarin' },
                     { id: 'this_week', label: 'Mg Ini' }, { id: 'this_month', label: 'Bln Ini' }, { id: 'custom', label: 'Custom' }
                   ].map(f => (
                     <button key={f.id} onClick={() => handleGlobalFilterChange(f.id)} className={`px-3 md:px-4 py-2 rounded-xl text-[10px] font-black uppercase whitespace-nowrap transition-all ${filterType === f.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{f.label}</button>
                   ))}
                </div>
                {filterType === 'custom' && (
                  <div className="bg-indigo-50 px-3 md:px-4 py-2 rounded-2xl flex items-center gap-2 border border-indigo-100 w-full xl:w-auto justify-between xl:justify-start">
                     <Calendar size={14} className="text-indigo-600 flex-shrink-0" />
                     <input type="date" value={dateRange.start} onChange={e => {setDateRange({...dateRange, start: e.target.value}); logActivity(`Ubah Tanggal Awal Custom: ${e.target.value}`);}} className="bg-transparent text-[10px] md:text-xs font-black outline-none border-none text-indigo-900 w-full" />
                     <span className="text-indigo-300 font-bold">-</span>
                     <input type="date" value={dateRange.end} onChange={e => {setDateRange({...dateRange, end: e.target.value}); logActivity(`Ubah Tanggal Akhir Custom: ${e.target.value}`);}} className="bg-transparent text-[10px] md:text-xs font-black outline-none border-none text-indigo-900 w-full" />
                  </div>
                )}
                <button onClick={() => { setFilterType('all'); setDateRange({start:'', end:''}); logActivity("Reset Semua Filter Global"); }} className="p-2 md:p-2.5 bg-slate-100 rounded-xl hover:bg-slate-200 text-slate-500 xl:block absolute right-4 md:right-8 xl:relative xl:right-0"><RefreshCw size={16} className="md:w-5 md:h-5" /></button>
             </div>
          </header>
        )}

        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50 custom-scrollbar relative">
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl mb-6 font-bold flex items-center justify-between">
              {String(errorMsg)}
              <button onClick={() => setErrorMsg(null)}><X size={16}/></button>
            </div>
          )}

          {/* --- TAB: DASHBOARD UTAMA --- */}
          {activeTab === 'dashboard' && (
            <div className="max-w-[1600px] mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-700">
              
              <div className="flex items-center gap-2 bg-white p-1.5 rounded-[2rem] border border-slate-200 shadow-sm mb-4 md:mb-8 overflow-x-auto custom-scrollbar whitespace-nowrap scroll-smooth">
                {DASHBOARD_TABS.map(tab => {
                  const isActive = dashboardSubTab === tab.id;
                  return (
                    <button 
                      key={tab.id} 
                      onClick={() => setDashboardSubTab(tab.id)} 
                      className={`flex items-center gap-2.5 px-5 md:px-6 py-3 md:py-3.5 rounded-[2rem] text-[10px] md:text-[11px] font-black tracking-wide transition-all duration-300 flex-shrink-0 ${
                        isActive ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-300/40 scale-[1.03] border-none' : 'bg-white text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 shadow-sm'
                      }`}
                    >
                      <tab.icon size={16} className={`md:w-5 md:h-5 ${isActive ? "text-indigo-200" : "text-slate-400"}`} /> 
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-6 md:space-y-8">
                 {/* 1. VIEW: EXECUTIVE SUMMARY */}
                 {dashboardSubTab === 'summary' && (
                   <>
                     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 md:gap-6 animate-in slide-in-from-bottom duration-500">
                        <MetricCard title="Total Sales Closing" value={formatIDR(roasReportData.keseluruhan.total.sales)} trend={trends.sales} icon={ShoppingBag} color="emerald" tooltip="Total omzet kotor (Gross) dari form booking yang masuk pada saat itu (Nominal Closing di Database Leads)." variant="gradient" sub={`Dari Iklan WA: ${formatIDR(roasReportData.iklan_saja.total.sales)}`} />
                        <MetricCard title="Total Revenue" value={formatIDR(totalActualRevenue)} trend={trends.revenue} icon={Wallet} color="blue" tooltip="Total pendapatan asli (uang yang sudah ditransfer) ditarik dari kolom Total Revenue di Data Closing." variant="gradient" />
                        <MetricCard title="Total Biaya Iklan Meta" value={formatIDR(roasReportData.keseluruhan.total.budget)} trend={trends.spend} icon={DollarSign} color="rose" tooltip="Total anggaran yang dihabiskan untuk kampanye Meta Ads pada periode terpilih." variant="gradient" />
                        <MetricCard title="Overall ROAS Sistem" value={`${(roasReportData.keseluruhan.total.budget > 0 ? roasReportData.keseluruhan.total.sales / roasReportData.keseluruhan.total.budget : 0).toFixed(2)}x`} trend={trends.roas} icon={TrendingUp} color="indigo" sub={`Target KPI: ${getTarget('roas_overall', 4.0)}x`} tooltip="Return on Ad Spend Gabungan. Dihitung dengan membagi Total Booking dengan Total Biaya Iklan." variant="gradient" />
                        <MetricCard title="Cost Per Closing (CPA)" value={formatIDR(roasReportData.keseluruhan.total.closing > 0 ? roasReportData.keseluruhan.total.budget / roasReportData.keseluruhan.total.closing : roasReportData.keseluruhan.total.budget)} trend={trends.cpa} icon={Target} color="amber" tooltip="Rata-rata biaya iklan yang dihabiskan untuk mendapatkan 1 deal." variant="gradient" sub={`CPA Murni Iklan WA: ${formatIDR(roasReportData.iklan_saja.total.closing > 0 ? roasReportData.iklan_saja.total.budget / roasReportData.iklan_saja.total.closing : roasReportData.iklan_saja.total.budget)}`} />
                     </div>
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden hover:shadow-lg transition-shadow duration-500">
                           <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-10 gap-4">
                              <div>
                                <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase text-slate-800">Tren Pemasukan vs Pengeluaran</h3>
                                <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-1">Pergerakan omzet closing (Real Data Leads) berbanding lurus dengan bakar budget iklan Meta.</p>
                              </div>
                              <div className="flex gap-4 bg-slate-50 px-4 md:px-5 py-2 md:py-3 rounded-2xl border border-slate-100 shadow-inner w-full sm:w-auto justify-center">
                                 <LegendItem color="#10b981" label="Omzet Sales" />
                                 <LegendItem color="#f43f5e" label="Biaya Iklan" />
                              </div>
                           </div>
                           <div className="h-[300px] md:h-[380px]">
                              <ResponsiveContainer width="100%" height="100%">
                                 <AreaChart data={stats.chartDataList}>
                                    <defs>
                                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                                      <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/></linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize:9, fontWeight:800, fill:'#94a3b8'}} dy={10} minTickGap={20} />
                                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fontSize:9, fontWeight:800, fill:'#94a3b8'}} tickFormatter={(val) => `Rp${(val/1000000).toFixed(0)}M`} dx={-10} width={45}/>
                                    <RechartsTooltip content={(props) => <CustomTooltip {...props} currency={true} />} cursor={{stroke: '#e2e8f0', strokeWidth: 2}} />
                                    <Area yAxisId="left" type="monotone" dataKey="Sales" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                                    <Area yAxisId="left" type="monotone" dataKey="Cost" stroke="#f43f5e" strokeWidth={4} fillOpacity={1} fill="url(#colorSpend)" />
                                 </AreaChart>
                              </ResponsiveContainer>
                           </div>
                        </div>
                        <AnalysisPanel analysisData={getAnalysis(dashboardSubTab)} />
                     </div>
                   </>
                 )}

                 {/* 2. VIEW: PERFORMA META ADS */}
                 {dashboardSubTab === 'meta' && (
                   <div className="animate-in slide-in-from-bottom duration-500">
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                        <MetricCard title="CTR Tautan" value={`${stats.avgCTR.toFixed(2)}%`} trend={trends.ctr} icon={Target} color="indigo" sub={`Target: ${getTarget('ctr', 1.5)}%`} tooltip="Click-Through Rate. Persentase orang yang mengklik tautan setelah melihat konten iklan Meta Anda." />
                        <MetricCard title="CPC Iklan" value={formatIDR(stats.avgCPC)} trend={trends.cpc} icon={MousePointer2} color="slate" sub={`Target: ${formatIDR(getTarget('cpc', 3000))}`} tooltip="Cost Per Click. Rata-rata biaya yang Anda bayar ke Meta untuk setiap klik tautan pada iklan." />
                        <MetricCard title="CPM Biaya" value={formatIDR(stats.avgCPM)} trend={trends.cpm} icon={Eye} color="blue" sub="Biaya 1000 Tayangan" tooltip="Cost Per Mille. Biaya rata-rata untuk setiap 1.000 tayangan iklan di platform Facebook/Instagram." />
                        <MetricCard title="CPR Platform" value={formatIDR(stats.avgCPR)} trend={trends.cpr} icon={DollarSign} color="rose" sub="Cost per Meta Result" tooltip="Cost Per Result. Rata-rata biaya per hasil spesifik (misalnya pesan WA) sesuai dengan algoritma kampanye Meta." />
                     </div>
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden hover:shadow-lg transition-shadow duration-500">
                           <div className="flex items-center justify-between mb-8 md:mb-10">
                              <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase text-slate-800">Efisiensi Lelang Konten (CPC vs CTR)</h3>
                           </div>
                           <div className="h-[300px] md:h-[400px]">
                              <ResponsiveContainer width="100%" height="100%">
                                 <LineChart data={stats.chartDataList}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize:9, fontWeight:800, fill:'#94a3b8'}} dy={10} minTickGap={20} />
                                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fontSize:9, fontWeight:800, fill:'#94a3b8'}} dx={-10} width={45} />
                                    <YAxis yAxisId="right" orientation="right" hide />
                                    <RechartsTooltip content={(props) => <CustomTooltip {...props} />} cursor={{stroke: '#e2e8f0', strokeWidth: 2}} />
                                    <Line yAxisId="left" type="monotone" dataKey="CPC" name="CPC (Rp)" stroke="#ef4444" strokeWidth={4} dot={{r: 3, strokeWidth: 2}} activeDot={{r: 6}} />
                                    <Line yAxisId="right" type="monotone" dataKey="CTR" name="CTR (%)" stroke="#6366f1" strokeWidth={4} dot={{r: 3, strokeWidth: 2}} activeDot={{r: 6}} />
                                 </LineChart>
                              </ResponsiveContainer>
                           </div>
                        </div>
                        <AnalysisPanel analysisData={getAnalysis(dashboardSubTab)} />
                     </div>
                   </div>
                 )}

                 {/* TAMBAHAN VIEW: ANALISA ADSET SPESIFIK (FULL WIDTH) */}
                 {dashboardSubTab === 'adset_analysis' && (
                    <div className="animate-in slide-in-from-bottom duration-500">
                        <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-500 mb-6">
                           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 md:mb-8 text-center sm:text-left">
                             <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl"><Layers size={24} className="md:w-7 md:h-7"/></div>
                                <div>
                                  <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase text-slate-800">Performa Adset Spesifik</h3>
                                  <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-1">Evaluasi metrik lengkap (CPR, CPC, CTR, Kunjungan IG) untuk menentukan Winning Adset.</p>
                                </div>
                             </div>
                             <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 shadow-inner">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total Adset Terdata</p>
                                <p className="text-xl font-black text-indigo-600">{adsetAnalytics.length} <span className="text-sm">Kampanye</span></p>
                             </div>
                           </div>
                           
                           {/* Tabel Adset Full Width */}
                           <div className="overflow-x-auto custom-scrollbar bg-slate-50/50 rounded-2xl md:rounded-3xl border border-slate-100 p-1 md:p-2 mb-8">
                              <table className="w-full text-left border-collapse min-w-max">
                                 <thead>
                                    <tr className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest border-b-2 border-slate-200">
                                       <th className="py-3 md:py-4 px-3 md:px-4 sticky left-0 bg-slate-100/90 backdrop-blur-sm z-10 border-r border-slate-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">Nama Adset & Campaign</th>
                                       <th className="py-3 md:py-4 px-3 text-right text-rose-600 bg-rose-50/50">Biaya (Spend)</th>
                                       <th className="py-3 md:py-4 px-3 text-center text-blue-600 bg-blue-50/50">Hasil (Meta)</th>
                                       <th className="py-3 md:py-4 px-3 text-center text-emerald-600 bg-emerald-50/50">Total Leads</th>
                                       <th className="py-3 md:py-4 px-3 text-right">Cost / Result (CPR)</th>
                                       <th className="py-3 md:py-4 px-3 text-right">CPC (Rp)</th>
                                       <th className="py-3 md:py-4 px-3 text-center">CTR Link</th>
                                       <th className="py-3 md:py-4 px-3 text-center">CTR Semua</th>
                                       <th className="py-3 md:py-4 px-3 text-center">Klik Semua</th>
                                       <th className="py-3 md:py-4 px-3 md:px-4 text-center">Kunj. Profil IG</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {adsetAnalytics.length === 0 ? (
                                      <tr><td colSpan="10" className="text-center py-10 text-slate-400 font-bold">Data Adset kosong. Silakan impor dari tab Database Per Adset.</td></tr>
                                    ) : adsetAnalytics.map((adset, i) => (
                                       <tr key={i} className="border-b border-slate-100 hover:bg-indigo-50/80 transition-colors group cursor-pointer" onClick={() => handleDrillDown('adset', 'Nama Adset', adset.name)} title="Klik untuk memfilter di database Adset">
                                          <td className="py-3 md:py-4 px-3 md:px-4 sticky left-0 bg-white group-hover:bg-indigo-50/90 z-10 transition-colors border-r border-slate-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                                              <p className="text-xs md:text-sm font-black text-slate-800 group-hover:text-indigo-700 truncate max-w-[200px] md:max-w-[280px]">{adset.name}</p>
                                              <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-slate-400 mt-0.5 truncate max-w-[200px] md:max-w-[280px]">{adset.campaign}</p>
                                          </td>
                                          <td className="py-3 md:py-4 px-3 text-right font-black text-rose-600 text-xs md:text-sm bg-rose-50/30">{formatIDR(adset.spend)}</td>
                                          <td className="py-3 md:py-4 px-3 text-center font-bold text-blue-600 text-xs md:text-sm bg-blue-50/30">{adset.metaHasil.toLocaleString('id-ID')}</td>
                                          <td className="py-3 md:py-4 px-3 text-center font-black text-emerald-600 text-sm md:text-base bg-emerald-50/30">{adset.results.toLocaleString('id-ID')}</td>
                                          <td className="py-3 md:py-4 px-3 text-right font-black text-xs md:text-sm text-slate-800">
                                            {adset.cpr > 0 ? formatIDR(adset.cpr) : '-'}
                                          </td>
                                          <td className="py-3 md:py-4 px-3 text-right font-bold text-amber-600 text-xs md:text-sm">{formatIDR(adset.cpcAvg)}</td>
                                          <td className="py-3 md:py-4 px-3 text-center font-bold text-indigo-600 text-xs md:text-sm">{adset.ctrLinkAvg.toFixed(2)}%</td>
                                          <td className="py-3 md:py-4 px-3 text-center font-bold text-indigo-400 text-xs md:text-sm">{adset.ctrAllAvg.toFixed(2)}%</td>
                                          <td className="py-3 md:py-4 px-3 text-center font-bold text-slate-600 text-xs md:text-sm">{adset.clicks.toLocaleString('id-ID')}</td>
                                          <td className="py-3 md:py-4 px-3 md:px-4 text-center font-black text-purple-600 text-xs md:text-sm">{adset.igVisits.toLocaleString('id-ID')}</td>
                                       </tr>
                                    ))}
                                 </tbody>
                                 {/* TAMBAHAN: TFOOT UNTUK TOTAL/RATA-RATA ADSET */}
                                 {adsetAnalytics.length > 0 && (() => {
                                    const totals = adsetAnalytics.reduce((acc, curr) => {
                                       acc.spend += curr.spend;
                                       acc.metaHasil += curr.metaHasil;
                                       acc.results += curr.results;
                                       acc.clicks += curr.clicks;
                                       acc.igVisits += curr.igVisits;
                                       acc.cpcSum += curr.cpcSum;
                                       acc.ctrLinkSum += curr.ctrLinkSum;
                                       acc.ctrAllSum += curr.ctrAllSum;
                                       acc.rowCount += curr.rowCount;
                                       return acc;
                                    }, { spend: 0, metaHasil: 0, results: 0, clicks: 0, igVisits: 0, cpcSum: 0, ctrLinkSum: 0, ctrAllSum: 0, rowCount: 0 });
                                    
                                    const totalCpr = totals.results > 0 ? totals.spend / totals.results : (totals.metaHasil > 0 ? totals.spend / totals.metaHasil : 0);
                                    const totalCpc = totals.rowCount > 0 ? totals.cpcSum / totals.rowCount : 0;
                                    const totalCtrLink = totals.rowCount > 0 ? totals.ctrLinkSum / totals.rowCount : 0;
                                    const totalCtrAll = totals.rowCount > 0 ? totals.ctrAllSum / totals.rowCount : 0;

                                    return (
                                       <tfoot className="bg-slate-100/90 backdrop-blur-sm border-t-2 border-slate-200">
                                          <tr>
                                             <td className="py-3 md:py-4 px-3 md:px-4 sticky left-0 bg-slate-100 z-10 border-r border-slate-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                                                <p className="text-xs md:text-sm font-black text-slate-800 uppercase">Total / Rata-rata</p>
                                                <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-slate-500 mt-0.5">Keseluruhan {adsetAnalytics.length} Kampanye</p>
                                             </td>
                                             <td className="py-3 md:py-4 px-3 text-right font-black text-rose-700 text-sm md:text-base">{formatIDR(totals.spend)}</td>
                                             <td className="py-3 md:py-4 px-3 text-center font-black text-blue-700 text-sm md:text-base">{totals.metaHasil.toLocaleString('id-ID')}</td>
                                             <td className="py-3 md:py-4 px-3 text-center font-black text-emerald-700 text-sm md:text-base">{totals.results.toLocaleString('id-ID')}</td>
                                             <td className="py-3 md:py-4 px-3 text-right font-black text-slate-800 text-sm md:text-base">{formatIDR(totalCpr)}</td>
                                             <td className="py-3 md:py-4 px-3 text-right font-black text-amber-700 text-sm md:text-base">{formatIDR(totalCpc)}</td>
                                             <td className="py-3 md:py-4 px-3 text-center font-black text-indigo-700 text-sm md:text-base">{totalCtrLink.toFixed(2)}%</td>
                                             <td className="py-3 md:py-4 px-3 text-center font-black text-indigo-500 text-sm md:text-base">{totalCtrAll.toFixed(2)}%</td>
                                             <td className="py-3 md:py-4 px-3 text-center font-black text-slate-700 text-sm md:text-base">{totals.clicks.toLocaleString('id-ID')}</td>
                                             <td className="py-3 md:py-4 px-3 md:px-4 text-center font-black text-purple-700 text-sm md:text-base">{totals.igVisits.toLocaleString('id-ID')}</td>
                                          </tr>
                                       </tfoot>
                                    );
                                 })()}
                              </table>
                           </div>

                           {/* Grafik Visual Adset */}
                           {adsetAnalytics.length > 0 && (
                               <div className="h-[250px] md:h-[350px] mt-4">
                                  <h4 className="text-[10px] md:text-xs font-black uppercase text-slate-500 mb-4 tracking-widest text-center border-b border-slate-100 pb-2">10 Adset dengan Hasil Lead/Meta Tertinggi</h4>
                                  <ResponsiveContainer width="100%" height="100%">
                                     <BarChart data={adsetAnalytics.sort((a,b)=> (b.results || b.metaHasil) - (a.results || a.metaHasil)).slice(0, 10)} margin={{ left: -20, bottom: 40 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" tick={{fontSize: 9, fontWeight: 'bold'}} interval={0} angle={-45} textAnchor="end" height={60} hide={window.innerWidth < 768} />
                                        <YAxis hide />
                                        <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', fontSize: '11px'}} />
                                        <Bar name="Hasil Leads Masuk" dataKey={(d) => d.results || d.metaHasil} fill="#8b5cf6" radius={[4,4,0,0]} barSize={30} label={{ position: 'top', fill: '#475569', fontSize: 10, fontWeight: 'bold' }}>
                                           {adsetAnalytics.sort((a,b)=> (b.results || b.metaHasil) - (a.results || a.metaHasil)).slice(0, 10).map((entry, index) => (
                                              <Cell key={`cell-${index}`} onClick={() => handleDrillDown('adset', 'Nama Adset', entry.name)} className="hover:opacity-80 transition-opacity cursor-pointer" />
                                           ))}
                                        </Bar>
                                     </BarChart>
                                  </ResponsiveContainer>
                               </div>
                           )}
                        </div>
                        
                        {/* PENAMBAHAN KEMBALI PANEL ANALISA ADSET DI BAGIAN BAWAH */}
                        <div className="w-full">
                           <AnalysisPanel analysisData={getAnalysis(dashboardSubTab)} />
                        </div>
                    </div>
                 )}

                 {/* 3. VIEW: SUMBER & KUALITAS LEADS */}
                 {dashboardSubTab === 'leads_quality' && (
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 animate-in slide-in-from-bottom duration-500">
                      <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm flex flex-col hover:shadow-lg transition-shadow duration-500">
                         <div className="flex flex-col items-center gap-2 mb-8 md:mb-10 text-center">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl mb-2"><PieIcon size={28}/></div>
                            <h3 className="text-lg md:text-xl font-black tracking-tight uppercase text-slate-800 w-full mb-1">Peta Sumber Leads Utama</h3>
                            <p className="text-[10px] md:text-xs font-bold text-slate-400">Klik batang diagram untuk memfilter detailnya.<br/> Total Keseluruhan: <span className="text-indigo-600 font-black">{leadsDataChart.total} Leads</span></p>
                         </div>
                         
                         <div className="h-[250px] md:h-[300px] w-full cursor-pointer" title="Klik pada batang untuk melihat data terfilter">
                            <ResponsiveContainer width="100%" height="100%">
                               <BarChart data={leadsDataChart.chartArray.sort((a,b) => b.value - a.value)} layout="vertical" margin={{ left: 10, right: 30 }}>
                                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                  <XAxis type="number" hide />
                                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 'bold', fill: '#64748b'}} width={80} />
                                  <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', fontSize:'11px'}} />
                                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20} label={{ position: 'right', fill: '#475569', fontSize: 11, fontWeight: 'bold' }}>
                                     {leadsDataChart.chartArray.sort((a,b) => b.value - a.value).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} onClick={() => {
                                            let srcVal = entry.name;
                                            if (srcVal.includes('Iklan')) srcVal = 'Iklan WA'; 
                                            else if (srcVal.includes('Database')) srcVal = 'Existing';
                                            handleDrillDown('leads', 'Asal Leads', srcVal);
                                        }} className="hover:brightness-110 transition-all" />
                                     ))}
                                  </Bar>
                               </BarChart>
                            </ResponsiveContainer>
                         </div>

                         <div className="grid grid-cols-2 gap-3 md:gap-4 w-full mt-auto pt-6 border-t border-slate-100">
                            <div className="bg-blue-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-blue-100 flex items-center justify-between">
                              <div>
                                <p className="text-[9px] md:text-[10px] font-black text-blue-400 uppercase">Iklan Murni</p>
                                <p className="text-lg md:text-xl font-black text-blue-700">{leadsDataChart.iklan_saja}</p>
                              </div>
                              <Target size={20} className="text-blue-300 hidden sm:block" />
                            </div>
                            <div className="bg-rose-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-rose-100 flex items-center justify-between">
                              <div>
                                <p className="text-[9px] md:text-[10px] font-black text-rose-400 uppercase">WA Kosong</p>
                                <p className="text-lg md:text-xl font-black text-rose-700">{leadsDataChart.wa_kosong}</p>
                              </div>
                              <AlertCircle size={20} className="text-rose-300 hidden sm:block" />
                            </div>
                         </div>
                      </div>

                      <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm flex flex-col justify-center hover:shadow-lg transition-shadow duration-500">
                         <h3 className="text-lg md:text-xl font-black tracking-tight uppercase text-slate-800 mb-8 md:mb-10 text-center">Kualitas Jangkauan Wilayah</h3>
                         <div className="space-y-6 md:space-y-8 px-2 md:px-4">
                           <div className="relative">
                             <div className="flex justify-between items-end mb-2 md:mb-3">
                                <div>
                                  <p className="text-xs md:text-sm font-black text-emerald-600">Terjangkau / Dalam Kota</p>
                                  <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ideal Target</p>
                                </div>
                                <div className="text-right">
                                  <span className="text-xl md:text-2xl font-black text-slate-800">{leadsDataChart.terjangkau}</span>
                                  <span className="text-xs md:text-sm font-bold text-slate-400 ml-1">org</span>
                                </div>
                             </div>
                             <div className="w-full bg-slate-100 rounded-full h-4 md:h-5 overflow-hidden shadow-inner">
                                <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full transition-all duration-1000" style={{width: `${leadsDataChart.total > 0 ? (leadsDataChart.terjangkau/leadsDataChart.total)*100 : 0}%`}}></div>
                             </div>
                             <div className="absolute -right-2 -top-4 md:-right-3 md:-top-3 bg-emerald-100 text-emerald-700 text-[10px] md:text-xs font-black px-2 py-1 rounded-lg shadow-sm">{(leadsDataChart.total > 0 ? (leadsDataChart.terjangkau/leadsDataChart.total)*100 : 0).toFixed(1)}%</div>
                           </div>
                           
                           <div className="relative">
                             <div className="flex justify-between items-end mb-2 md:mb-3">
                                <div>
                                  <p className="text-xs md:text-sm font-black text-rose-600">Ditolak / Luar Kota</p>
                                  <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Wasted Leads</p>
                                </div>
                                <div className="text-right">
                                  <span className="text-xl md:text-2xl font-black text-slate-800">{leadsDataChart.luarkota}</span>
                                  <span className="text-xs md:text-sm font-bold text-slate-400 ml-1">org</span>
                                </div>
                             </div>
                             <div className="w-full bg-slate-100 rounded-full h-4 md:h-5 overflow-hidden shadow-inner">
                                <div className="bg-gradient-to-r from-rose-400 to-rose-500 h-full rounded-full transition-all duration-1000" style={{width: `${leadsDataChart.total > 0 ? (leadsDataChart.luarkota/leadsDataChart.total)*100 : 0}%`}}></div>
                             </div>
                             <div className="absolute -right-2 -top-4 md:-right-3 md:-top-3 bg-rose-100 text-rose-700 text-[10px] md:text-xs font-black px-2 py-1 rounded-lg shadow-sm">{(leadsDataChart.total > 0 ? (leadsDataChart.luarkota/leadsDataChart.total)*100 : 0).toFixed(1)}%</div>
                           </div>
                         </div>
                      </div>
                      <AnalysisPanel analysisData={getAnalysis(dashboardSubTab)} />
                   </div>
                 )}

                 {/* NEW VIEW: KUALITAS LEAD (TEMPERATURE) */}
                 {dashboardSubTab === 'lead_temperature' && (
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 animate-in slide-in-from-bottom duration-500">
                      <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm flex flex-col hover:shadow-lg transition-shadow duration-500">
                         <div className="flex flex-col items-center gap-2 mb-8 md:mb-10 text-center">
                           <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl mb-2"><ListFilter size={28}/></div>
                           <h3 className="text-xl md:text-3xl font-black tracking-tight uppercase text-slate-800">Suhu Intensi Prospek</h3>
                           <p className="text-xs md:text-sm font-bold text-slate-400 px-4">Pengelompokan Leads berdasarkan tingkat ketertarikannya (Kualitas Hot/Warm/Cold).</p>
                         </div>
                         
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
                            {qualityStats.map((q, i) => (
                               <div key={i} className={`p-4 md:p-5 rounded-2xl border flex flex-col justify-center items-center text-center shadow-sm cursor-pointer hover:scale-105 transition-transform ${q.name==='Hot' ? 'bg-rose-50 border-rose-100' : q.name==='Warm' ? 'bg-amber-50 border-amber-100' : q.name==='Cold' ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-200'}`} onClick={() => handleDrillDown('leads', 'Kualitas', q.name)}>
                                  <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1 ${q.name==='Hot' ? 'text-rose-500' : q.name==='Warm' ? 'text-amber-500' : q.name==='Cold' ? 'text-blue-500' : 'text-slate-500'}`}>{q.name}</p>
                                  <p className={`text-2xl md:text-3xl font-black ${q.name==='Hot' ? 'text-rose-700' : q.name==='Warm' ? 'text-amber-700' : q.name==='Cold' ? 'text-blue-700' : 'text-slate-700'}`}>{q.value}</p>
                               </div>
                            ))}
                         </div>

                         <div className="h-[250px] md:h-[300px] w-full mt-auto cursor-pointer">
                            <ResponsiveContainer width="100%" height="100%">
                               <BarChart data={qualityStats} margin={{ left: -20 }}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} dy={10} />
                                  <YAxis hide />
                                  <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', fontSize:'11px'}} />
                                  <Bar dataKey="value" radius={[6,6,0,0]} barSize={40} label={{ position: 'top', fill: '#475569', fontSize: 12, fontWeight: 'bold' }}>
                                     {qualityStats.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} onClick={() => handleDrillDown('leads', 'Kualitas', entry.name)} className="hover:brightness-110 transition-all" />
                                     ))}
                                  </Bar>
                               </BarChart>
                            </ResponsiveContainer>
                         </div>
                      </div>
                      <AnalysisPanel analysisData={getAnalysis(dashboardSubTab)} />
                   </div>
                 )}

                 {/* UPDATE VIEW: PERFORMA CLOSING KHUSUS */}
                 {dashboardSubTab === 'closing_performance' && (
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 animate-in slide-in-from-bottom duration-500">
                      <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm flex flex-col hover:shadow-lg transition-shadow duration-500">
                         <div className="flex flex-col sm:flex-row items-center justify-between mb-8 md:mb-10 gap-4">
                            <div className="flex items-center gap-4">
                               <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl hidden sm:block"><CheckSquare size={28}/></div>
                               <div className="text-center sm:text-left">
                                  <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase text-slate-800">Performa Closing & Sales</h3>
                                  <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-1">Detail rincian penjualan dan performa lokasi (Khusus Deal).</p>
                               </div>
                            </div>
                            <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 text-center w-full sm:w-auto">
                               <p className="text-[9px] md:text-[10px] font-black text-emerald-600 uppercase tracking-widest">Total Keseluruhan Omzet</p>
                               <p className="text-xl md:text-2xl font-black text-emerald-800">{formatIDR(closingPerformanceData.total_sales)}</p>
                            </div>
                         </div>
                         
                         {/* Diagram Perbandingan IKLAN vs LAINNYA */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div>
                               <h4 className="text-[10px] md:text-xs font-black uppercase text-slate-500 mb-4 tracking-widest border-b border-slate-100 pb-2">Volume Iklan Meta vs Organik/Database</h4>
                               <div className="h-[250px] w-full">
                                  <ResponsiveContainer width="100%" height="100%">
                                     <ComposedChart data={closingPerformanceData.chartArray} margin={{ top: 20, right: 0, bottom: 0, left: -20 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 'bold', fill: '#64748b'}} dy={10} />
                                        <YAxis yAxisId="left" hide />
                                        <YAxis yAxisId="right" orientation="right" hide />
                                        <RechartsTooltip cursor={{fill: '#f8fafc'}} content={(props) => <CustomTooltip {...props} />} />
                                        <Legend wrapperStyle={{paddingTop: '10px', fontSize: '10px', fontWeight: 'bold'}} />
                                        <Bar yAxisId="left" name="Total Leads" dataKey="leads" fill="#cbd5e1" radius={[4,4,0,0]} barSize={20} />
                                        <Bar yAxisId="left" name="Closing" dataKey="closing" fill="#10b981" radius={[4,4,0,0]} barSize={20} />
                                        <Line yAxisId="right" name="CR (%)" type="monotone" dataKey="cr" stroke="#f59e0b" strokeWidth={3} dot={{r: 4, fill: '#fff', strokeWidth: 2}} activeDot={{r: 6}} />
                                     </ComposedChart>
                                  </ResponsiveContainer>
                               </div>
                            </div>

                            {/* UPDATE: Area Diagram untuk Kualitas Lokasi (Khusus yg Closing) */}
                            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-inner flex flex-col">
                               <h4 className="text-[10px] md:text-xs font-black uppercase text-slate-500 mb-4 tracking-widest text-center">Top 6 Area Customer Deal</h4>
                               <div className="flex-1 min-h-[200px] w-full cursor-pointer">
                                  <ResponsiveContainer width="100%" height="100%">
                                     <BarChart data={closingPerformanceData.topLocations} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 8, fontWeight: 'bold', fill: '#64748b'}} dy={5} />
                                        <YAxis hide />
                                        <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', fontSize: '10px'}} />
                                        <Bar name="Total Closing" dataKey="closing" fill="#6366f1" radius={[4,4,0,0]} barSize={24} label={{ position: 'top', fill: '#4f46e5', fontSize: 10, fontWeight: 'bold' }}>
                                           {closingPerformanceData.topLocations.map((entry, index) => (
                                              <Cell key={`cell-${index}`} onClick={() => handleDrillDown('leads', 'Lokasi', entry.name)} className="hover:opacity-80 transition-opacity" />
                                           ))}
                                        </Bar>
                                     </BarChart>
                                  </ResponsiveContainer>
                               </div>
                            </div>
                         </div>

                         {/* UPDATE: Tabel Detail Rincian Sumber Lead Pembentuk Sales */}
                         <div className="mt-auto overflow-hidden rounded-2xl border border-slate-200">
                             <div className="bg-slate-800 text-white text-[10px] md:text-xs font-black uppercase tracking-widest p-3 md:p-4 flex items-center justify-between">
                                <span>Rincian Pembentuk Omzet</span>
                                <span className="bg-white/20 px-2 py-1 rounded">Klik baris untuk memfilter</span>
                             </div>
                             <div className="overflow-x-auto custom-scrollbar">
                                <table className="w-full text-left bg-white text-[10px] md:text-xs whitespace-nowrap">
                                   <thead>
                                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-black uppercase">
                                         <th className="p-3 md:p-4">Sumber / Channel Asal</th>
                                         <th className="p-3 text-center border-l border-slate-100">Leads Masuk</th>
                                         <th className="p-3 text-center border-l border-slate-100">Berhasil Deal</th>
                                         <th className="p-3 text-center border-l border-slate-100">Closing Rate</th>
                                         <th className="p-3 md:p-4 text-right border-l border-slate-100">Nominal Penjualan</th>
                                      </tr>
                                   </thead>
                                   <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                                      {closingPerformanceData.detailsArray.map((src, i) => (
                                         <tr key={i} onClick={() => {
                                             let fVal = src.name;
                                             if (src.idKey === 'iklan_saja') fVal = 'Iklan WA';
                                             if (src.idKey === 'ig_wa_dm') fVal = 'IG WA';
                                             if (src.idKey === 'existing') fVal = 'Existing';
                                             handleDrillDown('leads', 'Asal Leads', fVal);
                                         }} className="hover:bg-indigo-50/50 transition-colors cursor-pointer group">
                                            <td className="p-3 md:p-4 text-slate-800 group-hover:text-indigo-700 flex items-center gap-2">
                                               {src.idKey === 'wa_kosong' ? <AlertCircle size={14} className="text-rose-400"/> : <Target size={14} className="text-indigo-400 opacity-50"/>}
                                               {src.name}
                                            </td>
                                            <td className="p-3 text-center border-l border-slate-50">{src.leads}</td>
                                            <td className={`p-3 text-center border-l border-slate-50 ${src.closing > 0 ? 'text-emerald-600 font-black' : ''}`}>{src.closing}</td>
                                            <td className="p-3 text-center border-l border-slate-50">
                                               <span className={`px-2 py-1 rounded-lg ${src.cr >= 15 ? 'bg-emerald-50 text-emerald-700' : src.cr > 0 ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-400'}`}>{src.cr}%</span>
                                            </td>
                                            <td className={`p-3 md:p-4 text-right border-l border-slate-50 ${src.sales > 0 ? 'text-emerald-700 font-black text-sm' : ''}`}>{formatIDR(src.sales)}</td>
                                         </tr>
                                      ))}
                                   </tbody>
                                   <tfoot className="bg-slate-50 border-t-2 border-slate-200 font-black text-slate-800 text-xs md:text-sm">
                                      <tr>
                                         <td className="p-3 md:p-4 uppercase">Total Keseluruhan</td>
                                         <td className="p-3 text-center border-l border-slate-200">{closingPerformanceData.total_leads}</td>
                                         <td className="p-3 text-center border-l border-slate-200 text-emerald-600">{closingPerformanceData.total_closing}</td>
                                         <td className="p-3 text-center border-l border-slate-200 text-indigo-600">
                                            {(closingPerformanceData.total_leads > 0 ? (closingPerformanceData.total_closing/closingPerformanceData.total_leads)*100 : 0).toFixed(1)}%
                                         </td>
                                         <td className="p-3 md:p-4 text-right border-l border-slate-200 text-emerald-700">{formatIDR(closingPerformanceData.total_sales)}</td>
                                      </tr>
                                   </tfoot>
                                </table>
                             </div>
                         </div>

                      </div>
                      <AnalysisPanel analysisData={getAnalysis(dashboardSubTab)} />
                   </div>
                 )}

                 {/* UPDATE VIEW: FUNNEL */}
                 {dashboardSubTab === 'funnel' && (
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 animate-in slide-in-from-bottom duration-500">
                      <div className="lg:col-span-2 bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-500">
                         <div className="text-center mb-10 md:mb-12">
                            <h3 className="text-2xl md:text-3xl font-black tracking-tight uppercase text-slate-800">Conversion Funnel Meta (Click-to-WA)</h3>
                            <p className="text-[10px] md:text-sm font-bold text-slate-400 mt-2 px-4">Deteksi titik kebocoran audiens dari impresi Meta hingga kontak masuk WA dan Closing.</p>
                         </div>
                         <div className="space-y-4 md:space-y-5 max-w-2xl mx-auto relative px-2 md:px-4">
                            
                            {/* Tahap 1 */}
                            <div className="relative z-10 bg-slate-50 border border-slate-200 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between shadow-sm hover:shadow-md transition-shadow gap-4 text-center sm:text-left">
                               <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-5">
                                  <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner"><Eye className="w-6 h-6 md:w-8 md:h-8"/></div>
                                  <div>
                                     <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tahap 1: Awareness</p>
                                     <p className="text-lg md:text-2xl font-black text-slate-800">Impresi Iklan Meta</p>
                                  </div>
                               </div>
                               <p className="text-3xl md:text-4xl font-black text-indigo-600">{stats.impresi.toLocaleString('id-ID')}</p>
                            </div>
                            
                            <div className="flex flex-col items-center -my-2 md:-my-3 relative z-0">
                               <div className="h-8 md:h-10 border-l-4 border-dashed border-indigo-200"></div>
                               <div className="bg-white border-2 border-rose-100 text-[9px] md:text-[11px] font-black px-3 md:px-5 py-1.5 md:py-2 rounded-full shadow-lg z-10 relative flex items-center gap-2 md:gap-3 transform hover:scale-105 transition-transform cursor-default whitespace-nowrap">
                                  <ArrowDown size={14} className="text-rose-500 animate-bounce md:w-[18px] md:h-[18px]" /> 
                                  <span className="text-slate-600">Abaikan Iklan: {100 - ((stats.clicksSemua / (stats.impresi || 1)) * 100).toFixed(2)}%</span>
                                  <span className="text-indigo-700 bg-indigo-50 px-2 md:px-3 py-1 rounded-lg">CTR (Semua) {((stats.clicksSemua / (stats.impresi || 1)) * 100).toFixed(2)}%</span>
                               </div>
                               <div className="h-8 md:h-10 border-l-4 border-dashed border-indigo-200"></div>
                            </div>
                            
                            {/* Tahap 2 UPDATE (Dari Klik Tautan Semua) */}
                            <div className="relative z-10 bg-slate-50 border border-slate-200 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between shadow-sm w-[96%] md:w-[92%] mx-auto hover:shadow-md transition-shadow gap-4 text-center sm:text-left">
                               <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-5">
                                  <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner"><MousePointerClick className="w-5 h-5 md:w-7 md:h-7"/></div>
                                  <div>
                                     <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tahap 2: Interest</p>
                                     <p className="text-base md:text-xl font-black text-slate-800">Klik Tautan <span className="text-[9px] text-blue-500 font-bold hidden md:inline">(Semua Klik)</span></p>
                                  </div>
                               </div>
                               <p className="text-2xl md:text-3xl font-black text-blue-600">{stats.clicksSemua.toLocaleString('id-ID')}</p>
                            </div>

                            {/* Logic Leads Iklan */}
                            {(() => {
                               const leadsTertarget = roasReportData.iklan_saja.total.leads + roasReportData.ig_wa_dm.total.leads;
                               const closingTertarget = roasReportData.iklan_saja.total.closing + roasReportData.ig_wa_dm.total.closing;

                               return (
                                 <>
                                    <div className="flex flex-col items-center -my-2 md:-my-3 relative z-0">
                                       <div className="h-8 md:h-10 border-l-4 border-dashed border-blue-200"></div>
                                       <div className="bg-white border-2 border-rose-100 text-[9px] md:text-[11px] font-black px-3 md:px-5 py-1.5 md:py-2 rounded-full shadow-lg z-10 relative flex items-center gap-2 md:gap-3 transform hover:scale-105 transition-transform cursor-default whitespace-nowrap">
                                          <ArrowDown size={14} className="text-rose-500 animate-bounce md:w-[18px] md:h-[18px]" /> 
                                          <span className="text-slate-600">Dropoff Chat: {100 - ((leadsTertarget / (stats.clicksSemua || 1)) * 100).toFixed(2)}%</span>
                                          <span className="text-blue-700 bg-blue-50 px-2 md:px-3 py-1 rounded-lg">CVR Chat {((leadsTertarget / (stats.clicksSemua || 1)) * 100).toFixed(2)}%</span>
                                       </div>
                                       <div className="h-8 md:h-10 border-l-4 border-dashed border-blue-200"></div>
                                    </div>
                                    
                                    {/* Tahap 3 UPDATE (Hanya Iklan WA, IG WA, DM) */}
                                    <div className="relative z-10 bg-slate-50 border border-slate-200 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between shadow-sm w-[90%] md:w-[84%] mx-auto hover:shadow-md transition-shadow gap-4 text-center sm:text-left">
                                       <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-5">
                                          <div className="w-10 h-10 md:w-14 md:h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner"><MessageCircle className="w-5 h-5 md:w-7 md:h-7"/></div>
                                          <div>
                                             <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tahap 3: Consideration</p>
                                             <p className="text-base md:text-xl font-black text-slate-800 flex flex-col md:flex-row md:items-center gap-1 md:gap-2">Chat Masuk <span className="text-[8px] md:text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-lg w-max mx-auto md:mx-0">Iklan & IG Saja</span></p>
                                          </div>
                                       </div>
                                       <p className="text-2xl md:text-3xl font-black text-amber-600">{leadsTertarget.toLocaleString('id-ID')}</p>
                                    </div>

                                    <div className="flex flex-col items-center -my-2 md:-my-3 relative z-0">
                                       <div className="h-8 md:h-10 border-l-4 border-dashed border-amber-200"></div>
                                       <div className="bg-white border-2 border-amber-100 text-[9px] md:text-[11px] font-black px-3 md:px-5 py-1.5 md:py-2 rounded-full shadow-lg z-10 relative flex items-center gap-2 md:gap-3 transform hover:scale-105 transition-transform cursor-default whitespace-nowrap">
                                          <ArrowDown size={14} className="text-rose-500 animate-bounce md:w-[18px] md:h-[18px]" /> 
                                          <span className="text-slate-600">Batal / Gagal Deal: {100 - ((closingTertarget / (leadsTertarget || 1)) * 100).toFixed(2)}%</span>
                                          <span className="text-amber-700 bg-amber-50 px-2 md:px-3 py-1 rounded-lg">Final CR {((closingTertarget / (leadsTertarget || 1)) * 100).toFixed(2)}%</span>
                                       </div>
                                       <div className="h-8 md:h-10 border-l-4 border-dashed border-amber-200"></div>
                                    </div>
                                    
                                    {/* Tahap 4 UPDATE (Hanya dari Iklan) */}
                                    <div className="relative z-10 bg-gradient-to-r from-emerald-400 to-emerald-600 border-none rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-8 flex flex-col sm:flex-row items-center justify-between shadow-2xl shadow-emerald-200 w-[80%] md:w-[75%] mx-auto text-white transform hover:scale-[1.02] transition-transform gap-4 text-center sm:text-left">
                                       <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-5">
                                          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner border border-white/30"><CheckSquare className="w-6 h-6 md:w-8 md:h-8"/></div>
                                          <div>
                                             <p className="text-[9px] md:text-xs font-black text-emerald-100 uppercase tracking-widest mb-1">Tahap 4: Konversi Final</p>
                                             <p className="text-xl md:text-2xl font-black">Deal & Closing</p>
                                          </div>
                                       </div>
                                       <p className="text-3xl md:text-4xl font-black drop-shadow-md">{closingTertarget.toLocaleString('id-ID')}</p>
                                    </div>
                                 </>
                               )
                            })()}
                         </div>
                      </div>
                      <AnalysisPanel analysisData={getAnalysis(dashboardSubTab)} />
                   </div>
                 )}

                 {/* 5. VIEW: KEKUATAN LAYANAN */}
                 {dashboardSubTab === 'categories' && (
                   <>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5 animate-in slide-in-from-bottom duration-500">
                        {categoryAnalytics.map(c => {
                          const adsData = roasReportData.iklan_saja[c.id];
                          const allData = roasReportData.keseluruhan[c.id];
                          const crAds = adsData.leads > 0 ? ((adsData.closing / adsData.leads)*100).toFixed(1) : 0;
                          const crAll = allData.leads > 0 ? ((allData.closing / allData.leads)*100).toFixed(1) : 0;
                          const roasAds = adsData.budget > 0 ? (adsData.sales / adsData.budget).toFixed(2) : 0;
                          const roasAll = allData.budget > 0 ? (allData.sales / allData.budget).toFixed(2) : 0;

                          return (
                          <div key={c.id} className="bg-white p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group relative overflow-hidden">
                             <div className="flex items-center justify-between mb-3 md:mb-4 border-b border-slate-100 pb-2 md:pb-3">
                                <h3 className="font-black text-base md:text-lg text-slate-800">{c.name}</h3>
                             </div>
                             
                             <div className="grid grid-cols-2 gap-2 mb-3">
                                <div>
                                   <p className="text-[8px] md:text-[9px] font-black text-blue-500 uppercase mb-1 tracking-widest">Iklan WA</p>
                                   <div className="space-y-1 md:space-y-2">
                                      <p className="text-[9px] md:text-[10px] font-bold text-slate-500 flex justify-between">Sales: <span className="text-blue-700">{formatIDR(adsData.sales)}</span></p>
                                      <p className="text-[9px] md:text-[10px] font-bold text-slate-500 flex justify-between">Lead: <span className="text-slate-800">{adsData.leads}</span></p>
                                      <p className="text-[9px] md:text-[10px] font-bold text-slate-500 flex justify-between">Deal: <span className="text-emerald-600">{adsData.closing}</span></p>
                                      <p className="text-[9px] md:text-[10px] font-bold text-slate-500 flex justify-between">CR: <span className="text-indigo-600">{crAds}%</span></p>
                                   </div>
                                </div>
                                <div className="border-l border-slate-100 pl-2">
                                   <p className="text-[8px] md:text-[9px] font-black text-emerald-500 uppercase mb-1 tracking-widest">Keseluruhan</p>
                                   <div className="space-y-1 md:space-y-2">
                                      <p className="text-[9px] md:text-[10px] font-bold text-slate-500 flex justify-between">Sales: <span className="text-emerald-700">{formatIDR(allData.sales)}</span></p>
                                      <p className="text-[9px] md:text-[10px] font-bold text-slate-500 flex justify-between">Lead: <span className="text-slate-800">{allData.leads}</span></p>
                                      <p className="text-[9px] md:text-[10px] font-bold text-slate-500 flex justify-between">Deal: <span className="text-emerald-600">{allData.closing}</span></p>
                                      <p className="text-[9px] md:text-[10px] font-bold text-slate-500 flex justify-between">CR: <span className="text-indigo-600">{crAll}%</span></p>
                                   </div>
                                </div>
                             </div>

                             <div className="mt-auto bg-slate-50 p-2 md:p-2.5 rounded-xl border border-slate-200">
                                <div className="flex justify-between text-[10px] md:text-xs mb-1">
                                   <span className="font-black text-slate-500">Ad Spend</span>
                                   <span className="font-black text-rose-600">{formatIDR(allData.budget)}</span>
                                </div>
                                <div className="flex justify-between text-[10px] md:text-xs">
                                   <span className="font-black text-slate-500">ROAS (Iklan / All)</span>
                                   <span className="font-black text-indigo-600">{roasAds}x / {roasAll}x</span>
                                </div>
                             </div>
                          </div>
                        )})}
                     </div>
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-500">
                           <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase mb-6 md:mb-8 text-slate-800 text-center sm:text-left">Komparasi Layanan (Sales Total vs Spend)</h3>
                           <div className="h-[350px] md:h-[450px]">
                              <ResponsiveContainer width="100%" height="100%">
                                 <BarChart data={categoryAnalytics} layout="vertical" margin={{ left: 20, right: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 'bold', fill: '#64748b'}} width={80} />
                                    <RechartsTooltip content={(props) => <CustomTooltip {...props} currency={true} />} cursor={{fill: '#f8fafc'}} />
                                    <Legend wrapperStyle={{paddingTop: '20px', fontWeight: 'bold', fontSize: '10px'}} />
                                    <Bar name="Omzet Total (All Sales)" dataKey="sales" fill="#10b981" radius={[0, 6, 6, 0]} barSize={14} />
                                    <Bar name="Biaya Iklan" dataKey="spend" fill="#f43f5e" radius={[0, 6, 6, 0]} barSize={14} />
                                 </BarChart>
                              </ResponsiveContainer>
                           </div>
                        </div>
                        <AnalysisPanel analysisData={getAnalysis(dashboardSubTab)} />
                     </div>
                   </>
                 )}

                 {/* UPDATE VIEW: FINANSIAL & EFISIENSI */}
                 {dashboardSubTab === 'finance' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 animate-in slide-in-from-bottom duration-500">
                        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-500">
                           <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase text-slate-800 mb-6 md:mb-8 text-center sm:text-left">Efisiensi Akuisisi Finansial (Iklan vs Keseluruhan)</h3>
                           
                           {/* Perbandingan CPL & CPA Khusus Iklan vs Keseluruhan */}
                           {(() => {
                              const leadsIklan = roasReportData.iklan_saja.total.leads;
                              const closingIklan = roasReportData.iklan_saja.total.closing;
                              const spendAll = roasReportData.keseluruhan.total.budget; // Ad Spend selalu diserap dari Iklan
                              
                              const cplIklan = leadsIklan > 0 ? spendAll / leadsIklan : spendAll;
                              const cpaIklan = closingIklan > 0 ? spendAll / closingIklan : spendAll;
                              
                              const cplAll = stats.validLeads > 0 ? spendAll / stats.validLeads : spendAll;
                              const cpaAll = roasReportData.keseluruhan.total.closing > 0 ? spendAll / roasReportData.keseluruhan.total.closing : spendAll;

                              return (
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
                                    <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-purple-100 shadow-inner">
                                       <h4 className="text-xs md:text-sm font-black text-purple-700 uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-2"><Users size={16}/> Rata-rata CPL (Cost/Lead)</h4>
                                       <div className="space-y-3 md:space-y-4">
                                          <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm border border-purple-50">
                                             <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Khusus Iklan Saja</p>
                                             <p className="text-xl md:text-2xl font-black text-purple-800">{formatIDR(cplIklan)}</p>
                                          </div>
                                          <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm border border-purple-50">
                                             <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Keseluruhan Sumber</p>
                                             <p className="text-xl md:text-2xl font-black text-slate-800">{formatIDR(cplAll)}</p>
                                          </div>
                                       </div>
                                    </div>
                                    
                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-amber-100 shadow-inner">
                                       <h4 className="text-xs md:text-sm font-black text-amber-700 uppercase tracking-widest mb-4 md:mb-6 flex items-center gap-2"><CheckSquare size={16}/> Rata-rata CPA (Cost/Deal)</h4>
                                       <div className="space-y-3 md:space-y-4">
                                          <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm border border-amber-50">
                                             <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Khusus Iklan Saja</p>
                                             <p className="text-xl md:text-2xl font-black text-amber-800">{formatIDR(cpaIklan)}</p>
                                          </div>
                                          <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm border border-amber-50">
                                             <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Keseluruhan Sumber</p>
                                             <p className="text-xl md:text-2xl font-black text-slate-800">{formatIDR(cpaAll)}</p>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              )
                           })()}

                           <h4 className="text-[10px] md:text-sm font-black uppercase text-slate-400 tracking-widest mb-4 md:mb-6 text-center sm:text-left">Distribusi Cost Per Layanan (Total Keseluruhan)</h4>
                           <div className="h-[250px] md:h-[300px]">
                              <ResponsiveContainer width="100%" height="100%">
                                 <BarChart data={categoryAnalytics} margin={{left: -20}}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 'bold'}} dy={10} />
                                    <YAxis hide />
                                    <RechartsTooltip cursor={{fill: '#f8fafc'}} content={(props) => <CustomTooltip {...props} currency={true} />} />
                                    <Bar name="CPA Keseluruhan (Cost / Closing)" dataKey={(d) => d.closing > 0 ? d.spend/d.closing : 0} fill="#f59e0b" radius={[4,4,0,0]} barSize={25} />
                                    <Bar name="CPL Keseluruhan (Cost / Lead)" dataKey={(d) => d.leads > 0 ? d.spend/d.leads : 0} fill="#a855f7" radius={[4,4,0,0]} barSize={25} />
                                 </BarChart>
                              </ResponsiveContainer>
                           </div>
                        </div>
                        <AnalysisPanel analysisData={getAnalysis(dashboardSubTab)} />
                    </div>
                 )}

                 {/* 7. VIEW: KINERJA TIM CS */}
                 {dashboardSubTab === 'cs_performance' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 animate-in slide-in-from-bottom duration-500">
                        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-500">
                           <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 md:mb-8 text-center sm:text-left">
                             <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl"><Headset size={24} className="md:w-7 md:h-7"/></div>
                             <div>
                               <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase text-slate-800">Papan Peringkat CS</h3>
                               <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-1">Klik pada nama admin untuk menyaring database leads.</p>
                             </div>
                           </div>
                           
                           <div className="overflow-x-auto custom-scrollbar bg-slate-50/50 rounded-2xl md:rounded-3xl border border-slate-100 p-1 md:p-2">
                              <table className="w-full text-left border-collapse min-w-[500px]">
                                 <thead>
                                    <tr className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest border-b-2 border-slate-200">
                                       <th className="py-3 md:py-4 px-3 md:px-4">Rank & Nama Admin</th>
                                       <th className="py-3 md:py-4 px-2 text-center">Beban Leads</th>
                                       <th className="py-3 md:py-4 px-2 text-center">Total Deal</th>
                                       <th className="py-3 md:py-4 px-2 text-center">Win Rate (CR)</th>
                                       <th className="py-3 md:py-4 px-3 md:px-4 text-right">Omzet Dihasilkan</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {csStats.map((cs, i) => (
                                       <tr key={i} className="border-b border-slate-100 hover:bg-indigo-50/50 transition-colors cursor-pointer group" onClick={() => handleDrillDown('leads', 'Admin', cs.name)} title="Klik untuk memfilter data admin">
                                          <td className="py-3 md:py-4 px-3 md:px-4 flex items-center gap-3 md:gap-4">
                                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-black ${i === 0 ? 'bg-gradient-to-br from-amber-200 to-yellow-400 text-amber-900 shadow-lg shadow-amber-200/50 border border-amber-100' : i === 1 ? 'bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 shadow-lg shadow-slate-200/50 border border-slate-100' : i === 2 ? 'bg-gradient-to-br from-orange-200 to-orange-300 text-orange-800 shadow-lg shadow-orange-200/50 border border-orange-100' : 'bg-indigo-50 text-indigo-600'}`}>
                                              #{i+1}
                                            </div> 
                                            <div>
                                              <p className="text-xs md:text-sm font-black text-slate-800 group-hover:text-indigo-700 transition-colors">{cs.name}</p>
                                              <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-slate-400 mt-0.5">Sales Agent</p>
                                            </div>
                                          </td>
                                          <td className="py-3 md:py-4 px-2 text-center font-bold text-slate-600 text-sm md:text-lg">{cs.leads}</td>
                                          <td className="py-3 md:py-4 px-2 text-center font-black text-emerald-600 text-base md:text-xl">{cs.closing}</td>
                                          <td className="py-3 md:py-4 px-2 text-center font-bold text-indigo-600 text-sm md:text-lg">
                                             <div className="bg-indigo-50 px-2 md:px-3 py-1 rounded-xl inline-block border border-indigo-100">{cs.cr}%</div>
                                          </td>
                                          <td className="py-3 md:py-4 px-3 md:px-4 text-right font-black text-sm md:text-lg text-slate-800">{formatIDR(cs.sales)}</td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                        <AnalysisPanel analysisData={getAnalysis(dashboardSubTab)} />
                    </div>
                 )}

                 {/* 8. VIEW: TREN JAM SIBUK */}
                 {dashboardSubTab === 'time_analysis' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 animate-in slide-in-from-bottom duration-500">
                        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-500">
                           <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 md:mb-10 text-center sm:text-left">
                             <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl"><Clock size={24} className="md:w-7 md:h-7"/></div>
                             <div>
                               <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase text-slate-800">Distribusi Jam Masuk Chat</h3>
                               <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-1">Analisa waktu tersibuk audiens menghubungi WhatsApp CS Anda.</p>
                             </div>
                           </div>
                           <div className="h-[250px] md:h-[400px] cursor-pointer">
                              <ResponsiveContainer width="100%" height="100%">
                                 <AreaChart data={timeStats}>
                                    <defs>
                                      <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5}/>
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                      </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" tick={{fontSize: 9, fontWeight: 'bold', fill: '#64748b'}} axisLine={false} tickLine={false} dy={10} minTickGap={15} />
                                    <YAxis hide />
                                    <RechartsTooltip cursor={{stroke: '#e2e8f0', strokeWidth: 2}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', fontSize: '11px'}} />
                                    <Area type="monotone" dataKey="leads" name="Volume Chat Baru" stroke="#8b5cf6" fill="url(#colorTime)" strokeWidth={4} activeDot={{r: 6, strokeWidth: 0}} />
                                 </AreaChart>
                              </ResponsiveContainer>
                           </div>
                        </div>
                        <AnalysisPanel analysisData={getAnalysis(dashboardSubTab)} />
                    </div>
                 )}

                 {/* 9. VIEW: DEMOGRAFI LOKASI */}
                 {dashboardSubTab === 'geo_analysis' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 animate-in slide-in-from-bottom duration-500">
                        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-500">
                           <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 md:mb-10 text-center sm:text-left">
                             <div className="p-3 bg-teal-100 text-teal-600 rounded-2xl"><MapPin size={24} className="md:w-7 md:h-7"/></div>
                             <div>
                               <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase text-slate-800">Top 10 Lokasi Leads</h3>
                               <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-1">Pemetaan domisili calon pelanggan terbanyak (berdasar isian CS).</p>
                             </div>
                           </div>
                           <div className="h-[300px] md:h-[450px] cursor-pointer">
                              <ResponsiveContainer width="100%" height="100%">
                                 <BarChart data={geoStats} layout="vertical" margin={{ left: 30, right: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 'black', fill: '#475569'}} width={70} />
                                    <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', fontSize: '11px'}} />
                                    <Bar name="Total Menghubungi" dataKey="leads" fill="#0ea5e9" radius={[0, 6, 6, 0]} barSize={20}>
                                       {geoStats.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={index < 3 ? '#0ea5e9' : '#bae6fd'} onClick={() => handleDrillDown('leads', 'Lokasi', entry.name)} className="hover:brightness-90 transition-all" />
                                       ))}
                                    </Bar>
                                 </BarChart>
                              </ResponsiveContainer>
                           </div>
                        </div>
                        <AnalysisPanel analysisData={getAnalysis(dashboardSubTab)} />
                    </div>
                 )}

                 {/* 10. VIEW: STATUS FOLLOW UP */}
                 {dashboardSubTab === 'follow_up' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 animate-in slide-in-from-bottom duration-500">
                        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm flex flex-col items-center hover:shadow-lg transition-shadow duration-500">
                           <div className="flex flex-col items-center gap-2 mb-8 md:mb-10 text-center">
                             <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl mb-2"><PhoneCall size={28}/></div>
                             <h3 className="text-xl md:text-3xl font-black tracking-tight uppercase text-slate-800">Status Retensi & Follow Up</h3>
                             <p className="text-[10px] md:text-sm font-bold text-slate-400 px-4">Klik potongan diagram untuk melihat data spesifik.</p>
                           </div>
                           <div className="h-[250px] md:h-[400px] w-full cursor-pointer">
                              <ResponsiveContainer width="100%" height="100%">
                                 <PieChart>
                                    <Pie data={fuStats.filter(f => f.value > 0)} innerRadius={window.innerWidth < 768 ? 60 : 100} outerRadius={window.innerWidth < 768 ? 100 : 160} paddingAngle={5} dataKey="value" stroke="none" cornerRadius={10}>
                                        {fuStats.filter(f => f.value > 0).map((entry, i) => <Cell key={i} fill={['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6'][i%5]} onClick={() => handleDrillDown('leads', 'Status Follow Up', entry.name)} className="hover:opacity-80 transition-opacity" />)}
                                     </Pie>
                                     <RechartsTooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 'bold', fontSize:'11px'}} />
                                     <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{paddingTop: '20px', fontWeight: 'black', fontSize: '10px', color: '#475569'}} />
                                 </PieChart>
                              </ResponsiveContainer>
                           </div>
                        </div>
                        <AnalysisPanel analysisData={getAnalysis(dashboardSubTab)} />
                    </div>
                 )}

              </div>
            </div>
          )}

          {/* --- TAB: HISTORY LOG --- */}
          {activeTab === 'history' && (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
               <div className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="bg-indigo-100 text-indigo-600 p-3 rounded-2xl"><List size={24}/></div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">Log Aktivitas Tim</h2>
                    <p className="text-xs font-bold text-slate-400">Riwayat perubahan data, filter, impor, hapus, dan aksi undo/redo yang terjadi di sistem.</p>
                  </div>
               </div>
               
               <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
                  <div className="overflow-auto max-h-[70vh] custom-scrollbar">
                     <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
                           <tr className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">
                              <th className="p-4 md:p-5 whitespace-nowrap w-40">Waktu Eksekusi</th>
                              <th className="p-4 md:p-5">Deskripsi Aktivitas</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                           {logsData.length === 0 ? (
                              <tr><td colSpan={2} className="py-20 text-center font-bold text-slate-400">Belum ada riwayat aktivitas.</td></tr>
                           ) : logsData.sort((a,b) => b.timestamp - a.timestamp).slice(0, 100).map((log, i) => (
                              <tr key={i} className="hover:bg-slate-50 transition-colors">
                                 <td className="p-4 md:p-5 text-[10px] md:text-xs font-bold text-slate-500 whitespace-nowrap">{log.dateStr}</td>
                                 <td className="p-4 md:p-5 text-xs md:text-sm font-bold text-slate-800">
                                    {String(log.desc).includes('UNDO') ? <span className="text-amber-500 font-black mr-2">[{String(log.desc)}]</span> :
                                     String(log.desc).includes('REDO') ? <span className="text-blue-500 font-black mr-2">[{String(log.desc)}]</span> :
                                     String(log.desc).includes('Hapus') ? <span className="text-rose-500">{String(log.desc)}</span> :
                                     String(log.desc).includes('Filter') || String(log.desc).includes('Custom') ? <span className="text-indigo-500">{String(log.desc)}</span> :
                                     String(log.desc)}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
          )}

          {/* --- TAB: KONFIGURASI & RUMUS --- */}
          {activeTab === 'tools' && (
            <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
               <div className="flex items-center gap-4 bg-white p-5 md:p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0"><Settings size={24} className="md:w-7 md:h-7"/></div>
                  <div>
                    <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight text-slate-800">Konfigurasi & Rumus</h2>
                    <p className="text-[10px] md:text-sm font-bold text-slate-400">Atur target KPI dan formula kalkulasi otomatis tabel.</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {/* KPI Settings */}
                  <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-slate-800 flex items-center gap-2"><Target className="text-indigo-500" size={18}/> Target KPI</h3>
                        <button onClick={saveKpiEdits} className="text-[9px] md:text-[10px] bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg font-black hover:bg-emerald-100 transition-colors border border-emerald-200 shadow-sm">Simpan</button>
                     </div>

                     <div className="flex-1 overflow-y-auto mb-6 space-y-3 custom-scrollbar pr-2 max-h-[350px]">
                        {kpiTargets.map(kpi => (
                           <div key={kpi.id} className="flex items-center gap-2 md:gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 group">
                              <div className="flex-1">
                                 <input type="text" value={kpi.name} onChange={(e) => handleKpiChange(kpi.id, 'name', e.target.value)} onBlur={saveKpiEdits} className="bg-transparent font-black text-[10px] md:text-xs text-slate-700 outline-none w-full mb-1 border-b border-transparent focus:border-indigo-300 transition-colors" />
                                 <div className="flex items-center gap-2">
                                     <input type="number" step="0.01" value={kpi.value} onChange={(e) => handleKpiChange(kpi.id, 'value', e.target.value)} onBlur={saveKpiEdits} className="bg-white border border-slate-200 px-2 py-1.5 rounded-lg font-bold text-[10px] md:text-xs outline-none w-20 md:w-28 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all shadow-sm" />
                                     <input type="text" value={kpi.unit} onChange={(e) => handleKpiChange(kpi.id, 'unit', e.target.value)} onBlur={saveKpiEdits} className="bg-transparent font-black text-[9px] md:text-[10px] text-slate-400 outline-none w-8 md:w-10 uppercase border-b border-transparent focus:border-indigo-300 transition-colors" />
                                 </div>
                              </div>
                              <button onClick={() => removeKpi(kpi.id)} className="text-slate-300 hover:text-rose-500 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all p-2 bg-white rounded-lg border border-slate-200 shadow-sm"><Trash2 size={14}/></button>
                           </div>
                        ))}
                     </div>
                     
                     <div className="bg-indigo-50 p-4 md:p-5 rounded-2xl border border-indigo-100 mt-auto">
                        <h4 className="text-[9px] md:text-[10px] font-black uppercase text-indigo-800 mb-3">Tambah Target Baru</h4>
                        <select 
                           value={newKpi.name} 
                           onChange={e => setNewKpi({...newKpi, name: e.target.value})} 
                           className="w-full bg-white border border-indigo-200 p-2 md:p-3 rounded-xl font-bold text-[10px] md:text-xs outline-none mb-2 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm text-slate-700 cursor-pointer"
                        >
                           <option value="" disabled>-- Pilih Kolom sebagai Target --</option>
                           {GROUPED_HEADERS.map((group, idx) => (
                              <optgroup key={idx} label={group.label}>
                                 {group.options.map(h => <option key={`${group.label}-${h}`} value={h}>{h}</option>)}
                              </optgroup>
                           ))}
                        </select>
                        <div className="flex gap-2 mb-4">
                           <input type="number" placeholder="Nilai" value={newKpi.value} onChange={e => setNewKpi({...newKpi, value: e.target.value})} className="flex-1 bg-white border border-indigo-200 p-2 md:p-3 rounded-xl font-bold text-[10px] md:text-xs outline-none focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm placeholder-slate-300" />
                           <input type="text" placeholder="Satuan (Rp, x, %)" value={newKpi.unit} onChange={e => setNewKpi({...newKpi, unit: e.target.value})} className="w-1/3 bg-white border border-indigo-200 p-2 md:p-3 rounded-xl font-bold text-[10px] md:text-xs outline-none focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm placeholder-slate-300" />
                        </div>
                        <button onClick={addKpi} className="w-full bg-indigo-600 text-white font-black py-2.5 md:py-3 rounded-xl text-[10px] md:text-xs hover:bg-indigo-700 transition-all shadow-md flex justify-center items-center gap-2"><PlusCircle size={14}/> Tambah KPI</button>
                     </div>
                  </div>

                  {/* Custom Formulas */}
                  <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col">
                     <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-slate-800 mb-6 flex items-center gap-2"><Code2 className="text-emerald-500" size={18}/> Rumus Kalkulasi</h3>
                     <div className="flex-1 overflow-y-auto mb-6 space-y-3 custom-scrollbar pr-2 max-h-[300px]">
                        {customFormulas.map(f => (
                           <div key={f.id} className="bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-200 flex justify-between items-center group">
                              <div className="overflow-hidden">
                                 <p className="text-[10px] md:text-xs font-black text-indigo-600 truncate">{f.target}</p>
                                 <p className="text-[9px] md:text-[10px] font-mono text-slate-500 mt-1 truncate max-w-[200px] md:max-w-xs">{f.expression}</p>
                              </div>
                              <button onClick={() => removeFormula(f.id)} className="text-slate-300 hover:text-rose-500 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all p-2"><Trash2 size={14}/></button>
                           </div>
                        ))}
                     </div>
                     
                     <div className="bg-indigo-50 p-4 md:p-5 rounded-2xl border border-indigo-100 mt-auto">
                        <h4 className="text-[9px] md:text-[10px] font-black uppercase text-indigo-800 mb-3">Tambah Rumus Baru</h4>
                        <select value={newFormula.target} onChange={e => setNewFormula({...newFormula, target: e.target.value})} className="w-full bg-white border border-indigo-200 p-2 md:p-2.5 rounded-xl font-bold text-[10px] md:text-xs outline-none mb-3 cursor-pointer">
                           {ADS_HEADERS.map(h => <option key={h} value={h}>{h}</option>)}
                        </select>
                        <input type="text" placeholder="Cth: {Sales} / {Biaya Iklan}" value={newFormula.expression} onChange={e => setNewFormula({...newFormula, expression: e.target.value})} className="w-full bg-white border border-indigo-200 p-2 md:p-2.5 rounded-xl font-mono text-[10px] md:text-xs outline-none mb-3" />
                        <button onClick={saveFormula} className="w-full bg-indigo-600 text-white font-black py-2.5 md:py-3 rounded-xl text-[10px] md:text-xs hover:bg-indigo-700 transition-all shadow-md">Simpan Rumus</button>
                     </div>
                  </div>
                  
                  {/* MANAJEMEN ROLE & HAK AKSES (RBAC) */}
                  {activeRole === 'SUPER_ADMIN' && (
                     <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col md:col-span-2">
                        <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-slate-800 mb-6 flex items-center gap-2"><KeyRound className="text-rose-500" size={18}/> Manajemen Akses Role (RBAC)</h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                           <div className="lg:col-span-1 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                              {Object.entries(rolesConfig).map(([key, role]) => (
                                 <div key={key} className={`p-4 rounded-xl border transition-all cursor-pointer ${editingRoleKey === key ? 'bg-indigo-50 border-indigo-300' : 'bg-slate-50 border-slate-200 hover:border-indigo-200'}`} onClick={() => { setEditingRoleKey(key); setRoleForm({ name: role.name, pin: role.pin, tabs: role.tabs || [] }); }}>
                                    <div className="flex justify-between items-start">
                                       <div>
                                          <p className="text-xs font-black text-slate-800">{role.name}</p>
                                          <p className="text-[10px] font-bold text-indigo-600 mt-1 flex items-center gap-1"><Lock size={10}/> PIN: {role.pin}</p>
                                       </div>
                                       <div className="flex gap-1">
                                          {key !== 'SUPER_ADMIN' && <button onClick={(e) => { e.stopPropagation(); handleDeleteRole(key); }} className="text-slate-400 hover:text-rose-500 p-1 bg-white rounded-md shadow-sm border border-slate-200"><Trash2 size={12}/></button>}
                                       </div>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-1">
                                       <span className="text-[9px] bg-white border border-slate-200 px-2 py-1 rounded text-slate-500 font-bold">{role.tabs?.length || 0} Menu Diakses</span>
                                    </div>
                                 </div>
                              ))}
                              <button onClick={() => { setEditingRoleKey(null); setRoleForm({ name: '', pin: '', tabs: [] }); }} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-xs font-black text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all flex justify-center items-center gap-2"><PlusCircle size={16}/> Buat Role Baru</button>
                           </div>

                           <div className="lg:col-span-2 bg-slate-50 p-5 md:p-6 rounded-2xl border border-slate-200 flex flex-col">
                              <h4 className="text-xs md:text-sm font-black uppercase text-indigo-800 mb-5">{editingRoleKey ? `Edit Pengaturan Role` : 'Konfigurasi Role Baru'}</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                 <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Nama Jabatan/Role</label>
                                    <input type="text" value={roleForm.name} onChange={e => setRoleForm({...roleForm, name: e.target.value})} className="w-full bg-white border border-slate-200 p-3 rounded-xl font-bold text-xs outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50" placeholder="Cth: Admin Gudang" />
                                 </div>
                                 <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">PIN Login (Angka)</label>
                                    <input type="text" maxLength={6} value={roleForm.pin} onChange={e => setRoleForm({...roleForm, pin: e.target.value.replace(/[^0-9]/g, '')})} className="w-full bg-white border border-slate-200 p-3 rounded-xl font-bold text-xs outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 tracking-widest" placeholder="Cth: 8888" />
                                 </div>
                              </div>
                              
                              <label className="text-[10px] font-bold text-slate-500 uppercase mb-3 block">Beri Akses Pada Menu & Fitur Berikut:</label>
                              <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 md:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                 {ALL_SIDEBAR_TABS.map(tab => (
                                    <label key={tab.id} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                                       <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${roleForm.tabs.includes(tab.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-100 border-slate-300 group-hover:border-indigo-400'}`}>
                                          {roleForm.tabs.includes(tab.id) && <Check size={14} strokeWidth={4} />}
                                       </div>
                                       <input type="checkbox" className="hidden" checked={roleForm.tabs.includes(tab.id)} onChange={(e) => {
                                          if(e.target.checked) setRoleForm({...roleForm, tabs: [...roleForm.tabs, tab.id]});
                                          else setRoleForm({...roleForm, tabs: roleForm.tabs.filter(t => t !== tab.id)});
                                       }} />
                                       <span className="text-[11px] font-bold text-slate-700 select-none group-hover:text-indigo-600">{tab.label}</span>
                                    </label>
                                 ))}
                              </div>

                              <button onClick={handleSaveRole} className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl text-xs hover:bg-indigo-700 transition-all shadow-md flex justify-center items-center gap-2"><Save size={16}/> Simpan Konfigurasi Role</button>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>
          )}

          {/* --- TAB: ROAS REPORT --- */}
          {activeTab === 'roas_report' && (
            <div className="max-w-[1600px] mx-auto space-y-6 md:space-y-10 animate-in fade-in duration-700">
               <div className="flex items-center gap-4 bg-white p-5 md:p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0"><Calculator size={24} className="md:w-7 md:h-7"/></div>
                  <div>
                     <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight text-slate-800">Tabel Agregasi ROAS & Layanan</h2>
                     <p className="text-[10px] md:text-sm font-bold text-slate-400">Data otomatis ditarik dan digabungkan dari Menu Database Iklan (Budget) dan Database Leads (Sales/Closing).</p>
                  </div>
               </div>

               <div className="space-y-8 md:space-y-12">
                 <ReportTable title="Keseluruhan Iklan (Saja)" data={roasReportData.iklan_saja} showBudget={true} headerColor="bg-emerald-500" />
                 <ReportTable title="Keseluruhan Instagram WA & DM" data={roasReportData.ig_wa_dm} showBudget={false} headerColor="bg-emerald-500" />
                 <ReportTable title="Keseluruhan Organik" data={roasReportData.organik} showBudget={false} headerColor="bg-emerald-500" />
                 <ReportTable title="Keseluruhan WA Kosong" data={roasReportData.wa_kosong} showBudget={false} headerColor="bg-emerald-500" />
                 <ReportTable title="Total Keseluruhan Existing" data={roasReportData.existing} showBudget={false} headerColor="bg-blue-600" />
                 <ReportTable title="Total Keseluruhan Blast Existing" data={roasReportData.blast_existing} showBudget={false} headerColor="bg-blue-600" />
                 
                 <div className="relative pt-6 md:pt-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-[2rem] md:rounded-[3rem] -z-10"></div>
                    <ReportTable title="Total Keseluruhan (Master All)" data={roasReportData.keseluruhan} showBudget={true} headerColor="bg-emerald-500" highlight={true} />
                 </div>
               </div>
            </div>
          )}

          {/* --- TAB: REPORT GENERATOR PDF --- */}
          {activeTab === 'report' && (
            <div className="max-w-[1200px] mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
               
               <div className="bg-white p-5 md:p-6 rounded-[2rem] md:rounded-3xl border border-slate-200 shadow-sm sticky top-0 z-40 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 md:gap-4 self-start md:self-auto">
                     <div className="bg-indigo-100 text-indigo-600 p-2 md:p-3 rounded-xl md:rounded-2xl"><FileText size={20} className="md:w-6 md:h-6"/></div>
                     <div>
                       <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-slate-800">Cetak Laporan</h2>
                       <p className="text-[9px] md:text-xs font-bold text-slate-400">Pilih periode dan unduh format PDF A4.</p>
                     </div>
                  </div>
                  
                  {/* LOCAL FILTER UNTUK REPORT */}
                  <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200 w-full md:w-auto">
                     <select value={filterType} onChange={e => handleGlobalFilterChange(e.target.value)} className="bg-white text-[10px] md:text-xs font-black p-2 md:p-2.5 rounded-xl border border-slate-200 outline-none cursor-pointer shadow-sm flex-1 md:flex-none">
                        <option value="all">Semua Waktu</option>
                        <option value="today">Hari Ini</option>
                        <option value="yesterday">Kemarin</option>
                        <option value="this_week">Minggu Ini</option>
                        <option value="this_month">Bulan Ini</option>
                        <option value="last_month">Bulan Lalu</option>
                        <option value="custom">Custom Tanggal</option>
                     </select>
                     {filterType === 'custom' && (
                       <div className="flex items-center gap-2 bg-white px-2 md:px-3 py-1.5 md:py-2 rounded-xl border border-slate-200 shadow-sm w-full md:w-auto mt-2 md:mt-0">
                          <input type="date" value={dateRange.start} onChange={e => {setDateRange({...dateRange, start: e.target.value}); logActivity(`Ubah Laporan Tanggal Awal Custom: ${e.target.value}`);}} className="text-[9px] md:text-[10px] font-bold outline-none w-full" />
                          <span className="text-slate-300">-</span>
                          <input type="date" value={dateRange.end} onChange={e => {setDateRange({...dateRange, end: e.target.value}); logActivity(`Ubah Laporan Tanggal Akhir Custom: ${e.target.value}`);}} className="text-[9px] md:text-[10px] font-bold outline-none w-full" />
                       </div>
                     )}
                     <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
                        <button onClick={generateWordReport} className="flex-1 md:flex-none bg-blue-600 text-white px-4 md:px-5 py-2.5 rounded-xl font-black flex items-center justify-center gap-2 shadow-md hover:bg-blue-700 transition-all text-[10px] md:text-xs hover:scale-105">
                           <FileText size={14} /> Unduh DOC
                        </button>
                        <button onClick={generatePDFReport} className="flex-1 md:flex-none bg-indigo-600 text-white px-4 md:px-5 py-2.5 rounded-xl font-black flex items-center justify-center gap-2 shadow-md hover:bg-indigo-700 transition-all text-[10px] md:text-xs hover:scale-105">
                           <Printer size={14} /> Cetak PDF A4
                        </button>
                     </div>
                  </div>
               </div>

               {/* A4 Document Preview Container */}
               <div className="overflow-x-auto pb-4 md:overflow-visible">
                 <div className="bg-white shadow-2xl mx-auto relative text-slate-800 font-sans origin-top-left md:transform-none print-container" style={{width: '100%', maxWidth: '210mm', minHeight: '297mm', transform: window.innerWidth < 768 ? `scale(${window.innerWidth / 850})` : 'none'}} id="pdf-report-content">
                    
                    {/* Report Header */}
                    <div className="p-10 border-b-[8px] border-indigo-600 flex justify-between items-end bg-slate-50 relative overflow-hidden">
                       <div className="absolute -right-10 -top-10 text-indigo-100 opacity-50 transform rotate-12"><Activity size={200} /></div>
                       <div className="relative z-10">
                          <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 leading-none">Laporan Kinerja<br/><span className="text-indigo-600">Marketing & Sales</span></h1>
                          <p className="text-sm font-black text-slate-500 mt-3 tracking-widest uppercase">Hagia Pro Analytics</p>
                       </div>
                       <div className="text-right relative z-10 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Periode Analisis Data</p>
                          <p className="text-lg font-black text-slate-800 mt-1">
                             {filterType === 'all' ? 'SEPANJANG WAKTU' : filterType === 'custom' ? `${dateRange.start} s/d ${dateRange.end}` : filterType.replace('_', ' ').toUpperCase()}
                          </p>
                          <p className="text-[9px] font-bold text-slate-400 mt-1">Dicetak: {new Date().toLocaleString('id-ID')}</p>
                       </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-10 space-y-8">
                       
                       {/* 1. Ringkasan Eksekutif Finansial */}
                       <div className="break-inside-avoid">
                         <h2 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-4 border-b-2 border-indigo-100 pb-2 flex items-center gap-2"><Wallet size={16}/> 1. Ringkasan Eksekutif Finansial</h2>
                         <div className="grid grid-cols-2 gap-4">
                            {/* Keseluruhan */}
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 relative">
                               {trends.sales && (
                                  <div className={`absolute top-4 right-4 text-[9px] font-black px-2 py-1 rounded-lg flex items-center gap-1 ${trends.sales.isBetter ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                     {trends.sales.isBetter ? <TrendingUp size={10}/> : <TrendingDown size={10}/>} {trends.sales.text}
                                  </div>
                               )}
                               <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">A. Performa Keseluruhan (Semua Sumber)</p>
                               <div className="grid grid-cols-2 gap-4">
                                  <div>
                                     <p className="text-[10px] font-bold text-slate-500 uppercase">Total Sales</p>
                                     <p className="text-lg font-black text-emerald-600 leading-tight">{formatIDR(roasReportData.keseluruhan.total.sales)}</p>
                                  </div>
                                  <div>
                                     <p className="text-[10px] font-bold text-slate-500 uppercase">Total ROAS</p>
                                     <p className="text-lg font-black text-indigo-600 leading-tight">{roasReportData.keseluruhan.total.budget > 0 ? (roasReportData.keseluruhan.total.sales / roasReportData.keseluruhan.total.budget).toFixed(2) : 0}x</p>
                                  </div>
                                  <div>
                                     <p className="text-[10px] font-bold text-slate-500 uppercase">Cost / Closing (CPA)</p>
                                     <p className="text-lg font-black text-amber-600 leading-tight">{formatIDR(roasReportData.keseluruhan.total.closing > 0 ? roasReportData.keseluruhan.total.budget / roasReportData.keseluruhan.total.closing : roasReportData.keseluruhan.total.budget)}</p>
                                  </div>
                                  <div>
                                     <p className="text-[10px] font-bold text-slate-500 uppercase">Total Ad Spend</p>
                                     <p className="text-lg font-black text-rose-600 leading-tight">{formatIDR(roasReportData.keseluruhan.total.budget)}</p>
                                  </div>
                               </div>
                            </div>
                            {/* Iklan Saja */}
                            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 relative">
                               <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-3">B. Performa Khusus Iklan WA</p>
                               <div className="grid grid-cols-2 gap-4">
                                  <div>
                                     <p className="text-[10px] font-bold text-blue-500 uppercase">Sales Iklan</p>
                                     <p className="text-lg font-black text-blue-700 leading-tight">{formatIDR(roasReportData.iklan_saja.total.sales)}</p>
                                  </div>
                                  <div>
                                     <p className="text-[10px] font-bold text-blue-500 uppercase">ROAS Iklan Saja</p>
                                     <p className="text-lg font-black text-blue-700 leading-tight">{roasReportData.iklan_saja.total.budget > 0 ? (roasReportData.iklan_saja.total.sales / roasReportData.iklan_saja.total.budget).toFixed(2) : 0}x</p>
                                  </div>
                                  <div>
                                     <p className="text-[10px] font-bold text-blue-500 uppercase">CPA Iklan</p>
                                     <p className="text-lg font-black text-blue-700 leading-tight">{formatIDR(roasReportData.iklan_saja.total.closing > 0 ? roasReportData.iklan_saja.total.budget / roasReportData.iklan_saja.total.closing : roasReportData.iklan_saja.total.budget)}</p>
                                  </div>
                                  <div>
                                     <p className="text-[10px] font-bold text-blue-500 uppercase">Porsi vs Total Sales</p>
                                     <p className="text-lg font-black text-blue-700 leading-tight">{(roasReportData.keseluruhan.total.sales > 0 ? (roasReportData.iklan_saja.total.sales / roasReportData.keseluruhan.total.sales) * 100 : 0).toFixed(1)}%</p>
                                  </div>
                               </div>
                            </div>
                         </div>
                       </div>

                       {/* 2. Performa Layanan */}
                       <div className="break-inside-avoid">
                         <h2 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-4 border-b-2 border-indigo-100 pb-2 flex items-center gap-2"><Layers size={16}/> 2. Komparasi Performa Layanan (Iklan vs Keseluruhan)</h2>
                         <table className="w-full text-left border-collapse text-[10px] border border-slate-200">
                            <thead>
                               <tr className="bg-slate-100 text-slate-600 font-black uppercase tracking-wider">
                                  <th className="p-2 border border-slate-200">Kategori Layanan</th>
                                  <th className="p-2 border border-slate-200 bg-blue-50 text-blue-700">Sales Iklan WA</th>
                                  <th className="p-2 border border-slate-200 bg-blue-50 text-blue-700">ROAS Iklan</th>
                                  <th className="p-2 border border-slate-200">Total Sales (Semua)</th>
                                  <th className="p-2 border border-slate-200">Total ROAS</th>
                                  <th className="p-2 border border-slate-200 text-rose-600">Budget Iklan</th>
                               </tr>
                            </thead>
                            <tbody>
                               {SERVICES_LIST.map(s => {
                                  const spend = roasReportData.keseluruhan[s.id].budget;
                                  const salesAds = roasReportData.iklan_saja[s.id].sales;
                                  const salesAll = roasReportData.keseluruhan[s.id].sales;
                                  const roasAds = spend > 0 ? (salesAds/spend).toFixed(1) : 0;
                                  const roasAll = spend > 0 ? (salesAll/spend).toFixed(1) : 0;
                                  return (
                                    <tr key={s.id} className="font-bold text-slate-700">
                                       <td className="p-2 border border-slate-200">{s.name}</td>
                                       <td className="p-2 border border-slate-200 bg-blue-50/30 text-blue-600">{formatIDR(salesAds)}</td>
                                       <td className="p-2 border border-slate-200 bg-blue-50/30 text-blue-600">{roasAds}x</td>
                                       <td className="p-2 border border-slate-200 text-emerald-600">{formatIDR(salesAll)}</td>
                                       <td className="p-2 border border-slate-200 text-indigo-600">{roasAll}x</td>
                                       <td className="p-2 border border-slate-200 text-rose-500">{formatIDR(spend)}</td>
                                    </tr>
                                  )
                               })}
                            </tbody>
                         </table>
                       </div>

                       {/* PEMBARUAN: Lampiran Tabel Agregasi ROAS Keseluruhan di PDF */}
                       <div className="break-inside-avoid mt-8">
                         <h2 className="text-sm font-black uppercase tracking-widest text-emerald-600 mb-4 border-b-2 border-emerald-100 pb-2 flex items-center gap-2"><Calculator size={16}/> 3. Tabel Detail Agregasi Master (Semua Sumber)</h2>
                         <ReportTable title="Total Keseluruhan (Master All)" data={roasReportData.keseluruhan} showBudget={true} headerColor="bg-emerald-500" highlight={true} />
                       </div>

                       {/* 4. Analisa Leads */}
                       <div className="break-inside-avoid">
                         <h2 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-4 border-b-2 border-indigo-100 pb-2 flex items-center gap-2"><Users size={16}/> 4. Analisa Kualitas & Konversi Leads</h2>
                         <table className="w-full text-left border-collapse text-[10px] border border-slate-200">
                            <thead>
                               <tr className="bg-slate-100 text-slate-600 font-black uppercase tracking-wider">
                                  <th className="p-2 border border-slate-200">Kategori Layanan</th>
                                  <th className="p-2 border border-slate-200 bg-blue-50 text-blue-700">Lead Iklan WA</th>
                                  <th className="p-2 border border-slate-200 bg-blue-50 text-blue-700">CR Iklan WA</th>
                                  <th className="p-2 border border-slate-200">Total Leads (Semua)</th>
                                  <th className="p-2 border border-slate-200">Total CR</th>
                                  <th className="p-2 border border-slate-200 text-rose-600">Lead Wasted (Luar Kota)</th>
                               </tr>
                            </thead>
                            <tbody>
                               {SERVICES_LIST.map(s => {
                                  const leadsAds = roasReportData.iklan_saja[s.id].leads;
                                  const closingAds = roasReportData.iklan_saja[s.id].closing;
                                  const crAds = leadsAds > 0 ? ((closingAds/leadsAds)*100).toFixed(1) : 0;
                                  
                                  const leadsAll = roasReportData.keseluruhan[s.id].leads;
                                  const closingAll = roasReportData.keseluruhan[s.id].closing;
                                  const crAll = leadsAll > 0 ? ((closingAll/leadsAll)*100).toFixed(1) : 0;
                                  
                                  const lkAll = roasReportData.keseluruhan[s.id].lk;

                                  return (
                                    <tr key={s.id} className="font-bold text-slate-700">
                                       <td className="p-2 border border-slate-200">{s.name}</td>
                                       <td className="p-2 border border-slate-200 bg-blue-50/30 text-blue-600">{leadsAds}</td>
                                       <td className="p-2 border border-slate-200 bg-blue-50/30 text-blue-600">{crAds}%</td>
                                       <td className="p-2 border border-slate-200">{leadsAll}</td>
                                       <td className="p-2 border border-slate-200 text-indigo-600">{crAll}%</td>
                                       <td className="p-2 border border-slate-200 text-rose-500">{lkAll} ({(leadsAll>0?(lkAll/leadsAll)*100:0).toFixed(0)}%)</td>
                                    </tr>
                                  )
                               })}
                            </tbody>
                         </table>

                         {/* Rincian Sumber & Lokasi yang Terkonversi (Closing Saja) */}
                         <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-emerald-50/30 p-4 rounded-xl border border-emerald-100">
                               <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-3 flex items-center gap-1.5"><CheckSquare size={14}/> Sumber Lead Closing (Deal)</p>
                               <table className="w-full text-left text-[10px]">
                                 <tbody>
                                   {closingPerformanceData.detailsArray.filter(d => d.closing > 0).sort((a,b) => b.closing - a.closing).map((src, i) => (
                                     <tr key={i} className="border-b border-emerald-50 last:border-0">
                                       <td className="py-1.5 font-bold text-slate-700">{src.name}</td>
                                       <td className="py-1.5 text-right font-black text-emerald-600">{src.closing} Deal</td>
                                     </tr>
                                   ))}
                                   {closingPerformanceData.detailsArray.filter(d => d.closing > 0).length === 0 && <tr><td className="py-2 text-slate-400 italic">Belum ada closing terdata.</td></tr>}
                                 </tbody>
                               </table>
                            </div>
                            
                            <div className="bg-indigo-50/30 p-4 rounded-xl border border-indigo-100">
                               <p className="text-[10px] font-black text-indigo-700 uppercase tracking-widest mb-3 flex items-center gap-1.5"><MapPin size={14}/> Top Area Closing (Deal)</p>
                               <table className="w-full text-left text-[10px]">
                                 <tbody>
                                   {closingPerformanceData.topLocations.map((loc, i) => (
                                     <tr key={i} className="border-b border-indigo-50 last:border-0">
                                       <td className="py-1.5 font-bold text-slate-700 truncate max-w-[150px]" title={loc.name}>{loc.name}</td>
                                       <td className="py-1.5 text-right font-black text-indigo-600">{loc.closing} Deal</td>
                                     </tr>
                                   ))}
                                   {closingPerformanceData.topLocations.length === 0 && <tr><td className="py-2 text-slate-400 italic">Belum ada lokasi closing terdata.</td></tr>}
                                 </tbody>
                               </table>
                            </div>
                         </div>
                       </div>

                       {/* 5. Metrik Meta Ads */}
                       <div className="break-inside-avoid">
                         <h2 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-4 border-b-2 border-indigo-100 pb-2 flex items-center gap-2"><Target size={16}/> 5. Detail Pelaporan Meta Ads (Kesehatan Kampanye)</h2>
                         <div className="grid grid-cols-4 gap-4">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-center relative">
                               <p className="text-[10px] font-black text-slate-500 uppercase">Total Impresi</p>
                               <p className="text-lg font-black text-slate-800 mt-0.5">{stats.impresi.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-center relative">
                               <p className="text-[10px] font-black text-slate-500 uppercase">Total Reach</p>
                               <p className="text-lg font-black text-slate-800 mt-0.5">{stats.reach.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-center relative">
                               <p className="text-[10px] font-black text-slate-500 uppercase">Klik Tautan (Semua)</p>
                               <p className="text-lg font-black text-slate-800 mt-0.5">{stats.clicksSemua.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 flex flex-col justify-center relative">
                               <p className="text-[10px] font-black text-emerald-600 uppercase">Leads Iklan WA</p>
                               <p className="text-lg font-black text-emerald-800 mt-0.5">{stats.waLeads.toLocaleString('id-ID')}</p>
                            </div>
                            
                            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 flex flex-col justify-center relative">
                               {trends.ctr && <span className={`absolute top-2 right-2 text-[8px] font-black px-1.5 py-0.5 rounded ${trends.ctr.isBetter ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{trends.ctr.text}</span>}
                               <p className="text-[10px] font-black text-indigo-600 uppercase">Rata-rata CTR</p>
                               <p className="text-lg font-black text-indigo-800 mt-0.5">{stats.avgCTR.toFixed(2)}%</p>
                            </div>
                            <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 flex flex-col justify-center relative">
                               {trends.cpc && <span className={`absolute top-2 right-2 text-[8px] font-black px-1.5 py-0.5 rounded ${trends.cpc.isBetter ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{trends.cpc.text}</span>}
                               <p className="text-[10px] font-black text-rose-600 uppercase">Rata-rata CPC</p>
                               <p className="text-lg font-black text-rose-800 mt-0.5">{formatIDR(stats.avgCPC)}</p>
                            </div>
                            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex flex-col justify-center relative">
                               {trends.cpm && <span className={`absolute top-2 right-2 text-[8px] font-black px-1.5 py-0.5 rounded ${trends.cpm.isBetter ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{trends.cpm.text}</span>}
                               <p className="text-[10px] font-black text-amber-600 uppercase">Rata-rata CPM</p>
                               <p className="text-lg font-black text-amber-800 mt-0.5">{formatIDR(stats.avgCPM)}</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 flex flex-col justify-center relative">
                               {trends.cpr && <span className={`absolute top-2 right-2 text-[8px] font-black px-1.5 py-0.5 rounded ${trends.cpr.isBetter ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>{trends.cpr.text}</span>}
                               <p className="text-[10px] font-black text-purple-600 uppercase">Rata-rata CPR</p>
                               <p className="text-lg font-black text-purple-800 mt-0.5">{formatIDR(stats.avgCPR)}</p>
                            </div>
                         </div>
                       </div>

                       {/* 6. Kinerja Adset & Kampanye */}
                       <div className="break-inside-avoid">
                         <h2 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-4 border-b-2 border-indigo-100 pb-2 flex items-center gap-2"><Layers size={16}/> 6. Kinerja Adset & Distribusi Kampanye</h2>
                         
                         {(() => {
                            const adsets = adsetAnalytics;
                            if (adsets.length === 0) return <p className="text-xs text-slate-500 font-bold p-4 bg-slate-50 rounded-xl border border-slate-200">Data adset belum tersedia untuk periode ini. Pastikan Anda mengunggah data di menu Database Per Adset.</p>;

                            const totalAdsets = adsets.length;
                            
                            // Ambil 3 terbaik (Prioritas: Punya Hasil, lalu CPR termurah)
                            const winning = [...adsets].filter(a => a.results > 0 || a.metaHasil > 0).sort((a,b) => {
                                if(a.cpr > 0 && b.cpr > 0) return a.cpr - b.cpr;
                                return (b.results || b.metaHasil) - (a.results || a.metaHasil);
                            }).slice(0, 3);

                            // Ambil 3 terburuk (Prioritas: Budget keluar tapi 0 leads, atau CPR termahal)
                            const poor = [...adsets].filter(a => a.spend > 0).sort((a,b) => {
                                if (a.results === 0 && b.results === 0) return b.spend - a.spend;
                                if (a.results === 0) return -1;
                                if (b.results === 0) return 1;
                                return b.cpr - a.cpr;
                            }).slice(0, 3);

                            // Rangkuman Campaign Layanan
                            const campaignCounts = {};
                            adsets.forEach(a => {
                                const cName = String(a.campaign || 'Tanpa Campaign').trim();
                                campaignCounts[cName] = (campaignCounts[cName] || 0) + 1;
                            });
                            const campaignList = Object.entries(campaignCounts).map(([name, count]) => ({name, count})).sort((a,b) => b.count - a.count);

                            return (
                               <div className="space-y-4">
                                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                     <p className="text-xs font-black text-slate-700 mb-2 flex justify-between items-center">
                                        <span>Total Adset Berjalan: <span className="text-indigo-600">{totalAdsets} Adset</span></span>
                                     </p>
                                     <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Distribusi Total Berdasarkan Campaign Layanan:</p>
                                     <div className="flex flex-wrap gap-2">
                                        {campaignList.map((c, i) => (
                                           <span key={i} className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-600 shadow-sm flex items-center gap-2">
                                              {c.name} <span className="bg-indigo-100 text-indigo-700 px-1.5 rounded-md font-black">{c.count}</span>
                                           </span>
                                        ))}
                                     </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                     <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                                        <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-3 flex items-center gap-1.5"><TrendingUp size={14}/> Top Performa (Winning)</p>
                                        <div className="space-y-2">
                                           {winning.length === 0 ? <p className="text-[9px] text-slate-400">Belum ada adset berkinerja baik.</p> : winning.map((w, i) => (
                                              <div key={i} className="bg-white p-2.5 rounded-lg border border-emerald-100 shadow-sm relative overflow-hidden">
                                                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400"></div>
                                                 <p className="text-[10px] font-bold text-slate-800 truncate pl-1" title={w.name}>{w.name}</p>
                                                 <div className="flex justify-between items-center mt-1.5 pl-1">
                                                    <span className="text-[9px] font-medium text-slate-500 bg-slate-100 px-1.5 rounded">{w.results} Leads</span> 
                                                    <span className="text-[10px] text-emerald-600 font-black">{formatIDR(w.cpr)} <span className="font-medium text-[8px] text-slate-400">/lead</span></span>
                                                 </div>
                                              </div>
                                           ))}
                                        </div>
                                     </div>
                                     <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100">
                                        <p className="text-[10px] font-black text-rose-700 uppercase tracking-widest mb-3 flex items-center gap-1.5"><TrendingDown size={14}/> Evaluasi Budget (Boncos)</p>
                                        <div className="space-y-2">
                                           {poor.length === 0 ? <p className="text-[9px] text-slate-400">Tidak ada adset buruk terdeteksi.</p> : poor.map((p, i) => (
                                              <div key={i} className="bg-white p-2.5 rounded-lg border border-rose-100 shadow-sm relative overflow-hidden">
                                                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-400"></div>
                                                 <p className="text-[10px] font-bold text-slate-800 truncate pl-1" title={p.name}>{p.name}</p>
                                                 <div className="flex justify-between items-center mt-1.5 pl-1">
                                                    <span className="text-[9px] font-medium text-rose-500 bg-rose-50 px-1.5 rounded">Spend: {formatIDR(p.spend)}</span> 
                                                    <span className="text-[10px] text-rose-600 font-black">{p.results === 0 ? '0 Leads!' : `${formatIDR(p.cpr)} /lead`}</span>
                                                 </div>
                                              </div>
                                           ))}
                                        </div>
                                     </div>
                                  </div>
                               </div>
                            );
                         })()}
                       </div>

                       {/* 7. Demografi & Sumber Leads (TAMBAHAN BARU) */}
                       <div className="break-inside-avoid mt-8">
                         <h2 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-4 border-b-2 border-indigo-100 pb-2 flex items-center gap-2"><MapPin size={16}/> 7. Ringkasan Demografi & Sumber Leads</h2>
                         <div className="grid grid-cols-2 gap-6">
                           {/* Sumber Leads */}
                           <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">A. Sumber Lalu Lintas (Trafik)</p>
                              <table className="w-full text-left text-[10px]">
                                <tbody>
                                  {leadsDataChart.chartArray.sort((a,b) => b.value - a.value).map((s, i) => (
                                    <tr key={i} className="border-b border-slate-100 last:border-0">
                                      <td className="py-2 font-bold text-slate-700">{s.name}</td>
                                      <td className="py-2 text-right font-black text-indigo-600">{s.value} Leads</td>
                                    </tr>
                                  ))}
                                  <tr className="bg-indigo-50/80 border-t-2 border-indigo-200">
                                    <td className="py-2.5 px-2 font-black text-indigo-900 uppercase">Total Keseluruhan Leads</td>
                                    <td className="py-2.5 px-2 text-right font-black text-indigo-900 text-xs">{leadsDataChart.total}</td>
                                  </tr>
                                </tbody>
                              </table>
                           </div>
                           
                           {/* Lokasi Leads */}
                           <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">B. Top 10 Lokasi Prospek</p>
                              <table className="w-full text-left text-[10px]">
                                <tbody>
                                  {geoStats.slice(0, 10).map((loc, i) => (
                                    <tr key={i} className="border-b border-slate-100 last:border-0">
                                      <td className="py-1.5 font-bold text-slate-700 truncate max-w-[150px]" title={loc.name}>{loc.name}</td>
                                      <td className="py-1.5 text-right font-black text-teal-600">{loc.leads} org</td>
                                    </tr>
                                  ))}
                                  {geoStats.length === 0 && <tr><td className="py-2 text-slate-400 italic">Data lokasi belum tersedia</td></tr>}
                                </tbody>
                              </table>
                           </div>
                         </div>
                         
                         {/* Highlight Konversi vs Dropoff */}
                         <div className="mt-4 flex gap-4">
                            <div className="flex-1 bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex justify-between items-center shadow-sm">
                               <div>
                                  <p className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">Total Terkonversi</p>
                                  <p className="text-[8px] font-bold text-emerald-600/70 uppercase">Berhasil Deal / Closing</p>
                               </div>
                               <span className="text-lg font-black text-emerald-700">{closingPerformanceData.total_closing}</span>
                            </div>
                            <div className="flex-1 bg-rose-50 border border-rose-200 p-3 rounded-xl flex justify-between items-center shadow-sm">
                               <div>
                                  <p className="text-[9px] font-black text-rose-700 uppercase tracking-widest">Total Dropoff</p>
                                  <p className="text-[8px] font-bold text-rose-600/70 uppercase">WA Kosong / Batal</p>
                               </div>
                               <span className="text-lg font-black text-rose-700">{leadsDataChart.wa_kosong}</span>
                            </div>
                         </div>
                       </div>

                       {/* 8. Analisa Otomatis (Berubah menjadi nomor 8) */}
                       <div className="break-inside-avoid mt-8">
                         <h2 className="text-sm font-black uppercase tracking-widest text-indigo-600 mb-4 border-b-2 border-indigo-100 pb-2 flex items-center gap-2"><Lightbulb size={16}/> 8. Temuan & Analisa Sistem Otomatis</h2>
                         <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                            {getReportInsights().map((msg, i) => (
                               <div key={`ri-${i}`} className="flex gap-3 text-xs">
                                  <div className={`w-2 h-2 mt-1 rounded-full flex-shrink-0 ${msg.status === 'success' ? 'bg-emerald-500' : msg.status === 'danger' ? 'bg-rose-500' : msg.status === 'warning' ? 'bg-amber-500' : msg.status === 'info' ? 'bg-blue-500' : 'bg-indigo-600'}`}></div>
                                  <p><strong className="text-slate-800">{msg.title}: </strong> <span className="text-slate-600 leading-relaxed font-medium">{msg.text}</span></p>
                               </div>
                            ))}
                         </div>
                       </div>

                    </div>
                 </div>
               </div>
            </div>
          )}

          {/* --- TAB: ABSENSI KARYAWAN --- */}
          {isAbsensiTab && (
            <div className="max-w-[1200px] mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-5 md:p-6 rounded-[2rem] border border-slate-200 shadow-sm sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl"><UserCheck size={28} className="md:w-8 md:h-8" /></div>
                       <div>
                          <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight text-slate-800">Sistem Absensi Kehadiran</h2>
                          <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-1">Wajib mengambil foto selfie dan merekam lokasi GPS saat absensi.</p>
                       </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   {/* Kamera & Form Absensi */}
                   <div className="lg:col-span-1 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col items-center">
                       {absensiUI.error && <div className="w-full bg-rose-50 text-rose-600 p-3 rounded-xl text-xs font-bold mb-4 flex items-center gap-2 border border-rose-100"><AlertCircle size={14}/> {absensiUI.error}</div>}
                       
                       <div className="w-full relative bg-slate-900 rounded-2xl overflow-hidden aspect-[3/4] flex items-center justify-center shadow-inner mb-4">
                           {!absensiUI.photo ? (
                               <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100"></video>
                           ) : (
                               <>
                                   <img src={absensiUI.photo} alt="Selfie" className="w-full h-full object-cover transform -scale-x-100" />
                                   
                                   {/* Overlay Visual Watermark di UI */}
                                   <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm border border-white/20 p-3 rounded-xl text-white text-[9px] font-mono shadow-lg pointer-events-none z-20">
                                       <div className="flex items-center gap-1.5 mb-1.5 text-emerald-400 font-black"><Camera size={10}/> HAGIA PRO ABSENSI</div>
                                       <p className="opacity-90">Waktu : {new Date().toLocaleString('id-ID')}</p>
                                       <p className="opacity-90 truncate">Lokasi: {absensiUI.gps || 'Menunggu Lokasi GPS...'}</p>
                                       <p className="opacity-90">Status: {absensiUI.status}</p>
                                   </div>
                               </>
                           )}
                           
                           {!absensiUI.isOpen && !absensiUI.photo && (
                               <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 text-white z-10 p-6 text-center">
                                  <Camera size={48} className="mb-4 text-indigo-400 animate-pulse" />
                                  <p className="text-sm font-black mb-2">Akses Kamera Diperlukan</p>
                                  <p className="text-[10px] text-slate-300 mb-6">Tahap 1: Kita ambil foto selfie terlebih dahulu.</p>
                                  <button onClick={() => {
                                      setAbsensiUI(p => ({...p, error: 'Meminta izin Kamera...' }));
                                      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
                                        .then(stream => {
                                            if(videoRef.current) videoRef.current.srcObject = stream;
                                            setAbsensiUI(p => ({...p, isOpen: true, error: ''}));
                                        })
                                        .catch(err => setAbsensiUI(p => ({...p, error: 'Kamera diblokir oleh browser.'})));
                                  }} className="bg-indigo-600 px-6 py-3 rounded-xl font-black text-sm hover:bg-indigo-500 transition-colors shadow-lg">1. Buka Kamera Absensi</button>
                               </div>
                           )}
                           <canvas ref={absensiCanvasRef} className="hidden"></canvas>
                       </div>

                       {absensiUI.isOpen && !absensiUI.photo && (
                           <button onClick={() => {
                               if(videoRef.current && absensiCanvasRef.current) {
                                   const video = videoRef.current;
                                   const canvas = absensiCanvasRef.current;
                                   canvas.width = video.videoWidth;
                                   canvas.height = video.videoHeight;
                                   canvas.getContext('2d').drawImage(video, 0, 0);
                                   const photoData = canvas.toDataURL('image/jpeg');
                                   setAbsensiUI(p => ({...p, photo: photoData}));
                                   video.srcObject.getTracks().forEach(t => t.stop()); // Turn off camera
                               }
                           }} className="w-full bg-emerald-500 text-white py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 hover:scale-[1.02] transition-all mb-3"><Camera size={18}/> 2. Ambil Selfie Kehadiran</button>
                       )}

                       {absensiUI.photo && (
                           <div className="w-full space-y-3">
                               <div className="flex bg-slate-100 p-1 rounded-xl">
                                   <button onClick={() => setAbsensiUI(p => ({...p, status: 'Masuk'}))} className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${absensiUI.status === 'Masuk' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>Absen Masuk</button>
                                   <button onClick={() => setAbsensiUI(p => ({...p, status: 'Pulang'}))} className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${absensiUI.status === 'Pulang' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400'}`}>Absen Pulang</button>
                               </div>
                               
                               <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-[10px] font-bold text-slate-500 flex flex-col gap-3 shadow-sm">
                                  {absensiUI.gps ? (
                                      <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                                         <MapPin size={16} className="flex-shrink-0" /> 
                                         <span className="truncate font-black">Lokasi: {absensiUI.gps}</span>
                                      </div>
                                  ) : (
                                      <div className="space-y-3">
                                          <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-start gap-2 text-amber-800">
                                             <AlertCircle size={14} className="mt-0.5 flex-shrink-0"/> <span className="leading-relaxed">Lokasi belum terdeteksi. <strong>Wajib memberikan izin akses GPS</strong> di browser untuk dapat melakukan absensi!</span>
                                          </div>
                                          <button onClick={() => {
                                              setAbsensiUI(p => ({...p, error: 'Melacak kordinat lokasi...'}));
                                              
                                              // Fungsi Darurat (Seamless Fallback) jika diblokir oleh Iframe / Sistem
                                              const getHybridLocation = async () => {
                                                  try {
                                                      const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
                                                      const data = await res.json();
                                                      if(data && data.latitude) {
                                                          setAbsensiUI(prev => ({...prev, gps: `${data.latitude}, ${data.longitude}`, error: ''}));
                                                      } else {
                                                          setAbsensiUI(prev => ({...prev, error: 'Gagal mendeteksi lokasi dari satelit maupun jaringan.'}));
                                                      }
                                                  } catch(e) {
                                                      setAbsensiUI(prev => ({...prev, error: 'Gagal mendeteksi lokasi. Pastikan internet Anda stabil.'}));
                                                  }
                                              };

                                              if(navigator.geolocation) {
                                                  navigator.geolocation.getCurrentPosition(
                                                       pos => setAbsensiUI(prev => ({...prev, gps: `${pos.coords.latitude}, ${pos.coords.longitude}`, error: ''})),
                                                       err => {
                                                           // Jika error apapun terjadi (Block, Timeout, dll), langsung tembak fallback Jaringan secara otomatis!
                                                           getHybridLocation();
                                                       },
                                                       { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
                                                   );
                                              } else {
                                                  getHybridLocation();
                                              }
                                          }} className="w-full py-3 bg-indigo-600 text-white rounded-xl text-xs font-black hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-md">
                                              <MapPin size={16}/> 3. Lacak Lokasi GPS
                                          </button>
                                      </div>
                                  )}
                               </div>

                               <button onClick={async () => {
                                   if(!absensiUI.gps) return setAbsensiUI(p => ({...p, error: 'Anda harus memberikan izin dan melacak GPS terlebih dahulu!'}));
                                   setLoading(true);
                                   try {
                                       const now = new Date();
                                       
                                       // --- PROSES BURN WATERMARK & FLIP GAMBAR PERMANEN ---
                                       const canvas = document.createElement('canvas');
                                       const img = new Image();
                                       img.src = absensiUI.photo;
                                       await new Promise(res => img.onload = res);
                                       canvas.width = img.width;
                                       canvas.height = img.height;
                                       const ctx = canvas.getContext('2d');
                                       
                                       // Balikkan gambar agar tidak seperti cermin lagi
                                       ctx.translate(canvas.width, 0);
                                       ctx.scale(-1, 1);
                                       ctx.drawImage(img, 0, 0);
                                       // Kembalikan orientasi canvas untuk nulis teks
                                       ctx.translate(canvas.width, 0);
                                       ctx.scale(-1, 1);
                                       
                                       // Bikin background hitam transparan untuk watermark
                                       ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
                                       ctx.fillRect(0, canvas.height - 90, canvas.width, 90);
                                       
                                       // Tulis teks Watermark
                                       ctx.fillStyle = "#34d399"; // emerald-400
                                       ctx.font = "bold 14px monospace";
                                       ctx.fillText("HAGIA PRO ABSENSI", 15, canvas.height - 65);
                                       
                                       ctx.fillStyle = "#ffffff";
                                       ctx.font = "12px monospace";
                                       ctx.fillText(`Waktu : ${now.toLocaleString('id-ID')}`, 15, canvas.height - 45);
                                       ctx.fillText(`Lokasi: ${absensiUI.gps}`, 15, canvas.height - 25);
                                       
                                       const watermarkedPhoto = canvas.toDataURL('image/jpeg', 0.8);
                                       
                                       const newAbsen = {
                                           "Tanggal": now.toLocaleDateString('id-ID'),
                                           "Waktu": now.toLocaleTimeString('id-ID'),
                                           "Nama Karyawan": rolesConfig[activeRole]?.name || 'Karyawan Tanpa Nama',
                                           "Role": activeRole,
                                           "Lokasi GPS": absensiUI.gps,
                                           "Foto Selfie": watermarkedPhoto, // Simpan versi ber-watermark
                                           "Status Absen": absensiUI.status,
                                           "timestamp": now.getTime()
                                       };
                                       await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'absensi_v1'), newAbsen);
                                       setDialog({ isOpen: true, type: 'alert', message: `Berhasil merekam absen ${absensiUI.status}!` });
                                       setAbsensiUI({ isOpen: false, photo: null, gps: null, status: 'Masuk', error: '' });
                                   } catch(e) { setAbsensiUI(p => ({...p, error: e.message})); }
                                   setLoading(false);
                               }} className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition-all">Submit Absen {absensiUI.status}</button>
                               <button onClick={() => setAbsensiUI({ isOpen: false, photo: null, gps: null, status: 'Masuk', error: '' })} className="w-full bg-slate-100 text-slate-600 py-3 rounded-xl font-black text-xs hover:bg-slate-200 transition-colors">Ulangi Ambil Foto</button>
                           </div>
                       )}
                   </div>

                   {/* History Absensi Terkini */}
                   <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                       <div className="p-6 bg-slate-50 border-b border-slate-100"><h3 className="font-black text-slate-800 uppercase tracking-tight">Riwayat Absensi Karyawan Terkini</h3></div>
                       <div className="flex-1 overflow-y-auto custom-scrollbar p-0 min-h-[400px]">
                           <table className="w-full text-left whitespace-nowrap">
                               <thead className="bg-white border-b border-slate-100 sticky top-0 z-10 text-[10px] font-black uppercase text-slate-400">
                                   <tr>
                                       <th className="p-4">Karyawan</th>
                                       <th className="p-4">Waktu</th>
                                       <th className="p-4">Status</th>
                                       {(activeRole === 'SUPER_ADMIN' || activeRole === 'FINANCE') && (
                                           <th className="p-4 text-center">Data Validasi</th>
                                       )}
                                   </tr>
                               </thead>
                               <tbody className="divide-y divide-slate-50">
                                   {absensiData.sort((a,b) => (b.timestamp || 0) - (a.timestamp || 0)).slice(0, 50).map((absen, i) => (
                                       <tr key={i} className="hover:bg-slate-50/50">
                                           <td className="p-4">
                                              <p className="text-xs font-black text-slate-800">{absen["Nama Karyawan"]}</p>
                                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{absen["Role"]}</p>
                                           </td>
                                           <td className="p-4">
                                              <p className="text-xs font-bold text-slate-600">{absen["Waktu"]}</p>
                                              <p className="text-[9px] font-bold text-slate-400">{absen["Tanggal"]}</p>
                                           </td>
                                           <td className="p-4">
                                              <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg ${absen["Status Absen"] === 'Masuk' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>{absen["Status Absen"]}</span>
                                           </td>
                                           {(activeRole === 'SUPER_ADMIN' || activeRole === 'FINANCE') && (
                                              <td className="p-4 flex items-center justify-center gap-3">
                                                 <a href={`https://www.google.com/maps/search/?api=1&query=${absen["Lokasi GPS"]}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 border border-transparent transition-colors" title="Buka Kordinat GPS di Maps"><MapPin size={16}/></a>
                                                 {absen["Foto Selfie"] && (
                                                     <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 cursor-pointer hover:scale-[3] transition-transform origin-right shadow-sm relative z-20">
                                                         {/* Dihapus transform -scale-x-100 karena foto sudah di-flip permanen saat watermark */}
                                                         <img src={absen["Foto Selfie"]} alt="Selfie" className="w-full h-full object-cover" />
                                                     </div>
                                                 )}
                                              </td>
                                           )}
                                       </tr>
                                   ))}
                                   {absensiData.length === 0 && <tr><td colSpan={(activeRole === 'SUPER_ADMIN' || activeRole === 'FINANCE') ? 4 : 3} className="p-10 text-center text-slate-400 font-bold text-sm">Belum ada karyawan yang absen.</td></tr>}
                               </tbody>
                           </table>
                       </div>
                   </div>
                </div>
            </div>
          )}

          {/* --- TAB: KANBAN KALENDER OPERASIONAL --- */}
          {isKalenderTab && kalenderViewMode === 'kanban' && (
            <div className="space-y-6 animate-in fade-in duration-500 pb-20">
                {/* Header & Control Kanban */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-5 md:p-6 rounded-[2rem] border border-slate-200 shadow-sm sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl"><Calendar size={28} className="md:w-8 md:h-8" /></div>
                       <div>
                          <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight text-slate-800">Kalender Operasional</h2>
                          <p className="text-[10px] md:text-xs font-bold text-slate-400 mt-1">Papan Kanban jadwal tim lapangan. Atur slot waktu dan pantau status pengerjaan.</p>
                       </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                       <div className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 w-full md:w-auto flex-1 md:flex-none">
                          <Calendar size={16} className="text-slate-500 flex-shrink-0" />
                          <input type="date" value={kanbanDate} onChange={(e) => setKanbanDate(e.target.value)} className="bg-transparent text-[10px] md:text-sm font-bold text-slate-700 outline-none w-full cursor-pointer" />
                       </div>
                       
                       {/* Tombol Tabel (Opsional: Sembunyikan untuk tim lapangan agar mereka murni pakai UI Kanban) */}
                       {activeRole !== 'OPS_LAPANGAN' && (
                         <>
                           <button onClick={handleCopyBookingLink} className="p-3 bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-600 rounded-2xl transition-colors font-bold shadow-sm border border-fuchsia-200" title="Salin Link Booking untuk Customer"><Share2 size={20}/></button>
                           <button onClick={() => setKalenderViewMode('table')} className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl transition-colors font-bold shadow-sm border border-slate-200" title="Buka Mode Tabel / Excel"><TableIcon size={20}/></button>
                         </>
                       )}
                       
                       {activeRole !== 'OPS_LAPANGAN' && (
                         <button onClick={() => handleQuickBooking('Tim 1', 'Jadwal 1')} className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl font-black shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 whitespace-nowrap text-[10px] md:text-sm"><PlusCircle size={18}/> Booking Baru</button>
                       )}
                    </div>
                </div>

                {/* Kanban Board Layout */}
                <div className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-2 custom-scrollbar snap-x items-stretch px-2">
                   {(() => {
                       const todaysJobs = kalenderData.filter(d => {
                           const dStr = d.Tanggal;
                           if (!dStr) return false;
                           const parsed = parseSafeDateLocal(dStr);
                           if (parsed.getTime() === 0) return false;
                           const cleanDate = `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}-${String(parsed.getDate()).padStart(2, '0')}`;
                           return cleanDate === kanbanDate;
                       });
                       
                       const baseTeams = ['Tim 1', 'Tim 2', 'Tim 3', 'Tim 4', 'Tim 5'];
                       const dynamicTeams = [...new Set(todaysJobs.map(d => d["Nama Tim"] || '').filter(t => t.trim() !== '' && !baseTeams.includes(t)))];
                       const allTeams = [...baseTeams, ...dynamicTeams];

                       const isOps = activeRole === 'OPS_LAPANGAN';

                       return allTeams.map((teamName, idx) => {
                           const teamJobs = todaysJobs.filter(d => (d["Nama Tim"] || '').trim() === teamName);
                           const slot1Job = teamJobs.find(d => String(d["Jadwal 1 atau Jadwal 2"]).toLowerCase().includes('1'));
                           const slot2Job = teamJobs.find(d => String(d["Jadwal 1 atau Jadwal 2"]).toLowerCase().includes('2'));

                           const renderCard = (job, slotTitle, slotValue) => {
                               // KONDISI 1: JIKA SLOT KOSONG
                               if (!job) {
                                   return (
                                       <div onClick={() => !isOps && handleQuickBooking(teamName, slotValue)} className={`bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[1.5rem] p-5 flex flex-col items-center justify-center text-slate-400 transition-all min-h-[140px] ${!isOps ? 'hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer group' : 'cursor-not-allowed opacity-50'}`}>
                                           <p className="text-[10px] font-bold mb-1 flex items-center gap-1.5 uppercase tracking-widest"><Clock size={12}/> {slotTitle}</p>
                                           <p className="text-xs font-black group-hover:scale-105 transition-transform">Kosong (Tersedia)</p>
                                       </div>
                                   );
                               }

                               // KONDISI 2: JIKA ADA JOB (MASKING LOGIC)
                               const phoneRaw = job["Nomor telepon Customer"];
                               const phoneStr = isOps ? '*** Disensor ***' : phoneRaw;

                               return (
                                   <div className="bg-white border border-slate-200 shadow-sm rounded-[1.5rem] p-5 hover:shadow-lg hover:border-indigo-300 transition-all group flex flex-col min-h-[160px] relative">
                                       <div className="flex justify-between items-start mb-3">
                                           <p className="text-[9px] font-black uppercase tracking-widest text-indigo-600 flex items-center gap-1.5"><Clock size={12}/> {slotTitle}</p>
                                           {job["Layanan"] && <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-[8px] font-black px-2 py-1 rounded-lg whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">{job["Layanan"]}</span>}
                                       </div>
                                       
                                       <h4 className="text-sm font-black text-slate-800 mb-1 line-clamp-1" title={job["Nama Customer"]}>{job["Nama Customer"] || 'Tanpa Nama'}</h4>
                                       
                                       <div className="flex items-center justify-between mb-4">
                                          <p className="text-[10px] font-bold text-slate-500">{phoneStr}</p>
                                          {/* Tombol Klik-to-WA Khusus Admin/Owner */}
                                          {!isOps && phoneRaw && phoneRaw.length > 5 && (
                                              <a href={`https://wa.me/${phoneRaw.replace(/[^0-9]/g, '').replace(/^0/, '62')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-600 bg-emerald-50 p-1.5 rounded-lg border border-emerald-100 transition-colors" title="Hubungi via WhatsApp">
                                                 <MessageSquare size={14}/>
                                              </a>
                                          )}
                                       </div>

                                       <div className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100 flex-1">
                                           <p className="text-[10px] font-bold text-slate-600 line-clamp-3 leading-relaxed">{job["Detail Layanan"] || 'Tidak ada catatan pengerjaan.'}</p>
                                       </div>

                                       {/* Tombol Buka Rute Ramping */}
                                       {job["Alamat atau Sharelok"] ? (
                                           <a href={job["Alamat atau Sharelok"].startsWith('http') ? job["Alamat atau Sharelok"] : `https://${job["Alamat atau Sharelok"]}`} target="_blank" rel="noopener noreferrer" className="w-full bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 py-2.5 rounded-xl text-[10px] font-black flex justify-center items-center gap-2 transition-colors border border-emerald-200 mt-auto">
                                               <MapPin size={14} /> Buka Rute Lokasi
                                           </a>
                                       ) : (
                                           <p className="text-[10px] text-slate-400 font-bold text-center mt-auto py-2 bg-slate-50 rounded-xl border border-slate-100">Alamat tidak tersedia</p>
                                       )}
                                       
                                       {/* TOMBOL KERJAKAN SPK (OPSIONAL) */}
                                       {isOps && (
                                           <button onClick={() => openSpkWizard(job)} className="w-full mt-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 rounded-xl text-[10px] font-black flex justify-center items-center gap-2 shadow-lg hover:scale-[1.02] transition-all">
                                               <CheckSquare size={14} /> Mulai SPK & Inspeksi
                                           </button>
                                       )}

                                       {/* Tombol Edit Melayang */}
                                       {!isOps && (
                                          <button onClick={() => { setEditingRow(job); setIsAdding(false); }} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 bg-white p-2 rounded-xl shadow-md text-indigo-600 hover:bg-indigo-50 transition-all border border-slate-100">
                                              <Edit3 size={14} />
                                          </button>
                                       )}
                                   </div>
                               );
                           };

                           return (
                               <div key={idx} className="min-w-[280px] md:min-w-[320px] w-[280px] md:w-[320px] bg-white rounded-[2rem] border border-slate-200 shadow-sm flex flex-col snap-start shrink-0 overflow-hidden">
                                   <div className="p-4 md:p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                                       <div>
                                          <h3 className="font-black text-sm md:text-base text-slate-800 uppercase tracking-tight">{teamName}</h3>
                                          <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest line-clamp-1">{teamJobs[0]?.["Nama Operasional"] || 'Belum Ditugaskan'}</p>
                                       </div>
                                       <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-3 py-1.5 rounded-xl shadow-inner">{teamJobs.length} Job</span>
                                   </div>
                                   <div className="p-4 md:p-5 space-y-4 md:space-y-5 bg-slate-50/30 flex-1">
                                       {renderCard(slot1Job, 'Slot 10:00 Pagi', 'Jadwal 1')}
                                       {renderCard(slot2Job, 'Slot 14:00 Siang', 'Jadwal 2')}
                                       
                                       {/* Render Extra Jobs jika ada jadwal 3 dst */}
                                       {teamJobs.filter(d => !String(d["Jadwal 1 atau Jadwal 2"]).toLowerCase().includes('1') && !String(d["Jadwal 1 atau Jadwal 2"]).toLowerCase().includes('2')).map((job, jIdx) => (
                                           <div key={`extra-${jIdx}`}>
                                              {renderCard(job, job["Jadwal 1 atau Jadwal 2"] || `Ekstra ${jIdx+1}`, job["Jadwal 1 atau Jadwal 2"] || `Jadwal ${jIdx+3}`)}
                                           </div>
                                       ))}
                                   </div>
                               </div>
                           );
                       });
                   })()}
                </div>
            </div>
          )}

          {/* --- TAB: OKR CORPORATE DASHBOARD --- */}
          {isOkrTab && (
            <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
               
               {/* Corporate Header */}
               <div className="bg-slate-900 text-white p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden border border-slate-700">
                  <div className="absolute -right-20 -bottom-20 opacity-20"><Flag size={300} /></div>
                  <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                     <div>
                        <div className="flex items-center gap-3 mb-4">
                           <input type="month" value={okrPeriod} onChange={(e) => setOkrPeriod(e.target.value)} className="bg-indigo-500/20 text-white border border-indigo-400/50 px-4 py-2 rounded-xl font-black outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer" />
                           {activeRole === 'SUPER_ADMIN' && (
                               <button onClick={() => { 
                                   setTempOkrTargets(okrTargetsMap[okrPeriod] || { revTarget: 150000000, leadsTarget: 1750, salesTarget: 150000000, opsTarget: 95, hrTarget: 95, financeTarget: 95 }); 
                                   setIsEditingOkr(true); 
                               }} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors border border-white/20 shadow-sm">
                                   <Edit3 size={16} /> Setel Target
                               </button>
                           )}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">{formatIDR(okrData[0].target)}</h1>
                        <p className="text-slate-400 font-bold text-sm">Objective and Key Results (OKR) Corporate Hagia Cleaners</p>
                     </div>
                     <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl text-right">
                        <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">Status Realisasi Berjalan</p>
                        <p className="text-2xl font-black text-emerald-400">{formatIDR(okrData[0].realisasi)}</p>
                        <p className="text-xs font-bold text-slate-300 mt-1">{getOkrProgress(okrData[0].target, okrData[0].realisasi, 'higher_better').toFixed(1)}% Tercapai</p>
                     </div>
                  </div>
               </div>

               {/* Modal Edit Target OKR (Muncul saat tombol Setel Target diklik) */}
               {isEditingOkr && (
                  <div className="fixed inset-0 z-[600] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                      <div className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl">
                          <h3 className="text-xl font-black text-slate-800 mb-6 border-b border-slate-100 pb-4">Setel Target OKR - Periode Bulan {okrPeriod}</h3>
                          <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
                              <div><label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target Revenue Utama (Rp)</label><input type="number" value={tempOkrTargets.revTarget} onChange={e => setTempOkrTargets({...tempOkrTargets, revTarget: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl mt-1.5 font-black text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></div>
                              <div><label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target Leads Marketing (Angka)</label><input type="number" value={tempOkrTargets.leadsTarget} onChange={e => setTempOkrTargets({...tempOkrTargets, leadsTarget: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl mt-1.5 font-black text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></div>
                              <div><label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target Sales CS (Rp)</label><input type="number" value={tempOkrTargets.salesTarget} onChange={e => setTempOkrTargets({...tempOkrTargets, salesTarget: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl mt-1.5 font-black text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></div>
                              <div><label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target Operasional (%)</label><input type="number" value={tempOkrTargets.opsTarget} onChange={e => setTempOkrTargets({...tempOkrTargets, opsTarget: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl mt-1.5 font-black text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></div>
                              <div><label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target HRD (%)</label><input type="number" value={tempOkrTargets.hrTarget} onChange={e => setTempOkrTargets({...tempOkrTargets, hrTarget: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl mt-1.5 font-black text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></div>
                              <div><label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Target Finance (%)</label><input type="number" value={tempOkrTargets.financeTarget} onChange={e => setTempOkrTargets({...tempOkrTargets, financeTarget: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl mt-1.5 font-black text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></div>
                          </div>
                          <div className="flex gap-4 mt-8 pt-4 border-t border-slate-100">
                              <button onClick={() => setIsEditingOkr(false)} className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-colors">Batal</button>
                              <button onClick={async () => {
                                  try {
                                      const newMap = { ...okrTargetsMap, [okrPeriod]: tempOkrTargets };
                                      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'config', 'okr_targets'), { targetsMap: newMap });
                                      setOkrTargetsMap(newMap);
                                      setIsEditingOkr(false);
                                      logActivity(`Mengubah target OKR untuk periode bulan ${okrPeriod}`);
                                  } catch(err) { setErrorMsg(err.message); }
                              }} className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black shadow-md transition-colors">Simpan Target</button>
                          </div>
                      </div>
                  </div>
               )}

               {/* OKR Modules Loop */}
               <div className="space-y-6">
                  {okrData.map((okr, oIdx) => (
                     <div key={oIdx} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-200 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner border border-indigo-200">#{oIdx + 1}</div>
                              <div>
                                 <h2 className="text-lg md:text-xl font-black text-slate-800 tracking-tight">{okr.title}</h2>
                                 {okr.subTitle && <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{okr.subTitle}</p>}
                              </div>
                           </div>
                           <div className="bg-white px-5 py-2.5 rounded-2xl border border-slate-200 flex gap-6 shadow-sm">
                              <div>
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Target Utama</p>
                                 <p className="text-sm font-black text-slate-700">{formatOkrValue(okr.target, okr.format)}</p>
                              </div>
                              <div className="border-l border-slate-200 pl-6">
                                 <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Realisasi</p>
                                 <p className={`text-sm font-black ${getOkrStatus(okr.target, okr.realisasi, okr.type).color.split(' ')[0]}`}>{formatOkrValue(okr.realisasi, okr.format)}</p>
                              </div>
                           </div>
                        </div>

                        <div className="overflow-x-auto custom-scrollbar">
                           <table className="w-full text-left whitespace-nowrap">
                              <thead>
                                 <tr className="bg-white border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="p-4 pl-6 w-1/3">Key Results (Metrik Pengukur)</th>
                                    <th className="p-4 text-center bg-slate-50/50">Target</th>
                                    <th className="p-4 text-center bg-slate-50/50">Realisasi Live</th>
                                    <th className="p-4 text-center w-32">% Progress</th>
                                    <th className="p-4 pr-6 text-right">Status Evaluasi</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                 {okr.keyResults.map((kr, kIdx) => {
                                     const status = getOkrStatus(kr.target, kr.realisasi, kr.type);
                                     const pct = getOkrProgress(kr.target, kr.realisasi, kr.type);
                                     
                                     return (
                                        <tr key={kIdx} className="hover:bg-slate-50/50 transition-colors group">
                                           <td className="p-4 pl-6 text-xs font-bold text-slate-700">{kr.name}</td>
                                           <td className="p-4 text-center text-xs font-bold text-slate-500 bg-slate-50/30">{formatOkrValue(kr.target, kr.format)}</td>
                                           <td className={`p-4 text-center text-xs font-black bg-slate-50/30 ${status.color.split(' ')[0]}`}>{formatOkrValue(kr.realisasi, kr.format)}</td>
                                           <td className="p-4 text-center">
                                              <div className="flex items-center gap-2">
                                                 <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                                    <div className={`h-full rounded-full ${status.bar}`} style={{ width: `${Math.min(pct, 100)}%` }}></div>
                                                 </div>
                                                 <span className="text-[10px] font-black text-slate-600 min-w-[35px] text-right">{pct.toFixed(1)}%</span>
                                              </div>
                                           </td>
                                           <td className="p-4 pr-6 text-right">
                                              <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg border ${status.color}`}>
                                                 {status.text}
                                              </span>
                                           </td>
                                        </tr>
                                     );
                                 })}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  ))}
               </div>

            </div>
          )}

          {/* --- TAB: ALL DATABASES (IKLAN, ADSET, LEADS, CLOSING) --- */}
          {isTableTab && (
            <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500 relative">
               
               {/* FITUR BARU: LIVE SHEETS SMART SYNC */}
               <div className="bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] p-2.5 md:p-3 flex flex-col md:flex-row items-center gap-3 shadow-lg border border-slate-700 mb-2 mt-4 md:mt-2">
                  <div className="flex items-center gap-2 px-3 text-emerald-400 font-black text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap self-start md:self-auto pt-1 md:pt-0">
                     <TableIcon size={16} /> Live Sheets Sync
                  </div>
                  <input 
                     type="text" 
                     placeholder="Tempel Link Google Sheets Anda di sini..." 
                     value={syncUrl}
                     onChange={e => setSyncUrl(e.target.value)}
                     className="flex-1 bg-slate-800 border border-slate-600/50 text-white px-4 md:px-5 py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 w-full placeholder-slate-500 transition-all" 
                  />
                  <button 
                     onClick={handleSmartSync}
                     className="bg-white/10 hover:bg-emerald-600 border border-white/10 hover:border-emerald-500 text-white px-5 py-3 rounded-xl md:rounded-2xl font-black flex items-center justify-center gap-2 transition-all w-full md:w-auto text-[10px] md:text-xs tracking-wider uppercase shadow-sm active:scale-95"
                  >
                     <RefreshCw size={16} /> Smart Auto-Sync
                  </button>
               </div>

               <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-4 md:mb-6 gap-4">
                  <div className="flex flex-wrap gap-2 md:gap-3 w-full xl:w-auto">
                    <button onClick={createEmptyRow} className="bg-indigo-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black shadow-lg hover:scale-105 transition-all flex items-center gap-2 text-[10px] md:text-sm"><PlusCircle size={16} /> Baris Baru</button>
                    
                    {/* TOMBOL KANBAN SWITCH */}
                    {isKalenderTab && (
                       <button onClick={() => setKalenderViewMode('kanban')} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black shadow-lg shadow-indigo-300/40 hover:scale-105 transition-all flex items-center gap-2 text-[10px] md:text-sm">
                          <Calendar size={16} /> Buka Papan Visual (Kanban)
                       </button>
                    )}

                    {/* TOMBOL UNDO / REDO */}
                    <div className="flex bg-slate-200 p-1 rounded-xl md:rounded-2xl gap-1">
                       <button disabled={undoStack.length===0} onClick={handleUndo} className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl font-black flex items-center gap-1.5 transition-all text-[10px] md:text-sm ${undoStack.length>0 ? 'bg-white text-indigo-600 shadow-sm hover:bg-indigo-50' : 'text-slate-400 opacity-50 cursor-not-allowed'}`}><Undo2 size={14}/> Undo</button>
                       <button disabled={redoStack.length===0} onClick={handleRedo} className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl font-black flex items-center gap-1.5 transition-all text-[10px] md:text-sm ${redoStack.length>0 ? 'bg-white text-indigo-600 shadow-sm hover:bg-indigo-50' : 'text-slate-400 opacity-50 cursor-not-allowed'}`}><Redo2 size={14}/> Redo</button>
                    </div>

                    <button onClick={() => setShowPasteModal(true)} className="bg-white text-indigo-600 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black border border-slate-200 flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm text-[10px] md:text-sm"><ClipboardPaste size={16}/> Paste Excel</button>

                    {Object.keys(columnFilters).length > 0 && (
                       <button onClick={() => updateFiltersAndLog({}, "Mereset semua filter pada tabel")} className="bg-amber-50 text-amber-600 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black border border-amber-200 flex items-center gap-2 hover:bg-amber-100 transition-all shadow-sm text-[10px] md:text-sm"><Filter size={16}/> Hapus Filter</button>
                    )}

                    {selectedRows.length > 0 && (
                      <>
                        <button onClick={handleApplyFormulasToSelected} className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black shadow-lg hover:scale-105 transition-all flex items-center gap-2 text-[10px] md:text-sm"><Wand2 size={16} /> Kalkulasi ({selectedRows.length})</button>
                        <button onClick={deleteSelected} className="bg-rose-50 text-rose-600 px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black border border-rose-200 flex items-center gap-2 hover:bg-rose-100 transition-all text-[10px] md:text-sm"><Trash2 size={16} /> Hapus ({selectedRows.length})</button>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2 w-full xl:w-auto justify-end">
                     <label className="bg-emerald-50 text-emerald-700 px-4 md:px-5 py-2.5 md:py-2.5 rounded-xl md:rounded-2xl font-black cursor-pointer flex items-center gap-2 transition-all hover:bg-emerald-100 shadow-sm text-[10px] md:text-sm"><Upload size={14}/> Impor<input type="file" className="hidden" accept=".xlsx" onChange={(e) => handleUpload(e, 'excel')} /></label>
                     <button onClick={() => handleExport('excel')} className="bg-white text-slate-700 px-4 md:px-5 py-2.5 md:py-2.5 rounded-xl md:rounded-2xl font-black flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm text-[10px] md:text-sm"><Download size={14}/> Ekspor</button>
                  </div>
               </div>

               <div className={`bg-white rounded-[1.5rem] md:rounded-[2rem] border shadow-xl flex flex-col h-[70vh] md:h-[75vh] relative overflow-hidden transition-colors duration-500 ${highlightedFilter ? 'border-indigo-400 shadow-indigo-100' : 'border-slate-200'}`}>
                  <div className="overflow-auto flex-1 custom-scrollbar">
                     <table className="w-full text-left border-separate border-spacing-0 min-w-max">
                        <thead className="bg-slate-50/90 backdrop-blur-md z-20">
                           <tr>
                              <th className="px-4 md:px-6 py-3 md:py-4 border-b border-slate-200 w-10 md:w-12 text-center border-r sticky top-0 bg-slate-50 z-30"><input type="checkbox" className="w-4 h-4 md:w-5 md:h-5 rounded border-slate-300 text-indigo-600 cursor-pointer" onChange={(e) => setSelectedRows(e.target.checked ? getCurrentProcessedData().map(r => r.id) : [])} /></th>
                              {tableHeaders.map((h, i) => (
                                <th key={`${h}-${i}`} className={`border-b border-r hover:bg-indigo-50/50 transition-colors select-none min-w-[120px] md:min-w-[150px] sticky top-0 bg-slate-50 z-20 ${highlightedFilter === h ? 'border-indigo-300 bg-indigo-50/80 shadow-[inset_0_-2px_0_rgba(99,102,241,1)]' : 'border-slate-200'}`}>
                                  <div className={`px-3 md:px-5 py-2 md:py-3 flex items-center justify-between gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-colors group ${highlightedFilter === h ? 'text-indigo-700' : 'text-slate-500 hover:text-indigo-600'}`}>
                                     <div className="flex-1 cursor-pointer flex items-center gap-1.5 overflow-hidden" onClick={() => openFilterModal(h)}>
                                        <span className="truncate">{h}</span>
                                        <div className={`flex items-center gap-1.5 ${columnFilters[h] || highlightedFilter === h ? 'text-indigo-600' : 'text-slate-300 group-hover:text-indigo-500'}`}>
                                           {columnFilters[h] && <Filter size={12} className="text-indigo-600 md:w-[14px] md:h-[14px]" fill="currentColor" />}
                                           {sortConfig?.key === h ? (sortConfig.direction === 'ascending' ? <ChevronUp size={14} className="text-indigo-600 md:w-4 md:h-4"/> : <ChevronDown size={14} className="text-indigo-600 md:w-4 md:h-4"/>) : <ListFilter size={12} className="opacity-0 group-hover:opacity-100 md:w-[14px] md:h-[14px]" />}
                                        </div>
                                     </div>
                                     <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                                        <button onClick={(e) => { e.stopPropagation(); setColManager({ isOpen: true, type: 'rename', targetCol: h, newName: h, position: 'right' }); }} className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-indigo-600" title="Ubah Nama Kolom"><Edit3 size={12} /></button>
                                        <button onClick={(e) => { e.stopPropagation(); setColManager({ isOpen: true, type: 'add', targetCol: h, newName: '', position: 'right' }); }} className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-emerald-600" title="Tambah Kolom"><PlusCircle size={12} /></button>
                                     </div>
                                  </div>
                                  <div className="px-3 md:px-5 pb-2 md:pb-3">
                                     <select value={tableColFormats[h] || 'text'} onChange={(e) => setTableColFormats({...tableColFormats, [h]: e.target.value})} className={`w-full text-[8px] md:text-[9px] border rounded-md md:rounded-lg px-1.5 md:px-2 py-1 md:py-1.5 font-bold outline-none cursor-pointer focus:ring-2 focus:ring-indigo-100 transition-all ${highlightedFilter === h ? 'bg-white border-indigo-200 text-indigo-700' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                                        <option value="text">Teks</option>
                                        <option value="number">Angka</option>
                                        <option value="currency">Rupiah</option>
                                        <option value="percent">Persen</option>
                                        <option value="phone">Nomor HP</option>
                                        <option value="link">Link (URL)</option>
                                        <option value="badge">Status (Badge)</option>
                                        <option value="dropdown">Dropdown (Teks)</option>
                                        <option value="boolean">Ya/Tidak</option>
                                        <option value="date">Tanggal</option>
                                     </select>
                                  </div>
                                </th>
                              ))}
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                           {loading && adsData.length === 0 ? (
                              <tr><td colSpan={tableHeaders.length + 1} className="py-40"><Loader2 className="animate-spin text-indigo-600 mx-auto" size={40}/></td></tr>
                           ) : getCurrentProcessedData().length === 0 ? (
                              <tr><td colSpan={tableHeaders.length + 1} className="py-40 text-center text-slate-400 font-bold italic text-base md:text-xl">Data kosong atau tidak ditemukan.</td></tr>
                           ) : getCurrentProcessedData().map((row) => (
                              <tr key={row.id} className={`${selectedRows.includes(row.id) ? 'bg-amber-50' : highlightedFilter ? 'bg-indigo-50/20 hover:bg-indigo-50/60' : 'hover:bg-slate-50/50'} transition-colors`}>
                                 <td className="px-4 md:px-6 py-2 md:py-3 border-b border-slate-100 text-center border-r"><input type="checkbox" className="w-4 h-4 md:w-5 md:h-5 rounded border-slate-300 text-indigo-600 cursor-pointer" checked={selectedRows.includes(row.id)} onChange={() => setSelectedRows(p => p.includes(row.id) ? p.filter(id => id !== row.id) : [...p, row.id])} /></td>
                                 {tableHeaders.map((h, i) => (
                                    <td key={`${h}-${i}`} onDoubleClick={() => handleCellDoubleClick(row, h)} className={`px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm border-b border-r whitespace-nowrap cursor-cell hover:bg-indigo-50/50 transition-colors ${highlightedFilter === h ? 'border-indigo-100 bg-indigo-50/30' : 'border-slate-50'} ${h === 'Tanggal' ? 'text-indigo-600 font-black' : 'text-slate-600 font-medium'}`}>
                                       {editCell.rowId === row.id && editCell.header === h ? (
                                         tableColFormats[h] === 'dropdown' || tableColFormats[h] === 'badge' || tableColFormats[h] === 'boolean' ? (
                                            <select autoFocus className="w-full px-2 md:px-3 py-1 md:py-1.5 -mx-2 md:-mx-3 -my-1 md:-my-1.5 bg-white border-2 border-indigo-500 rounded-lg shadow-lg outline-none font-bold text-indigo-900 text-xs md:text-sm" value={editValue} onChange={(e) => setEditValue(e.target.value)} onBlur={() => saveInlineEdit(row.id, h)} onKeyDown={(e) => { if (e.key === 'Enter') saveInlineEdit(row.id, h); if (e.key === 'Escape') setEditCell({rowId: null, header: null}); }}>
                                               <option value="">-- Pilih / Kosong --</option>
                                               {tableColFormats[h] === 'boolean' ? (
                                                  <>
                                                    <option value="TRUE">Ya / True</option>
                                                    <option value="FALSE">Tidak / False</option>
                                                  </>
                                               ) : (
                                                  [...new Set(getCurrentDataList().map(r => r[h]).filter(Boolean))].map(opt => <option key={opt} value={opt}>{opt}</option>)
                                               )}
                                            </select>
                                         ) : (
                                            <input autoFocus className="w-full px-2 md:px-3 py-1 md:py-1.5 -mx-2 md:-mx-3 -my-1 md:-my-1.5 bg-white border-2 border-indigo-500 rounded-lg shadow-lg outline-none font-bold text-indigo-900 text-xs md:text-sm" value={editValue} onChange={(e) => setEditValue(e.target.value)} onBlur={() => saveInlineEdit(row.id, h)} onKeyDown={(e) => { if (e.key === 'Enter') saveInlineEdit(row.id, h); if (e.key === 'Escape') setEditCell({rowId: null, header: null}); }} />
                                         )
                                       ) : ( 
                                          renderMaskedCell(row[h], tableColFormats[h], h) 
                                       )}
                                    </td>
                                 ))}
                              </tr>
                           ))}
                        </tbody>
                        {/* Baris Total / Rata-Rata Dinamis */}
                        {!loading && getCurrentProcessedData().length > 0 && (
                           <tfoot className="bg-slate-200/95 backdrop-blur-md sticky bottom-0 z-30 shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.1)]">
                              <tr>
                                 <td className="px-4 md:px-6 py-3 md:py-4 border-t-2 border-slate-300 text-center border-r font-black text-slate-800">Σ</td>
                                 {tableHeaders.map((h, i) => {
                                     const format = tableColFormats[h];
                                     const isTextLike = format === 'text' || format === 'phone' || h.toLowerCase().includes('tanggal');
                                     let val = "-";
                                     
                                     if (!isTextLike) {
                                         val = getColumnTotal(h, getCurrentProcessedData(), format);
                                     } else if (i === 0) {
                                         val = "TOTAL RANGKUMAN";
                                     }
                                     
                                     return (
                                         <td key={`total-${i}`} className={`px-4 md:px-6 py-3 md:py-4 border-t-2 border-r border-slate-300 font-black whitespace-nowrap text-xs md:text-sm ${val !== '-' ? 'text-indigo-700' : 'text-slate-500'}`}>
                                            {val}
                                         </td>
                                     )
                                 })}
                              </tr>
                           </tfoot>
                        )}
                     </table>
                  </div>
               </div>
            </div>
          )}

          {/* --- TAB: NEW FULL SYSTEM BACKUP --- */}
          {activeTab === 'system' && (
            <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-20">
               <div className="flex items-center gap-4 bg-white p-5 md:p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 text-rose-50 opacity-50"><Database size={200}/></div>
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg relative z-10"><Database size={24} className="md:w-7 md:h-7"/></div>
                  <div className="relative z-10">
                     <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight text-slate-800">Pusat Kontrol Sistem</h2>
                     <p className="text-[10px] md:text-sm font-bold text-slate-400">Backup, Restore, atau Bersihkan Database secara menyeluruh dalam satu klik.</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* Backup Card */}
                  <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col h-full hover:border-indigo-300 transition-all group relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                     <div className="flex-1">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform"><HardDriveDownload size={20} className="md:w-6 md:h-6"/></div>
                        <h3 className="text-lg md:text-xl font-black text-slate-800 mb-2">Download Full Backup</h3>
                        <p className="text-xs md:text-sm font-medium text-slate-500 leading-relaxed mb-6">Mengunduh <strong>seluruh isi dari ke-4 tabel database</strong> sekaligus. Pilih format sesuai kebutuhan Anda.</p>
                     </div>
                     <div className="flex gap-3 mt-auto">
                        <button onClick={() => handleFullBackup('json')} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-black py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-[10px] md:text-xs uppercase tracking-wider">
                           <Code2 size={14}/> Format .JSON
                        </button>
                        <button onClick={() => handleFullBackup('excel')} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 text-[10px] md:text-xs uppercase tracking-wider">
                           <TableIcon size={14}/> Format .XLSX
                        </button>
                     </div>
                  </div>

                  {/* Restore Card */}
                  <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col h-full hover:border-amber-300 transition-all group relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                     <div className="flex-1">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 md:mb-5 group-hover:scale-110 transition-transform"><HardDriveUpload size={20} className="md:w-6 md:h-6"/></div>
                        <h3 className="text-lg md:text-xl font-black text-slate-800 mb-2">Restore / Impor Massal</h3>
                        <p className="text-xs md:text-sm font-medium text-slate-500 leading-relaxed mb-6">Mengunggah file backup untuk <strong className="text-amber-600">menimpa (me-replace)</strong> seluruh data saat ini.</p>
                     </div>
                     <div className="flex gap-3 mt-auto">
                        <label className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-800 font-black py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer text-[10px] md:text-xs uppercase tracking-wider">
                           <Upload size={14}/> Dari .JSON
                           <input type="file" className="hidden" accept=".json" onChange={(e) => handleFullRestore(e, 'json')} />
                        </label>
                        <label className="flex-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-black py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer text-[10px] md:text-xs uppercase tracking-wider">
                           <Upload size={14}/> Dari .XLSX
                           <input type="file" className="hidden" accept=".xlsx" onChange={(e) => handleFullRestore(e, 'excel')} />
                        </label>
                     </div>
                  </div>
               </div>

               {/* WIPE DATA PANEL */}
               <div className="bg-white border border-rose-200 p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 shadow-sm relative overflow-hidden mt-8">
                  <div className="absolute -left-10 top-0 text-rose-50 opacity-30"><AlertCircle size={150}/></div>
                  <div className="bg-rose-100 text-rose-600 p-4 rounded-full flex-shrink-0 relative z-10">
                     <Trash2 size={32} />
                  </div>
                  <div className="flex-1 text-center md:text-left relative z-10">
                     <h3 className="text-lg md:text-xl font-black text-rose-700 uppercase tracking-tight mb-1">Reset Kosong Total</h3>
                     <p className="text-xs md:text-sm font-medium text-slate-600 leading-relaxed max-w-2xl">
                        Tindakan ini akan <strong>menghapus seluruh rekaman data</strong> dari semua tabel tanpa terkecuali, mengembalikan aplikasi ke kondisi bersih seperti baru diinstal. Pastikan Anda sudah mendownload Backup Excel/JSON sebelum memencet tombol ini.
                     </p>
                  </div>
                  <button onClick={handleWipeData} className="w-full md:w-auto bg-rose-600 hover:bg-rose-700 text-white font-black px-8 py-4 rounded-2xl shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-2 flex-shrink-0 relative z-10">
                     Hancurkan Data
                  </button>
               </div>
            </div>
          )}

        </div>
      </main>

      {/* NEW: POPUP PROSES UPLOAD/KALKULASI */}
      {uploadState.isUploading && (
         <div className="fixed inset-0 z-[400] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-10 max-w-xs md:max-w-sm w-full flex flex-col items-center text-center transform scale-100">
               <Loader2 className="animate-spin text-indigo-600 mb-4 md:mb-6 md:w-14 md:h-14" size={40} />
               <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-2">Memproses Data</h3>
               <p className="text-sm font-bold text-slate-400 mb-6 px-4">Jangan tutup atau me-refresh halaman ini selama proses berjalan.</p>
               
               <div className="w-full bg-slate-100 rounded-full h-4 mb-4 overflow-hidden shadow-inner border border-slate-200">
                  <div className="bg-gradient-to-r from-indigo-500 to-violet-600 h-full rounded-full transition-all duration-300" style={{ width: `${uploadState.progress}%` }}></div>
               </div>
               <div className="flex justify-between items-end w-full px-2">
                  <p className="text-indigo-600 font-black text-2xl drop-shadow-sm">{uploadState.progress}%</p>
                  <div className="text-right">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{uploadState.timeLeft}</p>
                     {uploadState.rowCount > 0 && <p className="text-xs font-bold text-indigo-500 mt-1">Mengonversi {uploadState.rowCount} baris...</p>}
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* Paste Modal */}
      {showPasteModal && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
           <div className="bg-white w-full max-w-4xl h-[80vh] rounded-[3rem] overflow-hidden flex flex-col shadow-2xl border border-white/10">
              <div className="p-8 bg-indigo-600 flex justify-between items-center text-white">
                 <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">Paste Data Spreadsheet</h2>
                    <p className="text-indigo-200 font-medium text-sm mt-1">Blok tabel dari Excel/Google Sheets (termasuk baris Header/Judul), lalu paste di bawah.</p>
                 </div>
                 <button onClick={() => setShowPasteModal(false)} className="p-3 hover:bg-white/20 rounded-full transition-all"><X size={32} /></button>
              </div>
              <div className="p-8 flex-1 bg-slate-50 flex flex-col">
                 <textarea 
                   className="w-full flex-1 p-6 border-2 border-indigo-200 rounded-2xl outline-none focus:border-indigo-500 font-mono text-sm whitespace-pre overflow-auto shadow-inner"
                   placeholder="Contoh:&#10;Tanggal&#9;Biaya Iklan&#9;Impresi&#10;2024-10-01&#9;500000&#9;15000&#10;..."
                   value={pasteInput}
                   onChange={e => setPasteInput(e.target.value)}
                 ></textarea>
              </div>
              <div className="p-6 bg-white border-t border-slate-100 flex gap-4">
                 <button onClick={handleProcessPaste} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-indigo-700 transition-all uppercase">Proses & Impor Data</button>
                 <button onClick={() => setShowPasteModal(false)} className="px-10 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-lg hover:bg-slate-200 transition-all">Batal</button>
              </div>
           </div>
        </div>
      )}

      {/* Modal Edit / Tambah */}
      {(editingRow || isAdding) && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
           <div className="bg-white w-full max-w-7xl h-[95vh] rounded-[4rem] overflow-hidden flex flex-col shadow-2xl border border-white/10">
              <div className="p-10 bg-slate-900 flex justify-between items-center text-white"><h2 className="text-3xl font-black uppercase tracking-tight">{editingRow?.id ? 'Edit Data Record' : 'Tambah Baru'}</h2><button onClick={() => { setEditingRow(null); setIsAdding(false); }} className="p-4 hover:bg-white/10 rounded-full transition-all"><X size={40} /></button></div>
              <form onSubmit={saveEdit} className="p-12 overflow-y-auto flex-1 bg-slate-50 custom-scrollbar"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{tableHeaders.map(h => (<div key={h} className="group"><label className="text-[10px] font-black text-slate-400 uppercase mb-3 block group-focus-within:text-indigo-600 transition-colors">{h}</label><input type="text" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl font-bold shadow-sm outline-none focus:ring-4 focus:ring-indigo-100 transition-all" value={editingRow ? (editingRow[h] || '') : ''} onChange={e => setEditingRow({...editingRow, [h]: e.target.value})} /></div>))}</div><div className="mt-16 flex gap-6 sticky bottom-0 pt-10 pb-4 bg-slate-50 border-t border-slate-100"><button type="submit" className="flex-1 bg-indigo-600 text-white py-6 rounded-3xl font-black text-2xl shadow-2xl shadow-indigo-600/40 hover:scale-[1.01] active:scale-95 transition-all uppercase tracking-wide">Simpan Perubahan</button><button type="button" onClick={() => { setEditingRow(null); setIsAdding(false); }} className="px-20 py-6 bg-white border-2 border-slate-100 rounded-3xl font-black text-lg text-slate-400 transition-all hover:bg-slate-50">Batal</button></div></form>
           </div>
        </div>
      )}

      {/* Custom Dialog */}
      {dialog.isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
              <AlertCircle className={dialog.type === 'alert' ? "text-indigo-500" : "text-amber-500"} size={28} />
              <h3 className="font-black text-lg text-slate-800 uppercase tracking-tight">{dialog.type === 'alert' ? 'Notifikasi' : 'Konfirmasi'}</h3>
            </div>
            <div className="p-6"><p className="text-slate-600 font-medium leading-relaxed">{dialog.message}</p></div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
              {dialog.type === 'confirm' && (<button onClick={() => setDialog({ isOpen: false })} className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-colors">Batal</button>)}
              <button onClick={() => { if (dialog.onConfirm) dialog.onConfirm(); else setDialog({ isOpen: false }); }} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md transition-colors">{dialog.type === 'confirm' ? 'Ya, Lanjutkan' : 'Mengerti'}</button>
            </div>
          </div>
        </div>
      )}

      {/* --- COLUMN MANAGER MODAL (ADD & RENAME) --- */}
      {colManager.isOpen && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
           <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden flex flex-col border border-white/20">
              <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${colManager.type === 'rename' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                       {colManager.type === 'rename' ? <Edit3 size={20}/> : <PlusCircle size={20}/>}
                    </div>
                    <h3 className="font-black text-lg text-slate-800 uppercase tracking-tight">
                       {colManager.type === 'rename' ? 'Ubah Nama Kolom' : 'Tambah Kolom Baru'}
                    </h3>
                 </div>
                 <button onClick={() => setColManager({ ...colManager, isOpen: false })} className="p-2 hover:bg-slate-200 rounded-full text-slate-400"><X size={18}/></button>
              </div>
              
              <div className="p-6 space-y-4">
                 {colManager.type === 'rename' && (
                    <div className="bg-amber-50 text-amber-700 p-3.5 rounded-xl text-xs font-bold border border-amber-200 flex gap-3">
                       <AlertCircle size={20} className="shrink-0 mt-0.5" />
                       <p className="leading-relaxed"><strong>Peringatan:</strong> Mengubah nama kolom bawaan sistem (seperti Tanggal, Sales, Biaya) dapat menyebabkan error pada grafik Analisa Dashboard dan Kalkulasi Rumus.</p>
                    </div>
                 )}

                 {colManager.type === 'add' && (
                    <div>
                       <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2">Posisi Kolom Baru</label>
                       <div className="flex bg-slate-100 p-1.5 rounded-xl gap-1.5">
                          <button onClick={() => setColManager({...colManager, position: 'left'})} className={`flex-1 py-2 text-xs font-black rounded-lg transition-all shadow-sm ${colManager.position === 'left' ? 'bg-white text-indigo-600 border border-slate-200' : 'text-slate-400 border border-transparent'}`}>Di Kiri (Sebelum)</button>
                          <button onClick={() => setColManager({...colManager, position: 'right'})} className={`flex-1 py-2 text-xs font-black rounded-lg transition-all shadow-sm ${colManager.position === 'right' ? 'bg-white text-indigo-600 border border-slate-200' : 'text-slate-400 border border-transparent'}`}>Di Kanan (Sesudah)</button>
                       </div>
                    </div>
                 )}

                 <div>
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2">Nama Kolom</label>
                    <input type="text" autoFocus value={colManager.newName} onChange={e => setColManager({...colManager, newName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold text-sm text-slate-800 outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all" placeholder="Masukkan nama kolom..." onKeyDown={e => e.key === 'Enter' && executeColAction()} />
                 </div>
              </div>

              <div className="p-5 bg-slate-50 border-t border-slate-100 flex gap-3">
                 <button onClick={() => setColManager({ ...colManager, isOpen: false })} className="flex-1 py-3.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl font-bold transition-colors shadow-sm">Batal</button>
                 <button onClick={executeColAction} className={`flex-1 py-3.5 text-white rounded-xl font-black shadow-md transition-all hover:-translate-y-0.5 ${colManager.type === 'rename' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'}`}>Simpan Kolom</button>
              </div>
           </div>
        </div>
      )}

      {/* --- GEMINI AI ASSISTANT MODAL --- */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-[450] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-in fade-in zoom-in duration-300">
           <div className="bg-white w-full max-w-4xl h-[85vh] md:h-[80vh] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden flex flex-col shadow-2xl border border-white/20 relative">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-100 rounded-full blur-3xl opacity-50 pointer-events-none -z-10"></div>
              
              {/* Modal Header */}
              <div className="p-6 md:p-8 bg-slate-900 text-white flex justify-between items-center z-10 shrink-0 border-b border-slate-800">
                 <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-fuchsia-500 to-indigo-600 p-3 rounded-2xl shadow-inner border border-white/10"><Wand2 size={24} className="text-white" /></div>
                    <div>
                       <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Hagia ✨ AI Assistant</h2>
                       <p className="text-[10px] md:text-xs font-medium text-slate-400 mt-1">Ditenagai oleh Gemini API untuk analisa cerdas & copywriting.</p>
                    </div>
                 </div>
                 <button onClick={() => setIsAiModalOpen(false)} className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-sm"><X size={20} /></button>
              </div>

              <div className="flex flex-col md:flex-row flex-1 overflow-hidden z-10">
                 {/* Sidebar AI Menu */}
                 <div className="w-full md:w-64 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 p-4 md:p-6 flex flex-row md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-y-auto shrink-0 custom-scrollbar shadow-inner md:shadow-none">
                    <button onClick={() => setAiActiveTab('analisa')} className={`flex items-center gap-3 px-4 py-3 md:py-4 rounded-2xl font-black text-[10px] md:text-xs transition-all whitespace-nowrap ${aiActiveTab === 'analisa' ? 'bg-indigo-100 text-indigo-700 shadow-inner border border-indigo-200' : 'bg-white text-slate-500 hover:bg-slate-100 border border-transparent hover:border-slate-200'}`}>
                       <BarChart3 size={16} className={aiActiveTab === 'analisa' ? "text-indigo-600" : ""} /> Analisa Data Pintar
                    </button>
                    <button onClick={() => setAiActiveTab('copywriter')} className={`flex items-center gap-3 px-4 py-3 md:py-4 rounded-2xl font-black text-[10px] md:text-xs transition-all whitespace-nowrap ${aiActiveTab === 'copywriter' ? 'bg-fuchsia-100 text-fuchsia-700 shadow-inner border border-fuchsia-200' : 'bg-white text-slate-500 hover:bg-slate-100 border border-transparent hover:border-slate-200'}`}>
                       <Megaphone size={16} className={aiActiveTab === 'copywriter' ? "text-fuchsia-600" : ""} /> Buat Promo (Blast)
                    </button>
                    <button onClick={() => setAiActiveTab('cs')} className={`flex items-center gap-3 px-4 py-3 md:py-4 rounded-2xl font-black text-[10px] md:text-xs transition-all whitespace-nowrap ${aiActiveTab === 'cs' ? 'bg-emerald-100 text-emerald-700 shadow-inner border border-emerald-200' : 'bg-white text-slate-500 hover:bg-slate-100 border border-transparent hover:border-slate-200'}`}>
                       <Headset size={16} className={aiActiveTab === 'cs' ? "text-emerald-600" : ""} /> Skrip Balasan CS
                    </button>
                 </div>

                 {/* Content Area AI */}
                 <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto bg-white custom-scrollbar">
                    
                    {/* Inputs */}
                    <div className="mb-6 md:mb-8 shrink-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                       {aiActiveTab === 'analisa' && (
                          <div className="bg-indigo-50 border border-indigo-100 p-5 md:p-6 rounded-2xl text-sm font-medium text-indigo-800 flex items-start gap-4">
                             <div className="bg-indigo-200/50 p-2 rounded-xl mt-1"><BrainCircuit size={24} className="text-indigo-600"/></div>
                             <div>
                               <p className="font-black text-indigo-900 mb-1.5 uppercase tracking-widest text-xs">Akses Modul Analisa Data AI</p>
                               <p className="text-xs leading-relaxed opacity-90">Gemini AI akan memindai omzet, ROAS, beban iklan, dan metrik di Dashboard Anda sesuai <strong>filter tanggal saat ini</strong>. Tekan tombol di bawah untuk mendapatkan rekomendasi instan untuk bisnis Anda.</p>
                             </div>
                          </div>
                       )}
                       
                       {aiActiveTab === 'copywriter' && (
                          <div className="space-y-4">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <div>
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block flex items-center gap-1.5"><List size={12}/> Layanan yang Ditawarkan</label>
                                 <input type="text" value={aiInputData.layanan} onChange={e => setAiInputData({...aiInputData, layanan: e.target.value})} placeholder="Contoh: Cuci Kasur Springbed & Sofa" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-bold text-xs outline-none focus:border-fuchsia-400 focus:bg-white focus:ring-4 focus:ring-fuchsia-50 transition-all text-slate-800" />
                               </div>
                               <div>
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block flex items-center gap-1.5"><Users size={12}/> Target Audiens / Segmen</label>
                                 <input type="text" value={aiInputData.audiens} onChange={e => setAiInputData({...aiInputData, audiens: e.target.value})} placeholder="Contoh: Ibu Rumah Tangga Jabodetabek" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-bold text-xs outline-none focus:border-fuchsia-400 focus:bg-white focus:ring-4 focus:ring-fuchsia-50 transition-all text-slate-800" />
                               </div>
                             </div>
                             <div>
                               <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block flex items-center gap-1.5"><Target size={12}/> Promo / Penawaran (Diskon, dsb)</label>
                               <input type="text" value={aiInputData.promo} onChange={e => setAiInputData({...aiInputData, promo: e.target.value})} placeholder="Contoh: Diskon 20% bulan ini, Gratis Anti Tungau" className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-bold text-xs outline-none focus:border-fuchsia-400 focus:bg-white focus:ring-4 focus:ring-fuchsia-50 transition-all text-slate-800" />
                             </div>
                          </div>
                       )}

                       {aiActiveTab === 'cs' && (
                          <div>
                             <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block flex items-center gap-1.5"><MessageSquare size={12}/> Pesan / Keluhan Customer Saat Ini</label>
                             <textarea value={aiInputData.keluhan} onChange={e => setAiInputData({...aiInputData, keluhan: e.target.value})} placeholder="Tempelkan chat dari pelanggan di sini... (Contoh: 'Wah mahal banget mas, di tempat lain cuma 100 ribu', atau 'Nanti ya mas saya tanya suami dulu...')" className="w-full h-28 bg-slate-50 border border-slate-200 p-4 rounded-2xl font-bold text-xs outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 resize-none custom-scrollbar text-slate-800 leading-relaxed" />
                          </div>
                       )}

                       <button onClick={handleRunAI} disabled={isAiLoading || (aiActiveTab !== 'analisa' && !aiInputData.layanan && !aiInputData.keluhan)} className={`mt-6 w-full py-4 md:py-4.5 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-lg uppercase tracking-widest ${isAiLoading ? 'bg-slate-200 text-slate-500 cursor-wait shadow-none' : aiActiveTab === 'copywriter' ? 'bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white hover:shadow-fuchsia-500/30 hover:-translate-y-0.5' : aiActiveTab === 'cs' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-emerald-500/30 hover:-translate-y-0.5' : 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:shadow-indigo-500/30 hover:-translate-y-0.5'}`}>
                           {isAiLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                           {isAiLoading ? 'Gemini Sedang Mengetik...' : '✨ Eksekusi dengan AI'}
                       </button>
                    </div>

                    {/* Output Area */}
                    <div className="flex-1 bg-slate-50 rounded-3xl border border-slate-200 p-5 md:p-8 overflow-y-auto custom-scrollbar relative shadow-inner group flex flex-col">
                       {aiOutput ? (
                          <>
                             <div className="flex justify-between items-center mb-4 sticky top-0 bg-slate-50/90 backdrop-blur py-2 z-10 border-b border-slate-200/50">
                                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Hasil Generasi AI</span>
                                <button onClick={() => {
                                    const textArea = document.createElement("textarea");
                                    textArea.value = aiOutput;
                                    document.body.appendChild(textArea);
                                    textArea.select();
                                    try { document.execCommand('copy'); setDialog({isOpen:true, type:'alert', message:'Hasil AI berhasil disalin ke Clipboard!'}); } 
                                    catch (err) { alert("Browser Anda memblokir fungsi copy. Silakan seleksi dan copy teks manual."); }
                                    document.body.removeChild(textArea);
                                }} className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-300 shadow-sm transition-all flex items-center gap-1.5">
                                   <Copy size={14} /> Salin Teks
                                </button>
                             </div>
                             <div className="prose prose-sm md:prose-base prose-slate prose-headings:font-black prose-a:text-indigo-600 max-w-none whitespace-pre-wrap flex-1">
                                {aiOutput.split('\n').map((line, idx) => {
                                   if (line.startsWith('**') || line.startsWith('##')) return <p key={idx} className="font-black text-slate-800 mt-5 mb-2 text-sm md:text-base leading-snug">{line.replace(/[\*#]/g, '')}</p>;
                                   if (line.startsWith('* ') || line.startsWith('- ')) return <li key={idx} className="ml-5 mb-1 text-slate-600 text-xs md:text-sm">{line.substring(2)}</li>;
                                   return <p key={idx} className="mb-2 text-slate-600 leading-relaxed text-xs md:text-sm">{line}</p>;
                                })}
                             </div>
                          </>
                       ) : (
                          <div className="h-full flex flex-col items-center justify-center text-slate-300 m-auto">
                             <BrainCircuit size={48} className="mb-4 opacity-50 text-indigo-300" />
                             <p className="font-bold text-xs md:text-sm max-w-[200px] text-center">Isi form di atas dan klik eksekusi agar AI dapat membantu pekerjaan Anda.</p>
                          </div>
                       )}
                    </div>

                 </div>
              </div>
           </div>
        </div>
      )}

      {/* FILTER & SORT MODAL (EXCEL-LIKE) */}
      {filterModalCol && (
         <div className="fixed inset-0 z-[300] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setFilterModalCol(null)}>
            <div className="bg-white rounded-[2rem] w-full max-w-sm shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
               <div className="p-5 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2"><ListFilter size={16} className="text-indigo-600"/> Sort & Filter</h3>
                    <p className="text-xs font-bold text-slate-400 mt-0.5">{filterModalCol}</p>
                  </div>
                  <button onClick={() => setFilterModalCol(null)} className="p-2 bg-white rounded-full hover:bg-slate-200 text-slate-400 transition-all"><X size={18}/></button>
               </div>

               <div className="p-5 space-y-4">
                  {/* Sorting Actions */}
                  <div className="grid grid-cols-2 gap-3">
                     <button onClick={() => { handleSort(filterModalCol, 'ascending'); setFilterModalCol(null); }} className="p-3 bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group">
                        <ArrowDown size={20} className="text-slate-400 group-hover:text-indigo-600"/>
                        <span className="text-[10px] font-black text-slate-500 group-hover:text-indigo-700 uppercase">A - Z / Terkecil</span>
                     </button>
                     <button onClick={() => { handleSort(filterModalCol, 'descending'); setFilterModalCol(null); }} className="p-3 bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group">
                        <ArrowUp size={20} className="text-slate-400 group-hover:text-indigo-600"/>
                        <span className="text-[10px] font-black text-slate-500 group-hover:text-indigo-700 uppercase">Z - A / Terbesar</span>
                     </button>
                  </div>

                  {/* Tombol hapus filter per kolom */}
                  <div className="flex gap-2">
                     <button onClick={() => { 
                        const newF = {...columnFilters}; delete newF[filterModalCol]; updateFiltersAndLog(newF, `Menghapus filter pada kolom ${filterModalCol}`); 
                        setFilterModalCol(null); 
                     }} className="flex-1 p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl text-[10px] font-black flex justify-center items-center gap-1 uppercase transition-colors"><FilterX size={14}/> Hapus Filter</button>
                     <button onClick={() => { 
                        if(sortConfig.key === filterModalCol) handleSort(filterModalCol, 'none'); 
                        setFilterModalCol(null); 
                     }} className="flex-1 p-2 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-xl text-[10px] font-black flex justify-center items-center gap-1 uppercase transition-colors"><ArrowDownUp size={14}/> Reset Sort</button>
                  </div>

                  <hr className="border-slate-100"/>

                  {/* Filter Checklist */}
                  <div className="flex flex-col h-64">
                     <div className="relative mb-3">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Cari data untuk difilter..." value={filterSearch} onChange={e => setFilterSearch(e.target.value)} className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all placeholder-slate-300" />
                     </div>
                     <div className="flex justify-between items-center mb-2 px-1">
                        <button onClick={() => setTempFilterValues(filteredUniqueValues)} className="text-[10px] font-black text-indigo-600 uppercase hover:text-indigo-800">Pilih Semua</button>
                        <button onClick={() => setTempFilterValues([])} className="text-[10px] font-black text-rose-500 uppercase hover:text-rose-700">Kosongkan</button>
                     </div>
                     <div className="flex-1 overflow-y-auto bg-slate-50 rounded-xl border border-slate-200 p-2 custom-scrollbar space-y-1">
                        {filteredUniqueValues.length === 0 ? (
                           <p className="text-xs text-center text-slate-400 font-bold p-4">Data tidak ditemukan.</p>
                        ) : (
                           filteredUniqueValues.map(val => (
                              <label key={val} className="flex items-start gap-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors border border-transparent hover:border-slate-200 hover:shadow-sm group">
                                 <div className={`w-4 h-4 rounded mt-0.5 flex-shrink-0 flex items-center justify-center border transition-all ${tempFilterValues.includes(val) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 group-hover:border-indigo-400'}`}>
                                    {tempFilterValues.includes(val) && <Check size={12} strokeWidth={4} />}
                                 </div>
                                 <input type="checkbox" className="hidden" checked={tempFilterValues.includes(val)} onChange={(e) => {
                                    if(e.target.checked) setTempFilterValues([...tempFilterValues, val]);
                                    else setTempFilterValues(tempFilterValues.filter(v => v !== val));
                                 }}/>
                                 <span className="text-xs font-bold text-slate-700 break-all">{val === '' || val === '-' ? '(Data Kosong / Blank)' : val}</span>
                              </label>
                           ))
                        )}
                     </div>
                  </div>
               </div>

               <div className="p-5 bg-white border-t border-slate-100 flex gap-3">
                  <button onClick={applyFilter} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-black text-sm shadow-md transition-all">Terapkan Filter</button>
               </div>
            </div>
         </div>
      )}

      {/* --- WIZARD SPK MOBILE (KHUSUS TIM OPERASIONAL) --- */}
      {spkWizard.isOpen && (
         <div className="fixed inset-0 z-[500] bg-slate-900 flex flex-col animate-in slide-in-from-bottom duration-300 h-[100dvh] w-full overflow-hidden font-sans">
            
            <div className="bg-indigo-600 text-white p-5 flex items-center justify-between shadow-lg shrink-0">
               <div>
                  <h2 className="text-lg font-black uppercase tracking-tight">Form SPK Digital</h2>
                  <p className="text-[10px] font-medium text-indigo-200">{spkWizard.data["Nama Customer"]}</p>
               </div>
               <button onClick={() => setSpkWizard({ isOpen: false, step: 1, job: null, data: {} })} className="p-2 bg-white/10 rounded-full"><X size={20}/></button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50 p-6 custom-scrollbar flex flex-col">
                
                {/* WIZARD STEP 1: CHECK-IN */}
                {spkWizard.step === 1 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto w-full">
                       <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner border border-blue-200">
                          <MapPin size={48} />
                       </div>
                       <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">Langkah 1: Check-In</h3>
                       <p className="text-sm font-bold text-slate-500 mb-10 leading-relaxed">Catat waktu dan lokasi tiba di rumah pelanggan untuk bukti presensi kehadiran.</p>
                       
                       <button onClick={() => {
                           const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                           setSpkWizard(p => ({...p, data: {...p.data, "Waktu Tiba di Lokasi": timeStr}}));
                           
                           if ("geolocation" in navigator) {
                               navigator.geolocation.getCurrentPosition((pos) => {
                                   setSpkWizard(p => ({...p, step: 2, data: {...p.data, "Titik Koordinat Tiba (GPS)": `${pos.coords.latitude}, ${pos.coords.longitude}`}}));
                               }, () => {
                                   setSpkWizard(p => ({...p, step: 2, data: {...p.data, "Titik Koordinat Tiba (GPS)": "Gagal dilacak"}}));
                               });
                           } else {
                               setSpkWizard(p => ({...p, step: 2, data: {...p.data, "Titik Koordinat Tiba (GPS)": "Tidak didukung"}}));
                           }
                       }} className="w-full bg-blue-600 text-white font-black text-xl py-5 rounded-[2rem] shadow-xl shadow-blue-600/30 active:scale-95 transition-transform flex items-center justify-center gap-3">
                           <Clock size={24}/> Saya Tiba di Lokasi
                       </button>
                    </div>
                )}

                {/* WIZARD STEP 2: INSPEKSI & KERJA */}
                {spkWizard.step === 2 && (
                    <div className="flex flex-col max-w-md mx-auto w-full">
                       <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-6 border-b-2 border-indigo-100 pb-3 flex items-center gap-2"><Target className="text-indigo-500"/> Langkah 2: Inspeksi Awal</h3>
                       
                       <div className="space-y-6 flex-1">
                          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Metode Pembersihan (SOP)</label>
                             <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-sm text-slate-800 outline-none" value={spkWizard.data["Metode Pembersihan"]} onChange={e => setSpkWizard(p => ({...p, data: {...p.data, "Metode Pembersihan": e.target.value}}))}>
                                <option value="">Pilih Metode Kerja...</option>
                                <option value="Wet & Dry Cleaning Vacuum">Wet & Dry Cleaning Vacuum</option>
                                <option value="Deep Cleaning (Mesin Buffing)">Deep Cleaning (Mesin Buffing)</option>
                                <option value="Daily Cleaning">Daily Cleaning</option>
                             </select>
                          </div>

                          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Kondisi Awal / Temuan</label>
                             <div className="grid grid-cols-1 gap-2">
                                {['Aman / Normal', 'Ada Noda Membandel', 'Ada Kerusakan Bawaan'].map(kondisi => (
                                    <label key={kondisi} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer font-bold text-xs transition-colors ${spkWizard.data["Kondisi Awal / Temuan"] === kondisi ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                                        <input type="radio" name="kondisi" className="hidden" checked={spkWizard.data["Kondisi Awal / Temuan"] === kondisi} onChange={() => setSpkWizard(p => ({...p, data: {...p.data, "Kondisi Awal / Temuan": kondisi}}))} />
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${spkWizard.data["Kondisi Awal / Temuan"] === kondisi ? 'border-indigo-600' : 'border-slate-300'}`}>
                                            {spkWizard.data["Kondisi Awal / Temuan"] === kondisi && <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>}
                                        </div>
                                        {kondisi}
                                    </label>
                                ))}
                             </div>
                          </div>

                          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Wajib: Foto Sebelum (Before)</label>
                             {spkWizard.data["Foto Sebelum"] ? (
                                <div className="relative rounded-xl overflow-hidden h-40 border border-slate-200">
                                   <img src={spkWizard.data["Foto Sebelum"]} alt="Before" className="w-full h-full object-cover" />
                                   <button onClick={() => setSpkWizard(p => ({...p, data: {...p.data, "Foto Sebelum": ""}}))} className="absolute top-2 right-2 bg-rose-500 text-white p-1.5 rounded-lg shadow-md"><Trash2 size={14}/></button>
                                </div>
                             ) : (
                                <label className="w-full h-24 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-colors">
                                   <Camera size={24} className="mb-2 text-indigo-500"/>
                                   <span className="text-xs font-bold">Ambil Foto Kamera</span>
                                   {/* Input file khusus mobile kamera */}
                                   <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleSpkImageUpload(e, "Foto Sebelum")} />
                                </label>
                             )}
                          </div>
                          
                          <label className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl cursor-pointer">
                              <input type="checkbox" className="w-5 h-5 mt-0.5 rounded border-amber-300 text-amber-600" id="cek_persetujuan" onChange={(e) => { document.getElementById('btn_mulai').disabled = !e.target.checked; }} />
                              <span className="text-[11px] font-bold text-amber-800 leading-relaxed">Saya menjamin bahwa pelanggan telah menyetujui kondisi awal barang sebelum dicuci.</span>
                          </label>
                       </div>

                       <div className="mt-8">
                          <button id="btn_mulai" disabled onClick={() => setSpkWizard(p => ({...p, step: 3}))} className="w-full bg-emerald-500 disabled:bg-slate-300 text-white font-black text-lg py-5 rounded-[2rem] shadow-xl disabled:shadow-none transition-all flex justify-center items-center gap-2">Mulai Dikerjakan <ChevronRight size={20}/></button>
                       </div>
                    </div>
                )}

                {/* WIZARD STEP 3: SERAH TERIMA */}
                {spkWizard.step === 3 && (
                    <div className="flex flex-col max-w-md mx-auto w-full">
                       <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-6 border-b-2 border-indigo-100 pb-3 flex items-center gap-2"><CheckSquare className="text-indigo-500"/> Langkah 3: Serah Terima</h3>
                       
                       <div className="space-y-6 flex-1">
                          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Wajib: Foto Sesudah (After)</label>
                             {spkWizard.data["Foto Sesudah"] ? (
                                <div className="relative rounded-xl overflow-hidden h-40 border border-slate-200">
                                   <img src={spkWizard.data["Foto Sesudah"]} alt="After" className="w-full h-full object-cover" />
                                   <button onClick={() => setSpkWizard(p => ({...p, data: {...p.data, "Foto Sesudah": ""}}))} className="absolute top-2 right-2 bg-rose-500 text-white p-1.5 rounded-lg shadow-md"><Trash2 size={14}/></button>
                                </div>
                             ) : (
                                <label className="w-full h-24 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-colors">
                                   <Camera size={24} className="mb-2 text-indigo-500"/>
                                   <span className="text-xs font-bold">Ambil Foto Kamera</span>
                                   <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleSpkImageUpload(e, "Foto Sesudah")} />
                                </label>
                             )}
                          </div>

                          {/* Bagian Pelanggan */}
                          <div className="bg-indigo-50 p-5 rounded-[2rem] border border-indigo-100 shadow-inner text-center mt-8 relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                             <h4 className="font-black text-indigo-900 mb-2">Penilaian Pelanggan</h4>
                             <p className="text-[10px] font-bold text-indigo-600 mb-6 px-4">"Bagaimana hasil kerja tim Hagia hari ini?"</p>
                             
                             <div className="flex justify-center gap-2 mb-8" dir="ltr">
                                 {[1,2,3,4,5].map(star => (
                                     <button key={star} onClick={() => setSpkWizard(p => ({...p, data: {...p.data, "Rating Kepuasan": `${star} Bintang`}}))} className={`transition-all transform ${String(spkWizard.data["Rating Kepuasan"]).includes(String(star)) ? 'scale-125 text-amber-500' : 'text-slate-300 hover:scale-110 hover:text-amber-300'}`}>
                                         <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                     </button>
                                 ))}
                             </div>

                             <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3 block">Mohon Tanda Tangan Anda</label>
                             <div className="bg-white rounded-xl border-2 border-dashed border-indigo-200 overflow-hidden relative" style={{height: '150px'}}>
                                 {/* Native Canvas Signature Logic */}
                                 <canvas 
                                     ref={signatureCanvasRef}
                                     width={300} height={150} 
                                     className="w-full h-full cursor-crosshair touch-none"
                                     onPointerDown={(e) => {
                                         const ctx = signatureCanvasRef.current.getContext('2d');
                                         ctx.beginPath();
                                         const rect = signatureCanvasRef.current.getBoundingClientRect();
                                         ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
                                         signatureCanvasRef.current.isDrawing = true;
                                     }}
                                     onPointerMove={(e) => {
                                         if (!signatureCanvasRef.current.isDrawing) return;
                                         const ctx = signatureCanvasRef.current.getContext('2d');
                                         const rect = signatureCanvasRef.current.getBoundingClientRect();
                                         ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
                                         ctx.stroke();
                                     }}
                                     onPointerUp={() => { signatureCanvasRef.current.isDrawing = false; }}
                                     onPointerLeave={() => { signatureCanvasRef.current.isDrawing = false; }}
                                 ></canvas>
                                 <button onClick={() => { const ctx = signatureCanvasRef.current.getContext('2d'); ctx.clearRect(0,0,300,150); }} className="absolute bottom-2 right-2 text-[9px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-bold border border-slate-200">Hapus</button>
                             </div>
                          </div>
                       </div>

                       <div className="mt-8 mb-4">
                          <button onClick={() => {
                              // Kalkulasi Waktu & Ambil Tanda Tangan
                              const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                              const tTiba = spkWizard.data["Waktu Tiba di Lokasi"];
                              let durasi = "N/A";
                              if (tTiba) {
                                  const [h1, m1] = tTiba.split(':'); const [h2, m2] = timeStr.split(':');
                                  let diffMins = (parseInt(h2)*60 + parseInt(m2)) - (parseInt(h1)*60 + parseInt(m1));
                                  if (diffMins < 0) diffMins += 24*60; // Lewat tengah malam
                                  durasi = `${Math.floor(diffMins/60)} Jam ${diffMins%60} Menit`;
                              }
                              
                              const canvasData = signatureCanvasRef.current ? signatureCanvasRef.current.toDataURL() : "";
                              
                              setSpkWizard(p => {
                                  const finalData = {...p, data: {...p.data, "Waktu Selesai Pengerjaan": timeStr, "Durasi Total Pengerjaan": durasi, "Tanda Tangan Pelanggan": canvasData}};
                                  // Eksekusi fungsi simpan setelah state terupdate secara asinkron
                                  setTimeout(() => submitSpkWizard(), 100);
                                  return finalData;
                              });
                          }} className="w-full bg-slate-900 text-white font-black text-xl py-5 rounded-[2rem] shadow-2xl hover:scale-[1.02] transition-transform flex justify-center items-center gap-2 uppercase tracking-wide">
                              <Save size={20}/> Selesai & Tutup Order
                          </button>
                       </div>
                    </div>
                )}

            </div>
         </div>
      )}

      {/* --- VISUAL AI BUILDER UI --- */}
      <div id="ai-builder-ui">
         {/* FAB Toggle */}
         <button 
           onClick={() => { setIsBuilderMode(!isBuilderMode); setSelectedTarget(null); }} 
           className={`fixed bottom-6 right-6 z-[500] p-4 md:p-5 rounded-[2rem] shadow-2xl flex items-center justify-center transition-all duration-500 transform hover:scale-110 ${isBuilderMode ? 'bg-rose-500 text-white rotate-90' : 'bg-gradient-to-br from-indigo-500 to-fuchsia-600 text-white animate-bounce'}`}
           title="Visual App Builder"
         >
           {isBuilderMode ? <X size={32} /> : <Sparkles size={32} />}
         </button>

         {/* Indicator Toast */}
         {isBuilderMode && !selectedTarget && (
           <div className="fixed bottom-24 right-6 z-[490] bg-slate-900/90 backdrop-blur-md text-white px-5 py-3.5 rounded-3xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-5 border border-white/10">
              <div className="bg-indigo-500/30 p-2 rounded-xl"><Crosshair className="text-indigo-300 animate-pulse" size={24} /></div>
              <div>
                 <p className="font-black text-sm uppercase tracking-wider text-indigo-100">Mode Builder Aktif</p>
                 <p className="text-[10px] font-medium text-slate-300 mt-0.5">Arahkan kursor dan <strong className="text-white">KLIK</strong> elemen apa saja di layar.</p>
              </div>
           </div>
         )}

         {/* Visual Builder Modal */}
         {selectedTarget && (
           <div className="fixed inset-0 z-[600] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
             <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden flex flex-col border border-white/20 relative">
                
                {/* Decorative background */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="bg-slate-900 p-6 flex justify-between items-center text-white relative z-10">
                   <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-2xl shadow-inner border border-white/20"><Crosshair size={24} /></div>
                      <div>
                        <h3 className="font-black text-lg tracking-tight uppercase">Elemen Terekam</h3>
                        <p className="text-xs font-bold text-indigo-300 font-mono mt-1">Tag: &lt;{selectedTarget.tag}&gt;</p>
                      </div>
                   </div>
                   <button onClick={() => setSelectedTarget(null)} className="p-3 hover:bg-white/20 bg-white/5 rounded-full transition-all backdrop-blur-sm"><X size={20}/></button>
                </div>
                
                <div className="p-8 bg-slate-50/80 flex-1 relative z-10 flex flex-col">
                   <div className="bg-white border border-slate-200 p-4 rounded-2xl mb-6 text-xs text-slate-600 shadow-sm flex flex-col gap-2">
                      <div className="flex gap-2 items-start">
                         <span className="font-black text-slate-800 bg-slate-100 px-2 py-1 rounded">Isi Teks:</span>
                         <span className="font-medium italic leading-relaxed mt-0.5 break-all">"{selectedTarget.text}"</span>
                      </div>
                      <div className="flex gap-2 items-start">
                         <span className="font-black text-slate-800 bg-slate-100 px-2 py-1 rounded">Class CSS:</span>
                         <span className="font-mono text-[10px] text-indigo-600 break-all mt-1">{selectedTarget.classes}</span>
                      </div>
                   </div>

                   {!generatedVisualPrompt ? (
                     <>
                       <label className="text-xs font-black uppercase tracking-widest text-slate-700 mb-3 block">Ketik Deskripsi Perubahan</label>
                       <textarea 
                         className="w-full bg-white border-2 border-slate-200 p-5 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium text-sm text-slate-800 mb-6 h-32 resize-none shadow-inner placeholder-slate-300"
                         placeholder="Contoh: Ubah warna kotak ini menjadi hijau muda, besarkan ukuran font-nya menjadi 20px, atau ubah ikonnya menjadi ikon keranjang belanja..."
                         value={builderInput}
                         onChange={e => setBuilderInput(e.target.value)}
                         autoFocus
                       />
                       
                       <div className="flex gap-3 mt-auto">
                          <button onClick={generateActionPrompt} disabled={!builderInput} className={`flex-1 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${builderInput ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30 hover:-translate-y-1' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                             <Terminal size={18} /> Generate Perintah
                          </button>
                          <button onClick={generateInstinctPrompt} className="flex-1 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:-translate-y-1 transition-all">
                             <BrainCircuit size={18} /> AI Instinct (Saran)
                          </button>
                       </div>
                     </>
                   ) : (
                     <div className="flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
                        <div className="flex items-center justify-between mb-4">
                           <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2"><CheckCircle size={14}/> Prompt Berhasil Dibuat</span>
                           <button onClick={copyVisualPrompt} className={`px-5 py-2.5 rounded-xl text-[10px] font-black flex items-center gap-2 transition-all shadow-sm ${isCopiedPrompt ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                              {isCopiedPrompt ? 'Berhasil Disalin!' : <><Copy size={14}/> Salin Text</>}
                           </button>
                        </div>
                        <textarea readOnly value={generatedVisualPrompt} className="w-full flex-1 bg-slate-900 text-emerald-300 border-none p-5 rounded-2xl outline-none font-mono text-xs mb-5 min-h-[180px] shadow-inner leading-relaxed custom-scrollbar" />
                        <div className="bg-indigo-50 text-indigo-700 p-4 rounded-2xl flex gap-4 text-xs font-bold items-center border border-indigo-100 shadow-sm mt-auto">
                           <div className="bg-indigo-100 p-2 rounded-full"><Info size={20} className="flex-shrink-0" /></div>
                           <p className="leading-relaxed">Salin teks di atas dan paste ke kotak obrolan (chat) AI. AI akan mengenali elemen ini dan memberikan kode pembaruan secara instan.</p>
                        </div>
                     </div>
                   )}
                </div>
             </div>
           </div>
         )}
      </div>
      {/* --- END VISUAL AI BUILDER UI --- */}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 12px; height: 12px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 20px; border: 3px solid #F8FAFC; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94A3B8; }

        /* CSS KHUSUS MODE VISUAL BUILDER */
        .builder-mode-active {
            cursor: crosshair !important;
        }
        .builder-mode-active *:not(#ai-builder-ui):not(#ai-builder-ui *):hover {
            outline: 3px dashed #8b5cf6 !important;
            outline-offset: -2px !important;
            background-color: rgba(139, 92, 246, 0.1) !important;
            border-radius: 4px;
            transition: all 0.1s ease-in-out;
        }

        /* --- PRINT STYLES UNTUK PDF A4 RAPI --- */
        @media print {
            /* 1. Sembunyikan elemen UI Dashboard yang tidak perlu dicetak */
            aside, header, #ai-builder-ui, .md\\:hidden, .sticky.top-0.z-40 {
                display: none !important;
            }

            /* 2. Lepaskan semua batasan scroll dan height agar laporan bisa terpecah jadi banyak halaman */
            html, body, .min-h-screen, main, .overflow-y-auto, .overflow-hidden, .overflow-x-auto, .h-screen {
                height: auto !important;
                min-height: auto !important;
                overflow: visible !important;
                position: static !important;
            }

            /* 3. Set layout kontainer PDF agar full-width mengikuti kertas printer */
            body {
                background: white !important;
                padding: 0 !important;
            }
            #pdf-report-content {
                width: 100% !important;
                max-width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                box-shadow: none !important;
                transform: none !important;
            }

            /* 4. Fix tabel agar muat horizontal dan mematahkan baris otomatis ke bawah */
            table {
                width: 100% !important;
                max-width: 100% !important;
                table-layout: auto !important;
            }
            .whitespace-nowrap {
                white-space: normal !important;
            }
            th, td {
                word-break: break-word !important;
                white-space: normal !important;
                padding-left: 6px !important;
                padding-right: 6px !important;
            }

            /* 5. Set ukuran kertas dan rendering warna (Sangat Penting) */
            @page {
                size: A4 portrait;
                margin: 1cm;
            }
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .break-inside-avoid {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                display: block;
            }
        }
      `}</style>
    </div>
  );
};

// --- KOMPONEN PELENGKAP ---
const MetricCard = ({ title, value, icon: Icon, color, sub, tooltip, trend, onClick, variant }) => {
  const isGradient = variant === 'gradient';
  const bgClass = isGradient ? `bg-gradient-to-br from-${color}-500 to-${color}-700 text-white border-none shadow-${color}-500/30` : `bg-white text-slate-800 border-slate-100`;
  const textClass = isGradient ? 'text-white' : 'text-slate-800';
  const subTextClass = isGradient ? 'text-white/70' : 'text-slate-400';
  const iconBgClass = isGradient ? 'bg-white/20 text-white backdrop-blur-md' : `bg-${color}-50 text-${color}-600`;

  return (
    <div onClick={onClick} className={`p-6 rounded-[2.5rem] border shadow-sm hover:shadow-xl transition-all duration-500 group relative cursor-pointer active:scale-95 ${bgClass}`}>
      <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] pointer-events-none z-0">
         <div className={`absolute -right-6 -bottom-6 opacity-[0.05] group-hover:scale-125 transition-transform duration-1000 ${isGradient ? 'text-white' : 'text-slate-900'}`}><Icon size={140} /></div>
      </div>
      
      <div className="flex justify-between items-start relative z-10 mb-4">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:rotate-6 group-hover:scale-110 ${iconBgClass}`}>
           <Icon size={28} />
        </div>
        
        {tooltip && (
           <div className="relative flex flex-col items-end">
             <div className={`p-2 rounded-xl transition-colors ${isGradient ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-100 text-slate-400'} opacity-60 group-hover:opacity-100`}>
                <Info size={20} />
             </div>
             <div className="absolute top-10 right-0 bg-slate-900/95 backdrop-blur-md text-white text-[11px] leading-relaxed font-medium p-4 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 w-56 text-left shadow-2xl pointer-events-none transform translate-y-2 group-hover:translate-y-0 border border-white/10">
               {tooltip}
               <div className="absolute -top-2 right-3 border-4 border-transparent border-b-slate-900/95"></div>
             </div>
           </div>
        )}
      </div>
      
      <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 relative z-10 break-words line-clamp-1 ${subTextClass}`}>{title}</p>
      <h3 className={`text-2xl xl:text-3xl font-black tracking-tight relative z-10 break-words ${textClass}`}>{value}</h3>
      
      <div className="flex items-center gap-2 mt-2 relative z-10">
         {sub && <p className={`text-[10px] font-bold inline-block px-2.5 py-1 rounded-lg ${isGradient ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>{sub}</p>}
         {trend && (
           <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${trend.isBetter ? (isGradient ? 'bg-emerald-400/20 text-emerald-100' : 'bg-emerald-50 text-emerald-600') : (isGradient ? 'bg-rose-400/20 text-rose-100' : 'bg-rose-50 text-rose-600')}`}>
             {trend.isBetter ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
             {trend.text} vs Sebelumnya
           </div>
         )}
      </div>
    </div>
  );
};

const AnalysisPanel = ({ analysisData }) => (
  <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col h-full">
     <h3 className="text-xl font-black mb-10 uppercase text-center flex items-center justify-center gap-3 tracking-tighter"><Lightbulb className="text-indigo-600" /> Saran & Analisis</h3>
     <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {analysisData.map((item, idx) => (
          <div key={idx} className={`p-6 rounded-[2.5rem] border transition-all hover:shadow-md ${item.status === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : item.status === 'danger' ? 'bg-rose-50 border-rose-100 text-rose-700' : item.status === 'warning' ? 'bg-amber-50 border-amber-100 text-amber-700' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
             <div className="flex items-center justify-between mb-2"><h4 className="text-[11px] font-black uppercase tracking-widest">{item.title}</h4></div>
             <p className="text-xs font-bold leading-relaxed opacity-80">{item.text}</p>
          </div>
        ))}
     </div>
  </div>
);

const LegendItem = ({ color, label }) => (<div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor: color}}></div><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span></div>);

const CustomTooltip = ({ active, payload, currency }) => {
  if (active && payload && payload.length) {
     const label = String(payload[0].payload.date || payload[0].payload.name || '');
     return (
       <div className="bg-slate-900/95 backdrop-blur-md p-6 rounded-[2.5rem] text-white shadow-2xl border border-white/10 min-w-[240px]">
          <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">{label}</p>
          <div className="space-y-3">
             {payload.map((p, i) => (
               <div key={i} className="flex justify-between gap-10 items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider" style={{color: p.color}}>{p.name}:</span>
                  <span className="text-sm font-black tracking-tight">
                     {(currency || String(p.name).includes('Biaya') || String(p.name).includes('Sales') || String(p.name).includes('Budget')) 
                        ? formatIDR(p.value || 0) 
                        : Number(p.value || 0).toLocaleString('id-ID')}
                  </span>
               </div>
             ))}
          </div>
       </div>
     );
  }
  return null;
};

// Tabel Kustom untuk Menu ROAS Report
const ReportTable = ({ title, data, showBudget, headerColor, highlight }) => {
  const crCalc = (cls, leads) => leads > 0 ? ((cls/leads)*100).toFixed(1) + '%' : '0,0%';
  const roasCalc = (sales, spend) => spend > 0 ? (sales/spend).toFixed(2) : '0';

  return (
    <div className={`overflow-hidden rounded-2xl md:rounded-3xl shadow-lg border ${highlight ? 'border-emerald-200 shadow-emerald-200/50' : 'border-slate-200 bg-white'}`}>
      <div className={`${headerColor} text-white text-center py-3 font-black text-sm md:text-base uppercase tracking-tighter`}>{title}</div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className={`w-full text-center whitespace-nowrap ${highlight ? 'bg-white/80 backdrop-blur-sm' : 'bg-white'}`}>
          <thead>
            <tr className={`${headerColor} text-white font-black text-[9px] md:text-[10px] border-b border-white/20`}>
              <th className="px-2 py-2 border-r border-white/20 text-left sticky left-0 z-10" style={{backgroundColor: 'inherit'}}>Layanan</th>
              {SERVICES_LIST.map(s => <th key={s.id} className="px-2 py-2 border-r border-white/20">{s.label}</th>)}
              <th className="px-2 py-2">Total</th>
            </tr>
          </thead>
          <tbody className="text-[9px] md:text-[11px] font-bold text-slate-800 divide-y divide-slate-200">
            <tr className="hover:bg-slate-50 transition-colors">
               <td className="px-2 py-1.5 md:py-2 border-r border-slate-200 text-left sticky left-0 bg-white">Sales Closing</td>
               {SERVICES_LIST.map(s => <td key={s.id} className="px-2 py-1.5 md:py-2 border-r border-slate-200 text-emerald-600">{formatIDR(data[s.id].sales)}</td>)}
               <td className="px-2 py-1.5 md:py-2 text-emerald-600">{formatIDR(data.total.sales)}</td>
            </tr>
            {showBudget && (
              <tr className="hover:bg-slate-50 transition-colors">
                 <td className="px-2 py-1.5 md:py-2 border-r border-slate-200 text-left sticky left-0 bg-white">Budget Iklan</td>
                 {SERVICES_LIST.map(s => <td key={s.id} className="px-2 py-1.5 md:py-2 border-r border-slate-200 text-rose-600">{formatIDR(data[s.id].budget)}</td>)}
                 <td className="px-2 py-1.5 md:py-2 text-rose-600">{formatIDR(data.total.budget)}</td>
              </tr>
            )}
            {showBudget && (
              <tr className="hover:bg-slate-50 transition-colors">
                 <td className="px-2 py-1.5 md:py-2 border-r border-slate-200 text-left sticky left-0 bg-white">Roas</td>
                 {SERVICES_LIST.map(s => <td key={s.id} className="px-2 py-1.5 md:py-2 border-r border-slate-200">{roasCalc(data[s.id].sales, data[s.id].budget)}x</td>)}
                 <td className="px-2 py-1.5 md:py-2">{roasCalc(data.total.sales, data.total.budget)}x</td>
              </tr>
            )}
            <tr className="hover:bg-slate-50 transition-colors">
               <td className="px-2 py-1.5 md:py-2 border-r border-slate-200 text-left sticky left-0 bg-white">Lead Keseluruhan</td>
               {SERVICES_LIST.map(s => <td key={s.id} className="px-2 py-1.5 md:py-2 border-r border-slate-200">{data[s.id].leads}</td>)}
               <td className="px-2 py-1.5 md:py-2">{data.total.leads}</td>
            </tr>
            {showBudget && (
            <tr className="hover:bg-slate-50 transition-colors">
               <td className="px-2 py-1.5 md:py-2 border-r border-slate-200 text-left sticky left-0 bg-white">Lead Terjangkau</td>
               {SERVICES_LIST.map(s => <td key={s.id} className="px-2 py-1.5 md:py-2 border-r border-slate-200">{data[s.id].leads - data[s.id].lk}</td>)}
               <td className="px-2 py-1.5 md:py-2">{data.total.leads - data.total.lk}</td>
            </tr>
            )}
            <tr className="bg-rose-500 text-white hover:bg-rose-600 transition-colors">
               <td className="px-2 py-1.5 md:py-2 border-r border-rose-400 text-left sticky left-0 bg-inherit">Lead Luar Kota</td>
               {SERVICES_LIST.map(s => <td key={s.id} className="px-2 py-1.5 md:py-2 border-r border-rose-400">{data[s.id].lk}</td>)}
               <td className="px-2 py-1.5 md:py-2">{data.total.lk}</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
               <td className="px-2 py-1.5 md:py-2 border-r border-slate-200 text-left sticky left-0 bg-white">Lead Closing</td>
               {SERVICES_LIST.map(s => <td key={s.id} className="px-2 py-1.5 md:py-2 border-r border-slate-200 text-indigo-600">{data[s.id].closing}</td>)}
               <td className="px-2 py-1.5 md:py-2 text-indigo-600">{data.total.closing}</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
               <td className="px-2 py-1.5 md:py-2 border-r border-slate-200 text-left sticky left-0 bg-white">Closing Rate</td>
               {SERVICES_LIST.map(s => <td key={s.id} className="px-2 py-1.5 md:py-2 border-r border-slate-200">{crCalc(data[s.id].closing, data[s.id].leads)}</td>)}
               <td className="px-2 py-1.5 md:py-2">{crCalc(data.total.closing, data.total.leads)}</td>
            </tr>
            {highlight && (
               <>
                 <tr className="hover:bg-slate-50 transition-colors">
                   <td className="px-2 py-1.5 md:py-2 border-r border-slate-200 text-left sticky left-0 bg-white">CPR</td>
                   {SERVICES_LIST.map(s => <td key={s.id} className="px-2 py-1.5 md:py-2 border-r border-slate-200 text-slate-500">{data[s.id].leads > 0 ? formatIDR(data[s.id].budget / data[s.id].leads) : 0}</td>)}
                   <td className="px-2 py-1.5 md:py-2 text-slate-500">{data.total.leads > 0 ? formatIDR(data.total.budget / data.total.leads) : 0}</td>
                 </tr>
                 <tr className="hover:bg-slate-50 transition-colors">
                   <td className="px-2 py-1.5 md:py-2 border-r border-slate-200 text-left sticky left-0 bg-white">AOV</td>
                   {SERVICES_LIST.map(s => <td key={s.id} className="px-2 py-1.5 md:py-2 border-r border-slate-200 text-slate-500">{data[s.id].closing > 0 ? formatIDR(data[s.id].sales / data[s.id].closing) : 0}</td>)}
                   <td className="px-2 py-1.5 md:py-2 text-slate-500">{data.total.closing > 0 ? formatIDR(data.total.sales / data.total.closing) : 0}</td>
                 </tr>
               </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;