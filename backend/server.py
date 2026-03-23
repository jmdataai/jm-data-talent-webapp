from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class ContactForm(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    message: str
    form_type: str = "contact"  # contact, demo, consultation
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    message: str
    form_type: str = "contact"

class JobPosition(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    company: str
    location: str
    type: str  # Permanent, Contract, Remote
    experience: str
    skills: List[str]
    description: str
    salary_range: Optional[str] = None
    posted_date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class JobApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    job_id: str
    name: str
    email: EmailStr
    phone: str
    current_company: Optional[str] = None
    experience_years: int
    linkedin: Optional[str] = None
    cover_letter: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class JobApplicationCreate(BaseModel):
    job_id: str
    name: str
    email: EmailStr
    phone: str
    current_company: Optional[str] = None
    experience_years: int
    linkedin: Optional[str] = None
    cover_letter: Optional[str] = None

# Routes
@api_router.get("/")
async def root():
    return {"message": "JM DATA TALENT API", "status": "active"}

@api_router.post("/contact", response_model=ContactForm)
async def submit_contact_form(input: ContactFormCreate):
    """Submit a contact, demo booking, or consultation form"""
    form_dict = input.model_dump()
    form_obj = ContactForm(**form_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = form_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.contact_forms.insert_one(doc)
    return form_obj

@api_router.get("/jobs", response_model=List[JobPosition])
async def get_job_positions(
    type: Optional[str] = None,
    location: Optional[str] = None
):
    """Get all job positions with optional filtering"""
    query = {}
    if type:
        query['type'] = type
    if location:
        query['location'] = {'$regex': location, '$options': 'i'}
    
    jobs = await db.job_positions.find(query, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for job in jobs:
        if isinstance(job.get('posted_date'), str):
            job['posted_date'] = datetime.fromisoformat(job['posted_date'])
    
    return jobs

@api_router.get("/jobs/{job_id}", response_model=JobPosition)
async def get_job_by_id(job_id: str):
    """Get a specific job position by ID"""
    job = await db.job_positions.find_one({"id": job_id}, {"_id": 0})
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    if isinstance(job.get('posted_date'), str):
        job['posted_date'] = datetime.fromisoformat(job['posted_date'])
    
    return job

@api_router.post("/applications", response_model=JobApplication)
async def submit_job_application(input: JobApplicationCreate):
    """Submit a job application"""
    # Check if job exists
    job = await db.job_positions.find_one({"id": input.job_id}, {"_id": 0})
    if not job:
        raise HTTPException(status_code=404, detail="Job position not found")
    
    app_dict = input.model_dump()
    app_obj = JobApplication(**app_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = app_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.job_applications.insert_one(doc)
    return app_obj

@api_router.get("/stats")
async def get_stats():
    """Get platform statistics"""
    total_jobs = await db.job_positions.count_documents({})
    total_applications = await db.job_applications.count_documents({})
    total_contacts = await db.contact_forms.count_documents({})
    
    return {
        "total_jobs": total_jobs,
        "total_applications": total_applications,
        "total_contacts": total_contacts,
        "professionals_placed": 850,
        "client_engagements": 240,
        "cost_savings_percent": 40,
        "satisfaction_rate": 98
    }

# Seed initial job positions
@api_router.post("/seed-jobs")
async def seed_jobs():
    """Seed initial job positions"""
    existing_count = await db.job_positions.count_documents({})
    if existing_count > 0:
        return {"message": "Jobs already seeded", "count": existing_count}
    
    sample_jobs = [
        {
            "id": str(uuid.uuid4()),
            "title": "Senior Full Stack Developer",
            "company": "Leading Tech Company",
            "location": "Dublin, Ireland",
            "type": "Permanent",
            "experience": "5+ years",
            "skills": ["React", "Node.js", "MongoDB", "AWS"],
            "description": "We're seeking an experienced Full Stack Developer to join our growing team.",
            "salary_range": "€70,000 - €90,000",
            "posted_date": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "DevOps Engineer",
            "company": "Global Enterprise",
            "location": "Remote",
            "type": "Contract",
            "experience": "3+ years",
            "skills": ["Docker", "Kubernetes", "Jenkins", "Terraform"],
            "description": "Join our DevOps team to build and maintain cloud infrastructure.",
            "salary_range": "€450 - €600 per day",
            "posted_date": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Data Scientist",
            "company": "Pharma Innovation Ltd",
            "location": "Cork, Ireland",
            "type": "Permanent",
            "experience": "4+ years",
            "skills": ["Python", "Machine Learning", "TensorFlow", "SQL"],
            "description": "Work on cutting-edge AI/ML projects in pharmaceutical research.",
            "salary_range": "€65,000 - €85,000",
            "posted_date": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "React Native Developer",
            "company": "FinTech Startup",
            "location": "Limerick, Ireland",
            "type": "Permanent",
            "experience": "3+ years",
            "skills": ["React Native", "TypeScript", "iOS", "Android"],
            "description": "Build mobile-first financial applications for millions of users.",
            "salary_range": "€55,000 - €75,000",
            "posted_date": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Cloud Architect",
            "company": "Enterprise Solutions",
            "location": "Dublin, Ireland",
            "type": "Permanent",
            "experience": "7+ years",
            "skills": ["AWS", "Azure", "Microservices", "Security"],
            "description": "Design and implement cloud-native solutions for enterprise clients.",
            "salary_range": "€85,000 - €110,000",
            "posted_date": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "QA Automation Engineer",
            "company": "Healthcare Tech",
            "location": "Remote",
            "type": "Contract",
            "experience": "4+ years",
            "skills": ["Selenium", "Cypress", "Java", "CI/CD"],
            "description": "Lead automation testing initiatives for healthcare applications.",
            "salary_range": "€400 - €550 per day",
            "posted_date": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    _ = await db.job_positions.insert_many(sample_jobs)
    return {"message": "Jobs seeded successfully", "count": len(sample_jobs)}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()