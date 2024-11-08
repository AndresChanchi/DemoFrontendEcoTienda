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

export const getETHBalance = async (address: string) => {
    try {
        const balance = await provider.getBalance(address);
        console.log('Balance ETH en wei:', balance);
        const balanceInEth = web3.utils.fromWei(balance, 'ether');
        console.log(`Balance of ${address}: ${balanceInEth} ETH`);
        return balanceInEth;
    } catch (error) {
        console.error('Error al obtener el balance de ETH:', error);
        throw new Error('No se pudo obtener el balance de ETH');
    }
};

export const sendTransaction = async (fromPrivateKey: string, to: string, amount: string) => {
    try {

        // Crear una instancia de Wallet con la clave privada de la dirección de origen
        const fromWallet = new ethers.Wallet(fromPrivateKey, provider);

        // Convertir la cantidad a Wei
        const amountWei = web3.utils.toWei(amount.toString(), 'ether');

        // Crear la transacción
        const tx = await fromWallet.sendTransaction({
            to,
            value: amountWei
        });

        // Esperar a que la transacción sea minada
        await tx.wait();

        // Retornar el hash de la transacción
        console.log(`Transaction hash: ${tx.hash}`);
        return tx.hash;
    } catch (error) {
        console.error('Error al enviar la transacción:', error);
        throw new Error('No se pudo enviar la transacción');
    }
};

export const exchangeGCT = async (address: string, amount: number, description: string) => {
    try {
        // Convertir la cantidad a Wei
        const amountWei = web3.utils.toWei(amount.toString(), 'ether');

        console.log('WEI::::::::::', amountWei);
        console.log('paso por el servicio', address);
        const tx = await ecoStay.exchangeGCT(address, amountWei, description);
        await tx.wait();
        console.log(`Compra realizada, hash transaction: ${tx.hash}`);
        return tx.hash;
    }catch (error) {
        console.error('Error al enviar la transacción:', error);
        throw new Error('No se pudo enviar la transacción');
    }
}

export const getExchangeByUser = async (address: string) => {
    try {
        console.log('paso por el servicio', address);
        const exchange = await ecoStay.getExchangeByUser(address.toString());
        return exchange;
    } catch (error) {
        console.error('Error al obtener el exchange:', error);
        throw new Error('No se pudo obtener el exchange');
    }
}