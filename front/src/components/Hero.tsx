import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <div className="border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="text-violet-400" />
          <span className="text-violet-400 font-medium">
            Powered by Gemini AI
          </span>
        </div>

        <h1 className="text-5xl font-black text-white">
          PDF Translation & Summary
        </h1>

        <p className="text-slate-400 text-lg mt-4 max-w-2xl">
          Instantly translate and summarize your PDF documents using AI.
        </p>

        <div className="flex gap-6 mt-8">
          <div className="text-slate-300">✓ 6 languages</div>
          <div className="text-slate-300">✓ Up to 25 MB</div>
          <div className="text-slate-300">✓ AI translation</div>
        </div>
      </div>
    </div>
  );
}
