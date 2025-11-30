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


```
eTutor
├─ README.md
├─ backend
│  ├─ .dockerignore
│  ├─ Dockerfile
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ prisma.config.ts
│  ├─ prisma
│  │  ├─ migrations
│  │  │  ├─ 20251117071759_init
│  │  │  │  └─ migration.sql
│  │  │  ├─ 20251118141837_add_price_to_subject
│  │  │  │  └─ migration.sql
│  │  │  ├─ 20251119145314_add_lesson_description
│  │  │  │  └─ migration.sql
│  │  │  ├─ 20251119172133_change_submission
│  │  │  │  └─ migration.sql
│  │  │  ├─ 20251123161251_add_cash_on_gateway
│  │  │  │  └─ migration.sql
│  │  │  ├─ 20251127165147_contact_message
│  │  │  │  └─ migration.sql
│  │  │  ├─ migration_lock.toml
│  │  │  ├─ 20251128184727_add_reset_token_fields
│  │  │  │  └─ migration.sql
│  │  │  └─ 20251128191153_add_refresh_token_fields
│  │  │     └─ migration.sql
│  │  └─ schema.prisma
│  ├─ src
│  │  ├─ app.js
│  │  ├─ config.js
│  │  ├─ controllers
│  │  │  ├─ assignment.controller.js
│  │  │  ├─ attendance.controller.js
│  │  │  ├─ auth.controller.js
│  │  │  ├─ contact.controller.js
│  │  │  ├─ lesson.controller.js
│  │  │  ├─ liveclass.controller.js
│  │  │  ├─ message.controller.js
│  │  │  ├─ notification.controller.js
│  │  │  ├─ payment.controller.js
│  │  │  ├─ salary.controller.js
│  │  │  ├─ subject.controller.js
│  │  │  ├─ submission.controller.js
│  │  │  └─ user.controller.js
│  │  ├─ middlewares
│  │  │  ├─ auth.middleware.js
│  │  │  ├─ role.middleware.js
│  │  │  └─ upload.middleware.js
│  │  ├─ routes
│  │  │  ├─ assignment.routes.js
│  │  │  ├─ attendance.routes.js
│  │  │  ├─ auth.routes.js
│  │  │  ├─ contact.routes.js
│  │  │  ├─ lesson.routes.js
│  │  │  ├─ liveclass.routes.js
│  │  │  ├─ message.routes.js
│  │  │  ├─ notification.routes.js
│  │  │  ├─ payment.routes.js
│  │  │  ├─ salary.routes.js
│  │  │  ├─ subject.routes.js
│  │  │  ├─ submission.routes.js
│  │  │  ├─ test.routes.js
│  │  │  └─ user.routes.js
│  │  └─ utils
│  │     └─ cloudinary.js
│  └─ .env
├─ frontend
│  ├─ README.md
│  ├─ app
│  │  ├─ about-us
│  │  │  └─ page.tsx
│  │  ├─ api
│  │  │  └─ auth
│  │  │     ├─ login
│  │  │     │  └─ route.js
│  │  │     ├─ logout
│  │  │     │  └─ route.js
│  │  │     ├─ me
│  │  │     │  └─ route.js
│  │  │     ├─ register
│  │  │     │  └─ route.js
│  │  │     ├─ forgot-password
│  │  │     │  └─ route.js
│  │  │     ├─ send-otp
│  │  │     │  └─ route.js
│  │  │     └─ verify-otp
│  │  │        └─ route.js
│  │  ├─ contact-us
│  │  │  └─ page.tsx
│  │  ├─ courses
│  │  │  └─ page.tsx
│  │  ├─ faq
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.jsx
│  │  ├─ login
│  │  │  └─ page.jsx
│  │  ├─ page.tsx
│  │  ├─ register
│  │  │  └─ page.jsx
│  │  ├─ teacher
│  │  │  └─ dashboard
│  │  │     └─ page.jsx
│  │  ├─ verification
│  │  │  └─ page.tsx
│  │  ├─ rejected
│  │  │  └─ page.tsx
│  │  ├─ dashboard
│  │  │  └─ components
│  │  └─ reset-password
│  │     └─ page.tsx
│  ├─ components
│  │  ├─ landing-page
│  │  │  ├─ LandingPage.js
│  │  │  ├─ LandingPage.tsx
│  │  │  ├─ README.md
│  │  │  └─ components
│  │  │     ├─ AppAppBar.js
│  │  │     ├─ AppAppBar.jsx
│  │  │     ├─ FAQ.js
│  │  │     ├─ FAQ.tsx
│  │  │     ├─ Features.js
│  │  │     ├─ Features.tsx
│  │  │     ├─ Footer.js
│  │  │     ├─ Footer.tsx
│  │  │     ├─ Hero.js
│  │  │     ├─ Hero.tsx
│  │  │     ├─ Highlights.js
│  │  │     ├─ Highlights.tsx
│  │  │     ├─ LogoCollection.js
│  │  │     ├─ LogoCollection.tsx
│  │  │     ├─ Pricing.js
│  │  │     ├─ Pricing.tsx
│  │  │     ├─ LMSIcon.js
│  │  │     ├─ LMSIcon.tsx
│  │  │     ├─ Testimonials.js
│  │  │     └─ Testimonials.tsx
│  │  ├─ shared-theme
│  │  │  ├─ AppTheme.js
│  │  │  ├─ AppTheme.tsx
│  │  │  ├─ ColorModeIconDropdown.js
│  │  │  ├─ ColorModeIconDropdown.tsx
│  │  │  ├─ ColorModeSelect.js
│  │  │  ├─ ColorModeSelect.tsx
│  │  │  ├─ customizations
│  │  │  │  ├─ dataDisplay.js
│  │  │  │  ├─ dataDisplay.tsx
│  │  │  │  ├─ feedback.js
│  │  │  │  ├─ feedback.tsx
│  │  │  │  ├─ inputs.js
│  │  │  │  ├─ inputs.tsx
│  │  │  │  ├─ navigation.js
│  │  │  │  ├─ navigation.tsx
│  │  │  │  ├─ surfaces.js
│  │  │  │  └─ surfaces.ts
│  │  │  ├─ themePrimitives.js
│  │  │  ├─ themePrimitives.ts
│  │  │  └─ LockedStatusPage.tsx
│  │  ├─ sign-in-side
│  │  │  ├─ README.md
│  │  │  ├─ SignInSide.js
│  │  │  ├─ SignInSide.jsx
│  │  │  ├─ components
│  │  │  │  ├─ Content.js
│  │  │  │  ├─ Content.tsx
│  │  │  │  ├─ CustomIcons.js
│  │  │  │  ├─ CustomIcons.tsx
│  │  │  │  ├─ ForgotPassword.js
│  │  │  │  ├─ ForgotPassword.tsx
│  │  │  │  ├─ SignInCard.js
│  │  │  │  └─ SignInCard.jsx
│  │  │  └─ signInSideFooter.jsx
│  │  └─ sign-up
│  │     ├─ README.md
│  │     ├─ SignUp.js
│  │     ├─ SignUp.tsx
│  │     └─ components
│  │        ├─ CustomIcons.js
│  │        └─ CustomIcons.tsx
│  ├─ context
│  │  └─ AuthContext.jsx
│  ├─ eslint.config.mjs
│  ├─ lib
│  │  └─ axiosClient.js
│  ├─ middleware.ts
│  ├─ next.config.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.mjs
│  ├─ public
│  │  ├─ file.svg
│  │  ├─ globe.svg
│  │  ├─ images
│  │  │  ├─ ar.jpg
│  │  │  ├─ featurepic.jpg
│  │  │  ├─ lc.jpg
│  │  │  ├─ lms.jpg
│  │  │  └─ members
│  │  │     ├─ au.jpg
│  │  │     ├─ bb.jpg
│  │  │     ├─ girl.jpg
│  │  │     ├─ jr.jpg
│  │  │     └─ mi.jpg
│  │  ├─ next.svg
│  │  ├─ vercel.svg
│  │  └─ window.svg
│  ├─ tsconfig.json
│  ├─ .env.local
│  ├─ .next
│  │  └─ dev
│  │     ├─ logs
│  │     │  └─ next-development.log
│  │     ├─ cache
│  │     │  ├─ .rscinfo
│  │     │  ├─ next-devtools-config.json
│  │     │  └─ chrome-devtools-workspace-uuid
│  │     ├─ server
│  │     │  ├─ edge
│  │     │  │  └─ chunks
│  │     │  │     ├─ frontend_edge-wrapper_e648035a.js.map
│  │     │  │     ├─ turbopack-frontend_edge-wrapper_e648035a.js
│  │     │  │     ├─ frontend_45512783._.js.map
│  │     │  │     ├─ frontend_45512783._.js
│  │     │  │     ├─ [root-of-the-server]__f88e47d0._.js
│  │     │  │     └─ [root-of-the-server]__f88e47d0._.js.map
│  │     │  ├─ middleware
│  │     │  │  └─ middleware-manifest.json
│  │     │  ├─ interception-route-rewrite-manifest.js
│  │     │  ├─ middleware-build-manifest.js
│  │     │  ├─ middleware-manifest.json
│  │     │  ├─ next-font-manifest.js
│  │     │  ├─ app-paths-manifest.json
│  │     │  ├─ next-font-manifest.json
│  │     │  ├─ server-reference-manifest.json
│  │     │  ├─ pages-manifest.json
│  │     │  ├─ server-reference-manifest.js
│  │     │  ├─ chunks
│  │     │  │  ├─ ssr
│  │     │  │  │  ├─ [root-of-the-server]__e8a2741f._.js
│  │     │  │  │  ├─ [turbopack]_runtime.js
│  │     │  │  │  ├─ 9e883_next_dist_client_components_34a976ba._.js
│  │     │  │  │  ├─ frontend_app_d6137892._.js.map
│  │     │  │  │  ├─ 9e883_next_dist_client_components_builtin_global-error_c00881b3.js.map
│  │     │  │  │  ├─ frontend_app_d6137892._.js
│  │     │  │  │  ├─ 9e883_next_dist_77547aef._.js
│  │     │  │  │  ├─ 9e883_next_dist_client_components_34a976ba._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__e8a2741f._.js.map
│  │     │  │  │  ├─ 9e883_next_dist_client_components_builtin_unauthorized_62f331ea.js
│  │     │  │  │  ├─ frontend_a5d8ed79._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__c80f7c8f._.js.map
│  │     │  │  │  ├─ [turbopack]_runtime.js.map
│  │     │  │  │  ├─ [root-of-the-server]__99cf3892._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__c80f7c8f._.js
│  │     │  │  │  ├─ 9e883_a96ef34c._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__e1699a90._.js
│  │     │  │  │  ├─ [root-of-the-server]__ff185d20._.js
│  │     │  │  │  ├─ frontend__next-internal_server_app_page_actions_dbbe3cd3.js.map
│  │     │  │  │  ├─ 9e883_next_dist_client_components_builtin_unauthorized_62f331ea.js.map
│  │     │  │  │  ├─ 9e883_next_dist_f4bea112._.js
│  │     │  │  │  ├─ 9e883_0843ca11._.js
│  │     │  │  │  ├─ 9e883_next_dist_f4bea112._.js.map
│  │     │  │  │  ├─ 9e883_a96ef34c._.js
│  │     │  │  │  ├─ [root-of-the-server]__e1699a90._.js.map
│  │     │  │  │  ├─ frontend__next-internal_server_app_page_actions_dbbe3cd3.js
│  │     │  │  │  ├─ [root-of-the-server]__2bd24e66._.js.map
│  │     │  │  │  ├─ 9e883_next_dist_77547aef._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__ff185d20._.js.map
│  │     │  │  │  ├─ 9e883_0843ca11._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__99cf3892._.js
│  │     │  │  │  ├─ 9e883_next_dist_client_components_builtin_global-error_c00881b3.js
│  │     │  │  │  ├─ 9e883_next_dist_client_components_builtin_forbidden_520cb951.js.map
│  │     │  │  │  ├─ [root-of-the-server]__2bd24e66._.js
│  │     │  │  │  ├─ 9e883_next_dist_client_components_builtin_forbidden_520cb951.js
│  │     │  │  │  ├─ frontend_a5d8ed79._.js
│  │     │  │  │  ├─ [root-of-the-server]__ff1e011f._.js
│  │     │  │  │  ├─ [root-of-the-server]__ff1e011f._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__e6a4d965._.js
│  │     │  │  │  ├─ 9e883_2f8c5f27._.js
│  │     │  │  │  ├─ [root-of-the-server]__e6a4d965._.js.map
│  │     │  │  │  ├─ 9e883_2f8c5f27._.js.map
│  │     │  │  │  ├─ 9e883_5b7ca781._.js.map
│  │     │  │  │  ├─ 9e883_next_6d50d50f._.js
│  │     │  │  │  ├─ 9e883_5b7ca781._.js
│  │     │  │  │  ├─ [externals]_next_dist_shared_lib_no-fallback-error_external_59b92b38.js.map
│  │     │  │  │  ├─ 9e883_next_6d50d50f._.js.map
│  │     │  │  │  ├─ [externals]_next_dist_shared_lib_no-fallback-error_external_59b92b38.js
│  │     │  │  │  ├─ 9e883_@mui_system_esm_2aee5449._.js.map
│  │     │  │  │  ├─ 9e883_next_f61115c7._.js
│  │     │  │  │  ├─ 9e883_@mui_system_esm_2aee5449._.js
│  │     │  │  │  ├─ 9e883_next_f61115c7._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_styles_0a39e77b._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_2d363d34._.js
│  │     │  │  │  ├─ 9e883_@mui_material_esm_2d363d34._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_styles_0a39e77b._.js
│  │     │  │  │  ├─ 9e883_55349050._.js
│  │     │  │  │  ├─ 9e883_55349050._.js.map
│  │     │  │  │  ├─ 9e883_9ac2c57e._.js.map
│  │     │  │  │  ├─ 9e883_9ac2c57e._.js
│  │     │  │  │  ├─ 9e883_next_dist_45039207._.js
│  │     │  │  │  ├─ [root-of-the-server]__c8c1982d._.js.map
│  │     │  │  │  ├─ 9e883_next_dist_80610d18._.js
│  │     │  │  │  ├─ 9e883_985e9801._.js.map
│  │     │  │  │  ├─ 9e883_next_dist_80610d18._.js.map
│  │     │  │  │  ├─ frontend__next-internal_server_app__not-found_page_actions_18905e26.js.map
│  │     │  │  │  ├─ [root-of-the-server]__c8c1982d._.js
│  │     │  │  │  ├─ 9e883_985e9801._.js
│  │     │  │  │  ├─ 9e883_next_dist_45039207._.js.map
│  │     │  │  │  ├─ frontend__next-internal_server_app__not-found_page_actions_18905e26.js
│  │     │  │  │  ├─ frontend__next-internal_server_app_teacher_dashboard_page_actions_add79bab.js.map
│  │     │  │  │  ├─ frontend__next-internal_server_app_teacher_dashboard_page_actions_add79bab.js
│  │     │  │  │  ├─ [root-of-the-server]__85a65285._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__1d1c9c36._.js
│  │     │  │  │  ├─ [root-of-the-server]__85a65285._.js
│  │     │  │  │  ├─ 9e883_next_dist_1f0c8c1d._.js
│  │     │  │  │  ├─ 9e883_next_dist_1f0c8c1d._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__1d1c9c36._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__5cd34392._.js
│  │     │  │  │  ├─ [root-of-the-server]__7e0b243f._.js.map
│  │     │  │  │  ├─ 9e883_@mui_system_esm_3cdc2ab7._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_b8d0e4a5._.js.map
│  │     │  │  │  ├─ 9e883_next_dist_92f0f500._.js
│  │     │  │  │  ├─ 9e883_next_dist_92f0f500._.js.map
│  │     │  │  │  ├─ frontend__next-internal_server_app_login_page_actions_a200ed51.js
│  │     │  │  │  ├─ 9e883_@mui_system_esm_3cdc2ab7._.js
│  │     │  │  │  ├─ 9e883_@mui_material_esm_styles_07c62255._.js.map
│  │     │  │  │  ├─ 9e883_54eea9ff._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__5cd34392._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__7e0b243f._.js
│  │     │  │  │  ├─ frontend__next-internal_server_app_login_page_actions_a200ed51.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_styles_07c62255._.js
│  │     │  │  │  ├─ 9e883_54eea9ff._.js
│  │     │  │  │  ├─ 9e883_@mui_material_esm_b8d0e4a5._.js
│  │     │  │  │  ├─ [root-of-the-server]__57b2071d._.js.map
│  │     │  │  │  ├─ frontend__next-internal_server_app_register_page_actions_5040e2c7.js.map
│  │     │  │  │  ├─ [root-of-the-server]__57b2071d._.js
│  │     │  │  │  ├─ 9e883_@mui_system_esm_6bbb67cc._.js.map
│  │     │  │  │  ├─ frontend__next-internal_server_app_register_page_actions_5040e2c7.js
│  │     │  │  │  ├─ 9e883_next_dist_96618289._.js
│  │     │  │  │  ├─ 9e883_d598c05f._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__0691d8eb._.js
│  │     │  │  │  ├─ 9e883_@mui_material_esm_53fed4ee._.js.map
│  │     │  │  │  ├─ 9e883_next_dist_96618289._.js.map
│  │     │  │  │  ├─ 9e883_@mui_system_esm_6bbb67cc._.js
│  │     │  │  │  ├─ 9e883_d598c05f._.js
│  │     │  │  │  ├─ [root-of-the-server]__0691d8eb._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_53fed4ee._.js
│  │     │  │  │  ├─ [root-of-the-server]__0d2e406b._.js.map
│  │     │  │  │  ├─ 9e883_@mui_system_esm_e0d7abb8._.js.map
│  │     │  │  │  ├─ frontend_fd28e101._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_b97ef7ba._.js
│  │     │  │  │  ├─ 9e883_next_dist_0f72936c._.js
│  │     │  │  │  ├─ frontend__next-internal_server_app_about-us_page_actions_7cd4f117.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_styles_fe6c0fe6._.js
│  │     │  │  │  ├─ 9e883_@mui_material_esm_styles_fe6c0fe6._.js.map
│  │     │  │  │  ├─ 9e883_@mui_system_esm_e0d7abb8._.js
│  │     │  │  │  ├─ frontend__next-internal_server_app_about-us_page_actions_7cd4f117.js
│  │     │  │  │  ├─ 9e883_@mui_material_esm_b97ef7ba._.js.map
│  │     │  │  │  ├─ 9e883_95e21a97._.js.map
│  │     │  │  │  ├─ frontend_fd28e101._.js
│  │     │  │  │  ├─ 9e883_95e21a97._.js
│  │     │  │  │  ├─ 9e883_next_dist_0f72936c._.js.map
│  │     │  │  │  ├─ 9e883_next_dist_e928a9b7._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__0d2e406b._.js
│  │     │  │  │  ├─ 9e883_next_dist_e928a9b7._.js
│  │     │  │  │  ├─ 9e883_8257227e._.js
│  │     │  │  │  ├─ frontend__next-internal_server_app_verification_page_actions_c6e6a820.js.map
│  │     │  │  │  ├─ 9e883_next_dist_0ad2eb37._.js
│  │     │  │  │  ├─ frontend__next-internal_server_app_verification_page_actions_c6e6a820.js
│  │     │  │  │  ├─ 9e883_next_dist_0ad2eb37._.js.map
│  │     │  │  │  ├─ 9e883_8257227e._.js.map
│  │     │  │  │  ├─ frontend_app_verification_page_tsx_3741647a._.js
│  │     │  │  │  ├─ frontend_app_verification_page_tsx_3741647a._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__3796acf2._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__3796acf2._.js
│  │     │  │  │  ├─ 9e883_motion-dom_dist_es_e1f628d1._.js.map
│  │     │  │  │  ├─ 9e883_@mui_system_esm_09c724bd._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_7f82426a._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_7f82426a._.js
│  │     │  │  │  ├─ 9e883_9af35180._.js.map
│  │     │  │  │  ├─ 9e883_@mui_system_esm_09c724bd._.js
│  │     │  │  │  ├─ 9e883_framer-motion_dist_es_c5e9b95b._.js.map
│  │     │  │  │  ├─ 9e883_9af35180._.js
│  │     │  │  │  ├─ 9e883_motion-dom_dist_es_e1f628d1._.js
│  │     │  │  │  ├─ 9e883_framer-motion_dist_es_c5e9b95b._.js
│  │     │  │  │  ├─ 9e883_@mui_system_esm_20e603d9._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_037d3664._.js.map
│  │     │  │  │  ├─ frontend_a39bfa08._.js.map
│  │     │  │  │  ├─ 9e883_@mui_system_esm_20e603d9._.js
│  │     │  │  │  ├─ 9e883_868ee53b._.js.map
│  │     │  │  │  ├─ frontend_a39bfa08._.js
│  │     │  │  │  ├─ 9e883_868ee53b._.js
│  │     │  │  │  ├─ 9e883_@mui_material_esm_037d3664._.js
│  │     │  │  │  ├─ frontend_1d5e9b1b._.js.map
│  │     │  │  │  ├─ frontend_1d5e9b1b._.js
│  │     │  │  │  ├─ [root-of-the-server]__1f531f78._.js
│  │     │  │  │  ├─ frontend__next-internal_server_app_rejected_page_actions_ab9c7481.js
│  │     │  │  │  ├─ 9e883_next_dist_3ebe0845._.js
│  │     │  │  │  ├─ [root-of-the-server]__1f531f78._.js.map
│  │     │  │  │  ├─ 9e883_next_dist_3ebe0845._.js.map
│  │     │  │  │  ├─ frontend__next-internal_server_app_rejected_page_actions_ab9c7481.js.map
│  │     │  │  │  ├─ frontend_5a38a1d9._.js.map
│  │     │  │  │  ├─ frontend_5a38a1d9._.js
│  │     │  │  │  ├─ [root-of-the-server]__99b591fa._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__99b591fa._.js
│  │     │  │  │  ├─ [root-of-the-server]__f320b2d4._.js.map
│  │     │  │  │  ├─ 9e883_d4d8bc1f._.js
│  │     │  │  │  ├─ [root-of-the-server]__7d8c1c16._.js
│  │     │  │  │  ├─ [root-of-the-server]__7d8c1c16._.js.map
│  │     │  │  │  ├─ 9e883_d4d8bc1f._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__f320b2d4._.js
│  │     │  │  │  ├─ [root-of-the-server]__6bdb8917._.js
│  │     │  │  │  ├─ [root-of-the-server]__6bdb8917._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__d311bbbd._.js.map
│  │     │  │  │  ├─ frontend_0e8e1e3d._.js.map
│  │     │  │  │  ├─ frontend__next-internal_server_app_courses_page_actions_d80a6df2.js.map
│  │     │  │  │  ├─ frontend__next-internal_server_app_courses_page_actions_d80a6df2.js
│  │     │  │  │  ├─ 9e883_next_dist_0c44d37d._.js
│  │     │  │  │  ├─ frontend_0e8e1e3d._.js
│  │     │  │  │  ├─ 9e883_next_dist_0c44d37d._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__d311bbbd._.js
│  │     │  │  │  ├─ 9e883_@mui_system_esm_f22011a8._.js
│  │     │  │  │  ├─ 9e883_@mui_material_esm_4091e8fe._.js
│  │     │  │  │  ├─ frontend_5485cac2._.js.map
│  │     │  │  │  ├─ frontend__next-internal_server_app_contact-us_page_actions_6b91d27a.js.map
│  │     │  │  │  ├─ 9e883_next_dist_d34863db._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__2fa3e592._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_4091e8fe._.js.map
│  │     │  │  │  ├─ frontend__next-internal_server_app_contact-us_page_actions_6b91d27a.js
│  │     │  │  │  ├─ frontend_5485cac2._.js
│  │     │  │  │  ├─ [root-of-the-server]__2fa3e592._.js
│  │     │  │  │  ├─ 9e883_bf28e4ec._.js
│  │     │  │  │  ├─ 9e883_next_dist_d34863db._.js
│  │     │  │  │  ├─ 9e883_@mui_system_esm_f22011a8._.js.map
│  │     │  │  │  ├─ 9e883_bf28e4ec._.js.map
│  │     │  │  │  ├─ 9e883_next_dist_5ffd3934._.js.map
│  │     │  │  │  ├─ frontend_c415ae62._.js
│  │     │  │  │  ├─ 9e883_f3527ca3._.js
│  │     │  │  │  ├─ frontend_c415ae62._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_00206078._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_00206078._.js
│  │     │  │  │  ├─ frontend__next-internal_server_app_faq_page_actions_482eefcf.js.map
│  │     │  │  │  ├─ [root-of-the-server]__29ed3f85._.js.map
│  │     │  │  │  ├─ frontend__next-internal_server_app_faq_page_actions_482eefcf.js
│  │     │  │  │  ├─ 9e883_f3527ca3._.js.map
│  │     │  │  │  ├─ 9e883_next_dist_5ffd3934._.js
│  │     │  │  │  ├─ [root-of-the-server]__29ed3f85._.js
│  │     │  │  │  ├─ 9e883_@mui_material_esm_4e8c8478._.js
│  │     │  │  │  ├─ 9e883_@mui_material_esm_4e8c8478._.js.map
│  │     │  │  │  ├─ 9e883_next_dist_054863f5._.js
│  │     │  │  │  ├─ frontend__next-internal_server_app_reset-password_page_actions_3ebf244c.js.map
│  │     │  │  │  ├─ 9e883_2813065f._.js.map
│  │     │  │  │  ├─ frontend__next-internal_server_app_reset-password_page_actions_3ebf244c.js
│  │     │  │  │  ├─ 9e883_@mui_material_esm_8323f095._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_8323f095._.js
│  │     │  │  │  ├─ [root-of-the-server]__5f54a193._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__926c597d._.js
│  │     │  │  │  ├─ 9e883_@mui_system_esm_442e44a3._.js.map
│  │     │  │  │  ├─ 9e883_2813065f._.js
│  │     │  │  │  ├─ [root-of-the-server]__5f54a193._.js
│  │     │  │  │  ├─ 9e883_@mui_system_esm_442e44a3._.js
│  │     │  │  │  ├─ 9e883_next_dist_054863f5._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__926c597d._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_dab4a1b3._.js
│  │     │  │  │  ├─ 9e883_3a7f26b9._.js.map
│  │     │  │  │  ├─ 9e883_3a7f26b9._.js
│  │     │  │  │  ├─ 9e883_@mui_material_esm_dab4a1b3._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__88c53ed6._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__88c53ed6._.js
│  │     │  │  │  ├─ 9e883_60755401._.js
│  │     │  │  │  ├─ [root-of-the-server]__1c09770a._.js
│  │     │  │  │  ├─ 9e883_60755401._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__1c09770a._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_24590692._.js.map
│  │     │  │  │  ├─ 9e883_94c847ba._.js
│  │     │  │  │  ├─ 9e883_@mui_system_esm_992403c4._.js
│  │     │  │  │  ├─ 9e883_@mui_material_esm_24590692._.js
│  │     │  │  │  ├─ 9e883_@mui_system_esm_992403c4._.js.map
│  │     │  │  │  ├─ 9e883_94c847ba._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_d7a64dee._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_d7a64dee._.js
│  │     │  │  │  ├─ 9e883_@mui_material_esm_9587a982._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_9587a982._.js
│  │     │  │  │  ├─ 9e883_@mui_material_esm_1b6329f1._.js
│  │     │  │  │  ├─ [root-of-the-server]__02ad2933._.js.map
│  │     │  │  │  ├─ 9e883_@mui_material_esm_1b6329f1._.js.map
│  │     │  │  │  ├─ [root-of-the-server]__02ad2933._.js
│  │     │  │  │  ├─ 9e883_@mui_material_esm_4a9ede65._.js.map
│  │     │  │  │  └─ 9e883_@mui_material_esm_4a9ede65._.js
│  │     │  │  ├─ 9e883_axios_lib_3b943fd8._.js.map
│  │     │  │  ├─ 9e883_233b14a1._.js
│  │     │  │  ├─ frontend__next-internal_server_app_api_auth_me_route_actions_0313690c.js.map
│  │     │  │  ├─ 9e883_233b14a1._.js.map
│  │     │  │  ├─ 9e883_mime-db_c600f368._.js
│  │     │  │  ├─ [root-of-the-server]__9837d883._.js
│  │     │  │  ├─ 9e883_next_3a121114._.js
│  │     │  │  ├─ [turbopack]_runtime.js
│  │     │  │  ├─ [turbopack]_runtime.js.map
│  │     │  │  ├─ frontend__next-internal_server_app_api_auth_me_route_actions_0313690c.js
│  │     │  │  ├─ [root-of-the-server]__9837d883._.js.map
│  │     │  │  ├─ 9e883_mime-db_c600f368._.js.map
│  │     │  │  ├─ 9e883_axios_lib_3b943fd8._.js
│  │     │  │  ├─ 9e883_next_3a121114._.js.map
│  │     │  │  ├─ frontend__next-internal_server_app_api_auth_login_route_actions_6765fbfd.js
│  │     │  │  ├─ [root-of-the-server]__92ca4104._.js.map
│  │     │  │  ├─ frontend__next-internal_server_app_api_auth_login_route_actions_6765fbfd.js.map
│  │     │  │  ├─ [root-of-the-server]__92ca4104._.js
│  │     │  │  ├─ 9e883_next_6ab696e5._.js.map
│  │     │  │  ├─ 9e883_next_6ab696e5._.js
│  │     │  │  ├─ frontend__next-internal_server_app_api_auth_logout_route_actions_6d175879.js.map
│  │     │  │  ├─ [root-of-the-server]__087aca9b._.js.map
│  │     │  │  ├─ 9e883_next_f1b70bf2._.js
│  │     │  │  ├─ [root-of-the-server]__087aca9b._.js
│  │     │  │  ├─ frontend__next-internal_server_app_api_auth_logout_route_actions_6d175879.js
│  │     │  │  ├─ 9e883_next_f1b70bf2._.js.map
│  │     │  │  ├─ [root-of-the-server]__0030237b._.js.map
│  │     │  │  ├─ frontend__next-internal_server_app_api_auth_register_route_actions_b6c2584e.js
│  │     │  │  ├─ 9e883_next_412e6949._.js.map
│  │     │  │  ├─ [root-of-the-server]__0030237b._.js
│  │     │  │  ├─ frontend__next-internal_server_app_api_auth_register_route_actions_b6c2584e.js.map
│  │     │  │  ├─ 9e883_next_412e6949._.js
│  │     │  │  ├─ ceffb__next-internal_server_app_api_auth_forgot-password_route_actions_d3ee3925.js.map
│  │     │  │  ├─ 9e883_next_364639ce._.js
│  │     │  │  ├─ ceffb__next-internal_server_app_api_auth_forgot-password_route_actions_d3ee3925.js
│  │     │  │  ├─ 9e883_next_364639ce._.js.map
│  │     │  │  ├─ [root-of-the-server]__70c1eb60._.js.map
│  │     │  │  ├─ [root-of-the-server]__70c1eb60._.js
│  │     │  │  ├─ 9e883_next_bcacb70b._.js.map
│  │     │  │  ├─ frontend__next-internal_server_app_api_auth_send-otp_route_actions_7bde9e0b.js.map
│  │     │  │  ├─ [root-of-the-server]__40c983ff._.js
│  │     │  │  ├─ frontend__next-internal_server_app_api_auth_send-otp_route_actions_7bde9e0b.js
│  │     │  │  ├─ [root-of-the-server]__40c983ff._.js.map
│  │     │  │  ├─ 9e883_next_bcacb70b._.js
│  │     │  │  ├─ [root-of-the-server]__cc7c71a4._.js.map
│  │     │  │  ├─ 9e883_next_1f3638e5._.js
│  │     │  │  ├─ frontend__next-internal_server_app_api_auth_verify-otp_route_actions_98a5bb77.js.map
│  │     │  │  ├─ frontend__next-internal_server_app_api_auth_verify-otp_route_actions_98a5bb77.js
│  │     │  │  ├─ [root-of-the-server]__cc7c71a4._.js
│  │     │  │  └─ 9e883_next_1f3638e5._.js.map
│  │     │  ├─ app
│  │     │  │  ├─ page
│  │     │  │  │  ├─ app-paths-manifest.json
│  │     │  │  │  ├─ next-font-manifest.json
│  │     │  │  │  ├─ server-reference-manifest.json
│  │     │  │  │  ├─ react-loadable-manifest.json
│  │     │  │  │  └─ build-manifest.json
│  │     │  │  ├─ page_client-reference-manifest.js
│  │     │  │  ├─ page.js.map
│  │     │  │  ├─ page.js
│  │     │  │  ├─ _not-found
│  │     │  │  │  ├─ page
│  │     │  │  │  │  ├─ server-reference-manifest.json
│  │     │  │  │  │  ├─ app-paths-manifest.json
│  │     │  │  │  │  ├─ react-loadable-manifest.json
│  │     │  │  │  │  ├─ build-manifest.json
│  │     │  │  │  │  └─ next-font-manifest.json
│  │     │  │  │  ├─ page.js
│  │     │  │  │  ├─ page.js.map
│  │     │  │  │  └─ page_client-reference-manifest.js
│  │     │  │  ├─ api
│  │     │  │  │  └─ auth
│  │     │  │  │     ├─ me
│  │     │  │  │     │  ├─ route
│  │     │  │  │     │  │  ├─ app-paths-manifest.json
│  │     │  │  │     │  │  ├─ build-manifest.json
│  │     │  │  │     │  │  └─ server-reference-manifest.json
│  │     │  │  │     │  ├─ route.js.map
│  │     │  │  │     │  ├─ route.js
│  │     │  │  │     │  └─ route_client-reference-manifest.js
│  │     │  │  │     ├─ login
│  │     │  │  │     │  ├─ route
│  │     │  │  │     │  │  ├─ app-paths-manifest.json
│  │     │  │  │     │  │  ├─ server-reference-manifest.json
│  │     │  │  │     │  │  └─ build-manifest.json
│  │     │  │  │     │  ├─ route.js
│  │     │  │  │     │  ├─ route.js.map
│  │     │  │  │     │  └─ route_client-reference-manifest.js
│  │     │  │  │     ├─ logout
│  │     │  │  │     │  ├─ route
│  │     │  │  │     │  │  ├─ server-reference-manifest.json
│  │     │  │  │     │  │  ├─ app-paths-manifest.json
│  │     │  │  │     │  │  └─ build-manifest.json
│  │     │  │  │     │  ├─ route.js.map
│  │     │  │  │     │  ├─ route_client-reference-manifest.js
│  │     │  │  │     │  └─ route.js
│  │     │  │  │     ├─ register
│  │     │  │  │     │  ├─ route
│  │     │  │  │     │  │  ├─ build-manifest.json
│  │     │  │  │     │  │  ├─ app-paths-manifest.json
│  │     │  │  │     │  │  └─ server-reference-manifest.json
│  │     │  │  │     │  ├─ route.js.map
│  │     │  │  │     │  ├─ route.js
│  │     │  │  │     │  └─ route_client-reference-manifest.js
│  │     │  │  │     ├─ forgot-password
│  │     │  │  │     │  ├─ route
│  │     │  │  │     │  │  ├─ server-reference-manifest.json
│  │     │  │  │     │  │  ├─ app-paths-manifest.json
│  │     │  │  │     │  │  └─ build-manifest.json
│  │     │  │  │     │  ├─ route_client-reference-manifest.js
│  │     │  │  │     │  ├─ route.js
│  │     │  │  │     │  └─ route.js.map
│  │     │  │  │     ├─ send-otp
│  │     │  │  │     │  ├─ route
│  │     │  │  │     │  │  ├─ app-paths-manifest.json
│  │     │  │  │     │  │  ├─ build-manifest.json
│  │     │  │  │     │  │  └─ server-reference-manifest.json
│  │     │  │  │     │  ├─ route.js.map
│  │     │  │  │     │  ├─ route.js
│  │     │  │  │     │  └─ route_client-reference-manifest.js
│  │     │  │  │     └─ verify-otp
│  │     │  │  │        ├─ route
│  │     │  │  │        │  ├─ app-paths-manifest.json
│  │     │  │  │        │  ├─ server-reference-manifest.json
│  │     │  │  │        │  └─ build-manifest.json
│  │     │  │  │        ├─ route_client-reference-manifest.js
│  │     │  │  │        ├─ route.js.map
│  │     │  │  │        └─ route.js
│  │     │  │  ├─ teacher
│  │     │  │  │  └─ dashboard
│  │     │  │  │     ├─ page
│  │     │  │  │     │  ├─ server-reference-manifest.json
│  │     │  │  │     │  ├─ react-loadable-manifest.json
│  │     │  │  │     │  ├─ build-manifest.json
│  │     │  │  │     │  ├─ next-font-manifest.json
│  │     │  │  │     │  └─ app-paths-manifest.json
│  │     │  │  │     ├─ page_client-reference-manifest.js
│  │     │  │  │     ├─ page.js
│  │     │  │  │     └─ page.js.map
│  │     │  │  ├─ login
│  │     │  │  │  ├─ page
│  │     │  │  │  │  ├─ build-manifest.json
│  │     │  │  │  │  ├─ server-reference-manifest.json
│  │     │  │  │  │  ├─ react-loadable-manifest.json
│  │     │  │  │  │  ├─ app-paths-manifest.json
│  │     │  │  │  │  └─ next-font-manifest.json
│  │     │  │  │  ├─ page_client-reference-manifest.js
│  │     │  │  │  ├─ page.js
│  │     │  │  │  └─ page.js.map
│  │     │  │  ├─ register
│  │     │  │  │  ├─ page
│  │     │  │  │  │  ├─ build-manifest.json
│  │     │  │  │  │  ├─ app-paths-manifest.json
│  │     │  │  │  │  ├─ server-reference-manifest.json
│  │     │  │  │  │  ├─ next-font-manifest.json
│  │     │  │  │  │  └─ react-loadable-manifest.json
│  │     │  │  │  ├─ page_client-reference-manifest.js
│  │     │  │  │  ├─ page.js.map
│  │     │  │  │  └─ page.js
│  │     │  │  ├─ about-us
│  │     │  │  │  ├─ page
│  │     │  │  │  │  ├─ next-font-manifest.json
│  │     │  │  │  │  ├─ app-paths-manifest.json
│  │     │  │  │  │  ├─ server-reference-manifest.json
│  │     │  │  │  │  ├─ build-manifest.json
│  │     │  │  │  │  └─ react-loadable-manifest.json
│  │     │  │  │  ├─ page_client-reference-manifest.js
│  │     │  │  │  ├─ page.js.map
│  │     │  │  │  └─ page.js
│  │     │  │  ├─ verification
│  │     │  │  │  ├─ page
│  │     │  │  │  │  ├─ app-paths-manifest.json
│  │     │  │  │  │  ├─ server-reference-manifest.json
│  │     │  │  │  │  ├─ react-loadable-manifest.json
│  │     │  │  │  │  ├─ next-font-manifest.json
│  │     │  │  │  │  └─ build-manifest.json
│  │     │  │  │  ├─ page.js.map
│  │     │  │  │  ├─ page_client-reference-manifest.js
│  │     │  │  │  └─ page.js
│  │     │  │  ├─ rejected
│  │     │  │  │  ├─ page
│  │     │  │  │  │  ├─ server-reference-manifest.json
│  │     │  │  │  │  ├─ react-loadable-manifest.json
│  │     │  │  │  │  ├─ app-paths-manifest.json
│  │     │  │  │  │  ├─ next-font-manifest.json
│  │     │  │  │  │  └─ build-manifest.json
│  │     │  │  │  ├─ page_client-reference-manifest.js
│  │     │  │  │  ├─ page.js
│  │     │  │  │  └─ page.js.map
│  │     │  │  ├─ courses
│  │     │  │  │  ├─ page
│  │     │  │  │  │  ├─ build-manifest.json
│  │     │  │  │  │  ├─ next-font-manifest.json
│  │     │  │  │  │  ├─ app-paths-manifest.json
│  │     │  │  │  │  ├─ react-loadable-manifest.json
│  │     │  │  │  │  └─ server-reference-manifest.json
│  │     │  │  │  ├─ page_client-reference-manifest.js
│  │     │  │  │  ├─ page.js
│  │     │  │  │  └─ page.js.map
│  │     │  │  ├─ contact-us
│  │     │  │  │  ├─ page
│  │     │  │  │  │  ├─ build-manifest.json
│  │     │  │  │  │  ├─ app-paths-manifest.json
│  │     │  │  │  │  ├─ next-font-manifest.json
│  │     │  │  │  │  ├─ react-loadable-manifest.json
│  │     │  │  │  │  └─ server-reference-manifest.json
│  │     │  │  │  ├─ page.js
│  │     │  │  │  ├─ page_client-reference-manifest.js
│  │     │  │  │  └─ page.js.map
│  │     │  │  ├─ faq
│  │     │  │  │  ├─ page
│  │     │  │  │  │  ├─ app-paths-manifest.json
│  │     │  │  │  │  ├─ react-loadable-manifest.json
│  │     │  │  │  │  ├─ next-font-manifest.json
│  │     │  │  │  │  ├─ server-reference-manifest.json
│  │     │  │  │  │  └─ build-manifest.json
│  │     │  │  │  ├─ page_client-reference-manifest.js
│  │     │  │  │  ├─ page.js.map
│  │     │  │  │  └─ page.js
│  │     │  │  └─ reset-password
│  │     │  │     ├─ page
│  │     │  │     │  ├─ next-font-manifest.json
│  │     │  │     │  ├─ build-manifest.json
│  │     │  │     │  ├─ app-paths-manifest.json
│  │     │  │     │  ├─ react-loadable-manifest.json
│  │     │  │     │  └─ server-reference-manifest.json
│  │     │  │     ├─ page.js.map
│  │     │  │     ├─ page.js
│  │     │  │     └─ page_client-reference-manifest.js
│  │     │  └─ pages
│  │     │     ├─ _app
│  │     │     │  ├─ next-font-manifest.json
│  │     │     │  ├─ react-loadable-manifest.json
│  │     │     │  ├─ pages-manifest.json
│  │     │     │  ├─ build-manifest.json
│  │     │     │  └─ client-build-manifest.json
│  │     │     ├─ _app.js.map
│  │     │     ├─ _app.js
│  │     │     ├─ _document
│  │     │     │  ├─ react-loadable-manifest.json
│  │     │     │  ├─ pages-manifest.json
│  │     │     │  └─ next-font-manifest.json
│  │     │     ├─ _document.js.map
│  │     │     ├─ _document.js
│  │     │     ├─ _error
│  │     │     │  ├─ client-build-manifest.json
│  │     │     │  ├─ build-manifest.json
│  │     │     │  ├─ pages-manifest.json
│  │     │     │  ├─ next-font-manifest.json
│  │     │     │  └─ react-loadable-manifest.json
│  │     │     ├─ _error.js
│  │     │     └─ _error.js.map
│  │     ├─ static
│  │     │  ├─ development
│  │     │  │  ├─ _buildManifest.js
│  │     │  │  ├─ _ssgManifest.js
│  │     │  │  └─ _clientMiddlewareManifest.json
│  │     │  ├─ chunks
│  │     │  │  ├─ 9e883_next_dist_client_8f566942._.js.map
│  │     │  │  ├─ frontend_4310875e._.js
│  │     │  │  ├─ 9e883_next_dist_compiled_8f5ebc08._.js
│  │     │  │  ├─ frontend_app_layout_jsx_4e1533d8._.js
│  │     │  │  ├─ 9e883_next_dist_4c1928ef._.js.map
│  │     │  │  ├─ 9e883_next_dist_client_8f566942._.js
│  │     │  │  ├─ 9e883_next_dist_compiled_react-server-dom-turbopack_6723cebf._.js.map
│  │     │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_c8c997ce._.js
│  │     │  │  ├─ 9e883_next_dist_compiled_react-dom_33d456f8._.js.map
│  │     │  │  ├─ 9e883_@swc_helpers_cjs_c26b7a0e._.js.map
│  │     │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_c8c997ce._.js.map
│  │     │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_7e7c3a31._.js.map
│  │     │  │  ├─ frontend_app_globals_c083601a.css.map
│  │     │  │  ├─ 9e883_next_dist_compiled_react-dom_33d456f8._.js
│  │     │  │  ├─ turbopack-frontend_ddbb73ac._.js
│  │     │  │  ├─ 9e883_next_dist_compiled_next-devtools_index_6915c2bc.js
│  │     │  │  ├─ 9e883_next_dist_compiled_react-server-dom-turbopack_6723cebf._.js
│  │     │  │  ├─ frontend_4310875e._.js.map
│  │     │  │  ├─ 9e883_next_dist_891d815a._.js
│  │     │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_7e7c3a31._.js
│  │     │  │  ├─ frontend_app_favicon_ico_mjs_39bca61d._.js
│  │     │  │  ├─ 9e883_@swc_helpers_cjs_c26b7a0e._.js
│  │     │  │  ├─ frontend_a0ff3932._.js
│  │     │  │  ├─ frontend_ddbb73ac._.js.map
│  │     │  │  ├─ 9e883_next_dist_891d815a._.js.map
│  │     │  │  ├─ frontend_e414a2d2._.js.map
│  │     │  │  ├─ 9e883_next_dist_client_components_builtin_global-error_4e1533d8.js
│  │     │  │  ├─ frontend_app_globals_c083601a.css
│  │     │  │  ├─ 9e883_next_dist_4c1928ef._.js
│  │     │  │  ├─ 9e883_next_ee8b504f._.js.map
│  │     │  │  ├─ frontend_app_page_tsx_e71497a1._.js
│  │     │  │  ├─ [turbopack]_browser_dev_hmr-client_hmr-client_ts_3b9e60ca._.js
│  │     │  │  ├─ 9e883_next_dist_compiled_8f5ebc08._.js.map
│  │     │  │  ├─ frontend_e414a2d2._.js
│  │     │  │  ├─ 9e883_next_ee8b504f._.js
│  │     │  │  ├─ 9e883_next_dist_build_polyfills_polyfill-nomodule.js
│  │     │  │  ├─ 9e883_next_dist_compiled_next-devtools_index_6915c2bc.js.map
│  │     │  │  ├─ pages
│  │     │  │  │  ├─ _app.js
│  │     │  │  │  └─ _error.js
│  │     │  │  ├─ 9e883_next_app_3f020608.js
│  │     │  │  ├─ 9e883_bb6d2665._.js.map
│  │     │  │  ├─ [root-of-the-server]__6a99bfdf._.js
│  │     │  │  ├─ [next]_entry_page-loader_ts_c1675e40._.js
│  │     │  │  ├─ 9e883_bb6d2665._.js
│  │     │  │  ├─ 9e883_next_dist_compiled_7638d890._.js.map
│  │     │  │  ├─ [next]_entry_page-loader_ts_c1675e40._.js.map
│  │     │  │  ├─ [root-of-the-server]__6a99bfdf._.js.map
│  │     │  │  ├─ 9e883_next_dist_client_fe082e00._.js
│  │     │  │  ├─ 9e883_next_dist_compiled_7638d890._.js
│  │     │  │  ├─ 9e883_next_app_3f020608.js.map
│  │     │  │  ├─ 9e883_next_dist_shared_lib_bc5614d9._.js
│  │     │  │  ├─ 9e883_react-dom_3d11c48e._.js
│  │     │  │  ├─ frontend_pages__app_2da965e7._.js
│  │     │  │  ├─ 9e883_next_dist_shared_lib_bc5614d9._.js.map
│  │     │  │  ├─ 9e883_react-dom_3d11c48e._.js.map
│  │     │  │  ├─ turbopack-frontend_pages__app_247a014d._.js
│  │     │  │  ├─ frontend_pages__app_247a014d._.js.map
│  │     │  │  ├─ 9e883_next_dist_4d2afce3._.js
│  │     │  │  ├─ 9e883_next_dist_4d2afce3._.js.map
│  │     │  │  ├─ 9e883_next_dist_client_fe082e00._.js.map
│  │     │  │  ├─ frontend_pages__error_13e12dba._.js.map
│  │     │  │  ├─ 9e883_next_dist_91312c1c._.js.map
│  │     │  │  ├─ 9e883_next_error_43788141.js.map
│  │     │  │  ├─ [root-of-the-server]__2b803f7d._.js.map
│  │     │  │  ├─ [next]_entry_page-loader_ts_b9ef54ef._.js
│  │     │  │  ├─ [root-of-the-server]__2b803f7d._.js
│  │     │  │  ├─ 9e883_next_dist_shared_lib_8ad05970._.js.map
│  │     │  │  ├─ [next]_entry_page-loader_ts_b9ef54ef._.js.map
│  │     │  │  ├─ 9e883_next_dist_91312c1c._.js
│  │     │  │  ├─ 9e883_next_error_43788141.js
│  │     │  │  ├─ turbopack-frontend_pages__error_13e12dba._.js
│  │     │  │  ├─ 9e883_next_dist_shared_lib_8ad05970._.js
│  │     │  │  ├─ frontend_pages__error_2da965e7._.js
│  │     │  │  ├─ 9e883_@mui_system_esm_f67c7fa1._.js
│  │     │  │  ├─ 9e883_@mui_system_esm_f67c7fa1._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_8bc9f5f7._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_8bc9f5f7._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_styles_2a7def4d._.js.map
│  │     │  │  ├─ 9e883_7d988acd._.js
│  │     │  │  ├─ 9e883_7d988acd._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_styles_2a7def4d._.js
│  │     │  │  ├─ 9e883_c318d3b3._.js
│  │     │  │  ├─ 9e883_c318d3b3._.js.map
│  │     │  │  ├─ frontend_6fe604d0._.js
│  │     │  │  ├─ frontend_app_teacher_dashboard_page_jsx_e71497a1._.js
│  │     │  │  ├─ frontend_6fe604d0._.js.map
│  │     │  │  ├─ 9e883_@mui_system_esm_a3178382._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_e92a914a._.js
│  │     │  │  ├─ frontend_020f1a68._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_e92a914a._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_styles_c831cdf8._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_styles_c831cdf8._.js
│  │     │  │  ├─ 9e883_85dc0e36._.js
│  │     │  │  ├─ 9e883_@mui_system_esm_a3178382._.js.map
│  │     │  │  ├─ 9e883_85dc0e36._.js.map
│  │     │  │  ├─ frontend_020f1a68._.js
│  │     │  │  ├─ frontend_app_login_page_jsx_e71497a1._.js
│  │     │  │  ├─ 9e883_700c231b._.js.map
│  │     │  │  ├─ 9e883_@mui_system_esm_027fd62f._.js
│  │     │  │  ├─ 9e883_700c231b._.js
│  │     │  │  ├─ frontend_6264f3b3._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_22a18975._.js.map
│  │     │  │  ├─ frontend_app_register_page_jsx_e71497a1._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_22a18975._.js
│  │     │  │  ├─ frontend_6264f3b3._.js.map
│  │     │  │  ├─ 9e883_@mui_system_esm_027fd62f._.js.map
│  │     │  │  ├─ frontend_ef439ddd._.js
│  │     │  │  ├─ 9e883_c7bc695d._.js
│  │     │  │  ├─ 9e883_@mui_system_esm_761db6d4._.js.map
│  │     │  │  ├─ frontend_ef439ddd._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_styles_430b4808._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_8b39c49d._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_8b39c49d._.js.map
│  │     │  │  ├─ frontend_app_about-us_page_tsx_e71497a1._.js
│  │     │  │  ├─ 9e883_@mui_system_esm_761db6d4._.js
│  │     │  │  ├─ 9e883_c7bc695d._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_styles_430b4808._.js.map
│  │     │  │  ├─ frontend_app_verification_page_tsx_02051928._.js
│  │     │  │  ├─ frontend_app_verification_page_tsx_e71497a1._.js
│  │     │  │  ├─ 9e883_ac920f83._.js.map
│  │     │  │  ├─ 9e883_ac920f83._.js
│  │     │  │  ├─ frontend_app_verification_page_tsx_02051928._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_f17d719e._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_f17d719e._.js
│  │     │  │  ├─ 9e883_framer-motion_dist_es_83a3ae4f._.js.map
│  │     │  │  ├─ 9e883_motion-dom_dist_es_34f5604c._.js
│  │     │  │  ├─ 9e883_ee3b7e6b._.js.map
│  │     │  │  ├─ 9e883_framer-motion_dist_es_83a3ae4f._.js
│  │     │  │  ├─ 9e883_@mui_system_esm_4a21fc60._.js.map
│  │     │  │  ├─ 9e883_@mui_system_esm_4a21fc60._.js
│  │     │  │  ├─ 9e883_motion-dom_dist_es_34f5604c._.js.map
│  │     │  │  ├─ 9e883_ee3b7e6b._.js
│  │     │  │  ├─ 9e883_@mui_system_esm_8b75e4ad._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_d16dc4b8._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_d16dc4b8._.js.map
│  │     │  │  ├─ 9e883_@mui_system_esm_8b75e4ad._.js
│  │     │  │  ├─ 9e883_3628e149._.js.map
│  │     │  │  ├─ 9e883_3628e149._.js
│  │     │  │  ├─ frontend_4d6749ba._.js
│  │     │  │  ├─ frontend_4d6749ba._.js.map
│  │     │  │  ├─ frontend_8782386a._.js
│  │     │  │  ├─ frontend_8782386a._.js.map
│  │     │  │  ├─ frontend_app_rejected_page_tsx_e71497a1._.js
│  │     │  │  ├─ frontend_a4fbc13c._.js.map
│  │     │  │  ├─ frontend_a4fbc13c._.js
│  │     │  │  ├─ frontend_components_a44525fb._.js.map
│  │     │  │  ├─ 9e883_8241d19c._.js
│  │     │  │  ├─ frontend_components_a44525fb._.js
│  │     │  │  ├─ 9e883_8241d19c._.js.map
│  │     │  │  ├─ frontend_1b743d03._.js.map
│  │     │  │  ├─ frontend_app_courses_page_tsx_e71497a1._.js
│  │     │  │  ├─ frontend_1b743d03._.js
│  │     │  │  ├─ frontend_e0aa0d20._.js.map
│  │     │  │  ├─ 9e883_@mui_system_esm_a10e4323._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_9f4e9607._.js.map
│  │     │  │  ├─ frontend_e0aa0d20._.js
│  │     │  │  ├─ 9e883_ff4ace26._.js.map
│  │     │  │  ├─ 9e883_ff4ace26._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_9f4e9607._.js
│  │     │  │  ├─ 9e883_@mui_system_esm_a10e4323._.js
│  │     │  │  ├─ frontend_app_contact-us_page_tsx_e71497a1._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_08bf4e70._.js.map
│  │     │  │  ├─ 9e883_fb40559e._.js.map
│  │     │  │  ├─ frontend_79373201._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_08bf4e70._.js
│  │     │  │  ├─ frontend_app_faq_page_tsx_e71497a1._.js
│  │     │  │  ├─ 9e883_fb40559e._.js
│  │     │  │  ├─ frontend_79373201._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_1a06478c._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_1a06478c._.js
│  │     │  │  ├─ 9e883_3f683f86._.js.map
│  │     │  │  ├─ frontend_34996dd3._.js
│  │     │  │  ├─ frontend_app_reset-password_page_tsx_e71497a1._.js
│  │     │  │  ├─ 9e883_3f683f86._.js
│  │     │  │  ├─ frontend_34996dd3._.js.map
│  │     │  │  ├─ 9e883_18bfab36._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_d3c0f552._.js.map
│  │     │  │  ├─ 9e883_@mui_system_esm_fd6d2350._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_d3c0f552._.js
│  │     │  │  ├─ frontend_be146e13._.js.map
│  │     │  │  ├─ 9e883_@mui_system_esm_fd6d2350._.js.map
│  │     │  │  ├─ frontend_be146e13._.js
│  │     │  │  ├─ 9e883_18bfab36._.js.map
│  │     │  │  ├─ frontend_32d3a5f8._.js.map
│  │     │  │  ├─ 9e883_03412199._.js
│  │     │  │  ├─ 9e883_03412199._.js.map
│  │     │  │  ├─ frontend_32d3a5f8._.js
│  │     │  │  ├─ 9e883_@mui_system_esm_957242a1._.js.map
│  │     │  │  ├─ 9e883_@mui_system_esm_957242a1._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_4ce3c947._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_4ce3c947._.js.map
│  │     │  │  ├─ 9e883_03ba1bfb._.js.map
│  │     │  │  ├─ 9e883_03ba1bfb._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_eab76069._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_eab76069._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_39afadd6._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_39afadd6._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_fbd13179._.js
│  │     │  │  ├─ frontend_d5fc343a._.js.map
│  │     │  │  ├─ 9e883_@mui_material_esm_fbd13179._.js.map
│  │     │  │  ├─ frontend_d5fc343a._.js
│  │     │  │  ├─ 9e883_@mui_material_esm_9a67bd2d._.js
│  │     │  │  └─ 9e883_@mui_material_esm_9a67bd2d._.js.map
│  │     │  └─ media
│  │     │     └─ favicon.0b3bf435.ico
│  │     ├─ package.json
│  │     ├─ build-manifest.json
│  │     ├─ fallback-build-manifest.json
│  │     ├─ types
│  │     │  ├─ routes.d.ts
│  │     │  ├─ validator.ts
│  │     │  └─ cache-life.d.ts
│  │     ├─ trace
│  │     ├─ routes-manifest.json
│  │     ├─ prerender-manifest.json
│  │     └─ build
│  │        ├─ chunks
│  │        │  ├─ [root-of-the-server]__188e9cb8._.js.map
│  │        │  ├─ [turbopack]_runtime.js.map
│  │        │  ├─ 9e883_174fdf60._.js
│  │        │  ├─ [turbopack-node]_transforms_postcss_ts_84bca64a._.js
│  │        │  ├─ [turbopack]_runtime.js
│  │        │  ├─ [turbopack-node]_transforms_postcss_ts_84bca64a._.js.map
│  │        │  ├─ 9e883_174fdf60._.js.map
│  │        │  ├─ [root-of-the-server]__3b54a99d._.js
│  │        │  ├─ [root-of-the-server]__188e9cb8._.js
│  │        │  └─ [root-of-the-server]__3b54a99d._.js.map
│  │        ├─ package.json
│  │        ├─ postcss.js
│  │        └─ postcss.js.map
│  ├─ next-env.d.ts
│  └─ utils
│     └─ refreshToken.js
├─ package-lock.json
├─ package.json
└─ structure.docx

```