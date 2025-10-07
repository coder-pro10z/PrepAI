const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-interview', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error Connecting to MongoDB', err);
        process.exit(1);
    }
}

module.exports = { connectDB }