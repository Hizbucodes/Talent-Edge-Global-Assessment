
# 📚 Online Learning Mobile App

A full-stack online learning platform built using Node.js, Express, MongoDB, React Native (Expo), and OpenAI's GPT model. Students can browse and enroll in courses, instructors can create and manage them, and AI can recommend relevant courses based on student prompts.

---

## 📱 Features

### 👨‍🎓 Student
- Register and login
- Browse all available courses
- Enroll in selected courses
- View enrolled course list
- AI-based course suggestions via ChatGPT

### 👨‍🏫 Instructor
- Register and login
- Create, update, and delete courses
- View posted courses and enrolled students

---

## 🛠 Tech Stack

| Layer        | Technology |
|--------------|------------|
| Frontend     | React Native (Expo) |
| Backend      | Node.js, Express |
| Database     | MongoDB (via Mongoose) |
| Auth         | JWT (Role-based) |
| GPT          | OpenAI GPT-3.5-turbo |
| Token Storage| Expo Secure Store |
| State Mgmt   | Redux Toolkit + Thunks |

---

## 📦 Project Structure

---

## 🚀 Setup Instructions

### 🔧 1. Backend Setup

#### 📍 Navigate to backend folder
```bash
cd backend
```

#### 📥 Install dependencies
```bash
npm install
```

#### 🛡️ Create `.env` file
Create a file named `.env` in the backend root and add:

```env
PORT=3000
MONGO_URI=mongodb+srv://<your-mongo-connection>
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### ▶️ Start backend server
```bash
npm run dev
```

The server will start at `http://localhost:3000`

---

### 📱 2. Mobile Frontend Setup

#### 📍 Navigate to mobile app
```bash
cd mobile
```

#### 📥 Install packages
```bash
npm install
```

#### ▶️ Start Expo server
```bash
npx expo start
```

> You can scan the QR code from your phone with **Expo Go**, or run on Android/iOS emulator.

#### 📁 Environment Config

✅ replace `localhost` with your IP address like `http://192.168.8.101:3000/api`

```js
// mobile/services/api.js
const API = axios.create({
  baseURL: "http://<Your-Local-IP Address>:3000/api", // or your local IP for real device
});
```

---

## 📡 API Endpoints

### 🔐 Authentication
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

### 👨‍🎓 Student
- `GET /api/v1/courses`
- `POST /api/v1/courses/:id/enroll`
- `GET /api/v1/courses/enrolledCourses`

### 👨‍🏫 Instructor
- `POST /api/v1/courses/createCourse`
- `GET /api/v1/courses/GetAllCoursesPostedByInstructor`
- `PUT /api/v1/courses/updateACourseCreatedByInstructor/:id`
- `DELETE /api/v1/courses/deleteCourseCreatedByInstructor/:id`
- `GET /api/v1/courses/getEnrolledStudentsForSpecificCourse/:id/students`

### 🧠 GPT Integration
- `POST /api/v1/chatgpt/suggestCourses`  

---
