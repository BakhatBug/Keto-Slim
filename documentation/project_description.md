# Project Technical Description

This document provides a comprehensive technical overview of the KetoSlim project, covering Frontend, Backend, and Data Flow. This description is intended to be used for generating UML diagrams and understanding the system architecture.

## 1. Project Overview
**Name:** KetoSlim
**Purpose:** A health assessment and keto diet plan application.
**Architecture:** Client-Server architecture (currently decoupled).
- **Frontend:** React (Vite) Single Page Application.
- **Backend:** Node.js (Express) REST API with MongoDB (Mongoose).

---

## 2. Frontend Architecture
**Codebase:** `frontend/`
**Tech Stack:** React 19, TypeScript, Vite, TailwindCSS v4, React Router v7.

### Key Components & Modules
The frontend is organized as a multi-step wizard flow.

#### A. Entry Point & Routing
- **`App.tsx`**: Main entry point managing the application state (`formData`) and routing.
- **Routes**:
  - `/`: Landing page with `Form` component.
  - `/body-fat`: Displays Body Fat results.
  - `/bmi`: Displays BMI results.
  - `/calories`: Displays Calorie recommendations.
  - `/water`: Displays Water Intake recommendations.
  - `/weight-loss`: Displays Weight Loss projections.
  - `/timeline`: Displays Results Timeline.
  - `/plan`: Final plan page (`FinalPlanPage`).

#### B. Core Components (`src/components/`)
- **`Form.tsx`**: The main input form collecting user details (Gender, BodyFat, BMI, etc.). Validates inputs locally before submission.
- **`display/` Components**: Presentational components for each step of the results flow (`ResultsDisplay`, `BMIDisplay`, etc.).
- **`FinalPlanPage.tsx`**: The conversion page showing the "personalized plan", pricing options, and call-to-action.
- **`common/`**: Reusable UI elements (`Button`, `ThemeToggle`).

#### C. State Management
- **Local State (`App.tsx`)**: Holds the `formData` object (results from the initial form) and passes it down to protected routes.
- **Context API (`ThemeContext`)**: Manages Dark/Light mode preference across the app.

#### D. Data Flow (Frontend Internal)
1. User lands on `/`.
2. User fills `Form`.
3. `Form` validates and calls `onSubmit`.
4. `App.tsx` updates `formData` state.
5. `App.tsx` routes user to `/body-fat`.
6. User navigates through result pages, all reading from `formData` prop.

---

## 3. Backend Architecture
**Codebase:** `backend/`
**Tech Stack:** Node.js, Express, TypeScript, MongoDB (Mongoose), Zod (Validation), JWT (Auth).

### Key Components & Modules

#### A. Entry Point
- **`src/index.ts`**: Initializes Express app, connects to MongoDB, sets up middleware (CORS, Helmet, Rate Limits), and mounts routes.

#### B. Data Models (`src/models/`)
Defines the database schema using Mongoose.
- **User**: Authentication & Role management (`email`, `passwordHash`, `roles`).
- **FormSubmission**: Stores user health data (`gender`, `bmi`, `bodyFat`, `metrics`).
- **Product**: Represents sellable items/plans (`name`, `price`, `description`).
- **Order**: Records purchases (`userId`, `products`, `totalAmount`, `status`).
- **Result**: Computed results based on form submissions.

#### C. API Routes (`src/routes/`)
- **`authRoutes`** (`/api/auth`): Login, Register, Refresh Token.
- **`formRoutes`** (`/api/forms`): Submit health data, retrieve submissions.
- **`resultRoutes`** (`/api/results`): Get computed results.
- **`productRoutes`** (`/api/products`): CRUD for products.
- **`orderRoutes`** (`/api/orders`): Create and view orders.

#### D. Controllers (`src/controllers/`)
Contains business logic for each route, handling request validation (Zod) and database interactions.

---

## 4. Cross-System Data Flow

### Current Status
The Frontend and Backend are currently **decoupled**.
- **Frontend**: Operates independently using local state to simulate the user journey.
- **Backend**: Fully functional API ready to accept data, but currently not receiving requests from the frontend app.

### Intended Integration Flow (Logical)
1. **User Assessment**:
   - User submits Form on Frontend.
   - Frontend `POST /api/forms` -> Backend saves `FormSubmission`.
2. **Result Generation**:
   - Backend calculates results -> Returns data to Frontend.
   - Frontend displays results steps.
3. **Plan Purchase**:
   - User selects plan on `FinalPlanPage`.
   - Frontend `POST /api/auth/register` (if new user).
   - Frontend `POST /api/orders` -> Backend creates `Order`.

---

## 5. Security Architecture
- **Authentication**: JWT (JSON Web Tokens) for API access.
- **Password Hashing**: bcryptjs.
- **Environment Headers**: Helmet security headers.
- **Input Validation**: Zod schemas for all incoming API data.
