
export interface UserDocument{
    id:string;
    email:string;
    password:string;
    roleIds:string[];
}

export interface signupAndloginDocument  {
    email:string;
    password:string;
}
