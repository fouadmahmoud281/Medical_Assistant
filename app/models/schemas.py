from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class SessionRequest(BaseModel):
    model: str = "gpt-4o-realtime-preview-2024-12-17"
    voice: str = "verse"
    system_prompt: str = None

# Dashboard-related models
class DashboardStats(BaseModel):
    total_patients: int
    today_appointments: int
    pending_reports: int
    emergency_cases: int
    patient_satisfaction: float
    average_wait_time: int
    attendance_rate: float

class Patient(BaseModel):
    id: str
    name: str
    age: int
    gender: str
    phone: str
    email: Optional[str] = None
    last_visit: str
    condition: str
    status: str  # stable, critical, recovering
    doctor_notes: Optional[str] = None

class Appointment(BaseModel):
    id: str
    patient_id: str
    patient_name: str
    doctor_name: str
    appointment_date: str
    appointment_time: str
    duration: int  # in minutes
    type: str  # consultation, follow-up, emergency, etc.
    status: str  # scheduled, completed, cancelled, no-show
    notes: Optional[str] = None

class DashboardResponse(BaseModel):
    stats: DashboardStats
    recent_patients: List[Patient]
    today_appointments: List[Appointment]
