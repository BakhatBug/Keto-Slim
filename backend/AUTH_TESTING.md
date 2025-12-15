# Auth API Testing Guide

Test these endpoints using Postman, Insomnia, or curl.

## Base URL
```
http://localhost:5000/api/auth
```

## 1. Register New User

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User"
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "test@example.com",
      "name": "Test User",
      "roles": ["user"]
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Save the token!** You'll need it for protected routes.

---

## 2. Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "test@example.com",
      "name": "Test User",
      "roles": ["user"]
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 3. Get Current User (Protected)

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer <your-token-here>
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "test@example.com",
      "name": "Test User",
      "roles": ["user"]
    }
  }
}
```

---

## 4. Logout (Protected)

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer <your-token-here>
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Error Cases to Test

### 1. Validation Error - Missing Fields
**Request:**
```json
{
  "email": "test@example.com"
}
```
**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": [
      {
        "field": "body.password",
        "message": "Password is required"
      },
      {
        "field": "body.name",
        "message": "Name is required"
      }
    ]
  }
}
```

### 2. Duplicate Email
**Request:** Register with same email twice
**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Email already registered"
  }
}
```

### 3. Invalid Login
**Request:** Wrong password
**Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": {
    "message": "Invalid email or password"
  }
}
```

### 4. Missing Token
**Request:** GET /api/auth/me without Authorization header
**Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": {
    "message": "No token provided"
  }
}
```

### 5. Invalid Token
**Request:** Use expired or malformed token
**Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": {
    "message": "Invalid or expired token"
  }
}
```

---

## PowerShell Testing Commands

### Register
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
    name = "Test User"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $body -ContentType "application/json"
```

### Login
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
$token = $response.data.token
Write-Host "Token: $token"
```

### Get Current User
```powershell
$headers = @{
    Authorization = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/me" -Method GET -Headers $headers
```

---

## Testing Checklist

- [ ] Server starts without errors
- [ ] Can register new user
- [ ] Cannot register with same email twice
- [ ] Can login with correct credentials
- [ ] Cannot login with wrong password
- [ ] Token is returned after login
- [ ] Can access /me with valid token
- [ ] Cannot access /me without token
- [ ] Cannot access /me with invalid token
- [ ] Validation errors show helpful messages
