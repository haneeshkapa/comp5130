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
   git clone https://github.com/haneeshkapa/comp5130
   cd comp5130
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

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
