# Blog Platform

Welcome to the Blog Platform! This backend system allows users to write, update, and delete blogs. It supports role-based access control, where Admins and Users have distinct permissions.

**Key Features:**

- User registration and login
- Secure authentication and role-based access control
- Admin can block users or delete blogs
- Users can perform CRUD operations on their own blogs
- Public API for viewing blogs with search, sort, and filter functionalities

## Getting Started Locally

- **Clone this repository:** `git clone https://github.com/sakib-xrz/level-2-batch-4-assignment-3.git`
- **Install necessary dependencies:** `npm install`
- **Rename env file:** Rename `.env.example` file to `.env`
- **Add database URI:** Replace the value of `DATABASE_URL` with your MongoDB connection URI
- **Run project:** Start the project using the command `npm run dev`

## Base URL

https://blog-backend-server.vercel.app

## Postman Collection

For detailed information about each API endpoint, request parameters, responses, and more, please refer to the [Postman API Documentation](https://documenter.getpostman.com/view/38345873/2sAYJ3F2Na).

## API Endpoints

### 1\. Authentication

#### 1.1 Register User

**POST** `/api/auth/register`

#### 1.2 Login User

**POST** `/api/auth/login`

---

### 2\. Blog Management

#### 2.1 Create Blog (User Only)

**POST** `/api/blogs`

#### 2.2 Update Blog (User Only)

**PATCH** `/api/blogs/:id`

#### 2.3 Delete Blog (User Only)

**DELETE** `/api/blogs/:id`

#### 2.4 Get All Blogs (Public)

**GET** `/api/blogs`

**Query Parameters**:

- `search`: Search blogs by title or content (e.g., `search=blogtitle`).
- `sortBy`: Sort blogs by specific fields such as `createdAt` or `title` (e.g., `sortBy=title`).
- `sortOrder`: Defines the sorting order. Accepts values `asc` (ascending) or `desc` (descending). (e.g., `sortOrder=desc`).
- `filter`: Filter blogs by author ID (e.g., `author=authorId`).

---

### 3\. Admin Actions

#### 3.1 Block User (Admin only)

**PATCH** `/api/admin/users/:userId/block`

#### 3.2 Delete Blog (Admin only)

**DELETE** `/api/admin/blogs/:id`

---

### Token Pattern

**Request Header:** `Authorization: Bearer <token>`

### Admin Credentials

```
{
    "email": "admin@gmail.com",
    "password": "123456"
}
```
