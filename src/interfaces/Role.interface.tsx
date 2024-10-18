export interface RoleResponse {
    id: string;
    name: string;
    description: string;
    status: string;
    createdate: string;
    updateddate: string;
}
export interface RoleRequest{
    name: string;
    description: string;
    status: string;
}