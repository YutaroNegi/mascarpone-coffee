const express = require('express')
const routes = require('./routes/route')
const mongoose = require('mongoose');
const app = express()
const path = require('path');
require("dotenv").config();

const port = process.env.PORT || 5000

connectMongoDB()
app.use(express.static(path.join(__dirname, 'front/build')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front/build/index.html'));
})
app.use('/api', routes)

app.listen(port, () => console.log(`Server running on port ${port}!`))
async function connectMongoDB(){
    try {
        await mongoose.connect(process.env.MONGO_CONNECT);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('error connecting to mongodb, error: ', error);
    }    
}