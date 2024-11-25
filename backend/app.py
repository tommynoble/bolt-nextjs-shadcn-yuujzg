from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pathlib import Path
import shutil
import uuid

from damage_model import analyze_damage
from report_generator import generate_report

app = FastAPI(title="Vehicle Damage Analyzer API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure uploads directory exists
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@app.post("/api/analyze")
async def analyze_image(file: UploadFile = File(...)):
    """Analyze vehicle damage from uploaded image"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(400, "File must be an image")
    
    # Save uploaded file
    file_ext = Path(file.filename).suffix
    file_path = UPLOAD_DIR / f"{uuid.uuid4()}{file_ext}"
    
    try:
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Analyze damage using our model
        results = analyze_damage(str(file_path))
        
        # Generate report
        report_path = generate_report(results)
        
        return {
            "success": True,
            "results": results,
            "report_url": f"/api/reports/{Path(report_path).name}"
        }
        
    except Exception as e:
        raise HTTPException(500, str(e))
    finally:
        # Cleanup uploaded file
        file_path.unlink(missing_ok=True)

@app.get("/api/reports/{filename}")
async def get_report(filename: str):
    """Download generated report"""
    report_path = Path("reports") / filename
    if not report_path.exists():
        raise HTTPException(404, "Report not found")
    
    return FileResponse(
        report_path,
        media_type="text/csv",
        filename=f"damage_report_{filename}"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)