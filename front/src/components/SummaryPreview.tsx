import { FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface SummaryPreviewProps {
  summaryText: string | null;
}

export default function SummaryPreview({ summaryText }: SummaryPreviewProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-bold">Summary display</h2>
      </div>

      <div className="bg-slate-900 rounded-2xl h-200 border border-slate-800 flex items-center justify-center">
        {summaryText ? (
          <div className="h-full overflow-auto w-full p-10">
            <p className="text-slate-300 text-sm whitespace-pre-wrap">
              <ReactMarkdown>{summaryText}</ReactMarkdown>
            </p>
          </div>
        ) : (
          <div className="text-center">
            <FileText size={70} className="mx-auto text-slate-600" />
            <h3 className="text-white mt-4 font-semibold">Summary display</h3>
            <p className="text-slate-500 mt-2">
              PDF summary will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
