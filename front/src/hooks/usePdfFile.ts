import { useState } from "react";
import { detectPdfLanguage, getPdfPageCount } from "../utils/pdfUtils";

export function usePdfFile() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<string | null>(null);
  const [inputNumPages, setInputNumPages] = useState<number>(0);

  const handleFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onFileAccepted?: () => void
  ) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please select a PDF file");
      return;
    }

    if (selectedFile.size > 25 * 1024 * 1024) {
      setError("File too large (max 25MB)");
      return;
    }

    const langue = await detectPdfLanguage(selectedFile);
    setLang(langue);

    const pages = await getPdfPageCount(selectedFile);
    setInputNumPages(pages);

    if (pages > 100) {
      setError(`This PDF contains ${pages} pages. Limit is 100 pages.`);
      setFile(null);
      setFileName("");
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setError(null);
    onFileAccepted?.();
  };

  return {
    file,
    fileName,
    error,
    setError,
    lang,
    inputNumPages,
    handleFile,
  };
}
