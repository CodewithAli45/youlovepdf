from pypdf import PdfWriter, PdfReader
import io
import zipfile
from typing import List

class PDFService:
    @staticmethod
    async def merge_pdfs(pdf_files: List[bytes]) -> bytes:
        merger = PdfWriter()
        for pdf_data in pdf_files:
            merger.append(io.BytesIO(pdf_data))
        
        output = io.BytesIO()
        merger.write(output)
        merger.close()
        return output.getvalue()

    @staticmethod
    async def split_pdf(pdf_bytes: bytes) -> bytes:
        reader = PdfReader(io.BytesIO(pdf_bytes))
        zip_buffer = io.BytesIO()
        
        with zipfile.ZipFile(zip_buffer, "w") as zip_file:
            for i, page in enumerate(reader.pages):
                writer = PdfWriter()
                writer.add_page(page)
                
                page_buffer = io.BytesIO()
                writer.write(page_buffer)
                
                zip_file.writestr(f"page_{i+1}.pdf", page_buffer.getvalue())
                writer.close()
                
        return zip_buffer.getvalue()

pdf_service = PDFService()
