# Online Eatery Frontend

## Project Overview

Online Eatery Frontend is a modern React + Vite web application for a food ordering platform. It provides a smooth customer experience with public pages for browsing meals, viewing details, creating an account, logging in, managing a cart, checking out, and tracking order history. The app also includes an admin area for managing meals and orders.

The project is built with React Router for navigation, Context API for shared state, Tailwind CSS for styling, Axios for API communication, and React Hook Form for form handling.

## Features

- Responsive landing page and marketing sections
- Public routes for Home, About, Contact, Register, Login, Menu, and meal details
- Protected customer routes for cart, checkout, profile, and order history
- Admin routes for dashboard, menu management, and order management
- Shared auth and cart state using Context API
- Demo-friendly authentication flow ready for backend integration

## Tech stack

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- React Hook Form
- Context API

## API endpoints

The frontend is set up to communicate with a REST API using the following endpoints. These are the routes expected by the current client-side services.

### Base URL

```bash
http://localhost:5000/api
```

You can override this with the VITE_API_URL environment variable in your deployment environment.

### Authentication

- POST /auth/register — Register a new user
- POST /auth/login — Login a user
- GET /auth/me — Get the authenticated user profile

### Meals / Menu

- GET /meals — Get all meals
- GET /meals/:id — Get a single meal by ID
- GET /meals/categories — Get all meal categories
- POST /meals — Create a new meal (admin)
- PUT /meals/:id — Update a meal (admin)
- DELETE /meals/:id — Delete a meal (admin)

### Orders

- POST /orders — Create a new order
- GET /orders/my-orders — Get the current user's orders
- GET /orders/:id — Get a single order by ID
- GET /orders — Get all orders (admin)
- PUT /orders/:id/status — Update order status (admin)

### Users

- GET /users/profile — Get the current user's profile
- PUT /users/profile — Update the current user's profile
- PUT /users/change-password — Change the current user's password
- GET /users — Get all users (admin)

### Authentication header

```http
Authorization: Bearer <token>
```

## Setup Instructions

### Prerequisites

- Node.js (recommended: LTS version)
- npm or yarn

### Installation

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The development server will start and you can open the app in your browser.

### Build for production

```bash
npm run build
```



## Build

```bash
npm run build
```

## Notes
All Components were Organised properly as expected in the project.
The app is set up to consume a REST API through Axios. Update the API base URL in the environment or the service layer when your backend is ready.
A
