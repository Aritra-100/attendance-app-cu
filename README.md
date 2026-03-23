# Smart Attendance

Smart Attendance is a full-stack attendance management system for teachers and students.

The project helps teachers:

- create and manage batches
- add and manage students
- track daily attendance
- view attendance reports
- organize lecture topics and teaching plans
- prepare for automatic attendance using face/image recognition

The application has a React frontend, an Express backend, and a Supabase database.

Important note:

- The project structure already includes face registration and automatic attendance UI flow
- The current codebase contains placeholders and integration points for image/face recognition
- If you plan to present this as a finished image-recognition system, you should complete the backend face-recognition pipeline first

## Features

- Batch management
- Student enrollment
- Daily attendance records
- Attendance statistics
- Weekly reports
- Frequent absentee reporting
- Lecture curriculum management
- Teaching plan management
- Face registration UI for students
- Automatic attendance mode UI
- Global alert/toast system

## Tech Stack

### Frontend

- React 19
- React Router
- React Context API
- react-day-picker
- Bootstrap
- Font Awesome

### Backend

- Node.js
- Express 5
- dotenv
- cors
- multer

### Database / Backend Service

- Supabase
- Supabase Postgres tables
- Supabase RPC/database functions
- PostgreSQL bootstrap script for first-time setup

## Project Structure

```text
attendance-app-cu/
|- public/
|- src/
|  |- app/
|  |- components/
|  |- context/
|- attendance-app-cu backend/
|  |- config/
|  |- controllers/
|  |- routes/
|- package.json
|- README.md
```

### Folder summary

- `src/` contains the React frontend
- `src/app/` contains pages like Dashboard, Students, Attendance, Reports, and Lectures
- `src/components/` contains reusable UI such as modals and alerts
- `src/context/` contains global state providers
- `attendance-app-cu backend/` contains the Express backend
- `attendance-app-cu backend/controllers/` contains business logic
- `attendance-app-cu backend/routes/` contains API route definitions
- `attendance-app-cu backend/config/` contains shared backend configuration like Supabase setup

## Main Modules

### Frontend pages

- Dashboard
- Attendance
- Students
- Reports
- Lectures
- Profile

### Backend API areas

- Batches
- Students
- Attendance
- Lectures

## How the System Works

### Basic flow

1. The teacher opens the app.
2. The teacher selects a batch.
3. The frontend loads batch-specific data.
4. The teacher can manage students, view attendance, and view reports.
5. The backend reads and writes data to Supabase.

### Student management flow

1. Teacher adds a student.
2. Backend creates user and student records.
3. Backend enrolls the student into the selected batch.
4. Frontend refreshes the student list.

### Attendance flow

1. Teacher opens the Attendance page.
2. Frontend requests attendance data for a specific date.
3. Backend combines student and attendance records.
4. Frontend displays Present, Absent, or No Class.

### Automatic attendance / image recognition flow

Planned system flow:

1. Teacher uploads a classroom image or student face image.
2. Backend processes the image.
3. Backend identifies registered students.
4. Backend marks recognized students as present.
5. Attendance records are stored and shown in the app.

Current code status:

- face registration modal exists on the frontend
- automatic attendance mode UI exists on the dashboard
- `multer` is installed in the backend for file upload handling
- the full image-recognition processing backend is not yet implemented in this repository

## Installation

## Prerequisites

Make sure you have these installed:

- Node.js 18 or newer
- npm
- A Supabase project

## 1. Clone the repository

```bash
git clone <your-repository-url>
cd attendance-app-cu
```

## 2. Install frontend dependencies

From the root project folder:

```bash
npm install
```

## 3. Install backend dependencies

From the root project folder:

```bash
npm --prefix "./attendance-app-cu backend" install
```

Or go into the backend folder and install there:

```bash
cd "attendance-app-cu backend"
npm install
cd ..
```

## 4. Configure environment variables

Create a `.env` file inside the backend folder:

`attendance-app-cu backend/.env`

Add:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_DB_URL=your_supabase_postgres_connection_string
```

Important:

- the backend reads these values in `attendance-app-cu backend/config/supabaseClient.js`
- without them, the backend cannot connect to Supabase
- `SUPABASE_DB_URL` is used only for one-time schema creation
- use the direct Postgres connection string from Supabase, not the API URL

## 5. Create the Supabase tables automatically

No, the tables are not created automatically just by starting the app.

To make onboarding easier, this repository now includes a database bootstrap script and SQL schema.

Run this from the root project folder:

```bash
npm --prefix "./attendance-app-cu backend" run db:init
```

What this does:

- connects directly to your Supabase Postgres database
- creates the required tables if they do not already exist
- creates the helper functions used by the backend
- safely re-runs because it uses `if not exists` where possible

Files involved:

- `attendance-app-cu backend/scripts/initDb.js`
- `attendance-app-cu backend/db/schema.sql`

After this step, you can start the app normally.

## 6. Start the project

### Start frontend only

```bash
npm start
```

Frontend runs on:

`http://localhost:3000`

### Start backend only

```bash
npm run backend
```

Backend runs on:

`http://localhost:5000`

### Start both frontend and backend together

```bash
npm run both
```

## Available Scripts

From the root folder:

- `npm start` starts the React frontend
- `npm run backend` starts the backend server using the backend project
- `npm run both` starts frontend and backend together
- `npm run build` builds the frontend for production
- `npm test` runs frontend tests
- `npm --prefix "./attendance-app-cu backend" run db:init` creates the required database schema

## Backend API Overview

### Batch routes

- `GET /api/batches`
- `GET /api/batches/:id`
- `POST /api/batches`
- `PATCH /api/batches/:id`
- `DELETE /api/batches/:id`
- `PATCH /api/batches/:id/threshold`

### Student routes

- `GET /api/students/:batchId`
- `POST /api/students`
- `DELETE /api/students/:id/:batchId`
- `DELETE /api/students/:id`

### Attendance routes

- `GET /api/attendance/:id/stats`
- `GET /api/attendance/:id/graph`
- `GET /api/attendance/:batchId/daily?date=YYYY-MM-DD`
- `GET /api/attendance/:id/frequent-absentees`

### Lecture routes

- `GET /api/lectures/curriculum/:batchId`
- `POST /api/lectures/curriculum/:batchId`
- `GET /api/lectures/plan/:batchId`
- `POST /api/lectures/plan/:batchId`

## Supabase / Database Notes

The backend bootstrap script creates tables like:

- `batches`
- `users`
- `students`
- `enrollments`
- `batch_attendances`
- `student_attendances`
- `lecture_curriculum`
- `lecture_curriculum_topics`
- `lecture_schedule`

It also creates helper database functions/RPC calls such as:

- `increment_student_count`
- `frequent_absentees`

If you set up this project in a fresh Supabase instance, run the bootstrap command before starting the app.

## Current Limitations

- Authentication is not fully implemented
- Profile save is currently frontend-only
- Face recognition is not fully wired on the backend yet
- Some lecture save actions are present in the UI but are not fully connected to backend persistence

## Suggested Next Improvements

- add real authentication for teachers and students
- implement backend face/image recognition pipeline
- connect face registration upload to backend
- connect automatic attendance mode to backend recognition logic
- complete lecture save flow
- add database schema documentation
- add tests for frontend and backend

## For New Developers

If you are new to the project, start with these files:

- `src/App.js`
- `src/app/layout/Layout.js`
- `src/app/layout/sidebar/Sidebar.js`
- `src/app/students/Students.js`
- `attendance-app-cu backend/server.js`
- `attendance-app-cu backend/controllers/studentController.js`
- `attendance-app-cu backend/controllers/attendanceController.js`

## License

This project currently does not define a custom license in the repository. Add one if you plan to publish or distribute it.
