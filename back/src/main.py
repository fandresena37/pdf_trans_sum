from src.extractor import extract_content_translate,extract_content_summiraze
from src.prompt import translate_texts,summiraze_texts
from src.reconstructor import reconstruct_pdf


def process_translate_pdf(input_path, output_path, target_language):

    pages_data = extract_content_translate(input_path)
    
    all_texts = []
    page_sizes = []
    for page_data in pages_data:
        texts = [block["text"] for block in page_data["blocks"]]
        all_texts.extend(texts)
        page_sizes.append(len(texts))  

    all_translated = translate_texts(all_texts, target_language) if all_texts else []

    translated_pages = []
    idx = 0
    for size in page_sizes:
        translated_pages.append(all_translated[idx:idx + size])
        idx += size

    reconstruct_pdf(input_path, pages_data, translated_pages, output_path)


def process_summiraze(path,target_language,length,style):
    
    text = extract_content_summiraze(path)

    response = summiraze_texts(text,target_language,length,style)

    return response

