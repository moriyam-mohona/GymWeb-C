# 🏋️ Gym Class Scheduling and Membership Management System

A comprehensive platform for managing gym operations, class schedules, and memberships.

---

## 📖 Overview

The **Gym Class Scheduling and Membership Management System** simplifies gym management by offering features tailored to three user roles:

- **Admin**: Manage trainers, schedule classes, and assign trainers to sessions.
- **Trainer**: View their assigned schedules.
- **Trainee**: Manage profiles and book available classes.

### Key Features:

- Role-based permissions.
- Class size and scheduling rules enforced.
- Fully responsive UI for mobile and desktop devices.

---

## 🛠️ Technology Stack

### Frontend

- **Programming Language**: JavaScript
- **Framework**: React.js
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **Authentication**: JWT-based

### Backend

- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT

---

## 📑 Features

### 💻 Frontend Features

#### 🌟 Home Page

- A visually appealing and responsive landing page.

#### 🔐 Authentication Pages

- **Login Page**: Secure JWT-based authentication.
- **Registration Page**: Allows trainees to register with:
  - Email
  - Password
  - Full name

#### 🛠️ Admin Dashboard

- **Trainer Management**: Add, edit, delete, and list trainers.
- **Class Scheduling**:
  - Create and view schedules.
  - Validates:
    - Maximum of 5 schedules per day(Not Complete).
    - 2-hour duration per class _(Feature under development).

#### 🗓️ Trainer Dashboard

- View assigned schedules, including:
  - Date
  - Time

#### 📱 Mobile Responsiveness

- Fully responsive design using **Tailwind CSS** for seamless user experience across devices.

### ⚙️ Backend Features

- **JWT Authentication**: Ensures secure role-based access.

---

## 🔑 Admin Credentials

| Email                 | Password           |
| -----------------     | --------           |
| admin@example.com     | Admin1             |
| trainer2024@gmail.com | Trainer2024        |
| trainee2024@gmail.com | Trainee2024        |


---

## 🛠️ Instructions to Run Locally

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-repo.git
cd project-folder
Step 2: Install Dependencies
bash
Copy code
# For frontend
cd frontend
npm install

# For backend
cd backend
npm install
Step 3: Setup Environment Variables
Create .env files in both frontend and backend folders.
Step 4: Start the Servers
bash
Copy code
# Start Frontend
npm run dev

# Start Backend
npm start
Step 5: Access the Application
Open your browser and navigate to:
Frontend: http://localhost:5173
Backend: http://localhost:5000
🧪 Testing Instructions
Login as Admin: Use the credentials provided above.
Add Trainers: Navigate to the Manage Trainers section to add, edit, or delete trainers.
Schedule Classes: Test the class scheduling feature with limits validation.
Booking Validation: Attempt exceeding booking limits to ensure proper error handling.

```
