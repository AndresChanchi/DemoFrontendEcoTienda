import React, { useEffect, useState } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { getExchangeByUser } from '../../services/EcoStayService';
import './ShoppingListPage.css';

const ShoppingListPage = () => {
    const cookies = new Cookies();
    const [address, setAddress] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState<'success' | 'danger'>('success');
    const [listChange, setListChange] = useState<string[][]>([]);

    useEffect(() => {
        getShopping();
    }, []);

    const getShopping = async () => {
        try {
            const user = cookies.get('user');
            setAddress(user.wallet.address);
            console.log('AAAAADDDDREEEESSSS:', user.wallet.address);
            const list = await getExchangeByUser(user.wallet.address);
            console.log(list.toString());
            const formattedList = list.toString().split(',').reduce((result: string[][], value: string, index: number, array: string[]) => {
                if (index % 4 === 0) result.push(array.slice(index, index + 4));
                return result;
            }, []);
            // Ordenar la lista por fecha más reciente
            formattedList.sort((a, b) => parseInt(b[3]) - parseInt(a[3]));
            setListChange(formattedList);
        } catch (error) {
            setAlertMessage('Error al obtener el balance de GCT: ' + error.message);
            setAlertVariant('danger');
        }
    };

    return (
        <Container className="shopping-list-page mt-5">
            <h1 className="text-center mb-4">Shopping List</h1>
            {alertMessage && <Alert variant={alertVariant}>{alertMessage}</Alert>}
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Address</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {listChange.map((item, index) => {
                        const [address, amount, description, timestamp] = item;
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{address}</td>
                                <td>{amount}</td>
                                <td>{description}</td>
                                <td>{new Date(parseInt(timestamp) * 1000).toLocaleString()}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    );
};

export default ShoppingListPage;