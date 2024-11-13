import { CurrencyResponse } from "../interfaces/Currency.interface";

const urlBase = import.meta.env.VITE_API_CONVERSION

export const changeCurrency = async () : Promise<CurrencyResponse | null> => {
    try{
        console.log('paso por el servcio');
        const response = await fetch(`${urlBase}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseData:  CurrencyResponse = await response.json();
        return responseData;
    }catch (error){
        console.error('Error login', error);
        return null;
    }
}