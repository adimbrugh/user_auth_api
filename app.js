const express = require('express');
const mongoose = require('mongoose');
const httpStatusText = require('./utils/httpStatusText');
require ('dotenv').config();
const cors = require('cors');
const path = require('path');



const url = process.env.MONGO_URL;
mongoose.connect(url).then(()=> {
    console.log("mongodb servar started")
});


//init connect
const app = express();

//file system
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//middleware
app.use(cors());
app.use(express.json());


const coursesRouter = require('./routes/courses.route');
const usersRouter = require('./routes/users.route');
app.use('/api/courses', coursesRouter); //  /api/courses
app.use('/api/users', usersRouter); // /api/users


//globle middleware for not found router
app.all('*', (req,res,next)=> {
    return res.status(404).json({status: httpStatusText.ERROR, message:"this resource is not available"});
});


//globle error handler
app.use((error,req,res,next)=> {
    res.status(error.statusCode || 500).json({status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null});
});


app.listen( process.env.PORT ||3001, ()=> {
    console.log("listing on port 3001")
});