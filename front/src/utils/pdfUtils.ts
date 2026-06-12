import { pdfjs } from "react-pdf";
import * as pdfjsLib from "pdfjs-dist";
import type { TextItem } from "pdfjs-dist/types/src/display/api";
import { franc } from "franc";
import langs from "langs";
import { languages } from "./constants";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export async function detectPdfLanguage(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let text = "";
  const numPages = Math.min(pdf.numPages, 3);
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: TextItem) => item.str).join(" ");
    if (text.length > 1000) break;
  }

  const lang3 = franc(text);
  const lang1 = langs.where("3", lang3)?.[1] || "und";

  let langue = "undefined";
  languages.forEach((elt) => {
    if (elt.code === lang1) {
      langue = elt.name;
    }
  });

  return langue;
}

export async function getPdfPageCount(file: File): Promise<number> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  return pdf.numPages;
}
