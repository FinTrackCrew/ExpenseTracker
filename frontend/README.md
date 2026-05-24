# Expense Tracker Frontend

## Overview

The Expense Tracker Frontend is a responsive single-page web application developed to help users manage and monitor their personal finances efficiently. The application provides an interactive interface for tracking income, expenses, savings, and monthly financial goals with visual analytics and real-time feedback.

The frontend was built using React and modern UI technologies with a strong focus on usability, clean design, responsiveness, and maintainable component architecture.

The application communicates with backend REST APIs for authentication, financial data management, and analytics generation.

---

# Technology Stack

## React.js

React was used for building reusable UI components and handling the overall frontend architecture using a component-based approach.

## React Router DOM

React Router DOM was used for implementing client-side routing and seamless navigation between pages without page reloads.

## Tailwind CSS

Tailwind CSS was used for styling and responsive design. Utility-first styling helped maintain consistency across layouts, spacing, typography, and responsiveness.

## Axios

Axios was used for API communication between the frontend and backend services.

## Zustand

Zustand was used for lightweight and efficient global state management, particularly for:

* Authentication state
* Session expiry state
* Selected month handling
* Shared application data

## Chart.js

Chart.js was integrated to create interactive charts and financial visualizations for savings and expense analysis.

---

# Main Features

## Authentication System

The frontend includes a secure authentication flow integrated with backend JWT authentication.

Implemented features:

* User registration
* User login
* Logout functionality
* Protected page access
* Authentication persistence
* Session expiry handling

The authentication flow was designed to provide secure and smooth navigation across the application.

---

# Dashboard System

The dashboard provides a centralized overview of the user's monthly financial activity.

Displayed information includes:

* Monthly income
* Monthly expenses
* Current savings
* Budget alerts
* Savings insights

Financial data updates dynamically based on the selected month.

---

# Expense Management

The expense module allows users to:

* Add expenses
* Categorize expenses
* Delete expense entries
* Analyze spending behavior

The interface was designed to keep financial data simple, readable, and organized.

---

# Savings Analysis

The savings section provides financial insights and monthly savings tracking.

Implemented functionality includes:

* Savings calculation
* Savings goal tracking
* Goal comparison visualization
* Monthly financial analysis

Chart.js was used to visually compare:

* Income
* Savings
* Savings goals

This helps users understand their monthly financial status more effectively.

---

# User Interface Design

The frontend design focuses on simplicity, readability, and responsiveness.

Design objectives included:

* Clean layouts
* Smooth navigation
* Modern UI styling
* Responsive components
* Minimal visual clutter
* Better financial readability

Tailwind CSS utilities were used extensively to maintain consistent styling across all pages.

---

# Routing System

React Router DOM was used for implementing page navigation and route management.

Main application routes include:

* Home
* Register
* Login
* Dashboard
* Expenses
* Savings
* Profile

Protected routes were handled carefully to restrict unauthorized access.

---

# State Management

Zustand was implemented for centralized state management while keeping the application lightweight.

Managed states include:

* Logged-in user data
* Authentication status
* Session expiry state
* Selected monthly date

This reduced unnecessary prop drilling and improved component communication.

---

# API Integration

The frontend communicates with backend APIs using Axios.

API integration handles:

* Authentication requests
* Expense management
* Savings retrieval
* Alert handling
* Session validation
* Error responses

Axios interceptors were implemented for centralized unauthorized request handling.

---

# Error Handling

The frontend includes structured error handling for:

* Authentication failures
* Validation errors
* API request failures
* Session expiration
* Unauthorized access

Meaningful feedback messages are displayed to improve user experience.

---

# Challenges Faced During Development

## Session Expiry Handling

One of the major frontend challenges was implementing stable session expiry behavior across different routes.

Issues encountered:

* Session expiry popup appearing after page refresh
* Unauthorized alerts triggering on public pages
* Session popup appearing unnecessarily after authentication checks

Solutions implemented:

* Protected route validation
* Public route filtering
* Controlled Axios interceptor handling
* Improved session synchronization with Zustand

This significantly improved the stability of the authentication flow.

---

## State Persistence After Refresh

Managing authentication state after browser refresh required careful synchronization between frontend state and backend authentication APIs.

Problems encountered:

* Header navigation flickering after refresh
* Incorrect authentication rendering during initial load
* Temporary UI inconsistencies

These issues were solved through:

* Application-level authentication checks
* Controlled loading states
* Conditional rendering logic
* Improved Zustand state synchronization

---

## Single Page Application Routing

After deployment, refreshing pages directly caused 404 routing errors because frontend routes were handled client-side.

Solution implemented:

* Added proper Vercel rewrite configuration
* Configured SPA fallback routing
* Improved refresh handling for protected pages

This ensured smooth navigation and refresh support across all routes.

---

# Deployment

The frontend is deployed using Vercel.

Deployment process included:

* Connecting GitHub repository
* Configuring production build settings
* Managing API base URLs
* Handling SPA routing behavior
* Integrating deployed backend APIs

Additional deployment configuration was implemented to ensure stable refresh handling and authentication flow.

---

# Conclusion

The Expense Tracker Frontend was developed with a strong focus on usability, responsiveness, and real-world application behavior.

The project emphasizes:

* Secure authentication flow
* Financial data visualization
* Responsive user experience
* Reliable session management
* Maintainable component architecture

The frontend works together with the backend system to provide a complete and user-friendly financial tracking experience.
