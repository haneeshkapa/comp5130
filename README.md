# comp5130

# Student Off-Campus Room Rental Management System

## Project Setup

### Prerequisites
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0.0 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/5130.git
   cd 5130
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables (see Environment Variables section below)

4. Start the development server:
   ```
   npm run dev
   ```

The server should now be running on `http://localhost:5000` and the client on `http://localhost:3000`.

## Environment Variables

This project uses environment variables for configuration. Create a `.env` file in the root directory of the project and add the following variables:

```
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/roomrental

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=30d

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
```

Make sure to replace `your_jwt_secret_here` with a strong, unique secret key.

### Environment Variables Explanation:

- `PORT`: The port on which the server will run.
- `NODE_ENV`: The current environment (development, production, etc.).
- `MONGODB_URI`: The connection string for your MongoDB database.
- `JWT_SECRET`: A secret key used to sign JWT tokens.
- `JWT_EXPIRE`: The expiration time for JWT tokens.
- `CLIENT_URL`: The URL of your client application (for CORS configuration).

## Running the Application

- To start the server in development mode:
  ```
  npm run dev
  ```

- To start the client:
  ```
  cd client
  npm start
  ```

## Testing

To run the test suite:

```
npm test
```

## Building for Production

To create a production build:

```
npm run build
```

This will create optimized builds for both the server and client.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
