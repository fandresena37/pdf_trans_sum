import { Languages, FileText } from "lucide-react";
import type { ActiveTab } from "../types";

interface TabSwitcherProps {
  activeTab: ActiveTab;
  onChange: (tab: ActiveTab) => void;
}

export default function TabSwitcher({ activeTab, onChange }: TabSwitcherProps) {
  return (
    <div className="flex bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 gap-1.5">
      <button
        onClick={() => onChange("translate")}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold transition-colors ${
          activeTab === "translate"
            ? "bg-violet-600 text-white"
            : "text-slate-400 hover:text-white"
        }`}
      >
        <Languages className="h-4 w-4" />
        Translation
      </button>

      <button
        onClick={() => onChange("summary")}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold transition-colors ${
          activeTab === "summary"
            ? "bg-emerald-600 text-white"
            : "text-slate-400 hover:text-white"
        }`}
      >
        <FileText className="h-4 w-4" />
        Summary
      </button>
    </div>
  );
}
