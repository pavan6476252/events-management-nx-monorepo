Here's the updated README file with additional features that must be present in the user microservice:

---

# User Microservice

## Description

This microservice handles user-related operations including user registration, login, logout, profile management, and authentication via JWT. It also manages user addresses and provides functionality for secure token-based authentication.

## Features

### Completed Features
- [x] User Registration
- [x] User Login
- [x] JWT Authentication
- [x] Refresh Tokens Implementation
- [x] User Logout
- [x] Prevent Multiple Auth Records for Same Device
- [x] User Address Management
- [x] User Profile management

### Features to be Completed
- [ ] Cloudinary and file upload module
- [ ] User profile pictures 
- [ ] Password Reset Functionality
- [ ] Role-Based Access Control (RBAC)
- [ ] Unit Testing
- [ ] Integration Testing

### Additional Features to be Completed
- [ ] Email Verification for New Users
- [ ] Two-Factor Authentication (2FA)
- [ ] Activity Logging and Monitoring
- [ ] Account Deactivation/Deletion
- [ ] User Profile Update
- [ ] User Password Change
- [ ] Rate Limiting for Login Attempts
- [ ] Support for Social Logins (e.g., Google, Facebook)
- [ ] API Documentation with Swagger

## Installation

```bash
npm install
```

## Running the Application

```bash
npm run start:dev
```

## Usage
 
Endpoint: `http://localhost:3001/graphql`
 
## Contributing

Please follow the coding standards and best practices outlined in the project documentation. Ensure that your code is well-documented and includes appropriate unit and integration tests.


--- 