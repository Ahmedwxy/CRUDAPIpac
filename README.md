# Backend APIs Prac.

This is my ongoing backend learning project built with **Node.js**, **Express**, and **MongoDB**.  
I started with a simple CRUD API for products, and later added **user authentication** and **ownership rules** — similar to Ebay?.

Now, I have expanded it with:
- **Profile management** (update name, profile picture, and password with old password verification).  
- **Forgot / Reset password** via email using **Nodemailer**.  
- **File upload support** for profile pictures.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Ahmedwxy/CRUDAPIpac.git
cd CRUDAPIpac
```
2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the project root:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Usage
Start the server in development mode:
```bash
npm run server
```
Start the server in production mode:
```bash
npm start
```

## API Endpoints
Auth Routes
```http
POST /api/users/register              # Register a new user
POST /api/users/login                 # Login and get token
GET  /api/users/profile               # Get logged-in user (requires token)
PUT  /api/users/profile               # Update user profile (name, password, profile picture)
POST /api/users/forgotpassword        # Send reset token to email
PUT  /api/users/resetpassword/:token  # Reset password using token
```

Product Routes
```http
GET    /api/products          # Get all products
GET    /api/products/:id      # Get a single product
POST   /api/products          # Create product (requires token)
PUT    /api/products/:id      # Update own product
DELETE /api/products/:id      # Delete own product
```

## Modules Used
express — Web framework for API
mongoose — MongoDB object modeling
bcrypt / bcryptjs — Password hashing
jsonwebtoken — JWT authentication
dotenv — Load environment variables
express-async-handler — Error handling
colors — Colored console output
nodemailer — Sending reset password emails
multer — File upload middleware (for profile pictures)
nodemon (dev) — Auto-reload server

## Recent Changes
Added profile update route (PUT /api/users/profile) with file upload and password change support.
Implemented forgot/reset password flow with email reset token.
Added sendEmail.js utility for sending emails.
Created uploadMiddleware.js to handle profile picture uploads.

## Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you’d like to change.
