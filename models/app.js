require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user'); // Import the model

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ Connection error:', err));

async function run() {
    const newUser = new User({ name: 'Alice', email: 'alice@example.com', age: 25 });
    await newUser.save();
    console.log('User created:', newUser);
}

run();
