import { useState } from "react";
import { base_url } from "../utils/constants";

export function usePdfTranslation() {
  const [loading, setLoading] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [translatedSize, setTranslatedSize] = useState<number>(0);
  const [numPages, setNumPages] = useState<number>(0);

  const translate = async (
    file: File,
    targetLanguage: string,
    onError: (msg: string) => void
  ) => {
    setLoading(true);
    setPdfBlob(null);
    setPdfUrl(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("targetLanguage", targetLanguage);

      const response = await fetch(base_url + "translate-pdf/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Translation error");
      }

      const blob = await response.blob();
      setPdfBlob(blob);
      setTranslatedSize(blob.size);

      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Translation error");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPdfBlob(null);
    setPdfUrl(null);
  };

  const download = (fileName: string) => {
    if (!pdfBlob) return;

    const url = window.URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `translated_${Date.now()}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    void fileName;
  };

  return {
    loading,
    pdfBlob,
    pdfUrl,
    translatedSize,
    numPages,
    setNumPages,
    translate,
    reset,
    download,
  };
}
