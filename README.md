# Academic Result Manager

Academic Result Manager is a web-based result management system with separate access for **Students**, **Faculty**, and **Admin**.

The system allows faculty to manage student marks, students to view their own results, and admins to view overall result information and performance statistics.


---

## Features

### Student
- Student login
- View personal result
- View MSE and ESE marks
- View percentage
- View SGPA
- View grade
- View PASS/FAIL status
- Download result as PDF

### Faculty
- Faculty login
- View list of students
- Select a student
- Enter MSE and ESE marks
- Add student results
- Update existing student marks
- View recently added results
- Download/print student result as PDF

### Admin
- Admin login
- View student results
- View total number of students
- View total number of passed students
- View average result
- Monitor overall student performance

---

## Subjects

The system currently manages four subjects:

- Operating System
- Data Structure
- Computer Networks
- Design and Analysis of Algorithm

---

## Result Calculation

The final marks for each subject are calculated using:

```
Final Marks = (50% × MSE) + (50% × ESE)
```

The system then calculates:

- Percentage
- SGPA
- Grade
- PASS/FAIL status

---

## Technology Used

| Layer      | Technology              |
|------------|--------------------------|
| Frontend   | React.js                 |
| Backend    | Node.js                  |
| API        | Express.js (REST API)    |
| Database   | MySQL                    |
| Languages  | JavaScript, HTML, CSS    |

---

## Project Structure

```
ACADEMIC-RESULT-MANAGER/
│
├── client/
│   ├── dist/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── FacultyDashboard.jsx
│   │   │   ├── FacultyLogin.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   └── StudentLogin.jsx
│   │   │
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── resultController.js
│   │
│   ├── middleware/
│   ├── routes/
│   ├── .env
│   ├── .env.example
│   ├── app.js
│   ├── db.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

## Database

The project uses **MySQL**.

**Database name:** `student_results`

**Main tables:** `users`, `results`

### `users` Table

Stores:
- User ID
- Name
- Email
- Password
- Role
- Created date

**Available roles:** `admin`, `faculty`, `student`

### `results` Table

Stores:
- Student ID
- Operating System — MSE and ESE
- Data Structure — MSE and ESE
- Computer Networks — MSE and ESE
- Design and Analysis of Algorithm — MSE and ESE
- Percentage
- SGPA
- Grade
- PASS/FAIL status
- Last updated time

---

## PDF Result

Both Students and Faculty can download the result as a PDF.

The PDF contains:
- Student name
- Student email
- Subject-wise marks
- MSE marks
- ESE marks
- Percentage
- SGPA
- Grade
- Result status

---

## Screenshots


| Page | Preview |
|------|---------|
| Student Dashboard | `screenshots/studentdashboard.png` |
| Faculty Dashboard | `screenshots/facultydashboard.png` |
| Admin Dashboard | `screenshots/admindashboard.png` |
| Main Dashboard | `screenshots/maindashboard.png` |


---

## How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/dhanshree58/student-result-manager.git
cd student-result-manager
```

### 2. Setup the Server

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=student_results
PORT=5000
```

Start the server:

```bash
npm start
```

### 3. Setup the Client

Open another terminal:

```bash
cd client
npm install
npm start
```

> Make sure the MySQL server and Node.js backend are running before using the application.

---

## Application Flow

```
Login
  |
  +---- Student
  |       |
  |       └── View Result → Download PDF
  |
  +---- Faculty
  |       |
  |       └── Add/Update Marks → View Result → Download PDF
  |
  └---- Admin
          |
          └── View Results → View Statistics
```

---

## User Roles

| Role     | Features                                       |
|----------|-------------------------------------------------|
| Student  | View own result and download PDF                |
| Faculty  | Add/update marks and download student result     |
| Admin    | View results and overall statistics              |

---

## Future Improvements

- Semester-wise result management
- Result history
- Export results to Excel
- Subject management
- Performance graphs
- Attendance management
- Multiple academic years
- Email result notifications

---
