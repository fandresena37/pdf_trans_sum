from fastapi import FastAPI, UploadFile, File,Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from src.main import process_translate_pdf,process_summiraze
from fastapi.responses import JSONResponse
import os
import shutil


app = FastAPI()

origins = [
    "http://localhost:5173",  
    "http://localhost:3000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



UPLOAD_DIR = "result"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount("/files", StaticFiles(directory="result"), name="files")

@app.post("/translate-pdf/")
async def translate_pdf(file: UploadFile = File(...), targetLanguage: str = Form(...)):
    input_path = f"{UPLOAD_DIR}/{file.filename}"
    output_path = f"{UPLOAD_DIR}/translated_{file.filename}"

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    process_translate_pdf(
        input_path=input_path,
        output_path=output_path,
        target_language=targetLanguage  
    )
    print(targetLanguage)
    

    return FileResponse(
        path=output_path,
        media_type="application/pdf",
        filename=f"translated_{file.filename}"
    )

@app.post("/summarize-pdf/")
async def summarize_pdf(file: UploadFile = File(...),targetLanguage:str = Form(...),length:str = Form(...),style:str = Form(...)):
    input_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    response = process_summiraze(input_path,targetLanguage,length,style)
    return JSONResponse(content={"summary": response})
