
## Abdur Rahman Portfolio Blog Backend


# Overview -------------

A modern backend API built with Express, Prisma, and TypeScript to power Abdur Rahman’s personal portfolio and blog platform.
It supports blog management, authentication, image upload, and pagination — ready for production deployment on Vercel or Render.

# Features

Personal Portfolio + Blog System

Modular architecture (Controllers, Services, Routes)

Prisma ORM with PostgreSQL or MySQL

JWT Authentication (Access & Refresh tokens)

Image Upload (Cloudinary supported)

Blog Management

Create, update, delete, view

Pagination and sorting

CORS + Cookie-based Auth

Error handling & Validation

Timestamps for all models

# Tech Stack
Technology	
Node.js	
Express.js	
Prisma ORM	
PostgreSQL / MySQL	
TypeScript	
Cloudinary	
JWT	Secure 


🧩 Installation & Setup

# 1 Clone the repository
git clone https://github.com/arahman-webdev/personal-portfolio-server.git

# 2 Install dependencies
npm install

# 3 Generate Prisma client
npx prisma generate

# 4 Run database migrations
npx prisma migrate dev --name init

# 5 Start the development server
npm run dev

Server runs on 👉 http://localhost:5000

