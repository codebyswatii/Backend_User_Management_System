# Backend User Management System

A simple backend application built with Node.js, Express, and MySQL to understand how user actions translate into server behavior and database changes. Focused on request–response flow, input validation, and handling common backend errors.

---

## Features

* Create, view, update, and delete users (CRUD)
* Validates incorrect or missing inputs
* Handles failed queries and invalid routes
* Returns structured JSON responses

---

## Tech Stack

Node.js • Express.js • MySQL • REST APIs

---

## Why This Project

Built to learn how real applications behave when users interact with them — especially what happens when requests fail, data is incorrect, or routes are wrong, and how to debug those issues step‑by‑step.

---

## Run Locally

### 1) Clone the repository

```bash
git clone https://github.com/codebyswatii/Backend_User_Management_System.git
cd Backend_User_Management_System
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Create a `.env` file in the root folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=user_management
PORT=3000
```

### 4) Create Database (MySQL)

```sql
CREATE DATABASE user_management;
USE user_management;
```

### 5) Start the server

```bash
node index.js
```

(or)

```bash
npx nodemon index.js
```

### 6) Open in browser

```
http://localhost:3000
```

## Explanation Video

A short walkthrough demonstrating API requests, responses, and how errors are handled.

> (https://drive.google.com/file/d/1LUYwWTJZb-Ql0JUbgKq6vdpL85O5t9SZ/view?usp=sharing)

---

This project helped strengthen understanding of backend workflows and troubleshooting application behavior.
