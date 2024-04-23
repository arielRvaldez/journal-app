const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const typeDefs = require('./schemas/typeDefs'); // Import GraphQL schema
const resolvers = require('./schemas/resolvers'); // Import GraphQL resolvers
const goalsRoutes = require('./routes/goalsRoutes');
const entriesRoutes = require('./routes/entriesRoutes');
const userRoutes = require('./routes/userRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Add CORS middleware to allow requests from all origins
app.use(cors());

// Define MongoDB connection URI
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
}

// Create an ApolloServer instance
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });
}

// Define port number
const PORT = process.env.PORT || 5001;

// Use your routes
app.use('/api', goalsRoutes);
app.use('/api', entriesRoutes);
app.use('/api', userRoutes);

// Start the server
async function startServer() {
  await connectToDatabase();
  await startApolloServer();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
