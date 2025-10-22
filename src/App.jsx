import React, { useState } from "react";
import DASHATDashboardPreview from "./DASHATDashboardPreview";
import DASHATFullMenu from "./DASHATFullMenu";

export default function App() {
  const [view, setView] = useState("preview");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="p-4 flex justify-between items-center bg-slate-800 border-b border-slate-700">
        <h1 className="text-xl font-bold">DASHAT — Dual Mode Dashboard</h1>
        <div className="space-x-2">
          <button
            onClick={() => setView("preview")}
            className={`px-3 py-2 rounded-lg text-sm ${
              view === "preview"
                ? "bg-indigo-600 text-white"
                : "bg-slate-700 hover:bg-slate-600"
            }`}
          >
            Analytics Preview
          </button>
          <button
            onClick={() => setView("fullmenu")}
            className={`px-3 py-2 rounded-lg text-sm ${
              view === "fullmenu"
                ? "bg-emerald-600 text-white"
                : "bg-slate-700 hover:bg-slate-600"
            }`}
          >
            Full Menu
          </button>
        </div>
      </div>

      <div className="p-4">
        {view === "preview" ? <DASHATDashboardPreview /> : <DASHATFullMenu />}
      </div>
    </div>
  );
}
