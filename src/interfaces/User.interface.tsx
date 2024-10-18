export interface Role {
    id: string;
    name: string;
    description: string;
    status: string;
    createdate: string;
    updateddate: string;
}

export interface Details {
    id: string;
    name: string;
    lastname: string;
    phone: string;
    avatar: string | null;
    createdate: string;
    updateddate: string;
}

export interface Wallet {
    id: string;
    address: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    status: string;
    roles: Role[];
    details: Details;
    wallet: Wallet;
}

export interface UsersResponse {
    status: number;
    message: string;
    users?: User[];
}
export interface UserRequest {
    username: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
    phone: string;
}