## Gym Class Scheduling and Membership Management System

📖 Project Overview
The Gym Class Scheduling and Membership Management System streamlines gym operations by providing a platform for managing roles, class schedules, and memberships. The system supports three distinct roles:

Roles and Responsibilities
Admin:
Manage trainers.
Create and view class schedules.
Assign trainers to classes.
Trainer:
View assigned class schedules.
Trainee:
Manage profiles and book available classes.
The platform enforces business rules, including class size limits, scheduling limits, and role-based permissions.

🛠️ Technology Stack
Frontend
Programming Language: JavaScript
Framework: React.js
Styling: Tailwind CSS
State Management: Context API
Authentication: JWT-based
Backend
Framework: Express.js
Database: MongoDB
Authentication: JWT
📑 Features
Frontend
Home Page:

Responsive design using Tailwind CSS.
Authentication Pages:

Login Page: Implements JWT-based authentication.
Registration Page: Allows trainees to register with email, password, and full name fields.
Admin Dashboard:

Manage Trainers: Add, edit, delete, and list trainers.
Class Scheduling:
Create and view class schedules.
Enforces scheduling rules (e.g., max 5 schedules per day, 2-hour class durations). (Feature development in progress)
Trainer Dashboard:

View assigned class schedules, including details such as date and time.
Mobile Responsiveness:

Fully responsive design for all components.
Backend
Authentication: Secure JWT-based authentication system.
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

Create .env files in both the frontend and backend folders.
Start the servers:

bash
Copy code

# Frontend

npm run dev

# Backend

npm start  
Access the application:

Open your browser and navigate to http://localhost:5000.
🧪 Testing Instructions
Login as Admin:

Use the provided admin credentials.
Add Trainers:

Navigate to the "Manage Trainers" section to add, edit, or delete trainers.
Schedule Classes:

Create schedules through the admin dashboard.
Test Booking Limits:

Attempt to exceed booking limits to validate error handling.
❗ Important Notes
Ensure that the server is running and all API endpoints are functional before testing.
Include screenshots of key functionalities (e.g., dashboards, forms, and schedules) in the project folder.
