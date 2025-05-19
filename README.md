# 📝 Journal Web Application - Backend

A secure journal management backend built with **Java**, **Spring Boot**, and **MongoDB Atlas**, designed for personal journaling with role-based access control.

---

## 🚀 Technologies Used

- **Backend:** Java, Spring Boot  
- **Security:** Spring Security with JWT (JSON Web Tokens)  
- **Database:** MongoDB Atlas (AWS-hosted)  
- **Utilities:** Lombok  
- **API Style:** RESTful APIs  

---

## 📖 Description

This backend service powers a journal web application where users can securely manage personal journal entries. Each user has isolated access to their own data. Admins and support admins have elevated privileges to manage the platform and monitor user activities.

---

## 🔐 Core Features

- ✅ **User Authentication**  
  - Register and log in using JWT-based authentication.
  
- ✅ **Role-Based Access Control (RBAC)**  
  - **USER**: Can perform **CRUD** (Create, Read, Update, Delete) operations on their own journal entries.  
  - **ADMIN**: Can create **support admins**, manage users, and monitor activities.  
  - **SUPPORT ADMIN**: Can manage user activities without full admin access.
  
- ✅ **Data Isolation**  
  - Each user can access and manage **only their own** posts.  
  
- ✅ **Secure RESTful API**  
  - Clean and modular REST API for easy frontend integration.  

- ✅ **Efficient Codebase**  
  - Reduced boilerplate code using Lombok.

---

## 📂 Project Structure Overview

JournalWebAppBackend/
├── src/
│ ├── main/
│ │ ├── java/com/example/journal/
│ │ │ ├── config/ # Security and application config
│ │ │ ├── controller/ # REST API controllers
│ │ │ ├── model/ # Entity models (User, Post)
│ │ │ ├── repository/ # MongoDB repositories
│ │ │ ├── security/ # JWT filters, providers
│ │ │ ├── service/ # Business logic
│ │ │ └── JournalApplication.java
│ │ └── resources/
│ │ └── application.properties
├── pom.xml
└── README.md
