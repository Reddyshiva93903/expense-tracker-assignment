Expense Tracker
A full-stack personal finance application built to track daily expenditures.

Tech Stack
Frontend: React, TypeScript, Tailwind CSS, TanStack Query, Axios.

Backend: Node.js, Express.js.

Database: MySQL.

How to Run Locally

1. Database Setup
   Ensure you have MySQL installed and running. Create a database named expense_tracker and run the following SQL to set up the table:

SQL
CREATE TABLE expenses (
id INT AUTO_INCREMENT PRIMARY KEY,
amount DECIMAL(10, 2) NOT NULL,
category VARCHAR(50) NOT NULL,
expense_date DATE NOT NULL,
note TEXT
); 2. Backend Setup
Navigate to the server folder: cd server

Install dependencies: npm install

Create a .env file in the server folder with your database credentials:

Plaintext
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=expense_tracker
Start the server: npm run dev

3. Frontend Setup
   Navigate to the client folder: cd client

Install dependencies: npm install

Start the development server: npm run dev

Database Schema Design
I used a single expenses table for this application.

Reasoning: A flat structure is ideal for this scope because expense data is inherently relational, and the primary operations (filtering by date/category and grouping for the summary) are efficiently handled by standard SQL queries (GROUP BY, WHERE). This design keeps the API simple and the database operations performant for a personal tracking tool.
