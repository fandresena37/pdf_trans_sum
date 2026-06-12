import fitz 

def extract_content_translate(pdf_path):
    doc = fitz.open(pdf_path)
    pages_data = []

    for page_num, page in enumerate(doc):
        blocks = page.get_text("dict")
        images = page.get_images(full=True)
        drawings = page.get_drawings()
        page_data = {
            "page_num": page_num,
            "width": page.rect.width,
            "height": page.rect.height,
            "blocks": [],
            "images": [],
            "drawings": drawings
        }

        for img in page.get_images(full=True):
            xref = img[0] 
            try:
                for rect in page.get_image_rects(xref):
                    img_data = doc.extract_image(xref)  
                    page_data["images"].append({
                        "xref": xref,
                        "bbox": list(rect),
                        "data": img_data  
                    })
            except Exception as e:
                print(f"⚠️ Image ignorée page {page_num}: {e}")


        for block in blocks["blocks"]:
            if block["type"] == 0:  # bloc texte
                for line in block["lines"]:
                    for span in line["spans"]:
                        page_data["blocks"].append({
                            "text": span["text"],
                            "bbox": span["bbox"],       
                            "font": span["font"],        
                            "size": span["size"],        
                            "color": span["color"],      
                            "flags": span["flags"],      
                        })

        pages_data.append(page_data)

    doc.close()
    return pages_data


def extract_content_summiraze(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()
    return text