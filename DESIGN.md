# Design Document

## PassGuard — Web-Based Password Strength Meter and Breached Credential Checker

**Version:** 1.0  
**Date:** June 2026  
**Group Members:** [Abuabakar Muhammad Sherif], [Madu-Uwechie Chukwunonso Noel], [Adriel Madukwe Ogbureke], [Stefan Birch Olufikayo]  
**Institution:** [NILE UNIVERSITY OF NIGERIA]  
**Course:** [WEB APPLICATION DEVELOPMENT (SEN 302)]  
**Live Application:** https://passguard-three.vercel.app  
**GitHub Repository:** https://github.com/shereef-M/password-strength-app

## 1. Introduction

PassGuard is a full-stack web application that provides real-time password strength analysis and privacy-safe breach detection. This document describes the technical design decisions made during development including architecture, database, API, security, and deployment.

## 2. System Architecture

PassGuard follows a three-tier client-server architecture:
Tier | Technology | Hosting
Frontend - React.js + Tailwind CSS - Vercel
Backend - Node.js + Express.js - Render
Database - MongoDB Atlas - MongoDB Cloud

The frontend communicates with the backend through HTTPS REST API calls. The backend communicates with MongoDB Atlas for data storage and with the Have I Been Pwned API for breach detection.

**Architecture Diagram:**
React Frontend (Vercel)
Express Backend (Render)
MongoDB Atlas HIBP API

**Why MERN Stack:**
JavaScript is used across all layers — frontend, backend, and
database queries. This reduces complexity and allows logic to
be shared across the stack.

---

## 3. Frontend Design

The frontend is a single-page application built with React.js
and Vite. It uses React Router for navigation, Axios for API
communication, and React Context for global authentication state.

**Key Components:**

Component | Purpose
Navbar | Navigation and authentication status
PasswordInput - Password field with show/hide and generator
StrengthMeter - Visual strength bar and feedback
BreachChecker - Breach check button and result display
HistoryCard - Individual history record display
ProtectedRoute - Redirects unauthenticated users

**Design Decisions:**

- Emerald green and dark color scheme chosen to communicate
  security and safety
- Ten subtle animations added to improve user experience
- Maximum content width of 768px for optimal readability
- Responsive layout using Tailwind CSS breakpoints

## 4. Backend Design

The backend follows the MVC pattern. Models define data structure, controllers contain business logic, and routes map URLs to controller functions.

**Folder Structure:**
server/
├── config/ # Database connection and token generator
├── controllers/ # Business logic for auth, password, history
├── middleware/ # JWT authentication middleware
├── models/ # User and CheckHistory schemas
├── routes/ # API endpoint definitions
└── index.js # Server entry point

## 5. Database Design

MongoDB Atlas stores two collections.

**Users Collection:**

Field | Type | Description
\_id - ObjectId - Auto-generated unique ID
username - String - Display name, min 3 chars
email - String - Unique, lowercase
password - String bcrypt hash only
createdAt - Date - Auto timestamp

**CheckHistory Collection:**

Field | Type | Description
\_id - ObjectId - Auto-generated unique ID
userId - ObjectId - Reference to users collection
maskedPassword - String - e.g. s\***\*\*\*\***3
breachFound - Boolean - Whether password was breached
breachCount - Number - Times found in breaches
strengthScore - Number - zxcvbn score 0 to 4
strengthLabel - String - Weak, Fair, Strong etc
createdAt - Date - Auto timestamp

**Relationship:** One user has many check history records linked through the userId reference field.

## 6. API Design

All endpoints are prefixed with `/api`.

Method | Endpoint | Description | Auth |
POST - /api/auth/register - Register new user - No
POST - /api/auth/login - Login and get token - No
GET - /api/auth/me - Get current user - Yes
POST - /api/password/analyse - Analyse strength - No
POST - /api/password/check-breach - Check HIBP breach No
GET - /api/history - Get user history - Yes
DELETE - /api/history/:id - Delete history record - Yes
GET - /Health check - No

**Authentication:** JWT tokens are passed in the Authorization header as `Bearer <token>`. Tokens expire after 7 days.

## 7. Security Design

Security Concern | Implementation
Password storage - bcrypt hashing with 10 salt rounds
Raw password transmission - Never transmitted — SHA-1 hash only
k-Anonymity - Only first 5 chars of hash sent to HIBP
Authentication - JWT tokens signed with secret key
Route protection - Middleware verifies token before access
Input validation - Mongoose schema validation on all inputs
Rate limiting - 100 requests per 15 minutes per IP
CORS - Only allow requests from known frontend URL
Secrets management - All keys stored in environment variables
HTTPS - Enforced automatically by Vercel and Render
Generic error messages - Login errors never reveal which field failed
Ownership verification - Users can only delete their own history

**k-Anonymity Explained:**

The breach checker never sends the actual password to any external server. Instead:

1. SHA-1 hash generated from password
2. Only first 5 characters sent to HIBP API
3. HIBP returns all hashes starting with those 5 characters
4. Local check determines if full hash is in the list
5. Password and full hash never leave our server

## 8. Deployment Architecture

Component | Platform | URL
Frontend - Vercel - https://passguard-three.vercel.app
Backend - Render - https://passguard-api-ee1h.onrender.com
Database - MongoDB Atlas - Cloud hosted

**Environment Variables:**

Variable | Where | Purpose
MONGODB_URI - Render - Database connection string
JWT_SECRET - Render - Token signing secret
FRONTEND_URL - Render - Allowed CORS origin
VITE_API_URL - Vercel - Backend API base URL

## 9. Testing Summary

Test Type | Tool | Result
API endpoint testing - Thunder Client - All 8 endpoints passed
Authentication testing - Thunder Client - All auth flows passed
Frontend feature testing - Chrome browser - All features passed
Responsive design testing - Chrome DevTools - All screen sizes passed
Security testing - Network tab + DevTools - All checks passed
End-to-end live testing - Production URLs - Full user journey passed

## 10. SDLC Phases

Phase | Output
Project Understanding - Problem domain research
Problem Definition - Formal problem statement
Requirements Gathering - SRS document with 20 requirements
Feasibility Study - Technical and financial feasibility confirmed
Architecture Design - Three-tier architecture defined
Database Design - Two collection schemas designed
API Design - 8 endpoints specified
Backend Development - Complete REST API built and tested
Frontend Development - Complete React app built and tested
Integration Testing - All end-to-end flows tested
Deployment - Application live on three cloud platforms
Documentation - SRS, Design Document, README completed
