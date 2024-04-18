// Import required modules
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const typeDefs = require('./schema'); // Import GraphQL schema
const resolvers = require('./resolvers'); // Import GraphQL resolvers

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Define MongoDB connection URI
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB database
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Create an ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Apply ApolloServer middleware to Express app
server.applyMiddleware({ app });
9
// Define port number
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});