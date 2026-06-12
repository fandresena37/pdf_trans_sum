import { FileText, Sparkles, Loader2 } from "lucide-react";
import { languages, summaryLengths, summaryStyles } from "../utils/constants";

import FileDropzone from "./FileDropzone";
import type { RefObject } from "react";

interface SummaryPanelProps {
  targetLanguage: string;
  onTargetLanguageChange: (value: string) => void;
  summaryLength: string;
  onSummaryLengthChange: (value: string) => void;
  summaryStyle: string;
  onSummaryStyleChange: (value: string) => void;
  error: string | null;
  summaryLoading: boolean;
  file: File | null;
  onGenerateSummary: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputNumPages: number;
  lang: string | null;
}

export default function SummaryPanel({
  targetLanguage,
  onTargetLanguageChange,
  summaryLength,
  onSummaryLengthChange,
  summaryStyle,
  onSummaryStyleChange,
  error,
  summaryLoading,
  file,
  onGenerateSummary,
  fileInputRef,
  onFileChange,
  inputNumPages,
  lang,
}: SummaryPanelProps) {
  return (
    <>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <FileText className="h-5 w-5 text-emerald-400" />
          <span className="text-white font-semibold">Summary options</span>
        </div>

        <label className="text-slate-400 text-sm">Summary language</label>

        <select
          value={targetLanguage}
          onChange={(e) => onTargetLanguageChange(e.target.value)}
          className="w-full mt-2 mb-4 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
        >
          {languages.map((lang) => (
            <option key={lang.name}>{lang.name}</option>
          ))}
        </select>

        <label className="text-slate-400 text-sm">Length</label>

        <select
          value={summaryLength}
          onChange={(e) => onSummaryLengthChange(e.target.value)}
          className="w-full mt-2 mb-4 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
        >
          {summaryLengths.map((l) => (
            <option key={l.code}>{l.name}</option>
          ))}
        </select>

        <label className="text-slate-400 text-sm">Style</label>

        <select
          value={summaryStyle}
          onChange={(e) => onSummaryStyleChange(e.target.value)}
          className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
        >
          {summaryStyles.map((s) => (
            <option key={s.code}>{s.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
        <FileDropzone
          fileInputRef={fileInputRef}
          onFileChange={onFileChange}
          accentColor="violet"
          file={file}
          inputNumPages={inputNumPages}
          lang={lang}
          showLangBadge
          bare
        />

        {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}

        <button
          className="mt-6 w-full bg-emerald-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2"
          onClick={onGenerateSummary}
          disabled={!file || summaryLoading}
        >
          {summaryLoading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate summary
            </>
          )}
        </button>
      </div>
    </>
  );
}
