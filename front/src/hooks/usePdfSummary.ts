import { useState } from "react";
import { base_url } from "../utils/constants";

export function usePdfSummary() {
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryText, setSummaryText] = useState<string | null>(null);

  const generateSummary = async (
    file: File,
    targetLanguage: string,
    length: string,
    style: string,
    onError: (msg: string) => void
  ) => {
    setSummaryLoading(true);
    setSummaryText(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("length", length);
      formData.append("style", style);
      formData.append("targetLanguage", targetLanguage);

      const response = await fetch(base_url + "summarize-pdf/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Summary error");
      }

      const data = await response.json();
      setSummaryText(data.summary);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Summary error");
    } finally {
      setSummaryLoading(false);
    }
  };

  const reset = () => setSummaryText(null);

  return {
    summaryLoading,
    summaryText,
    generateSummary,
    reset,
  };
}
