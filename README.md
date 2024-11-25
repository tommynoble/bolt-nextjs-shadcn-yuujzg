# Vehicle Damage Analyzer

A modern web application for analyzing vehicle damage using computer vision and machine learning.

## Features

- Upload and analyze vehicle damage images
- Get detailed damage assessment reports
- Cost estimates and repair recommendations
- CSV report generation
- Modern, responsive UI

## Tech Stack

### Frontend
- Next.js 13
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide icons

### Backend
- FastAPI
- Python
- Pillow for image processing
- NumPy for numerical operations
- Pandas for data handling

## Project Structure

```
vehicle_damage_analyzer/
├── frontend/                 # Next.js frontend
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   └── public/              # Static assets
│
├── backend/                 # Python backend
│   ├── app.py              # FastAPI application
│   ├── damage_model.py     # Damage analysis logic
│   ├── report_generator.py # CSV report generation
│   └── requirements.txt    # Python dependencies
```

## Getting Started

### Frontend

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

### Backend

1. Create a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Start the backend server:
   ```bash
   python app.py
   ```

## API Endpoints

- `POST /api/analyze` - Upload and analyze vehicle damage image
- `GET /api/reports/{filename}` - Download generated damage report

## License

MIT