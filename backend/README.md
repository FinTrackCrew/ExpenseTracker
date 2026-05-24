# Expense Tracker Backend

## Overview

The Expense Tracker Backend is a RESTful API service developed to manage the core functionality of the Expense Tracker application. It handles user authentication, financial data management, savings analysis, and alert generation while maintaining secure communication with the frontend application.

The backend was built using Node.js, Express.js, and MongoDB with a modular architecture to improve scalability, maintainability, and separation of concerns. Each feature was implemented as an independent API module to simplify development and debugging.

The backend acts as the primary processing layer for:

* Authentication and authorization
* Financial calculations
* Data validation
* Savings and budget analysis
* Database operations
* Session verification

---

# Technology Stack

## Node.js

Node.js was used as the server-side runtime environment for handling asynchronous operations and API requests efficiently.

## Express.js

Express.js was used to build REST APIs, manage middleware, define routes, and organize backend logic.

## MongoDB

MongoDB Atlas was used as the cloud database solution for storing user information, income records, expenses, savings goals, and alerts.

## Mongoose

Mongoose was used as the ODM library for schema creation, validation, and interaction with MongoDB collections.

## JWT Authentication

JWT tokens were implemented for secure authentication and route protection.

## bcryptjs

bcryptjs was used for password hashing before storing user credentials in the database.

## Cookie Parser

cookie-parser was used for handling authentication cookies securely.

## dotenv

dotenv was used for environment variable management and configuration handling.

---

# Core Functionalities

## User Authentication and Authorization

The backend includes a complete authentication system with secure session handling.

Implemented functionality:

* User registration
* Login authentication
* JWT token generation
* Secure logout
* Protected route verification
* Password hashing
* Session validation

Authentication tokens are stored in HTTP-only cookies for better security and reduced client-side exposure.

---

# Income Management

The backend supports monthly income tracking for authenticated users.

Implemented features:

* Add monthly income
* Retrieve monthly income
* Update income details
* Prevent duplicate monthly entries
* Validate financial inputs

Income data is later used for savings calculations and analytics generation.

---

# Expense Management

The expense system allows users to manage category-based financial spending.

Features implemented:

* Add expenses
* Retrieve expenses month-wise
* Delete expense records
* Expense categorization
* Dynamic financial calculations

Expense records are grouped and processed to generate meaningful monthly summaries.

---

# Savings Calculation

Savings are calculated dynamically using user income and expense records.

Formula used:

```text id="cmk3wa"
Savings = Total Income - Total Expenses
```

The backend automatically computes savings whenever financial records are updated.

Savings data is used for:

* Savings overview
* Goal tracking
* Alert generation
* Analytics visualization

---

# Savings Goal Management

The backend supports monthly savings goal management.

Implemented functionality:

* Add savings goals
* Retrieve savings goals
* Update goals
* Delete goals
* Compare savings against targets

Savings goal analysis is integrated with the alert system to provide financial feedback.

---

# Alert System

The backend generates alerts based on user financial activity and savings performance.

Implemented alerts include:

* Budget limit alerts
* Savings goal alerts
* Goal achievement status
* Savings progress feedback

This helps users monitor their financial condition more effectively.

---

# API Design

The backend follows REST API principles for predictable endpoint behavior and maintainable routing.

API modules are separated based on functionality:

* User APIs
* Income APIs
* Expense APIs
* Savings APIs
* Alert APIs
* Budget APIs
* Insight APIs
* Report APIs

This modular approach improves scalability and future feature integration.

---

# Security Implementation

Security was treated as a major part of backend development.

Implemented security measures include:

## Password Hashing

Passwords are encrypted using bcryptjs before storage.

## JWT-Based Authentication

JWT tokens are generated after successful login and validated for protected API access.

## HTTP-Only Cookies

Authentication tokens are stored using HTTP-only cookies to improve security.

## Protected Routes

Sensitive routes require valid authentication before access is granted.

## CORS Configuration

CORS policies were configured carefully to allow secure frontend-backend communication during deployment.

---

# Database Management

MongoDB collections were created for:

* Users
* Income
* Expenses
* Savings Goals
* Alerts

Data relationships were handled using user references and month-based grouping.

The database design allows efficient retrieval of financial summaries and analytics data.

---

# Error Handling

Centralized error handling middleware was implemented to ensure consistent API responses.

Handled scenarios include:

* Validation failures
* Duplicate records
* Invalid MongoDB Object IDs
* Unauthorized access
* Database failures
* Internal server errors

Meaningful JSON responses are returned for easier frontend integration and debugging.

---

# Backend Processing Flow

The backend follows a structured request-response lifecycle:

1. Request received from frontend
2. Authentication middleware validates session
3. Request data is validated
4. Database operation is performed
5. Financial calculations are processed if required
6. Structured JSON response is returned

This flow improves maintainability and debugging consistency.

---

# Challenges Faced During Development

## MongoDB Data Consistency

Managing monthly financial data while preventing duplicate or conflicting entries was one of the major challenges.

Problems encountered:

* Duplicate income records for the same month
* Incorrect savings calculations due to inconsistent data
* Maintaining relationships between user records and monthly financial data

Solutions implemented:

* Validation checks before insertion
* Structured month-based filtering
* Controlled database update operations
* Improved schema validation

This ensured more reliable financial calculations and cleaner database records.

---

## Financial Calculation Accuracy

Ensuring accurate savings and analytics calculations required careful backend logic implementation.

Challenges included:

* Handling empty or missing financial records
* Managing negative savings values
* Real-time recalculation after expense updates

Solutions implemented:

* Dynamic calculation logic
* Default fallback values
* Controlled numeric conversions
* Backend-level validation before processing

This improved the reliability of financial summaries and analytics.

---

## CORS and Cookie-Based Authentication

During deployment, frontend and backend were hosted separately, causing authentication and cookie-sharing issues.

Problems encountered:

* Cookies not being sent properly
* Unauthorized API requests after deployment
* Cross-origin request failures

Solutions implemented:

* Proper CORS configuration
* `withCredentials` support
* Secure cookie handling
* Deployment-specific origin management

---

## API Route Organization

As the project expanded, managing multiple API routes and controllers became increasingly difficult.

Challenges faced:

* Repeated logic across routes
* Difficulty debugging larger route files
* Maintaining scalability

Solutions implemented:

* Feature-based API separation
* Modular route structure
* Reusable middleware functions
* Cleaner controller organization

This improved maintainability and reduced debugging complexity.

---

# Deployment

The backend is deployed using Render.

Deployment setup included:

* GitHub repository integration
* Environment variable configuration
* MongoDB Atlas integration
* Production CORS handling
* Build and start command configuration

The deployed backend provides API services for the production frontend application.

---

# Conclusion

The Expense Tracker Backend was developed with a strong focus on scalability, security, maintainability, and financial data processing.

The project emphasizes:

* Secure authentication
* Reliable database operations
* Structured API architecture
* Financial analytics
* Stable deployment handling

The backend serves as the core processing system for the Expense Tracker application and supports a complete financial management workflow.
