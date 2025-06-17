import { RoleDocument } from "../models/roles.model";

export interface UserDocument{
    id:string;
    email:string;
    password:string;
    roleIds:(string[] | RoleDocument)[];
}

export type signupAndloginDocument = {
    email:string;
    password:string;
}
