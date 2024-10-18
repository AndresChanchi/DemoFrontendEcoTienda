
import {RoleResponse, RoleRequest} from '../interfaces/Role.interface'
const urlBase = import.meta.env.VITE_API_URL

export const getAllRole = async (token:string) : Promise<RoleResponse | null> => {
    try{
        console.log('paso por el servcio');
        const response = await fetch(`${urlBase}/role`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const responseData:  RoleResponse = await response.json()
        return responseData;
    }catch (error){
        console.error('Error login', error);
        return null;
    }
}

  //createRole, updateRole, deleteRole

  export const createRole = async(token: string, data:  RoleRequest): Promise<RoleResponse | null> => {
    try{
        console.log('paso por el servcio');
        const response = await fetch(`${urlBase}/role`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const responseData:  RoleResponse = await response.json()
        return responseData;
    }catch (error){
        console.error('Error login', error);
        return null;
    }
  }

  export const updateRole = async(token: string, idRole: string, data:  RoleRequest): Promise<RoleResponse | null> => {
    try{
        console.log('paso por el servcio');
        const response = await fetch(`${urlBase}/role/${idRole}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        const responseData:  RoleResponse = await response.json()
        return responseData;
    }catch (error){
        console.error('Error login', error);
        return null;
    }
  }

  export const deleteRole = async(token: string, idRole: string) => {
    try{
        console.log('paso por el servcio');
        const response = await fetch(`${urlBase}/role/${idRole}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const responseData:  RoleResponse = await response.json()
        return responseData;
    }catch (error){
        console.error('Error login', error);
        return null;
    }
  }

