# 🏢 Apartment Management System

🌐 **Website:**  
https://apartment-management-system-project-coral.vercel.app/login

A full-stack **Apartment Management System** developed using the **MERN Stack** to digitally manage apartment residents, flats, maintenance, complaints, visitors, parking, notices, and reports.

The system provides separate role-based access for **Admin, Resident, and Security** users and uses REST APIs with MongoDB for data management.

---

## 📌 Project Overview

The Apartment Management System is designed to simplify day-to-day apartment management by replacing manual processes with a centralized web application.

The application allows administrators to manage apartment-related information, residents to access their apartment services, and security personnel to manage visitor and parking activities.

---

## 🎯 Project Objectives

* Digitize apartment management operations
* Provide role-based access to different users
* Manage resident and flat information
* Track maintenance records
* Manage complaints
* Record and manage visitors
* Manage parking information
* Publish apartment notices
* Generate dashboard statistics and reports
* Store application data securely in MongoDB
* Provide a responsive and user-friendly interface

---

## 👥 User Roles

### 👨‍💼 Admin

Admin can:

* Login securely
* Manage residents
* Manage flats
* Manage maintenance records
* Manage complaints
* Manage visitors
* Manage parking
* Create and manage notices
* View dashboard information
* Access reports and statistics
* Logout securely

### 🧑 Resident

Resident can:

* Register and login
* View flat information
* View maintenance records
* Submit complaints
* View visitor records
* View parking information
* View apartment notices
* Manage account access
* Logout securely

### 🛡️ Security

Security users can:

* Login securely
* Add visitor records
* Manage visitor entry and exit
* View visitor information
* Manage parking-related information
* View apartment notices
* Logout securely

---

# 🛠️ Technologies Used

## Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* Axios
* React Router

## Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication
* bcryptjs
* CORS
* dotenv

## Database

* MongoDB
* Mongoose
* MongoDB Atlas

## Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman
* Browser Developer Tools

---

# 🏗️ Project Architecture

```text
User
  ↓
React Frontend
  ↓
Axios / REST API
  ↓
Node.js + Express Backend
  ↓
Controllers
  ↓
Routes + Middleware
  ↓
Mongoose
  ↓
MongoDB
```

---

# 📂 Project Structure

```text
Apartment-Management-System/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

> `.env` contains sensitive configuration and is excluded from GitHub using `.gitignore`.

---

# 🔐 Authentication & Authorization

The application uses **JWT-based authentication**.

Authentication flow:

```text
User Login
    ↓
Backend verifies credentials
    ↓
JWT Token generated
    ↓
Token stored on frontend
    ↓
Protected API requests
    ↓
Authentication Middleware
    ↓
Role-Based Authorization
```

Passwords are securely hashed using **bcryptjs** before being stored in the database.

Role-based middleware controls access to protected resources for:

* Admin
* Resident
* Security

---

# 📋 Main Modules

### 1. Authentication

* Registration
* Login
* JWT authentication
* Password verification
* Role-based access
* Logout

### 2. Resident Management

* View residents
* Add residents
* Resident account management

### 3. Flat Management

* Manage apartment flat information
* View flat details

### 4. Maintenance Management

* Add maintenance records
* View maintenance bills
* Track payment status

### 5. Complaint Management

* Submit complaints
* View complaints
* Manage complaint records

### 6. Visitor Management

* Add visitor records
* View visitor history
* Manage visitor entry and exit

### 7. Parking Management

* Manage parking information
* View parking records
* Role-based parking access

### 8. Notice Management

* Create notices
* View notices
* Update notices
* Delete notices

### 9. Reports & Dashboard

* Dashboard statistics
* Maintenance information
* Complaint information
* Visitor information
* Parking information
* Notice information

---

# 🔄 Development Process — 20 Steps

The project was developed and tested progressively through the following 20-step workflow:

## Step 1 — Project Planning

Defined the Apartment Management System idea, objectives, users, modules, and overall requirements.

## Step 2 — Technology Selection

Selected the MERN Stack:

```text
MongoDB
Express.js
React.js
Node.js
```

Additional technologies such as JWT, Axios, Mongoose, bcryptjs, and GitHub were selected for application development.

## Step 3 — Project Setup

Created the main project structure with separate:

```text
frontend/
backend/
```

applications.

## Step 4 — Backend Setup

Configured the Node.js and Express backend and created the basic server structure.

## Step 5 — MongoDB Database Setup

Connected the backend application with MongoDB using Mongoose and configured the database connection.

## Step 6 — Authentication System

Implemented:

* User registration
* User login
* Password hashing
* JWT token generation
* Authentication middleware

## Step 7 — Role-Based Authorization

Implemented access control for:

```text
Admin
Resident
Security
```

using authentication and role middleware.

## Step 8 — Resident & Flat Management

Implemented resident and apartment flat management functionality with protected APIs.

## Step 9 — Maintenance Management

Implemented maintenance records and maintenance bill management.

## Step 10 — Complaint Management

Implemented complaint creation, viewing, and management functionality.

## Step 11 — Visitor Management

Implemented visitor registration, visitor records, and visitor entry/exit management.

## Step 12 — Parking Management

Implemented parking management and role-based parking access.

## Step 13 — Frontend Integration

Connected React frontend pages with backend REST APIs using Axios.

## Step 14 — Role-Based Dashboards

Created separate dashboards and navigation for:

* Admin
* Resident
* Security

## Step 15 — Notices & User Interface

Implemented apartment notices and improved the application interface with forms, tables, cards, and navigation.

## Step 16 — API Integration & Data Flow

Connected application modules with the backend APIs and verified frontend-to-backend data flow.

## Step 17 — Reports & Dashboard Statistics

Implemented dashboard statistics and report-related APIs for apartment management information.

## Step 18 — Notice & Notification Module

Completed the notice management workflow with role-based access for creating, viewing, updating, and deleting notices.

## Step 19 — Testing, Validation & UI/UX

Performed:

* Backend API testing
* Frontend testing
* Authentication testing
* CRUD testing
* Input validation
* Error response validation
* API response validation
* Dashboard UI testing
* Forms and tables testing
* Responsive design testing
* Bug fixing
* Cross-role testing
* Database operation verification
* Final browser verification

## Step 20 — Final Documentation, GitHub & Deployment

Final project preparation includes:

### 20.1 — Final Project Cleanup

* Project structure verification
* `.env` security
* `.gitignore` verification
* GitHub repository cleanup

### 20.2 — README Documentation

* Project overview
* Features
* Technologies
* Architecture
* Modules
* Development process
* Setup instructions

### 20.3 — GitHub Final Update

* Final code verification
* Git status verification
* Final commit
* Final push to GitHub

### 20.4 — Deployment

Prepare and deploy the frontend and backend applications.

### 20.5 — Production Environment Setup

Configure:

* MongoDB connection
* JWT secret
* Environment variables
* Backend API URL
* CORS
* Production configuration

### 20.6 — Deployed Application Testing

Test:

* Registration
* Login
* Role-based access
* CRUD operations
* API requests
* Database operations
* UI
* Responsive design
* Logout

### 20.7 — Final Project Verification & Submission

Perform final verification and prepare the project for academic submission and demonstration.

---

# 🧪 Testing

The application was tested across multiple areas.

### Authentication Testing

* Valid login
* Invalid login
* Registration
* Password verification
* JWT authentication
* Role-based access
* Logout

### CRUD Testing

CRUD/API operations were tested for the major application modules.

### API Testing

Backend APIs were tested for:

* Authentication
* Residents
* Flats
* Maintenance
* Complaints
* Visitors
* Parking
* Notices
* Reports

### Database Testing

Verified that application operations correctly interact with MongoDB and that created records persist in the database.

### UI Testing

Tested:

* Dashboards
* Forms
* Tables
* Navigation
* Buttons
* Responsive layouts
* Role-based pages

---

# 🔒 Security

Security-related practices implemented in the project include:

* Password hashing using bcryptjs
* JWT authentication
* Protected APIs
* Role-based authorization
* Environment variables for secrets
* `.env` excluded through `.gitignore`
* `node_modules` excluded from Git

Sensitive values such as:

```text
MONGO_URI
JWT_SECRET
```

are not stored in the public GitHub repository.

---

# ⚙️ Local Installation

## Clone the Repository

```bash
git clone https://github.com/AJAYAAKAM/Apartment-Management-System-Project.git
```

## Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend:

```bash
node server.js
```

Backend:

```text
http://localhost:5000
```

## Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🌐 API Base URL

### Development

```text
http://localhost:5000/api
```

### Production

The production API URL will be configured after backend deployment.

---

# 🗄️ Database

The application uses MongoDB for persistent data storage.

Major data areas include:

```text
Users
Residents
Flats
Maintenance
Complaints
Visitors
Parking
Notices
```

MongoDB Atlas can be used as the production database.

---

# 📈 Future Enhancements

Possible future improvements include:

* Online maintenance payment integration
* Email notifications
* SMS notifications
* Advanced admin analytics
* Password reset functionality
* Profile management
* Visitor QR verification
* Online complaint status tracking
* Cloud file/image uploads
* Mobile application
* Automated notifications

---

# 🎓 Academic Project

**Project:** Apartment Management System
**Development Approach:** Individual Project
**Technology:** MERN Stack
**Domain:** Apartment / Residential Management
**Current Role:** Full-Stack Development Project

---

# 👨‍💻 Developer

**AAKAM AJAY**

B.Tech — Artificial Intelligence & Data Science

* LinkedIn: https://linkedin.com/in/ajay-aakam
* GitHub: https://github.com/AJAYAAKAM

---

# ⭐ Project Status

```text
Backend              ✅
Frontend             ✅
Authentication       ✅
Role-Based Access    ✅
Resident Management  ✅
Flat Management      ✅
Maintenance          ✅
Complaints           ✅
Visitors             ✅
Parking              ✅
Notices              ✅
Reports              ✅
Validation           ✅
Testing              ✅
UI/UX                 ✅
GitHub                ✅
Deployment            🔄
```

**Apartment Management System — MERN Stack Full-Stack Project**

🌐 **Website:**  
https://apartment-management-system-project coral.vercel.app/login

---

## 🔐 Demo Login Credentials

Use the following demo accounts to explore the application.

| Role | Email | Password |
|------|-------|----------|
| 👨‍💼 Admin | `admin12@gmail.com` | `admin123` |
| 🏠 Resident | `resident12@gmail.com` | `resident123` |
| 🛡️ Security / Watchman | `security123@gmail.com` | `security123` |

> These credentials are provided for demonstration and project evaluation purposes.

---

