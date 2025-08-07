from fastapi import APIRouter
from ..models.schemas import SessionRequest, DashboardStats, Patient, Appointment, DashboardResponse
from ..services.openai_service import create_openai_session
from typing import List
from datetime import datetime, timedelta

router = APIRouter()

@router.post("/api/sessions")
async def create_session(session_request: SessionRequest):
    """Create an ephemeral session token for WebRTC client use"""
    return await create_openai_session(
        session_request.model, 
        session_request.voice,
        session_request.system_prompt
    )

# Add a simple health check endpoint
@router.get("/api/health")
async def health_check():
    return {"status": "ok"}

# Dashboard API endpoints
@router.get("/api/dashboard/stats", response_model=DashboardStats)
async def get_dashboard_stats():
    """Get dashboard statistics for the doctor"""
    return DashboardStats(
        total_patients=1247,
        today_appointments=18,
        pending_reports=7,
        emergency_cases=3,
        patient_satisfaction=94.2,
        average_wait_time=15,
        attendance_rate=87.5
    )

@router.get("/api/dashboard/patients", response_model=List[Patient])
async def get_recent_patients():
    """Get list of recent patients"""
    return [
        Patient(
            id="1",
            name="أحمد محمد علي",
            age=45,
            gender="ذكر",
            phone="01234567890",
            email="ahmed.ali@email.com",
            last_visit="2024-01-15",
            condition="ضغط الدم المرتفع",
            status="stable",
            doctor_notes="المريض يتجاوب جيداً مع العلاج"
        ),
        Patient(
            id="2",
            name="فاطمة حسن محمود",
            age=32,
            gender="أنثى",
            phone="01098765432",
            email="fatma.hassan@email.com",
            last_visit="2024-01-14",
            condition="السكري من النوع الثاني",
            status="recovering",
            doctor_notes="تحسن ملحوظ في مستوى السكر"
        ),
        Patient(
            id="3",
            name="محمود عبد الله",
            age=28,
            gender="ذكر",
            phone="01156789012",
            email="mahmoud.abdullah@email.com",
            last_visit="2024-01-13",
            condition="التهاب المفاصل الروماتويدي",
            status="critical",
            doctor_notes="يحتاج متابعة دقيقة وتعديل الدواء"
        ),
        Patient(
            id="4",
            name="سارة أحمد إبراهيم",
            age=38,
            gender="أنثى",
            phone="01087654321",
            email="sara.ahmed@email.com",
            last_visit="2024-01-12",
            condition="الربو الشعبي",
            status="stable",
            doctor_notes="حالة مستقرة مع الأدوية الحالية"
        ),
        Patient(
            id="5",
            name="علي حسن محمد",
            age=55,
            gender="ذكر",
            phone="01123456789",
            email="ali.hassan@email.com",
            last_visit="2024-01-11",
            condition="أمراض القلب",
            status="recovering",
            doctor_notes="تحسن في وظائف القلب بعد العملية"
        )
    ]

@router.get("/api/dashboard/appointments", response_model=List[Appointment])
async def get_today_appointments():
    """Get today's appointments"""
    today = datetime.now().strftime("%Y-%m-%d")
    
    return [
        Appointment(
            id="1",
            patient_id="6",
            patient_name="سارة أحمد الزهراء",
            doctor_name="د. أحمد محمد",
            appointment_date=today,
            appointment_time="09:00",
            duration=30,
            type="فحص دوري",
            status="scheduled",
            notes="فحص دوري للضغط والسكر"
        ),
        Appointment(
            id="2",
            patient_id="7",
            patient_name="علي محمد حسن",
            doctor_name="د. أحمد محمد",
            appointment_date=today,
            appointment_time="09:30",
            duration=45,
            type="استشارة",
            status="completed",
            notes="استشارة حول آلام الظهر"
        ),
        Appointment(
            id="3",
            patient_id="8",
            patient_name="نور الدين عبد الرحمن",
            doctor_name="د. أحمد محمد",
            appointment_date=today,
            appointment_time="10:15",
            duration=30,
            type="متابعة",
            status="completed",
            notes="متابعة علاج السكري"
        ),
        Appointment(
            id="4",
            patient_id="9",
            patient_name="مريم أحمد علي",
            doctor_name="د. أحمد محمد",
            appointment_date=today,
            appointment_time="11:00",
            duration=60,
            type="فحص شامل",
            status="scheduled",
            notes="فحص شامل سنوي"
        ),
        Appointment(
            id="5",
            patient_id="10",
            patient_name="خالد محمود حسن",
            doctor_name="د. أحمد محمد",
            appointment_date=today,
            appointment_time="14:00",
            duration=30,
            type="متابعة",
            status="scheduled",
            notes="متابعة علاج ضغط الدم"
        ),
        Appointment(
            id="6",
            patient_id="11",
            patient_name="هدى عبد الله",
            doctor_name="د. أحمد محمد",
            appointment_date=today,
            appointment_time="14:30",
            duration=45,
            type="استشارة",
            status="scheduled",
            notes="استشارة حول الصداع المزمن"
        ),
        Appointment(
            id="7",
            patient_id="12",
            patient_name="يوسف إبراهيم",
            doctor_name="د. أحمد محمد",
            appointment_date=today,
            appointment_time="15:15",
            duration=30,
            type="فحص دوري",
            status="cancelled",
            notes="ألغى المريض الموعد"
        ),
        Appointment(
            id="8",
            patient_id="13",
            patient_name="ليلى حسن أحمد",
            doctor_name="د. أحمد محمد",
            appointment_date=today,
            appointment_time="16:00",
            duration=30,
            type="متابعة",
            status="scheduled",
            notes="متابعة علاج الغدة الدرقية"
        )
    ]

@router.get("/api/dashboard", response_model=DashboardResponse)
async def get_dashboard_data():
    """Get complete dashboard data including stats, patients, and appointments"""
    stats = await get_dashboard_stats()
    patients = await get_recent_patients()
    appointments = await get_today_appointments()
    
    return DashboardResponse(
        stats=stats,
        recent_patients=patients[:5],  # Return only first 5 recent patients
        today_appointments=appointments
    )
