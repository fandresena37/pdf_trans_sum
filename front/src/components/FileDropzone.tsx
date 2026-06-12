import { Upload, FileText } from "lucide-react";
import type { RefObject } from "react";

interface FileDropzoneProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accentColor?: "violet" | "emerald";
  file: File | null;
  inputNumPages: number;
  lang: string | null;
  showLangBadge?: boolean;
  bare?: boolean;
}

export default function FileDropzone({
  fileInputRef,
  onFileChange,
  accentColor = "violet",
  file,
  inputNumPages,
  lang,
  showLangBadge = false,
  bare = false,
}: FileDropzoneProps) {
  const hoverBorder =
    accentColor === "violet" ? "hover:border-violet-500" : "hover:border-emerald-500";

  const content = (
    <>
      <div className="flex items-center justify-between pb-5">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-cyan-400" />
          <span className="text-white font-semibold">Document</span>
        </div>

        {showLangBadge && (
          <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
            {lang ? `✓ ${lang}` : "Automatic detection"}
          </span>
        )}
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed border-slate-700 rounded-2xl p-10 text-center cursor-pointer ${hoverBorder}`}
      >
        <Upload className="mx-auto h-12 w-12 text-slate-500" />
        <h3 className="text-white mt-4 font-semibold">Drop your PDF</h3>
        <p className="text-slate-400 text-sm mt-2">Click or drag your file</p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={onFileChange}
        />
      </div>

      {file && (
        <div className="mt-5 bg-slate-800 rounded-xl p-4">
          <p className="text-white font-medium">{file.name}</p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-slate-400 text-sm">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <span className="text-xs px-2 py-1 rounded-full bg-violet-500/10 text-violet-300">
              {inputNumPages} page{inputNumPages > 1 ? "s" : ""}
            </span>
          </div>
        </div>
      )}
    </>
  );

  if (bare) return content;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
      {content}
    </div>
  );
}
