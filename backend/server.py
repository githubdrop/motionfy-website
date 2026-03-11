from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
resend.api_key = os.environ.get('RESEND_API_KEY')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', 'wesparcmedia@gmail.com')

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Models
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

# Static Data
CASE_STUDIES = [
    {
        "id": "1",
        "title": "Oncology Drug Launch Across 12 Markets",
        "client": "Meridian Therapeutics",
        "industry": "Pharmaceuticals",
        "challenge": "Meridian Therapeutics needed to launch their breakthrough CAR-T therapy across 12 markets simultaneously while ensuring regulatory compliance and consistent messaging across diverse healthcare systems.",
        "solution": "We developed an integrated global launch strategy with localized HCP engagement programs, compliant digital campaigns, and a unified brand platform that adapted to regional requirements while maintaining core messaging integrity.",
        "results": ["47% increase in HCP awareness within 6 months", "32% above target prescription rates in Year 1", "MM&M Gold Award for Best Product Launch"],
        "image_url": "https://images.unsplash.com/photo-1576765608689-c0e8f69a46b2?w=800&q=80",
        "tags": ["Oncology", "Global Launch", "HCP Marketing"]
    },
    {
        "id": "2",
        "title": "Gene Therapy Company IPO Communications",
        "client": "Helix Genomics",
        "industry": "Biotechnology",
        "challenge": "Helix Genomics, a pre-revenue gene therapy company, needed to articulate their complex science and pipeline potential to institutional investors ahead of their NASDAQ IPO.",
        "solution": "Created comprehensive investor communications including a compelling equity story, scientific platform presentations, roadshow materials, and ongoing IR support.",
        "results": ["Successful $380M IPO, 25% above initial range", "Coverage initiated by 8 major analysts", "180+ institutional meetings completed"],
        "image_url": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
        "tags": ["Gene Therapy", "IPO", "Investor Relations"]
    },
    {
        "id": "3",
        "title": "Surgical Robotics Market Expansion",
        "client": "Apex Surgical Systems",
        "industry": "Medical Devices",
        "challenge": "Apex needed to differentiate their surgical robotics platform in a market dominated by established players and build awareness among hospital C-suite decision makers.",
        "solution": "Built comprehensive thought leadership program featuring clinical evidence campaigns, KOL development, targeted account-based marketing, and executive engagement events.",
        "results": ["185% increase in qualified enterprise leads", "12 new health system partnerships", "Featured in 3 peer-reviewed publications"],
        "image_url": "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&q=80",
        "tags": ["Surgical Robotics", "B2B Marketing", "Thought Leadership"]
    },
    {
        "id": "4",
        "title": "Rare Disease Patient Awareness Campaign",
        "client": "Orion Rare Disease",
        "industry": "Pharmaceuticals",
        "challenge": "Launch awareness campaign for a rare metabolic disorder affecting only 5,000 patients in the US, requiring both patient identification and HCP education strategies.",
        "solution": "Developed multi-channel unbranded disease awareness campaign with patient community partnerships, diagnostic pathway education for specialists, and targeted digital outreach.",
        "results": ["340% increase in disease-related searches", "58% improvement in time-to-diagnosis", "Partnership with 4 patient advocacy organizations"],
        "image_url": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
        "tags": ["Rare Disease", "Patient Advocacy", "Awareness"]
    },
    {
        "id": "5",
        "title": "Digital Transformation for Diagnostics Leader",
        "client": "Precision Diagnostics Inc.",
        "industry": "Biotechnology",
        "challenge": "Transform traditional B2B marketing approach for a molecular diagnostics company entering the direct-to-consumer genetic testing market.",
        "solution": "Built end-to-end digital marketing infrastructure including e-commerce platform, performance marketing campaigns, CRM implementation, and customer journey optimization.",
        "results": ["$12M in DTC revenue within first year", "CAC reduced by 45% through optimization", "4.8 star average customer rating"],
        "image_url": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
        "tags": ["Diagnostics", "DTC", "Digital Marketing"]
    },
    {
        "id": "6",
        "title": "Cardiovascular Device FDA Approval Campaign",
        "client": "CardioVance Medical",
        "industry": "Medical Devices",
        "challenge": "Prepare market-shaping communications strategy ahead of FDA approval for novel heart valve replacement device, building anticipation while remaining compliant.",
        "solution": "Executed pre-approval medical education strategy, clinical data dissemination through congresses, KOL engagement program, and launch-ready integrated campaign.",
        "results": ["98% target HCP awareness at launch", "First procedure within 48 hours of approval", "Category leadership within 18 months"],
        "image_url": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
        "tags": ["Cardiovascular", "FDA Launch", "Medical Education"]
    }
]

BLOG_POSTS = [
    {
        "id": "1",
        "title": "Navigating FDA Guidelines for Digital Health Marketing in 2024",
        "excerpt": "The regulatory landscape for digital health promotion continues to evolve. Here's what marketers need to know about recent FDA guidance updates.",
        "content": "Full article content...",
        "author": "Dr. Rachel Morrison",
        "category": "Regulatory",
        "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
        "published_at": "2024-12-15",
        "read_time": "8 min read"
    },
    {
        "id": "2",
        "title": "AI-Powered Personalization in Life Sciences Marketing",
        "excerpt": "How machine learning is transforming HCP engagement and enabling truly personalized omnichannel experiences in pharmaceutical marketing.",
        "content": "Full article content...",
        "author": "Marcus Webb",
        "category": "Innovation",
        "image_url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        "published_at": "2024-12-10",
        "read_time": "6 min read"
    },
    {
        "id": "3",
        "title": "Building Authentic Patient Advocacy Partnerships",
        "excerpt": "Effective strategies for developing meaningful relationships with patient advocacy organizations that benefit both patients and your brand.",
        "content": "Full article content...",
        "author": "Dr. Sarah Chen",
        "category": "Strategy",
        "image_url": "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80",
        "published_at": "2024-12-05",
        "read_time": "5 min read"
    },
    {
        "id": "4",
        "title": "The Complete Guide to Biotech IPO Communications",
        "excerpt": "From S-1 filing to first earnings call: a comprehensive playbook for life sciences companies preparing to go public.",
        "content": "Full article content...",
        "author": "James Mitchell",
        "category": "Strategy",
        "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        "published_at": "2024-11-28",
        "read_time": "12 min read"
    },
    {
        "id": "5",
        "title": "Medical Affairs & Marketing Alignment: Best Practices",
        "excerpt": "Breaking down silos between medical affairs and commercial teams to create more effective, compliant healthcare communications.",
        "content": "Full article content...",
        "author": "Dr. Rachel Morrison",
        "category": "Regulatory",
        "image_url": "https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80",
        "published_at": "2024-11-20",
        "read_time": "7 min read"
    },
    {
        "id": "6",
        "title": "Measuring ROI in Pharmaceutical Marketing",
        "excerpt": "Advanced analytics frameworks for demonstrating marketing impact in heavily regulated life sciences environments.",
        "content": "Full article content...",
        "author": "Marcus Webb",
        "category": "Innovation",
        "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "published_at": "2024-11-15",
        "read_time": "9 min read"
    }
]

TEAM_MEMBERS = [
    {
        "id": "1",
        "name": "Andrew",
        "role": "SEO Specialist",
        "bio": "Expert in search engine optimization with deep knowledge of healthcare and life sciences SEO. Drives organic growth and visibility for our clients' digital presence.",
        "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        "linkedin": "https://linkedin.com"
    },
    {
        "id": "2",
        "name": "Matt",
        "role": "Account Manager",
        "bio": "Dedicated client partner ensuring seamless communication and project delivery. Brings strategic insight and a client-first approach to every engagement.",
        "image_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
        "linkedin": "https://linkedin.com"
    },
    {
        "id": "3",
        "name": "Jing",
        "role": "Project Manager",
        "bio": "Keeps complex marketing campaigns on track and on budget. Expert at coordinating cross-functional teams to deliver exceptional results.",
        "image_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
        "linkedin": "https://linkedin.com"
    },
    {
        "id": "4",
        "name": "Afsaneh",
        "role": "Paid Ads Specialist",
        "bio": "Masters paid media strategy across Google, Meta, and LinkedIn. Optimizes campaigns for maximum ROI in competitive healthcare markets.",
        "image_url": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
        "linkedin": "https://linkedin.com"
    },
    {
        "id": "5",
        "name": "Danny",
        "role": "Social Media Manager",
        "bio": "Creates engaging social content that resonates with healthcare audiences. Builds authentic brand presence across all major platforms.",
        "image_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
        "linkedin": "https://linkedin.com"
    },
    {
        "id": "6",
        "name": "Nina",
        "role": "Brand Strategist",
        "bio": "Develops compelling brand narratives that differentiate our clients in crowded markets. Expert in positioning and messaging strategy.",
        "image_url": "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80",
        "linkedin": "https://linkedin.com"
    }
]

# Routes
@api_router.get("/")
async def root():
    return {"message": "Motionfy Agency API"}

async def send_notification_email(submission: ContactSubmissionCreate):
    """Send email notification for new contact form submission"""
    try:
        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10b981;">New Contact Form Submission</h2>
            <hr style="border: 1px solid #e5e7eb;">
            <p><strong>Name:</strong> {submission.name}</p>
            <p><strong>Email:</strong> {submission.email}</p>
            <p><strong>Company:</strong> {submission.company or 'Not provided'}</p>
            <p><strong>Phone:</strong> {submission.phone or 'Not provided'}</p>
            <p><strong>Service Interest:</strong> {submission.service_interest or 'Not specified'}</p>
            <hr style="border: 1px solid #e5e7eb;">
            <h3 style="color: #374151;">Message:</h3>
            <p style="background: #f3f4f6; padding: 15px; border-radius: 8px;">{submission.message}</p>
            <hr style="border: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px;">This email was sent from the Motionfy website contact form.</p>
        </div>
        """
        
        params = {
            "from": "Motionfy Contact <onboarding@resend.dev>",
            "to": [NOTIFICATION_EMAIL],
            "subject": f"New Inquiry from {submission.name}",
            "html": html_content,
            "reply_to": submission.email
        }
        
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email notification sent successfully: {email.get('id')}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email notification: {str(e)}")
        return False

@api_router.post("/contact")
async def submit_contact(input: ContactSubmissionCreate):
    submission_obj = ContactSubmission(**input.model_dump())
    doc = submission_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_submissions.insert_one(doc)
    
    # Send email notification (non-blocking)
    await send_notification_email(input)
    
    return {"success": True, "message": "Thank you! We'll be in touch soon."}

@api_router.post("/newsletter")
async def subscribe_newsletter(input: NewsletterSubscriptionCreate):
    existing = await db.newsletter_subscriptions.find_one({"email": input.email}, {"_id": 0})
    if existing and existing.get('is_active'):
        raise HTTPException(status_code=400, detail="Email already subscribed")
    
    subscription_obj = NewsletterSubscription(email=input.email)
    doc = subscription_obj.model_dump()
    doc['subscribed_at'] = doc['subscribed_at'].isoformat()
    await db.newsletter_subscriptions.insert_one(doc)
    return {"success": True, "message": "Successfully subscribed!"}

@api_router.get("/case-studies")
async def get_case_studies():
    return CASE_STUDIES

@api_router.get("/case-studies/{case_study_id}")
async def get_case_study(case_study_id: str):
    for cs in CASE_STUDIES:
        if cs["id"] == case_study_id:
            return cs
    raise HTTPException(status_code=404, detail="Case study not found")

@api_router.get("/blog")
async def get_blog_posts():
    return BLOG_POSTS

@api_router.get("/blog/{post_id}")
async def get_blog_post(post_id: str):
    for post in BLOG_POSTS:
        if post["id"] == post_id:
            return post
    raise HTTPException(status_code=404, detail="Blog post not found")

@api_router.get("/team")
async def get_team_members():
    return TEAM_MEMBERS

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
