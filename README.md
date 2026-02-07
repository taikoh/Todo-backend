[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Z71r_75n)

![](http://143.42.108.232/pvt/Noroff-64.png)

# Noroff

## Back-end Development Year 1

### REST API - Course Assignment 1 <sup>V2</sup>

Startup code for Noroff back-end development 1 - REST API course.

Instruction for the course assignment is in the LMS (Moodle) system of Noroff.
[https://lms.noroff.no](https://lms.noroff.no)

![](http://143.42.108.232/pvt/important.png)

You will not be able to make any submission after the deadline of the course assignment. Make sure to make all your commit **BEFORE** the deadline

![](http://143.42.108.232/pvt/help_small.png)

If you are unsure of any instructions for the course assignment, contact out to your teacher on **Microsoft Teams**.

**REMEMBER** Your Moodle LMS submission must have your repository link **AND** your Github username in the text file.

---

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
