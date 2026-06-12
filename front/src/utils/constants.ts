export const languages = [
  { code: "fr", name: "French" },
  { code: "en", name: "English" },
  { code: "de", name: "German" },
  { code: "es", name: "Spanish" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
];

export const summaryLengths = [
  { code: "court", name: "Short (~100 words)" },
  { code: "moyen", name: "Medium (~250 words)" },
  { code: "long", name: "Long (~500 words)" },
];

export const summaryStyles = [
  { code: "paragraphe", name: "Paragraph" },
  { code: "executif", name: "Executive summary" },
];

export const base_url = import.meta.env.VITE_API_URL;
