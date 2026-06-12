import { useRef, useState } from "react";
import Hero from "./components/Hero";
import TabSwitcher from "./components/TabSwitcher";
import TranslationPanel from "./components/TranslationPanel";
import SummaryPanel from "./components/SummaryPanel";
import TranslationPreview from "./components/TranslationPreview";
import SummaryPreview from "./components/SummaryPreview";
import { usePdfFile } from "./hooks/usePdfFile";
import { usePdfTranslation } from "./hooks/usePdfTranslation";
import { usePdfSummary } from "./hooks/usePdfSummary";
import type { ActiveTab } from "./types";

export default function PDFTranslator() {
  const [targetLanguage, setTargetLanguage] = useState("French");
  const [activeTab, setActiveTab] = useState<ActiveTab>("translate");
  const [summaryLength, setSummaryLength] = useState("Medium (~250 words)");
  const [summaryStyle, setSummaryStyle] = useState("Paragraph");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { file, fileName, error, setError, lang, inputNumPages, handleFile } =
    usePdfFile();

  const {
    loading,
    pdfBlob,
    pdfUrl,
    translatedSize,
    numPages,
    setNumPages,
    translate,
    reset: resetTranslation,
    download,
  } = usePdfTranslation();

  const {
    summaryLoading,
    summaryText,
    generateSummary,
    reset: resetSummary,
  } = usePdfSummary();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e, () => {
      resetTranslation();
      resetSummary();
    });
  };

  const handleTranslate = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }
    await translate(file, targetLanguage, setError);
  };

  const handleGenerateSummary = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }
    await generateSummary(
      file,
      targetLanguage,
      summaryLength,
      summaryStyle,
      setError
    );
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <Hero />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-[400px_1fr] gap-8">
          {/* SIDEBAR */}
          <div className="space-y-6">
            <TabSwitcher activeTab={activeTab} onChange={setActiveTab} />

            {activeTab === "translate" && (
              <TranslationPanel
                targetLanguage={targetLanguage}
                onTargetLanguageChange={setTargetLanguage}
                fileInputRef={fileInputRef}
                onFileChange={onFileChange}
                file={file}
                inputNumPages={inputNumPages}
                lang={lang}
                error={error}
                loading={loading}
                onTranslate={handleTranslate}
              />
            )}

            {activeTab === "summary" && (
              <SummaryPanel
                fileInputRef={fileInputRef}
                inputNumPages={inputNumPages}
                lang={lang}
                onFileChange={onFileChange}
                targetLanguage={targetLanguage}
                onTargetLanguageChange={setTargetLanguage}
                summaryLength={summaryLength}
                onSummaryLengthChange={setSummaryLength}
                summaryStyle={summaryStyle}
                onSummaryStyleChange={setSummaryStyle}
                error={error}
                summaryLoading={summaryLoading}
                file={file}
                onGenerateSummary={handleGenerateSummary}
              />
            )}
          </div>

          {/* PREVIEW */}
          {activeTab === "translate" && (
            <TranslationPreview
              pdfUrl={pdfUrl}
              pdfBlob={pdfBlob}
              fileName={fileName}
              translatedSize={translatedSize}
              numPages={numPages}
              targetLanguage={targetLanguage}
              onDocumentLoadSuccess={onDocumentLoadSuccess}
              onDownload={() => download(fileName)}
            />
          )}

          {activeTab === "summary" && (
            <SummaryPreview summaryText={summaryText} />
          )}
        </div>
      </div>
    </div>
  );
}
