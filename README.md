# Learning Platform – Courses Service

Backend service responsible for managing courses, chapters, lectures, enrollments, and learning progress.

This service is part of a microservices learning platform architecture.

## Tech Stack

* NestJS
* Prisma ORM
* PostgreSQL (Supabase)
* Redis (Caching)
* Cloudinary (Video storage & streaming)
* Supabase Realtime (Events)
* JWT Authentication

---

# Architecture Overview

The platform is built using a microservices architecture.

Services:

* **Auth Service (.NET)**
  Responsible for authentication, user management, and JWT issuance.

* **Courses Service (NestJS)**
  Responsible for learning content management.

---

# System Roles

The system supports three roles:

STUDENT
ADMIN
SUPERADMIN

Permissions:

| Role       | Permissions                                    |
| ---------- | ---------------------------------------------- |
| STUDENT    | Enroll courses, watch lectures, track progress |
| ADMIN      | Create courses, chapters, lectures             |
| SUPERADMIN | Delete courses and content                     |

---

# Core Features

* Course Management
* Chapter Management
* Lecture Management
* Video Upload & Streaming
* Course Enrollment
* Progress Tracking
* Realtime Progress Events
* Redis Caching
* Role Based Access Control

---

# Environment Variables

Create a `.env` file:

```
DATABASE_URL=
JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

REDIS_URL=

SUPABASE_URL=
SUPABASE_KEY=
```

---

# Run Locally

Install dependencies

```
npm install
```

Run development server

```
npm run start:dev
```

Server runs on:

```
http://localhost:3000
```

---

# Health Check

```
GET /health
```

Returns

```
{ "status": "ok" }
```

---

# Future Improvements

* API Gateway
* Video DRM
* Course search
* Background jobs
* Recommendation system

---
