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
class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    service_interest: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    service_interest: Optional[str] = None
    message: str

class NewsletterSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_active: bool = True

class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr

class CaseStudy(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    client: str
    industry: str
    challenge: str
    solution: str
    results: List[str]
    image_url: str
    tags: List[str]

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    excerpt: str
    content: str
    author: str
    category: str
    image_url: str
    published_at: str
    read_time: str

class TeamMember(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    role: str
    bio: str
    image_url: str
    linkedin: Optional[str] = None

# Sample Data
CASE_STUDIES = [
    {
        "id": "1",
        "title": "Global Pharma Brand Launch",
        "client": "NovaTera Pharmaceuticals",
        "industry": "Pharmaceuticals",
        "challenge": "Launch a new oncology drug in 12 markets simultaneously while navigating complex regulatory requirements.",
        "solution": "Developed an integrated multi-channel campaign with localized content strategies and compliant messaging frameworks.",
        "results": ["47% increase in HCP engagement", "32% above target prescription rates", "Award-winning campaign recognition"],
        "image_url": "https://images.unsplash.com/photo-1576669801838-1b1c52121e6a?w=800",
        "tags": ["Pharma", "Product Launch", "Multi-Market"]
    },
    {
        "id": "2",
        "title": "Biotech IPO Communications",
        "client": "Genova Biosciences",
        "industry": "Biotechnology",
        "challenge": "Position a gene therapy startup for successful IPO with clear investor communications.",
        "solution": "Created comprehensive investor materials, scientific storytelling content, and media relations strategy.",
        "results": ["Successful $450M IPO", "150+ media placements", "Strong analyst coverage"],
        "image_url": "https://images.unsplash.com/photo-1631556760585-2e846196d5a9?w=800",
        "tags": ["Biotech", "IPO", "Investor Relations"]
    },
    {
        "id": "3",
        "title": "Medical Device Market Entry",
        "client": "PrecisionMed Devices",
        "industry": "Medical Devices",
        "challenge": "Establish market presence for innovative surgical robotics platform in competitive landscape.",
        "solution": "Built thought leadership program, KOL engagement strategy, and digital presence optimization.",
        "results": ["200% increase in qualified leads", "Top 3 search rankings", "15 KOL partnerships established"],
        "image_url": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        "tags": ["Medical Devices", "Market Entry", "Digital"]
    }
]

BLOG_POSTS = [
    {
        "id": "1",
        "title": "Navigating FDA Guidelines for Digital Health Marketing",
        "excerpt": "Understanding the regulatory landscape for promoting digital health solutions in an evolving compliance environment.",
        "content": "Full article content here...",
        "author": "Dr. Sarah Chen",
        "category": "Regulatory",
        "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
        "published_at": "2024-12-15",
        "read_time": "8 min read"
    },
    {
        "id": "2",
        "title": "The Rise of AI in Life Sciences Marketing",
        "excerpt": "How artificial intelligence is transforming personalized healthcare communications and patient engagement.",
        "content": "Full article content here...",
        "author": "Michael Torres",
        "category": "Innovation",
        "image_url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        "published_at": "2024-12-10",
        "read_time": "6 min read"
    },
    {
        "id": "3",
        "title": "Building Trust in Biotech: Storytelling Strategies",
        "excerpt": "Effective narrative frameworks for communicating complex science to diverse stakeholder audiences.",
        "content": "Full article content here...",
        "author": "Emma Williams",
        "category": "Strategy",
        "image_url": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
        "published_at": "2024-12-05",
        "read_time": "5 min read"
    }
]

TEAM_MEMBERS = [
    {
        "id": "1",
        "name": "Dr. Alexandra Reid",
        "role": "Founder & CEO",
        "bio": "Former VP of Marketing at Pfizer with 20+ years in life sciences. PhD in Molecular Biology from Stanford.",
        "image_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
        "linkedin": "https://linkedin.com"
    },
    {
        "id": "2",
        "name": "James Chen",
        "role": "Chief Strategy Officer",
        "bio": "Led brand strategy for 50+ pharmaceutical launches. MBA from Wharton, former McKinsey consultant.",
        "image_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        "linkedin": "https://linkedin.com"
    },
    {
        "id": "3",
        "name": "Dr. Maria Santos",
        "role": "VP, Scientific Communications",
        "bio": "Published researcher and medical writer with expertise in oncology and immunology communications.",
        "image_url": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
        "linkedin": "https://linkedin.com"
    },
    {
        "id": "4",
        "name": "David Park",
        "role": "Creative Director",
        "bio": "Award-winning creative with 15 years experience in healthcare advertising. Former Havas Health lead.",
        "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        "linkedin": "https://linkedin.com"
    }
]

# Routes
@api_router.get("/")
async def root():
    return {"message": "BioLumina Agency API"}

@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(input: ContactSubmissionCreate):
    submission_dict = input.model_dump()
    submission_obj = ContactSubmission(**submission_dict)
    
    doc = submission_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contact_submissions.insert_one(doc)
    return submission_obj

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    for sub in submissions:
        if isinstance(sub['created_at'], str):
            sub['created_at'] = datetime.fromisoformat(sub['created_at'])
    return submissions

@api_router.post("/newsletter", response_model=NewsletterSubscription)
async def subscribe_newsletter(input: NewsletterSubscriptionCreate):
    # Check if already subscribed
    existing = await db.newsletter_subscriptions.find_one({"email": input.email}, {"_id": 0})
    if existing:
        if existing.get('is_active'):
            raise HTTPException(status_code=400, detail="Email already subscribed")
        else:
            # Reactivate subscription
            await db.newsletter_subscriptions.update_one(
                {"email": input.email},
                {"$set": {"is_active": True, "subscribed_at": datetime.now(timezone.utc).isoformat()}}
            )
            existing['is_active'] = True
            return existing
    
    subscription_obj = NewsletterSubscription(email=input.email)
    doc = subscription_obj.model_dump()
    doc['subscribed_at'] = doc['subscribed_at'].isoformat()
    
    await db.newsletter_subscriptions.insert_one(doc)
    return subscription_obj

@api_router.get("/case-studies", response_model=List[CaseStudy])
async def get_case_studies():
    return CASE_STUDIES

@api_router.get("/case-studies/{case_study_id}", response_model=CaseStudy)
async def get_case_study(case_study_id: str):
    for cs in CASE_STUDIES:
        if cs["id"] == case_study_id:
            return cs
    raise HTTPException(status_code=404, detail="Case study not found")

@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts():
    return BLOG_POSTS

@api_router.get("/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    for post in BLOG_POSTS:
        if post["id"] == post_id:
            return post
    raise HTTPException(status_code=404, detail="Blog post not found")

@api_router.get("/team", response_model=List[TeamMember])
async def get_team_members():
    return TEAM_MEMBERS

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
