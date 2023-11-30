const mongoose=require("mongoose");
const connection=mongoose.connect("mongodb+srv://sachin:chavan@cluster0.1kuxcjb.mongodb.net/?retryWrites=true&w=majority");


module.exports=connection