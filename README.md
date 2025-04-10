
---

# 🐾 FurGo – All-in-One Pet Care Platform

FurGo is a comprehensive platform built to support pet owners and animal lovers with everything from daily care to adoption, veterinary assistance, AI-powered insights, and more.

## 🌐 Live Demo

[furgo.vercel.app](https://furgo.vercel.app/)

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Django + Django REST Framework
- **Database:** PostgreSQL
- **Authentication:** Djoser + JWT
- **Hosting:** Render / Vercel

---

## 📦 Features

### 🛍️ 1. Online Pet Store
- **Food & Nutrition** – Shop quality pet food with dietary preferences.
- **Toys & Accessories** – Beds, leashes, collars, grooming kits & more.
- **Medicines & Health Products** – Vet-approved products and supplements.
- **Auto-Refill Subscription** – Automate recurring essential purchases.

### 🐶 2. Pet Adoption Corner
- **Find Adoptable Pets** – Verified listings from shelters and individuals.
- **AI-Powered Pet Matchmaking** – Get matched with the perfect pet.
- **Post-Adoption Support** – Tips on diet, training, and healthcare.

### 📚 3. Know Your Little Friend
- **Pet Breed Database** – Learn about breed temperament & care.
- **AI-Powered Recommendations** – Suggests ideal breeds based on lifestyle.

### 🩺 4. Veterinary Services
- **Book Appointments** – Online/in-person vet scheduling.
- **Emergency Pet Help** – One-tap access to nearby vet clinics.

### 🤖 5. AI Chatbot for Pet Needs
- **Behavior Analysis** – Insights from actions/sounds.
- **Smart Shopping Assistant** – Tailored product suggestions.

### 💌 6. Virtual Pet Adoption (Sponsorship)
- **Sanctuary Animal Sponsorship** – Virtually adopt & name sanctuary animals.
- **Regular Updates** – Receive photos, videos, and wellness reports.

### 🎤 7. Pet Voice Recognition (AI)
- **Bark/Meow Analysis** – Detect moods and needs through sound.
- **Smart Device Integration** – Connects with pet cams and feeders.

### 🐾 8. Community & Engagement
- **Pet Community Forum** – Share stories, Q&A, and discussions.
- **Training & Tips Section** – Blogs, expert videos, and care guides.
- **Contests & Events** – Online pet shows and competitions.
- **Lost & Found Pets** – Report and get alerts for missing pets.

---

## 🚀 Getting Started

### Backend (Django)

```bash
cd backend
python -m venv env
source env/bin/activate  # or .\env\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend (`.env`)
```
PET_FINDER_CLIENT_ID=YOUR_SECRET_KEY
PET_FINDER_CLIENT_SECRET=YOUR_SECRET_KEY
PET_FINDER_BASE_URL='https://api.petfinder.com/v2/'
PET_FINDER_TOKEN_URL='https://api.petfinder.com/v2/oauth2/token'
EMAIL_HOST_USER=YOUR_HOST_USER
EMAIL_HOST_PASSWORD=YOUR_APP_PASSWORD
DEBUG=True
DATABASE_URL=YOUR_DATABASE_URL
GEMINI_API_KEY=YOUR_SECRET_KEY
SECRET_KEY=YOUR_DJANOG_SECRET_KEY
```

