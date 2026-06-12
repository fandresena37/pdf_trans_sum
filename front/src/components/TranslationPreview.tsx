import { Document, Page } from "react-pdf";
import { Download, FileText } from "lucide-react";

interface TranslationPreviewProps {
  pdfUrl: string | null;
  pdfBlob: Blob | null;
  fileName: string;
  translatedSize: number;
  numPages: number;
  targetLanguage: string;
  onDocumentLoadSuccess: (args: { numPages: number }) => void;
  onDownload: () => void;
}

export default function TranslationPreview({
  pdfUrl,
  pdfBlob,
  fileName,
  translatedSize,
  numPages,
  targetLanguage,
  onDocumentLoadSuccess,
  onDownload,
}: TranslationPreviewProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">
            Translated document preview
          </h2>
          <p className="text-slate-400">Preview the PDF before downloading</p>

          {pdfBlob && (
            <div className="flex flex-wrap gap-3 mt-3">
              <span className="text-xs px-3 py-1 rounded-full bg-violet-500/10 text-violet-300">
                translated_{fileName}
              </span>

              <span className="text-xs px-3 py-1 rounded-full bg-slate-700 text-slate-300">
                {(translatedSize / 1024 / 1024).toFixed(2)} MB
              </span>

              <span className="text-xs px-3 py-1 rounded-full bg-slate-700 text-slate-300">
                {numPages} page{numPages > 1 ? "s" : ""}
              </span>

              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300">
                ✓ {targetLanguage}
              </span>
            </div>
          )}
        </div>

        <button
          className="bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
          onClick={onDownload}
          disabled={!pdfBlob}
        >
          <Download size={18} />
          Download
        </button>
      </div>

      <div className="bg-slate-900 rounded-2xl h-200 border border-slate-800 flex items-center justify-center">
        {pdfUrl ? (
          <div className="w-full h-full p-4 flex flex-col items-center overflow-auto">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<p className="text-white">Loading...</p>}
            >
              <div className="flex justify-center">
                <Page
                  pageNumber={1}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  width={700}
                />
              </div>
            </Document>
          </div>
        ) : (
          <div className="text-center">
            <FileText size={70} className="mx-auto text-slate-600" />
            <h3 className="text-white mt-4 font-semibold">PDF Preview</h3>
            <p className="text-slate-500 mt-2">
              Translated PDF will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
