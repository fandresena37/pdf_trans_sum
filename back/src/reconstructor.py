import fitz
import shutil
import os

def reconstruct_pdf(original_pdf, pages_data, translated_pages, output_path):
    if os.path.abspath(original_pdf) == os.path.abspath(output_path):
        raise ValueError("input_path et output_path doivent être différents !")

    shutil.copy(original_pdf, output_path)
    doc = fitz.open(output_path)

    for page_num, (page_data, translated_blocks) in enumerate(
        zip(pages_data, translated_pages)
    ):
        page = doc[page_num]

        # ✅ Étape 1 : Effacer tout le texte original
        for block in page_data["blocks"]:
            if block["text"].strip():
                rect = fitz.Rect(block["bbox"])
                page.draw_rect(rect, color=(1, 1, 1), fill=(1, 1, 1))

        # ✅ Étape 2 : Redessiner les éléments graphiques (fonds de tableau)
        for drawing in page_data["drawings"]:
            for item in drawing["items"]:
                if item[0] == "re":
                    rect = item[1]
                    fill_color = drawing.get("fill")
                    stroke_color = drawing.get("color")
                    width = drawing.get("width", 1)
                    page.draw_rect(
                        rect,
                        color=stroke_color,
                        fill=fill_color,
                        width=width
                    )
                elif item[0] == "l":
                    p1, p2 = item[1], item[2]
                    stroke_color = drawing.get("color")
                    width = drawing.get("width", 1)
                    page.draw_line(
                        p1, p2,
                        color=stroke_color,
                        width=width
                    )

        # ✅ Étape 3 : Reconstruire les images
        for img in page_data.get("images", []):
            try:
                page.insert_image(
                    fitz.Rect(img["bbox"]),
                    stream=img["data"]["image"],
                    overlay=True
                )
            except Exception as e:
                print(f"⚠️ Erreur image page {page_num}: {e}")

        # ✅ Étape 4 : Réécrire le texte traduit par dessus
        for block, translated_text in zip(page_data["blocks"], translated_blocks):
            if not block["text"].strip():
                continue

            color = block["color"]
            r = ((color >> 16) & 0xFF) / 255
            g = ((color >> 8) & 0xFF) / 255
            b = (color & 0xFF) / 255

            page.insert_text(
                point=(block["bbox"][0], block["bbox"][3]),
                text=translated_text,
                fontname="helv",
                fontsize=block["size"],
                color=(r, g, b),
            )

    temp_path = output_path + ".tmp"
    doc.save(temp_path)
    doc.close()
    os.replace(temp_path, output_path)