const express = require('express')
const routes = require('./routes/route')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const app = express()
const port = 5000
const path = require('path');
connectMongoDB()

app.use(express.json());
app.use('/', routes)
app.listen(port, () => console.log(`Server running on port ${port}!`))
app.use(express.static(path.join(__dirname, 'front/build')));

async function connectMongoDB(){
    try {
        await mongoose.connect('mongodb+srv://dbUser:dbpassword@yutarocluster.orsy1.mongodb.net/?retryWrites=true&w=majority');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('error connecting to mongodb, error: ', error);
    }    
}


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/build/index.html'))
})