# Velora Dashboard Backend API

A comprehensive backend API for the Velora Dashboard application built with Node.js, Express, and MongoDB.

## Features

- 🔐 **Authentication & Authorization**: JWT-based authentication with role-based access control
- 👥 **User Management**: Admin, Company, and Employee user roles
- 📊 **Dashboard Analytics**: Real-time dashboard data and analytics
- 🏢 **Company Management**: Company profiles and employee management
- 👤 **Employee Tracking**: Employee profiles, productivity tracking, and location updates
- 📈 **Backend Monitoring**: System health monitoring and metrics
- 🔒 **Security**: Password hashing, input validation, and rate limiting

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing, helmet for security headers
- **Validation**: express-validator for input validation
- **Environment**: dotenv for environment variables

## Project Structure

```
backend/
├── src/
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── scripts/          # Database seeding and utilities
│   └── utils/            # Utility functions
├── package.json
├── server.js            # Main server file
└── .env.example         # Environment variables template
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

```bash
# Copy the environment template
cp .env.example .env

# Edit the .env file with your configurations
# Required variables:
# - MONGODB_URI: Your MongoDB connection string
# - JWT_SECRET: A secure secret key for JWT tokens
```

### 3. Database Setup

#### Option A: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Set `MONGODB_URI=mongodb://localhost:27017/velora` in .env

#### Option B: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI` in .env
4. Example: `mongodb+srv://username:password@cluster.mongodb.net/velora`

### 4. Seed Database with Sample Data

```bash
npm run seed
```

This will create:

- Admin user: `admin@velora.com` / `admin123`
- Company user: `contact@techcorp.com` / `company123`
- 5 Employee users: `john@techcorp.com` / `employee123` (and others)

### 5. Start Development Server

```bash
npm run dev
```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Dashboard

- `GET /api/dashboard` - Get dashboard data
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/notifications` - Get notifications

### Employee Management

- `GET /api/employee/dashboard` - Employee dashboard
- `GET /api/employee/profile` - Employee profile
- `PUT /api/employee/profile` - Update employee profile
- `POST /api/employee/location` - Update location
- `POST /api/employee/clock-in` - Clock in
- `POST /api/employee/clock-out` - Clock out

### Company Management

- `GET /api/company/dashboard` - Company dashboard
- `GET /api/company/employees` - Get all employees
- `GET /api/company/analytics` - Company analytics
- `GET /api/company/reports` - Company reports

### Analytics

- `GET /api/analytics/overview` - Analytics overview (Admin)
- `GET /api/analytics/performance` - Performance analytics
- `GET /api/analytics/productivity` - Productivity analytics
- `GET /api/analytics/reports` - Analytics reports

### User Management (Admin)

- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Backend Monitoring (Admin)

- `GET /api/backend/status` - System status
- `GET /api/backend/health` - Health check
- `GET /api/backend/metrics` - System metrics
- `GET /api/backend/logs` - System logs

## Database Schema

### Users Collection

- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `role`: String (admin, company, employee)
- `status`: String (active, inactive, suspended)

### Employees Collection

- `userId`: ObjectId (ref: User)
- `companyId`: ObjectId (ref: Company)
- `name`: String
- `position`: String
- `department`: String
- `salary`: Number
- `productivity`: Number
- `location`: Object (lat, lng, address)
- `status`: String

### Companies Collection

- `userId`: ObjectId (ref: User)
- `name`: String
- `industry`: String
- `size`: String
- `location`: String
- `description`: String

### Backend Collection

- `serviceName`: String
- `version`: String
- `environment`: String
- `status`: String
- `uptime`: Number
- `memoryUsage`: Object
- `cpuUsage`: Number

## Security Features

- **Password Security**: bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access**: Different permissions for admin, company, employee
- **Input Validation**: Comprehensive request validation
- **Rate Limiting**: Request rate limiting to prevent abuse
- **CORS Protection**: Cross-origin resource sharing configuration
- **Security Headers**: Helmet.js for security headers

## Development Scripts

```bash
npm run dev          # Start development server with nodemon
npm run start        # Start production server
npm run seed         # Seed database with sample data
npm run test         # Run tests (if implemented)
```

## Environment Variables

| Variable      | Description               | Example                          |
| ------------- | ------------------------- | -------------------------------- |
| `NODE_ENV`    | Environment mode          | development/production           |
| `PORT`        | Server port               | 5000                             |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/velora |
| `JWT_SECRET`  | JWT secret key            | your-secret-key                  |
| `JWT_EXPIRE`  | JWT expiration time       | 7d                               |
| `CORS_ORIGIN` | Allowed CORS origins      | http://localhost:3000            |

## Testing

The API can be tested using:

- **Postman**: Import the collection from `/docs/postman_collection.json`
- **curl**: Command-line testing
- **Frontend**: Connect with the React frontend

## Deployment

### Local Deployment

1. Set `NODE_ENV=production`
2. Use PM2 or similar process manager
3. Set up reverse proxy (nginx)

### Cloud Deployment

1. Deploy to platforms like Heroku, AWS, or Railway
2. Set environment variables in platform dashboard
3. Use MongoDB Atlas for database

## Error Handling

The API uses centralized error handling with:

- Consistent error response format
- Proper HTTP status codes
- Detailed error messages in development
- Sanitized error messages in production

## Rate Limiting

Default rate limits:

- 100 requests per 15 minutes per IP
- Configurable via environment variables
- Different limits for different endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
