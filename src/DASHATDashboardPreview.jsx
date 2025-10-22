import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const MOCK_VISITS = [
  { month: "Jan", visits: 1200 },
  { month: "Feb", visits: 980 },
  { month: "Mar", visits: 1100 },
  { month: "Apr", visits: 1250 },
  { month: "May", visits: 1400 },
  { month: "Jun", visits: 1350 },
  { month: "Jul", visits: 1500 },
  { month: "Aug", visits: 1600 },
  { month: "Sep", visits: 1550 },
];

const MOCK_PONED = [
  { month: "Jan", cases: 12 },
  { month: "Feb", cases: 10 },
  { month: "Mar", cases: 15 },
  { month: "Apr", cases: 9 },
  { month: "May", cases: 8 },
  { month: "Jun", cases: 11 },
  { month: "Jul", cases: 13 },
  { month: "Aug", cases: 14 },
  { month: "Sep", cases: 10 },
];

const MOCK_EQUIPMENT = [
  { name: "Tensimeter", status: "Good", qty: 12 },
  { name: "ECG", status: "Needs Repair", qty: 1 },
  { name: "Infusion Pump", status: "Good", qty: 4 },
  { name: "Defibrillator", status: "Critical", qty: 0 },
];

const MOCK_STAFF = [
  { role: "Dokter Umum", count: 3 },
  { role: "Bidan", count: 6 },
  { role: "Perawat", count: 12 },
  { role: "Apoteker", count: 1 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];

export default function DASHATDashboardPreview() {
  const [visits] = useState(MOCK_VISITS);
  const [poned] = useState(MOCK_PONED);
  const [equipment] = useState(MOCK_EQUIPMENT);
  const [staff] = useState(MOCK_STAFF);
  const [aiStatus, setAiStatus] = useState({ running: false, message: "Idle" });
  const [predictions, setPredictions] = useState(null);

  function runAIPrediction() {
    setAiStatus({ running: true, message: "Menjalankan model prediksi (LSTM)..." });
    setTimeout(() => {
      const preds = visits.map((v, i) => ({
        month: v.month,
        predicted: Math.round(v.visits * (1 + (Math.sin(i) * 0.07 + 0.05))),
      }));
      setPredictions(preds);
      setAiStatus({
        running: false,
        message: "Selesai: prediksi kunjungan 3 bulan ke depan tersedia.",
      });
    }, 1200);
  }

  const totalVisits = visits.reduce((s, r) => s + r.visits, 0);
  const avgMonthly = Math.round(totalVisits / visits.length);
  const staffCount = staff.reduce((s, r) => s + r.count, 0);
  const equipmentCritical = equipment.filter(
    (e) => e.status.toLowerCase().includes("critical") || e.qty === 0
  ).length;

  const VisitsLine = () => (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={visits} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
        <XAxis dataKey="month" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip contentStyle={{ backgroundColor: "#1e293b", color: "#f1f5f9" }} />
        <Line type="monotone" dataKey="visits" stroke="#4f46e5" strokeWidth={3} dot={{ r: 2 }} />
        {predictions && (
          <Line
            type="monotone"
            dataKey="predicted"
            data={predictions}
            stroke="#ef4444"
            strokeDasharray="4 4"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );

  const PonedBar = () => (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={poned} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
        <XAxis dataKey="month" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip contentStyle={{ backgroundColor: "#1e293b", color: "#f1f5f9" }} />
        <Bar dataKey="cases" radius={[6, 6, 0, 0]}>
          {poned.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  const EquipmentList = () => (
    <div className="space-y-2">
      {equipment.map((eq, idx) => (
        <div key={idx} className="flex justify-between items-center p-2 bg-slate-800 rounded-2xl shadow-sm text-slate-100">
          <div>
            <div className="font-semibold">{eq.name}</div>
            <div className="text-sm text-slate-300">
              Status: {eq.status} • Qty: {eq.qty}
            </div>
          </div>
          <div className="text-xs font-medium text-right">
            {eq.status === "Good" ? (
              <span className="px-2 py-1 rounded-full bg-green-900 text-green-200">Operasional</span>
            ) : eq.status === "Needs Repair" ? (
              <span className="px-2 py-1 rounded-full bg-yellow-900 text-yellow-200">Perlu Perbaikan</span>
            ) : (
              <span className="px-2 py-1 rounded-full bg-red-900 text-red-200">Kritikal</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const StaffTable = () => (
    <table className="min-w-full text-sm text-slate-100">
      <thead>
        <tr className="text-left text-slate-200 border-b border-slate-700">
          <th className="pb-2">Peran</th>
          <th className="pb-2">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        {staff.map((s, i) => (
          <tr key={i} className="odd:bg-slate-800 even:bg-slate-700/50">
            <td className="py-2">{s.role}</td>
            <td className="py-2">{s.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-slate-100">
      <div className="max-w-[1200px] mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-100">
            DASHAT — Dashboard Analytics Preview
          </h1>
          <p className="text-sm text-slate-300">
            Konsep orkestrasai AI untuk integrasi 80 Puskesmas — preview hasil penggabungan data
            (kunjungan, PONED, peralatan, SDM).
          </p>
        </header>

        <div className="grid grid-cols-12 gap-4">
          <section className="col-span-8">
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-800 p-4 rounded-2xl shadow-md">
                <div className="text-xs text-slate-300">Total Kunjungan (Jan-Sep)</div>
                <div className="text-2xl font-semibold">{totalVisits.toLocaleString()}</div>
                <div className="text-sm text-slate-300">Rata-rata / bulan: {avgMonthly.toLocaleString()}</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-2xl shadow-md">
                <div className="text-xs text-slate-300">Jumlah Tenaga Kesehatan</div>
                <div className="text-2xl font-semibold">{staffCount}</div>
                <div className="text-sm text-slate-300">
                  Dokter: {staff.find((s) => s.role.includes("Dokter"))?.count ?? 0}
                </div>
              </div>
              <div className="bg-slate-800 p-4 rounded-2xl shadow-md">
                <div className="text-xs text-slate-300">Peralatan Kritikal</div>
                <div className="text-2xl font-semibold">{equipmentCritical}</div>
                <div className="text-sm text-slate-300">Butuh tindakan cepat</div>
              </div>
            </motion.div>

            <div className="bg-slate-800 p-4 rounded-2xl shadow-md mb-4">
              <h3 className="text-lg font-semibold text-slate-100">Tren Kunjungan Rawat Jalan</h3>
              <div className="text-xs text-slate-300 mb-2">Data: Januari — September 2025</div>
              <VisitsLine />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 p-4 rounded-2xl shadow-md">
                <h4 className="font-semibold text-slate-100 mb-2">PONED — Kasus per Bulan</h4>
                <PonedBar />
              </div>

              <div className="bg-slate-800 p-4 rounded-2xl shadow-md">
                <h4 className="font-semibold text-slate-100 mb-2">Prediksi Kunjungan (AI)</h4>
                <div className="text-sm text-slate-200 mb-2">{aiStatus.message}</div>
                <div className="flex gap-2">
                  <button
                    onClick={runAIPrediction}
                    disabled={aiStatus.running}
                    className="px-3 py-2 rounded-2xl bg-indigo-600 text-white text-sm shadow-sm"
                  >
                    {aiStatus.running ? "Menjalankan..." : "Jalankan Prediksi (LSTM)"}
                  </button>
                  <button
                    onClick={() => {
                      setPredictions(null);
                      setAiStatus({ running: false, message: "Idle" });
                    }}
                    className="px-3 py-2 rounded-2xl border border-slate-600 text-sm text-slate-200"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </section>

          <aside className="col-span-4 space-y-4">
            <div className="bg-slate-800 p-4 rounded-2xl shadow-md">
              <h4 className="font-semibold text-slate-100 mb-2">AI Orchestrator</h4>
              <div className="text-sm text-slate-200 mb-3">
                Panel orkestrasi AI: hubungkan model prediksi, deteksi fraud, dan NLP chatbot warga.
              </div>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded-2xl bg-emerald-900 text-emerald-100 border border-emerald-700">
                  Orkestrasi: Chatbot NLP (Bandung Sehat AI)
                </button>
                <button className="w-full text-left px-3 py-2 rounded-2xl bg-yellow-900 text-yellow-100 border border-yellow-700">
                  Deteksi Fraud (IsolationForest)
                </button>
                <button className="w-full text-left px-3 py-2 rounded-2xl bg-violet-900 text-violet-100 border border-violet-700">
                  Forecasting (LSTM)
                </button>
              </div>
              <div className="mt-3 text-xs text-slate-400">
                Catatan: saat integrasi nyata, tombol ini memicu endpoint backend dan menampilkan progress real-time.
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-2xl shadow-md">
              <h4 className="font-semibold text-slate-100 mb-2">Inventaris Peralatan</h4>
              <EquipmentList />
              <div className="mt-3 text-xs text-slate-400">
                Sumber: Asessmen Peralatan Standard Ibra.xlsx
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-2xl shadow-md">
              <h4 className="font-semibold text-slate-100 mb-2">SDM & Kapasitas</h4>
              <div className="text-sm text-slate-200 mb-2">Total tenaga: {staffCount}</div>
              <div className="overflow-auto max-h-48">
                <StaffTable />
              </div>
              <div className="mt-2 text-xs text-slate-400">Sumber: Daftar_isian_new.xlsx</div>
            </div>
          </aside>
        </div>

        <footer className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-slate-800 p-4 rounded-2xl shadow-md col-span-2">
            <h4 className="font-semibold text-slate-100 mb-2">
              Rekomendasi & Roadmap (Ringkas)
            </h4>
            <ul className="list-disc pl-5 text-sm text-slate-200 space-y-1">
              <li>
                Segera tindaklanjuti peralatan kritikal (Defibrillator & ECG) — tambahkan ke procurement Q1 2026.
              </li>
              <li>
                Jalankan pilot Puskesmas 24 jam (Ibrahim Adji) dengan model kapasitasi dan renegosiasi BPJS.
              </li>
              <li>
                Integrasi FHIR & VClaim: prioritaskan MoU dengan Kemenkes/BPJS untuk akses API.
              </li>
              <li>
                Implementasi AI Orchestrator bertahap: mulai dari anomaly detection klaim, lalu outbreak forecasting.
              </li>
            </ul>
          </div>

          <div className="bg-slate-800 p-4 rounded-2xl shadow-md">
            <h4 className="font-semibold text-slate-100 mb-2">Metadata</h4>
            <div className="text-xs text-slate-300">
              Data digabung dari: 6 file (PPTX, XLSX). Preview ini menampilkan ringkasan yang dapat di-link ke DASHAT production.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
