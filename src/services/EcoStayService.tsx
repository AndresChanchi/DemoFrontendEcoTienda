import Web3 from 'web3';
import EcoStayontract from '../contracts/EcoStayTwo.json';
import { ethers } from 'ethers';

const addressContract = import.meta.env.VITE_CONTRACT_ADDRESS;
const urlRpc = import.meta.env.VITE_RPC_URL;
const addressPrivateKey = import.meta.env.VITE_PRIVATE_KEY;

//inicializar web3
const web3 = new Web3(window.ethereum);

//Address del contrato del DAO
const contractAddress = addressContract;
const contractABI = EcoStayontract.abi;

//proveedor de la red(Ganache)
const provider = new ethers.JsonRpcProvider(urlRpc);

//clave privada de la cuenta que contiene los token
const privateKey = addressPrivateKey;
const wallet = new ethers.Wallet(privateKey, provider);

const ecoStay = new ethers.Contract(contractAddress, contractABI, wallet);


export const recordTransaction = async (address: string, amount: string, nameToken: string) => {
    try {
        // Convertir la cantidad a Wei
        const amountWei = web3.utils.toWei(amount.toString(), 'ether');
        
        // Enviar la transacción al contrato inteligente
        const tx = await ecoStay.recordTransaction(address, amountWei, nameToken)
        await tx.wait();
        // Retornar la transacción como una cadena de texto
        console.log(tx.hash)
        return tx.tx.hash;
    } catch (error) {
        console.error('Error al registrar la transacción:', error);
        throw new Error('No se pudo registrar la transacción');
    }
};

export const getGCTBalance = async (address: string) => {
    try {
        const gctBalance = await ecoStay.gctBalances(address);
        console.log(gctBalance)
        return gctBalance;
    } catch (error) {
        console.error('Error al obtener el balance de GCT:', error);
        throw new Error('No se pudo obtener el balance de GCT');
    }
};

export const distributeReward = async (address: string, amount:string) => {
    try {
        // Convertir la cantidad a Wei
        const amountWei = web3.utils.toWei(amount.toString(), 'ether');
        
        // Enviar la transacción al contrato inteligente
        const tx = await ecoStay.distributeReward(address, amountWei);
        await tx.wait();
        // Retornar la transacción como una cadena de texto
        console.log(tx.hash)
        return tx.hash;
    } catch (error) {
        console.error('Error al registrar la transacción:', error);
        throw new Error('No se pudo registrar la transacción');
    }
};