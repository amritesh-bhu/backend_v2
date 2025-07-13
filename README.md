# 📌 Project Overview
This project is a Task Management Backend API built using Node.js and Express.js, following RESTful API design principles. It is designed to handle user management and task operations securely and efficiently. The system is modular, scalable, and easy to integrate with any frontend or mobile application. Docke-compose file is used to start the services.

# 🚀 Key Features
## 🔐 User Authentication & Authorization
- User Registration & Login: Secure endpoints for creating user accounts and logging in.
- Authentication: Utilizes redis for managing user sessions and verifying identities.
- Role-Based Authorization: Protects specific routes and resources from unauthorized access by validating user roles or permissions.

## 👥 User Management
- Create and manage user profiles.
- Secure password handling with hashing (e.g., using crypto).
- Endpoint protection to allow only authenticated users to access or modify their own data.

## ✅ Task CRUD Operations
- Create Tasks: Authenticated users can create new tasks.
- Read Tasks: Fetch all tasks or a single task, optionally filtered by user or status.
- Update Tasks: Modify task details (title, description, status, etc.).
- Delete Tasks: Remove tasks from the system.
- share Tasks: authenticated user can share the tasks with some permission to other user which exists.

**Note** : Multiple device login is supported

## 🔄 RESTful API Endpoints
- All operations follow REST conventions with clean and meaningful endpoint naming (e.g., POST /api/tasks, GET /api/tasks/:id).
- Consistent HTTP status codes and error handling for all responses.

# 📁 Technologies Used
- Node.js – JavaScript runtime environmen
- Express.js – Web framework for building the API
- Redis – For authentication
- crypto – For password hashing
- MongoDB – As the database to store user and task data
- Mongoose (if using MongoDB) – ODM for database interaction
- Redis - to store the user session

# 📬 Contact
For any questions or issues, feel free to raise an issue or reach out.
