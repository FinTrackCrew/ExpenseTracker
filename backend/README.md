# Expense Tracker Backend

## Overview

The Expense Tracker Backend is a RESTful API service developed to manage the core business logic of the Expense Tracker application. It is responsible for handling authentication, user management, financial records, savings analysis, and alert generation.

The backend was designed with a modular architecture to keep the codebase scalable, maintainable, and easy to extend. Each feature is separated into dedicated API modules, allowing independent development and easier debugging.

This service communicates with the frontend application through secure HTTP requests and stores all user and financial data in MongoDB.

---

# Technology Stack

## Node.js

Node.js is used as the runtime environment to execute JavaScript on the server side. It enables asynchronous operations and efficient request handling.

## Express.js

Express.js is used to build the REST APIs and manage middleware, routing, request handling, and server-side logic.

## MongoDB

MongoDB is used as the primary database for storing users, income records, expenses, savings goals, and alerts.

## Mongoose

Mongoose is used as the ODM (Object Data Modeling) library for MongoDB. It simplifies schema creation, validation, and database operations.

## JWT Authentication

JWT tokens are used for authentication and session management. Tokens are stored securely using HTTP-only cookies.

## Zustand

Although primarily used on the frontend, backend authentication and session flow were designed to work smoothly with Zustand state management.

---

# Core Functionalities

## User Authentication and Authorization

The backend includes a complete authentication system with secure login and registration functionality.

Features implemented:

* User registration
* Login authentication
* Password hashing using bcryptjs
* JWT token generation
* Protected routes
* Secure logout
* Session expiry validation

The authentication system ensures that protected resources can only be accessed by authenticated users.

---

## Income Management

Users can add and manage monthly income records.

The backend handles:

* Creating income entries
* Fetching monthly income
* Updating income information
* Validating duplicate or invalid entries

Income data is later used for savings calculation and analytics.

---

## Expense Management

The backend allows users to manage expenses category-wise.

Features include:

* Add expenses
* Retrieve monthly expenses
* Delete expenses
* Category-based expense tracking

Expense data is processed to calculate total monthly spending and savings.

---

## Savings Calculation

Savings are calculated dynamically based on income and expense data.

Formula used:

```text id="m4h9w2"
Savings = Total Income - Total Expenses
```

The backend computes savings automatically whenever financial data changes.

This information is used in:

* Savings overview
* Goal tracking
* Alerts
* Analytics

---

## Savings Goal Management

Users can set monthly savings goals.

The backend handles:

* Adding savings goals
* Updating goals
* Deleting goals
* Comparing current savings with target goals

The savings goal system helps users monitor financial discipline and monthly targets.

---

## Alert System

The backend includes an alert generation system that provides feedback based on user financial activity.

Implemented alerts:

* Budget alerts
* Savings alerts
* Goal achievement status
* Goal progress tracking

The alert system improves user awareness and financial monitoring.

---

# API Design

The backend follows REST API principles for predictable and organized endpoints.

API modules are separated feature-wise:

* User APIs
* Income APIs
* Expense APIs
* Savings APIs
* Alert APIs
* Budget APIs
* Insight APIs

This structure improves scalability and makes future feature integration easier.

---

# Security Implementation

Security was an important part of the backend design.

The following security practices were implemented:

## Password Hashing

Passwords are encrypted using bcryptjs before storing them in the database.

## JWT-Based Authentication

JWT tokens are generated after successful login and validated for protected routes.

## HTTP-Only Cookies

Authentication tokens are stored using HTTP-only cookies to reduce security risks from client-side access.

## CORS Protection

CORS policies were configured carefully to allow frontend-backend communication securely during deployment.

## Protected Routes

Sensitive APIs require valid authentication tokens before access is granted.

---

# Session Management

Session handling was implemented carefully to improve user experience and maintain security.

The backend supports:

* Session validation
* Session expiry handling
* Automatic logout behavior
* Unauthorized request detection

This was integrated with frontend state management to maintain authentication consistency after refreshes and navigation.

---

# Database Design

MongoDB collections were created for:

* Users
* Income
* Expenses
* Savings Goals
* Alerts

Relationships between records are managed using user references and monthly data grouping.

The database design allows efficient retrieval of financial summaries for analytics and chart generation.

---

# Error Handling

Centralized error handling middleware was implemented to provide consistent API responses.

Handled scenarios include:

* Invalid authentication
* Validation failures
* Duplicate records
* Database errors
* Invalid MongoDB IDs
* Server-side exceptions

Meaningful error messages are returned to improve frontend debugging and user feedback.

---

# Challenges Faced During Development

## Session Expiry Handling

One of the biggest challenges was implementing session expiry behavior correctly across both public and protected routes.

Issues encountered:

* Session expiry popup appearing after page refresh
* Popup triggering on login and register pages
* Unauthorized requests causing unnecessary session alerts
* Authentication state mismatch after refresh

Solution implemented:

* Route-based session checks
* Protected route validation
* Improved Axios interceptor handling
* Better synchronization between frontend state and backend authentication

This significantly improved the stability of the authentication flow.

---

## CORS and Deployment Configuration

During deployment, frontend and backend were hosted on different domains, which created cross-origin issues.

Problems faced:

* Blocked API requests
* Cookies not being sent properly
* Authentication failures after deployment

Solutions implemented:

* Proper CORS origin configuration
* `withCredentials` support
* Secure cookie handling
* Deployment-specific environment variables

---

## State Synchronization After Refresh

Maintaining authentication state after browser refresh required careful backend and frontend coordination.

The backend needed to:

* Validate sessions correctly
* Return accurate authentication status
* Prevent false unauthorized states

This issue was resolved through improved session verification and request handling.

---

# Deployment

The backend is deployed using Render.

Deployment process involved:

* Connecting GitHub repository
* Configuring environment variables
* Setting production build commands
* Configuring MongoDB Atlas access
* Enabling secure frontend-backend communication

The deployed backend serves API requests for the production frontend application.

---

# Conclusion

The Expense Tracker Backend was developed to provide a secure, scalable, and maintainable backend system for financial management.

The project focuses not only on CRUD operations but also on real-world concerns such as:

* Authentication security
* Session management
* Deployment handling
* Financial analytics
* User experience consistency

The modular design and structured API architecture make the backend suitable for future scalability and feature expansion.
