from typing import List
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import Response
from app.services.pdf_service import pdf_service

router = APIRouter()

@router.post("/merge")
async def merge_pdfs(files: List[UploadFile] = File(...)):
    if len(files) < 2:
        raise HTTPException(status_code=400, detail="At least two PDF files are required to merge.")
    
    pdf_contents = []
    for file in files:
        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail=f"File {file.filename} is not a PDF.")
        pdf_contents.append(await file.read())
    
    try:
        merged_pdf = await pdf_service.merge_pdfs(pdf_contents)
        return Response(
            content=merged_pdf,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=merged.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error merging PDFs: {str(e)}")

@router.post("/split")
async def split_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="File must be a PDF.")
    
    pdf_content = await file.read()
    
    try:
        zipped_pdf = await pdf_service.split_pdf(pdf_content)
        return Response(
            content=zipped_pdf,
            media_type="application/zip",
            headers={"Content-Disposition": "attachment; filename=split_pages.zip"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error splitting PDF: {str(e)}")
