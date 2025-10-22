import React, { useState } from "react";
// DASHAT Full Menu Dashboard (JSX single-file preview)
// - Tailwind-based styling assumed
// - Default export React component
// - Replace MOCK_* with real data connectors
// - Designed as a preview scaffold for integration with DASHAT backend (AI Orchestrator, FHIR, VClaim, etc.)

import { FaUserMd, FaHospitalAlt, FaClipboardList, FaMoneyBillWave, FaPills, FaWarehouse, FaBoxOpen, FaComments, FaStethoscope, FaFileInvoiceDollar, FaUserCheck, FaArchive } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const MOCK_PROFILE = {
  name: "Puskesmas Ibrahim Adji",
  vision: "Menjadi Puskesmas rujukan pelayanan primer yang berkualitas dan inklusif",
  mission: [
    "Meningkatkan akses layanan kesehatan primer",
    "Menyediakan layanan promotif dan preventif berkualitas",
    "Menerapkan sistem digital terintegrasi"
  ],
  staff: { doctors: 3, midwives: 6, nurses: 12, support: 8 },
  services: ["UGD Minor", "Poli Umum", "Poli Gigi", "Imunisasi", "KIA"]
};

const MOCK_VISITS = [
  { month: "Jan", kapitasi: 300, non: 900, poned: 12, umum: 1200 },
  { month: "Feb", kapitasi: 280, non: 700, poned: 10, umum: 980 },
  { month: "Mar", kapitasi: 330, non: 770, poned: 15, umum: 1100 },
  { month: "Apr", kapitasi: 350, non: 900, poned: 9, umum: 1250 },
  { month: "May", kapitasi: 400, non: 1000, poned: 8, umum: 1400 },
  { month: "Jun", kapitasi: 380, non: 970, poned: 11, umum: 1350 },
  { month: "Jul", kapitasi: 420, non: 1080, poned: 13, umum: 1500 },
  { month: "Aug", kapitasi: 450, non: 1150, poned: 14, umum: 1600 },
  { month: "Sep", kapitasi: 430, non: 1120, poned: 10, umum: 1550 }
];

const MOCK_INVENTORY = [
  { item: "Tensimeter", qty: 12, status: "Good" },
  { item: "Infusion Pump", qty: 4, status: "Good" },
  { item: "ECG", qty: 1, status: "Repair" },
  { item: "Defibrillator", qty: 0, status: "Critical" }
];

export default function DASHATFullMenu() {
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");

  const totalVisits = MOCK_VISITS.reduce((s, r) => s + r.umum, 0);
  const staffCount = Object.values(MOCK_PROFILE.staff).reduce((s, n) => s + n, 0);

  function MenuButton({ id, icon, label }) {
    return (
      <button
  onClick={() => setActive(id)}
  className={`flex items-center gap-3 w-full text-sm px-3 py-2 rounded-lg transition ${
    active === id
      ? "bg-slate-700 text-slate-100 font-semibold"
      : "text-slate-300 hover:bg-slate-800" }`}
>
        <span className="text-slate-200">{icon}</span>
        <span>{label}</span>
      </button>
    );
  }

  const VisitsChart = () => (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={MOCK_VISITS} margin={{ top: 8, right: 12, left: -10, bottom: 0 }}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="kapitasi" stroke="#06b6d4" name="Kapitasi" />
        <Line type="monotone" dataKey="non" stroke="#60a5fa" name="Non Kapitasi" />
        <Line type="monotone" dataKey="poned" stroke="#f97316" name="PONED" />
        <Line type="monotone" dataKey="umum" stroke="#34d399" name="Umum" />
      </LineChart>
    </ResponsiveContainer>
  );

  function renderContent() {
    switch(active) {
      case 'profile':
        return (
          <div className="bg-slate-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2">Profil Puskesmas</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Visi</h3>
                <p className="text-slate-100 mt-1">{MOCK_PROFILE.vision}</p>
                <h3 className="font-medium mt-4">Misi</h3>
                <ul className="list-disc pl-5 text-slate-100 mt-1">
                  {MOCK_PROFILE.mission.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Tenaga Medis & Pendukung</h3>
                <div className="mt-2">
                  <table className="w-full text-sm">
                    <tbody>
                      {Object.entries(MOCK_PROFILE.staff).map(([k,v])=> (
                        <tr key={k} className="odd:bg-slate-700">
                          <td className="py-2 capitalize">{k.replace('_',' ')}</td>
                          <td className="py-2 font-medium">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h3 className="font-medium mt-4">Fasilitas Pelayanan</h3>
                <ul className="list-disc pl-5 text-slate-100 mt-1">
                  {MOCK_PROFILE.services.map((s,i)=><li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          </div>
        );

      case 'absensi':
        return (
          <div className="bg-slate-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Absensi Tenaga Kesehatan</h2>
            <p className="text-sm text-slate-200">(Mock) Sistem absensi terintegrasi dengan fingerprint dan mobile check-in. Tampilkan summary kehadiran, izin, dan cuti.</p>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-700 rounded-lg">
                <div className="text-xs text-slate-300">Hadir Hari Ini</div>
                <div className="text-2xl font-semibold">{Math.round(staffCount*0.9)}</div>
              </div>
              <div className="p-4 bg-slate-700 rounded-lg">
                <div className="text-xs text-slate-300">Izin</div>
                <div className="text-2xl font-semibold">{Math.round(staffCount*0.05)}</div>
              </div>
              <div className="p-4 bg-slate-700 rounded-lg">
                <div className="text-xs text-slate-300">Telat</div>
                <div className="text-2xl font-semibold">{Math.round(staffCount*0.02)}</div>
              </div>
            </div>
          </div>
        );

      case 'pendaftaran':
        return (
          <div className="bg-slate-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2">Pendaftaran</h2>
            <p className="text-sm text-slate-200">Form pendaftaran online & antrian virtual (integrasi Bandung Sehat AI / SISRUTE).</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-700 rounded-lg">Form Entry Pasien (mock)</div>
              <div className="p-4 bg-slate-700 rounded-lg">Antrian Virtual: 12 pasien</div>
            </div>
          </div>
        );

      case 'data-pengunjung':
        return (
          <div className="bg-slate-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2">Data Pengunjung</h2>
            <p className="text-sm text-slate-200">Grafik distribusi: Kapitasi / Non Kapitasi / PONED / Umum.</p>
            <div className="mt-4">
              <VisitsChart />
            </div>
          </div>
        );

      case 'keuangan':
        return (
          <div className="bg-slate-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2">Keuangan</h2>
            <p className="text-sm text-slate-200">Ringkasan pendapatan & pengeluaran, realisasi APBD, dan laporan klaim BPJS.</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-700 rounded-lg">Pendapatan (YTD): Rp 1.2 M</div>
              <div className="p-4 bg-slate-700 rounded-lg">Pengeluaran (YTD): Rp 950 M</div>
            </div>
          </div>
        );

      case 'farmasi':
        return (
          <div className="bg-slate-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2">Farmasi</h2>
            <p className="text-sm text-slate-200">Stok obat, pemesanan otomatis (reorder point), dan delivery to home integrasi.</p>
            <div className="mt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-100"><th>Obat</th><th>Stok</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr className="odd:bg-slate-700"><td>Paracetamol</td><td>120</td><td>Ok</td></tr>
                  <tr><td>Amoksisilin</td><td>40</td><td>Limit</td></tr>
                  <tr className="odd:bg-slate-700"><td>Vaksin MR</td><td>10</td><td>Reorder</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'aset':
        return (
          <div className="bg-slate-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2">Aset</h2>
            <p className="text-sm text-slate-200">Daftar aset tetap, umur ekonomis, dan jadwal pemeliharaan.</p>
            <div className="mt-4 space-y-2">
              <div className="p-3 bg-slate-700 rounded">Gedung Utama — Kondisi: Baik</div>
              <div className="p-3 bg-slate-700 rounded">Ambulans — KM: 120.000 — Jadwal servis: 1 bulan</div>
              <div className="p-3 bg-slate-700 rounded">Peralatan Radiologi — Jadwal kalibrasi: 6 bulan</div>
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div className="bg-slate-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2">Inventory Peralatan</h2>
            <p className="text-sm text-slate-200">Status operasional peralatan (sumber: Asessmen Peralatan Standard Ibra.xlsx).</p>
            <div className="mt-4 grid gap-2">
              {MOCK_INVENTORY.map((it,i)=> (
                <div key={i} className="flex justify-between items-center p-3 bg-slate-700 rounded">
                  <div>{it.item}</div>
                  <div className={`px-2 py-1 rounded ${it.status==='Good'? 'bg-green-100 text-green-800': it.status==='Repair'? 'bg-yellow-100 text-yellow-800':'bg-red-100 text-red-800'}`}>{it.status} • {it.qty}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'pengaduan':
        return (
          <div className="bg-slate-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2">Pengaduan</h2>
            <p className="text-sm text-slate-200">Daftar pengaduan warga, status tindak lanjut, dan SLA penyelesaian.</p>
            <div className="mt-4">
              <div className="p-3 bg-slate-700 rounded">#12345: Keluhan antrian — Status: Selesai</div>
              <div className="p-3 bg-slate-700 rounded">#12346: Keluhan obat kosong — Status: Dalam Proses</div>
            </div>
          </div>
        );

      case 'konsultasi':
        return (
          <div className="bg-slate-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2">Konsultasi / Pemeriksaan Online (Halo Doc)</h2>
            <p className="text-sm text-slate-200">Integrasi telemedicine: chat, video call, resep elektronik, dan rujukan ke Puskesmas/RS.</p>
            <div className="mt-4">Sesi aktif: 3 pasien (mock)</div>
          </div>
        );

      case 'pengadaan':
        return (
          <div className="bg-slate-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2">Administrasi Pengadaan</h2>
            <p className="text-sm text-slate-200">SOP pengadaan, rencana kebutuhan tahunan, dan tracking tender/kontrak.</p>
            <div className="mt-4">Tender aktif: Pengadaan alat USG — Status: Evaluasi</div>
          </div>
        );

      case 'claim-bpjs':
        return (
          <div className="bg-slate-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2">Administrasi Klaim BPJS</h2>
            <p className="text-sm text-slate-200">Integrasi VClaim: monitoring klaim, mismatch ICD-10, dan deteksi klaim ganda (AI anomaly detection).</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-700 rounded">Klaim hari ini: 24</div>
              <div className="p-4 bg-slate-700 rounded">Klaim tertunda: 3</div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-slate-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2">Dashboard Utama</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-slate-700 rounded">
                <div className="text-xs text-slate-300">Total Kunjungan (Jan-Sep)</div>
                <div className="text-2xl font-semibold">{totalVisits.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-slate-700 rounded">
                <div className="text-xs text-slate-300">Tenaga Kesehatan</div>
                <div className="text-2xl font-semibold">{staffCount}</div>
              </div>
              <div className="p-4 bg-slate-700 rounded">
                <div className="text-xs text-slate-300">Peralatan Kritikal</div>
                <div className="text-2xl font-semibold">{MOCK_INVENTORY.filter(i=>i.qty===0).length}</div>
              </div>
            </div>

            <div className="mt-4">
              <VisitsChart />
            </div>
          </div>
        );
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-6">
        <aside className="col-span-3">
          <div className="bg-slate-800 rounded-2xl p-4 shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">D</div>
              <div>
                <div className="text-sm font-semibold">DASHAT</div>
                <div className="text-xs text-slate-300">Dashboard Puskesmas</div>
              </div>
            </div>
            <div className="mb-3">
              <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Cari menu atau pasien..." className="w-full px-3 py-2 rounded-lg border-slate-600" />
            </div>
            <nav className="space-y-1">
              <MenuButton id="dashboard" icon={<FaHospitalAlt />} label="Dashboard" />
              <MenuButton id="profile" icon={<FaUserMd />} label="Profil Puskesmas" />
              <div className="pl-6">
                <MenuButton id="profile-visi" icon={<span className="text-xs">A</span>} label="A. Visi Misi" />
                <MenuButton id="profile-tenaga" icon={<span className="text-xs">B</span>} label="B. Tenaga Medis & Pendukung" />
                <MenuButton id="profile-fasilitas" icon={<span className="text-xs">C</span>} label="C. Fasilitas Pelayanan" />
              </div>
              <MenuButton id="absensi" icon={<FaUserCheck />} label="Absensi" />
              <MenuButton id="pendaftaran" icon={<FaClipboardList />} label="Pendaftaran" />
              <MenuButton id="data-pengunjung" icon={<FaArchive />} label="Data Pengunjung" />
              <div className="pl-6">
                <MenuButton id="data-kapitasi" icon={<span className="text-xs">A</span>} label="A. Kapitasi" />
                <MenuButton id="data-non" icon={<span className="text-xs">B</span>} label="B. Non Kapitasi" />
                <MenuButton id="data-poned" icon={<span className="text-xs">C</span>} label="C. PONED" />
                <MenuButton id="data-umum" icon={<span className="text-xs">D</span>} label="D. Umum" />
              </div>
              <MenuButton id="keuangan" icon={<FaMoneyBillWave />} label="Keuangan" />
              <MenuButton id="farmasi" icon={<FaPills />} label="Farmasi" />
              <MenuButton id="aset" icon={<FaArchive />} label="Aset" />
              <MenuButton id="inventory" icon={<FaWarehouse />} label="Inventory" />
              <MenuButton id="pengaduan" icon={<FaComments />} label="Pengaduan" />
              <MenuButton id="konsultasi" icon={<FaStethoscope />} label="Konsultasi / Halo Doc" />
              <MenuButton id="pengadaan" icon={<FaFileInvoiceDollar />} label="Administrasi Pengadaan" />
              <MenuButton id="claim-bpjs" icon={<FaFileInvoiceDollar />} label="Administrasi Klaim BPJS" />
            </nav>
            <div className="mt-4 text-xs text-slate-300">Role: Admin Puskesmas • Versi: DASHAT v0.1</div>
          </div>

          <div className="mt-4 bg-slate-800 rounded-2xl p-4 shadow">
            <h4 className="text-sm font-semibold mb-2">AI Orchestrator</h4>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 rounded-lg bg-emerald-50 text-sm">Run Forecast (LSTM)</button>
              <button className="w-full px-3 py-2 rounded-lg bg-yellow-50 text-sm">Detect Anomaly (IsolationForest)</button>
              <button className="w-full px-3 py-2 rounded-lg bg-indigo-50 text-sm">Chatbot NLP (Bandung Sehat AI)</button>
            </div>
          </div>
        </aside>

        <main className="col-span-9">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}