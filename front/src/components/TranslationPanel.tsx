import type { RefObject } from "react";
import { Languages, Sparkles, Loader2 } from "lucide-react";
import FileDropzone from "./FileDropzone";
import { languages } from "../utils/constants";

interface TranslationPanelProps {
  targetLanguage: string;
  onTargetLanguageChange: (value: string) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
  inputNumPages: number;
  lang: string | null;
  error: string | null;
  loading: boolean;
  onTranslate: () => void;
}

export default function TranslationPanel({
  targetLanguage,
  onTargetLanguageChange,
  fileInputRef,
  onFileChange,
  file,
  inputNumPages,
  lang,
  error,
  loading,
  onTranslate,
}: TranslationPanelProps) {
  return (
    <>
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Languages className="h-5 w-5 text-violet-400" />
          <span className="text-white font-semibold">Language</span>
        </div>

        <label className="text-slate-400 text-sm">Translate to</label>

        <select
          value={targetLanguage}
          onChange={(e) => onTargetLanguageChange(e.target.value)}
          className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
        >
          {languages.map((lang) => (
            <option key={lang.name}>{lang.name}</option>
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
          className="mt-6 w-full bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2"
          onClick={onTranslate}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Translating...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Translate PDF
            </>
          )}
        </button>
      </div>
    </>
  );
}
