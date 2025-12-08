
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const  userRoutes = require('./routes/UserRoutes');
const postsRoute = require('./routes/post');
const authRoute = require('./routes/auth');

dotenv.config();

const app = express();
app.use(express.json());

// Register your routes
app.use("/auth", authRoute);      
app.use("/user", userRoutes);
app.use("/post", postsRoute);

console.log('MONGO_URI from .env:', process.env.MONGO_URI);

// Correct MongoDB connection (no options needed for latest Mongoose)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello from Mingle!');
});


const PORT = process.env.PORT || 80; // Default to 80 for HTTP
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
