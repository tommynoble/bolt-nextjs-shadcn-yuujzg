import csv
from pathlib import Path
from datetime import datetime
from typing import Dict, Any

def generate_report(analysis_results: Dict[str, Any]) -> str:
    """Generate CSV report from damage analysis results"""
    # Ensure reports directory exists
    reports_dir = Path("reports")
    reports_dir.mkdir(exist_ok=True)
    
    # Generate unique filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    report_path = reports_dir / f"damage_report_{timestamp}.csv"
    
    # Flatten analysis results for CSV
    flat_data = {
        "Timestamp": datetime.now().isoformat(),
        "Damage Type": analysis_results["damage_type"],
        "Severity": analysis_results["severity"],
        "Location": analysis_results["location"],
        "Confidence": f"{analysis_results['confidence']:.2%}",
        "Estimated Cost Range": f"${analysis_results['estimated_cost']['min']} - ${analysis_results['estimated_cost']['max']}",
        "Recommendations": "; ".join(analysis_results["recommendations"])
    }
    
    # Write CSV report
    with report_path.open("w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(flat_data.keys())
        writer.writerow(flat_data.values())
    
    return str(report_path)