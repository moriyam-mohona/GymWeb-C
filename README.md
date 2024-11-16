## Gym Class Scheduling and Membership Management System

📖 Project Overview
The Gym Class Scheduling and Membership Management System streamlines gym operations by offering a platform for managing roles, class schedules, and memberships. This system supports three distinct roles:

# Admin:

Manage trainers, create class schedules, and assign trainers.

# Trainer:

View assigned class schedules.

# Trainee:

Manage profiles and book available classes.
The platform enforces business rules such as class size limits, scheduling limits, and role-based permissions.

🛠️ Technology Stack

# Frontend:

Programming Language: JavaScript
Framework: React.js
Styling: Tailwind CSS
State Management: Context API
Authentication: JWT-based

# Backend:

Framework: Express.js
Database: MongoDB
Authentication: JWT

📑 Features

## Frontend:

Home Page:
Responsive design

Authentication Pages:
Login Page with JWT-based authentication.
Registration Page for trainees with email, password, and full name fields.

Admin Dashboard:
Manage Trainers: Add, edit, delete, and list trainers.

Class Scheduling:
Create and view schedules.
Validation for a maximum of 5 schedules per day and 2-hour durations per class.(Not Complete)

Trainer Dashboard:
View assigned class schedules with details like date, time.

Mobile Responsiveness:
Fully responsive components using Tailwind CSS.

## Backend:

Authentication: JWT-based authentication.

🔑 Admin Credentials
Email: admin@example.com
Password: admin123
🚀 Deployment
Live Hosting Links
Frontend: Live Site
Backend: API Endpoints
🛠️ Instructions to Run Locally
Clone the repository:

bash
Copy code
git clone https://github.com/your-repo.git  
cd project-folder  
Install dependencies:

bash
Copy code

# For frontend

cd frontend  
npm install

# For backend

cd backend  
npm install  
Setup environment variables:

Create .env files in the respective folders.
Start the servers:

bash
Copy code

# Frontend

npm run dev

# Backend

npm start  
Access the application at http://localhost:5000.

🧪 Testing Instructions
Login as Admin:
Use the provided credentials.
Add Trainers:
Navigate to the "Manage Trainers" section and add/edit/delete trainers.
Schedule Classes:
Go to the "Class Scheduling" section and create schedules.
Test Booking Limits:
Attempt to exceed booking limits to verify error handling.
❗ Important Notes
Ensure the server is live and all API endpoints are accessible before submission.
Include screenshots of key functionalities in your project folder for reference.
