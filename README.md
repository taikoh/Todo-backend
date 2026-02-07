# Application Installation and Usage Instructions

## Project Overview

This is a **Todo App** API built with Express and Sequelize. Users can:

- Create accounts and log in.
- Create, update, and delete todos.
- Organize todos into categories.
- Assign statuses to todos.

All routes are secured with JWT authentication, except for signup and login. API responses follow the **JSend** standard.

---

## Prerequisites

- MySQL database installed and running.
- Node.js and npm installed.

---

## Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

- Copy the .env.example to .env

```bash
cp .env.example .env
```

- Open .env and update the variables with your database credentials and JWT secret.
  Example:

```env
DATABASE_NAME=my_database
ADMIN_USERNAME=my_db_user
ADMIN_PASSWORD=my_db_password
HOST=localhost
DIALECT=mysql
TOKEN_SECRET=your_jwt_secret_here
```

## Running the application

Start the server:

```bash
npm start
```

By default, the APP will run on http://localhost:3000.

## API Documentation

- Access the documentation in your browser at:

```bash
http://localhost:3000/doc
```

# Environment Variables

```env
HOST =
ADMIN_USERNAME =
ADMIN_PASSWORD =
DATABASE_NAME =
DIALECT =
PORT =
TOKEN_SECRET =
```

# Additional Libraries/Packages

| Package                | Purpose                                                       |
| ---------------------- | ------------------------------------------------------------- |
| **express**            | Web framework for building the API endpoints.                 |
| **sequelize**          | ORM for interacting with the MySQL database.                  |
| **mysql2**             | MySQL driver used by Sequelize.                               |
| **jsonwebtoken**       | To generate and verify JWT tokens for authentication.         |
| **jsend**              | Standardizes API responses in success/fail/error format.      |
| **dotenv**             | Loads environment variables from `.env` file.                 |
| **body-parser**        | Parses incoming request bodies for JSON and URL-encoded data. |
| **swagger-ui-express** | Serves the API documentation interface.                       |
| **supertest**          | Testing HTTP endpoints.                                       |
| **jest**               | Testing framework for unit and integration tests.             |

# NodeJS Version Used

v22.17.0

