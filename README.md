# 🏋️ GYMWEB - Gym Class Scheduling and Membership Management System

A comprehensive platform for managing gym operations, class schedules, and memberships.


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
    - Maximum of 5 schedules per day _(Feature under development)_.
    - 2-hour duration per class.

#### 🗓️ Trainer Dashboard
- View assigned schedules, including:
  - Date
  - Time
  - 
#### 🗓️ Trainee Dashboard

- View available gym class schedules
- Book class sessions
- Update Profile Infos

#### 📱 Mobile Responsiveness

- Fully responsive design using **Tailwind CSS** for seamless user experience across devices.

### ⚙️ Backend Features

- **JWT Authentication**: Ensures secure role-based access.

## 🔑 Admin Credentials

| Email                 | Password           |
| -----------------     | --------           |
| admin@example.com     | Admin1             |
| trainer2024@gmail.com | Trainer2024        |
| trainee2024@gmail.com | Trainee2024        |
 

---

## 🚀 Instructions to Run Locally  

### Step 1: Clone the Repository  
```bash  
git clone git clone https://github.com/moriyam-mohona/GymWeb-C.git    
```  

### Step 2: Install Dependencies  
```bash  
cd GymWeb-C    
npm install  
```  

### Step 3: Set Up Environment Variables  
1. Create a `.env` file in the root directory.  
2. Add the necessary environment variables such as:  
   - MongoDB connection string  
   - JWT secret key  

### Step 4: Start the Development Server  
```bash  
npm run dev  
``` 
---

## 🌐 Live Hosting Links  
- **Frontend**: [ https://gym-web-c.vercel.app]( https://gym-web-c.vercel.app)  

---

### Happy Coding! 💻  

---  
