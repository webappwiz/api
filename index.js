const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.get('/', (req, res)=> {
    res.send ('i am using express');

});
//connecting to mongoDB
mongoose.connect('put atlas string');
//create a data schema
const userschema = new mongoose.Schema({
    name: String,
    email: string,
    phone: string,
});
//creating a model
const user = mongoose.model('user', userschema);

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
app.listen(3000,() => {
    console.log('server is running 0n port:3000')
});