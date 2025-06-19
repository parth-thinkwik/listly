export interface createRoleSchema {
    name:string;
    permissions:string[];
}

export interface assignRoleSchema {
    userId:string;
    roleIds:string[];
}

export interface editRoleSchema {
    roleId:string;
    name:string;
    permissions:string[];
}
