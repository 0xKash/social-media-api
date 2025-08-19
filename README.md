# Social Media API

A RESTful API built with Node.js, Express, and Supabase. It provides secure session-based authentication and cloud storage integration, designed to be the backbone of a modern social media application.

---

## ✨ Features

*   🔐 **Secure Authentication**: A complete user registration and login system based on secure sessions using Passport.js.
*   📝 **Post Management (CRUD)**: Endpoints to create, read, update, and delete posts.
*   🖼️ **File Uploads**: Upload and manage media files, such as user avatars, with direct integration to Supabase Storage.
*   🛡️ **Centralized Error Handling**: Global middleware for robust and consistent error handling throughout the application.
*   🐘 **Modern ORM**: Interact with the PostgreSQL database safely and efficiently thanks to Prisma.

---

## 🛠️ Tech Stack

*   **Backend**: Node.js, Express.js
*   **Database**: PostgreSQL (via Supabase)
*   **ORM**: Prisma
*   **Authentication**: Passport.js
*   **File Storage**: Supabase Storage
*   **File Uploads**: Multer
*   **Deployment**: Vercel

---

## 🚀 Getting Started

Follow these steps to set up and run the project in your local development environment.

### **Prerequisites**

*   Node.js (version 18 or higher recommended)
*   `npm`, `yarn`, or `pnpm`
*   A free [Supabase](https://supabase.com/) account

### **Installation**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/0xKash/social-media-api.git
    cd social-media-api
    ```

2.  **Install project dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    Create a `.env` file in the root of the project. You can copy the contents from `.env.example` (if it exists) or use the template below. Get the values from your Supabase project settings.

    ```env
    # Supabase database connection URL
    DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-DB-HOST]:5432/postgres"

    # Gtihub credentials
    GITHUB_CLIENT_ID="your-github-account-client-id"
    GITHUB_CLIENT_SECRET="your-github-client-secret"
    GITHUB_CALLBACK_URL="github-callback-url"

    # Supabase project credentials
    SUPABASE_URL="https://your-project-url.supabase.co"
    SUPABASE_KEY="your-supabase-anon-key"

    # Secret key for user sessions
    SESSION_SECRET="averylongandsecretkey"

    # Port for the server (optional, defaults to 3000)
    PORT=3000
    ```

4.  **Apply the database migrations:**
    This will create the tables in your Supabase database according to the Prisma schema.
    ```bash
    npx prisma migrate dev
    ```

5.  **Start the development server:**
    ```bash
    npm start
    ```

That's it! The server will be listening at `http://localhost:3000` (or the port you defined).

---

## 📄 API Endpoints

Below is a preliminary list of available endpoints.

| HTTP Method | Route                 | Description                        |
| ----------- | --------------------- | ---------------------------------- |
| `POST`      | `/api/auth/signup`    | Registers a new user.              |
| `POST`      | `/api/auth/login`     | Logs in an existing user.          |
| `POST`      | `/api/auth/logout`    | Logs out the current user.         |
| `GET`       | `/api/posts`          | Gets all posts.                    |
| `POST`      | `/api/posts`          | Creates a new post.                |
| `GET`       | `/api/posts/:postId`  | Gets a specific post.              |
| `DELETE`    | `/api/posts/:postId`  | Deletes a post.                    |
| `PUT`       | `/api/users/avatar`   | Updates the user's avatar.         |

*Note: It is recommended to use a tool like Postman or Insomnia to test the endpoints.*

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

