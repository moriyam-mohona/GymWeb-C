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
<<<<<<< HEAD
    - Maximum of 5 schedules per day.
    - 2-hour duration per class _(Feature under development)_.
=======
    - Maximum of 5 schedules per day(Not Complete).
    - 2-hour duration per class _(Feature under development).
>>>>>>> ad358903f5f2918cf47f907d2160e4304243f701

#### 🗓️ Trainer Dashboard

- View assigned schedules, including:
  - Date
  - Time

#### 📱 Mobile Responsiveness

- Fully responsive design using **Tailwind CSS** for seamless user experience across devices.

### ⚙️ Backend Features

- **JWT Authentication**: Ensures secure role-based access.
<<<<<<< HEAD
- **Validation**: Enforces business rules for scheduling.
=======
>>>>>>> ad358903f5f2918cf47f907d2160e4304243f701

---

## 🔑 Admin Credentials

<<<<<<< HEAD
| Email             | Password |
| ----------------- | -------- |
| admin@example.com | admin123 |

---

## 🚀 Deployment

| Platform     | Link               |
| ------------ | ------------------ |
| **Frontend** | [Live Site](#)     |
| **Backend**  | [API Endpoints](#) |
=======
| Email                 | Password           |
| -----------------     | --------           |
| admin@example.com     | Admin1             |
| trainer2024@gmail.com | Trainer2024        |
| trainee2024@gmail.com | Trainee2024        |

>>>>>>> ad358903f5f2918cf47f907d2160e4304243f701

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
<<<<<<< HEAD
📸 Screenshots
Feature	Screenshot
Home Page
Admin Dashboard
Trainer Dashboard
(Replace placeholders with actual screenshots.)

❗ Important Notes
Ensure the backend server is running before testing the frontend.
Include screenshots of all key functionalities in your submission.
📜 License
This project is open-source under the MIT License.

✉️ Contact
For any queries, reach out at:

Email: your-email@example.com
GitHub: Your GitHub Profile
=======

>>>>>>> ad358903f5f2918cf47f907d2160e4304243f701
```
