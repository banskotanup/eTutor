Learning Management System (LMS)

A complete LMS backend built using Node.js, Express.js, Prisma ORM, and PostgreSQL.
Includes authentication, user management, lessons, assignments, attendance, payments, live classes, notifications, messaging, and salary module.


---

Tech Stack

Backend

Node.js

Express.js

Prisma ORM

PostgreSQL

JWT Authentication

Multer + Cloudinary (File uploads)


Frontend (Upcoming)

Next.js

Tailwind CSS



---

Project Status

Backend Progress: 80% Completed

Completed Modules:

Authentication (JWT + Roles)

User Management

Subjects

Lessons (Video/PDF Upload)

Assignments & Submissions

Attendance System

Live Class Module

Payment System (Gateway Ready)

Teacher Salary Module

Notifications

Messaging System


Frontend development starts next.


---

Folder Structure

backend/
│── prisma/
│── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── utils/
│   └── app.js
│── .env
│── package.json
└── README.md


---

Authentication Features

Register/Login

JWT authentication

Password hashing

/auth/me endpoint

Role-based access control
(Admin / Teacher / Student / Accountant)



---

Modules Completed

Users

Admin approves users

Change roles

Delete users


Subjects

Create subjects

Assign teachers

Fetch subjects


Lessons

Upload video/PDF to Cloudinary

Teacher-only upload

Student view


Assignments

Teacher creates assignments

Student submits work

Teacher reviews submissions


Submissions

File upload

Marks and status


Attendance

Manual attendance

Auto attendance on live class start

Student attendance history


Live Classes

Create class (future time validation)

Auto attendance creation

End class

Delete class


Payments

Student pays for subject

Tracks amount, status, transactionId

Gateway-ready


Salary Module

Admin sets teacher salary

Track month, amount, status


Notifications

System notifications

Mark as read/unread


Messaging

Direct 1-to-1 messaging

Sender → Receiver



---

Environment Variables

Create .env file:

DATABASE_URL="postgresql://..."
JWT_SECRET="your_jwt_secret"
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""


---

Run the Project

Install packages:

npm install

Run database migrations:

npx prisma migrate dev

Start the server:

node --watch app.js


---

Upcoming (Frontend Plan)

Login/Register UI

Dashboard UI (Admin, Teacher, Student, Accountant)

Lessons display

Assignment submission UI

Payment page

Messaging interface

Live class join page



---

Developer

Anup Banskota
Backend & Frontend Developer (Node.js + Next.js)

