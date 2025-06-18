export type createRoleSchema = {
    name:string;
    permissions:string[];
}

export type assignRoleSchema = {
    userId:string;
    roleIds:string[];
}

export type editRoleSchema = {
    roleId:string;
    name:string;
    permissions:string[];
}
