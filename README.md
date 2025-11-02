MySocialApp 🌐

A modern MERN (MongoDB, Express, React, Node.js) social media web application with real-time comments, likes, and image uploads.

Built with React, TailwindCSS, Socket.io, and JWT authentication.

Features ✨

User authentication (Sign up & Login) ✅

Create posts with captions and images 📸

Like posts ❤️

Real-time comments using Socket.io 💬

Profile page displaying user posts and stats 👤

Responsive and beautiful UI using TailwindCSS 🎨

### 👤 Authentication
- Secure **JWT-based login and registration**
- Passwords hashed with **bcryptjs**
- Protected routes with token validation

### 🖼️ Posts
- Upload photos with **Multer**
- Create posts with text + image
- View your feed with all posts
- **Like and comment** on posts dynamically

### 💬 Comments
- Add and view comments instantly
- Real-time updates using **Socket.io**

### 🧑‍💻 Profile Page
- View your own posts
- See likes and upload time
- Clean user interface with React + TailwindCSS

### ⚙️ Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Axios  
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas  
- **Real-time:** Socket.io  
- **Auth:** JWT, bcryptjs  
- **Uploads:** Multer

- | Frontend            | Backend           | Database      | Real-time Communication |
| ------------------- | ----------------- | ------------- | ----------------------- |
| React + TailwindCSS | Node.js + Express | MongoDB Atlas | Socket.io               |


Installation & Setup 🏗️
1️⃣ Clone the repository
git clone https://github.com/Adriza-coder/social-media-app.git
cd social-media-app

2️⃣ Backend Setup
cd backend
npm install

Create a .env file with the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Start the backend server:

npm run dev

Server runs at: http://localhost:5000

3️⃣ Frontend Setup
cd ../frontend
npm install

Start the React frontend:

npm start

Frontend runs at: http://localhost:3000 (or Vite URL if using Vite)

 <img width="962" height="692" alt="Screenshot 2025-11-02 174936" src="https://github.com/user-attachments/assets/0de4e653-4898-44b6-a6de-615109073d7b" />
