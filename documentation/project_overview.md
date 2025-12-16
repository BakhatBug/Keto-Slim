# Project Overview

## 🎯 Goal
To create a "Mini Results Flow" project that mimics a provided demo site, focusing on a seamless user experience for generating personalized keto diet plans and purchasing related products.

## 🌟 Core Features

### Frontend (React + Vite)
- **Multi-step Form**: interactive form to collect user health data (Gender, BMI, Weight, Cups of Water, Days to loose weight etc.).
- **Real-time Calculations**: BMI, Calorie needs, and Water intake calculations.
- **Dynamic Result Generation**: Custom messages on each page according to input data
- **CheckOut Process**: Checkout process for payment. 
- **Theme Support**: Dark/Light mode toggle using React Context.

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Structured API for handling data.
- **Authentication**: JWT-based auth with role management (User/Admin).
- **Data Persistence**: MongoDB storage for Users, Form Submissions, Results, Products, and Orders.
- **Validation**: Zod schema validation for data integrity.
- **Security**: Helmet, CORS, and Rate Limiting enabled.

## 🛠 Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React, TypeScript, Vite, TailwindCSS |
| **State Management** | React Context (Theme) & React State (Data Flow) |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB (Mongoose ODM) |
| **Validation** | Zod |
| **Testing** | Jest, Supertest |
| **Deployment** | Vercel (Frontend & Backend) |

## 👥 Roles
- **Guest**: Can submit forms, view products, and place orders (guest checkout).
- **User**: Can save specific data, view order history, and manage profile.
- **Admin**: Full access to manage products, orders, and view all system data.
