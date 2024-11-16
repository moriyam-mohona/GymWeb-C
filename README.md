GymClass Scheduling and Membership Management System
A comprehensive solution for efficiently managing gym operations, including scheduling classes, managing memberships, and defining specific roles for Admins, Trainers, and Trainees. This system ensures smooth operations through robust business rules and streamlined workflows.

Project Overview
The GymClass Scheduling and Membership Management System allows admins to manage trainers, schedule classes, and assign trainers. Trainers can view their assigned schedules, and trainees can book classes if space is available. The system enforces business rules like maximum daily schedules and attendee limits, ensuring an organized and efficient process.

Technology Stack
Frontend
Web Framework: React.js
Styling Framework: Tailwind CSS
State Management: Redux Toolkit, Context API, React Hooks
Authentication: JWT-based client-side validation
Data Fetching: Redux Toolkit, Axios/Fetch API
Backend
Programming Language: JavaScript/TypeScript (recommended)
Web Framework: Express.js
Database: MongoDB / PostgreSQL
ORM/ODM: Prisma / Mongoose
Authentication: JSON Web Tokens (JWT)
Features
Frontend
Home Page:

Dynamic and visually appealing homepage showcasing the gym's services and schedules.
Authentication:

Login Page:
Email and Password fields with JWT-based authentication.
Redux handles authentication state.
Registration Page (Trainees):
Email, Password, and Full Name fields.
Dispatch actions to register new users.
Admin Dashboard:

Manage Trainers:
Add, edit, delete, and fetch trainers using Redux actions and API calls.
Display a list of trainers with edit/delete options.
Class Scheduling:
Fetch and display existing schedules.
Create new schedules with forms.
Validation rules: max 5 schedules/day and 2-hour class duration.
Trainer Dashboard:

View assigned class schedules with details like date, time, and trainee count.
Mobile Responsiveness:

Fully responsive design for all pages and components using Tailwind CSS or CSS media queries.
Backend
Roles and Permissions:

Admin: Manage trainers and schedules. Cannot manage trainee profiles.
Trainer: View assigned class schedules only.
Trainee: Manage own profile and book available class schedules.
Business Rules:

Max 5 schedules per day, each lasting 2 hours.
Max 10 trainees per class schedule.
Error Handling:

Unauthorized Access: Restricted actions for unauthenticated/unauthorized users.
Validation Errors: Ensure input validity.
Booking Limits: Prevent overbooking and excessive scheduling.
API Endpoints
Method Endpoint Description
POST /auth/login User login with JWT authentication.
POST /auth/register User registration (trainees only).
GET /trainers Fetch all trainers.
POST /trainers Add a new trainer.
PUT /trainers/:id Update a trainer's information.
DELETE /trainers/:id Delete a trainer.
GET /classes Fetch all schedules.
POST /classes Create a new class schedule.
Database Schema
Users
id
email
password
role (Admin/Trainer/Trainee)
Trainers
id
name
email
ClassSchedules
id
date
time
trainerId
traineeCount (Max: 10)
Relational Diagram

Instructions to Run Locally
Clone the repository:

bash
Copy code
git clone <repository-url>
Navigate to the project directory:

bash
Copy code
cd <project-directory>
Install dependencies:

bash
Copy code
npm install
Run the server locally:

bash
Copy code
npm run dev
Access the app at:
http://localhost:3000

Live Project Link
Deployed Application

Admin Credentials
Email: admin@example.com
Password: admin123
Testing Instructions
Login using the admin credentials.
Create trainers and schedules.
Test class booking limits and error handling.
