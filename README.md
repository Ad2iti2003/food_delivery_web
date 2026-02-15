# Food_delivery_web

### Tech Stack

Frontend: React + Material UI / Tailwind

Backend: Node.js + Express.js

Database: MongoDB

Auth: JWT + bcrypt

Maps: Google Maps API

Payments: Stripe / Razorpay

Cloud: Cloudinary (images)

Core Features (MVP)
# AI Food Recommendation System
## User

Signup / Login (JWT)

Browse restaurants

Search & filter food

Add to cart

Place order

Live order status

## Restaurant

Restaurant dashboard

Menu management

Order management

## Admin

Approve restaurants

Manage users & orders

Analytics dashboard
### React → Node API → Python ML service → MongoDB

# AI Search (Natural Language Search)

“Show spicy Chinese food under ₹300”

### How:

Use NLP

Extract:

Cuisine

Price

Spice level

Convert text → MongoDB query

### Tools:

spaCy / Transformers

FastAPI (Python microservice)

# Sentiment Analysis on Reviews 

## Analyze reviews like:

“Food was amazing but delivery was slow”

## Output:

Food sentiment: Positive

Delivery sentiment: Neutral/Negative

## Tech:

Pretrained BERT

HuggingFace

Store sentiment scores in DB

# Dynamic Pricing / Discount Prediction 

## AI suggests:

Discounts during low demand

Surge pricing during peak hours

## Features used:

Time

Day

Weather

Past order volume

## Model:

Regression (XGBoost / Linear Regression)

# AI Chatbot (Food Assistant)

“What should I eat today?”

## Tech:

OpenAI API / LLaMA

Fine-tuned prompts

Integrated into React UI

zomato-clone/

│

├── client/  # React

├── server/        # Node + Express

├── ai-service/    # Python ML

│   ├── model.py

│   ├── app.py

│

├── docker-compose.yml

└── README.md


