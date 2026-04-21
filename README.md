# MusicCollab Platform

A full-stack music collaboration platform where musicians can connect, share ideas, and collaborate on tracks.

---

## Live Demo

* Frontend: https://music-collab-platform-fawn.vercel.app
* Backend: https://music-collab-platform-zzyf.onrender.com

---

## Tech Stack

### Frontend

* React (Vite)
* Axios
* React Router

### Backend

* Spring Boot
* REST APIs
* JWT Authentication

### Deployment

* Frontend → Vercel
* Backend → Render

---

## Features

* User Registration & Login (JWT Authentication)
* Protected Routes
* Create Posts (collab requests / ideas)
* Delete own posts
* Dynamic Feed (real + dummy posts for better UX)
* Responsive UI (modern dark theme)

---

## Special Note

To enhance user experience during demo:

> The feed always includes **predefined dummy posts along with real posts**
> This ensures the app feels active and realistic even with a fresh database.

---

## Project Structure

music-collab-platform/
│
├── frontend/ → React application
├── backend/ → Spring Boot application

---

## How to Run Locally

### 1. Clone Repository

git clone https://github.com/anushkachhavi/music_collab_platform.git
cd music_collab_platform

---

### 2. Run Backend

cd backend
./mvnw spring-boot:run

---

### 3. Run Frontend

cd frontend
npm install
npm run dev

---

## Future Improvements

* Audio upload & playback
* Messaging system
* Like & comment system
* Profile customization

---

## Author

**Anushka Chhavi**