    import express from "express";
    import * as dotenv from "dotenv";
    import mongoose from "mongoose";
    import userRoute from "./routes/user.route"
    import taskRoute from "./routes/task.route"
    import roleRoute from "./routes/role.route"
    import adminRoute from "./routes/admin.route"
    import { adminSeeder } from "./seeder/admin.seeder";
    import path from "path";

    dotenv.config();

    const app = express();
    app.use(express.json());

    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


    app.get("/",(_req,res)=>{
        res.send("server is running...")
    })

    app.use("/user",userRoute);
    app.use("/task",taskRoute);
    app.use("/role",roleRoute);
    app.use("/admin",adminRoute);

    const port = process.env.PORT;
    app.listen(port,()=>{
        console.log(`server is running on http:// localhost:${port}`);
    });

    const mongouri = process.env.MONGO_URI as string;

    mongoose.connect(mongouri).then(()=>{
        console.log("connected to the database...");
        adminSeeder();
    })
    .catch(err=>{
        console.error(err);
        console.log("Unable to connect...");
        
    })