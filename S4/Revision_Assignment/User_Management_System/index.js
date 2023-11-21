const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connection=require("./db");


// Middleware
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.send("Home page")
})

// Routes
app.use('/api/users', require('./routes/userRoutes'));



// Start server
app.listen(8000, async()=>{
    try {
       await connection;
       console.log("Connected to DB");
    } catch (error) {
       console.log(error);
    }

   console.log("Server is running on port 8000");
})
