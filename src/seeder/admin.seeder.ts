import { Role } from "../models/roles.model";
import { User } from "../models/user.model"
import bcrypt from "bcrypt"

export const adminSeeder = async()=>{
    const userCount = await User.estimatedDocumentCount();
    if(userCount === 0){
        console.log('Seeding initial data...');
        let role = await Role.findOne({name:"Admin"});
        if(!role){
             role = await Role.create({name:'Admin',permissions:[ "listing:task", "adding:task", "edit:task", "removing:task", "details:task","list:users","list:userbyid","create:role","assign:role","edit:role","list:role" ]})
        }
        const userData = {
            name:"Admin",
            email:"admin123@gmail.com",
            password:await bcrypt.hash("Admin@123",12),
            roleIds:[role?.id]
        }
        const admin = await User.insertOne(userData);

        console.log("admin seeded suuccessfully...",admin);
        
    }
}