// require packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// require local things
const { PORT, MONGO_URL } = require('./config');
const bookRoutes = require('./routes/book.routes');

// cors origin
const corsOrigin = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowHeaders: ['Content-Type']
}

// create express app
const app = express();

// middlewares
app.use(express.json());
app.use(cors(corsOrigin));

// routes
app.use('/api/books', bookRoutes);

// connect to mongodb database
const connectToDatabase = async () =>{
    try{
        await mongoose.connect(MONGO_URL);
        app.listen(PORT, () => console.log('Database connected & Server started on port', PORT));
    }catch(error){
        console.error('Database connection error:', error.message);
    }
}

connectToDatabase();


