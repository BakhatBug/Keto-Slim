# Setup & Installation Guide

Follow these steps to set up the KetoSlim project locally.

## Prerequisites
- Node.js (v18+)
- MongoDB (Local instance or Atlas URI)
- Git

## 📥 Cloning the Repository

```bash
git clone https://github.com/BakhatBug/Keto-Slim.git
cd ketoslim
```

## 🖥️ Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `backend` root:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/ketoslim
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=7d
   CLIENT_ORIGIN=http://localhost:5173
   ```

4. **Seed Database:**
   ```bash
   npm run seed
   ```

5. **Start the Server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`.

## 🎨 Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Application will be accessible at `http://localhost:5173`.

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Type Check
```bash
cd frontend
npm run tsc
```

## 📦 Build for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
```
The built files will be in the `dist` directory.
