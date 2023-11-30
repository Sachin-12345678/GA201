const express=require("express");
const connection=require("./db")
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app=express();
app.use(bodyParser.json());

// app.use();
app.get("/", (req,res)=>{
    res.send("home page......")
})

app.use('/api/products', productRoutes);
app.use('/api/products/:productId/reviews', reviewRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

app.listen(4500, async()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running on port 4500");
})