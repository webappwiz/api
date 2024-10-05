const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize expres app
const app = express();
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API! Use /api for more details.' });
});

//connecting to mongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

//create a data schema
const userschema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
});

//creating a model
const user = mongoose.model('user', userschema);

// creating route for registration using post

app.post('/register', async(req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
    const user = new user ({
        name,
        email,
        phone,
    });
    await user.save();
    res.send('saved successfully');
}

     catch (error) {
        console.error (error);
        res.status(500).send('data not saved')}
     
});
// start the server
app.listen(8000,() => {
    console.log('server is running 0n port:8000')
});