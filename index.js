require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const PORT = process.env.PORT || 3000;
const goalRouter = require('./routes/goalRouter')

//midlle ware
app.use(express.json())
app.use(cors())

//routes
app.use('/api/goals', goalRouter)
//db connection
const startServer = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName: "Goals",
        });

        app.listen(PORT, () => {
            console.log(`server running on port : ${PORT}..`);
        });
        } catch (error) {
            console.log(error);
    }
};
startServer()

//error route
app.use((req,res) =>{
res.status(404).json({success: false, msg: "resource not found"})
})
