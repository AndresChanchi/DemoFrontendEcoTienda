
import {UserData, UserRequest, UsersResponse} from '../interfaces/User.interface'
const urlBase = import.meta.env.VITE_API_URL

export const getAllUsers = async (token:string) : Promise<UsersResponse | null> => {
    try{
        console.log('paso por el servcio');
        const response = await fetch(`${urlBase}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const responseData:  UsersResponse = await response.json()
        return responseData;
    }catch (error){
        console.error('Error login', error);
        return null;
    }
   
}

export const createUser = async (token:string, data: UserRequest) : Promise<UsersResponse | null> => {
    try{
        console.log('paso por el servcio', data);
        const response = await fetch(`${urlBase}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const responseData:  UsersResponse = await response.json()
        return responseData;
    }catch (error){
        console.error('Error login', error);
        return null;
    }
   
}

export const updateUser = async (token:string, userId: string, data: UserData) : Promise<UsersResponse | null> => {
    try{
        console.log('paso por el servcio', data);
        const response = await fetch(`${urlBase}/user/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const responseData:  UsersResponse = await response.json()
        return responseData;
    }catch (error){
        console.error('Error login', error);
        return null;
    }
   
}

export const deleteUser = async (token:string, userId: string) : Promise<UsersResponse | null> => {
    try{
        console.log('paso por el servcio');
        const response = await fetch(`${urlBase}/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const responseData:  UsersResponse = await response.json()
        return responseData;
    }catch (error){
        console.error('Error login', error);
        return null;
    }
   
}

export const getUserId = async (token:string,  userId: string) : Promise<UsersResponse | null> => {
    try{
        console.log('paso por el servcio');
        const response = await fetch(`${urlBase}/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const responseData:  UsersResponse = await response.json()
        return responseData;
    }catch (error){
        console.error('Error login', error);
        return null;
    }
   
}

export const getUserIdReference = async (userId: string) : Promise<UsersResponse | null> => {
    try{
        console.log('paso por el servcio');
        const response = await fetch(`${urlBase}/user/reference/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const responseData:  UsersResponse = await response.json()
        return responseData;
    }catch (error){
        console.error('Error login', error);
        return null;
    }
   
}