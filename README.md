# 🚀 Candidate Review Dashboard

> A production-ready internal recruiter dashboard built with **React 19**, **Vite**, and **Tailwind CSS** to streamline candidate review, evaluation, prioritization, and comparison.

Designed with a modern SaaS interface inspired by **Linear**, **Vercel**, **Notion**, and the **Stripe Dashboard**, this project focuses on clean architecture, reusable components, scalable state management, and an intuitive user experience.

---

## ✨ Features

### 📊 Dashboard Overview

Provides recruiters with a quick overview of the hiring pipeline.

- 👥 Total Candidates
- ✅ Reviewed
- ⏳ Pending
- 🌟 Shortlisted
- ❌ Rejected

Each summary card includes:

- Modern icon
- Color-coded status
- Hover animations
- Responsive layout

---

### 🔍 Smart Search

Search candidates instantly with a **500ms debounced search**.

Search by:

- Name
- Email
- College

---

### 🎯 Advanced Filtering

Filter candidates using multiple criteria.

Available Filters:

- Assignment Score
- Video Score
- ATS Score
- Priority
- Review Status
- College

---

### 📈 Dynamic Sorting

Sort candidates by:

- Priority
- Assignment Score
- Video Score
- ATS Score
- Newest
- Oldest

---

### 👨‍💻 Candidate Table

Responsive table for reviewing candidate information.

Columns:

- Avatar
- Name
- College
- Assignment Score
- Video Score
- ATS Score
- Priority
- Review Status
- Actions

Features:

- Sticky Header
- Hover Effects
- Pagination
- Responsive Layout
- Avatar Fallback
- Loading Skeleton
- Empty State

---

### 📄 Candidate Profile Drawer

Clicking a candidate opens a detailed profile drawer.

Includes:

- Personal Information
- Contact Details
- College & Degree
- Skills & Experience
- Resume
- GitHub
- LinkedIn
- Review Status
- Submission Date

Score Overview:

- Assignment
- Video
- ATS
- GitHub
- Communication

Responsive behavior:

- Right-side drawer on desktop
- Fullscreen drawer on mobile

---

### 📝 Assignment Evaluation

Evaluate frontend assignments using interactive sliders.

Evaluation Criteria:

- UI Quality
- Component Structure
- State Management
- Edge Case Handling
- Responsiveness
- Accessibility

Features:

- Slider (0–100)
- Automatic Average Score
- Real-time Updates

---

### 🎥 Video Evaluation

Evaluate interview performance using five categories.

Criteria:

- Confidence
- Communication
- Architecture Explanation
- Tradeoff Discussion
- Problem Solving

Additional Features:

- Timestamp Notes
- Add Notes
- Edit Notes
- Delete Notes

---

### ⚡ Automatic Priority Engine

Priority updates automatically whenever candidate scores change.

### Formula

```text
Final Score =
Assignment × 30%
+ Video × 25%
+ ATS × 20%
+ GitHub × 15%
+ Communication × 10%
```

| Priority | Score | Recommendation |
|----------|-------|----------------|
| 🟢 P0 | 90–100 | Interview Immediately |
| 🟡 P1 | 75–89 | Strong Shortlist |
| 🟠 P2 | 60–74 | Review Later |
| 🔴 P3 | Below 60 | Reject |

---

### ⚖️ Candidate Comparison

Compare up to **three candidates** side-by-side.

Comparison includes:

- Assignment Score
- Video Score
- ATS Score
- GitHub Score
- Communication Score
- Final Priority

Highest values are automatically highlighted.

---

### 📊 Analytics Dashboard

Interactive charts built with **Recharts**.

Includes:

- Assignment Score Distribution
- Priority Distribution
- Review Progress
- Overall Candidate Statistics

---

### 📱 Responsive Design

Optimized for:

- Desktop
- Tablet
- Mobile

Features:

- Responsive Sidebar
- Mobile Navigation
- Adaptive Table
- Fullscreen Drawer

---

### ✨ Modern User Experience

- Framer Motion Animations
- Smooth Transitions
- Hover Effects
- Skeleton Loading
- Rounded Cards
- Soft Shadows
- Glassmorphism Elements

---

### 🛡 Error Handling

Gracefully handles:

- Missing Data
- Empty Candidate Lists
- Broken Avatar URLs
- Unknown Priority
- Empty Search Results
- Empty Comparison Selection

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── Dashboard/
│   ├── CandidateTable/
│   ├── CandidateDrawer/
│   ├── Charts/
│   ├── Layout/
│   ├── common/
│   ├── SearchBar.jsx
│   ├── Filters.jsx
│   ├── SortMenu.jsx
│   └── ComparisonModal.jsx
│
├── context/
│   └── CandidateContext.jsx
│
├── hooks/
│   ├── useCandidates.js
│   └── usePriority.js
│
├── utils/
│   ├── priorityEngine.js
│   ├── helpers.js
│   └── constants.js
│
├── data/
│   └── candidates.json
│
├── App.jsx
├── main.jsx
│
└── scripts/
    └── generateCandidates.mjs
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | Frontend Framework |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| React Icons | Icons |
| React Context API | State Management |
| Recharts | Charts |
| Framer Motion | Animations |
| Local JSON | Data Storage |

---

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run ESLint

```bash
npm run lint
```

### Generate new candidate data

```bash
node scripts/generateCandidates.mjs
```

---

## 🏗 Architecture

- **CandidateContext** manages global application state.
- **useCandidates** handles search, filtering, sorting, and pagination.
- **usePriority** calculates candidate priority dynamically.
- **priorityEngine.js** implements the weighted scoring algorithm.
- Reusable UI components ensure scalability and maintainability.

---

## 📸 Screenshots

> Add screenshots after running the project.

- Dashboard Overview
- Candidate Table
- Candidate Drawer
- Assignment Evaluation
- Comparison Modal
- Analytics Dashboard

---

## 🌐 Deployment

This project is a static Vite application and can be deployed on:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

Build command:

```bash
npm run build
```

Deploy the generated `dist/` folder.

---

---

## 👨‍💻 Author

**Harsh Vardhan Maurya**

Frontend Developer specializing in React, JavaScript, and modern UI development.

This project demonstrates clean architecture, reusable components, responsive design, state management with React Context API, and production-quality frontend engineering practices.