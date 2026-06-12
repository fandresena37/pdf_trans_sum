import google.generativeai as genai
from dotenv import load_dotenv
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(BASE_DIR, ".env"))
print(os.path.join(BASE_DIR, ".env"))


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def translate_texts(texts, target_language):
    """
    Traduit une liste de textes en une seule requête Gemini
    pour économiser les appels API
    """
    model = genai.GenerativeModel("gemini-3.5-flash")

    numbered = "\n".join([f"{i}|{text}" for i, text in enumerate(texts)])

    prompt = f"""Traduis chaque ligne suivante en {target_language}.
        Réponds UNIQUEMENT avec le même format numéroté : numéro|texte traduit
        Ne traduis pas les lignes vides ou les numéros.
        Ne change pas la mise en forme.

        {numbered}"""

    response = model.generate_content(prompt)
    
    translated = {}
    for line in response.text.strip().split("\n"):
        if "|" in line:
            idx, text = line.split("|", 1)
            translated[int(idx.strip())] = text.strip()

    return [translated.get(i, texts[i]) for i in range(len(texts))]


def summiraze_texts(texts, target_language:str,length: str, style: str):

    model = genai.GenerativeModel("gemini-3.5-flash")


    length_map = {
        "Short (~100 words))": "environ 100 mots",
        "Medium (~250 words)": "environ 250 mots",
        "Long (~500 words)": "environ 500 mots",
    }
    length_instruction = length_map.get(length, "environ 250 mots")

    style_map = {
        "Paragraph": "sous forme d'un ou plusieurs paragraphes fluides et continus",
        "Executive summary": (
            "sous forme d'un résumé exécutif structuré, avec une introduction, "
            "les points principaux, et une conclusion ou des recommandations"
        ),
    }
    style_instruction = style_map.get(style, "sous forme d'un paragraphe")

    prompt = f"""Tu es un assistant spécialisé dans la synthèse de documents.

        Voici le texte extrait d'un document PDF :

        \"\"\"
        {texts}
        \"\"\"

        Consignes :
        - Rédige un résumé de ce document en {target_language}.
        - Le résumé doit faire {length_instruction}.
        - Le résumé doit être présenté {style_instruction}.
        - Le résumé doit être en markdown
        - Ne fais aucun commentaire sur la demande elle-même, donne uniquement le résumé.
        - Ne mentionne pas que tu es une IA.

        Résumé :"""
    
    response = model.generate_content(prompt)
    return response.text.strip()