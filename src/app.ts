import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();


const app = express();
app.use(express.json());

app.get("/",(_req,res)=>{
    res.send("server is running...")
})

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running on http:// localhost:${port}`);
});

const mongouri = process.env.MONGO_URI as string;

mongoose.connect(mongouri).then(()=>{
     console.log("connected to the database...");
})
.catch(err=>{
    console.error(err);
    console.log("Unable to connect...");
    
})